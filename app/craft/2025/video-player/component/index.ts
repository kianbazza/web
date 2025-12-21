// ============================================================================
// VideoPlayer - Main Entry Point
// ============================================================================
//
// Usage:
// import { VideoPlayer, type VideoPlayerRootProps } from './component'
//
// <VideoPlayer.Root>
//   <VideoPlayer.Video src="..." />
//   <VideoPlayer.Controls>
//     <VideoPlayer.PlayButton />
//     <VideoPlayer.SeekSlider />
//   </VideoPlayer.Controls>
// </VideoPlayer.Root>
//

// Namespace export
export * as VideoPlayer from './index.parts'

// Hook (also available via VideoPlayer.useVideoPlayer)
export { useVideoPlayer } from './use-video-player'

// Types
export type {
  VideoPlayerContextValue,
  VideoPlayerState,
  VideoPlayerActions,
  VideoPlayerRootProps,
  VideoQuality,
  VideoTextTrack,
  RenderProp,
} from './types'

export type { VideoPlayerRootState } from './video-player'
