'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { useVideoPlayerContext } from '../context'
import { useTransitionStatus } from '../use-transition-status'
import type { RenderProp } from '../types'
import { SeekSliderDataAttributes } from './seek-slider.data-attributes'
import { SeekSliderCssVars } from './seek-slider.css-vars'
import { SeekSliderPreviewThumbDataAttributes } from './seek-slider-preview-thumb.data-attributes'

// ============================================================================
// SeekSlider Props
// ============================================================================

export interface SeekSliderProps
  extends Omit<
    React.ComponentPropsWithRef<typeof SliderPrimitive.Root>,
    'value' | 'onValueChange' | 'min' | 'max' | 'children'
  > {
  render?: RenderProp<SeekSliderRenderProps, SeekSliderState>
  children?: React.ReactNode
}

export interface SeekSliderRenderProps {
  [SeekSliderDataAttributes.seeking]?: boolean
  [SeekSliderDataAttributes.hovering]?: boolean
  [SeekSliderDataAttributes.pressing]?: boolean
  [SeekSliderDataAttributes.dragging]?: boolean
  style: React.CSSProperties
}

export interface SeekSliderState {
  currentTime: number
  duration: number
  progress: number
  seeking: boolean
  pressing: boolean
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
  const pressingRef = React.useRef(false)

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

  const handleValueChange = React.useCallback(
    (value: number[]) => {
      context.seek(value[0])
      context.resetIdle()
      if (pressingRef.current) {
        setDragging(true)
      }
    },
    [context],
  )

  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent) => {
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
      onPointerLeave?.(event as any)
      context.setHoverTime(null)
    },
    [onPointerLeave, context],
  )

  const handlePointerDown = React.useCallback(
    (event: React.PointerEvent) => {
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

  const renderProps: SeekSliderRenderProps = {
    [SeekSliderDataAttributes.seeking]: context.seeking || undefined,
    [SeekSliderDataAttributes.hovering]:
      context.hoverTime !== null || undefined,
    [SeekSliderDataAttributes.pressing]: pressing || undefined,
    [SeekSliderDataAttributes.dragging]: dragging || undefined,
    style,
  }

  // Render prop: wrap in SliderPrimitive.Root with asChild
  if (render) {
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
        asChild
      >
        {render(renderProps, state)}
      </SliderPrimitive.Root>
    )
  }

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
      {...renderProps}
      {...sliderProps}
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
// Sub-components
// ============================================================================

// SeekSliderTrack
export interface SeekSliderTrackProps
  extends Omit<
    React.ComponentPropsWithRef<typeof SliderPrimitive.Track>,
    'asChild' | 'children'
  > {
  render?: RenderProp<SeekSliderTrackRenderProps, SeekSliderTrackState>
  children?: React.ReactNode
}

export interface SeekSliderTrackRenderProps {
  ref: React.Ref<any>
  style: React.CSSProperties
}

export interface SeekSliderTrackState {}

export const SeekSliderTrack = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Track>,
  SeekSliderTrackProps
>(function SeekSliderTrack(props, forwardedRef) {
  const { render, children, ...trackProps } = props

  const state: SeekSliderTrackState = {}

  const renderProps: SeekSliderTrackRenderProps = {
    ref: forwardedRef,
    style: { position: 'relative' as const, ...trackProps.style },
  }

  if (render) {
    return (
      <SliderPrimitive.Track asChild>{render(renderProps, state)}</SliderPrimitive.Track>
    )
  }

  return (
    <SliderPrimitive.Track ref={forwardedRef} {...trackProps}>
      {children}
    </SliderPrimitive.Track>
  )
})

// SeekSliderProgress
export interface SeekSliderProgressProps
  extends Omit<
    React.ComponentPropsWithRef<typeof SliderPrimitive.Range>,
    'asChild' | 'children'
  > {
  render?: RenderProp<SeekSliderProgressRenderProps, SeekSliderProgressState>
  children?: React.ReactNode
}

export interface SeekSliderProgressRenderProps {
  ref: React.Ref<any>
}

export interface SeekSliderProgressState {
  progress: number
}

export const SeekSliderProgress = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Range>,
  SeekSliderProgressProps
>(function SeekSliderProgress(props, forwardedRef) {
  const { render, children, ...rangeProps } = props
  const context = useVideoPlayerContext('SeekSliderProgress')

  const progress =
    context.duration > 0 ? (context.currentTime / context.duration) * 100 : 0

  const state: SeekSliderProgressState = { progress }

  const renderProps: SeekSliderProgressRenderProps = {
    ref: forwardedRef,
  }

  if (render) {
    return (
      <SliderPrimitive.Range asChild>{render(renderProps, state)}</SliderPrimitive.Range>
    )
  }

  return (
    <SliderPrimitive.Range ref={forwardedRef} {...rangeProps}>
      {children}
    </SliderPrimitive.Range>
  )
})

// SeekSliderThumb
export interface SeekSliderThumbProps
  extends Omit<
    React.ComponentPropsWithRef<typeof SliderPrimitive.Thumb>,
    'asChild' | 'children'
  > {
  render?: RenderProp<SeekSliderThumbRenderProps, SeekSliderThumbState>
  children?: React.ReactNode
}

export interface SeekSliderThumbRenderProps {
  ref: React.Ref<any>
}

export interface SeekSliderThumbState {}

export const SeekSliderThumb = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Thumb>,
  SeekSliderThumbProps
>(function SeekSliderThumb(props, forwardedRef) {
  const { render, children, ...thumbProps } = props

  const state: SeekSliderThumbState = {}

  const renderProps: SeekSliderThumbRenderProps = {
    ref: forwardedRef,
  }

  if (render) {
    return (
      <SliderPrimitive.Thumb asChild>{render(renderProps, state)}</SliderPrimitive.Thumb>
    )
  }

  return (
    <SliderPrimitive.Thumb ref={forwardedRef} {...thumbProps}>
      {children}
    </SliderPrimitive.Thumb>
  )
})

// SeekSliderBuffered
export interface SeekSliderBufferedProps
  extends Omit<React.ComponentPropsWithRef<'div'>, 'children'> {
  render?: RenderProp<SeekSliderBufferedRenderProps, SeekSliderBufferedState>
  children?: React.ReactNode
}

export interface SeekSliderBufferedRenderProps {
  ref: React.Ref<HTMLDivElement>
  style: React.CSSProperties
}

export interface SeekSliderBufferedState {
  bufferedPercentage: number
}

export const SeekSliderBuffered = React.forwardRef<
  HTMLDivElement,
  SeekSliderBufferedProps
>(function SeekSliderBuffered(props, forwardedRef) {
  const { render, children, ...divProps } = props
  const context = useVideoPlayerContext('SeekSliderBuffered')

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

  const state: SeekSliderBufferedState = { bufferedPercentage }

  const style: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: `${bufferedPercentage}%`,
    ...divProps.style,
  }

  const renderProps: SeekSliderBufferedRenderProps = {
    ref: forwardedRef,
    style,
  }

  if (render) {
    return render(renderProps, state)
  }

  return (
    <div {...renderProps} {...divProps}>
      {children}
    </div>
  )
})

