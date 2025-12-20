'use client'

import * as React from 'react'
import { useVideoPlayerContext } from '../context'
import type { RenderProp } from '../types'

// ============================================================================
// Poster Props
// ============================================================================

export interface PosterProps extends Omit<React.ComponentPropsWithRef<'img'>, 'src'> {
  src: string
  render?: RenderProp<PosterState>
}

export interface PosterState {
  visible: boolean
  playing: boolean
  currentTime: number
}

// ============================================================================
// Poster Component
// ============================================================================

export const Poster = React.forwardRef<HTMLImageElement, PosterProps>(
  function Poster(props, forwardedRef) {
    const { src, render, ...imgProps } = props
    const context = useVideoPlayerContext('Poster')

    // Show poster when video hasn't started yet
    const visible = !context.playing && context.currentTime === 0

    const state: PosterState = {
      visible,
      playing: context.playing,
      currentTime: context.currentTime,
    }

    // Data attributes
    const dataAttributes = {
      'data-visible': visible || undefined,
    }

    if (!visible) {
      return null
    }

    if (render) {
      return render(state)
    }

    return (
      <img
        ref={forwardedRef}
        src={src}
        alt=""
        aria-hidden="true"
        {...dataAttributes}
        {...imgProps}
      />
    )
  }
)

// ============================================================================
// Namespace
// ============================================================================

export namespace Poster {
  export type Props = PosterProps
  export type State = PosterState
}
