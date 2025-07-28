export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Welcome to MDB Website
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Building modern, responsive web experiences with React and Next.js
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-6">🚀</div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Fast Performance</h3>
            <p className="text-gray-600 leading-relaxed">
              Lightning-fast loading times and optimized performance for the best user experience.
            </p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-6">📱</div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Responsive Design</h3>
            <p className="text-gray-600 leading-relaxed">
              Perfect experience across all devices and screen sizes, from mobile to desktop.
            </p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-6">🔧</div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Modern Technology</h3>
            <p className="text-gray-600 leading-relaxed">
              Built with the latest technologies including React, Next.js, and TypeScript.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-gray-100 rounded-xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore our services and discover how we can help bring your vision to life.
        </p>
        <div className="space-x-4">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            View Services
          </button>
          <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  )
} 