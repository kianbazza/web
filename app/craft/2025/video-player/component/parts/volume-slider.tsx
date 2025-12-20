'use client'

import * as React from 'react'
import { useVideoPlayerContext } from '../context'
import type { RenderProp } from '../types'

// ============================================================================
// VolumeSlider Props
// ============================================================================

export interface VolumeSliderProps extends Omit<React.ComponentPropsWithRef<'input'>, 'type' | 'min' | 'max' | 'value' | 'onChange'> {
  render?: RenderProp<VolumeSliderState>
}

export interface VolumeSliderState {
  volume: number
  muted: boolean
  percentage: number
}

// ============================================================================
// VolumeSlider Component
// ============================================================================

export const VolumeSlider = React.forwardRef<HTMLInputElement, VolumeSliderProps>(
  function VolumeSlider(props, forwardedRef) {
    const { render, ...inputProps } = props
    const context = useVideoPlayerContext('VolumeSlider')

    const percentage = context.volume * 100

    const state: VolumeSliderState = {
      volume: context.volume,
      muted: context.muted,
      percentage,
    }

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const volume = parseFloat(event.target.value)
        context.setVolume(volume)
      },
      [context]
    )

    // Data attributes
    const dataAttributes = {
      'data-muted': context.muted || undefined,
      'data-volume': context.volume,
    }

    // CSS custom properties for styling
    const style = {
      '--volume': context.volume,
      '--volume-percentage': `${percentage}%`,
      ...inputProps.style,
    } as React.CSSProperties

    if (render) {
      return render(state)
    }

    return (
      <input
        ref={forwardedRef}
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={context.muted ? 0 : context.volume}
        aria-label="Volume"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percentage)}
        aria-valuetext={`${Math.round(percentage)}%`}
        {...dataAttributes}
        {...inputProps}
        style={style}
        onChange={handleChange}
      />
    )
  }
)

// ============================================================================
// Namespace
// ============================================================================

export namespace VolumeSlider {
  export type Props = VolumeSliderProps
  export type State = VolumeSliderState
}
