'use client'
import { useEffect, useRef, useState } from 'react'
import Clients from './Clients'
import Link from 'next/link'

interface Client {
  name: string
  link: string
  type: string
  logo: string
  description: string
  techStack: string[]
  purpose: string
  date: string
  pms: string[]
  screenshots: string[]
}

const clientProjects: Client[] = [
  {
    name: "Joy",
    link: "https://joy-app.com",
    type: "AI Wellness Platform",
    logo: "/images/joy-logo.png",
    description: "At MDB, we brought the vision of Joy to reality, an innovative AI wellness platform. Utilizing cutting-edge AI, Joy analyzes emotions through voice, offering users personalized wellness practices.",
    techStack: ["Python", "React Native", "AI/ML"],
    purpose: "Mental Health Apps",
    date: "Spring 2024",
    pms: ["Amol", "Aldrin"],
    screenshots: [
      "/images/joy-screenshot1.png",
      "/images/joy-screenshot2.png",
      "/images/joy-screenshot3.png"
    ]
  },
  {
    name: "EduTech",
    link: "https://edutech-app.com",
    type: "Learning Management System",
    logo: "/images/edutech-logo.png",
    description: "A comprehensive online learning platform that revolutionizes how students and educators interact with educational content through interactive courses and real-time assessments.",
    techStack: ["React", "Node.js", "MongoDB"],
    purpose: "Education Technology",
    date: "Fall 2023",
    pms: ["Sarah", "Mike"],
    screenshots: [
      "/images/edutech-screenshot1.png",
      "/images/edutech-screenshot2.png"
    ]
  },
  {
    name: "HealthConnect",
    link: "https://healthconnect-app.com",
    type: "Healthcare Portal",
    logo: "/images/healthconnect-logo.png",
    description: "Secure patient management system with advanced appointment scheduling and comprehensive medical records management for healthcare providers.",
    techStack: ["Vue.js", "Python", "PostgreSQL"],
    purpose: "Healthcare Solutions",
    date: "Spring 2023",
    pms: ["Emma", "David"],
    screenshots: [
      "/images/healthconnect-screenshot1.png",
      "/images/healthconnect-screenshot2.png",
      "/images/healthconnect-screenshot3.png"
    ]
  }
]

export default function ProjectClients() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-[#D1DFF2] to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-raleway-bold text-blue-900 mb-4">Our Projects</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Explore our portfolio of innovative projects that showcase our expertise in building 
            cutting-edge solutions for real-world problems.
          </p>
        </div>
        
        <div className={`max-w-7xl mx-auto transition-all duration-[1500ms] ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clientProjects.map((client, index) => (
              <Clients
                key={index}
                client={client}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-blue-900 mb-6">
            Need an Innovative App or Web Solution?
          </h3>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Let Berkeley's Brightest Build It for You.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors shadow-lg"
          >
            Schedule a Meeting Now →
          </Link>
        </div>
      </div>
    </section>
  )
} 