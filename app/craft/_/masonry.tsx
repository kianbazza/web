'use client'

import { AnimatePresence, motion, type Variants } from 'motion/react'
import { useEffect, useState } from 'react'
import { Masonry } from 'react-plock'
import { cn } from '@/lib/utils'

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
  src: string
  type: 'video' | 'image'
  title: string
  date: string
  theme: 'light' | 'dark'
}

const items: CraftItem[] = [
  {
    src: 'https://bazza-dev.b-cdn.net/craft/profound-cve-keyword-analysis-tool.mp4',
    type: 'video',
    title: 'Keyword analysis tool',
    date: 'July 2025',
    theme: 'light',
  },
  {
    src: 'https://bazza-dev.b-cdn.net/craft/profound-fluid-search-bar.mp4',
    type: 'video',
    title: 'Fluid, morphing search',
    date: 'June 2025',
    theme: 'light',
  },
  {
    src: 'https://bazza-dev.b-cdn.net/craft/kianbazza-floating-navbar.mp4',
    type: 'video',
    title: 'Floating navbar',
    date: 'July 2025',
    theme: 'light',
  },
  {
    src: 'https://bazza-dev.b-cdn.net/craft/kianbazza-2024-typewriter.mp4',
    type: 'video',
    title: 'Typewriter',
    date: 'January 2024',
    theme: 'light',
  },
  {
    src: 'https://bazza-dev.b-cdn.net/craft/bazzaui-boolean-columns-design-spec.png',
    type: 'image',
    title: 'Boolean column filtering',
    date: 'May 2025',
    theme: 'dark',
  },
]

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
    }, 200) // Stagger delay of 150ms

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
      render={(_item, index) => {
        const item = _item as CraftItem
        const shouldShow = index < visibleItems

        return (
          <AnimatePresence mode="wait">
            {shouldShow && (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                key={item.src}
                className="border border-gray-4 rounded-xl overflow-clip shadow-xs relative"
              >
                <div
                  className={cn(
                    'min-h-px h-auto w-full relative rounded-xl shadow-xs overflow-hidden z-10',
                    item.theme === 'light' && 'border-b border-gray-6',
                  )}
                >
                  {item.type === 'video' ? (
                    <video src={item.src} playsInline loop autoPlay muted />
                  ) : item.type === 'image' ? (
                    // biome-ignore lint/performance/noImgElement: allow
                    <img src={item.src} alt={item.title} />
                  ) : null}
                </div>
                <div className="flex items-center justify-between px-4 pb-2 pt-4 text-sm font-medium tracking-[-0.02em] bg-gray-2 -mt-2 -z-10">
                  <span className="text-gray-11">{item.title}</span>
                  <span className="text-gray-9">{item.date}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )
      }}
    />
  )
}
