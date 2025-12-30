'use client'

import * as React from 'react'
import { VideoPlayer } from '@/app/craft/2025/video-player/component'
import { cn } from '@/lib/utils'

export interface YouTubePlayerProps {
  src: string
  poster?: string
}

export function YouTubePlayer({ src, poster }: YouTubePlayerProps) {
  return (
    <VideoPlayer.Root
      className={cn(
        '[--duration:200ms]',
        'group relative overflow-hidden bg-black',
        'aspect-video w-full h-auto',
        '**:font-sans **:tabular-nums',
        // Fullscreen styles
        'data-[fullscreen]:flex data-[fullscreen]:items-center data-[fullscreen]:justify-center',
        'data-[fullscreen]:h-full data-[fullscreen]:w-full',
      )}
    >
      {/* Poster */}
      <VideoPlayer.Poster
        className={cn(
          'absolute inset-0 bg-black bg-cover bg-center',
          'transition-opacity duration-(--duration) ease-out',
          'data-[starting-style]:opacity-100 data-[ending-style]:opacity-0',
        )}
        style={poster ? { backgroundImage: `url(${poster})` } : undefined}
      />

      {/* Video */}
      <VideoPlayer.Video
        src={src}
        className={cn(
          'w-full h-auto',
          'group-data-[fullscreen]:w-full group-data-[fullscreen]:h-auto',
        )}
      />

      {/* Clickable overlay */}
      <VideoPlayer.Overlay
        className={cn(
          'absolute inset-0 flex items-center justify-center',
          'opacity-100 scale-100',
          'transition-[opacity,scale] duration-(--duration) ease-out',
          'data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:scale-95',
        )}
      >
        {/* Center play/pause indicator - shows briefly on toggle */}
        <CenterPlayPauseIndicator />
      </VideoPlayer.Overlay>

      {/* Controls container */}
      <VideoPlayer.Controls
        className={cn(
          'absolute bottom-0 left-0 w-full flex flex-col',
          'opacity-100 transition-[opacity,translate] duration-(--duration) ease-out',
          'data-[starting-style]:opacity-0 data-[starting-style]:translate-y-full',
          'data-[ending-style]:opacity-0 data-[ending-style]:translate-y-full',
        )}
      >
        {/* Progress bar row */}
        <div className="px-3">
          <VideoPlayer.SeekSlider
            thumbAlignment="center"
            className={cn(
              'flex items-center w-full select-none touch-none cursor-pointer',
              'group/seek',
            )}
          >
            <VideoPlayer.SeekSliderControl className="flex items-center w-full h-5">
              <VideoPlayer.SeekSliderTrack
                className={cn(
                  'relative w-full',
                  'bg-black/50',
                  'h-1 group-hover/seek:h-1.5 group-data-[pressing]/seek:h-1.5',
                  'transition-[height] duration-100 ease-out rounded-sm',
                )}
              >
                <VideoPlayer.SeekSliderBuffered className="absolute h-full bg-white/50 rounded-sm" />
                <VideoPlayer.SeekSliderHover className="absolute h-full bg-white/50 rounded-sm" />
                <VideoPlayer.SeekSliderProgress className="absolute h-full bg-red-600 rounded-sm" />
                <VideoPlayer.SeekSliderThumb className="size-4 rounded-full bg-red-600 shadow-sm" />
              </VideoPlayer.SeekSliderTrack>
            </VideoPlayer.SeekSliderControl>

            {/* Hover preview thumb (anchor for tooltip) */}
            <VideoPlayer.SeekSliderPreviewThumb />

            {/* Tooltip with thumbnail and time display (collision-aware) */}
            <VideoPlayer.SeekSliderPreviewTooltip
              sideOffset={24}
              collisionPadding={12}
              className={cn('flex flex-col items-center gap-2')}
            >
              <VideoPlayer.Thumbnail
                width={160}
                className="rounded border-2 border-white shadow-lg"
              />
              <div
                className={cn(
                  'px-2 py-1 bg-black/50 rounded-xl text-xs text-white font-medium',
                  'whitespace-nowrap',
                )}
              >
                <VideoPlayer.TimeDisplay format="hover" align="center" />
              </div>
            </VideoPlayer.SeekSliderPreviewTooltip>
          </VideoPlayer.SeekSlider>
        </div>

        {/* Button row */}
        <div className="flex items-center gap-1 px-2 pb-2">
          {/* Left group */}
          <VideoPlayer.PlayButton className={cn(buttonClassName, 'group/play')}>
            <PlayIcon className="group-data-[playing]/play:hidden" />
            <PauseIcon className="group-data-[paused]/play:hidden group-data-[ended]/play:hidden" />
          </VideoPlayer.PlayButton>

          {/* Volume control with expanding slider */}
          <div className="group/volume flex items-center">
            <VideoPlayer.MuteButton
              className={cn(buttonClassName, 'group/mute')}
            >
              <VolumeHighIcon className="hidden group-data-[volume-on]/mute:block" />
              <VolumeMutedIcon className="hidden group-data-[volume-off]/mute:block group-data-[muted]/mute:block" />
            </VideoPlayer.MuteButton>

            <div className="w-0 group-hover/volume:w-16 group-hover/volume:overflow-visible overflow-hidden transition-[width] duration-200 ease-out">
              <VideoPlayer.VolumeSlider
                className="flex items-center h-10 w-16"
                orientation="horizontal"
                thumbAlignment="edge"
              >
                <VideoPlayer.VolumeSliderControl className="w-full h-full flex items-center">
                  <VideoPlayer.VolumeSliderTrack className="relative h-1 w-full bg-white/30 rounded-full">
                    <VideoPlayer.VolumeSliderRange className="absolute h-full bg-white rounded-full" />
                    <VideoPlayer.VolumeSliderThumb className="block size-3 bg-white rounded-full shadow-sm" />
                  </VideoPlayer.VolumeSliderTrack>
                </VideoPlayer.VolumeSliderControl>
              </VideoPlayer.VolumeSlider>
            </div>
          </div>

          {/* Time display */}
          <div className="flex items-center text-white text-sm ml-2 select-none">
            <VideoPlayer.TimeDisplay
              format="current"
              className="tabular-nums"
            />
            <span className="mx-1 text-white/70">/</span>
            <VideoPlayer.TimeDisplay
              format="duration"
              className="tabular-nums text-white/70"
            />
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right group */}
          <VideoPlayer.CaptionsButton
            className={cn(buttonClassName, 'group/captions')}
          >
            <CaptionsIcon className="opacity-70 group-data-[active]/captions:opacity-100" />
          </VideoPlayer.CaptionsButton>

          <VideoPlayer.PlaybackRateButton className={buttonClassName}>
            <SettingsIcon />
          </VideoPlayer.PlaybackRateButton>

          <VideoPlayer.PictureInPictureButton className={buttonClassName}>
            <PictureInPictureIcon />
          </VideoPlayer.PictureInPictureButton>

          <VideoPlayer.FullscreenButton
            className={cn(buttonClassName, 'group/fullscreen')}
          >
            <FullscreenIcon className="group-data-[fullscreen]/fullscreen:hidden" />
            <ExitFullscreenIcon className="hidden group-data-[fullscreen]/fullscreen:block" />
          </VideoPlayer.FullscreenButton>
        </div>
      </VideoPlayer.Controls>
    </VideoPlayer.Root>
  )
}

