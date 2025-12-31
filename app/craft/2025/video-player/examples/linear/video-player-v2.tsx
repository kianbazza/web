'use client'

import { Popover } from '@base-ui/react'
import * as React from 'react'
import { VideoPlayer } from '@/app/craft/2025/video-player/component'
import { cn } from '@/lib/utils'
import type { VideoPlayerProps } from './video-player'

export function VideoPlayer_v2({ src, captions }: VideoPlayerProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <VideoPlayer.Root
      ref={ref}
      hideCursorWhenIdle="always"
      className={cn(
        '[--duration:300ms]',
        'group/root relative rounded-xl overflow-hidden',
        'shadow-[inset_0px_0px_0px_2px_rgba(255,255,255,0.5)]',
        'aspect-video w-full h-auto',
        'data-[fullscreen]:flex data-[fullscreen]:items-center data-[fullscreen]:justify-center',
        'data-[fullscreen]:bg-black data-[fullscreen]:rounded-none data-[fullscreen]:h-full data-[fullscreen]:w-full',
        'data-[fullscreen]:border-0 data-[fullscreen]:shadow-none',
      )}
    >
      <VideoPlayer.Poster
        className={cn(
          'absolute inset-0 bg-gray-4',
          'transition-opacity duration-(--duration) ease-out',
          'data-[starting-style]:opacity-100 data-[ending-style]:opacity-0',
        )}
      />
      <VideoPlayer.Video
        src={src}
        className={cn(
          'w-full h-auto',
          'group-data-[fullscreen]:w-full group-data-[fullscreen]:h-auto',
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
      <VideoPlayer.Overlay className="absolute w-full h-full top-0 left-0 bg-black/30 data-[starting-style]:bg-transparent data-[ending-style]:bg-transparent transition-[background-color] duration-(--duration) ease-out" />
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
        className={cn(
          'absolute bottom-2 left-1/2 -translate-x-1/2 h-fit w-[80%]',
          'flex items-center gap-4',
          'opacity-100 translate-y-0 blur-none transition-[opacity,filter,translate] duration-(--duration) ease-out',
          'data-[starting-style]:opacity-0 data-[starting-style]:translate-y-2.5 data-[starting-style]:blur-xs',
          'data-[ending-style]:opacity-0 data-[ending-style]:translate-y-2.5 data-[ending-style]:blur-xs',
        )}
      >
        <VideoPlayer.PlayButton
          className={cn(buttonClassName, 'group *:size-4 *:text-white')}
        >
          <SpinnerIcon className="hidden group-data-[waiting]:block animate-spin" />
          <PlayIcon className="hidden group-data-[paused]:block" />
          <PauseIcon className="hidden group-data-[playing]:block" />
          <ReplayIcon className="hidden group-data-[ended]:block" />
        </VideoPlayer.PlayButton>

        <div>
          <Popover.Root>
            <Popover.Trigger
              openOnHover
              delay={0}
              onClick={(e) => {
                e.preventBaseUIHandler()
              }}
              render={(props) => (
                <VideoPlayer.MuteButton
                  {...props}
                  className={cn(buttonClassName, 'group text-white')}
                >
                  <MuteIcon className="hidden group-data-[volume-off]:block" />
                  <VolumeLowIcon className="hidden group-data-[volume-low]:block" />
                  <VolumeHighIcon className="hidden group-data-[volume-high]:block" />
                </VideoPlayer.MuteButton>
              )}
            ></Popover.Trigger>
            <Popover.Portal container={ref}>
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
          </Popover.Root>
        </div>

        <VideoPlayer.TimeDisplay
          align="right"
          format="current"
          className="text-white text-sm"
        />

        <VideoPlayer.SeekSlider className="flex items-center w-full h-12 select-none touch-none group/seek cursor-crosshair! **:cursor-crosshair!">
          <VideoPlayer.SeekSliderControl className="flex items-center w-full h-full">
            <VideoPlayer.SeekSliderTrack className="relative h-1 w-full overflow-hidden rounded-[9999999px] bg-white/20 group-data-[pressing]/seek:h-1.5 transition-[height] duration-150 ease-in-out">
              <VideoPlayer.SeekSliderBuffered className="absolute h-full bg-white/30" />
              <VideoPlayer.SeekSliderProgress className="absolute h-full bg-white" />
              <VideoPlayer.SeekSliderThumb className="size-0" />
            </VideoPlayer.SeekSliderTrack>
          </VideoPlayer.SeekSliderControl>
          <VideoPlayer.SeekSliderPreviewThumb
            className={cn(
              'h-8 w-px shadow-md relative group/thumb',
              'group-data-[pressing]/seek:h-10',
              'transition-[height] duration-150 ease-in-out',
            )}
          >
            <div
              className={cn(
                'absolute bottom-0 left-0 bg-white/50 w-px',
                'group-data-[pressing]/seek:bg-white',
                'opacity-100 h-full blur-none',
                'transition-[height,opacity,filter] duration-150 ease-out',
                'group-data-[starting-style]/thumb:opacity-0 group-data-[starting-style]/thumb:h-0 group-data-[starting-style]/thumb:blur-xs',
                'group-data-[ending-style]/thumb:opacity-0 group-data-[ending-style]/thumb:h-0 group-data-[ending-style]/thumb:blur-xs',
              )}
            />
            <div
              key="thumb-time"
              className={cn(
                'absolute bottom-full mb-2 left-1/2 -translate-x-1/2',
                'flex items-center gap-1 text-[13px]',
                'group-data-[pressing]/seek:text-sm',
                'opacity-100 translate-y-0 blur-none',
                'transition-[opacity,filter,translate,font-size] duration-150 ease-in-out',
                'group-data-[starting-style]/thumb:opacity-0 group-data-[starting-style]/thumb:translate-y-2.5 group-data-[starting-style]/thumb:blur-xs',
                'group-data-[ending-style]/thumb:opacity-0 group-data-[ending-style]/thumb:translate-y-2.5 group-data-[ending-style]/thumb:blur-xs',
              )}
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
            </div>
          </VideoPlayer.SeekSliderPreviewThumb>
        </VideoPlayer.SeekSlider>

        <VideoPlayer.TimeDisplay
          align="left"
          format="remaining"
          className="text-white text-sm"
        />

        <VideoPlayer.PlaybackRateButton
          render={(props, state) => (
            <button
              {...props}
              className={cn(
                buttonClassName,
                'w-15 min-w-15 text-sm',
                'text-white',
              )}
            >
              {state.playbackRate}x
            </button>
          )}
        />

        <VideoPlayer.CaptionsButton
          className={cn(
            buttonClassName,
            'group opacity-50 data-[available]:opacity-100',
          )}
        >
          <CaptionsOnIcon className="text-white hidden group-data-[active]:block" />
          <CaptionsOffIcon className="text-white group-data-[active]:hidden" />
        </VideoPlayer.CaptionsButton>

        <VideoPlayer.PictureInPictureButton className={cn(buttonClassName)}>
          <PictureInPictureIcon className="text-white" />
        </VideoPlayer.PictureInPictureButton>

        <VideoPlayer.FullscreenButton className={cn(buttonClassName, 'group')}>
          <FullscreenIcon className="text-white" />
        </VideoPlayer.FullscreenButton>
      </VideoPlayer.Controls>
    </VideoPlayer.Root>
  )
}

const buttonClassName = cn(
  'size-8 min-h-8 min-w-8 rounded-[10px] flex items-center justify-center',
  'border border-transparent',
  'active:scale-95',
  'hover:border-white/10 hover:bg-white/10 hover:backdrop-blur-sm hover:transition-none',
  ' transition-[scale,color,background-color,border-color,filter] duration-(--duration) ease-out',
  'aria-expanded:border-white/10 aria-expanded:bg-white/10 aria-expanded:backdrop-blur-sm',
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

const ReplayIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    role="img"
    focusable="false"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.8856 5.92593L1.4077 5.92593C1.18254 5.92593 1 5.75806 1 5.55098V3.19051C1 2.85782 1.43613 2.68992 1.69384 2.92341L2.33637 3.50558C3.64625 1.97994 5.6172 1 7.83198 1C11.8198 1 15 4.1619 15 8C15 11.8381 11.8198 15 7.83198 15C4.9541 15 2.49084 13.3472 1.34915 10.9902C1.15994 10.5996 1.34185 10.1381 1.75544 9.95939C2.16904 9.78069 2.65771 9.95248 2.84692 10.3431C3.74175 12.1905 5.64805 13.4444 7.83198 13.4444C10.8521 13.4444 13.3529 11.0348 13.3529 8C13.3529 4.96522 10.8521 2.55556 7.83198 2.55556C6.08383 2.55556 4.51546 3.35789 3.49889 4.62582L4.18254 5.29404C4.42736 5.53334 4.24288 5.92593 3.8856 5.92593Z"
      fill="currentColor"
    ></path>
    <path
      d="M7.34974 5.99995L10.0688 7.67953C10.1504 7.72411 10.2176 7.78628 10.2639 7.86008C10.3102 7.93388 10.3341 8.01684 10.3333 8.10103C10.3325 8.18522 10.307 8.26781 10.2593 8.34091C10.2115 8.41401 10.1431 8.47516 10.0606 8.51852L7.34197 10.0038C7.25662 10.0487 7.15918 10.0729 7.05962 10.074C6.96006 10.0751 6.86195 10.0531 6.77532 10.0102C6.68869 9.96723 6.61664 9.90493 6.56655 9.82964C6.51645 9.75436 6.4901 9.66878 6.4902 9.58167V6.41748C6.49028 6.32976 6.51716 6.24366 6.56807 6.16809C6.61897 6.09252 6.69204 6.03023 6.77972 5.98768C6.86739 5.94513 6.96647 5.92386 7.06669 5.92608C7.16692 5.9283 7.26464 5.95357 7.34974 5.99995Z"
      fill="currentColor"
    ></path>
  </svg>
)

const MuteIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    role="img"
    focusable="false"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="currentColor"
      d="M6.756 2.145 3.2 5.43H1.8c-.442 0-.8.384-.8.857v3.426c0 .474.358.857.8.857h1.4l3.556 3.286c.532.38 1.244-.029 1.244-.713V2.858c0-.684-.712-1.092-1.244-.713Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.25"
      d="m15 6-4 4m4 0-4-4"
    />
  </svg>
)

