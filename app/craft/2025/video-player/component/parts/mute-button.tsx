'use client'

import * as React from 'react'
import { useVideoPlayerContext } from '../context'
import type { RenderProp } from '../types'

// ============================================================================
// MuteButton Props
// ============================================================================

export interface MuteButtonProps extends React.ComponentPropsWithRef<'button'> {
  render?: RenderProp<MuteButtonState>
}

export interface MuteButtonState {
  muted: boolean
  volume: number
}

// ============================================================================
// MuteButton Component
// ============================================================================

export const MuteButton = React.forwardRef<HTMLButtonElement, MuteButtonProps>(
  function MuteButton(props, forwardedRef) {
    const { render, onClick, ...buttonProps } = props
    const context = useVideoPlayerContext('MuteButton')

    const state: MuteButtonState = {
      muted: context.muted,
      volume: context.volume,
    }

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          context.toggleMute()
        }
      },
      [onClick, context]
    )

    // Data attributes
    const dataAttributes = {
      'data-muted': context.muted || undefined,
    }

    if (render) {
      return render(state)
    }

    return (
      <button
        ref={forwardedRef}
        type="button"
        aria-label={context.muted ? 'Unmute' : 'Mute'}
        aria-pressed={context.muted}
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

export namespace MuteButton {
  export type Props = MuteButtonProps
  export type State = MuteButtonState
}