// Center play/pause indicator that shows briefly on toggle
function CenterPlayPauseIndicator() {
  const { playing } = VideoPlayer.useVideoPlayer()
  const [visible, setVisible] = React.useState(false)
  const [icon, setIcon] = React.useState<'play' | 'pause'>('play')
  const prevPlayingRef = React.useRef(playing)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    // Detect play/pause toggle
    if (prevPlayingRef.current !== playing) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Set the icon based on the new state
      setIcon(playing ? 'play' : 'pause')
      setVisible(true)

      // Hide after 1 second
      timeoutRef.current = setTimeout(() => {
        setVisible(false)
      }, 1000)

      prevPlayingRef.current = playing
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [playing])

  return (
    <div
      className={cn(
        'size-16 md:size-20 rounded-full flex items-center justify-center',
        'bg-black/60',
        'transition-opacity duration-200 ease-out',
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none',
      )}
      aria-hidden="true"
    >
      {icon === 'play' ? (
        <PlayIcon className="size-8 md:size-10 fill-white ml-1" />
      ) : (
        <PauseIcon className="size-8 md:size-10 fill-white" />
      )}
    </div>
  )
}

// Button styles
const buttonClassName = cn(
  'size-10 flex items-center justify-center rounded-sm',
  'text-white hover:bg-white/10 transition-colors',
  '*:size-5 *:fill-current',
)

