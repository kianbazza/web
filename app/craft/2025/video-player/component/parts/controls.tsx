'use client'

import * as React from 'react'
import { useVideoPlayerContext } from '../context'
import type { RenderProp } from '../types'

// ============================================================================
// Controls Props
// ============================================================================

export interface ControlsProps extends React.ComponentPropsWithRef<'div'> {
  /**
   * Time in milliseconds before controls auto-hide after inactivity.
   * Set to 0 to disable auto-hide.
   * @default 3000
   */
  hideDelay?: number

  /**
   * Whether to show controls when video is paused.
   * @default true
   */
  showWhenPaused?: boolean

  render?: RenderProp<ControlsState>
}

export interface ControlsState {
  visible: boolean
  idle: boolean
  playing: boolean
  paused: boolean
}

// ============================================================================
// Controls Component
// ============================================================================

export const Controls = React.forwardRef<HTMLDivElement, ControlsProps>(
  function Controls(props, forwardedRef) {
    const {
      hideDelay = 3000,
      showWhenPaused = true,
      render,
      onMouseMove,
      onMouseLeave,
      onFocus,
      ...divProps
    } = props

    const context = useVideoPlayerContext('Controls')
    const [userActive, setUserActive] = React.useState(true)
    const [hasFocus, setHasFocus] = React.useState(false)
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

    const clearHideTimeout = React.useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }, [])

    const startHideTimeout = React.useCallback(() => {
      if (hideDelay === 0) return

      clearHideTimeout()
      timeoutRef.current = setTimeout(() => {
        setUserActive(false)
      }, hideDelay)
    }, [hideDelay, clearHideTimeout])

    const showControls = React.useCallback(() => {
      setUserActive(true)
      startHideTimeout()
    }, [startHideTimeout])

    // Auto-hide logic
    React.useEffect(() => {
      if (context.paused && showWhenPaused) {
        setUserActive(true)
        clearHideTimeout()
      } else if (context.playing) {
        startHideTimeout()
      }
    }, [context.playing, context.paused, showWhenPaused, startHideTimeout, clearHideTimeout])

    // Cleanup
    React.useEffect(() => {
      return () => {
        clearHideTimeout()
      }
    }, [clearHideTimeout])

    const handleMouseMove = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        onMouseMove?.(event)
        showControls()
      },
      [onMouseMove, showControls]
    )

    const handleMouseLeave = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        onMouseLeave?.(event)
        if (context.playing && !hasFocus) {
          startHideTimeout()
        }
      },
      [onMouseLeave, context.playing, hasFocus, startHideTimeout]
    )

    const handleFocus = React.useCallback(
      (event: React.FocusEvent<HTMLDivElement>) => {
        onFocus?.(event)
        setHasFocus(true)
        showControls()
      },
      [onFocus, showControls]
    )

    const handleBlur = React.useCallback(() => {
      setHasFocus(false)
      if (context.playing) {
        startHideTimeout()
      }
    }, [context.playing, startHideTimeout])

    // Calculate visibility
    const visible = userActive || (context.paused && showWhenPaused) || hasFocus
    const idle = !visible

    const state: ControlsState = {
      visible,
      idle,
      playing: context.playing,
      paused: context.paused,
    }

    // Data attributes
    const dataAttributes = {
      'data-visible': visible || undefined,
      'data-idle': idle || undefined,
      'data-playing': context.playing || undefined,
      'data-paused': context.paused || undefined,
    }

    if (render) {
      return render(state)
    }

    return (
      <div
        ref={forwardedRef}
        {...dataAttributes}
        {...divProps}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    )
  }
)

// ============================================================================
// Namespace
// ============================================================================

export namespace Controls {
  export type Props = ControlsProps
  export type State = ControlsState
}