const VolumeLowIcon = (props: React.ComponentProps<'svg'>) => (
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
    <path
      fill="currentColor"
      d="M6.756 2.145 3.2 5.43H1.8c-.442 0-.8.384-.8.857v3.426c0 .474.358.857.8.857h1.4l3.556 3.286c.532.38 1.244-.029 1.244-.713V2.858c0-.684-.712-1.092-1.244-.713Z"
    ></path>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.25"
      d="M11 10c.287-.263.515-.574.67-.918A2.62 2.62 0 0 0 11.907 8c0-.371-.08-.74-.235-1.082A2.826 2.826 0 0 0 11 6"
    ></path>
  </svg>
)

const VolumeHighIcon = (props: React.ComponentProps<'svg'>) => (
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
    <path
      fill="currentColor"
      d="M6.756 2.145L3.2 5.43H1.8c-.442 0-.8.384-.8.857v3.426c0 .474.358.857.8.857h1.4l3.556 3.286c.532.38 1.244-.029 1.244-.713V2.858c0-.684-.712-1.092-1.244-.713z"
    ></path>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12.726 3.578a.625.625 0 01.883-.04 6.278 6.278 0 011.49 2.04c.346.765.526 1.589.526 2.422 0 .833-.18 1.657-.527 2.423a6.278 6.278 0 01-1.489 2.038.625.625 0 11-.843-.922 5.028 5.028 0 001.194-1.632A4.613 4.613 0 0014.375 8c0-.653-.14-1.3-.415-1.907a5.028 5.028 0 00-1.194-1.632.625.625 0 01-.04-.883zm-2.187 2a.625.625 0 01.883-.04c.347.319.626.699.818 1.122a3.236 3.236 0 010 2.68c-.192.423-.47.803-.818 1.121a.625.625 0 11-.844-.922 2.2 2.2 0 00.523-.715 1.981 1.981 0 000-1.648 2.2 2.2 0 00-.523-.715.625.625 0 01-.04-.883z"
      clipRule="evenodd"
    ></path>
  </svg>
)

const CaptionsOffIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    role="img"
    focusable="false"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.757 10.5H13a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H3a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h3v2.031L8.757 10.5Zm-3.46 4.413a.5.5 0 0 1-.797-.402V12H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9.25l-3.953 2.913Z"
      fill="currentColor"
    ></path>
    <path
      d="M3.5 7a.5.5 0 0 1 .5-.5h5.5a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5ZM3.5 9a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5ZM7 9a.5.5 0 0 1 .5-.5h4.243a.5.5 0 1 1 0 1H7.5A.5.5 0 0 1 7 9Z"
      fill="currentColor"
    ></path>
  </svg>
)

const CaptionsOnIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    role="img"
    focusable="false"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.5 14.51a.5.5 0 0 0 .797.403L9.25 12H13a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1.5v2.51ZM7 9a.5.5 0 0 1 .5-.5h4.243a.5.5 0 1 1 0 1H7.5A.5.5 0 0 1 7 9Zm-3-.5h1.5a.5.5 0 0 1 0 1H4a.5.5 0 0 1 0-1ZM3.5 7a.5.5 0 0 1 .5-.5h5.5a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5Z"
      fill="currentColor"
    ></path>
  </svg>
)

const PictureInPictureIcon = (props: React.ComponentProps<'svg'>) => (
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
    <path d="M7 9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V9Z" />
    <path d="M3 3.5h8a.5.5 0 0 1 .5.5v1.75a.75.75 0 0 0 1.5 0V4a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1.75a.75.75 0 0 0 0-1.5H3a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5Z" />
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
    stroke="currentColor"
    role="img"
    focusable="false"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="8" cy="8" r="6" strokeOpacity="0.25" strokeWidth="2" />
    <path d="M14 8a6 6 0 0 0-6-6" strokeWidth="2" strokeLinecap="round" />
  </svg>
)
