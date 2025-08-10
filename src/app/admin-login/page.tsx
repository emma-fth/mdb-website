'use client'

import React, { useState, useEffect } from 'react'
import { signInAdmin, signOutAdmin } from '../../utils/supabase'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user, loading: authLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect to image management if already authenticated
    if (isAuthenticated && !authLoading) {
      router.push('/admin-dashboard')
    }
  }, [isAuthenticated, authLoading, router])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await signInAdmin(email, password)
      setEmail('')
      setPassword('')
      // Session will be automatically updated via the hook
      router.push('/admin-dashboard')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOutAdmin()
      // Session will be automatically updated via the hook
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Sign out failed')
    }
  }

  const goToAdminDashboard = () => {
    router.push('/admin-dashboard')
  }

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mdb-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Show authenticated state
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mdb-glass backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 text-center">
            <div className="mb-6">
              <Image
                src="/logos/mdb_4.svg"
                alt="MDB Logo"
                width={120}
                height={40}
                className="h-10 w-auto mx-auto mb-4"
              />
              <h2 className="text-2xl font-raleway-semibold text-mdb-blue mb-2">
                Welcome, Admin!
              </h2>
              <p className="text-gray-600 text-sm">
                You are now authenticated as an administrator
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50/50 border border-green-200/50 rounded-xl backdrop-blur-sm">
                <p className="text-sm text-green-800 font-medium">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="text-xs text-green-700 mt-1 font-mono">
                  <span className="font-semibold">ID:</span> {user.id}
                </p>
              </div>
              
              <button
                onClick={goToAdminDashboard}
                className="w-full bg-mdb-blue text-white py-3 px-6 rounded-xl font-raleway-semibold hover:bg-mdb-blue/90 hover:scale-105 hover:drop-shadow-lg transition-all duration-300 transform origin-center"
              >
                Go to Admin Dashboard
              </button>
              
              <button
                onClick={handleSignOut}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-xl font-raleway-semibold hover:bg-red-700 hover:scale-105 hover:drop-shadow-lg transition-all duration-300 transform origin-center"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show login form
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mdb-glass backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <Image
              src="/logos/mdb_4.svg"
              alt="MDB Logo"
              width={120}
              height={40}
              className="h-10 w-auto mx-auto mb-6"
            />
            <h2 className="text-3xl font-raleway-semibold text-mdb-blue mb-2">
              MDB Admin Access
            </h2>
            <p className="text-gray-600 text-sm">
              Sign in to access image management features
            </p>
          </div>
          
          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-mdb-blue/50 focus:border-mdb-blue/50 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/70"
                placeholder="admin@mdb.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-mdb-blue/50 focus:border-mdb-blue/50 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/70"
                placeholder="••••••••"
              />
            </div>
            
            {error && (
              <div className="p-4 bg-red-50/50 border border-red-200/50 rounded-xl backdrop-blur-sm text-red-800 text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-mdb-blue text-white py-3 px-6 rounded-xl font-raleway-semibold hover:bg-mdb-blue/90 hover:scale-105 hover:drop-shadow-lg transition-all duration-300 transform origin-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Need help? Contact MDB Leadership
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
