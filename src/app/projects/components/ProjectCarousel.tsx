'use client'
import { useSectionAnimation } from '../../hooks/useIntersectionObserver'
import { useAnimationPreferences } from '../../hooks/useAnimationPreferences'

interface ProjectPhase {
  title: string
  description: string
}

const projectPhases: ProjectPhase[] = [
  {
    title: 'Scope',
    description:
      'Each team starts with a real client and a real problem. We define the product together, talk to users early, and keep iterating on the plan as we learn.'
  },
  {
    title: 'Build',
    description:
      'Teams work in short sprints toward concrete milestones, with regular standups and demos to the rest of the org so feedback arrives while it can still change the product.'
  },
  {
    title: 'Ship',
    description:
      'Every project ends with a launch. Teams hand off a working product and present the results to the club and the wider community.'
  }
]

export default function ProjectCarousel() {
  const { isVisible, elementRef: sectionRef } = useSectionAnimation<HTMLElement>()
  const { shouldReduceAnimations } = useAnimationPreferences()

  const transitionDuration = shouldReduceAnimations ? 'duration-700' : 'duration-[1500ms]'

  return (
    <section ref={sectionRef} className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-white to-[#D1DFF2]">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-raleway-bold text-blue-900">
            How a project runs
          </h2>
        </div>

        <div
          className={`max-w-6xl mx-auto grid gap-6 md:grid-cols-3 md:gap-8 transition-all ${transitionDuration} ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {projectPhases.map((phase, index) => (
            <article
              key={phase.title}
              className="mdb-glass mdb-glass-hover p-7 sm:p-8 flex flex-col h-full"
            >
              <span
                className="font-patua-one text-4xl sm:text-5xl leading-none text-mdb-blue/25"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 text-xl sm:text-2xl font-raleway-bold text-blue-900">
                {phase.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                {phase.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
