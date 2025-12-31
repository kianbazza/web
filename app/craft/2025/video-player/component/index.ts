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
// Types
export type {
  PlaybackIntent,
  PlaybackStatus,
  RenderProp,
  VideoPlayerActions,
  VideoPlayerContextValue,
  VideoPlayerExternalActions,
  VideoPlayerRootProps,
  VideoPlayerState,
  VideoQuality,
  VideoTextTrack,
} from './types'
// Hook (also available via VideoPlayer.useVideoPlayer)
export { useVideoPlayer } from './use-video-player'

export type { VideoPlayerRootState } from './video-player'
