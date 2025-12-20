'use client'

import * as React from 'react'
import { useVideoPlayerContext } from '../context'
import type { RenderProp } from '../types'

// ============================================================================
// PictureInPictureButton Props
// ============================================================================

export interface PictureInPictureButtonProps extends React.ComponentPropsWithRef<'button'> {
  render?: RenderProp<PictureInPictureButtonState>
}

export interface PictureInPictureButtonState {
  pictureInPicture: boolean
  supported: boolean
}

// ============================================================================
// PictureInPictureButton Component
// ============================================================================

export const PictureInPictureButton = React.forwardRef<HTMLButtonElement, PictureInPictureButtonProps>(
  function PictureInPictureButton(props, forwardedRef) {
    const { render, onClick, ...buttonProps } = props
    const context = useVideoPlayerContext('PictureInPictureButton')

    // Defer to after hydration to avoid mismatch
    const [supported, setSupported] = React.useState(false)
    React.useEffect(() => {
      setSupported('pictureInPictureEnabled' in document && document.pictureInPictureEnabled)
    }, [])

    const state: PictureInPictureButtonState = {
      pictureInPicture: context.pictureInPicture,
      supported,
    }

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          context.togglePictureInPicture()
        }
      },
      [onClick, context]
    )

    // Data attributes
    const dataAttributes = {
      'data-pip': context.pictureInPicture || undefined,
      'data-supported': supported || undefined,
    }

    if (render) {
      return render(state)
    }

    return (
      <button
        ref={forwardedRef}
        type="button"
        aria-label={context.pictureInPicture ? 'Exit picture-in-picture' : 'Enter picture-in-picture'}
        aria-pressed={context.pictureInPicture}
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

export namespace PictureInPictureButton {
  export type Props = PictureInPictureButtonProps
  export type State = PictureInPictureButtonState
}
