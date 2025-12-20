'use client'

import * as React from 'react'
import { useVideoPlayerContext } from '../context'
import type { RenderProp } from '../types'

// ============================================================================
// TimeDisplay Props
// ============================================================================

export type TimeDisplayFormat = 'current' | 'duration' | 'remaining' | 'current / duration' | 'current / remaining'

export interface TimeDisplayProps extends React.ComponentPropsWithRef<'span'> {
  format?: TimeDisplayFormat
  render?: RenderProp<TimeDisplayState>
}

export interface TimeDisplayState {
  currentTime: number
  duration: number
  remaining: number
  formattedCurrent: string
  formattedDuration: string
  formattedRemaining: string
}

// ============================================================================
// TimeDisplay Component
// ============================================================================

export const TimeDisplay = React.forwardRef<HTMLSpanElement, TimeDisplayProps>(
  function TimeDisplay(props, forwardedRef) {
    const { format = 'current / duration', render, ...spanProps } = props
    const context = useVideoPlayerContext('TimeDisplay')

    const remaining = context.duration - context.currentTime
    const formattedCurrent = formatTime(context.currentTime)
    const formattedDuration = formatTime(context.duration)
    const formattedRemaining = formatTime(remaining)

    const state: TimeDisplayState = {
      currentTime: context.currentTime,
      duration: context.duration,
      remaining,
      formattedCurrent,
      formattedDuration,
      formattedRemaining,
    }

    const getDisplayText = (): string => {
      switch (format) {
        case 'current':
          return formattedCurrent
        case 'duration':
          return formattedDuration
        case 'remaining':
          return `-${formattedRemaining}`
        case 'current / duration':
          return `${formattedCurrent} / ${formattedDuration}`
        case 'current / remaining':
          return `${formattedCurrent} / -${formattedRemaining}`
        default:
          return `${formattedCurrent} / ${formattedDuration}`
      }
    }

    if (render) {
      return render(state)
    }

    return (
      <span
        ref={forwardedRef}
        {...spanProps}
      >
        {getDisplayText()}
      </span>
    )
  }
)

// ============================================================================
// Namespace
// ============================================================================

export namespace TimeDisplay {
  export type Props = TimeDisplayProps
  export type State = TimeDisplayState
  export type Format = TimeDisplayFormat
}

// ============================================================================
// Utility: Format Time
// ============================================================================

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || isNaN(seconds)) return '0:00'

  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return `${mins}:${secs.toString().padStart(2, '0')}`
}
