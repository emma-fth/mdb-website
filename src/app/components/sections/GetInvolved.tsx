import Link from 'next/link'

const paths = [
  {
    eyebrow: 'For students',
    title: 'Build with us.',
    description: 'Join a tight-knit community, learn from experienced peers, and turn ambitious ideas into products people can use.',
    href: '/apply',
    cta: 'Explore membership'
  },
  {
    eyebrow: 'For partners',
    title: 'Build with MDB.',
    description: 'Work with a student team that brings technical curiosity, product thinking, and an entrepreneurial approach to hard problems.',
    href: '/contact',
    cta: 'Start a conversation'
  }
]

export default function GetInvolved() {
  return (
    <section className="bg-white px-6 py-24 md:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="font-raleway-semibold text-sm uppercase tracking-[0.28em] text-blue-600">Get involved</p>
          <h2 className="mt-4 font-raleway-bold text-4xl leading-tight tracking-tight text-mdb-blue md:text-6xl">
            There is a place for your next big idea here.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {paths.map((path, index) => (
            <article
              key={path.eyebrow}
              className={`rounded-[2rem] p-8 md:p-10 ${index === 0 ? 'bg-mdb-light-blue text-mdb-blue' : 'bg-mdb-blue text-white'}`}
            >
              <p className={`font-raleway-semibold text-sm uppercase tracking-[0.24em] ${index === 0 ? 'text-blue-600' : 'text-blue-200'}`}>
                {path.eyebrow}
              </p>
              <h3 className="mt-12 font-raleway-bold text-4xl md:text-5xl">{path.title}</h3>
              <p className={`mt-5 max-w-xl text-lg leading-relaxed ${index === 0 ? 'text-slate-700' : 'text-blue-100'}`}>
                {path.description}
              </p>
              <Link
                href={path.href}
                className={`mt-10 inline-flex items-center rounded-full px-6 py-3 font-raleway-semibold transition-transform duration-300 hover:-translate-y-1 ${index === 0 ? 'bg-mdb-blue text-white' : 'bg-mdb-gold text-mdb-blue'}`}
              >
                {path.cta} <span className="ml-2">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
