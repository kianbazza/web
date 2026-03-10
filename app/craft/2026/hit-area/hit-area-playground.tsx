'use client'

import { Pause, Play, RotateCcw } from 'lucide-react'
import { useAnimate } from 'motion/react'
import type { AnimationPlaybackControlsWithThen } from 'motion-dom'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from './button'

type Side = 'top' | 'right' | 'bottom' | 'left'

const SIDES: { key: Side; label: string }[] = [
  { key: 'top', label: 'Top' },
  { key: 'right', label: 'Right' },
  { key: 'bottom', label: 'Bottom' },
  { key: 'left', label: 'Left' },
]

function Slider({
  id,
  label,
  value,
  onChange,
  min = 0,
  max = 80,
  step = 1,
  format,
}: {
  id: string
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  format?: (value: number) => string
}) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor={id}
        className="w-14 shrink-0 text-xs font-medium text-sand-11 font-sans"
      >
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          'h-1.5 w-full cursor-pointer appearance-none rounded-full bg-sand-4 outline-none',
          '[&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sand-12 [&::-webkit-slider-thumb]:shadow-sm',
          '[&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-sand-12 [&::-moz-range-thumb]:shadow-sm',
        )}
      />
      <span className="w-10 shrink-0 text-right font-mono text-xs tabular-nums text-sand-11">
        {format ? format(value) : `${value}px`}
      </span>
    </div>
  )
}

type SpringConfig = {
  visualDuration: number
  bounce: number
  delay: number
  stagger: number
}

