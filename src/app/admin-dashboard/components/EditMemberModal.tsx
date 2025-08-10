'use client'

import React, { useState, useEffect } from 'react'
import { ExecMember, ProjectManager, Member } from '../../types/members'

interface EditMemberModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (id: string, updates: Partial<ExecMember | ProjectManager | Member> & { newImageFile?: File }, type: 'exec' | 'pm' | 'member') => Promise<void>
  member: { type: 'exec' | 'pm' | 'member'; member: ExecMember | ProjectManager | Member } | null
}

export default function EditMemberModal({ isOpen, onClose, onSubmit, member }: EditMemberModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    image: '',
    image_path: ''
  })
  const [newImageFile, setNewImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update form data when member changes
  useEffect(() => {
    if (member) {
      setFormData({
        name: member.member.name || '',
        title: member.member.title || '',
        image: member.member.image || '',
        image_path: member.member.image_path || ''
      })
      setNewImageFile(null)
      setPreviewUrl('')
    }
  }, [member])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!member || !formData.name.trim() || !formData.title.trim()) {
      return
    }

    setIsSubmitting(true)
    try {
      const updates: Partial<ExecMember | ProjectManager | Member> & { newImageFile?: File } = {
        name: formData.name,
        title: formData.title
      }
      
      // Only include new image if one was selected
      if (newImageFile) {
        updates.newImageFile = newImageFile
      }
      
      await onSubmit(member.member.id!, updates, member.type)
      // Form will be closed by parent component after successful update
    } catch (error) {
      // Error handling is done in the parent component
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewImageFile(file)
      
      // Create preview URL
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleClose = () => {
    // Clean up preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl('')
    setNewImageFile(null)
    onClose()
  }

  if (!isOpen || !member) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Edit Member</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Member Type Display */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Member Type
              </label>
              <div className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md border">
                {member.type === 'exec' ? 'Executive' : member.type === 'pm' ? 'Project Manager' : 'Member'}
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mdb-blue focus:border-mdb-blue"
                placeholder="Enter member's full name"
                required
              />
            </div>

            {/* Title Field */}
            <div>
              <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-2">
                Title/Role *
              </label>
              <input
                type="text"
                id="edit-title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mdb-blue focus:border-mdb-blue"
                placeholder="e.g., President, Developer, Designer"
                required
              />
            </div>

            {/* Current Image Display */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Image
              </label>
              <div className="flex items-center space-x-4">
                <img
                  src={formData.image}
                  alt={formData.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  onError={(e) => {
                    e.currentTarget.src = '/images/placeholder-avatar.png' // Fallback image
                  }}
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Current profile image</p>
                  {formData.image_path && (
                    <p className="text-xs text-gray-500 font-mono">{formData.image_path}</p>
                  )}
                </div>
              </div>
            </div>

            {/* New Image Upload Field */}
            <div>
              <label htmlFor="edit-imageFile" className="block text-sm font-medium text-gray-700 mb-2">
                Update Image (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-mdb-blue transition-colors">
                <input
                  type="file"
                  id="edit-imageFile"
                  name="imageFile"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="edit-imageFile"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-mdb-blue hover:bg-mdb-blue/90 transition-colors"
                >
                  Choose New Image
                </label>
                <p className="mt-2 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
              
              {/* New Image Preview */}
              {previewUrl && (
                <div className="mt-3">
                  <p className="text-sm text-gray-700 mb-2">New Image Preview:</p>
                  <div className="relative w-24 h-24 mx-auto">
                    <img
                      src={previewUrl}
                      alt="New Image Preview"
                      className="w-full h-full object-cover rounded-full border-2 border-gray-200"
                    />
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-1">
                    {newImageFile?.name}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.name.trim() || !formData.title.trim()}
                className="flex-1 px-4 py-2 bg-mdb-blue text-white rounded-md hover:bg-mdb-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Updating...' : 'Update Member'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
