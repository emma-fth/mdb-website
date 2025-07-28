export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-gray-800">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Ready to start your next project? Get in touch with us today and let's discuss 
          how we can help bring your vision to life.
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800">Send us a message</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="John"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="john.doe@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="How can we help you?"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                placeholder="Tell us about your project and how we can help..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
            >
              Send Message
            </button>
          </form>
        </div>
        
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-semibold mb-8 text-gray-800">Get in touch</h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="text-3xl text-blue-600">📧</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
                  <p className="text-gray-600 text-lg">hello@mdbwebsite.com</p>
                  <p className="text-gray-600">We'll respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-3xl text-blue-600">📞</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone</h3>
                  <p className="text-gray-600 text-lg">+1 (555) 123-4567</p>
                  <p className="text-gray-600">Available Monday - Friday, 9 AM - 6 PM EST</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-3xl text-blue-600">📍</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Address</h3>
                  <p className="text-gray-600 text-lg">
                    123 Web Street<br />
                    Digital City, DC 12345<br />
                    United States
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-3xl text-blue-600">🕒</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Business Hours</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Why Choose Us?</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <span className="text-blue-600 mr-3">✓</span>
                Free initial consultation
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-3">✓</span>
                Custom solutions for your needs
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-3">✓</span>
                Fast turnaround times
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-3">✓</span>
                Ongoing support & maintenance
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 