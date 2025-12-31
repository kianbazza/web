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

// Core
export { VideoPlayerRoot as Root } from './video-player'
export { Video } from './parts/video'
export { Track } from './parts/track'
export { Poster } from './parts/poster'
export { Overlay } from './parts/overlay'
export { Thumbnail } from './parts/thumbnail'

// Playback Controls
export { PlayButton } from './parts/play-button'
export {
  SeekSlider,
  SeekSliderControl,
  SeekSliderTrack,
  SeekSliderProgress,
  SeekSliderBuffered,
  SeekSliderHover,
  SeekSliderThumb,
  SeekSliderPreviewThumb,
  SeekSliderPreviewTooltip,
  SeekSliderPreviewTooltipPortal,
  SeekSliderPreviewTooltipPositioner,
  SeekSliderPreviewTooltipPopup,
} from './parts/seek-slider'
export { TimeDisplay } from './parts/time-display'
export { BufferedIndicator } from './parts/buffered-indicator'

// Audio Controls
export {
  VolumeSlider,
  VolumeSliderControl,
  VolumeSliderTrack,
  VolumeSliderRange,
  VolumeSliderThumb,
} from './parts/volume-slider'
export { MuteButton } from './parts/mute-button'

// Display Controls
export { FullscreenButton } from './parts/fullscreen-button'
export { PictureInPictureButton } from './parts/picture-in-picture-button'
export { Controls } from './parts/controls'

// Playback Rate
export { PlaybackRateButton } from './parts/playback-rate-button'
export { PlaybackRateMenu, PlaybackRateMenuItem } from './parts/playback-rate-menu'

// Captions
export { CaptionsButton } from './parts/captions-button'
export { CaptionsMenu, CaptionsMenuItem } from './parts/captions-menu'
export { Captions } from './parts/captions'

// Quality
export { QualityMenu, QualityMenuItem } from './parts/quality-menu'

// Layout
export { Portal } from './parts/portal'

// Hooks
export { useVideoPlayer } from './use-video-player'
export {
  useTransitionStatus,
  type TransitionStatus,
  type UseTransitionStatusOptions,
  type UseTransitionStatusReturn,
} from './use-transition-status'

// Types
export type {
  VideoPlayerContextValue,
  VideoPlayerState,
  VideoPlayerActions,
  VideoPlayerRootProps,
  VideoQuality,
  VideoTextTrack,
  TrackInfo,
  RenderProp,
} from './types'

// Data Attributes & CSS Variables
export { RootDataAttributes } from './parts/root.data-attributes'
export { SeekSliderDataAttributes } from './parts/seek-slider.data-attributes'
export { SeekSliderCssVars } from './parts/seek-slider.css-vars'
export { VolumeSliderDataAttributes } from './parts/volume-slider.data-attributes'
export { VolumeSliderCssVars } from './parts/volume-slider.css-vars'
export { ControlsDataAttributes } from './parts/controls.data-attributes'
export { OverlayDataAttributes } from './parts/overlay.data-attributes'
export { TimeDisplayDataAttributes } from './parts/time-display.data-attributes'
export { SeekSliderPreviewThumbDataAttributes } from './parts/seek-slider-preview-thumb.data-attributes'
export { ThumbnailDataAttributes } from './parts/thumbnail.data-attributes'
export { CaptionsDataAttributes } from './parts/captions.data-attributes'
