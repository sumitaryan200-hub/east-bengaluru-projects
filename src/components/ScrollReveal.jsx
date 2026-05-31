import React from 'react'
import { motion } from 'framer-motion'

/**
 * Viewport-triggered scroll reveal element.
 * Smoothly animations nested child components as they enter the screen.
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 1.0,
  distance = 35,
  once = true,
  className = '',
}) {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    fade: {},
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Luxury organic ease-out curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
