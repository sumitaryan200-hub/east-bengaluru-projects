import React from 'react'
import { motion } from 'framer-motion'

/**
 * Premium Stagger Reveal Container.
 * Automatically wraps and staggers the entry of all nested immediate children.
 * Perfect for grids of cards, list items, or navigation links.
 */
export default function StaggerReveal({
  children,
  staggerDelay = 0.12,
  delay = 0,
  duration = 0.9,
  distance = 30,
  once = true,
  className = '',
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        ease: [0.16, 1, 0.3, 1], // Cinematic smooth cubic-bezier curve
      },
    },
  }

  const childArray = React.Children.toArray(children)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      className={className}
    >
      {childArray.map((child, index) => (
        <motion.div key={index} variants={childVariants} className="h-full">
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
