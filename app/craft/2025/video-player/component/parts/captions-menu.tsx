'use client'

import * as React from 'react'
import { useVideoPlayerContext } from '../context'
import type { RenderProp } from '../types'

// ============================================================================
// CaptionsMenu Props
// ============================================================================

export interface CaptionsMenuProps extends React.ComponentPropsWithRef<'div'> {
  render?: RenderProp<CaptionsMenuState>
}

export interface CaptionsMenuState {
  textTracks: TextTrack[]
  activeTextTrack: TextTrack | null
}

// ============================================================================
// CaptionsMenu Component
// ============================================================================

export const CaptionsMenu = React.forwardRef<HTMLDivElement, CaptionsMenuProps>(
  function CaptionsMenu(props, forwardedRef) {
    const { render, children, ...divProps } = props
    const context = useVideoPlayerContext('CaptionsMenu')

    const state: CaptionsMenuState = {
      textTracks: context.textTracks,
      activeTextTrack: context.activeTextTrack,
    }

    // Data attributes
    const dataAttributes = {
      'data-active': context.activeTextTrack !== null || undefined,
    }

    if (render) {
      return render(state)
    }

    // Default render: list of track options with "Off" option
    return (
      <div
        ref={forwardedRef}
        role="menu"
        aria-label="Captions"
        {...dataAttributes}
        {...divProps}
      >
        {children ?? (
          <>
            <CaptionsMenuItem track={null}>Off</CaptionsMenuItem>
            {context.textTracks.map((track, index) => (
              <CaptionsMenuItem key={track.label || index} track={track}>
                {track.label || `Track ${index + 1}`}
              </CaptionsMenuItem>
            ))}
          </>
        )}
      </div>
    )
  }
)

// ============================================================================
// CaptionsMenuItem
// ============================================================================

export interface CaptionsMenuItemProps extends React.ComponentPropsWithRef<'button'> {
  track: TextTrack | null
}

export const CaptionsMenuItem = React.forwardRef<HTMLButtonElement, CaptionsMenuItemProps>(
  function CaptionsMenuItem(props, forwardedRef) {
    const { track, onClick, children, ...buttonProps } = props
    const context = useVideoPlayerContext('CaptionsMenuItem')

    const isActive = context.activeTextTrack === track

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          context.setTextTrack(track)
        }
      },
      [onClick, context, track]
    )

    return (
      <button
        ref={forwardedRef}
        type="button"
        role="menuitemradio"
        aria-checked={isActive}
        data-active={isActive || undefined}
        {...buttonProps}
        onClick={handleClick}
      >
        {children}
      </button>
    )
  }
)

// ============================================================================
// Namespace
// ============================================================================

export namespace CaptionsMenu {
  export type Props = CaptionsMenuProps
  export type State = CaptionsMenuState
  export type ItemProps = CaptionsMenuItemProps
}
