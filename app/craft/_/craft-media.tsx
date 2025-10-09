'use client'

import { useTheme } from 'next-themes'
import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export type MediaProps = {
  src: string | { light: string; dark: string }
  href?: string
  type: 'image' | 'video'
  alt?: string
  theme?: 'light' | 'dark'
  width: number
  height: number
  className?: string
  wrapperClassName?: string
  // Optional: poster for video; if not provided, we still show the skeleton
  poster?: string
}

export function Media({
  src,
  type,
  alt = '',
  theme = 'light',
  width,
  height,
  wrapperClassName,
  className,
  poster,
}: MediaProps) {
  const { resolvedTheme } = useTheme()
  const resolvedSrc = useMemo(
    () =>
      typeof src === 'string'
        ? src
        : resolvedTheme === 'light'
          ? src.light
          : src.dark,
    [src, resolvedTheme],
  )
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<HTMLVideoElement | HTMLImageElement | null>(null)
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined)
  const [posterSrc, setPosterSrc] = useState<string | undefined>(poster)
  const containerRef = useRef<HTMLDivElement>(null)

  // When media fires its load/ready event, flip the state
  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (type === 'image') {
      const img = node as HTMLImageElement
      if (img.complete && img.naturalWidth) setLoaded(true)
    }
  }, [type])

  useEffect(() => {
    if (type !== 'video') return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoSrc(resolvedSrc)
          setPosterSrc(poster)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    return () => observer.disconnect()
  }, [type, resolvedSrc, poster])

  const onImageLoad = () => setLoaded(true)
  const onVideoReady = () => {
    setLoaded(true)
  }

  // Use aspect-ratio to reserve space and prevent layout shift
  const ratio = `${width} / ${height}`

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-clip', wrapperClassName)}
      style={{ aspectRatio: ratio }}
    >
      {/* Skeleton / shimmer placeholder */}
      <div
        aria-hidden
        className={cn(
          'absolute inset-0',
          // base surface that fits your theme tokens
          theme === 'light' ? 'bg-sand-3' : 'bg-sand-4',
          // shimmer
          'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.2s_infinite]',
          'before:bg-gradient-to-r before:from-transparent',
          theme === 'light'
            ? 'before:via-white/40 before:to-transparent'
            : 'before:via-white/15 before:to-transparent',
          'before:[mask-image:linear-gradient(90deg,transparent,black,transparent)]',
          // fade the placeholder out once loaded
          loaded ? 'opacity-0 transition-opacity duration-300' : 'opacity-100',
        )}
      />

      {/* Media element: start slightly blurred and faded until ready */}
      <div
        className={cn(
          'absolute inset-0',
          loaded
            ? 'opacity-100 filter-none'
            : 'opacity-0 blur-[2px] translate-y-[2px]',
          'transition-all duration-300 will-change-transform will-change-filter will-change-opacity',
          // theme === 'light' && 'bg-red-500',
          className,
        )}
      >
        {type === 'image' ? (
          // biome-ignore lint/performance/noImgElement: allowed
          <img
            // biome-ignore lint/suspicious/noExplicitAny:allowed
            ref={ref as any}
            src={resolvedSrc}
            alt={alt}
            loading="lazy"
            decoding="async"
            width={width}
            height={height}
            className="h-full w-full object-cover"
            onLoad={onImageLoad}
          />
        ) : (
          <video
            // biome-ignore lint/suspicious/noExplicitAny:allowed
            ref={ref as any}
            src={videoSrc}
            playsInline
            loop
            autoPlay
            muted
            preload="auto"
            poster={posterSrc}
            className="h-full w-full object-cover"
            onLoadedData={onVideoReady}
            onCanPlayThrough={onVideoReady}
          />
        )}
      </div>
    </div>
  )
}

/* Tailwind keyframes (add once in globals.css if not present)
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
*/
