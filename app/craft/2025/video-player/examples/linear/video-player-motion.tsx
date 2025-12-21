'use client'

import { motion, type Variants } from 'motion/react'
import { cn } from '@/lib/utils'
import { VideoPlayer } from '@/app/craft/2025/video-player/component'
import type { VideoPlayerProps } from './video-player'

const duration = 0.3
const ease = 'easeOut'

const posterVariants: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const overlayVariants: Variants = {
  visible: { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
  hidden: { backgroundColor: 'rgba(0, 0, 0, 0)' },
}

const controlsVariants: Variants = {
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
}

const thumbLineVariants: Variants = {
  visible: { opacity: 1, height: '100%', filter: 'blur(0px)' },
  hidden: { opacity: 0, height: 0, filter: 'blur(4px)' },
}

export function VideoPlayer_Motion({ src }: VideoPlayerProps) {
  return (
    <VideoPlayer.Root
      className={cn(
        'group relative rounded-xl overflow-hidden',
        'shadow-[inset_0px_0px_0px_2px_rgba(255,255,255,0.5)]',
        'aspect-video w-full h-auto',
        'data-[fullscreen]:flex data-[fullscreen]:items-center data-[fullscreen]:justify-center',
        'data-[fullscreen]:bg-black data-[fullscreen]:rounded-none data-[fullscreen]:h-full data-[fullscreen]:w-full',
        'data-[fullscreen]:border-0 data-[fullscreen]:shadow-none',
      )}
    >
      <VideoPlayer.Poster
        keepMounted
        render={(props, { loaded }) => (
          <motion.div
            {...props}
            className="absolute inset-0 bg-gray-4"
            variants={posterVariants}
            initial="visible"
            animate={loaded ? 'hidden' : 'visible'}
            transition={{ duration, ease }}
          />
        )}
      />

      <VideoPlayer.Video
        src={src}
        className={cn(
          'w-full h-auto',
          'group-data-[fullscreen]:w-full group-data-[fullscreen]:h-auto',
        )}
      />

      <VideoPlayer.Overlay
        keepMounted
        render={(props, { open }) => (
          <motion.div
            {...props}
            className="absolute w-full h-full top-0 left-0"
            variants={overlayVariants}
            initial="hidden"
            animate={open ? 'visible' : 'hidden'}
            transition={{ duration, ease }}
          />
        )}
      />

      <VideoPlayer.Controls
        keepMounted
        render={(props, { open }) => (
          <motion.div
            {...props}
            className={cn(
              'absolute bottom-2 left-1/2 -translate-x-1/2 h-fit w-[80%]',
              'flex items-center gap-4',
            )}
            variants={controlsVariants}
            initial="hidden"
            animate={open ? 'visible' : 'hidden'}
            transition={{ duration, ease }}
          >
            <VideoPlayer.PlayButton
              render={(props, { playing, paused }) => (
                <motion.button
                  {...props}
                  className={cn(buttonClassName, 'group')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {paused && <PlayIcon />}
                  {playing && <PauseIcon />}
                </motion.button>
              )}
            />

            <VideoPlayer.TimeDisplay
              align="right"
              format="current"
              className="text-white text-sm"
            />

            <VideoPlayer.SeekSlider
              render={(props, { pressing }) => (
                <div
                  {...props}
                  className="flex items-center w-full h-12 select-none touch-none cursor-crosshair"
                >
                  <VideoPlayer.SeekSliderTrack
                    render={(props) => (
                      <motion.div
                        {...props}
                        className="relative w-full rounded-[9999999px] bg-white/20"
                        animate={{ height: pressing ? 6 : 4 }}
                        transition={{ duration: 0.15, ease: 'easeInOut' }}
                      >
                        <VideoPlayer.SeekSliderBuffered
                          render={(props) => (
                            <div
                              {...props}
                              className="absolute h-full bg-white/30 rounded-[9999999px]"
                            />
                          )}
                        />
                        <VideoPlayer.SeekSliderProgress
                          render={(props) => (
                            <div
                              {...props}
                              className="absolute h-full bg-white rounded-[9999999px]"
                            />
                          )}
                        />
                      </motion.div>
                    )}
                  />
                  <VideoPlayer.SeekSliderPreviewThumb
                    keepMounted
                    render={(props, { open }) => (
                      <motion.div
                        {...props}
                        className="relative"
                        animate={{ height: pressing ? 40 : 32 }}
                        transition={{ duration: 0.15, ease: 'easeInOut' }}
                      >
                        <motion.div
                          className="absolute bottom-0 left-0 w-px"
                          variants={thumbLineVariants}
                          initial="hidden"
                          animate={open ? 'visible' : 'hidden'}
                          style={{
                            backgroundColor: pressing
                              ? 'rgba(255, 255, 255, 1)'
                              : 'rgba(255, 255, 255, 0.5)',
                          }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                        />
                        <motion.div
                          className={cn(
                            'absolute bottom-full mb-2 left-1/2 -translate-x-1/2',
                            'flex items-center gap-1',
                          )}
                          initial={{
                            opacity: 0,
                            y: 10,
                            filter: 'blur(4px)',
                            fontSize: '13px',
                          }}
                          animate={{
                            opacity: open ? 1 : 0,
                            y: open ? 0 : 10,
                            filter: open ? 'blur(0px)' : 'blur(4px)',
                            fontSize: pressing ? '14px' : '13px',
                          }}
                          transition={{ duration: 0.15, ease: 'easeInOut' }}
                        >
                          <VideoPlayer.TimeDisplay
                            fixedWidth={false}
                            format="hover"
                            className="text-white"
                          />
                          <span className="text-white/50">/</span>
                          <VideoPlayer.TimeDisplay
                            fixedWidth={false}
                            format="duration"
                            className="text-white/50"
                          />
                        </motion.div>
                      </motion.div>
                    )}
                  />
                </div>
              )}
            />

            <VideoPlayer.TimeDisplay
              align="left"
              format="remaining"
              className="text-white text-sm"
            />

            <VideoPlayer.FullscreenButton
              render={(props) => (
                <motion.button
                  {...props}
                  className={cn(buttonClassName, 'group')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FullscreenIcon />
                </motion.button>
              )}
            />
          </motion.div>
        )}
      />
    </VideoPlayer.Root>
  )
}

const buttonClassName = cn(
  'size-8 min-h-8 min-w-8 rounded-[10px] flex items-center justify-center',
  'border border-transparent',
  'hover:border-white/10 hover:bg-white/10 hover:backdrop-blur-sm',
  '*:size-4 *:fill-white *:stroke-0',
)

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
