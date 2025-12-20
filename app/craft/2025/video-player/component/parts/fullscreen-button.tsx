'use client'

import * as React from 'react'
import { useVideoPlayerContext } from '../context'
import type { RenderProp } from '../types'

// ============================================================================
// FullscreenButton Props
// ============================================================================

export interface FullscreenButtonProps extends React.ComponentPropsWithRef<'button'> {
  render?: RenderProp<FullscreenButtonState>
}

export interface FullscreenButtonState {
  fullscreen: boolean
  supported: boolean
}

// ============================================================================
// FullscreenButton Component
// ============================================================================

export const FullscreenButton = React.forwardRef<HTMLButtonElement, FullscreenButtonProps>(
  function FullscreenButton(props, forwardedRef) {
    const { render, onClick, ...buttonProps } = props
    const context = useVideoPlayerContext('FullscreenButton')

    // Defer to after hydration to avoid mismatch
    const [supported, setSupported] = React.useState(false)
    React.useEffect(() => {
      setSupported('fullscreenEnabled' in document && document.fullscreenEnabled)
    }, [])

    const state: FullscreenButtonState = {
      fullscreen: context.fullscreen,
      supported,
    }

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          context.toggleFullscreen()
        }
      },
      [onClick, context]
    )

    // Data attributes
    const dataAttributes = {
      'data-fullscreen': context.fullscreen || undefined,
      'data-supported': supported || undefined,
    }

    if (render) {
      return render(state)
    }

    return (
      <button
        ref={forwardedRef}
        type="button"
        aria-label={context.fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        aria-pressed={context.fullscreen}
        disabled={!supported}
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

export namespace FullscreenButton {
  export type Props = FullscreenButtonProps
  export type State = FullscreenButtonState
}
