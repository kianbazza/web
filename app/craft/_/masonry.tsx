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
    src: 'https://bazza-dev.b-cdn.net/craft/kianbazza-2025-cursor-origin-button.mp4',
    href: '/craft/cursor-origin-button',
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
    placeholder:
      'data:image/webp;base64,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',
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
  // {
  //   src: 'https://bazza-dev.b-cdn.net/craft/bazzaui-boolean-columns-design-spec.png',
  //   type: 'image',
  //   title: 'Boolean column filtering',
  //   date: 'May 2025',
  //   theme: 'dark',
  //   dimensions: {
  //     width: 2023,
  //     height: 798,
  //   },
  // },
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
        columns: [1, 2, 3],
        gap: [16, 16, 16],
        media: [640, 1000, 2000],
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
                className="border border-sand-4 rounded-xl overflow-clip shadow-xs"
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
                    'rounded-xl h-full w-full overflow-clip',
                    item.theme === 'light' &&
                      'border-t border-sand-4 bg-sand-1 dark:bg-sand-12 shadow-xs',
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