export function HitAreaPlayground() {
  const id = React.useId()
  const [scope, animate] = useAnimate()
  const [values, setValues] = React.useState<Record<Side, number>>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  })
  const [spring, setSpring] = React.useState<SpringConfig>({
    visualDuration: 0.4,
    bounce: 0.2,
    delay: 0,
    stagger: 0,
  })
  const [buttonLabel, setButtonLabel] = React.useState('Click me')
  const [isPaused, setIsPaused] = React.useState(false)
  const controlsRef = React.useRef<AnimationPlaybackControlsWithThen[]>([])
  const valuesRef = React.useRef(values)
  valuesRef.current = values
  const springRef = React.useRef(spring)
  springRef.current = spring

  const hasValues = Object.values(values).some((v) => v > 0)

  const SIDE_KEYS: Side[] = ['top', 'right', 'bottom', 'left']

  const stopAll = React.useCallback(() => {
    for (const c of controlsRef.current) {
      c.stop()
    }
    controlsRef.current = []
  }, [])

  const animateToTarget = React.useCallback(
    (target: Record<Side, number>) => {
      stopAll()
      setIsPaused(false)

      const s = springRef.current
      const allControls: AnimationPlaybackControlsWithThen[] = []

      for (let i = 0; i < SIDE_KEYS.length; i++) {
        const side = SIDE_KEYS[i]
        const controls = animate(
          '[data-hit-area]',
          { [side]: -target[side] },
          {
            type: 'spring' as const,
            visualDuration: s.visualDuration,
            bounce: s.bounce,
            delay: s.delay + i * s.stagger,
          },
        ) as AnimationPlaybackControlsWithThen
        allControls.push(controls)
      }

      controlsRef.current = allControls

      Promise.all(allControls).then(() => {
        controlsRef.current = []
      })
    },
    [animate, stopAll],
  )

  const handleSliderChange = React.useCallback(
    (side: Side, value: number) => {
      const next = { ...valuesRef.current, [side]: value }
      setValues(next)
      animateToTarget(next)
    },
    [animateToTarget],
  )

  const handleSpringChange = React.useCallback(
    (key: keyof SpringConfig, value: number) => {
      springRef.current = { ...springRef.current, [key]: value }
      setSpring((prev) => ({ ...prev, [key]: value }))
      const current = valuesRef.current
      if (Object.values(current).some((v) => v > 0)) {
        animateToTarget(current)
      }
    },
    [animateToTarget],
  )

  const handlePause = React.useCallback(() => {
    if (controlsRef.current.length > 0) {
      for (const c of controlsRef.current) c.pause()
      setIsPaused(true)
    }
  }, [])

  const handleResume = React.useCallback(() => {
    if (isPaused && controlsRef.current.length > 0) {
      for (const c of controlsRef.current) c.play()
      setIsPaused(false)
    }
  }, [isPaused])

  const handleRestart = React.useCallback(() => {
    const current = valuesRef.current
    if (!Object.values(current).some((v) => v > 0)) return

    stopAll()
    setIsPaused(false)

    requestAnimationFrame(() => {
      const s = springRef.current
      const allControls: AnimationPlaybackControlsWithThen[] = []

      for (let i = 0; i < SIDE_KEYS.length; i++) {
        const side = SIDE_KEYS[i]
        const controls = animate(
          '[data-hit-area]',
          { [side]: [0, -current[side]] },
          {
            type: 'spring' as const,
            visualDuration: s.visualDuration,
            bounce: s.bounce,
            delay: s.delay + i * s.stagger,
          },
        ) as AnimationPlaybackControlsWithThen
        allControls.push(controls)
      }

      controlsRef.current = allControls

      Promise.all(allControls).then(() => {
        controlsRef.current = []
      })
    })
  }, [animate, stopAll])

  return (
    <div ref={scope} className="w-full space-y-8">
      {/* Demo area */}
      <div className="flex items-center justify-center rounded-2xl border border-sand-4 bg-white p-20">
        <div className="group/hit relative">
          <div
            data-hit-area=""
            className={cn(
              'pointer-events-none absolute rounded-lg',
              'border border-dashed border-blue-500 bg-blue-500/10',
              'group-hover/hit:border-green-500 group-hover/hit:bg-green-500/10',
            )}
            style={{
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          />
          <Button
            className="hit-area relative z-10 group w-[150px] justify-center"
            style={
              {
                '--hit-area-t': `${-values.top}px`,
                '--hit-area-r': `${-values.right}px`,
                '--hit-area-b': `${-values.bottom}px`,
                '--hit-area-l': `${-values.left}px`,
              } as React.CSSProperties
            }
          >
            <span className="group-hover:hidden group-active:!hidden !font-mono !font-normal">
              {buttonLabel}
            </span>
            <span className="hidden group-hover:inline group-active:!hidden">
              Hovered
            </span>
            <span className="hidden group-active:!inline">Pressed</span>
          </Button>
        </div>
      </div>

      {/* Playback controls */}
      <div className="flex items-center gap-2">
        {isPaused ? (
          <button
            type="button"
            onClick={handleResume}
            className={cn(
              'inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-medium font-sans',
              'bg-sand-12 text-sand-1 hover:bg-sand-12/85',
            )}
          >
            <Play className="size-3.5" />
            Resume
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePause}
            disabled={controlsRef.current.length === 0}
            className={cn(
              'inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-medium font-sans',
              'bg-sand-3 text-sand-11 hover:bg-sand-4 active:bg-sand-5',
              'disabled:opacity-40 disabled:cursor-not-allowed',
            )}
          >
            <Pause className="size-3.5" />
            Pause
          </button>
        )}
        <button
          type="button"
          onClick={handleRestart}
          disabled={!hasValues}
          className={cn(
            'inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-medium font-sans',
            'bg-sand-3 text-sand-11 hover:bg-sand-4 active:bg-sand-5',
            'disabled:opacity-40 disabled:cursor-not-allowed',
          )}
        >
          <RotateCcw className="size-3.5" />
          Restart
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        {/* Button label */}
        <div className="space-y-3">
          <label
            htmlFor={`${id}-button-label`}
            className="text-xs font-medium text-sand-9 font-sans"
          >
            Button label
          </label>
          <input
            id={`${id}-button-label`}
            type="text"
            value={buttonLabel}
            onChange={(e) => setButtonLabel(e.target.value)}
            className={cn(
              'h-8 w-full max-w-48 rounded-lg border border-sand-5 bg-sand-1 px-2.5 font-sans text-xs text-sand-12',
              'outline-none focus:border-sand-8',
            )}
          />
        </div>

        {/* Hit area sliders */}
        <div className="space-y-3">
          <span className="text-xs font-medium text-sand-9 font-sans">
            Hit area expansion
          </span>
          <div className="space-y-2.5">
            {SIDES.map(({ key, label }) => (
              <Slider
                key={key}
                id={`${id}-hit-area-${key}`}
                label={label}
                value={values[key]}
                onChange={(v) => handleSliderChange(key, v)}
              />
            ))}
          </div>
        </div>

        {/* Spring config sliders */}
        <div className="space-y-3">
          <span className="text-xs font-medium text-sand-9 font-sans">
            Spring
          </span>
          <div className="space-y-2.5">
            <Slider
              id={`${id}-spring-duration`}
              label="Duration"
              value={spring.visualDuration}
              onChange={(v) => handleSpringChange('visualDuration', v)}
              min={0.1}
              max={2}
              step={0.05}
              format={(v) => `${v}s`}
            />
            <Slider
              id={`${id}-spring-bounce`}
              label="Bounce"
              value={spring.bounce}
              onChange={(v) => handleSpringChange('bounce', v)}
              min={0}
              max={1}
              step={0.05}
              format={(v) => v.toFixed(2)}
            />
            <Slider
              id={`${id}-spring-delay`}
              label="Delay"
              value={spring.delay}
              onChange={(v) => handleSpringChange('delay', v)}
              min={0}
              max={2}
              step={0.05}
              format={(v) => `${v}s`}
            />
            <Slider
              id={`${id}-spring-stagger`}
              label="Stagger"
              value={spring.stagger}
              onChange={(v) => handleSpringChange('stagger', v)}
              min={0}
              max={0.5}
              step={0.01}
              format={(v) => `${v}s`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
