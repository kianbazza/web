'use client'

import {
  Box,
  ChartNoAxesCombined,
  CheckCircle2Icon,
  ChevronRight,
  Eye,
  Gauge,
  Globe,
  Grid2x2,
  Logs,
  Shield,
  XCircleIcon,
} from 'lucide-react'
import * as React from 'react'
import { Switch } from '@/components/switch'
import { cn } from '@/lib/utils'

type SidebarItem = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  chevron?: boolean
}

const sidebarItems = [
  { id: 'projects', label: 'Projects', icon: Grid2x2 },
  { id: 'deployments', label: 'Deployments', icon: Box },
  { id: 'logs', label: 'Logs', icon: Logs },
  { id: 'analytics', label: 'Analytics', icon: ChartNoAxesCombined },
  { id: 'speed-insights', label: 'Speed Insights', icon: Gauge },
  { id: 'observability', label: 'Observability', icon: Eye, chevron: true },
  { id: 'firewall', label: 'Firewall', icon: Shield },
  { id: 'cdn', label: 'CDN', icon: Globe },
] satisfies SidebarItem[]

function SidebarExample({
  activeItem,
  onActiveItemChange,
  useHitArea = false,
  debug = false,
}: {
  activeItem: string
  onActiveItemChange: (id: string) => void
  useHitArea?: boolean
  debug?: boolean
}) {
  return (
    <div className="flex w-full min-w-0 flex-col items-center">
      <aside className="w-full min-w-0 rounded-[24px] border border-sand-5 bg-white p-3 shadow-xs">
        <div className="flex flex-col gap-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onActiveItemChange(item.id)}
                className={cn(
                  'group flex h-10 w-full cursor-pointer items-center gap-3 rounded-[14px] px-4 text-left text-[15px] font-medium',
                  useHitArea && 'hit-area-y-0.5',
                  debug && 'hit-area-debug',
                  isActive
                    ? 'bg-sand-3 text-sand-12'
                    : 'text-sand-11 hover:bg-sand-2 hover:text-sand-12 active:bg-sand-3/80',
                )}
              >
                <Icon
                  className={cn(
                    'size-5 shrink-0',
                    isActive
                      ? 'text-sand-12'
                      : 'text-sand-10 group-hover:text-sand-11',
                  )}
                  strokeWidth={2.25}
                />
                <span className="min-w-0 flex-1 whitespace-nowrap">
                  {item.label}
                </span>
                {item.chevron ? (
                  <ChevronRight className="size-4 shrink-0 text-sand-9" />
                ) : null}
              </button>
            )
          })}
        </div>
      </aside>

      <div className="mt-4 flex items-center gap-1">
        {useHitArea ? (
          <CheckCircle2Icon className="size-8 fill-green-600 stroke-sand-1" />
        ) : (
          <XCircleIcon className="size-8 fill-red-600 stroke-sand-1" />
        )}
        <span className="font-sans leading-none">
          {useHitArea ? 'No deadzones' : 'Deadzones'}
        </span>
      </div>
    </div>
  )
}

export function SidebarHitAreaDemo() {
  const [debug, setDebug] = React.useState(true)
  const [defaultActiveItem, setDefaultActiveItem] =
    React.useState('deployments')
  const [expandedActiveItem, setExpandedActiveItem] =
    React.useState('deployments')

  return (
    <div className="w-full max-w-[42rem] space-y-10 **:!font-sans **:!tracking-normal">
      <div className="flex">
        <div className="flex items-center gap-2 text-xs text-sand-9 font-medium">
          <Switch
            checked={debug}
            onCheckedChange={setDebug}
            aria-label="Toggle hit area debugging"
          />
          <span>Show hit area</span>
        </div>
      </div>

      <div className="grid min-w-0 grid-cols-2 gap-4 [&>*]:min-w-0">
        <SidebarExample
          activeItem={defaultActiveItem}
          onActiveItemChange={setDefaultActiveItem}
          debug={debug}
        />
        <SidebarExample
          activeItem={expandedActiveItem}
          onActiveItemChange={setExpandedActiveItem}
          useHitArea
          debug={debug}
        />
      </div>
    </div>
  )
}
