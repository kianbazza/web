'use client'

import { ChevronRightIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { type ComponentType, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  CashAppLogo,
  ClaudeLogo,
  CloudflareLogo,
  CursorLogo,
  LinearLogo,
  OpenAILogo,
  OpenDoorLogo,
  OscarHealthLogo,
  RaycastLogo,
  RemoteLogo,
  ShopifyLogo,
  ToastLogo,
  VercelLogo,
} from './logos'

const HOVER_TRANSITION_DURATION_MS = 260
const GRID_COLUMNS = 4
const GRID_ROWS = 3
const SHIMMER_DURATION = 1.6
const SHIMMER_WIDTH = 50
const COLUMN_STAGGER_DELAY = 0.12
const ROW_STAGGER_DELAY = 0.04
const LOOP_DELAY = 2.2

const MAX_STAGGER_DELAY =
  (GRID_COLUMNS - 1) * COLUMN_STAGGER_DELAY +
  (GRID_ROWS - 1) * ROW_STAGGER_DELAY
const REPEAT_DELAY = MAX_STAGGER_DELAY + LOOP_DELAY

interface LogoItem {
  name: string
  logo: ComponentType
  scale?: number
  grayscaleOpacity?: number
  contentType?: 'case-study' | 'showcase'
}

const LOGOS: LogoItem[] = [
  {
    name: 'Raycast',
    logo: RaycastLogo,
    scale: 1.2,
    grayscaleOpacity: 0.5,
    contentType: 'case-study',
  },
  {
    name: 'Linear',
    logo: LinearLogo,
    scale: 0.95,
    grayscaleOpacity: 0.5,
    contentType: 'showcase',
  },
  {
    name: 'Toast',
    logo: ToastLogo,
    scale: 0.9,
    contentType: 'case-study',
  },
  {
    name: 'Cursor',
    logo: CursorLogo,
    scale: 1.1,
    grayscaleOpacity: 0.5,
    // contentType: 'case-study',
  },
  {
    name: 'Cloudflare',
    logo: CloudflareLogo,
    scale: 0.94,
    grayscaleOpacity: 0.7,
    contentType: 'case-study',
  },
  {
    name: 'Cash App',
    logo: CashAppLogo,
    scale: 1.1,
    // contentType: 'showcase',
  },
  {
    name: 'Shopify',
    logo: ShopifyLogo,
    grayscaleOpacity: 0.5,
    scale: 1.2,
    contentType: 'showcase',
  },
  {
    name: 'Remote',
    logo: RemoteLogo,
    scale: 1,
    grayscaleOpacity: 0.5,
    contentType: 'case-study',
  },
  {
    name: 'Vercel',
    logo: VercelLogo,
    grayscaleOpacity: 0.5,
    scale: 0.85,
    contentType: 'showcase',
  },
  {
    name: 'OpenDoor',
    logo: OpenDoorLogo,
    scale: 1.1,
    contentType: 'case-study',
  },
  {
    name: 'OpenAI',
    logo: OpenAILogo,
    scale: 1,
    grayscaleOpacity: 0.5,
    // contentType: 'showcase',
  },
  {
    name: 'Claude',
    logo: ClaudeLogo,
    grayscaleOpacity: 0.5,
    scale: 0.94,
    contentType: 'showcase',
  },
]

const getContentCta = (contentType: NonNullable<LogoItem['contentType']>) =>
  contentType === 'case-study' ? 'View case study' : 'View showcase'

const getClipPaths = (shimmerWidth: number) => ({
  initial: `polygon(${-shimmerWidth - 50}% 0%, ${-50}% 0%, ${-shimmerWidth}% 100%, ${-shimmerWidth - 50}% 100%)`,
  final: `polygon(${150}% 0%, ${100 + shimmerWidth + 50}% 0%, ${100 + shimmerWidth}% 100%, 100% 100%)`,
})

const getStaggerDelay = (index: number): number => {
  const col = index % GRID_COLUMNS
  const row = Math.floor(index / GRID_COLUMNS)
  return col * COLUMN_STAGGER_DELAY + row * ROW_STAGGER_DELAY
}

function LogoMark({ item, className }: { item: LogoItem; className?: string }) {
  const Logo = item.logo

  return (
    <div
      className={cn(
        'w-full grid place-items-center select-none',
        '[&_svg]:h-4 sm:[&_svg]:h-5 lg:[&_svg]:h-6',
        '[&_svg]:w-auto [&_svg]:max-w-full [&_svg]:max-h-full',
        className,
      )}
    >
      <div
        className="w-full grid place-items-center"
        style={{ transform: `scale(${item.scale ?? 1})` }}
      >
        <Logo aria-label={`${item.name} logo`} />
      </div>
    </div>
  )
}

interface LogoCellProps {
  item: LogoItem
  index: number
  isGridHovered: boolean
  shouldAnimate: boolean
  animationKey: number
}

function LogoCell({
  item,
  index,
  isGridHovered,
  shouldAnimate,
  animationKey,
}: LogoCellProps) {
  const clipPaths = getClipPaths(SHIMMER_WIDTH)
  const delay = getStaggerDelay(index)
  const hasContent = Boolean(item.contentType)
  const showColored = hasContent && isGridHovered
  const baseGrayscaleOpacity = item.grayscaleOpacity ?? 1
  const grayscaleOpacity =
    !hasContent && isGridHovered
      ? baseGrayscaleOpacity * 0.5
      : baseGrayscaleOpacity
  const ctaText = item.contentType ? getContentCta(item.contentType) : null
  const interactiveLogoClass =
    showColored && hasContent
      ? 'group-hover/logo:scale-90 group-hover/logo:-translate-y-3'
      : ''

  return (
    <div
      className={cn(
        'relative h-20 sm:h-32 overflow-hidden bg-white',
        hasContent && 'group/logo cursor-pointer',
      )}
    >
      <div
        className="absolute inset-0 grid place-items-center px-4 transition-opacity"
        style={{
          opacity: showColored ? 0 : grayscaleOpacity,
          transitionDuration: `${HOVER_TRANSITION_DURATION_MS}ms`,
        }}
      >
        <div
          className={cn(
            'w-full grid place-items-center grayscale transition-transform duration-200 ease-out',
            interactiveLogoClass,
          )}
        >
          <LogoMark item={item} />
        </div>
      </div>

      <div
        className="absolute inset-0 grid place-items-center px-4 bg-white transition-opacity"
        style={{
          opacity: showColored ? 1 : 0,
          transitionDuration: `${HOVER_TRANSITION_DURATION_MS}ms`,
        }}
      >
        <div
          className={cn(
            'w-full grid place-items-center transition-transform duration-200 ease-out',
            interactiveLogoClass,
          )}
        >
          <LogoMark item={item} />
        </div>
      </div>

      {showColored && ctaText && (
        <div className="absolute inset-x-0 bottom-6 flex items-center justify-center px-4 pointer-events-none">
          <div
            className={cn(
              'flex items-center gap-1',
              'text-sm font-medium font-sans text-sand-10',
              'transition-all duration-200 ease-out',
              'opacity-0 translate-y-1 scale-95',
              'group-hover/logo:opacity-100 group-hover/logo:translate-y-0 group-hover/logo:scale-100',
            )}
          >
            <span>{ctaText}</span>
            <ChevronRightIcon className="size-4" />
          </div>
        </div>
      )}

      {shouldAnimate && !showColored && (
        <>
          <motion.div
            key={`shimmer-${index}-${animationKey}`}
            className="absolute inset-0 grid place-items-center px-4 bg-white"
            initial={{ clipPath: clipPaths.initial }}
            animate={{ clipPath: clipPaths.final }}
            transition={{
              duration: SHIMMER_DURATION,
              delay,
              ease: [0.4, 0, 0.2, 1],
              repeat: Infinity,
              repeatDelay: REPEAT_DELAY,
            }}
          >
            <div className="w-full grid place-items-center">
              <LogoMark item={item} />
            </div>
          </motion.div>

          <motion.div
            key={`highlight-${index}-${animationKey}`}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(105deg, transparent 0%, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%, transparent 100%)',
              backgroundSize: '200% 100%',
            }}
            initial={{ backgroundPosition: '200% 0' }}
            animate={{ backgroundPosition: '-200% 0' }}
            transition={{
              duration: SHIMMER_DURATION,
              delay,
              ease: 'linear',
              repeat: Infinity,
              repeatDelay: REPEAT_DELAY,
            }}
          />
        </>
      )}
    </div>
  )
}

