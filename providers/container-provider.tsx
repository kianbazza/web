/** biome-ignore-all lint/correctness/useUniqueElementIds: allowed */

'use client'

import { AnimatePresence, motion } from 'motion/react'
import type * as React from 'react'
import { useScrollEdges } from '@/hooks/use-scroll-edges'
import { cn } from '@/lib/utils'
import styles from './fade.module.css'

export function ContainerProvider({ children }: { children: React.ReactNode }) {
  const { top: topEdgeTouched, bottom: bottomEdgeTouched } = useScrollEdges()

  return (
    <div className="flex-1 flex flex-col h-full w-full">
      <div
        id="global-fade"
        className="fixed top-0 left-0 pointer-events-none h-svh w-svw z-[10001]"
      >
        <AnimatePresence>
          {!topEdgeTouched && (
            <Fade
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              background="var(--sand-1)"
              side="top"
              blur="4px"
              stop="25%"
              className={cn(
                'absolute top-0 left-0 w-full h-[100px] sm:h-[150px]',
              )}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!bottomEdgeTouched && (
            <Fade
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              background="var(--sand-1)"
              side="bottom"
              blur="4px"
              stop="25%"
              className={cn(
                'absolute bottom-0 left-0 w-full hidden sm:inline h-[150px]',
              )}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col h-full w-full flex-1 z-[10000] max-h-full relative overflow-auto">
        {children}
      </div>
    </div>
  )
}

const Fade = motion.create(_Fade)

export function _Fade({
  stop,
  blur,
  side = 'top',
  className,
  background,
  style,
  ref,
  debug,
}: {
  stop?: string
  blur?: string
  side: 'top' | 'bottom' | 'left' | 'right'
  className?: string
  background: string
  debug?: boolean
  style?: React.CSSProperties
  ref?: React.Ref<HTMLDivElement>
}) {
  return (
    <div
      id="fade"
      ref={ref}
      aria-hidden
      className={cn(styles.fade, className)}
      data-side={side}
      style={
        {
          '--stop': stop,
          '--blur': blur,
          '--background': background,
          ...(debug && {
            outline: '2px solid var(--color-orange)',
          }),
          ...style,
        } as React.CSSProperties
      }
    />
  )
}
