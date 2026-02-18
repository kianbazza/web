'use client'

import { AnimatePresence, motion, type Variants } from 'motion/react'
import { useEffect, useState } from 'react'
import { Masonry } from 'react-plock'
import { cn } from '@/lib/utils'
import { Media } from './craft-media'

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.99,
    translateY: 10,
    filter: 'blur(2px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    translateY: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

interface CraftItem {
  index: number
  src: string
  href?: string
  type: 'video' | 'image'
  title: string
  date: string
  theme: 'light' | 'dark'
  dimensions: {
    width: number
    height: number
  }
  placeholder: string
  className?: string
}

const items: CraftItem[] = [
  {
    src: 'https://bazza-dev.b-cdn.net/craft/kianbazza-inline-label-creation-menu.mp4',
    type: 'video',
    title: 'Inline label creation menu',
    date: 'February 2026',
    theme: 'light',
    dimensions: {
      width: 2268,
      height: 2160,
    },
  },
  {
    src: 'https://bazza-dev.b-cdn.net/craft/navattic-logo-grid.mp4',
    type: 'video',
    title: 'Company logo grid',
    date: 'January 2026',
    theme: 'light',
    dimensions: {
      width: 3840,
      height: 1468,
    },
  },
  {
    src: 'https://bazza-dev.b-cdn.net/craft/bazzaui-combobox.mp4',
    type: 'video',
    title: 'Fluid combobox',
    date: 'January 2026',
    theme: 'light',
    dimensions: {
      width: 1728,
      height: 2160,
    },
  },
  {
    src: 'https://bazza-dev.b-cdn.net/craft/kianbazza-2025-cursor-origin-button.mp4',
    href: '/craft/2025/cursor-origin',
    type: 'video',
    title: 'Cursor-aware button',
    date: 'October 2025',
    theme: 'light',
    dimensions: {
      width: 1652,
      height: 944,
    },
  },
  {
    src: 'https://bazza-dev.b-cdn.net/craft/kianbazza-2025-book-a-call.mp4',
    type: 'video',
    title: 'Book a call',
    theme: 'light',
    date: 'October 2025',
    className: 'mask-l-from-50% mask-l-to-98%',
    dimensions: {
      width: 1450,
      height: 618,
    },
  },
  {
    src: 'https://bazza-dev.b-cdn.net/craft/profound-cve-keyword-analysis-tool.mp4',
    type: 'video',
    title: 'Keyword analysis tool',
    date: 'July 2025',
    theme: 'light',
    dimensions: {
      width: 1844,
      height: 1080,
    },
  },
  {
    src: 'https://bazza-dev.b-cdn.net/craft/profound-fluid-search-bar.mp4',
    type: 'video',
    title: 'Fluid, morphing search',
    date: 'June 2025',
    theme: 'light',
    dimensions: {
      width: 956,
      height: 960,
    },
  },
  {
    src: 'https://bazza-dev.b-cdn.net/craft/kianbazza-floating-navbar.mp4',
    type: 'video',
    title: 'Floating navbar',
    date: 'July 2025',
    theme: 'light',
    dimensions: {
      width: 3840,
      height: 1004,
    },
  },
  {
    src: 'https://bazza-dev.b-cdn.net/craft/bazzaui-sticky-menu-options.mp4',
    type: 'video',
    title: 'Sticky menu options',
    date: 'May 2025',
    theme: 'light',
    dimensions: {
      width: 1916,
      height: 1080,
    },
  },
  {
    src: 'https://bazza-dev.b-cdn.net/craft/kianbazza-2024-typewriter.mp4',
    type: 'video',
    title: 'Typewriter',
    date: 'January 2024',
    theme: 'light',
    dimensions: {
      width: 2394,
      height: 674,
    },
  },
].map((item, index) => ({ ...item, index }) as CraftItem)

export function CraftMasonry() {
  const [visibleItems, setVisibleItems] = useState<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleItems((prev) => {
        if (prev < items.length) {
          return prev + 1
        }
        clearInterval(timer)
        return prev
      })
    }, 150) // Stagger delay of 150ms

    return () => clearInterval(timer)
  }, [])

  return (
    <Masonry
      items={items}
      config={{
        columns: [1, 2, 3, 4],
        media: [900, 1250, 2000, 2500],
        gap: [16, 16, 16, 16],
        useBalancedLayout: true,
      }}
      as={motion.div}
      render={(_item) => {
        const item = _item as CraftItem
        const shouldShow = item.index < visibleItems

        return (
          <AnimatePresence>
            {shouldShow && (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                key={item.src}
                className="border border-sand-4 rounded-xl shadow-xs overflow-clip"
              >
                <div className="flex items-center justify-between px-4 pt-2 pb-4 text-sm font-medium tracking-[-0.02em] bg-sand-2 -mb-2 -z-10">
                  <span className="text-sand-11">{item.title}</span>
                  <span className="text-sand-9">{item.date}</span>
                </div>
                <Media
                  src={item.src}
                  type={item.type}
                  alt={item.title}
                  theme={item.theme}
                  width={item.dimensions.width}
                  height={item.dimensions.height}
                  wrapperClassName={cn(
                    'z-10',
                    'rounded-xl h-full w-[calc(100%+2px)] overflow-clip',
                    item.theme === 'light' &&
                      'border -mx-px -mb-px border-sand-4 bg-sand-1 dark:bg-sand-12 shadow-xs',
                    item.theme === 'light' && item.href && 'border-y',
                  )}
                  className={cn(item.className)}
                />
                {item.href && (
                  <a
                    href={item.href}
                    type="button"
                    className={cn(
                      'px-4 group w-full flex items-center justify-center group/link',
                      'text-sm font-medium tracking-[-0.02em] bg-sand-4 hover:bg-sand-5 text-sand-11 hover:text-sand-12 hover:duration-0 transition-[color] duration-150 ease-out',
                      'pb-2 pt-4 -mt-2 -z-10',
                    )}
                  >
                    <div className="w-fit flex items-center justify-center gap-2 relative group-active/link:scale-97">
                      <span>View</span>
                      <div className="overflow-hidden size-4 absolute -top-1.5 -right-5">
                        <div className="relative *:transition-all *:text-base">
                          <span className="absolute top-0 left-0 group-hover:translate-x-4 group-hover:-translate-y-4">
                            ↗
                          </span>
                          <span className="absolute top-0 left-0 -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:-translate-y-0">
                            ↗
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* <CornerRightUpIcon className="size-4" /> */}
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )
      }}
    />
  )
}