export interface LogoGridProps {
  className?: string
}

export function LogoGrid({ className }: LogoGridProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const [animationKey, setAnimationKey] = useState(0)
  const hasAnimationStarted = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (shouldAnimate) {
      hasAnimationStarted.current = true
    }
  }, [shouldAnimate])

  useEffect(() => {
    if (!isHovered && !shouldAnimate && hasAnimationStarted.current) {
      const timer = window.setTimeout(() => {
        setAnimationKey((prev) => prev + 1)
        setShouldAnimate(true)
      }, HOVER_TRANSITION_DURATION_MS)

      return () => window.clearTimeout(timer)
    }
  }, [isHovered, shouldAnimate])

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const handleMouseEnter = () => {
      setIsHovered(true)
      setShouldAnimate(false)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
    }

    node.addEventListener('mouseenter', handleMouseEnter)
    node.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter)
      node.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        'w-full overflow-hidden rounded-xl border border-sand-5',
        className,
      )}
    >
      <div className="grid grid-cols-4 gap-px bg-sand-5">
        {LOGOS.map((item, index) => (
          <LogoCell
            key={item.name}
            item={item}
            index={index}
            isGridHovered={isHovered}
            shouldAnimate={shouldAnimate}
            animationKey={animationKey}
          />
        ))}
      </div>
    </div>
  )
}
