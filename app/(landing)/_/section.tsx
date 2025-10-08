import { type HTMLMotionProps, motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { sectionVariants } from './variants'

export const Section = ({
  children,
  className,
  ...props
}: HTMLMotionProps<'div'>) => (
  <motion.div
    className={cn('space-y-3', className)}
    variants={sectionVariants}
    {...props}
  >
    {children}
  </motion.div>
)
