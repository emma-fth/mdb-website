'use client'
import Image from 'next/image'
// Hydration fix: detect screen size on client
// ...existing code...
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAnimationPreferences } from '../../hooks/useAnimationPreferences'

export default function Flyer() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { shouldReduceAnimations } = useAnimationPreferences()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  // Hydration fix: track screen size
  const [isMobile, setIsMobile] = useState<null | boolean>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Mark as client-side to prevent hydration mismatch
    setIsClient(true)
    
    // Set isMobile on client only
    function handleResize() {
      setIsMobile(window.innerWidth < 640)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Trigger animation on next frame to prevent flash
    const timer = requestAnimationFrame(() => {
      setIsLoaded(true)
    })
    
    return () => cancelAnimationFrame(timer)
  }, [])

  // Use default values on first render to match SSR, then update after mount
  const transitionDuration = mounted
    ? (shouldReduceAnimations ? 'duration-500' : 'duration-1000')
    : 'duration-1000'
  const delay = mounted
    ? (shouldReduceAnimations ? 'delay-150' : 'delay-300')
    : 'delay-300'

  return (
    <section className="min-h-screen w-screen bg-gradient-to-b from-mdb-light-blue to-white flex items-center -mt-20 relative mb-0 py-8 md:py-12 lg:py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-mdb-light-blue to-white z-0"></div>
      <div className="w-full px-4 py-8 pt-20 md:pt-24 lg:pt-28 relative z-10">
        <div className={`max-w-7xl mx-auto transition-opacity ${shouldReduceAnimations ? 'duration-300' : 'duration-500'} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {/* Header */}
          <div className={`text-center mb-12 transition-all ${transitionDuration} ease-out ${delay} ${
            isLoaded 
              ? 'translate-y-0' 
              : 'translate-y-8'
          }`}>
            <h1 className="text-[clamp(2rem,5vw,4rem)] md:text-[clamp(2.5rem,6vw,5rem)] font-raleway-bold text-mdb-blue mb-6 leading-tight">
              Join MDB
            </h1>
            <p className="text-[clamp(1rem,2.5vw,1.25rem)] text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Become part of a community focused on full-stack software, AI, and entrepreneurship.
              Learn, build, and grow with passionate developers who share your vision.
            </p>
            {/* Apply Now Button below header */}
            <div className="mt-8">
              <Link 
                href="https://airtable.com/appFIOUBsGeFZQVDK/pagwGgQSbNncvtkV5/form"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-mdb-blue text-white px-8 md:px-12 py-4 md:py-5 rounded-xl font-raleway-semibold text-lg md:text-xl hover:bg-mdb-gold hover:text-mdb-blue hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-lg origin-center shadow-xl"
              >
                Apply Now
                <span className="ml-2 text-xl">→</span>
              </Link>
            </div>
          </div>

          {/* Large Image - Always render the original image to prevent hydration errors */}
          <div className={`relative mb-12 transition-all ${transitionDuration} ease-out ${delay} ${
            isLoaded 
              ? 'translate-y-0' 
              : 'translate-y-8'
          }`}>
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
              <Image
              src="/images/fall26-recruitment.png"
              alt="MDB Recruitment Flyer"
              width={2384}
              height={1662}
              className="w-full h-auto object-contain"
              priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Recruitment Information */}
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 transition-all ${transitionDuration} ease-out ${delay} ${
            isLoaded 
              ? 'translate-y-0' 
              : 'translate-y-8'
          }`}>
            <div className="mdb-glass mdb-glass-hover p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#D1DFF2] text-mdb-blue">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3 className="text-xl font-raleway-semibold text-mdb-blue mb-3">What We Do</h3>
              <p className="text-gray-700 leading-relaxed">
                We build full-stack software and AI products, learn cutting-edge technologies, and create innovative solutions
                that make a real impact in the world.
              </p>
            </div>

            <div className="mdb-glass mdb-glass-hover p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#D1DFF2] text-mdb-blue">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-xl font-raleway-semibold text-mdb-blue mb-3">Why Join Us</h3>
              <p className="text-gray-700 leading-relaxed">
                Access to industry mentors, real-world projects, networking opportunities, and a supportive 
                community of like-minded developers.
              </p>
            </div>

            <div className="mdb-glass mdb-glass-hover p-6 md:col-span-2 lg:col-span-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#D1DFF2] text-mdb-blue">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <h3 className="text-xl font-raleway-semibold text-mdb-blue mb-3">What You&apos;ll Learn</h3>
              <p className="text-gray-700 leading-relaxed">
                Full-stack engineering, applied AI, UI/UX design, backend integration, project management, and
                the latest development frameworks and tools.
              </p>
            </div>
          </div>

          {/* Requirements + what membership offers */}
          <div className={`mb-12 transition-all ${transitionDuration} ease-out ${delay} ${
            isLoaded
              ? 'translate-y-0'
              : 'translate-y-8'
          }`}>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="mdb-glass-lg p-8">
                <h2 className="text-2xl md:text-3xl font-raleway-bold text-mdb-blue mb-6">
                  Application Requirements
                </h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-mdb-blue font-bold">•</span>
                    <span>Passion for full-stack software, AI, and entrepreneurship</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-mdb-blue font-bold">•</span>
                    <span>Willingness to learn and grow with the community</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-mdb-blue font-bold">•</span>
                    <span>Commitment to attending weekly meetings and socials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-mdb-blue font-bold">•</span>
                    <span>Taken or are currently enrolled in CS 61A (or equivalent prior coding experience)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-mdb-blue font-bold">•</span>
                    <span>At least 3 semesters left at Cal</span>
                  </li>
                </ul>
              </div>
              <div className="mdb-glass-lg p-8">
                <h2 className="text-2xl md:text-3xl font-raleway-bold text-mdb-blue mb-6">
                  What You&apos;ll Get
                </h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-mdb-blue font-bold">•</span>
                    <span>Hands-on full-stack and AI development experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-mdb-blue font-bold">•</span>
                    <span>Mentorship from industry professionals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-mdb-blue font-bold">•</span>
                    <span>Networking with tech companies and alumni</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-mdb-blue font-bold">•</span>
                    <span>Portfolio of real-world full-stack and AI projects</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Training Program */}
            <div className="mdb-glass-lg p-8">
              <h2 className="text-2xl md:text-3xl font-raleway-bold text-mdb-blue mb-4">
                Training Program
              </h2>
              <p className="text-gray-700 leading-relaxed">
                All of our new members undergo a semester-long training program where they will be introduced to full-stack and AI development using tools like React Native, Python, Supabase, PostgreSQL, and PyTorch, and are expected to build a final project.
              </p>
            </div>
          </div>

          {/* Apply Button */}
          <div className={`text-center transition-all ${transitionDuration} ease-out ${delay} ${
            isLoaded 
              ? 'translate-y-0' 
              : 'translate-y-8'
          }`}>
            <Link 
              href="https://airtable.com/appFIOUBsGeFZQVDK/pagwGgQSbNncvtkV5/form"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-mdb-blue text-white px-8 md:px-12 py-4 md:py-5 rounded-xl font-raleway-semibold text-lg md:text-xl hover:bg-mdb-gold hover:text-mdb-blue hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-lg origin-center shadow-xl"
            >
              Apply Now
              <span className="ml-2 text-xl">→</span>
            </Link>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-block bg-white border-2 border-mdb-blue text-mdb-blue px-8 md:px-12 py-4 md:py-5 rounded-xl font-raleway-semibold text-lg md:text-xl hover:bg-mdb-blue hover:text-white hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-lg origin-center shadow-xl"
              >
                Questions? Contact Us
                <span className="ml-2 text-xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 
