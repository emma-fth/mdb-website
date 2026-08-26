'use client'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { useAnimationLoad } from '../hooks/useAnimationLoad'

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-8 w-8"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.75 7.5A2.25 2.25 0 0 1 6 5.25h12A2.25 2.25 0 0 1 20.25 7.5v9A2.25 2.25 0 0 1 18 18.75H6A2.25 2.25 0 0 1 3.75 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m4.5 7.5 6.63 5.3a1.5 1.5 0 0 0 1.74 0l6.63-5.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface Channel {
  label: string
  href: string
  external: boolean
  icon: ReactNode
}

const channels: Channel[] = [
  {
    label: '@mdbdev',
    href: 'https://instagram.com/mdbdev',
    external: true,
    icon: (
      <Image
        src="/logos/instagram.svg"
        alt="Instagram"
        width={32}
        height={32}
        className="h-8 w-8 object-contain"
      />
    ),
  },
  {
    label: 'contact@mdb.dev',
    href: 'mailto:contact@mdb.dev',
    external: false,
    icon: <MailIcon />,
  },
  {
    label: 'MDB on LinkedIn',
    href: 'https://www.linkedin.com/company/mobile-developers-of-berkeley/',
    external: true,
    icon: (
      <Image
        src="/logos/linkedin-icon.svg"
        alt="LinkedIn"
        width={32}
        height={32}
        className="h-8 w-8 object-contain"
      />
    ),
  },
]

export default function Contact() {
  const { isLoaded } = useAnimationLoad()

  return (
    <section className="min-h-[calc(100vh-5rem)] w-screen bg-gradient-to-b from-mdb-light-blue via-white to-white flex items-center justify-center pt-8 pb-24 md:pt-10 md:pb-32 lg:pt-12 lg:pb-36">
      <div className="absolute inset-0 bg-gradient-to-b from-mdb-light-blue via-white to-white z-0"></div>

      <div className="w-full max-w-5xl mx-auto px-4 relative z-10">
        <div
          className={`mdb-glass-lg p-8 md:p-12 lg:p-14 transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
            <h1 className="text-[clamp(2rem,5vw,3.75rem)] font-raleway-bold text-mdb-blue mb-4">
              Contact Us
            </h1>
            <p className="text-[clamp(1rem,2.5vw,1.2rem)] text-gray-700 leading-relaxed">
              Questions about MDB, recruiting, projects, or partnerships? Reach out by email or say hi on Instagram.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.external ? '_blank' : undefined}
                rel={channel.external ? 'noopener noreferrer' : undefined}
                className="group relative flex flex-col items-center justify-center gap-5 rounded-[28px] border border-white/60 bg-white/70 backdrop-blur-md px-5 py-9 md:py-11 text-center shadow-lg shadow-mdb-blue/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 hover:shadow-xl hover:shadow-mdb-blue/15"
              >
                <span className="absolute right-4 top-4 text-mdb-blue/30 transition-all duration-300 group-hover:text-mdb-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowIcon />
                </span>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-mdb-blue ring-1 ring-black/5 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  {channel.icon}
                </div>

                <span className="text-lg lg:text-xl font-raleway-bold text-mdb-blue break-words">
                  {channel.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
