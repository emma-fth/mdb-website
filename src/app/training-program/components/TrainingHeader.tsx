export default function TrainingHeader() {
  return (
    <section className="min-h-[88vh] w-screen bg-gradient-to-b from-[#D1DFF2] to-white flex items-center -mt-20 relative mb-0 py-8 md:py-12 lg:py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-[#D1DFF2] to-white z-0" />

      <div className="w-full px-4 py-8 pt-20 md:pt-24 lg:pt-28 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-patua-one text-blue-900 mb-8 animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              Education
            </h1>

            <p
              className="text-lg md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-fade-in-up"
              style={{ animationDelay: '0.25s' }}
            >
              A practical program covering AI-assisted development, full stack fundamentals,
              product thinking, and team project work.
            </p>

            <div
              className="mt-8 flex flex-wrap justify-center gap-4 animate-fade-in-up"
              style={{ animationDelay: '0.35s' }}
            >
              <a
                href="#what-we-cover"
                className="inline-block bg-mdb-blue text-white px-8 py-4 rounded-xl font-raleway-semibold text-lg hover:bg-mdb-gold hover:text-mdb-blue hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-lg origin-center shadow-xl"
              >
                See The Program
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