// SeekSliderPreviewThumb
export interface SeekSliderPreviewThumbProps
  extends Omit<React.ComponentPropsWithRef<'span'>, 'children'> {
  keepMounted?: boolean
  render?: RenderProp<
    SeekSliderPreviewThumbRenderProps,
    SeekSliderPreviewThumbState
  >
  children?: React.ReactNode
}

export interface SeekSliderPreviewThumbRenderProps {
  ref: React.Ref<any>
  style: React.CSSProperties
  [SeekSliderPreviewThumbDataAttributes.open]?: boolean
  [SeekSliderPreviewThumbDataAttributes.closed]?: boolean
  [SeekSliderPreviewThumbDataAttributes.startingStyle]?: boolean
  [SeekSliderPreviewThumbDataAttributes.endingStyle]?: boolean
}

export interface SeekSliderPreviewThumbState {
  open: boolean
  transitionStatus: 'starting' | 'ending' | undefined
  hoverProgress: number
}

export const SeekSliderPreviewThumb = React.forwardRef<
  HTMLSpanElement,
  SeekSliderPreviewThumbProps
>(function SeekSliderPreviewThumb(props, forwardedRef) {
  const { keepMounted = false, render, children, ...spanProps } = props
  const context = useVideoPlayerContext('SeekSliderPreviewThumb')

  const open = context.hoverProgress !== null

  const lastProgressRef = React.useRef<number>(0)
  if (context.hoverProgress !== null) {
    lastProgressRef.current = context.hoverProgress
  }

  const hoverProgress = context.hoverProgress ?? lastProgressRef.current

  const { mounted, transitionStatus, elementRef } = useTransitionStatus({
    open,
    keepMounted,
  })

  const composedRef = React.useCallback(
    (node: HTMLSpanElement | null) => {
      ;(elementRef as React.MutableRefObject<HTMLElement | null>).current = node
      if (typeof forwardedRef === 'function') {
        forwardedRef(node)
      } else if (forwardedRef) {
        forwardedRef.current = node
      }
    },
    [forwardedRef, elementRef],
  )

  const state: SeekSliderPreviewThumbState = {
    open,
    transitionStatus,
    hoverProgress,
  }

  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${hoverProgress}%`,
    transform: 'translateX(-50%)',
    pointerEvents: 'none',
    ...spanProps.style,
  }

  const renderProps: SeekSliderPreviewThumbRenderProps = {
    ref: composedRef,
    style,
    [SeekSliderPreviewThumbDataAttributes.open]: open || undefined,
    [SeekSliderPreviewThumbDataAttributes.closed]: !open || undefined,
    [SeekSliderPreviewThumbDataAttributes.startingStyle]:
      transitionStatus === 'starting' || undefined,
    [SeekSliderPreviewThumbDataAttributes.endingStyle]:
      transitionStatus === 'ending' || undefined,
  }

  if (!mounted) {
    return null
  }

  if (render) {
    return render(renderProps, state)
  }

  return (
    <span {...renderProps} {...spanProps}>
      {children}
    </span>
  )
})

// SeekSliderHover
export interface SeekSliderHoverProps
  extends Omit<React.ComponentPropsWithRef<'div'>, 'children'> {
  render?: RenderProp<SeekSliderHoverRenderProps, SeekSliderHoverState>
  children?: React.ReactNode
}

export interface SeekSliderHoverRenderProps {
  ref: React.Ref<HTMLDivElement>
  style: React.CSSProperties
  'data-hovering'?: boolean
}

export interface SeekSliderHoverState {
  hovering: boolean
  hoverProgress: number | null
  hoverTime: number | null
}

export const SeekSliderHover = React.forwardRef<
  HTMLDivElement,
  SeekSliderHoverProps
>(function SeekSliderHover(props, forwardedRef) {
  const { render, children, style: styleProp, ...divProps } = props
  const context = useVideoPlayerContext('SeekSliderHover')

  const hovering = context.hoverProgress !== null
  const hoverProgress = context.hoverProgress ?? 0

  const state: SeekSliderHoverState = {
    hovering,
    hoverProgress: context.hoverProgress,
    hoverTime: context.hoverTime,
  }

  const style: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: `${hoverProgress}%`,
    pointerEvents: 'none',
    ...styleProp,
  }

  const renderProps: SeekSliderHoverRenderProps = {
    ref: forwardedRef,
    style,
    'data-hovering': hovering || undefined,
  }

  if (render) {
    return render(renderProps, state)
  }

  return (
    <div {...renderProps} {...divProps}>
      {children}
    </div>
  )
})

// ============================================================================
// Namespaces
// ============================================================================

export namespace SeekSlider {
  export type Props = SeekSliderProps
  export type State = SeekSliderState
  export type RenderProps = SeekSliderRenderProps
}

export namespace SeekSliderTrack {
  export type Props = SeekSliderTrackProps
  export type State = SeekSliderTrackState
  export type RenderProps = SeekSliderTrackRenderProps
}

export namespace SeekSliderProgress {
  export type Props = SeekSliderProgressProps
  export type State = SeekSliderProgressState
  export type RenderProps = SeekSliderProgressRenderProps
}

export namespace SeekSliderThumb {
  export type Props = SeekSliderThumbProps
  export type State = SeekSliderThumbState
  export type RenderProps = SeekSliderThumbRenderProps
}

export namespace SeekSliderBuffered {
  export type Props = SeekSliderBufferedProps
  export type State = SeekSliderBufferedState
  export type RenderProps = SeekSliderBufferedRenderProps
}

export namespace SeekSliderPreviewThumb {
  export type Props = SeekSliderPreviewThumbProps
  export type State = SeekSliderPreviewThumbState
  export type RenderProps = SeekSliderPreviewThumbRenderProps
}

export namespace SeekSliderHover {
  export type Props = SeekSliderHoverProps
  export type State = SeekSliderHoverState
  export type RenderProps = SeekSliderHoverRenderProps
}
