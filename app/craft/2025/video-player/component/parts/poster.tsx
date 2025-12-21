'use client'

import * as React from 'react'
import { useVideoPlayerContext } from '../context'
import { useTransitionStatus } from '../use-transition-status'
import type { RenderProp } from '../types'
import { PosterDataAttributes } from './poster.data-attributes'

// ============================================================================
// Poster Props
// ============================================================================

export interface PosterProps
  extends Omit<React.ComponentPropsWithRef<'div'>, 'children'> {
  /**
   * Keep the element always mounted in the DOM, even when loaded.
   * Only needed for JavaScript animation libraries (e.g., Framer Motion).
   * CSS transitions and animations work automatically without this.
   * @default false
   */
  keepMounted?: boolean
  render?: RenderProp<PosterRenderProps, PosterState>
  children?: React.ReactNode
}

export interface PosterRenderProps {
  ref: React.Ref<HTMLDivElement>
  'aria-hidden': true
  [PosterDataAttributes.loading]?: boolean
  [PosterDataAttributes.loaded]?: boolean
  [PosterDataAttributes.startingStyle]?: boolean
  [PosterDataAttributes.endingStyle]?: boolean
}

export interface PosterState {
  loading: boolean
  loaded: boolean
  transitionStatus: 'starting' | 'ending' | undefined
}

// ============================================================================
// Poster Component
// ============================================================================

export const Poster = React.forwardRef<HTMLDivElement, PosterProps>(
  function Poster(props, forwardedRef) {
    const { keepMounted = false, render, children, ...divProps } = props
    const context = useVideoPlayerContext('Poster')

    // Show poster while video is loading (before canPlay)
    const loading = !context.canPlay
    const loaded = context.canPlay

    // Use transition status for enter/exit animations
    const { mounted, transitionStatus, elementRef } = useTransitionStatus({
      open: loading,
      keepMounted,
    })

    // Compose refs
    const composedRef = useComposedRef(forwardedRef, elementRef)

    const state: PosterState = {
      loading,
      loaded,
      transitionStatus,
    }

    const renderProps: PosterRenderProps = {
      ref: composedRef,
      'aria-hidden': true,
      [PosterDataAttributes.loading]: loading || undefined,
      [PosterDataAttributes.loaded]: loaded || undefined,
      [PosterDataAttributes.startingStyle]: transitionStatus === 'starting' || undefined,
      [PosterDataAttributes.endingStyle]: transitionStatus === 'ending' || undefined,
    }

    if (!mounted) {
      return null
    }

    if (render) {
      return render(renderProps, state)
    }

    return (
      <div {...renderProps} {...divProps}>
        {children}
      </div>
    )
  },
)

// ============================================================================
// Namespace
// ============================================================================

export namespace Poster {
  export type Props = PosterProps
  export type State = PosterState
  export type RenderProps = PosterRenderProps
}

// ============================================================================
// Utility: Compose Refs
// ============================================================================

function useComposedRef<T>(
  ...refs: (React.Ref<T> | React.RefObject<T | null> | undefined)[]
): React.RefCallback<T> {
  return React.useCallback(
    (node: T) => {
      for (const ref of refs) {
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref != null) {
          ;(ref as React.MutableRefObject<T>).current = node
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  )
}
