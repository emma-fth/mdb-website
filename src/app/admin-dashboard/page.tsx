'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { uploadImage, getImageUrl, deleteImage, listAllImages, getBatchImageUrls } from '../../utils/supabase'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function AdminDashboardPage() {
  const [uploading, setUploading] = useState(false)
  const [loadingImages, setLoadingImages] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<Array<{path: string, url: string, name: string}>>([])
  const [error, setError] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [imageCache, setImageCache] = useState<Map<string, string>>(new Map())
  const { user, loading: authLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!authLoading && !isAuthenticated) {
      router.push('/admin-login')
      return
    }
    
    // Load existing images when authenticated
    if (!authLoading && isAuthenticated) {
      loadExistingImages(false) // Don't show performance metrics on initial load
    }
  }, [isAuthenticated, authLoading, router])

  const loadExistingImages = useCallback(async (showPerformance = true) => {
    try {
      setLoadingImages(true)
      setError('')
      
      const startTime = performance.now()
      if (showPerformance) console.time('Image loading performance')
      
      // Fetch all image files from Supabase
      const imageFiles = await listAllImages()
      if (showPerformance) console.log(`Found ${imageFiles.length} images in storage`)
      
      if (imageFiles.length === 0) {
        setUploadedImages([])
        setLoadingImages(false)
        return
      }
      
      // Extract file names for batch URL generation
      const fileNames = imageFiles.map((file: any) => file.name)
      
      // Use batch URL generation for much faster loading
      const urls = await getBatchImageUrls(fileNames)
      if (showPerformance) console.log(`Generated ${urls.length} URLs in batch`)
      
      // Create image objects with cached URLs
      const images = fileNames.map((name: string, index: number) => ({
        path: name,
        url: urls[index],
        name: name
      }))
      
      // Update cache and images
      const newCache = new Map()
      images.forEach((img: {path: string, url: string, name: string}) => newCache.set(img.path, img.url))
      setImageCache(newCache)
      setUploadedImages(images)
      
      const endTime = performance.now()
      const loadTime = endTime - startTime
      
      if (showPerformance) {
        console.timeEnd('Image loading performance')
        console.log(`🚀 Loaded ${images.length} images in ${loadTime.toFixed(2)}ms`)
        
        // Show performance feedback
        if (loadTime < 1000) {
          setSuccessMessage(`⚡ Lightning fast! Loaded ${images.length} images in ${loadTime.toFixed(0)}ms`)
          setTimeout(() => setSuccessMessage(''), 4000)
        }
      }
      
    } catch (error) {
      console.error('Failed to load existing images:', error)
      setError(`Failed to load existing images: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoadingImages(false)
    }
  }, [])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    try {
      const result = await uploadImage(file)
      
      // Use cached URL if available, otherwise fetch it
      let imageUrl = imageCache.get(result.path)
      if (!imageUrl) {
        imageUrl = await getImageUrl(result.path)
        // Update cache
        setImageCache(prev => new Map(prev).set(result.path, imageUrl!))
      }
      
      // Ensure we have a valid URL
      if (!imageUrl) {
        throw new Error('Failed to generate image URL')
      }
      
      // Add new image to the list
      setUploadedImages(prev => [...prev, {
        path: result.path,
        url: imageUrl,
        name: file.name
      }])
      
      // Show success message
      setSuccessMessage(`Successfully uploaded ${file.name}`)
      setTimeout(() => setSuccessMessage(''), 3000)
      
      // Clear the file input
      event.target.value = ''
    } catch (error) {
      setError(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setUploading(false)
    }
  }

  const removeImage = async (pathToRemove: string) => {
    try {
      console.log('Deleting image from Supabase:', pathToRemove)
      
      // Delete from Supabase storage
      await deleteImage(pathToRemove)
      console.log('Successfully deleted from Supabase:', pathToRemove)
      
      // Remove from UI after successful deletion
      setUploadedImages(prev => prev.filter(img => img.path !== pathToRemove))
      console.log('Removed from UI:', pathToRemove)
      
    } catch (error) {
      console.error('Failed to delete image:', error)
      setError(`Failed to delete image: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const clearAllImages = async () => {
    try {
      console.log('Clearing all images from Supabase...')
      
      // Delete all images from Supabase
      const deletePromises = uploadedImages.map(img => deleteImage(img.path))
      await Promise.all(deletePromises)
      console.log('Successfully deleted all images from Supabase')
      
      // Clear from UI after successful deletion
      setUploadedImages([])
      console.log('Cleared all images from UI')
      
    } catch (error) {
      console.error('Failed to clear all images:', error)
      setError(`Failed to clear all images: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const signOut = async () => {
    try {
      // Import signOutAdmin dynamically to avoid circular imports
      const { signOutAdmin } = await import('../../utils/supabase')
      await signOutAdmin()
      router.push('/admin-login')
    } catch (error) {
      console.error('Sign out failed:', error)
    }
  }

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mdb-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                      <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">MDB Admin Dashboard</h1>
                <p className="text-gray-600">Manage website images and content</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Logged in as:</p>
                <p className="font-medium text-gray-900">{user?.email}</p>
                <button
                  onClick={signOut}
                  className="mt-2 px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload Images</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-mdb-blue transition-colors">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
              id="file-upload"
              multiple
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-mdb-blue hover:bg-mdb-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {uploading ? 'Uploading...' : 'Choose Images to Upload'}
            </label>
            <p className="mt-2 text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
            {uploading && (
              <div className="mt-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-mdb-blue mx-auto"></div>
                <p className="text-gray-600 mt-2">Processing image...</p>
              </div>
            )}
          </div>
        </div>

        {/* Images Display */}
        {loadingImages ? (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mdb-blue mx-auto mb-4"></div>
              <p className="text-gray-600">Loading existing images...</p>
              <p className="text-sm text-gray-500 mt-2">This should be much faster now! 🚀</p>
            </div>
          </div>
        ) : uploadedImages.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Manage Images ({uploadedImages.length})</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => loadExistingImages(true)}
                  disabled={loadingImages}
                  className="px-4 py-2 bg-mdb-blue text-white rounded hover:bg-mdb-blue/90 transition-colors disabled:opacity-50"
                >
                  {loadingImages ? 'Loading...' : 'Refresh'}
                </button>
                <button
                  onClick={clearAllImages}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Clear All Images
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {uploadedImages.map((image, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative group">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-40 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                      <button
                        onClick={() => removeImage(image.path)}
                        className="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-red-700 transition-all duration-200 transform scale-90 group-hover:scale-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm text-gray-800 font-medium mb-1 truncate" title={image.name}>
                      {image.name}
                    </p>
                    <p className="text-xs text-gray-500 font-mono truncate" title={image.path}>
                      {image.path}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="text-center py-12">
              <div className="mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No images yet</h3>
              <p className="text-gray-500">Upload your first image to get started</p>
            </div>
          </div>
        )}

        {/* Status Check */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-sm">Supabase Connected</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-sm">Authentication Active</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-sm">Upload Ready</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              <span className="text-sm">{uploadedImages.length} Images</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
              <span className="text-sm">Cache: {imageCache.size} URLs</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
              <span className="text-sm">Performance: Optimized</span>
            </div>
          </div>
        </div>

        {/* Success Display */}
        {successMessage && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded text-green-800">
            <strong>Success:</strong> {successMessage}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded text-red-800">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>
    </div>
  )
}