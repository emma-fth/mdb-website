import { createClient } from '@supabase/supabase-js'

// Secure approach: Fetch credentials from server-side API
let supabaseClient: any = null

const getSupabaseClient = async () => {
  if (supabaseClient) return supabaseClient
  
  try {
    const response = await fetch('/api/supabase-config')
    const config = await response.json()
    
    supabaseClient = createClient(config.url, config.key, {
      auth: {
        // Enable automatic session persistence
        persistSession: true,
        // Store session in localStorage (survives browser restarts)
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
        // Auto-refresh tokens
        autoRefreshToken: true,
        // Detect session in URL (for OAuth flows)
        detectSessionInUrl: true
      }
    })
    return supabaseClient
  } catch (error) {
    console.error('Failed to fetch Supabase config:', error)
    throw new Error('Unable to initialize Supabase client')
  }
}

// Session state management
let sessionState: {
  user: any;
  loading: boolean;
  error: string | null;
} = {
  user: null,
  loading: true,
  error: null
}

// Session listeners
const sessionListeners = new Set<(state: any) => void>()

// Subscribe to session changes
export const subscribeToSession = (callback: (state: any) => void) => {
  sessionListeners.add(callback)
  
  // Return unsubscribe function
  return () => {
    sessionListeners.delete(callback)
  }
}

// Notify all listeners of session state change
const notifySessionListeners = (state: any) => {
  sessionListeners.forEach(callback => callback(state))
}

// Initialize session and set up listeners
export const initializeSession = async () => {
  try {
    const supabase = await getSupabaseClient()
    
    // Get initial session
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      sessionState = { user: null, loading: false, error: error.message }
    } else {
      sessionState = { 
        user: session?.user || null, 
        loading: false, 
        error: null 
      }
    }
    
    // Set up auth state change listener
    supabase.auth.onAuthStateChange(async (event: string, session: any) => {
      console.log('Auth state changed:', event, session?.user?.email)
      
      sessionState = {
        user: session?.user || null,
        loading: false,
        error: null
      }
      
      // Notify all listeners
      notifySessionListeners(sessionState)
    })
    
    // Initial notification
    notifySessionListeners(sessionState)
    
    return sessionState
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    sessionState = { user: null, loading: false, error: errorMessage }
    notifySessionListeners(sessionState)
    return sessionState
  }
}

// Get current session state (synchronous)
export const getSessionState = () => sessionState

// Admin authentication functions
export const signInAdmin = async (email: string, password: string) => {
  const supabase = await getSupabaseClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) throw error
  
  // Session will be automatically updated via the listener
  return data
}

export const signOutAdmin = async () => {
  const supabase = await getSupabaseClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) throw error
  
  // Session will be automatically updated via the listener
  return true
}

export const getCurrentAdmin = async () => {
  const supabase = await getSupabaseClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) throw error
  return user
}

// Check if user is currently authenticated (synchronous)
export const isAuthenticated = () => {
  return sessionState.user !== null && !sessionState.loading
}

// Get current user (synchronous)
export const getCurrentUser = () => {
  return sessionState.user
}

// Simple image upload
export const uploadImage = async (file: File) => {
  const supabase = await getSupabaseClient()
  
  const { data, error } = await supabase.storage
    .from('images')
    .upload(`${Date.now()}-${file.name}`, file)
  
  if (error) throw error
  return data
}

// Get image URL
export const getImageUrl = async (path: string) => {
  try {
    const response = await fetch(`/api/supabase-config?path=${encodeURIComponent(path)}`)
    const data = await response.json()
    return data.url
  } catch (error) {
    console.error('Failed to get image URL:', error)
    throw error
  }
}

// List all images from Supabase storage with optimized querying
export const listAllImages = async () => {
  try {
    const supabase = await getSupabaseClient()
    
    // Check if user is authenticated as admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      throw new Error('Authentication required: Please log in as admin')
    }
    
    // Use more efficient query with better sorting
    const { data, error } = await supabase.storage
      .from('images')
      .list('', {
        limit: 1000, // Increased limit for better performance
        offset: 0,
        sortBy: { column: 'name', order: 'asc' } // Sort by name for consistent ordering
      })
    
    if (error) {
      console.error('Supabase list error:', error)
      throw error
    }
    
    return data || []
  } catch (error) {
    console.error('Error in listAllImages function:', error)
    throw error
  }
}

// Batch get image URLs for much faster loading
export const getBatchImageUrls = async (paths: string[]) => {
  try {
    // Use Supabase's built-in URL generation for better performance
    const supabase = await getSupabaseClient()
    
    const urls = paths.map(path => {
      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(path)
      return data.publicUrl
    })
    
    return urls
  } catch (error) {
    console.error('Error in getBatchImageUrls:', error)
    throw error
  }
}

// Delete image from Supabase storage (admin only)
export const deleteImage = async (path: string) => {
  try {
    console.log('Attempting to delete image:', path)
    
    const supabase = await getSupabaseClient()
    console.log('Supabase client obtained for deletion')
    
    // Check if user is authenticated as admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      throw new Error('Authentication required: Please log in as admin')
    }
    
    console.log('Admin authenticated, proceeding with deletion')
    
    const { data, error } = await supabase.storage
      .from('images')
      .remove([path])
    
    console.log('Delete response:', { data, error })
    
    if (error) {
      console.error('Supabase delete error:', error)
      throw error
    }
    
    console.log('Successfully deleted image from storage:', path)
    return true
  } catch (error) {
    console.error('Error in deleteImage function:', error)
    throw error
  }
}
