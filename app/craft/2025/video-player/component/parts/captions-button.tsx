'use client'

import * as React from 'react'
import { useVideoPlayerContext } from '../context'
import type { RenderProp } from '../types'

// ============================================================================
// CaptionsButton Props
// ============================================================================

export interface CaptionsButtonProps extends React.ComponentPropsWithRef<'button'> {
  render?: RenderProp<CaptionsButtonState>
}

export interface CaptionsButtonState {
  active: boolean
  available: boolean
  trackCount: number
}

// ============================================================================
// CaptionsButton Component
// ============================================================================

export const CaptionsButton = React.forwardRef<HTMLButtonElement, CaptionsButtonProps>(
  function CaptionsButton(props, forwardedRef) {
    const { render, onClick, ...buttonProps } = props
    const context = useVideoPlayerContext('CaptionsButton')

    const available = context.textTracks.length > 0
    const active = context.activeTextTrack !== null

    const state: CaptionsButtonState = {
      active,
      available,
      trackCount: context.textTracks.length,
    }

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          if (active) {
            // Turn off captions
            context.setTextTrack(null)
          } else if (context.textTracks.length > 0) {
            // Turn on first available track
            context.setTextTrack(context.textTracks[0])
          }
        }
      },
      [onClick, context, active]
    )

    // Data attributes
    const dataAttributes = {
      'data-active': active || undefined,
      'data-available': available || undefined,
    }

    if (render) {
      return render(state)
    }

    return (
      <button
        ref={forwardedRef}
        type="button"
        aria-label={active ? 'Disable captions' : 'Enable captions'}
        aria-pressed={active}
        disabled={!available}
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

export namespace CaptionsButton {
  export type Props = CaptionsButtonProps
  export type State = CaptionsButtonState
}
