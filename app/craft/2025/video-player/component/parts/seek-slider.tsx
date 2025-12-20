'use client'

import * as React from 'react'
import { useVideoPlayerContext } from '../context'
import type { RenderProp } from '../types'

// ============================================================================
// SeekSlider Props
// ============================================================================

export interface SeekSliderProps extends Omit<React.ComponentPropsWithRef<'input'>, 'type' | 'min' | 'max' | 'value' | 'onChange'> {
  render?: RenderProp<SeekSliderState>
}

export interface SeekSliderState {
  currentTime: number
  duration: number
  progress: number
  seeking: boolean
}

// ============================================================================
// SeekSlider Component
// ============================================================================

export const SeekSlider = React.forwardRef<HTMLInputElement, SeekSliderProps>(
  function SeekSlider(props, forwardedRef) {
    const { render, ...inputProps } = props
    const context = useVideoPlayerContext('SeekSlider')

    const progress = context.duration > 0
      ? (context.currentTime / context.duration) * 100
      : 0

    const state: SeekSliderState = {
      currentTime: context.currentTime,
      duration: context.duration,
      progress,
      seeking: context.seeking,
    }

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(event.target.value)
        context.seek(time)
      },
      [context]
    )

    // Data attributes
    const dataAttributes = {
      'data-seeking': context.seeking || undefined,
    }

    // CSS custom properties for styling
    const style = {
      '--seek-progress': `${progress}%`,
      '--seek-current-time': context.currentTime,
      '--seek-duration': context.duration,
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
        max={context.duration || 100}
        step="any"
        value={context.currentTime}
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={context.duration}
        aria-valuenow={context.currentTime}
        aria-valuetext={formatTime(context.currentTime)}
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

export namespace SeekSlider {
  export type Props = SeekSliderProps
  export type State = SeekSliderState
}

// ============================================================================
// Utility: Format Time
// ============================================================================

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || isNaN(seconds)) return '0:00'

  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
