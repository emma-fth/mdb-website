'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useAnimationLoad } from '../../hooks/useAnimationLoad'

export default function TitleSection() {
  const { isLoaded } = useAnimationLoad()

  return (
    <section className="relative -mt-20 min-h-screen w-screen overflow-hidden bg-mdb-blue pt-28 text-white md:pt-32 lg:pt-36">
      <div className="absolute -left-32 top-40 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute -right-24 bottom-12 h-96 w-96 rounded-full bg-mdb-gold/20 blur-3xl" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl items-center gap-12 px-6 pb-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 lg:px-10">
        <div className={`transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <p className="mb-6 font-raleway-semibold text-sm uppercase tracking-[0.28em] text-blue-100">
            MDB · UC Berkeley
          </p>
          <h1 className="max-w-4xl font-raleway-bold text-[clamp(2.75rem,6.2vw,5.75rem)] leading-[0.98] tracking-[-0.04em]">
            A community of builders passionate about
            <span className="block text-mdb-gold">software, AI, and entrepreneurship.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-blue-100 md:text-xl">
            We turn ambitious ideas into real products, learn by building, and support one another from Berkeley to beyond.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full bg-mdb-gold px-7 py-3.5 font-raleway-semibold text-mdb-blue transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Explore our work <span className="ml-2">→</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-3.5 font-raleway-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-mdb-blue"
            >
              Meet the community
            </Link>
            <Link
              href="https://airtable.com/appFIvvLKJj8FpDou/shrg6q9IqDVmp1ybB"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-5 py-3.5 font-raleway-semibold text-blue-100 transition-colors duration-300 hover:text-white"
            >
              Coffee chats ↗
            </Link>
          </div>
        </div>

        <div className={`relative transition-all delay-200 duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="relative mx-auto aspect-square max-w-[560px] rounded-[2.5rem] border border-white/30 bg-white/95 p-6 shadow-2xl shadow-blue-950/30 md:p-10">
            <div className="absolute -left-5 top-12 z-10 rounded-full bg-mdb-gold px-4 py-2 font-raleway-bold text-xs uppercase tracking-[0.2em] text-mdb-blue shadow-lg">
              Build boldly
            </div>
            <Image
              src="/images/mdb-logo-large.png"
              alt="MDB logo"
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 42vw"
              className="object-contain p-8 md:p-12"
            />
            <div className="absolute -bottom-5 right-8 z-10 rounded-2xl border border-white/40 bg-mdb-light-blue px-5 py-3 text-sm font-raleway-semibold text-mdb-blue shadow-lg">
              Since 2015 · Berkeley, CA
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
