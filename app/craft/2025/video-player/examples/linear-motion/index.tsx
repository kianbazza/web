'use client'

import { Popover } from '@base-ui/react'
import { motion, type Variants } from 'motion/react'
import * as React from 'react'
import { VideoPlayer } from '@/app/craft/2025/video-player/component'
import { cn } from '@/lib/utils'
import {
  CaptionsOffIcon,
  CaptionsOnIcon,
  FullscreenIcon,
  MuteIcon,
  PauseIcon,
  PictureInPictureIcon,
  PlayIcon,
  ReplayIcon,
  SpinnerIcon,
  VolumeHighIcon,
  VolumeLowIcon,
} from './icons'

export interface VideoPlayerProps {
  src: string
  captions?: Array<{
    src: string
    label: string
    srcLang: string
    default?: boolean
  }>
}

const duration = 0.3
const ease = 'easeOut'

const posterVariants: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const overlayVariants: Variants = {
  visible: { backgroundColor: 'rgba(0, 0, 0, 0.3)' },
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

export function LinearMotionPlayer({ src, captions }: VideoPlayerProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <VideoPlayer.Root
      ref={ref}
      hideCursorWhenIdle="always"
      className={cn(
        'group/root relative rounded-xl overflow-hidden bg-black',
        'flex items-center justify-center',
        'shadow-[inset_0px_0px_0px_2px_rgba(255,255,255,0.5)]',
        'aspect-video w-full h-auto',
        'data-[fullscreen]:rounded-none data-[fullscreen]:h-full data-[fullscreen]:w-full',
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
          'group-data-[fullscreen]/root:w-full group-data-[fullscreen]/root:h-auto',
        )}
      >
        {captions?.map((track) => (
          <VideoPlayer.Track
            key={track.src}
            kind="captions"
            src={track.src}
            label={track.label}
            srcLang={track.srcLang}
            default={track.default}
          />
        ))}
      </VideoPlayer.Video>

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

      <VideoPlayer.Captions
        className={cn(
          'absolute bottom-22 group-data-[idle]/root:bottom-8 left-1/2 -translate-x-1/2',
          'bg-black/50 text-white px-2 py-1 rounded-lg',
          'font-sans text-center max-w-[80%]',
          'group-data-[fullscreen]/root:text-3xl group-data-[fullscreen]/root:bottom-48 group-data-[fullscreen]/root:group-data-[idle]/root:bottom-32',
          'hidden data-[active]:block',
          'transition-[opacity,bottom] duration-200',
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
              render={(props, { playing, paused, waiting, ended }) => (
                <motion.button
                  {...props}
                  className={cn(buttonClassName, 'group *:size-4 text-white')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {waiting && (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: 'linear',
                      }}
                    >
                      <SpinnerIcon className="stroke-white fill-none" />
                    </motion.span>
                  )}
                  {paused && !waiting && !ended && <PlayIcon />}
                  {playing && !waiting && <PauseIcon />}
                  {ended && !waiting && <ReplayIcon />}
                </motion.button>
              )}
            />

            <Popover.Root>
              <VideoPlayer.MuteButton
                render={({ onClick, ...props }, state) => {
                  const volumeOff = state.muted || state.volume === 0
                  const volumeLow = !volumeOff && state.volume < 0.5
                  const volumeHigh = !volumeOff && state.volume >= 0.5
                  return (
                    <Popover.Trigger
                      openOnHover
                      delay={0}
                      onClick={(e) => {
                        e.preventBaseUIHandler()
                        onClick(e)
                      }}
                      render={
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        />
                      }
                      className={cn(
                        buttonClassName,
                        'group *:size-4 text-white',
                      )}
                      {...props}
                    >
                      {volumeOff && <MuteIcon />}
                      {volumeLow && <VolumeLowIcon />}
                      {volumeHigh && <VolumeHighIcon />}
                    </Popover.Trigger>
                  )
                }}
              />
              {open && (
                <Popover.Portal keepMounted container={ref}>
                  <Popover.Positioner
                    className="z-50"
                    side="top"
                    align="center"
                    sideOffset={8}
                  >
                    <Popover.Popup className="z-50 border border-white/10 bg-white/10 backdrop-blur-sm w-8 py-3 rounded-[10px]">
                      <VideoPlayer.VolumeSlider
                        className="flex flex-col items-center h-16 w-full **:cursor-crosshair! group"
                        orientation="vertical"
                        thumbAlignment="edge"
                      >
                        <VideoPlayer.VolumeSliderControl className="w-full h-full flex flex-col items-center">
                          <VideoPlayer.VolumeSliderTrack className="relative w-1 h-full bg-white/30 rounded-full group-data-[pressing]:w-1.5 transition-[width] duration-150 ease-in-out">
                            <VideoPlayer.VolumeSliderRange className="absolute bottom-0 w-full bg-white rounded-full" />
                            <VideoPlayer.VolumeSliderThumb className="block size-3 bg-white rounded-full shadow-sm" />
                          </VideoPlayer.VolumeSliderTrack>
                        </VideoPlayer.VolumeSliderControl>
                      </VideoPlayer.VolumeSlider>
                    </Popover.Popup>
                  </Popover.Positioner>
                </Popover.Portal>
              )}
            </Popover.Root>

            <VideoPlayer.TimeDisplay
              align="right"
              format="current"
              className="text-white text-sm"
            />

            <VideoPlayer.SeekSlider
              render={(props, { pressing }) => (
                <div
                  {...props}
                  className="flex items-center w-full h-12 select-none touch-none **:cursor-crosshair!"
                >
                  <VideoPlayer.SeekSliderControl className="flex items-center w-full h-full">
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
                          <VideoPlayer.SeekSliderThumb className="size-0" />
                        </motion.div>
                      )}
                    />
                  </VideoPlayer.SeekSliderControl>
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

            <VideoPlayer.PlaybackRateButton
              render={(props, state) => (
                <motion.button
                  {...props}
                  className={cn(
                    buttonClassName,
                    'w-15 min-w-15 text-sm text-white',
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {state.playbackRate}x
                </motion.button>
              )}
            />

            <VideoPlayer.CaptionsButton
              render={(props, state) => (
                <motion.button
                  {...props}
                  className={cn(
                    buttonClassName,
                    'group *:size-4 text-white',
                    state.available ? 'opacity-100' : 'opacity-50',
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {state.active ? <CaptionsOnIcon /> : <CaptionsOffIcon />}
                </motion.button>
              )}
            />

            <VideoPlayer.PictureInPictureButton
              render={(props) => (
                <motion.button
                  {...props}
                  className={cn(buttonClassName, '*:size-4 *:fill-white')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PictureInPictureIcon />
                </motion.button>
              )}
            />

            <VideoPlayer.FullscreenButton
              render={(props) => (
                <motion.button
                  {...props}
                  className={cn(buttonClassName, 'group *:size-4 *:fill-white')}
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
)
