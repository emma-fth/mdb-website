'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSectionAnimation } from '../../hooks/useIntersectionObserver'

const pillars = [
  {
    number: '01',
    title: 'Software',
    description: 'Design and ship thoughtful products across web, mobile, backend, and emerging platforms.'
  },
  {
    number: '02',
    title: 'AI',
    description: 'Turn modern models into useful systems through hands-on experimentation and responsible engineering.'
  },
  {
    number: '03',
    title: 'Entrepreneurship',
    description: 'Think like founders: start with real problems, move quickly, talk to users, and create lasting value.'
  }
]

export default function PurpAndComm() {
  const { isVisible, elementRef: sectionRef } = useSectionAnimation<HTMLElement>()
  const [counters, setCounters] = useState({ semesters: 0, projects: 0, members: 0 })

  useEffect(() => {
    if (!isVisible) return

    const targets = { semesters: 20, projects: 30, members: 50 }
    const duration = 1600
    const start = performance.now()

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1)
      setCounters({
        semesters: Math.floor(targets.semesters * progress),
        projects: Math.floor(targets.projects * progress),
        members: Math.floor(targets.members * progress)
      })

      if (progress < 1) requestAnimationFrame(animate)
    }

    const animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isVisible])

  return (
    <section ref={sectionRef} className="relative left-1/2 w-screen -translate-x-1/2 bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className={`mx-auto max-w-4xl text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <p className="font-raleway-semibold text-sm uppercase tracking-[0.28em] text-blue-600">What drives us</p>
          <h2 className="mt-4 font-raleway-bold text-4xl leading-tight tracking-tight text-mdb-blue md:text-6xl">
            Build ambitiously. Grow together.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 md:text-xl">
            MDB brings together people who are curious enough to explore, practical enough to ship, and generous enough to help one another improve.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className={`group rounded-[2rem] border border-slate-200 bg-slate-50 p-7 transition-all duration-700 hover:-translate-y-2 hover:border-blue-200 hover:bg-white hover:shadow-xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-raleway-bold text-sm tracking-[0.2em] text-blue-500">{pillar.number}</span>
                <span className="h-2.5 w-2.5 rounded-full bg-mdb-gold transition-transform duration-300 group-hover:scale-[2]" />
              </div>
              <h3 className="mt-12 font-raleway-bold text-3xl text-mdb-blue">{pillar.title}</h3>
              <p className="mt-4 leading-relaxed text-slate-600">{pillar.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative overflow-hidden rounded-[2rem]">
            <Image
              src="/images/mdb8.jpg"
              alt="MDB members building together"
              width={900}
              height={700}
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div>
            <p className="font-raleway-semibold text-sm uppercase tracking-[0.28em] text-blue-600">From idea to impact</p>
            <h2 className="mt-4 font-raleway-bold text-4xl leading-tight text-mdb-blue md:text-5xl">
              Learn by building things that matter.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Our teams work across disciplines to take products from an open-ended problem to a polished launch. Members practice technical judgment, product thinking, leadership, and collaboration in the same room.
            </p>
          </div>
        </div>

        <div className="mt-24 grid gap-8 rounded-[2.5rem] bg-mdb-blue px-8 py-12 text-center text-white shadow-2xl shadow-blue-950/15 md:grid-cols-3 md:px-12">
          <div>
            <p className="font-raleway-bold text-5xl text-mdb-gold md:text-6xl">{counters.semesters}+</p>
            <p className="mt-3 text-blue-100">semesters building</p>
          </div>
          <div className="border-y border-white/15 py-8 md:border-x md:border-y-0 md:py-0">
            <p className="font-raleway-bold text-5xl text-mdb-gold md:text-6xl">{counters.projects}+</p>
            <p className="mt-3 text-blue-100">projects completed</p>
          </div>
          <div>
            <p className="font-raleway-bold text-5xl text-mdb-gold md:text-6xl">{counters.members}+</p>
            <p className="mt-3 text-blue-100">active builders</p>
          </div>
        </div>

        <div className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:order-2">
            <Image
              src="/images/mdb-hawaii.JPG"
              alt="MDB community gathering"
              width={900}
              height={700}
              className="aspect-[4/3] w-full rounded-[2rem] object-cover"
            />
          </div>
          <div className="lg:order-1">
            <p className="font-raleway-semibold text-sm uppercase tracking-[0.28em] text-blue-600">People first</p>
            <h2 className="mt-4 font-raleway-bold text-4xl leading-tight text-mdb-blue md:text-5xl">
              The community lasts beyond the project.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Retreats, dinners, study sessions, and spontaneous adventures turn teammates into close friends. MDB is a place to do serious work without taking yourself too seriously.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
