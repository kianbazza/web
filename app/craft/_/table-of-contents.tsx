'use client'

import type { TOCItemType } from 'fumadocs-core/toc'
import { motion } from 'motion/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FadeContainer } from '@/components/fade-container'
import { cn } from '@/lib/utils'

function getIdFromUrl(url: string) {
  // toc urls are like "#my-heading"
  return url.startsWith('#') ? url.slice(1) : url
}

type Measured = { id: string; top: number }

// Binary search: last index whose top <= y
function lastIdxLE(list: Measured[], y: number) {
  let lo = 0,
    hi = list.length - 1,
    ans = -1
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if (list[mid].top <= y) {
      ans = mid
      lo = mid + 1
    } else hi = mid - 1
  }
  return ans
}

function useActiveHeadingStable(
  toc: TOCItemType[],
  topOffsetPx = 164,
  showIntro = false,
) {
  const [activeId, setActiveId] = useState<string | null>(
    showIntro ? INTRO_ID : null,
  )
  const measuresRef = useRef<Measured[]>([])
  const rafRef = useRef<number | null>(null)
  const manualOverrideRef = useRef<string | null>(null)

  const measure = useCallback(() => {
    const ids = toc
      // biome-ignore lint/suspicious/noExplicitAny: allowed
      .flatMap((i: any) => [i, ...(i.children ?? [])])
      .map((i) => getIdFromUrl(i.url))
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    const ms = els
      .map((el) => ({
        id: el.id,
        top: el.getBoundingClientRect().top + window.scrollY,
      }))
      .sort((a, b) => a.top - b.top)
    measuresRef.current = ms
  }, [toc])

  const compute = useCallback(() => {
    const ms = measuresRef.current
    if (!ms.length) return
    const y = window.scrollY + topOffsetPx

    // If showIntro is enabled and we're above the first heading, show intro as active
    if (showIntro && ms.length > 0 && y < ms[0].top) {
      if (manualOverrideRef.current) {
        if (manualOverrideRef.current === INTRO_ID) {
          manualOverrideRef.current = null
        }
        return
      }
      setActiveId(INTRO_ID)
      return
    }

    let idx = lastIdxLE(ms, y)
    if (idx === -1) idx = 0
    if (y > (ms.at(-1)?.top ?? Infinity)) idx = ms.length - 1
    const computedId = ms[idx]?.id ?? null

    // If we have a manual override, only clear it if we've scrolled to a different section
    if (manualOverrideRef.current) {
      if (computedId === manualOverrideRef.current) {
        // We've arrived at the clicked section, clear override
        manualOverrideRef.current = null
      }
      // Keep the override active
      return
    }

    setActiveId(computedId)
  }, [topOffsetPx, showIntro])

  // Allow manual override (for click navigation)
  const setManualActiveId = useCallback((id: string) => {
    manualOverrideRef.current = id
    setActiveId(id)
  }, [])

  useEffect(() => {
    measure()
    compute()
    const onScroll = () => {
      if (rafRef.current != null) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        compute()
      })
    }
    const onResize = () => {
      measure()
      compute()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [measure, compute])

  return { activeId, setManualActiveId }
}

const SCROLL_PADDING = 50 // Match the fade height

const INTRO_ID = '__intro__'

interface TableOfContentsProps {
  toc: TOCItemType[]
  /** Show an intro item that navigates to the top of the article */
  showIntro?: boolean
  /** Custom label for the intro item (defaults to "Intro") */
  introLabel?: string
}

