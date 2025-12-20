'use client'

import { useVideoPlayerContext } from './context'
import type { VideoPlayerContextValue } from './types'

/**
 * Hook to access the VideoPlayer context from custom components.
 *
 * @example
 * ```tsx
 * function CustomControl() {
 *   const { playing, toggle, currentTime, duration } = useVideoPlayer()
 *
 *   return (
 *     <div>
 *       {playing ? 'Playing' : 'Paused'} - {currentTime}s / {duration}s
 *       <button onClick={toggle}>Toggle</button>
 *     </div>
 *   )
 * }
 * ```
 */
export function useVideoPlayer(): VideoPlayerContextValue {
  return useVideoPlayerContext('useVideoPlayer')
}
