'use client'

import React, { useState } from 'react'
import { ExecMember, ProjectManager, Member } from '../../types/members'

interface AddMemberModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (memberData: { name: string; title: string; image: string; image_path?: string }, type: 'exec' | 'pm' | 'member') => Promise<void>
}

export default function AddMemberModal({ isOpen, onClose, onSubmit }: AddMemberModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    image: '',
    image_path: ''
  })
  const [memberType, setMemberType] = useState<'exec' | 'pm' | 'member'>('member')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.title.trim() || !formData.image.trim()) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData, memberType)
      // Reset form
      setFormData({ name: '', title: '', image: '', image_path: '' })
      setMemberType('member')
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Add New Member</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Member Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Member Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMemberType('exec')}
                  className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                    memberType === 'exec'
                      ? 'bg-mdb-blue text-white border-mdb-blue'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-mdb-blue'
                  }`}
                >
                  Executive
                </button>
                <button
                  type="button"
                  onClick={() => setMemberType('pm')}
                  className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                    memberType === 'pm'
                      ? 'bg-mdb-blue text-white border-mdb-blue'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-mdb-blue'
                  }`}
                >
                  Project Manager
                </button>
                <button
                  type="button"
                  onClick={() => setMemberType('member')}
                  className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                    memberType === 'member'
                      ? 'bg-mdb-blue text-white border-mdb-blue'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-mdb-blue'
                  }`}
                >
                  Member
                </button>
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
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
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title/Role *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mdb-blue focus:border-mdb-blue"
                placeholder="e.g., President, Developer, Designer"
                required
              />
            </div>

            {/* Image URL Field */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mdb-blue focus:border-mdb-blue"
                placeholder="https://example.com/image.jpg"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter a direct link to the member's profile image
              </p>
            </div>

            {/* Image Path Field (Optional) */}
            <div>
              <label htmlFor="image_path" className="block text-sm font-medium text-gray-700 mb-2">
                Image Path (Optional)
              </label>
              <input
                type="text"
                id="image_path"
                name="image_path"
                value={formData.image_path}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mdb-blue focus:border-mdb-blue"
                placeholder="e.g., members/john-doe.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">
                Optional: Supabase storage path for the image
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.name.trim() || !formData.title.trim() || !formData.image.trim()}
                className="flex-1 px-4 py-2 bg-mdb-blue text-white rounded-md hover:bg-mdb-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Adding...' : 'Add Member'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
