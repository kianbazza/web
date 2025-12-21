'use client'

import * as React from 'react'
import { VideoPlayerContext } from './context'
import type {
  VideoPlayerContextValue,
  VideoPlayerRootProps,
  VideoPlayerState,
  VideoQuality,
} from './types'
import { RootDataAttributes } from './parts/root.data-attributes'

// ============================================================================
// Hook: useControllableState
// ============================================================================

function useControllableState<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue

  const setValue = React.useCallback(
    (nextValue: T | ((prev: T) => T)) => {
      const newValue =
        typeof nextValue === 'function'
          ? (nextValue as (prev: T) => T)(value)
          : nextValue

      if (!isControlled) {
        setUncontrolledValue(newValue)
      }
      onChange?.(newValue)
    },
    [isControlled, value, onChange],
  )

  return [value, setValue]
}

// ============================================================================
// Root Props Interface
// ============================================================================

export interface VideoPlayerRootState {
  playing: boolean
  paused: boolean
  ended: boolean
  waiting: boolean
  seeking: boolean
  fullscreen: boolean
  pictureInPicture: boolean
  muted: boolean
  volume: number
  currentTime: number
  duration: number
  playbackRate: number
  idle: boolean
  idleTimeout: number
}

// ============================================================================
// Root Component
// ============================================================================

export const VideoPlayerRoot = React.forwardRef<
  HTMLDivElement,
  VideoPlayerRootProps
