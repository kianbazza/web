'use client'

import * as React from 'react'
import { useVideoPlayerContext } from '../context'
import type { RenderProp } from '../types'

// ============================================================================
// Overlay Props
// ============================================================================

export interface OverlayProps extends React.ComponentPropsWithRef<'div'> {
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
}

// ============================================================================
// Overlay Component
// ============================================================================

export const Overlay = React.forwardRef<HTMLDivElement, OverlayProps>(
  function Overlay(props, forwardedRef) {
    const { render, onClick, ...divProps } = props
    const context = useVideoPlayerContext('Overlay')

    const state: OverlayState = {
      playing: context.playing,
      paused: context.paused,
      ended: context.ended,
      waiting: context.waiting,
      seeking: context.seeking,
      fullscreen: context.fullscreen,
      pictureInPicture: context.pictureInPicture,
    }

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          context.toggle()
        }
      },
      [onClick, context]
    )

    // Data attributes
    const dataAttributes = {
      'data-playing': context.playing || undefined,
      'data-paused': context.paused || undefined,
      'data-ended': context.ended || undefined,
      'data-waiting': context.waiting || undefined,
      'data-seeking': context.seeking || undefined,
      'data-fullscreen': context.fullscreen || undefined,
      'data-pip': context.pictureInPicture || undefined,
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
  }
)

// ============================================================================
// Namespace
// ============================================================================

export namespace Overlay {
  export type Props = OverlayProps
  export type State = OverlayState
}
