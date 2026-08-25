'use client'
import { useSectionAnimation } from '../../hooks/useIntersectionObserver'

interface CompanyLogo {
  src: string
  alt: string
  /** Optional Tailwind scale class for artwork with lots of built-in whitespace. */
  scale?: string
}

const companyLogos: CompanyLogo[] = [
  { src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', alt: 'Google' },
  { src: '/logos/janestreet.png', alt: 'Jane Street' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', alt: 'Amazon' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg', alt: 'Microsoft' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', alt: 'Apple' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg', alt: 'Meta' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/9/97/OpenAI_logo_2025.svg', alt: 'OpenAI' },
  { src: '/logos/atlassian.png', alt: 'Atlassian', scale: 'scale-[1.35]' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Databricks_Logo.png', alt: 'Databricks', scale: 'scale-125' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png', alt: 'LinkedIn' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg', alt: 'Tesla' },
  { src: '/logos/bloomberg.png', alt: 'Bloomberg' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/NVIDIA_logo.svg', alt: 'NVIDIA' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Citadel_LLC_Logo.svg', alt: 'Citadel', scale: 'scale-[1.15]' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/d/de/SpaceX-Logo.svg', alt: 'SpaceX' },
  { src: '/logos/imc.png', alt: 'IMC' },
  { src: '/logos/ycombinator.png', alt: 'Y Combinator' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Goldman_Sachs.svg', alt: 'Goldman Sachs', scale: 'scale-125' },
  { src: '/logos/blackrock.png', alt: 'BlackRock', scale: 'scale-[1.35]' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg', alt: 'Stripe' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Two_Sigma_logo.svg', alt: 'Two Sigma', scale: 'scale-[1.15]' },
  { src: '/logos/point72.png', alt: 'Point72' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg', alt: 'Uber', scale: 'scale-90' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg', alt: 'IBM', scale: 'scale-90' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Balyasny_Asset_Management_2025_logo.png', alt: 'Balyasny Asset Management' },
]

export default function Destinations() {
  const { isVisible, elementRef: sectionRef } = useSectionAnimation<HTMLElement>()
  const { isVisible: logosVisible, elementRef: logosRef } = useSectionAnimation<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section ref={sectionRef} className="w-full bg-gradient-to-b from-white to-blue-100 py-16">
      <div className={`max-w-6xl mx-auto px-4 mb-12 -mt-16 transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}>
        <h2 className="text-4xl md:text-5xl font-raleway-bold text-center text-mdb-blue mb-6 drop-shadow-sm">
          Our Destinations
        </h2>
      </div>
      
      <div className={`max-w-6xl mx-auto px-4 transition-all duration-1000 ease-out delay-200 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}>
        <div className="text-center mb-12">
          <p className="text-xl text-gray-700 mb-4">
            At MDB, our members and alumni have a track record of success,
            <br />
            moving on to positions in leading companies and innovative startups.
          </p>
          <p className="text-xl text-gray-700">
            Here&apos;s a glimpse of the companies where our members make an impact.
          </p>
        </div>

        {/* Company Logos Grid */}
        <div ref={logosRef} className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center mb-16 transition-all duration-1000 ease-out delay-400 ${
          logosVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}>
          {companyLogos.map((company) => (
            <div key={company.alt} className="group flex h-20 w-full items-center justify-center">
              {/* Bounded box: wide wordmarks are capped by width, square marks by height. */}
              <div
                className={`flex h-14 w-full max-w-[170px] items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-2xl group-hover:brightness-110 ${company.scale ?? ''}`}
              >
                <img
                  src={company.src}
                  alt={company.alt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 
