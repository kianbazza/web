'use client'

import { useBreakpoint } from '@/hooks/use-breakpoint'
import { useMeasure } from '@/hooks/use-measure'
import { Ruler } from 'lucide-react'

export default function BreakpointVisualizer() {
  const breakpoint = useBreakpoint()
  const [width] = useMeasure()

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="fixed bottom-0 left-0 p-2 sm:p-4 md:p-8 font-mono text-sm">
      <div className="flex items-center gap-4 rounded-full bg-background border border-sand-4 px-4 py-1 font-mono drop-shadow-md">
        <Ruler className="size-4" />
        <span className="font-bold">{breakpoint}</span>
        <span className="text-sand-10">
          <span className="text-sand-10">{width}</span>
          <span className="font-medium">px</span>
        </span>
      </div>
    </div>
  )
}
