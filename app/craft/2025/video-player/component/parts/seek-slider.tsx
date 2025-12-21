'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { useVideoPlayerContext } from '../context'
import type { RenderProp } from '../types'
import { SeekSliderDataAttributes } from './seek-slider.data-attributes'
import { SeekSliderCssVars } from './seek-slider.css-vars'

// ============================================================================
// SeekSlider Props
// ============================================================================

export interface SeekSliderProps
  extends Omit<
    React.ComponentPropsWithRef<typeof SliderPrimitive.Root>,
    'value' | 'onValueChange' | 'min' | 'max'
  > {
  render?: RenderProp<SeekSliderState>
}

export interface SeekSliderState {
  currentTime: number
  duration: number
  progress: number
  seeking: boolean
  /** Pointer is currently down on the slider */
  pressing: boolean
  /** Pointer is down AND value has changed (user is actively dragging) */
  dragging: boolean
  hoverTime: number | null
  hoverProgress: number | null
}

// ============================================================================
// SeekSlider Component
// ============================================================================

export const SeekSlider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  SeekSliderProps
>(function SeekSlider(props, forwardedRef) {
  const {
    render,
    children,
    onPointerMove,
    onPointerLeave,
    onPointerDown,
    onValueCommit,
    ...sliderProps
  } = props
  const context = useVideoPlayerContext('SeekSlider')
  const sliderRef = React.useRef<HTMLSpanElement>(null)
  const [pressing, setPressing] = React.useState(false)
  const [dragging, setDragging] = React.useState(false)
  // Ref to track pressing synchronously (state updates are async)
  const pressingRef = React.useRef(false)

  // Global pointerup listener to reliably reset pressing state
  // (onValueCommit doesn't fire if value doesn't change)
  React.useEffect(() => {
    if (!pressing) return

    const handleGlobalPointerUp = () => {
      setPressing(false)
      setDragging(false)
      pressingRef.current = false
    }

    window.addEventListener('pointerup', handleGlobalPointerUp)
    return () => window.removeEventListener('pointerup', handleGlobalPointerUp)
  }, [pressing])

  const progress =
    context.duration > 0 ? (context.currentTime / context.duration) * 100 : 0

  const state: SeekSliderState = {
    currentTime: context.currentTime,
    duration: context.duration,
    progress,
    seeking: context.seeking,
    pressing,
    dragging,
    hoverTime: context.hoverTime,
    hoverProgress: context.hoverProgress,
  }

  const handleValueChange = React.useCallback(
    (value: number[]) => {
      context.seek(value[0])
      context.resetIdle() // Keep player active while seeking
      // If pressing and value changes, we're now dragging
      if (pressingRef.current) {
        setDragging(true)
      }
    },
    [context],
  )

  // Handle hover to show preview thumb position
  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onPointerMove?.(event as any)
      if (!sliderRef.current || context.duration === 0) return

      const rect = sliderRef.current.getBoundingClientRect()
      const x = event.clientX - rect.left
      const percentage = Math.max(0, Math.min(1, x / rect.width))
      const time = percentage * context.duration

      context.setHoverTime(time)
    },
    [onPointerMove, context],
  )

  const handlePointerLeave = React.useCallback(
    (event: React.PointerEvent) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onPointerLeave?.(event as any)
      context.setHoverTime(null)
    },
    [onPointerLeave, context],
  )

  // Track pressing state (pointer down)
  const handlePointerDown = React.useCallback(
    (event: React.PointerEvent) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onPointerDown?.(event as any)
      setPressing(true)
      pressingRef.current = true
    },
    [onPointerDown],
  )

  const handleValueCommit = React.useCallback(
    (value: number[]) => {
      onValueCommit?.(value)
      setPressing(false)
      setDragging(false)
      pressingRef.current = false
    },
    [onValueCommit],
  )

  // Calculate buffered percentage
  const bufferedEnd = React.useMemo(() => {
    if (!context.buffered || context.buffered.length === 0) return 0
    for (let i = 0; i < context.buffered.length; i++) {
      if (
        context.buffered.start(i) <= context.currentTime &&
        context.currentTime <= context.buffered.end(i)
      ) {
        return context.buffered.end(i)
      }
    }
    return context.buffered.end(0)
  }, [context.buffered, context.currentTime])

  const bufferedPercentage =
    context.duration > 0 ? (bufferedEnd / context.duration) * 100 : 0

  // Data attributes
  const dataAttributes = {
    [SeekSliderDataAttributes.seeking]: context.seeking || undefined,
    [SeekSliderDataAttributes.hovering]: context.hoverTime !== null || undefined,
    [SeekSliderDataAttributes.pressing]: pressing || undefined,
    [SeekSliderDataAttributes.dragging]: dragging || undefined,
  }

  // CSS custom properties for styling
  const style = {
    position: 'relative',
    [SeekSliderCssVars.progress]: `${progress}%`,
    [SeekSliderCssVars.buffered]: `${bufferedPercentage}%`,
    [SeekSliderCssVars.currentTime]: context.currentTime,
    [SeekSliderCssVars.duration]: context.duration,
    [SeekSliderCssVars.hoverProgress]:
      context.hoverProgress !== null ? `${context.hoverProgress}%` : undefined,
    [SeekSliderCssVars.hoverTime]: context.hoverTime ?? undefined,
    ...sliderProps.style,
  } as React.CSSProperties

  // Compose refs
  const composedRef = React.useCallback(
    (node: HTMLSpanElement | null) => {
      ;(sliderRef as React.MutableRefObject<HTMLSpanElement | null>).current =
        node
      if (typeof forwardedRef === 'function') {
        forwardedRef(node)
      } else if (forwardedRef) {
        forwardedRef.current = node
      }
    },
    [forwardedRef],
  )

  // Render prop takes full control
  if (render) {
    return render(state)
  }

  // Composition pattern: if children provided, use them; otherwise use default structure
  return (
    <SliderPrimitive.Root
      ref={composedRef}
      min={0}
      max={context.duration || 100}
      step={0.1}
      value={[context.currentTime]}
      onValueChange={handleValueChange}
      onValueCommit={handleValueCommit}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      aria-label="Seek"
      {...dataAttributes}
      {...sliderProps}
      style={style}
    >
      {children ?? (
        <>
          <SliderPrimitive.Track style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${bufferedPercentage}%`,
              }}
            />
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

export const SeekSliderTrack = SliderPrimitive.Track
export const SeekSliderProgress = SliderPrimitive.Range
export const SeekSliderThumb = SliderPrimitive.Thumb

// Buffered indicator - shows loaded/buffered portion of video
export interface SeekSliderBufferedProps
  extends React.ComponentPropsWithRef<'div'> {}

export const SeekSliderBuffered = React.forwardRef<
  HTMLDivElement,
  SeekSliderBufferedProps
>(function SeekSliderBuffered(props, forwardedRef) {
  const context = useVideoPlayerContext('SeekSliderBuffered')

  // Calculate buffered end position
  const bufferedEnd = React.useMemo(() => {
    if (!context.buffered || context.buffered.length === 0) return 0
    // Find the buffered range that contains the current time
    for (let i = 0; i < context.buffered.length; i++) {
      if (
        context.buffered.start(i) <= context.currentTime &&
        context.currentTime <= context.buffered.end(i)
      ) {
        return context.buffered.end(i)
      }
    }
    // Fallback to first buffered range
    return context.buffered.end(0)
  }, [context.buffered, context.currentTime])

  const bufferedPercentage =
    context.duration > 0 ? (bufferedEnd / context.duration) * 100 : 0

  return (
    <div
      ref={forwardedRef}
      {...props}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: `${bufferedPercentage}%`,
        ...props.style,
      }}
    />
  )
})

// Preview thumb - follows hover position
export interface SeekSliderPreviewThumbProps
  extends React.ComponentPropsWithRef<'span'> {}

export const SeekSliderPreviewThumb = React.forwardRef<
  HTMLSpanElement,
  SeekSliderPreviewThumbProps
>(function SeekSliderPreviewThumb(props, forwardedRef) {
  const context = useVideoPlayerContext('SeekSliderPreviewThumb')

  // Don't render if not hovering
  if (context.hoverProgress === null) {
    return null
  }

  return (
    <span
      ref={forwardedRef}
      {...props}
      style={{
        position: 'absolute',
        left: `${context.hoverProgress}%`,
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        ...props.style,
      }}
    />
  )
})

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
