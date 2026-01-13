'use client'

import { AnimatePresence, motion } from 'motion/react'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { _Fade } from '@/providers/container-provider'

const Fade = motion.create(_Fade)

interface FadeContainerProps {
  children: React.ReactNode
  className?: string
  /** Height of the top fade in pixels */
  topHeight?: number
  /** Height of the bottom fade in pixels */
  bottomHeight?: number
  /** Blur amount */
  blur?: string
  /** Gradient stop position */
  stop?: string
  /** Background color (CSS variable or color) */
  background?: string
  /** Hide top fade */
  hideTop?: boolean
  /** Hide bottom fade */
  hideBottom?: boolean
}

export const FadeContainer = React.forwardRef<
  HTMLDivElement,
  FadeContainerProps
>(function FadeContainer(
  {
    children,
    className,
    topHeight = 60,
    bottomHeight = 60,
    blur = '4px',
    stop = '25%',
    background = 'var(--sand-1)',
    hideTop = false,
    hideBottom = false,
  },
  forwardedRef,
) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Sync refs
  React.useImperativeHandle(forwardedRef, () => containerRef.current!)
  const [topEdgeTouched, setTopEdgeTouched] = React.useState(true)
  const [bottomEdgeTouched, setBottomEdgeTouched] = React.useState(true)

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const checkEdges = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      setTopEdgeTouched(scrollTop <= 0)
      setBottomEdgeTouched(scrollTop + clientHeight >= scrollHeight - 1)
    }

    checkEdges()
    container.addEventListener('scroll', checkEdges, { passive: true })

    // Also check on resize
    const resizeObserver = new ResizeObserver(checkEdges)
    resizeObserver.observe(container)

    return () => {
      container.removeEventListener('scroll', checkEdges)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div className={cn('relative', className)}>
      {/* Fade overlays */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <AnimatePresence>
          {!hideTop && !topEdgeTouched && (
            <Fade
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              background={background}
              side="top"
              blur={blur}
              stop={stop}
              className="absolute top-0 left-0 w-full"
              style={{ height: topHeight }}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!hideBottom && !bottomEdgeTouched && (
            <Fade
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              background={background}
              side="bottom"
              blur={blur}
              stop={stop}
              className="absolute bottom-0 left-0 w-full"
              style={{ height: bottomHeight }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Scrollable content */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto overscroll-contain"
      >
        {children}
      </div>
    </div>
  )
})