>(function VideoPlayerRoot(props, forwardedRef) {
  const {
    // Uncontrolled defaults
    defaultPlaying = false,
    defaultVolume = 1,
    defaultMuted = false,
    defaultPlaybackRate = 1,

    // Controlled values
    playing: controlledPlaying,
    onPlayingChange,
    volume: controlledVolume,
    onVolumeChange,
    muted: controlledMuted,
    onMutedChange,
    playbackRate: controlledPlaybackRate,
    onPlaybackRateChange,
    currentTime: controlledCurrentTime,
    onCurrentTimeChange,

    // Idle detection
    idleTimeout = 3000,
    preventIdleWhenPaused = false,
    idle: controlledIdle,
    onIdleChange,

    // Events
    onEnded,
    onWaiting,
    onSeeking,
    onSeeked,
    onFullscreenChange,
    onPictureInPictureChange,

    // Native events we need to intercept
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    onClick,

    // Rest
    children,
    ...rootProps
  } = props

  // Refs
  const rootRef = React.useRef<HTMLDivElement>(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const previousVolumeRef = React.useRef(1)
  const composedRef = useComposedRef(forwardedRef, rootRef)

  // Controllable state
  const [playing, setPlaying] = useControllableState(
    controlledPlaying,
    defaultPlaying,
    onPlayingChange,
  )
  const [volume, setVolume] = useControllableState(
    controlledVolume,
    defaultVolume,
    onVolumeChange,
  )
  const [muted, setMuted] = useControllableState(
    controlledMuted,
    defaultMuted,
    onMutedChange,
  )
  const [playbackRate, setPlaybackRateState] = useControllableState(
    controlledPlaybackRate,
    defaultPlaybackRate,
    onPlaybackRateChange,
  )
  const [idle, setIdle] = useControllableState(
    controlledIdle,
    true, // Start idle (controls hidden until interaction)
    onIdleChange,
  )

  // Idle timeout ref
  const idleTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const lastMousePosition = React.useRef<{ x: number; y: number } | null>(null)

  const clearIdleTimeout = React.useCallback(() => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current)
      idleTimeoutRef.current = null
    }
  }, [])

  const startIdleTimeout = React.useCallback(() => {
    if (idleTimeout === 0) return

    clearIdleTimeout()
    idleTimeoutRef.current = setTimeout(() => {
      setIdle(true)
    }, idleTimeout)
  }, [idleTimeout, clearIdleTimeout, setIdle])

  const resetIdle = React.useCallback(() => {
    setIdle(false)
    startIdleTimeout()
  }, [setIdle, startIdleTimeout])

  const handleMouseMove = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(event)
      // Track position and only reset idle if mouse actually moved
      const { clientX, clientY } = event
      const last = lastMousePosition.current
      if (last && last.x === clientX && last.y === clientY) {
        return
      }
      lastMousePosition.current = { x: clientX, y: clientY }
      resetIdle()
    },
    [onMouseMove, resetIdle],
  )

  const handleMouseEnter = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(event)
      // Only reset idle if mouse actually moved (prevents false triggers when controls disappear)
      const { clientX, clientY } = event
      const last = lastMousePosition.current
      if (last && last.x === clientX && last.y === clientY) {
        return
      }
      lastMousePosition.current = { x: clientX, y: clientY }
      resetIdle()
    },
    [onMouseEnter, resetIdle],
  )

  const handleMouseLeave = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(event)
      clearIdleTimeout()
      setIdle(true)
    },
    [onMouseLeave, clearIdleTimeout, setIdle],
  )

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(event)
      resetIdle()
    },
    [onClick, resetIdle],
  )

  // Start idle timeout on mount, cleanup on unmount
  React.useEffect(() => {
    if (idleTimeout > 0) {
      idleTimeoutRef.current = setTimeout(() => {
        setIdle(true)
      }, idleTimeout)
    }
    return () => {
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Reset idle when paused if preventIdleWhenPaused is enabled
  React.useEffect(() => {
    if (!playing && preventIdleWhenPaused) {
      resetIdle()
    }
  }, [playing, preventIdleWhenPaused, resetIdle])

  // Internal state (not controllable)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [buffered, setBuffered] = React.useState<TimeRanges | null>(null)
  const [hoverTime, setHoverTime] = React.useState<number | null>(null)
  const [ended, setEnded] = React.useState(false)
  const [waiting, setWaiting] = React.useState(false)
  const [seeking, setSeeking] = React.useState(false)
  const [fullscreen, setFullscreen] = React.useState(false)
  const [pictureInPicture, setPictureInPicture] = React.useState(false)
  const [textTracks, setTextTracks] = React.useState<TextTrack[]>([])
  const [activeTextTrack, setActiveTextTrack] =
    React.useState<TextTrack | null>(null)
  const [qualities, setQualities] = React.useState<VideoQuality[]>([])
  const [activeQuality, setActiveQuality] = React.useState<VideoQuality | null>(
    null,
  )

  // Sync controlled currentTime if provided
  React.useEffect(() => {
    if (controlledCurrentTime !== undefined && videoRef.current) {
      videoRef.current.currentTime = controlledCurrentTime
    }
  }, [controlledCurrentTime])

  // Fullscreen change listener
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = document.fullscreenElement === rootRef.current
      setFullscreen(isFullscreen)
      onFullscreenChange?.(isFullscreen)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [onFullscreenChange])

  // PiP change listener
  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePiPEnter = () => {
      setPictureInPicture(true)
      onPictureInPictureChange?.(true)
    }
    const handlePiPLeave = () => {
      setPictureInPicture(false)
      onPictureInPictureChange?.(false)
    }

    video.addEventListener('enterpictureinpicture', handlePiPEnter)
    video.addEventListener('leavepictureinpicture', handlePiPLeave)
    return () => {
      video.removeEventListener('enterpictureinpicture', handlePiPEnter)
      video.removeEventListener('leavepictureinpicture', handlePiPLeave)
    }
  }, [onPictureInPictureChange])

  // Actions
  const play = React.useCallback(async () => {
    if (videoRef.current) {
      await videoRef.current.play()
      setPlaying(true)
      setEnded(false)
    }
  }, [setPlaying])

  const pause = React.useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause()
      setPlaying(false)
    }
  }, [setPlaying])

  const toggle = React.useCallback(async () => {
    if (playing) {
      pause()
    } else {
      await play()
    }
  }, [playing, play, pause])

  const seek = React.useCallback(
    (time: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime = time
        setCurrentTime(time)
        onCurrentTimeChange?.(time)
      }
    },
    [onCurrentTimeChange],
  )

  const handleSetVolume = React.useCallback(
    (vol: number) => {
      const clampedVolume = Math.max(0, Math.min(1, vol))
      if (videoRef.current) {
        videoRef.current.volume = clampedVolume
      }
      setVolume(clampedVolume)
    },
    [setVolume],
  )

  const toggleMute = React.useCallback(() => {
    if (!muted) {
      // Muting - save current volume for restoration
      previousVolumeRef.current = volume
    } else {
      // Unmuting - restore previous volume
      if (videoRef.current) {
        videoRef.current.volume = previousVolumeRef.current
      }
      setVolume(previousVolumeRef.current)
    }
    // Toggle mute state
    if (videoRef.current) {
      videoRef.current.muted = !muted
    }
    setMuted(!muted)
  }, [muted, volume, setMuted, setVolume])

  const enterFullscreen = React.useCallback(async () => {
    if (rootRef.current?.requestFullscreen) {
      await rootRef.current.requestFullscreen()
    }
  }, [])

  const exitFullscreen = React.useCallback(async () => {
    if (document.exitFullscreen) {
      await document.exitFullscreen()
    }
  }, [])

  const toggleFullscreen = React.useCallback(async () => {
    if (fullscreen) {
      await exitFullscreen()
    } else {
      await enterFullscreen()
    }
  }, [fullscreen, enterFullscreen, exitFullscreen])

  const enterPictureInPicture = React.useCallback(async () => {
    if (videoRef.current?.requestPictureInPicture) {
      await videoRef.current.requestPictureInPicture()
    }
  }, [])

  const exitPictureInPicture = React.useCallback(async () => {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture()
    }
  }, [])

  const togglePictureInPicture = React.useCallback(async () => {
    if (pictureInPicture) {
      await exitPictureInPicture()
    } else {
      await enterPictureInPicture()
    }
  }, [pictureInPicture, enterPictureInPicture, exitPictureInPicture])

  const setPlaybackRate = React.useCallback(
    (rate: number) => {
      if (videoRef.current) {
        videoRef.current.playbackRate = rate
      }
      setPlaybackRateState(rate)
    },
    [setPlaybackRateState],
  )

  const setTextTrack = React.useCallback((track: TextTrack | null) => {
    // Disable all tracks first
    if (videoRef.current) {
      for (let i = 0; i < videoRef.current.textTracks.length; i++) {
        videoRef.current.textTracks[i].mode = 'disabled'
      }
      // Enable selected track
      if (track) {
        track.mode = 'showing'
      }
    }
    setActiveTextTrack(track)
  }, [])

  const setQuality = React.useCallback((quality: VideoQuality) => {
    // Quality switching requires HLS/DASH library integration
    // This is a placeholder for the action
    setActiveQuality(quality)
  }, [])

  // Video event handlers (to be called by Video component)
  const handleTimeUpdate = React.useCallback(() => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime
      setCurrentTime(time)
      onCurrentTimeChange?.(time)
    }
  }, [onCurrentTimeChange])

  const handleDurationChange = React.useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }, [])

  const handleProgress = React.useCallback(() => {
    if (videoRef.current) {
      setBuffered(videoRef.current.buffered)
    }
  }, [])

  const handlePlay = React.useCallback(() => {
    setPlaying(true)
    setEnded(false)
  }, [setPlaying])

  const handlePause = React.useCallback(() => {
    setPlaying(false)
  }, [setPlaying])

  const handleEnded = React.useCallback(() => {
    setEnded(true)
    setPlaying(false)
    onEnded?.()
  }, [setPlaying, onEnded])

  const handleWaiting = React.useCallback(() => {
    setWaiting(true)
    onWaiting?.()
  }, [onWaiting])

  const handleCanPlay = React.useCallback(() => {
    setWaiting(false)
  }, [])

  const handleSeeking = React.useCallback(() => {
    setSeeking(true)
    onSeeking?.()
  }, [onSeeking])

  const handleSeeked = React.useCallback(() => {
    setSeeking(false)
    onSeeked?.()
  }, [onSeeked])

  const handleVolumeChange = React.useCallback(() => {
    if (videoRef.current) {
      setVolume(videoRef.current.volume)
      setMuted(videoRef.current.muted)
    }
  }, [setVolume, setMuted])

  const handleLoadedMetadata = React.useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
      // Collect text tracks
      const tracks: TextTrack[] = []
      for (let i = 0; i < videoRef.current.textTracks.length; i++) {
        tracks.push(videoRef.current.textTracks[i])
      }
      setTextTracks(tracks)
    }
  }, [])

  // Context value
  const contextValue = React.useMemo<VideoPlayerContextValue>(
    () => ({
      // State
      playing,
      paused: !playing,
      ended,
      waiting,
      seeking,
      currentTime,
      duration,
      buffered,
      hoverTime,
      hoverProgress:
        hoverTime !== null && duration > 0
          ? (hoverTime / duration) * 100
          : null,
      volume,
      muted,
      fullscreen,
      pictureInPicture,
      idle,
      idleTimeout,
      preventIdleWhenPaused,
      textTracks,
      activeTextTrack,
      playbackRate,
      qualities,
      activeQuality,
      videoRef,
      rootRef,

      // Actions
      play,
      pause,
      toggle,
      seek,
      setVolume: handleSetVolume,
      toggleMute,
      enterFullscreen,
      exitFullscreen,
      toggleFullscreen,
      enterPictureInPicture,
      exitPictureInPicture,
      togglePictureInPicture,
      setPlaybackRate,
      setTextTrack,
      setQuality,
      resetIdle,
      setHoverTime,

      // Internal event handlers (for Video component)
      _handlers: {
        onTimeUpdate: handleTimeUpdate,
        onDurationChange: handleDurationChange,
        onProgress: handleProgress,
        onPlay: handlePlay,
        onPause: handlePause,
        onEnded: handleEnded,
        onWaiting: handleWaiting,
        onCanPlay: handleCanPlay,
        onSeeking: handleSeeking,
        onSeeked: handleSeeked,
        onVolumeChange: handleVolumeChange,
        onLoadedMetadata: handleLoadedMetadata,
      },
    }),
    [
      playing,
      ended,
      waiting,
      seeking,
      currentTime,
      duration,
      buffered,
      hoverTime,
      volume,
      muted,
      fullscreen,
      pictureInPicture,
      idle,
      idleTimeout,
      preventIdleWhenPaused,
      textTracks,
      activeTextTrack,
      playbackRate,
      qualities,
      activeQuality,
      play,
      pause,
      toggle,
      seek,
      handleSetVolume,
      toggleMute,
      enterFullscreen,
      exitFullscreen,
      toggleFullscreen,
      enterPictureInPicture,
      exitPictureInPicture,
      togglePictureInPicture,
      setPlaybackRate,
      setTextTrack,
      setQuality,
      resetIdle,
      setHoverTime,
      handleTimeUpdate,
      handleDurationChange,
      handleProgress,
      handlePlay,
      handlePause,
      handleEnded,
      handleWaiting,
      handleCanPlay,
      handleSeeking,
      handleSeeked,
      handleVolumeChange,
      handleLoadedMetadata,
    ],
  )

  // Data attributes for styling
  const dataAttributes = {
    [RootDataAttributes.playing]: playing || undefined,
    [RootDataAttributes.paused]: !playing || undefined,
    [RootDataAttributes.ended]: ended || undefined,
    [RootDataAttributes.waiting]: waiting || undefined,
    [RootDataAttributes.seeking]: seeking || undefined,
    [RootDataAttributes.fullscreen]: fullscreen || undefined,
    [RootDataAttributes.pip]: pictureInPicture || undefined,
    [RootDataAttributes.muted]: muted || undefined,
    [RootDataAttributes.idle]: idle,
  }

  return (
    <VideoPlayerContext.Provider value={contextValue}>
      <div
        ref={composedRef}
        {...dataAttributes}
        {...rootProps}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {children}
      </div>
    </VideoPlayerContext.Provider>
  )
})

// ============================================================================
// Namespace
// ============================================================================

export namespace VideoPlayerRoot {
  export type Props = VideoPlayerRootProps
  export type State = VideoPlayerRootState
}

// ============================================================================
// Utility: Compose Refs
// ============================================================================

function useComposedRef<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return React.useCallback(
    (node: T) => {
      for (const ref of refs) {
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref != null) {
          ;(ref as React.MutableRefObject<T>).current = node
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  )
}
