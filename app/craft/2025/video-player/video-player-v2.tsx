import { cn } from '@/lib/utils'
import { VideoPlayer } from './component'
import type { VideoPlayerProps } from './video-player'

export function VideoPlayer_v2({ src, poster }: VideoPlayerProps) {
  return (
    <VideoPlayer.Root className="relative" preventIdleWhenPaused>
      <VideoPlayer.Video src={src} />
      {poster && <VideoPlayer.Poster src={poster} />}
      <VideoPlayer.Overlay className="absolute w-full h-full top-0 left-0 data-[open]:bg-black/20 data-[closed]:bg-transparent" />
      <VideoPlayer.Controls
        className={cn(
          'absolute bottom-2 left-1/2 -translate-x-1/2 h-fit w-[80%] data-[closed]:hidden',
          'flex items-center gap-4',
        )}
      >
        <VideoPlayer.PlayButton className={cn(buttonClassName, 'group')}>
          <PlayIcon className="group-data-[playing]:hidden" />
          <PauseIcon className="group-data-[paused]:hidden" />
        </VideoPlayer.PlayButton>

        <VideoPlayer.TimeDisplay
          align="right"
          format="current"
          className="text-white text-sm"
        />

        <VideoPlayer.SeekSlider className="flex items-center w-full h-12 select-none touch-none group/seek cursor-crosshair! **:cursor-crosshair!">
          <VideoPlayer.SeekSliderTrack className="relative h-1 w-full rounded-[9999999px] bg-white/20 group-data-[pressing]/seek:h-1.5 transition-[height] duration-150 ease-in-out">
            <VideoPlayer.SeekSliderBuffered
              className="absolute h-full rounded-[9999999px]
          bg-white/30"
            />
            <VideoPlayer.SeekSliderProgress className="absolute h-full rounded-[9999999px] bg-white" />
          </VideoPlayer.SeekSliderTrack>
          <VideoPlayer.SeekSliderPreviewThumb
            className={cn(
              'h-8 w-px bg-white/50 shadow-md relative',
              'hidden group-hover/seek:block',
              'group-data-[pressing]/seek:h-10',
              'group-data-[pressing]/seek:bg-white',
              'transition-[height,background-color] duration-150 ease-in-out',
            )}
          >
            <div
              className={cn(
                'absolute bottom-full mb-2 left-1/2 -translate-x-1/2',
                'flex items-center gap-1 text-[13px]',
                'group-data-[pressing]/seek:text-sm transition-[font-size] duration-150 ease-in-out',
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

        <VideoPlayer.FullscreenButton className={cn(buttonClassName, 'group')}>
          <FullscreenIcon />
        </VideoPlayer.FullscreenButton>
      </VideoPlayer.Controls>
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
