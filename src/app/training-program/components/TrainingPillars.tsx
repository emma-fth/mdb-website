import Image from 'next/image'
import type { ReactNode } from 'react'

interface Pillar {
  title: string
  description: string
}

interface Technology {
  name: string
  logoSrc: string
  logoAlt: string
}

interface Topic {
  name: string
  icon: ReactNode
  iconClassName: string
}

const pillars: Pillar[] = [
  {
    title: 'AI Workflows',
    description: 'Prompting, iteration, evaluation, and using AI tools while still thinking for yourself.'
  },
  {
    title: 'Full Stack Basics',
    description: 'Frontend, backend, APIs, data, and how the pieces work together.'
  },
  {
    title: 'Machine Learning',
    description: 'Core ML ideas, practical use cases, and how ML shows up in real products.'
  },
  {
    title: 'Debugging And Review',
    description: 'Reading code, checking outputs, fixing issues, and making generated code cleaner.'
  },
  {
    title: 'Project Work',
    description: 'Building with teammates, shaping creative ideas, and shipping something real by the end.'
  },
  {
    title: 'Internship Prep',
    description: 'Applications, interviews, and getting more comfortable talking about your work.'
  }
]

const technologies: Technology[] = [
  { name: 'Figma', logoSrc: '/logos/technologies/figma.svg', logoAlt: 'Figma logo' },
  { name: 'React Native', logoSrc: '/logos/technologies/react.svg', logoAlt: 'React Native logo' },
  { name: 'Python', logoSrc: '/logos/technologies/python.svg', logoAlt: 'Python logo' },
  { name: 'Tailwind CSS', logoSrc: '/logos/technologies/tailwindcss.svg', logoAlt: 'Tailwind CSS logo' },
  { name: 'Supabase', logoSrc: '/logos/technologies/supabase.svg', logoAlt: 'Supabase logo' },
  { name: 'PostgreSQL', logoSrc: '/logos/technologies/postgresql.svg', logoAlt: 'PostgreSQL logo' },
  { name: 'Expo', logoSrc: '/logos/technologies/expo.svg', logoAlt: 'Expo logo' },
  { name: 'Swift', logoSrc: '/logos/technologies/swift.svg', logoAlt: 'Swift logo' },
  { name: 'PyTorch', logoSrc: '/logos/technologies/pytorch.svg', logoAlt: 'PyTorch logo' },
  { name: 'Docker', logoSrc: '/logos/technologies/docker.svg', logoAlt: 'Docker logo' },
  { name: 'Vercel', logoSrc: '/logos/technologies/vercel.svg', logoAlt: 'Vercel logo' },
  { name: 'Git & GitHub', logoSrc: '/logos/technologies/github.svg', logoAlt: 'GitHub logo' }
]

const topicIconClassName = 'h-11 w-11'

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M24 6L27.8 16.2L38 20L27.8 23.8L24 34L20.2 23.8L10 20L20.2 16.2L24 6Z" fill="currentColor" />
      <path d="M37 8L38.4 11.6L42 13L38.4 14.4L37 18L35.6 14.4L32 13L35.6 11.6L37 8Z" fill="currentColor" />
    </svg>
  )
}

function NodesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="13" cy="24" r="5" fill="currentColor" />
      <circle cx="35" cy="13" r="5" fill="currentColor" />
      <circle cx="35" cy="35" r="5" fill="currentColor" />
      <path d="M17.5 22.1L30.4 15.1M17.5 25.9L30.4 32.9" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  )
}

function BrainIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M19 10C14.6 10 11 13.6 11 18V18.3C8.6 19.8 7 22.4 7 25.4C7 29.6 10.4 33 14.6 33H18V10H19ZM29 10H30C34.4 10 38 13.6 38 18V18.3C40.4 19.8 42 22.4 42 25.4C42 29.6 38.6 33 34.4 33H30V10H29Z"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M24 10V38M18 18H24M24 18H30M18 26H24M24 26H30" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  )
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M10 36H38" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <rect x="13" y="23" width="5" height="13" rx="2.5" fill="currentColor" />
      <rect x="22" y="17" width="5" height="19" rx="2.5" fill="currentColor" />
      <rect x="31" y="12" width="5" height="24" rx="2.5" fill="currentColor" />
    </svg>
  )
}

function WindowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="8" y="10" width="32" height="26" rx="5" stroke="currentColor" strokeWidth="3.2" />
      <path d="M8 18H40M16 24H23M16 30H30" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" />
      <circle cx="19" cy="14" r="1.5" fill="currentColor" />
    </svg>
  )
}

function DatabaseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <ellipse cx="24" cy="13" rx="11" ry="5" stroke="currentColor" strokeWidth="3.2" />
      <path d="M13 13V24C13 26.8 17.9 29 24 29C30.1 29 35 26.8 35 24V13" stroke="currentColor" strokeWidth="3.2" />
      <path d="M13 24V35C13 37.8 17.9 40 24 40C30.1 40 35 37.8 35 35V24" stroke="currentColor" strokeWidth="3.2" />
    </svg>
  )
}

function BugIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M18 18L14 14M30 18L34 14M16 24H10M38 24H32M18 31L14 35M30 31L34 35" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M24 15C19.6 15 16 18.6 16 23V25C16 31.1 19.6 35 24 35C28.4 35 32 31.1 32 25V23C32 18.6 28.4 15 24 15Z" stroke="currentColor" strokeWidth="3.2" />
      <path d="M21 12.5C21 10.8 22.3 9.5 24 9.5C25.7 9.5 27 10.8 27 12.5V15H21V12.5Z" fill="currentColor" />
    </svg>
  )
}

function LayersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M24 10L9 18L24 26L39 18L24 10Z" fill="currentColor" />
      <path d="M14 24L24 30L34 24M14 30L24 36L34 30" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function RocketIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M28 10C34 11 37 14 38 20C33 20.2 29.2 21.7 25.8 25.1C22.4 28.5 20.8 32.3 20.6 37C14.6 36 11.2 32.5 10 27C13.7 26.5 17.1 24.8 20.2 21.7C23.4 18.5 25.1 14.8 25.6 11C26.4 10.8 27.2 10.6 28 10Z" fill="currentColor" />
      <circle cx="30.5" cy="17.5" r="2.6" fill="white" />
      <path d="M16 31L12 35M18.5 35.5L15 39" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  )
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="10" y="15" width="28" height="20" rx="4.5" stroke="currentColor" strokeWidth="3.2" />
      <path d="M19 15V12.8C19 11.3 20.3 10 21.8 10H26.2C27.7 10 29 11.3 29 12.8V15" stroke="currentColor" strokeWidth="3.2" />
      <path d="M10 24H38M21 24H27" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  )
}

const topics: Topic[] = [
  { name: 'Prompting', icon: <SparkIcon className={topicIconClassName} />, iconClassName: 'text-[#253C7D]' },
  { name: 'AI Agents', icon: <NodesIcon className={topicIconClassName} />, iconClassName: 'text-[#4A8CF4]' },
  { name: 'Model Basics', icon: <BrainIcon className={topicIconClassName} />, iconClassName: 'text-[#35B8E0]' },
  { name: 'Model Eval', icon: <ChartIcon className={topicIconClassName} />, iconClassName: 'text-[#F59E0B]' },
  { name: 'UI Flows', icon: <WindowIcon className={topicIconClassName} />, iconClassName: 'text-[#253C7D]' },
  { name: 'APIs', icon: <LayersIcon className={topicIconClassName} />, iconClassName: 'text-[#22A07A]' },
  { name: 'Data Models', icon: <DatabaseIcon className={topicIconClassName} />, iconClassName: 'text-[#5C6BDB]' },
  { name: 'Debugging', icon: <BugIcon className={topicIconClassName} />, iconClassName: 'text-[#EF5B2A]' },
  { name: 'Shipping', icon: <RocketIcon className={topicIconClassName} />, iconClassName: 'text-[#253C7D]' },
  { name: 'Interviews', icon: <BriefcaseIcon className={topicIconClassName} />, iconClassName: 'text-[#0F766E]' }
]

export default function TrainingPillars() {
  return (
    <section id="what-we-cover" className="py-16 bg-gradient-to-b from-white to-[#D1DFF2]">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-raleway-bold text-blue-900 md:text-5xl">
            Training Program
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            Practical 12-week program teaching new MDB members to learn the tools, build creative projects, and get comfortable working across the stack.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            {pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="mdb-glass mdb-glass-hover p-7"
              >
                <h3 className="text-2xl font-raleway-bold text-blue-900">{pillar.title}</h3>
                <p className="mt-3 text-base leading-7 text-gray-700">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-[1480px]">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-3xl font-raleway-bold text-blue-900 md:text-4xl">
              Topics
            </h3>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
            {topics.map((topic) => (
              <article
                key={topic.name}
                className="mdb-glass mdb-glass-hover flex min-h-[165px] flex-col items-center justify-center rounded-[2rem] px-6 py-8 text-center"
              >
                <div className={topic.iconClassName}>{topic.icon}</div>
                <h4 className="mt-5 text-2xl font-raleway-bold leading-tight text-blue-900">
                  {topic.name}
                </h4>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-28 max-w-[1480px] md:mt-32">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-3xl font-raleway-bold text-blue-900 md:text-4xl">
              Technologies
            </h3>
            <p className="mt-5 text-lg leading-8 text-gray-700">
              Master the industry-standard tools and technologies used by builders and developers in the AI-era.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3 xl:grid-cols-6">
            {technologies.map((technology) => (
              <article
                key={technology.name}
                className="mdb-glass mdb-glass-hover flex min-h-[175px] flex-col items-center justify-center rounded-[2rem] px-6 py-8 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center">
                  <Image
                    src={technology.logoSrc}
                    alt={technology.logoAlt}
                    width={56}
                    height={56}
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <h4 className="mt-6 text-2xl font-raleway-bold leading-tight text-blue-900">
                  {technology.name}
                </h4>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
