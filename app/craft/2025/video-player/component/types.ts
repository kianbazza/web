import type * as React from 'react'

// ============================================================================
// Video Quality
// ============================================================================

export interface VideoQuality {
  label: string
  width: number
  height: number
  bitrate?: number
}

// ============================================================================
// Text Track
// ============================================================================

export interface VideoTextTrack {
  kind: TextTrackKind
  label: string
  language: string
  src?: string
}

// ============================================================================
// Video Player State
// ============================================================================

export interface VideoPlayerState {
  // Playback
  playing: boolean
  paused: boolean
  ended: boolean
  waiting: boolean
  seeking: boolean

  // Time
  currentTime: number
  duration: number
  buffered: TimeRanges | null
  hoverTime: number | null
  hoverProgress: number | null

  // Audio
  volume: number
  muted: boolean

  // Display
  fullscreen: boolean
  pictureInPicture: boolean
  idle: boolean
  idleTimeout: number
  preventIdleWhenPaused: boolean

  // Captions
  textTracks: TextTrack[]
  activeTextTrack: TextTrack | null

  // Playback rate
  playbackRate: number

  // Quality (for HLS/DASH)
  qualities: VideoQuality[]
  activeQuality: VideoQuality | null

  // Video element ref
  videoRef: React.RefObject<HTMLVideoElement | null>
  rootRef: React.RefObject<HTMLDivElement | null>
}

// ============================================================================
// Video Player Actions
// ============================================================================

export interface VideoPlayerActions {
  play: () => Promise<void>
  pause: () => void
  toggle: () => Promise<void>
  seek: (time: number) => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  enterFullscreen: () => Promise<void>
  exitFullscreen: () => Promise<void>
  toggleFullscreen: () => Promise<void>
  enterPictureInPicture: () => Promise<void>
  exitPictureInPicture: () => Promise<void>
  togglePictureInPicture: () => Promise<void>
  setPlaybackRate: (rate: number) => void
  setTextTrack: (track: TextTrack | null) => void
  setQuality: (quality: VideoQuality) => void
  /** Reset idle state and restart idle timeout */
  resetIdle: () => void
  /** Set hover time for seek preview (null to clear) */
  setHoverTime: (time: number | null) => void
}

// ============================================================================
// Internal Video Event Handlers
// ============================================================================

export interface VideoPlayerInternalHandlers {
  onTimeUpdate: () => void
  onDurationChange: () => void
  onProgress: () => void
  onPlay: () => void
  onPause: () => void
  onEnded: () => void
  onWaiting: () => void
  onCanPlay: () => void
  onSeeking: () => void
  onSeeked: () => void
  onVolumeChange: () => void
  onLoadedMetadata: () => void
}

// ============================================================================
// Video Player Context
// ============================================================================

export interface VideoPlayerContextValue extends VideoPlayerState, VideoPlayerActions {
  _handlers: VideoPlayerInternalHandlers
}

// ============================================================================
// Root Props
// ============================================================================

// Omit conflicting native event handlers
type DivPropsWithoutConflicts = Omit<
  React.ComponentPropsWithRef<'div'>,
  'onVolumeChange' | 'onEnded' | 'onWaiting' | 'onSeeking' | 'onSeeked'
>

export interface VideoPlayerRootProps extends DivPropsWithoutConflicts {
  // Uncontrolled defaults
  defaultPlaying?: boolean
  defaultVolume?: number
  defaultMuted?: boolean
  defaultPlaybackRate?: number

  // Controlled
  playing?: boolean
  onPlayingChange?: (playing: boolean) => void
  volume?: number
  onVolumeChange?: (volume: number) => void
  muted?: boolean
  onMutedChange?: (muted: boolean) => void
  playbackRate?: number
  onPlaybackRateChange?: (rate: number) => void
  currentTime?: number
  onCurrentTimeChange?: (time: number) => void

  // Idle detection
  /**
   * Time in milliseconds before the player is considered idle.
   * Set to 0 to disable idle detection.
   * @default 3000
   */
  idleTimeout?: number
  /**
   * When true, prevents the player from going idle while paused.
   * @default false
   */
  preventIdleWhenPaused?: boolean
  idle?: boolean
  onIdleChange?: (idle: boolean) => void

  // Events
  onEnded?: () => void
  onWaiting?: () => void
  onSeeking?: () => void
  onSeeked?: () => void
  onFullscreenChange?: (fullscreen: boolean) => void
  onPictureInPictureChange?: (pip: boolean) => void
}

// ============================================================================
// Render Prop Pattern
// ============================================================================

export type RenderProp<State> = (state: State) => React.ReactElement
