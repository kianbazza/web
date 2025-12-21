'use client'

import * as React from 'react'
import { useVideoPlayerContext } from '../context'
import type { RenderProp } from '../types'
import { OverlayDataAttributes } from './overlay.data-attributes'

// ============================================================================
// Overlay Props
// ============================================================================

export interface OverlayProps extends React.ComponentPropsWithRef<'div'> {
  /**
   * Delay before hiding after player becomes idle (ms).
   * Defaults to Root's idleTimeout. Set to 0 to disable auto-hide.
   */
  idleTimeout?: number
  render?: RenderProp<OverlayState>
}

export interface OverlayState {
  playing: boolean
  paused: boolean
  ended: boolean
  waiting: boolean
  seeking: boolean
  fullscreen: boolean
  pictureInPicture: boolean
  /** Whether the overlay is currently visible (opposite of idle) */
  open: boolean
}

// ============================================================================
// Overlay Component
// ============================================================================

export const Overlay = React.forwardRef<HTMLDivElement, OverlayProps>(
  function Overlay(props, forwardedRef) {
    const { idleTimeout: idleTimeoutProp, render, onClick, ...divProps } = props
    const context = useVideoPlayerContext('Overlay')

    // Use component's idleTimeout if set, otherwise use context's
    const effectiveIdleTimeout = idleTimeoutProp ?? context.idleTimeout

    // Determine visibility: open when not idle, or when idleTimeout is 0 (disabled)
    const open = effectiveIdleTimeout === 0 || !context.idle

    const state: OverlayState = {
      playing: context.playing,
      paused: context.paused,
      ended: context.ended,
      waiting: context.waiting,
      seeking: context.seeking,
      fullscreen: context.fullscreen,
      pictureInPicture: context.pictureInPicture,
      open,
    }

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          context.toggle()
        }
      },
      [onClick, context],
    )

    // Data attributes
    const dataAttributes = {
      [OverlayDataAttributes.playing]: context.playing || undefined,
      [OverlayDataAttributes.paused]: context.paused || undefined,
      [OverlayDataAttributes.ended]: context.ended || undefined,
      [OverlayDataAttributes.waiting]: context.waiting || undefined,
      [OverlayDataAttributes.seeking]: context.seeking || undefined,
      [OverlayDataAttributes.fullscreen]: context.fullscreen || undefined,
      [OverlayDataAttributes.pip]: context.pictureInPicture || undefined,
      [OverlayDataAttributes.open]: open || undefined,
      [OverlayDataAttributes.closed]: !open || undefined,
    }

    if (render) {
      return render(state)
    }

    return (
      <div
        ref={forwardedRef}
        {...dataAttributes}
        {...divProps}
        onClick={handleClick}
      />
    )
  },
)

// ============================================================================
// Namespace
// ============================================================================

export namespace Overlay {
  export type Props = OverlayProps
  export type State = OverlayState
}
