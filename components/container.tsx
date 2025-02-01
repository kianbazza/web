'use client'

import { cn } from '@/lib/utils'
import { motion, type HTMLMotionProps, type Variants } from 'motion/react'

const variants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.99,
    translateY: 5,
    filter: 'blur(2px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    translateY: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
}

export default function Container({
  children,
  className,
  ...props
}: Readonly<HTMLMotionProps<'div'>>) {
  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {children}
    </motion.div>
  )
}
