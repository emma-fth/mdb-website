import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')
  
  // Server-side environment variables (never exposed to client)
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      { error: 'Supabase configuration not found' },
      { status: 500 }
    )
  }

  // If path is provided, return the public URL for that image
  if (path) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(path)
    
    return NextResponse.json({ url: data.publicUrl })
  }

  // Otherwise return the Supabase configuration
  return NextResponse.json({
    url: supabaseUrl,
    key: supabaseAnonKey
  })
}
