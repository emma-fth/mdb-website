import { useState, useEffect } from 'react'

interface AnimationPreferences {
  isMobile: boolean
  prefersReducedMotion: boolean
  shouldReduceAnimations: boolean
}

export function useAnimationPreferences(): AnimationPreferences {
  const [preferences, setPreferences] = useState<AnimationPreferences>({
    isMobile: false,
    prefersReducedMotion: false,
    shouldReduceAnimations: false
  })

  useEffect(() => {
    const checkPreferences = () => {
      // Check if device is mobile
      const isMobile = window.innerWidth <= 768
      
      // Check if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      // Determine if animations should be reduced
      const shouldReduceAnimations = isMobile || prefersReducedMotion
      
      setPreferences({
        isMobile,
        prefersReducedMotion,
        shouldReduceAnimations
      })
    }

    // Check on mount
    checkPreferences()

    // Check on resize
    const handleResize = () => checkPreferences()
    window.addEventListener('resize', handleResize)

    // Listen for reduced motion preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = () => checkPreferences()
    mediaQuery.addEventListener('change', handleMotionChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      mediaQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  return preferences
}

// Convenience hook for conditional animation classes
export function useConditionalAnimation() {
  const { shouldReduceAnimations } = useAnimationPreferences()
  
  const getAnimationClass = (desktopClass: string, mobileClass: string = '') => {
    if (shouldReduceAnimations) {
      return mobileClass || 'transition-none'
    }
    return desktopClass
  }
  
  const getTransitionDuration = (desktopDuration: string, mobileDuration: string = 'duration-200') => {
    if (shouldReduceAnimations) {
      return mobileDuration
    }
    return desktopDuration
  }
  
  const getAnimationDelay = (desktopDelay: string, mobileDelay: string = 'delay-0') => {
    if (shouldReduceAnimations) {
      return mobileDelay
    }
    return desktopDelay
  }
  
  return {
    shouldReduceAnimations,
    getAnimationClass,
    getTransitionDuration,
    getAnimationDelay
  }
}
