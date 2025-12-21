'use client'

import * as React from 'react'
import { useVideoPlayerContext } from '../context'
import type { RenderProp } from '../types'
import { ControlsDataAttributes } from './controls.data-attributes'

// ============================================================================
// Controls Props
// ============================================================================

export interface ControlsProps extends React.ComponentPropsWithRef<'div'> {
  /**
   * Delay before hiding after player becomes idle (ms).
   * Defaults to Root's idleTimeout. Set to 0 to disable auto-hide.
   */
  idleTimeout?: number

  render?: RenderProp<ControlsState>
}

export interface ControlsState {
  /** Whether the controls are currently visible */
  open: boolean
  idle: boolean
  playing: boolean
  paused: boolean
}

// ============================================================================
// Controls Component
// ============================================================================

export const Controls = React.forwardRef<HTMLDivElement, ControlsProps>(
  function Controls(props, forwardedRef) {
    const { idleTimeout: idleTimeoutProp, render, ...divProps } = props

    const context = useVideoPlayerContext('Controls')

    // Use component's idleTimeout if set, otherwise use context's
    const effectiveIdleTimeout = idleTimeoutProp ?? context.idleTimeout

    // Calculate visibility:
    // - Open when idleTimeout is 0 (disabled)
    // - Open when not idle
    const open = effectiveIdleTimeout === 0 || !context.idle

    const state: ControlsState = {
      open,
      idle: context.idle,
      playing: context.playing,
      paused: context.paused,
    }

    // Data attributes
    const dataAttributes = {
      [ControlsDataAttributes.open]: open || undefined,
      [ControlsDataAttributes.closed]: !open || undefined,
      [ControlsDataAttributes.idle]: context.idle || undefined,
      [ControlsDataAttributes.playing]: context.playing || undefined,
      [ControlsDataAttributes.paused]: context.paused || undefined,
    }

    if (render) {
      return render(state)
    }

    return <div ref={forwardedRef} {...dataAttributes} {...divProps} />
  },
)

// ============================================================================
// Namespace
// ============================================================================

export namespace Controls {
  export type Props = ControlsProps
  export type State = ControlsState
}
