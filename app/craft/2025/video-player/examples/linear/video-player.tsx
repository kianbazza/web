'use client'

import { AnimatePresence, motion, useDragControls } from 'motion/react'
import * as React from 'react'
import * as Primitive from '@/app/craft/2025/video-player/component/index.parts'
import { cn } from '@/lib/utils'

export interface CaptionTrack {
  src: string
  label: string
  srcLang: string
  default?: boolean
}

export interface VideoPlayerProps {
  src: string
  poster?: string
  captions?: CaptionTrack[]
}

const Overlay = motion.create(Primitive.Overlay)

const Controls = motion.create(Primitive.Controls)

function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const [idle, setIdle] = React.useState(false)

  return (
    <Primitive.Root
      className={cn(
        'group relative rounded-xl overflow-hidden shadow-sm',
        'data-[fullscreen]:flex data-[fullscreen]:items-center data-[fullscreen]:justify-center',
        'data-[fullscreen]:bg-black data-[fullscreen]:rounded-none',
      )}
      idle={idle}
      onIdleChange={setIdle}
    >
      <Primitive.Video
        src={src}
        className="group-data-[fullscreen]:w-full group-data-[fullscreen]:h-auto"
      />
      {poster && (
        <Primitive.Poster className="absolute inset-0">
          <img src={poster} alt="" className="w-full h-full object-cover" />
        </Primitive.Poster>
      )}
      <AnimatePresence>
        {!idle && (
          <>
            <Overlay
              keepMounted
              key="overlay"
              className="absolute top-0 left-0 h-full w-full bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <Controls
              keepMounted
              key="controls"
              className={cn(
                'absolute bottom-0 left-1/2 -translate-x-1/2',
                'w-[80%] pb-4',
                'flex items-center gap-4',
              )}
              initial={{ opacity: 0, y: 10, filter: 'blur(2px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
              exit={{ opacity: 0, y: 10, filter: 'blur(2px)' }}
            >
              <Primitive.PlayButton
                className={cn(
                  'group size-8 min-h-8 min-w-8 rounded-[10px] flex items-center justify-center',
                  'border border-transparent',
                  'hover:border-gray-1/10 hover:bg-white/10 hover:backdrop-blur-sm',
                  '*:size-4 *:fill-white *:stroke-0',
                )}
              >
                <SpinnerIcon className="hidden group-data-[waiting]:block" />
                <PlayIcon className="group-data-[playing]:hidden group-data-[waiting]:hidden" />
                <PauseIcon className="group-data-[paused]:hidden group-data-[waiting]:hidden" />
              </Primitive.PlayButton>
              {/*<Primitive.VolumeSlider />*/}
              <Primitive.TimeDisplay
                format="current"
                className="text-white text-[13px]"
              />
              <SeekSlider />
              <Primitive.TimeDisplay
                format="remaining"
                className="text-white text-[13px]"
              />
              <Primitive.FullscreenButton
                className={cn(
                  'group size-8 min-h-8 min-w-8 rounded-[10px] flex items-center justify-center',
                  'border border-transparent',
                  'hover:border-white/10 hover:bg-white/10 hover:backdrop-blur-sm',
                  '*:size-4 *:fill-white *:stroke-0',
                )}
              >
                <FullscreenIcon />
              </Primitive.FullscreenButton>
            </Controls>
          </>
        )}
      </AnimatePresence>
    </Primitive.Root>
  )
}

function SeekSlider() {
  const dragControls = useDragControls()
  const [isActive, setIsActive] = React.useState(false)
  const [isHovering, setIsHovering] = React.useState(false)
  const [hoverPercent, setHoverPercent] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const { currentTime, duration, seek, buffered } = Primitive.useVideoPlayer()
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0
  const bufferedEnd = React.useMemo(() => {
    if (!buffered || buffered.length === 0) return 0
    for (let i = 0; i < buffered.length; i++) {
      if (buffered.start(i) <= currentTime && currentTime <= buffered.end(i)) {
        return buffered.end(i)
      }
    }
    return buffered.end(0)
  }, [buffered, currentTime])

  const bufferedPercent = duration > 0 ? (bufferedEnd / duration) * 100 : 0

  // Handle global pointer events while dragging
  React.useEffect(() => {
    if (!isActive) return

    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const percent = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width),
      )
      setHoverPercent(percent * 100)
      seek(percent * duration)
    }

    const handlePointerUp = (e: PointerEvent) => {
      setIsActive(false)
      // Hide hover cursor if pointer is outside the container
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const isOutside =
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        if (isOutside) {
          setIsHovering(false)
        }
      }
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [isActive, duration, seek])

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-8 flex items-center !cursor-crosshair **:!cursor-crosshair **:select-none **:touch-none **:[-webkit-user-drag:none]"
      onPointerDown={(e) => {
        setIsActive(true)
        dragControls.start(e)
        // Seek to clicked position immediately
        const rect = e.currentTarget.getBoundingClientRect()
        const percent = (e.clientX - rect.left) / rect.width
        seek(percent * duration)
      }}
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => {
        if (!isActive) {
          setIsHovering(false)
        }
      }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setHoverPercent(((e.clientX - rect.left) / rect.width) * 100)
      }}
    >
      <motion.div
        key="track"
        className="bg-white/20 rounded-full w-full relative"
        animate={{ height: isActive ? 6 : 4 }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          key="progress"
          className="absolute left-0 top-0 h-full bg-white rounded-full"
          style={{ width: `${progress}%` }}
        />
        <motion.div
          key="buffered"
          className="absolute left-0 top-0 h-full bg-white/25 rounded-full"
          style={{ width: `${bufferedPercent}%` }}
        />
        {/* Hover cursor */}
        <AnimatePresence>
          {isHovering && (
            <motion.div
              key="hover-cursor"
              className="absolute top-1/2 -translate-y-1/2 w-px pointer-events-none select-none bg-white"
              draggable="false"
              style={{ left: `${hoverPercent}%` }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                // opacity: isActive ? 1 : 0.8,
                height: isActive ? 32 : 28,
                backgroundColor: `color(from white display-p3 r g b / ${isActive ? '100%' : '50%'})`,
              }}
              exit={{ opacity: 0 }}
            >
              <div className="relative h-full" draggable="false">
                <motion.div
                  draggable="false"
                  className={cn(
                    'absolute left-1/2 -translate-x-1/2 bottom-[120%] w-fit',
                    'text-xs font-[450]',
                    'inline-flex items-center gap-1',
                  )}
                  animate={{ fontSize: isActive ? '14px' : '12px' }}
                  exit={{ opacity: 0, y: 2, scale: 0.95 }}
                >
                  <motion.span
                    draggable={false}
                    className="whitespace-nowrap text-white"
                    animate={{
                      opacity: isActive ? 1 : 0.8,

                      // color: isActive
                      //   ? 'color(from var(--color-gray-1) display-p3 r g b / 100%)'
                      //   : 'color(from var(--color-gray-1) display-p3 r g b / 80%)',
                      fontWeight: isActive ? 500 : 450,
                    }}
                  >
                    {formatDuration((hoverPercent / 100) * duration)}
                  </motion.span>
                  <span
                    draggable={false}
                    className="text-white/50 whitespace-nowrap ml-1"
                  >
                    / <Primitive.TimeDisplay format="duration" />
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Invisible draggable thumb */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 size-3"
          style={{ left: `${progress}%`, x: '-50%' }}
          drag="x"
          dragControls={dragControls}
          dragConstraints={containerRef}
          dragElastic={0}
          dragMomentum={false}
          onDrag={(_, info) => {
            if (!containerRef.current) return
            const rect = containerRef.current.getBoundingClientRect()
            const percent = Math.max(
              0,
              Math.min(1, (info.point.x - rect.left) / rect.width),
            )
            seek(percent * duration)
          }}
          onDragEnd={() => setIsActive(false)}
        />
      </motion.div>
    </motion.div>
  )
}

const PlayIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    role="img"
    focusable="false"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m5.604 2.41 7.23 4.502a1.375 1.375 0 0 1-.02 2.345L5.585 13.6a1.375 1.375 0 0 1-2.083-1.18V3.576A1.375 1.375 0 0 1 5.604 2.41Z"></path>
  </svg>
)

const PauseIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    role="img"
    focusable="false"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M3.5 3.5a1 1 0 0 1 1-1H6a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4.5a1 1 0 0 1-1-1v-9ZM9 3.5a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1v-9Z"></path>
  </svg>
)

const FullscreenIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    role="img"
    focusable="false"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M7.28 8.72a.75.75 0 0 1 0 1.06L5 12l1.25 1.25a.75.75 0 0 1-.75.75H2.75a.75.75 0 0 1-.75-.75V10.5a.75.75 0 0 1 .75-.75L4 11l2.22-2.28a.75.75 0 0 1 1.06 0ZM8.72 7.28a.75.75 0 0 1 0-1.06L11 4 9.75 2.75A.75.75 0 0 1 10.5 2h2.75a.75.75 0 0 1 .75.75V5.5a.75.75 0 0 1-.75.75L12 5 9.78 7.28a.75.75 0 0 1-1.06 0Z"></path>
  </svg>
)

const SpinnerIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    role="img"
    focusable="false"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    className="animate-spin"
    {...props}
  >
    <circle
      cx="8"
      cy="8"
      r="6"
      stroke="currentColor"
      strokeOpacity="0.25"
      strokeWidth="2"
    />
    <path
      d="M14 8a6 6 0 0 0-6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)
