import React, { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Premium Lenis Smooth Scroll global wrapper.
 * Provides a buttery-smooth scrolling experience across all sections.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Initialize Lenis with tailored luxury easing parameters
    const lenis = new Lenis({
      duration: 1.4, // Cinematic slow duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95, // Extremely refined pace
      touchMultiplier: 1.5,
      infinite: false,
    })

    // Setup RAF ticker
    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Handle internal link navigation scrolls gracefully via Lenis
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (target) {
        const id = target.getAttribute('href')
        if (id === '#') return
        const element = document.querySelector(id)
        if (element) {
          e.preventDefault()
          lenis.scrollTo(element, { offset: 0, duration: 1.5 })
        }
      }
    }
    document.addEventListener('click', handleAnchorClick)

    // Expose lenis instance globally for custom triggers if needed
    window.lenis = lenis

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
      window.lenis = null
    }
  }, [])

  return <>{children}</>
}
