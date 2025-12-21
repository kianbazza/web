'use client'

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

      {/* Clickable overlay with center play button */}
      <VideoPlayer.Overlay
        className={cn(
          'absolute inset-0 flex items-center justify-center',
          'transition-opacity duration-(--duration) ease-out',
          'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
        )}
      >
        {/* Center play button - only visible when paused */}
        <button
          type="button"
          className={cn(
            'size-16 md:size-20 rounded-full flex items-center justify-center',
            'bg-black/60 hover:bg-black/70 transition-colors',
            'group-data-[playing]:opacity-0 group-data-[playing]:pointer-events-none',
            'transition-opacity duration-(--duration)',
          )}
          aria-label="Play video"
        >
          <PlayIcon className="size-8 md:size-10 fill-white ml-1" />
        </button>
      </VideoPlayer.Overlay>

      {/* Bottom gradient for controls visibility */}
      <div
        className={cn(
          'absolute bottom-0 left-0 w-full h-28 pointer-events-none',
          'bg-gradient-to-t from-black/80 via-black/40 to-transparent',
          'opacity-100 transition-opacity duration-(--duration)',
          'group-data-[idle]:opacity-0',
        )}
      />

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
            className={cn(
              'flex items-center w-full h-5 select-none touch-none cursor-pointer',
              'group/seek',
            )}
          >
            <VideoPlayer.SeekSliderTrack
              className={cn(
                'relative w-full overflow-hidden rounded-sm',
                'bg-black/50',
                'h-1 group-hover/seek:h-1.5 group-data-[pressing]/seek:h-1.5',
                'transition-[height] duration-100 ease-out',
              )}
            >
              <VideoPlayer.SeekSliderBuffered className="absolute h-full bg-white/50 rounded-sm" />
              <VideoPlayer.SeekSliderHover className="absolute h-full bg-white/50 rounded-sm" />
              <VideoPlayer.SeekSliderProgress className="absolute h-full bg-red-600 rounded-sm" />
            </VideoPlayer.SeekSliderTrack>

            <VideoPlayer.SeekSliderThumb className="block size-4 rounded-full bg-red-600 shadow-sm" />

            {/* Hover preview thumb with thumbnail and time tooltip */}
            <VideoPlayer.SeekSliderPreviewThumb
              className={cn(
                'absolute top-1/2 -translate-y-1/2',
                'flex flex-col items-center',
                'pointer-events-none',
                'group/thumb',
              )}
            >
              {/* Thumbnail preview */}
              <div
                className={cn(
                  'absolute bottom-4 left-1/2 -translate-x-1/2',
                  'flex flex-col items-center gap-2',
                  'opacity-0 group-data-[open]/thumb:opacity-100',
                  'transition-opacity duration-100',
                )}
              >
                <VideoPlayer.Thumbnail
                  width={160}
                  className="rounded border-2 border-white shadow-lg"
                />
                {/* Time tooltip */}
                <div
                  className={cn(
                    'px-2 py-1 bg-black/50 rounded-xl text-xs text-white font-medium flex items-center',
                    'whitespace-nowrap',
                  )}
                >
                  <VideoPlayer.TimeDisplay format="hover" align="center" />
                </div>
              </div>
              {/* Vertical line indicator */}
              {/*<div
                className={cn(
                  'w-0.5 h-5 bg-white rounded-full',
                  'opacity-0 group-data-[open]/thumb:opacity-100',
                  'transition-opacity duration-100',
                )}
              />*/}
            </VideoPlayer.SeekSliderPreviewThumb>
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
              <VolumeHighIcon className="group-data-[muted]/mute:hidden" />
              <VolumeMutedIcon className="hidden group-data-[muted]/mute:block" />
            </VideoPlayer.MuteButton>

            <div className="w-0 group-hover/volume:w-16 overflow-hidden transition-[width] duration-200 ease-out">
              <VideoPlayer.VolumeSlider
                className="flex items-center h-10 w-16 px-1"
                orientation="horizontal"
              >
                <VideoPlayer.VolumeSliderTrack className="relative h-1 w-full bg-white/30 rounded-full">
                  <VideoPlayer.VolumeSliderRange className="absolute h-full bg-white rounded-full" />
                </VideoPlayer.VolumeSliderTrack>
                {/*<VideoPlayer.VolumeSliderThumb className="block size-3 bg-white rounded-full shadow-sm" />*/}
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

// Button styles
const buttonClassName = cn(
  'size-10 flex items-center justify-center rounded-sm',
  'text-white hover:bg-white/10 transition-colors',
  '*:size-5 *:fill-current',
)

// Icons
const PlayIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M8 5.14v14l11-7-11-7z" />
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
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
)

const VolumeMutedIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
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
