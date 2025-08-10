import { useState, useEffect } from 'react'
import { 
  subscribeToSession, 
  initializeSession, 
  getSessionState,
  isAuthenticated,
  getCurrentUser
} from '../../utils/supabase'

export const useAuth = () => {
  const [sessionState, setSessionState] = useState(getSessionState())

  useEffect(() => {
    // Initialize session on mount
    initializeSession()
    
    // Subscribe to session changes
    const unsubscribe = subscribeToSession((newState) => {
      setSessionState(newState)
    })
    
    // Cleanup subscription on unmount
    return unsubscribe
  }, [])

  return {
    user: sessionState.user,
    loading: sessionState.loading,
    error: sessionState.error,
    isAuthenticated: isAuthenticated(),
    getCurrentUser: getCurrentUser()
  }
}
