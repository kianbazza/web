'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { useVideoPlayerContext } from '../context'
import type { RenderProp } from '../types'
import { VolumeSliderDataAttributes } from './volume-slider.data-attributes'
import { VolumeSliderCssVars } from './volume-slider.css-vars'

// ============================================================================
// VolumeSlider Props
// ============================================================================

export interface VolumeSliderProps
  extends Omit<
    React.ComponentPropsWithRef<typeof SliderPrimitive.Root>,
    'value' | 'onValueChange' | 'min' | 'max' | 'step'
  > {
  render?: RenderProp<VolumeSliderRenderProps, VolumeSliderState>
}

export interface VolumeSliderRenderProps {
  [VolumeSliderDataAttributes.muted]?: boolean
  [VolumeSliderDataAttributes.volume]: number
  style: React.CSSProperties
}

export interface VolumeSliderState {
  volume: number
  muted: boolean
  percentage: number
}

// ============================================================================
// VolumeSlider Component
// ============================================================================

export const VolumeSlider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  VolumeSliderProps
>(function VolumeSlider(props, forwardedRef) {
  const { render, children, ...sliderProps } = props
  const context = useVideoPlayerContext('VolumeSlider')

  const percentage = context.volume * 100

  const state: VolumeSliderState = {
    volume: context.volume,
    muted: context.muted,
    percentage,
  }

  const handleValueChange = React.useCallback(
    (value: number[]) => {
      context.setVolume(value[0])
      context.resetIdle() // Keep player active while adjusting volume
    },
    [context],
  )

  // Data attributes
  const dataAttributes = {
    [VolumeSliderDataAttributes.muted]: context.muted || undefined,
    [VolumeSliderDataAttributes.volume]: context.volume,
  }

  // CSS custom properties for styling
  const style = {
    [VolumeSliderCssVars.volume]: context.volume,
    [VolumeSliderCssVars.volumePercentage]: `${percentage}%`,
    ...sliderProps.style,
  } as React.CSSProperties

  const renderProps: VolumeSliderRenderProps = {
    [VolumeSliderDataAttributes.muted]: context.muted || undefined,
    [VolumeSliderDataAttributes.volume]: context.volume,
    style,
  }

  // Render prop takes full control
  if (render) {
    return render(renderProps, state)
  }

  // Composition pattern: if children provided, use them; otherwise use default structure
  return (
    <SliderPrimitive.Root
      ref={forwardedRef}
      min={0}
      max={1}
      step={0.01}
      value={[context.muted ? 0 : context.volume]}
      onValueChange={handleValueChange}
      aria-label="Volume"
      {...dataAttributes}
      {...sliderProps}
      style={style}
    >
      {children ?? (
        <>
          <SliderPrimitive.Track>
            <SliderPrimitive.Range />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb />
        </>
      )}
    </SliderPrimitive.Root>
  )
})

// ============================================================================
// Sub-components for custom composition
// ============================================================================

export const VolumeSliderTrack = SliderPrimitive.Track
export const VolumeSliderRange = SliderPrimitive.Range
export const VolumeSliderThumb = SliderPrimitive.Thumb

// ============================================================================
// Namespace
// ============================================================================

export namespace VolumeSlider {
  export type Props = VolumeSliderProps
  export type State = VolumeSliderState
}
