'use client'

import * as React from 'react'
import { useVideoPlayerContext } from '../context'
import type { RenderProp } from '../types'
import { MuteButtonDataAttributes } from './mute-button.data-attributes'

// ============================================================================
// MuteButton Props
// ============================================================================

export interface MuteButtonProps extends React.ComponentPropsWithRef<'button'> {
  render?: RenderProp<MuteButtonRenderProps, MuteButtonState>
}

export interface MuteButtonRenderProps {
  ref: React.Ref<any>
  type: 'button'
  'aria-label': string
  'aria-pressed': boolean
  [MuteButtonDataAttributes.muted]?: boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
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

    const renderProps: MuteButtonRenderProps = {
      ref: forwardedRef,
      type: 'button',
      'aria-label': context.muted ? 'Unmute' : 'Mute',
      'aria-pressed': context.muted,
      [MuteButtonDataAttributes.muted]: context.muted || undefined,
      onClick: handleClick,
    }

    if (render) {
      return render(renderProps, state)
    }

    return (
      <button
        {...renderProps}
        {...buttonProps}
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
