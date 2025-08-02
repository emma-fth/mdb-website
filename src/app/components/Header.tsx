'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [clickedItem, setClickedItem] = useState<string | null>(null)
  const [bubblePosition, setBubblePosition] = useState({ left: 0, width: 0 })
  const navRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({})
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleClick = (itemKey: string) => {
    setClickedItem(itemKey)
    updateBubblePosition(itemKey)
  }

  const updateBubblePosition = (itemKey: string) => {
    // Small delay to ensure DOM is ready
    requestAnimationFrame(() => {
      const itemElement = itemRefs.current[itemKey]
      if (itemElement && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect()
        const itemRect = itemElement.getBoundingClientRect()
        
        // Calculate position relative to the navigation container
        const left = itemRect.left - navRect.left
        const width = itemRect.width
        
        // Ensure we have valid values and add small buffer for consistency
        if (left >= 0 && width > 0) {
          setBubblePosition({
            left: Math.round(left - 2), // Small buffer for visual consistency
            width: Math.round(width + 4) // Small buffer for visual consistency
          })
        }
      }
    })
  }

  const navItems = [
    { key: 'about', href: '/about', label: 'About' },
    { key: 'projects', href: '/projects', label: 'Projects' },
    { key: 'training-program', href: '/training-program', label: 'Training Program' },
    { key: 'contact', href: '/contact', label: 'Contact' },
    { key: 'apply', href: '/apply', label: 'Apply' }
  ]

  // Determine which item should show the bubble (current page or clicked item)
  const activeItem = clickedItem || navItems.find(item => item.href === pathname)?.key || null

  // Update bubble position when page changes or on initial load
  useEffect(() => {
    if (activeItem && !clickedItem) {
      // Multiple attempts to ensure refs are available
      const attemptUpdate = (attempts = 0) => {
        if (attempts > 10) return // Max 10 attempts
        
        const itemElement = itemRefs.current[activeItem]
        if (itemElement && navRef.current) {
          updateBubblePosition(activeItem)
        } else {
          setTimeout(() => attemptUpdate(attempts + 1), 50)
        }
      }
      
      attemptUpdate()
    }
  }, [pathname, activeItem, clickedItem])

  return (
    <header className="fixed top-4 left-4 right-4 z-50 mdb-glass text-mdb-blue shadow-2xl backdrop-blur-xl backdrop-saturate-150 border-b border-white/10 rounded-2xl">
      <nav className="font-raleway-semibold container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/logos/mdb_3.svg"
              alt="MDB Website"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul 
            ref={navRef} 
            className="hidden md:flex space-x-6 relative"
          >
            {/* Sliding Bubble Background */}
            {activeItem && bubblePosition.width > 0 && (
              <div 
                className={`absolute top-0 h-full rounded-xl transition-all duration-300 ease-out ${
                  activeItem === 'apply' ? 'bg-mdb-gold' : 'bg-mdb-blue'
                }`}
                style={{
                  left: `${bubblePosition.left}px`,
                  width: `${bubblePosition.width}px`,
                  zIndex: -1
                }}
              />
            )}
            
            {navItems.map((item) => (
              <li key={item.key}>
                <Link 
                  href={item.href}
                  ref={(el) => {
                    itemRefs.current[item.key] = el
                  }}
                  onClick={() => handleClick(item.key)}
                  className={`block px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:drop-shadow-lg origin-center relative text-center min-w-[80px] ${
                    activeItem === item.key 
                      ? item.key === 'apply' ? 'text-mdb-blue font-semibold' : 'text-white'
                      : 'text-mdb-blue hover:text-mdb-blue/80'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative"
            aria-label="Toggle mobile menu"
          >
            <span 
              className={`block w-6 h-0.5 bg-mdb-blue transition-all duration-300 transform origin-center ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-2'
              }`}
            ></span>
            <span 
              className={`block w-6 h-0.5 bg-mdb-blue transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span 
              className={`block w-6 h-0.5 bg-mdb-blue transition-all duration-300 transform origin-center ${
                isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 mt-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <ul className="flex flex-col space-y-4 py-4 mdb-glass backdrop-blur-sm rounded-lg px-4 text-center">
            <li>
              <Link 
                href="/about" 
                className="block hover:text-mdb-blue/80 hover:scale-105 hover:translate-x-2 transition-all duration-300 transform py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                href="/projects" 
                className="block hover:text-mdb-blue/80 hover:scale-105 hover:translate-x-2 transition-all duration-300 transform py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link 
                href="/training-program" 
                className="block hover:text-mdb-blue/80 hover:scale-105 hover:translate-x-2 transition-all duration-300 transform py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Training Program
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className="block hover:text-mdb-blue/80 hover:scale-105 hover:translate-x-2 transition-all duration-300 transform py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link 
                href="/apply" 
                className="block px-4 py-2 bg-mdb-blue text-white rounded-xl hover:bg-mdb-blue/80 hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-lg origin-center text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Apply
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
} 