// Icons
const PlayIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    height="36"
    viewBox="0 0 36 36"
    width="36"
    {...props}
  >
    <path d="M 17 8.6 L 10.89 4.99 C 9.39 4.11 7.5 5.19 7.5 6.93 C 7.5 6.93 7.5 6.93 7.5 6.93 L 7.5 29.06 C 7.5 30.8 9.39 31.88 10.89 31 C 10.89 31 10.89 31 10.89 31 L 17 27.4 C 17 27.4 17 27.4 17 27.4 C 17 27.4 17 27.4 17 27.4 L 17 8.6 C 17 8.6 17 8.6 17 8.6 C 17 8.6 17 8.6 17 8.6 Z M 17 8.6 L 17 8.6 C 17 8.6 17 8.6 17 8.6 C 17 8.6 17 8.6 17 8.6 V 27.4 C 17 27.4 17 27.4 17 27.4 C 17 27.4 17 27.4 17 27.4 L 33 18 C 33 18 33 18 33 18 C 33 18 33 18 33 18 V 18 L 17 8.6 C 17 8.6 17 8.6 17 8.6 C 17 8.6 17 8.6 17 8.6 Z" />
  </svg>
)

const PauseIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
)

const VolumeHighIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height="24"
    width="24"
    {...props}
  >
    <path
      d="M 11.60 2.08 L 11.48 2.14 L 3.91 6.68 C 3.02 7.21 2.28 7.97 1.77 8.87 C 1.26 9.77 1.00 10.79 1 11.83 V 12.16 L 1.01 12.56 C 1.07 13.52 1.37 14.46 1.87 15.29 C 2.38 16.12 3.08 16.81 3.91 17.31 L 11.48 21.85 C 11.63 21.94 11.80 21.99 11.98 21.99 C 12.16 22.00 12.33 21.95 12.49 21.87 C 12.64 21.78 12.77 21.65 12.86 21.50 C 12.95 21.35 13 21.17 13 21 V 3 C 12.99 2.83 12.95 2.67 12.87 2.52 C 12.80 2.37 12.68 2.25 12.54 2.16 C 12.41 2.07 12.25 2.01 12.08 2.00 C 11.92 1.98 11.75 2.01 11.60 2.08 Z"
      fill="currentColor"
    ></path>
    <path
      d=" M 15.53 7.05 C 15.35 7.22 15.25 7.45 15.24 7.70 C 15.23 7.95 15.31 8.19 15.46 8.38 L 15.53 8.46 L 15.70 8.64 C 16.09 9.06 16.39 9.55 16.61 10.08 L 16.70 10.31 C 16.90 10.85 17 11.42 17 12 L 16.99 12.24 C 16.96 12.73 16.87 13.22 16.70 13.68 L 16.61 13.91 C 16.36 14.51 15.99 15.07 15.53 15.53 C 15.35 15.72 15.25 15.97 15.26 16.23 C 15.26 16.49 15.37 16.74 15.55 16.92 C 15.73 17.11 15.98 17.21 16.24 17.22 C 16.50 17.22 16.76 17.12 16.95 16.95 C 17.6 16.29 18.11 15.52 18.46 14.67 L 18.59 14.35 C 18.82 13.71 18.95 13.03 18.99 12.34 L 19 12 C 18.99 11.19 18.86 10.39 18.59 9.64 L 18.46 9.32 C 18.15 8.57 17.72 7.89 17.18 7.3 L 16.95 7.05 L 16.87 6.98 C 16.68 6.82 16.43 6.74 16.19 6.75 C 15.94 6.77 15.71 6.87 15.53 7.05"
      fill="currentColor"
      transform="translate(18, 12) scale(1) translate(-18,-12)"
    ></path>
    <path
      d="M18.36 4.22C18.18 4.39 18.08 4.62 18.07 4.87C18.05 5.12 18.13 5.36 18.29 5.56L18.36 5.63L18.66 5.95C19.36 6.72 19.91 7.60 20.31 8.55L20.47 8.96C20.82 9.94 21 10.96 21 11.99L20.98 12.44C20.94 13.32 20.77 14.19 20.47 15.03L20.31 15.44C19.86 16.53 19.19 17.52 18.36 18.36C18.17 18.55 18.07 18.80 18.07 19.07C18.07 19.33 18.17 19.59 18.36 19.77C18.55 19.96 18.80 20.07 19.07 20.07C19.33 20.07 19.59 19.96 19.77 19.77C20.79 18.75 21.61 17.54 22.16 16.20L22.35 15.70C22.72 14.68 22.93 13.62 22.98 12.54L23 12C22.99 10.73 22.78 9.48 22.35 8.29L22.16 7.79C21.67 6.62 20.99 5.54 20.15 4.61L19.77 4.22L19.70 4.15C19.51 3.99 19.26 3.91 19.02 3.93C18.77 3.94 18.53 4.04 18.36 4.22 Z"
      fill="currentColor"
      transform="translate(22, 12) scale(1) translate(-22,-12)"
    />
  </svg>
)

const VolumeMutedIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    width="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M11.60 2.08L11.48 2.14L3.91 6.68C3.02 7.21 2.28 7.97 1.77 8.87C1.26 9.77 1.00 10.79 1 11.83V12.16L1.01 12.56C1.07 13.52 1.37 14.46 1.87 15.29C2.38 16.12 3.08 16.81 3.91 17.31L11.48 21.85C11.63 21.94 11.80 21.99 11.98 21.99C12.16 22.00 12.33 21.95 12.49 21.87C12.64 21.78 12.77 21.65 12.86 21.50C12.95 21.35 13 21.17 13 21V3C12.99 2.83 12.95 2.67 12.87 2.52C12.80 2.37 12.68 2.25 12.54 2.16C12.41 2.07 12.25 2.01 12.08 2.00C11.92 1.98 11.75 2.01 11.60 2.08ZM4.94 8.4V8.40L11 4.76V19.23L4.94 15.6C4.38 15.26 3.92 14.80 3.58 14.25C3.24 13.70 3.05 13.07 3.00 12.43L3 12.17V11.83C2.99 11.14 3.17 10.46 3.51 9.86C3.85 9.25 4.34 8.75 4.94 8.4ZM21.29 8.29L19 10.58L16.70 8.29L16.63 8.22C16.43 8.07 16.19 7.99 15.95 8.00C15.70 8.01 15.47 8.12 15.29 8.29C15.12 8.47 15.01 8.70 15.00 8.95C14.99 9.19 15.07 9.43 15.22 9.63L15.29 9.70L17.58 12L15.29 14.29C15.19 14.38 15.12 14.49 15.06 14.61C15.01 14.73 14.98 14.87 14.98 15.00C14.98 15.13 15.01 15.26 15.06 15.39C15.11 15.51 15.18 15.62 15.28 15.71C15.37 15.81 15.48 15.88 15.60 15.93C15.73 15.98 15.86 16.01 15.99 16.01C16.12 16.01 16.26 15.98 16.38 15.93C16.50 15.87 16.61 15.80 16.70 15.70L19 13.41L21.29 15.70L21.36 15.77C21.56 15.93 21.80 16.01 22.05 15.99C22.29 15.98 22.53 15.88 22.70 15.70C22.88 15.53 22.98 15.29 22.99 15.05C23.00 14.80 22.93 14.56 22.77 14.36L22.70 14.29L20.41 12L22.70 9.70C22.80 9.61 22.87 9.50 22.93 9.38C22.98 9.26 23.01 9.12 23.01 8.99C23.01 8.86 22.98 8.73 22.93 8.60C22.88 8.48 22.81 8.37 22.71 8.28C22.62 8.18 22.51 8.11 22.39 8.06C22.26 8.01 22.13 7.98 22.00 7.98C21.87 7.98 21.73 8.01 21.61 8.06C21.49 8.12 21.38 8.19 21.29 8.29Z"
      fill="currentColor"
    />
  </svg>
)

const CaptionsIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z" />
  </svg>
)

const SettingsIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
)

const PictureInPictureIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z" />
  </svg>
)

const FullscreenIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
  </svg>
)

const ExitFullscreenIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
  </svg>
)
