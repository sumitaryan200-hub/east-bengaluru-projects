import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Premium Golden Cursor Glow Follower.
 * Renders a soft luxury gold ambient glow that follows the user's cursor with custom spring physics.
 * Automatically expands and intensifies on interactive elements.
 * Deactivates on mobile devices.
 */
export default function CursorGlow() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  useEffect(() => {
    // Check if the user is on a touch device
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeaveWindow = () => {
      setIsVisible(false)
    }

    const handleMouseEnterWindow = () => {
      setIsVisible(true)
    }

    // Dynamic hover scaling using event delegation
    const handleMouseOver = (e) => {
      const target = e.target.closest(
        'a, button, input, select, [role="button"], .cursor-pointer, [onClick], article, .group'
      )
      setIsHovered(!!target)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeaveWindow)
    document.addEventListener('mouseenter', handleMouseEnterWindow)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeaveWindow)
      document.removeEventListener('mouseenter', handleMouseEnterWindow)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY, isVisible])

  // Custom high-fidelity spring configuration for a buttery-smooth fluid trailing feel
  const springConfig = { damping: 40, stiffness: 180, mass: 0.65 }
  const glowX = useSpring(mouseX, springConfig)
  const glowY = useSpring(mouseY, springConfig)

  // Interpolated visual values
  const glowSize = isHovered ? 400 : 250
  const glowOpacity = isHovered ? 0.09 : 0.055

  if (!isVisible) return null

  return (
    <motion.div
      style={{
        x: glowX,
        y: glowY,
        translateX: '-50%',
        translateY: '-50%',
        width: glowSize,
        height: glowSize,
      }}
      animate={{
        opacity: glowOpacity,
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.85)_0%,rgba(212,175,55,0.25)_35%,transparent_70%)] mix-blend-screen will-change-transform"
    />
  )
}
