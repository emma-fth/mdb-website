export default function Services() {
  const services = [
    {
      title: "Web Development",
      description: "Custom websites and web applications built with modern frameworks like Next.js and React.",
      features: ["Responsive Design", "SEO Optimization", "Performance Optimization", "Cross-browser Compatibility"],
      icon: "💻"
    },
    {
      title: "E-commerce Solutions",
      description: "Complete online store development with secure payment processing and inventory management.",
      features: ["Shopping Cart", "Payment Integration", "Order Management", "Customer Accounts"],
      icon: "🛒"
    },
    {
      title: "UI/UX Design",
      description: "Beautiful, intuitive user interfaces that provide exceptional user experiences.",
      features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
      icon: "🎨"
    },
    {
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies to grow your online presence.",
      features: ["SEO Strategy", "Content Marketing", "Social Media", "Analytics & Reporting"],
      icon: "📈"
    },
    {
      title: "Mobile Development",
      description: "Native and cross-platform mobile apps that work seamlessly across devices.",
      features: ["iOS Development", "Android Development", "React Native", "App Store Optimization"],
      icon: "📱"
    },
    {
      title: "Consulting & Support",
      description: "Expert guidance and ongoing support to help your digital projects succeed.",
      features: ["Technical Consulting", "Performance Audits", "Maintenance", "Training"],
      icon: "🤝"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-gray-800">Our Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We offer comprehensive digital solutions to help your business thrive in the modern web landscape.
          From design to development to marketing, we've got you covered.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">{service.title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
            
            <h4 className="font-semibold mb-3 text-gray-800">Key Features:</h4>
            <ul className="space-y-2 mb-6">
              {service.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="text-gray-600 flex items-center">
                  <span className="text-blue-600 mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
            
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Learn More
            </button>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Start Your Project?
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Let's discuss how we can help bring your vision to life with our expert services.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
          Get a Free Quote
        </button>
      </section>
    </div>
  )
} 