'use client'

import type { TOCItemType } from 'fumadocs-core/toc'
import { LayoutGroup } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
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

function useActiveHeadingStable(toc: TOCItemType[], topOffsetPx = 164) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const measuresRef = useRef<Measured[]>([])
  const rafRef = useRef<number | null>(null)

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
    let idx = lastIdxLE(ms, y)
    if (idx === -1) idx = 0
    if (y > (ms.at(-1)?.top ?? Infinity)) idx = ms.length - 1
    const id = ms[idx]?.id ?? null
    setActiveId(id)
  }, [topOffsetPx])

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

  return activeId
}

export function TableOfContents({ toc }: { toc: TOCItemType[] }) {
  const activeId = useActiveHeadingStable(toc, 114)

  // Find the minimum depth to use as the base (usually 2 for h2)
  const minDepth = Math.min(...toc.map((item) => item.depth))

  return (
    <FadeContainer
      className="-translate-x-2 flex-1 min-h-0"
      topHeight={50}
      bottomHeight={50}
      blur="4px"
      stop="30%"
    >
      <ul className="flex flex-col gap-1 pr-2">
        <LayoutGroup>
          {toc.map(({ title, url, depth }) => {
            const id = getIdFromUrl(url)
            const isActive = activeId === id
            // Calculate indent level relative to minimum depth
            const indentLevel = depth - minDepth

            return (
              <a
                key={url}
                href={url}
                className="relative"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById(id)
                  if (!el) return
                  const y =
                    el.getBoundingClientRect().top + window.scrollY - 114
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
                <li
                  className={cn(
                    'text-sm transition-[color] duration-150 ease-out',
                    isActive ? 'text-sand-12' : 'text-sand-10',
                  )}
                  style={{ paddingLeft: `${indentLevel * 12}px` }}
                >
                  {title}
                </li>
              </a>
            )
          })}
        </LayoutGroup>
      </ul>
    </FadeContainer>
  )
}
