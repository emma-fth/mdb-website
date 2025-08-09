'use client'
import { useEffect, useRef, useState, RefObject } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  rootMargin?: string
  triggerOnce?: boolean
}

interface UseMultipleIntersectionObserverOptions {
  elements: Array<{
    ref: RefObject<HTMLElement>
    threshold?: number
    rootMargin?: string
    triggerOnce?: boolean
  }>
}

export function useIntersectionObserver(options: UseIntersectionObserverOptions = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLElement>(null)
  
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (triggerOnce) {
              observer.unobserve(entry.target)
            }
          } else if (!triggerOnce) {
            setIsVisible(false)
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce])

  return { isVisible, elementRef }
}

export function useMultipleIntersectionObserver(options: UseMultipleIntersectionObserverOptions) {
  const [visibilityStates, setVisibilityStates] = useState<{ [key: string]: boolean }>({})
  const elementRefs = useRef<{ [key: string]: RefObject<HTMLElement> }>({})

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    options.elements.forEach((elementConfig, index) => {
      const key = `element-${index}`
      elementRefs.current[key] = elementConfig.ref

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibilityStates(prev => ({ ...prev, [key]: true }))
            if (elementConfig.triggerOnce !== false) {
              observer.unobserve(entry.target)
            }
          } else if (elementConfig.triggerOnce !== false) {
            setVisibilityStates(prev => ({ ...prev, [key]: false }))
          }
        },
        { 
          threshold: elementConfig.threshold || 0.2,
          rootMargin: elementConfig.rootMargin || '0px 0px -50px 0px'
        }
      )

      if (elementConfig.ref.current) {
        observer.observe(elementConfig.ref.current)
      }
      observers.push(observer)
    })

    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [options.elements])

  return { visibilityStates, elementRefs }
}
