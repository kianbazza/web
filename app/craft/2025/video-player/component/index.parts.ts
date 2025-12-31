// ============================================================================
// VideoPlayer Composable Parts
// ============================================================================
//
// Import like: import * as VideoPlayer from './video-player/index.parts'
//
// Usage:
// <VideoPlayer.Root>
//   <VideoPlayer.Video src="..." />
//   <VideoPlayer.Controls>
//     <VideoPlayer.PlayButton />
//     <VideoPlayer.SeekSlider />
//     <VideoPlayer.TimeDisplay />
//   </VideoPlayer.Controls>
// </VideoPlayer.Root>
//

export { BufferedIndicator } from './parts/buffered-indicator'
export { Captions } from './parts/captions'
export { CaptionsDataAttributes } from './parts/captions.data-attributes'
// Captions
export { CaptionsButton } from './parts/captions-button'
export { CaptionsMenu, CaptionsMenuItem } from './parts/captions-menu'
export { Controls } from './parts/controls'
export { ControlsDataAttributes } from './parts/controls.data-attributes'
// Display Controls
export { FullscreenButton } from './parts/fullscreen-button'
export { MuteButton } from './parts/mute-button'
export { Overlay } from './parts/overlay'
export { OverlayDataAttributes } from './parts/overlay.data-attributes'
export { PictureInPictureButton } from './parts/picture-in-picture-button'
// Playback Controls
export { PlayButton } from './parts/play-button'
// Playback Rate
export { PlaybackRateButton } from './parts/playback-rate-button'
export {
  PlaybackRateMenu,
  PlaybackRateMenuItem,
} from './parts/playback-rate-menu'
// Layout
export { Portal } from './parts/portal'
export { Poster } from './parts/poster'
// Quality
export { QualityMenu, QualityMenuItem } from './parts/quality-menu'
// Data Attributes & CSS Variables
export { RootDataAttributes } from './parts/root.data-attributes'
export {
  SeekSlider,
  SeekSliderBuffered,
  SeekSliderControl,
  SeekSliderHover,
  SeekSliderPreviewThumb,
  SeekSliderPreviewTooltip,
  SeekSliderPreviewTooltipPopup,
  SeekSliderPreviewTooltipPortal,
  SeekSliderPreviewTooltipPositioner,
  SeekSliderProgress,
  SeekSliderThumb,
  SeekSliderTrack,
} from './parts/seek-slider'
export { SeekSliderCssVars } from './parts/seek-slider.css-vars'
export { SeekSliderDataAttributes } from './parts/seek-slider.data-attributes'
export { SeekSliderPreviewThumbDataAttributes } from './parts/seek-slider-preview-thumb.data-attributes'
export { Thumbnail } from './parts/thumbnail'
export { ThumbnailDataAttributes } from './parts/thumbnail.data-attributes'
export { TimeDisplay } from './parts/time-display'
export { TimeDisplayDataAttributes } from './parts/time-display.data-attributes'
export { Track } from './parts/track'
export { Video } from './parts/video'
// Audio Controls
export {
  VolumeSlider,
  VolumeSliderControl,
  VolumeSliderRange,
  VolumeSliderThumb,
  VolumeSliderTrack,
} from './parts/volume-slider'
export { VolumeSliderCssVars } from './parts/volume-slider.css-vars'
export { VolumeSliderDataAttributes } from './parts/volume-slider.data-attributes'
// Types
export type {
  PlaybackIntent,
  PlaybackStatus,
  RenderProp,
  TrackInfo,
  VideoPlayerActions,
  VideoPlayerContextValue,
  VideoPlayerRootProps,
  VideoPlayerState,
  VideoQuality,
  VideoTextTrack,
} from './types'
export {
  type TransitionStatus,
  type UseTransitionStatusOptions,
  type UseTransitionStatusReturn,
  useTransitionStatus,
} from './use-transition-status'
// Hooks
export { useVideoPlayer } from './use-video-player'
// Core
export { VideoPlayerRoot as Root } from './video-player'