export function TableOfContents({
  toc,
  showIntro = false,
  introLabel = 'Intro',
}: TableOfContentsProps) {
  const { activeId, setManualActiveId } = useActiveHeadingStable(
    toc,
    114,
    showIntro,
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())

  // Find the minimum depth to use as the base (usually 2 for h2)
  const minDepth = useMemo(
    () => Math.min(...toc.map((item) => item.depth)),
    [toc],
  )

  // Scroll active TOC item into view when it changes
  useEffect(() => {
    if (!activeId) return
    const item = itemRefs.current.get(activeId)
    const container = containerRef.current
    if (!item || !container) return

    const itemRect = item.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    // Check if item is above visible area (with padding)
    const isAbove = itemRect.top < containerRect.top + SCROLL_PADDING
    // Check if item is below visible area (with padding)
    const isBelow = itemRect.bottom > containerRect.bottom - SCROLL_PADDING

    if (!isAbove && !isBelow) return // Already visible

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let scrollTop: number
    if (isAbove) {
      // Scroll up: align item top with container top + padding
      scrollTop =
        container.scrollTop +
        (itemRect.top - containerRect.top) -
        SCROLL_PADDING
    } else {
      // Scroll down: align item bottom with container bottom - padding
      scrollTop =
        container.scrollTop +
        (itemRect.bottom - containerRect.bottom) +
        SCROLL_PADDING
    }

    container.scrollTo({
      top: scrollTop,
      behavior: reduced ? 'auto' : 'smooth',
    })
  }, [activeId])

  // Track the active item's position for the indicator
  const [indicatorPos, setIndicatorPos] = useState<{
    x: number
    y: number
  } | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 })
  const [showHoverDot, setShowHoverDot] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)

  // Helper to calculate dot position for a given item ID
  const getDotPosition = useCallback((id: string | null) => {
    if (!id) return null
    const item = itemRefs.current.get(id)
    if (!item) return null

    const textSpan = item.querySelector('span')
    if (!textSpan) return null

    const itemTop = item.offsetTop
    const itemHeight = item.offsetHeight
    const spanPaddingLeft = Number.parseInt(
      getComputedStyle(textSpan).paddingLeft,
      10,
    )

    return {
      x: spanPaddingLeft - 12,
      y: itemTop + itemHeight / 2 - 3, // Center vertically (3 = half of 6px dot)
    }
  }, [])

  // Update indicator position when active item changes
  useEffect(() => {
    setIndicatorPos(getDotPosition(activeId))
  }, [activeId, getDotPosition])

  // Update hover dot position when hovered item changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: abc
  useEffect(() => {
    // Don't show hover dot if not hovering or hovering the active item
    if (!hoveredId) {
      setShowHoverDot(false)
      return
    }
    const pos = getDotPosition(hoveredId)
    if (pos) {
      setHoverPos(pos)
      setShowHoverDot(true)
    } else {
      setShowHoverDot(false)
    }
  }, [hoveredId, activeId, getDotPosition])

  return (
    <FadeContainer
      ref={containerRef}
      className="-translate-x-2 flex-1 min-h-0"
      topHeight={50}
      bottomHeight={50}
      blur="4px"
      stop="30%"
    >
      <ul
        ref={listRef}
        className="relative flex flex-col pr-2 pl-3"
        onMouseLeave={() => setHoveredId(null)}
      >
        {/* Animated hover dot */}
        {showHoverDot && (
          <motion.div
            className="absolute size-1.5 rounded-full bg-sand-8 pointer-events-none"
            initial={false}
            animate={{
              x: hoverPos.x,
              y: hoverPos.y,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
          />
        )}

        {/* Animated active indicator dot */}
        {indicatorPos && (
          <motion.div
            className="absolute size-1.5 rounded-full bg-blue-9 pointer-events-none"
            initial={false}
            animate={{
              x: indicatorPos.x,
              y: indicatorPos.y,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
          />
        )}

        {/* Intro item */}
        {showIntro && (
          // biome-ignore lint/a11y/useValidAnchor: abc
          <a
            href="#title"
            className="relative py-0.5"
            ref={(el) => {
              if (el) {
                itemRefs.current.set(INTRO_ID, el)
              } else {
                itemRefs.current.delete(INTRO_ID)
              }
            }}
            onMouseEnter={() => setHoveredId(INTRO_ID)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={(e) => {
              e.preventDefault()
              // Find the h1 element
              const el = document.querySelector('h1')
              if (!el) return
              setManualActiveId(INTRO_ID)
              const y = el.getBoundingClientRect().top + window.scrollY - 114
              const reduced = window.matchMedia(
                '(prefers-reduced-motion: reduce)',
              ).matches
              window.scrollTo({
                top: y,
                behavior: reduced ? 'auto' : 'smooth',
              })
              history.replaceState(null, '', window.location.pathname)
            }}
          >
            <span
              className={cn(
                'text-sm transition-colors duration-150 ease-out block',
                activeId === INTRO_ID ? 'text-sand-12' : 'text-sand-10',
              )}
            >
              {introLabel}
            </span>
          </a>
        )}

        {toc.map(({ title, url, depth }) => {
          const id = getIdFromUrl(url)
          const isActive = activeId === id
          // Calculate indent level relative to minimum depth
          const indentLevel = depth - minDepth

          return (
            <a
              key={url}
              href={url}
              className="relative py-0.5"
              ref={(el) => {
                if (el) {
                  itemRefs.current.set(id, el)
                } else {
                  itemRefs.current.delete(id)
                }
              }}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById(id)
                if (!el) return
                // Immediately set active ID to prevent jitter during scroll
                setManualActiveId(id)
                const y = el.getBoundingClientRect().top + window.scrollY - 114
                const reduced = window.matchMedia(
                  '(prefers-reduced-motion: reduce)',
                ).matches
                window.scrollTo({
                  top: y,
                  behavior: reduced ? 'auto' : 'smooth',
                })
                history.replaceState(null, '', `#${encodeURIComponent(id)}`)
              }}
            >
              <span
                className={cn(
                  'text-sm transition-colors duration-150 ease-out block',
                  isActive ? 'text-sand-12' : 'text-sand-10',
                )}
                style={{ paddingLeft: `${indentLevel * 12}px` }}
              >
                {title}
              </span>
            </a>
          )
        })}
      </ul>
    </FadeContainer>
  )
}
