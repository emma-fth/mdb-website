'use client'
import { useState } from 'react'
import { useAnimationLoad } from '../hooks/useAnimationLoad'
import { submitContactForm } from '../../utils/supabase'

export default function Contact() {
  const { isLoaded } = useAnimationLoad()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })
    
    try {
      await submitContactForm(formData)
      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you! Your message has been sent successfully.' 
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="min-h-screen w-screen bg-gradient-to-b from-mdb-light-blue via-white to-white flex items-center justify-center py-8 md:py-12 lg:py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-mdb-light-blue via-white to-white z-0"></div>
      
      <div className="w-full max-w-2xl mx-auto px-4 relative z-10">
        <div className={`mdb-glass-lg p-8 md:p-12 transition-all duration-1000 ease-out ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-raleway-bold text-mdb-blue mb-4">
              Contact Us
            </h1>
            <p className="text-[clamp(1rem,2.5vw,1.25rem)] text-gray-700 leading-relaxed">
              Have questions about MDB? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-raleway-semibold text-mdb-blue mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-mdb-blue focus:border-mdb-blue focus:bg-white/30 transition-all duration-300 placeholder-gray-600"
                placeholder="Your full name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-raleway-semibold text-mdb-blue mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-mdb-blue focus:border-mdb-blue focus:bg-white/30 transition-all duration-300 placeholder-gray-600"
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-raleway-semibold text-mdb-blue mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-mdb-blue focus:border-mdb-blue focus:bg-white/30 transition-all duration-300 placeholder-gray-600"
                placeholder="What&apos;s this about?"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-raleway-semibold text-mdb-blue mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-mdb-blue focus:border-mdb-blue focus:bg-white/30 transition-all duration-300 placeholder-gray-600 resize-vertical"
                placeholder="Tell us more about your inquiry..."
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-mdb-blue text-white px-8 py-4 rounded-xl font-raleway-semibold text-lg hover:bg-mdb-gold hover:text-mdb-blue hover:scale-105 transition-all duration-300 transform hover:drop-shadow-lg origin-center shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <span className="ml-2 text-xl">{isSubmitting ? '⏳' : '→'}</span>
            </button>
          </form>

          {/* Status Messages */}
          {submitStatus.type && (
            <div className={`mt-4 p-4 rounded-lg ${
              submitStatus.type === 'success' 
                ? 'bg-green-100 border border-green-400 text-green-700' 
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}>
              {submitStatus.message}
            </div>
          )}

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t border-white/30">
            <div className="text-center">
              <h3 className="text-lg font-raleway-semibold text-mdb-blue mb-3">
                Other Ways to Reach Us
              </h3>
              <div className="space-y-2 text-gray-700">
                <p> <a href="mailto:contact@mdb.dev" className="hover:text-mdb-blue transition-colors">contact@mdb.dev</a></p>
                <p>
                  <a
                    href="https://instagram.com/mdbdev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-mdb-blue transition-colors"
                  >
                    @mdbdev
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 