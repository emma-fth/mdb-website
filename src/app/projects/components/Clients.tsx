'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Client } from '../../constants/projects'
import Lightbox from './Lightbox'

interface ClientsProps {
  client: Client
  className?: string
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Clients({ client, className = '' }: ClientsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const showLink = Boolean(client.link) && !client.disableViewProject
  const isSet = (value: string) => Boolean(value) && value.trim().toUpperCase() !== 'N/A'
  const date = isSet(client.date) ? client.date : ''
  const pmList = client.pms.filter(isSet)
  const meta = [date, pmList.length > 0 ? `${pmList.length > 1 ? 'PMs' : 'PM'} ${pmList.join(', ')}` : '']
    .filter(Boolean)
    .join(' · ')

  return (
    <article className={`mdb-glass mdb-glass-hover p-6 sm:p-7 md:p-8 flex flex-col h-full ${className}`}>
      <header>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-xl sm:text-2xl font-raleway-bold text-blue-900 leading-tight">
              {client.name}
            </h3>
            <p className="mt-1 text-sm sm:text-base text-gray-600">{client.type}</p>
          </div>
          {showLink && (
            <Link
              href={client.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex flex-shrink-0 items-center gap-1 text-sm font-raleway-semibold text-mdb-blue hover:text-mdb-gold transition-colors"
            >
              Visit
              <ArrowIcon />
            </Link>
          )}
        </div>

        {meta && <p className="mt-3 text-xs sm:text-sm text-gray-500">{meta}</p>}
      </header>

      {client.techStack.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
          {client.techStack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-mdb-blue/15 bg-white/70 px-2.5 py-1 text-xs font-medium text-mdb-blue"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-5 text-sm text-gray-600 leading-relaxed">{client.description}</p>

      {client.screenshots.length > 0 && (
        <div className="mt-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide touch-scroll">
          {client.screenshots.map((screenshot, index) => (
            <button
              key={screenshot}
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Open ${client.name} screenshot ${index + 1}`}
              className="group/shot relative w-28 h-48 sm:w-32 sm:h-56 flex-shrink-0 rounded-lg overflow-hidden ring-1 ring-black/10 transition-all duration-200 hover:ring-mdb-blue/40 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-mdb-blue"
            >
              <img
                src={screenshot}
                alt={`${client.name} screenshot ${index + 1}`}
                className="object-cover w-full h-full transition-transform duration-300 group-hover/shot:scale-[1.03]"
              />
            </button>
          ))}
        </div>
      )}

      {openIndex !== null && (
        <Lightbox
          images={client.screenshots}
          index={openIndex}
          alt={client.name}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </article>
  )
}
