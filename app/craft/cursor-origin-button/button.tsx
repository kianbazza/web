'use client'

import { ListFilterPlusIcon } from 'lucide-react'
import { useState } from 'react'
import { Switch } from '@/components/switch'
import { cn } from '@/lib/utils'

export function OriginAwareButtonExperiment() {
  const [isSlow, setIsSlow] = useState(false)

  return (
    <div
      className="w-full max-w-(--breakpoint-sm) aspect-video flex flex-col justify-center items-center bg-white dark:bg-sand-2 border border-sand-5 rounded-xl gap-12 relative"
      style={
        {
          '--duration': isSlow ? '600ms' : '150ms',
        } as React.CSSProperties
      }
    >
      <div className="absolute top-4 left-4 flex items-center gap-2 text-xs">
        <Switch checked={isSlow} onCheckedChange={setIsSlow} />
        <span>Slow mo</span>
      </div>
      <div className="absolute top-4 right-4 flex items-center gap-2 text-xs">
        <span>Speed: {!isSlow ? 'Normal (150ms)' : 'Slow (600ms)'}</span>
      </div>
      <div className="grid grid-cols-2 justify-items-center gap-8">
        <span className="text-sm">Normal</span>
        <span className="text-sm underline underline-offset-2">
          Cursor origin
        </span>
        <NormalButton />
        <OriginAwareButton />
      </div>
    </div>
  )
}

export function OriginAwareButton() {
  return (
    <button
      type="button"
      className={cn(
        'text-sand-11 font-sans font-[450] flex items-center gap-2 h-9 px-3 text-sm relative *:z-1',
        'hover:text-sand-12',
        'active:scale-97 active:before:bg-sand-4',
        'before:absolute before:inset-0 before:z-0 before:rounded-xl before:bg-sand-3',
        'before:origin-(--cursor-origin) before:transition-[scale,opacity,color,background-color] before:ease-out before:duration-(--duration)',
        'before:scale-0 before:opacity-50',
        'hover:before:scale-100 hover:before:opacity-100',
      )}
      ref={(el) => {
        if (!el) return

        function setCursorOrigin(el: HTMLElement, e: PointerEvent) {
          const { clientX, clientY } = e

          const { top, left } = el.getBoundingClientRect()

          const x = clientX - left
          const y = clientY - top

          el.style.setProperty('--x', `${x}px`)
          el.style.setProperty('--y', `${y}px`)
          el.style.setProperty('--cursor-origin', `var(--x) var(--y)`)
        }

        el.addEventListener('pointerenter', (e) => setCursorOrigin(el, e))
        el.addEventListener('pointerleave', (e) => setCursorOrigin(el, e))
      }}
    >
      <ListFilterPlusIcon className="size-4 stroke-[2.25px]" />
      <span>Add filter</span>
    </button>
  )
}

export function OriginAwareButton_Basic() {
  return (
    <button
      type="button"
      className={cn(
        'font-sans font-[450] text-sm',
        'flex items-center gap-2 h-9 px-3 rounded-xl',
        'hover:bg-sand-3 text-sand-11 hover:text-sand-12',
        'active:scale-97 active:bg-sand-4',
        'transition-[color,background-color,scale] duration-150 ease-out',
      )}
    >
      <ListFilterPlusIcon className="size-4 stroke-[2.25px]" />
      <span>Add filter</span>
    </button>
  )
}

export function OriginAwareButton_BasicWithPseudo() {
  return (
    <button
      type="button"
      className={cn(
        'font-sans font-[450] text-sm',
        'relative flex items-center gap-2 h-9 px-3 rounded-xl',
        'text-sand-11 hover:text-sand-12',
        'active:scale-97 active:bg-sand-4',
        'transition-[color,scale] duration-150 ease-out',
        'before:absolute before:inset-0',
        'before:rounded-xl before:bg-sand-3',
        'before:opacity-0 hover:before:opacity-100',
        'before:transition-[opacity,background-color] before:ease-out before:duration-150',
      )}
    >
      <ListFilterPlusIcon className="size-4 stroke-[2.25px]" />
      <span>Add filter</span>
    </button>
  )
}

export function OriginAwareButton_BasicWithPseudo_FixZIndex() {
  return (
    <button
      type="button"
      className={cn(
        'font-sans font-[450] text-sm',
        'relative flex items-center gap-2 h-9 px-3 rounded-xl',
        '*:z-1',
        'text-sand-11 hover:text-sand-12',
        'active:scale-97 active:bg-sand-4',
        'transition-[color,scale] duration-150 ease-out',
        'before:absolute before:inset-0',
        'before:rounded-xl before:bg-sand-3',
        'before:opacity-0 hover:before:opacity-100',
        'before:transition-[opacity,background-color] before:ease-out before:duration-150',
      )}
    >
      <ListFilterPlusIcon className="size-4 stroke-[2.25px]" />
      <span>Add filter</span>
    </button>
  )
}

export function NormalButton() {
  return (
    <button
      type="button"
      className={cn(
        'text-sand-11 font-sans font-[450] flex items-center gap-2 h-9 px-3 text-sm relative *:z-1 w-fit',
        'hover:text-sand-12',
        'hover:bg-sand-3 rounded-xl',
        'active:scale-97 active:bg-sand-4',
        'transition-[color,background-color,scale] ease-out duration-(--duration)',
      )}
    >
      <ListFilterPlusIcon data-slot="icon" className="size-4 stroke-[2.25px]" />
      <span data-slot="text">Add filter</span>
    </button>
  )
}
