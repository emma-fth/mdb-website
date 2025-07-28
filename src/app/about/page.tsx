export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 text-gray-800">
          About MDB Website
        </h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Our Story</h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              Founded in 2024, MDB Website represents the cutting edge of modern web development. 
              We specialize in creating fast, responsive, and user-friendly websites using the 
              latest technologies like React and Next.js.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              Our team combines technical expertise with creative vision to deliver exceptional 
              digital experiences that help businesses grow and succeed online.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              We believe in clean code, beautiful design, and measurable results that make a 
              real difference for our clients.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Our Mission</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              To empower businesses with modern, high-performance websites that drive growth 
              and create meaningful connections with their audiences.
            </p>
            
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Our Values</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <span className="text-blue-600 mr-3">✓</span>
                Excellence in every detail
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-3">✓</span>
                Innovation and continuous learning
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-3">✓</span>
                Transparent communication
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-3">✓</span>
                Client-first approach
              </li>
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800">Our Approach</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Strategy First</h3>
              <p className="text-gray-600">
                We start by understanding your goals and target audience to create the perfect strategy.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Design Excellence</h3>
              <p className="text-gray-600">
                Beautiful, intuitive designs that reflect your brand and engage your users.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Fast Delivery</h3>
              <p className="text-gray-600">
                Efficient development process with regular updates and transparent communication.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 