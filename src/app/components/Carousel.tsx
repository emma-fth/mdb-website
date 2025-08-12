'use client'
import { useRef, useEffect } from 'react'
import { useTypingAnimation } from '../hooks/useTypingAnimation'
import { 
  CAROUSEL_ITEMS, 
  getCarouselStrip1, 
  getCarouselStrip2, 
  getCarouselStrip3,
  CAROUSEL_CONFIG 
} from '../constants/carousel'

export default function Carousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const carouselRef2 = useRef<HTMLDivElement>(null)
  const carouselRef3 = useRef<HTMLDivElement>(null)
  
  const { currentText } = useTypingAnimation({
    words: ['Baddies.', 'Boomers.', 'Bots.', 'Bruzz.', 'Ballers.', 'Beasts.', 'Baddies.', 'Boomers.', 'Bots.', 'Bruzz.', 'Ballers.', 'Beasts.'],
    typeSpeed: 150,
    deleteSpeed: 100,
    pauseDuration: 2000,
    loop: true
  })

  // Get carousel data from constants
  const strip1Items = getCarouselStrip1()
  const strip2Items = getCarouselStrip2()
  const strip3Items = getCarouselStrip3()

  // Duplicate media and captions for seamless infinite scroll
  const duplicatedStrip1 = [...strip1Items, ...strip1Items, ...strip1Items]
  const duplicatedStrip2 = [...strip2Items, ...strip2Items, ...strip2Items]
  const duplicatedStrip3 = [...strip3Items, ...strip3Items, ...strip3Items]

  useEffect(() => {
    const carousel1 = carouselRef.current
    const carousel2 = carouselRef2.current
    const carousel3 = carouselRef3.current
    if (!carousel1 || !carousel2 || !carousel3) return

    let animationId: number
    let lastTime = 0
    
    // Enable carousel animation on all devices, but adjust speed for mobile
    const isMobile = window.innerWidth <= 768
    const speed = isMobile ? 40 : 60 // Slightly slower on mobile for better performance
    const imageWidth = 432 // 400px width + 32px margin (mx-4 = 16px each side)
    
    // Use the same cycle length for all carousels to keep them synchronized
    const maxItems = Math.max(strip1Items.length, strip2Items.length, strip3Items.length)
    const cycleWidth = imageWidth * maxItems
    
    let translateX1 = 0
    let translateX2 = -cycleWidth // Start second carousel from left
    let translateX3 = 0 // Start third carousel same as first (right to left movement)

    const animate = (currentTime: number) => {
      if (lastTime === 0) lastTime = currentTime
      const deltaTime = (currentTime - lastTime) / 1000 // Convert to seconds
      lastTime = currentTime

      // Move all carousels at consistent speed
      const moveDistance = speed * deltaTime
      
      // First carousel moves right to left
      translateX1 -= moveDistance
      
      // Second carousel moves left to right
      translateX2 += moveDistance
      
      // Third carousel moves right to left (same as first)
      translateX3 -= moveDistance
      
      // Reset positions smoothly when they complete a cycle
      if (translateX1 <= -cycleWidth) {
        translateX1 = 0
      }
      if (translateX2 >= 0) {
        translateX2 = -cycleWidth
      }
      if (translateX3 <= -cycleWidth) {
        translateX3 = 0
      }
      
      carousel1.style.transform = `translateX(${translateX1}px)`
      carousel2.style.transform = `translateX(${translateX2}px)`
      carousel3.style.transform = `translateX(${translateX3}px)`
      animationId = requestAnimationFrame(animate)
    }

    // Always start carousel animation (enabled on all devices)
    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [strip1Items.length, strip2Items.length, strip3Items.length])

  return (
    <section className="w-screen bg-gradient-to-b from-mdb-light-blue to-white py-8 sm:py-12 md:py-16 relative left-1/2 -translate-x-1/2 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-mdb-light-blue to-white z-0"></div>
      <div className="mb-8 sm:mb-12 md:mb-16 relative z-10">
        <h2 className="text-5xl font-raleway-bold text-center text-mdb-blue">
          MD{currentText}
          <span className="animate-pulse text-mdb-blue">|</span>
        </h2>
      </div>
      
      {/* Full-width continuous sliding strip with alternating heights */}
      <div className="w-screen relative left-1/2 -translate-x-1/2 z-10">
        <div className="overflow-hidden h-[800px] sm:h-[900px] md:h-[1000px] lg:h-[1200px]">
          {/* First carousel strip - moves right to left */}
          <div 
            ref={carouselRef}
            className="flex items-start"
            style={{ 
              width: 'fit-content',
              willChange: 'transform' // Optimize for animations
            }}
          >
            {duplicatedStrip1.map((item, index) => (
              <div 
                key={index} 
                className="group flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] relative mx-2 sm:mx-3 md:mx-4 mt-6
                  lg:transition-all lg:transform lg:origin-center lg:duration-200
                  lg:hover:scale-105 lg:hover:translate-x-0.5 lg:hover:drop-shadow-md"
              >
                {/* Media container */}
                <div className="relative lg:w-full h-[200px] sm:h-[220px] md:h-[250px] lg:h-[250px]">
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover rounded-2xl"
                      onError={(e) => {
                        console.error('Video failed to load:', item.src, e)
                        // Fallback to showing a placeholder or error message
                        const videoElement = e.target as HTMLVideoElement
                        videoElement.style.display = 'none'
                        const parent = videoElement.parentElement
                        if (parent) {
                          const fallback = document.createElement('div')
                          fallback.className = 'w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center'
                          fallback.innerHTML = '<span class="text-gray-500">Video unavailable</span>'
                          parent.appendChild(fallback)
                        }
                      }}
                      onLoadStart={() => {
                        console.log('Video loading started:', item.src)
                      }}
                      onCanPlay={() => {
                        console.log('Video can play:', item.src)
                      }}
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={`MDB Community Photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-2xl"
                      onError={(e) => {
                        console.error('Image failed to load:', item.src, e)
                        const imgElement = e.target as HTMLImageElement
                        imgElement.style.display = 'none'
                        const parent = imgElement.parentElement
                        if (parent) {
                          const fallback = document.createElement('div')
                          fallback.className = 'w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center'
                          fallback.innerHTML = '<span class="text-gray-500">Image unavailable</span>'
                          parent.appendChild(fallback)
                        }
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully:', item.src)
                      }}
                    />
                  )}
                </div>
                {/* Caption card - slides out from underneath */}
                <div className="absolute top-[171px] sm:top-[191px] md:top-[221px] lg:top-[220px] left-0 right-0 bg-mdb-blue text-white text-sm px-4 py-3 rounded-b-2xl shadow-lg z-10 text-center
                  transition-all duration-200 ease-out
                  md:transform md:-translate-y-4 md:opacity-0 md:group-hover:translate-y-4 md:group-hover:opacity-100
                  transform-none opacity-100
                ">
                  {item.caption}
                </div>
              </div>
            ))}
          </div>

          {/* Second carousel strip - moves left to right */}
          <div 
            ref={carouselRef2}
            className="flex items-start mt-4 sm:mt-6 md:mt-8"
            style={{ 
              width: 'fit-content',
              willChange: 'transform' // Optimize for animations
            }}
          >
            {duplicatedStrip2.map((item, index) => (
              <div 
                key={`second-${index}`} 
                className="group flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] relative mx-2 sm:mx-3 md:mx-4 mt-6
                  lg:transition-all lg:transform lg:origin-center lg:duration-200
                  lg:hover:scale-105 lg:hover:translate-x-0.5 lg:hover:drop-shadow-md"
              >
                {/* Media container */}
                <div className="relative lg:w-full h-[200px] sm:h-[220px] md:h-[250px] lg:h-[250px]">
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover rounded-2xl"
                      onError={(e) => {
                        console.error('Video failed to load:', item.src, e)
                        // Fallback to showing a placeholder or error message
                        const videoElement = e.target as HTMLVideoElement
                        videoElement.style.display = 'none'
                        const parent = videoElement.parentElement
                        if (parent) {
                          const fallback = document.createElement('div')
                          fallback.className = 'w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center'
                          fallback.innerHTML = '<span class="text-gray-500">Video unavailable</span>'
                          parent.appendChild(fallback)
                        }
                      }}
                      onLoadStart={() => {
                        console.log('Video loading started:', item.src)
                      }}
                      onCanPlay={() => {
                        console.log('Video can play:', item.src)
                      }}
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={`MDB Community Photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-2xl"
                      onError={(e) => {
                        console.error('Image failed to load:', item.src, e)
                        const imgElement = e.target as HTMLImageElement
                        imgElement.style.display = 'none'
                        const parent = imgElement.parentElement
                        if (parent) {
                          const fallback = document.createElement('div')
                          fallback.className = 'w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center'
                          fallback.innerHTML = '<span class="text-gray-500">Image unavailable</span>'
                          parent.appendChild(fallback)
                        }
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully:', item.src)
                      }}
                    />
                  )}
                </div>
                {/* Caption card - slides out from underneath */}
                <div className="absolute top-[171px] sm:top-[191px] md:top-[221px] lg:top-[220px] left-0 right-0 bg-mdb-blue text-white text-sm px-4 py-3 rounded-b-2xl shadow-lg z-10 text-center
                  transition-all duration-200 ease-out
                  md:transform md:-translate-y-4 md:opacity-0 md:group-hover:translate-y-4 md:group-hover:opacity-100
                  transform-none opacity-100
                ">
                  {item.caption}
                </div>
              </div>
            ))}
          </div>

          {/* Third carousel strip - moves right to left */}
          <div 
            ref={carouselRef3}
            className="flex items-start mt-4 sm:mt-6 md:mt-8"
            style={{ 
              width: 'fit-content',
              willChange: 'transform' // Optimize for animations
            }}
          >
            {duplicatedStrip3.map((item, index) => (
              <div 
                key={`third-${index}`} 
                className="group flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] relative mx-2 sm:mx-3 md:mx-4 mt-6
                  lg:transition-all lg:transform lg:origin-center lg:duration-200
                  lg:hover:scale-105 lg:hover:translate-x-0.5 lg:hover:drop-shadow-md"
              >
                {/* Media container */}
                <div className="relative lg:w-full h-[200px] sm:h-[220px] md:h-[250px] lg:h-[250px]">
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover rounded-2xl"
                      onError={(e) => {
                        console.error('Video failed to load:', item.src, e)
                        // Fallback to showing a placeholder or error message
                        const videoElement = e.target as HTMLVideoElement
                        videoElement.style.display = 'none'
                        const parent = videoElement.parentElement
                        if (parent) {
                          const fallback = document.createElement('div')
                          fallback.className = 'w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center'
                          fallback.innerHTML = '<span class="text-gray-500">Video unavailable</span>'
                          parent.appendChild(fallback)
                        }
                      }}
                      onLoadStart={() => {
                        console.log('Video loading started:', item.src)
                      }}
                      onCanPlay={() => {
                        console.log('Video can play:', item.src)
                      }}
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={`MDB Community Photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-2xl"
                      onError={(e) => {
                        console.error('Image failed to load:', item.src, e)
                        const imgElement = e.target as HTMLImageElement
                        imgElement.style.display = 'none'
                        const parent = imgElement.parentElement
                        if (parent) {
                          const fallback = document.createElement('div')
                          fallback.className = 'w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center'
                          fallback.innerHTML = '<span class="text-gray-500">Image unavailable</span>'
                          parent.appendChild(fallback)
                        }
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully:', item.src)
                      }}
                    />
                  )}
                </div>
                {/* Caption card - slides out from underneath */}
                <div className="absolute top-[171px] sm:top-[191px] md:top-[221px] lg:top-[220px] left-0 right-0 bg-mdb-blue text-white text-sm px-4 py-3 rounded-b-2xl shadow-lg z-10 text-center
                  transition-all duration-200 ease-out
                  md:transform md:-translate-y-4 md:opacity-0 md:group-hover:translate-y-4 md:group-hover:opacity-100
                  transform-none opacity-100
                ">
                  {item.caption}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
} 