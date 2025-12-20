'use client'

import * as React from 'react'
import { useVideoPlayerContext } from '../context'
import type { RenderProp } from '../types'

// ============================================================================
// PlayButton Props
// ============================================================================

export interface PlayButtonProps extends React.ComponentPropsWithRef<'button'> {
  render?: RenderProp<PlayButtonState>
}

export interface PlayButtonState {
  playing: boolean
  paused: boolean
  ended: boolean
}

// ============================================================================
// PlayButton Component
// ============================================================================

export const PlayButton = React.forwardRef<HTMLButtonElement, PlayButtonProps>(
  function PlayButton(props, forwardedRef) {
    const { render, onClick, ...buttonProps } = props
    const context = useVideoPlayerContext('PlayButton')

    const state: PlayButtonState = {
      playing: context.playing,
      paused: context.paused,
      ended: context.ended,
    }

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
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
    }

    if (render) {
      return render(state)
    }

    return (
      <button
        ref={forwardedRef}
        type="button"
        aria-label={context.playing ? 'Pause' : 'Play'}
        {...dataAttributes}
        {...buttonProps}
        onClick={handleClick}
      />
    )
  }
)

// ============================================================================
// Namespace
// ============================================================================

export namespace PlayButton {
  export type Props = PlayButtonProps
  export type State = PlayButtonState
}
