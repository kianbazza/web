'use client'

import { CheckCircle2Icon, XCircleIcon } from 'lucide-react'
import * as React from 'react'
import { Switch } from '@/components/switch'
import { cn } from '@/lib/utils'
import { Checkbox } from './checkbox'

const rows = [
  {
    id: 'shadcn',
    name: 'shadcn',
    email: 'shadcn@vercel.com',
    team: 'Vercel',
  },
  {
    id: 'kian',
    name: 'Kian Bazza',
    email: 'kian@bazza.dev',
    team: 'Bazza Labs',
  },
  {
    id: 'guillermo',
    name: 'Guillermo Rauch',
    email: 'guillermo@vercel.com',
    team: 'Vercel',
  },
  {
    id: 'theo',
    name: 'Theo Browne',
    email: 'theo@t3.gg',
    team: 'T3',
  },
  {
    id: 'lee',
    name: 'Lee Rob',
    email: 'lee@cursor.com',
    team: 'Cursor',
  },
  {
    id: 'jared',
    name: 'Jared Palmer',
    email: 'jared@vercel.com',
    team: 'Vercel',
  },
  {
    id: 'tim',
    name: 'Tim Neutkens',
    email: 'tim@vercel.com',
    team: 'Vercel',
  },
  {
    id: 'sam',
    name: 'Sam Selikoff',
    email: 'sam@buildui.com',
    team: 'Build UI',
  },
  {
    id: 'dan',
    name: 'Dan Abramov',
    email: 'dan@bluesky.xyz',
    team: 'Bluesky',
  },
  {
    id: 'rauno',
    name: 'Rauno Freiberg',
    email: 'rauno@vercel.com',
    team: 'Vercel',
  },
] as const

type RowId = (typeof rows)[number]['id']

type SelectionTableProps = {
  title: string
  selectedIds: RowId[]
  onToggleAll: (checked: boolean) => void
  onToggleRow: (rowId: RowId, checked: boolean) => void
  useHitArea?: boolean
  debug?: boolean
}

function SelectionTable({
  title,
  selectedIds,
  onToggleRow,
  useHitArea = false,
  debug = false,
}: SelectionTableProps) {
  const checkboxClassName = cn(
    'z-10 hit-area-0',
    useHitArea && 'hit-area-x-3 hit-area-y-4.25',
    debug && 'hit-area-debug',
  )

  return (
    <div className="flex w-full min-w-0 flex-col items-center">
      <div className="w-full min-w-0 overflow-hidden mask-r-from-0% mask-r-to-90%">
        <div className="w-full overflow-hidden border rounded-xl">
          <table className="min-w-max border-collapse font-sans text-sm">
            <tbody>
              {rows.map((row) => {
                const checked = selectedIds.includes(row.id)

                return (
                  <tr
                    key={row.id}
                    data-selected={checked}
                    className="border-b border-sand-4 text-sand-12 hover:bg-sand-2 last:border-b-0 h-12"
                  >
                    <td className="w-10 px-2 text-center">
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(nextChecked) =>
                            onToggleRow(row.id, nextChecked)
                          }
                          aria-label={`Select ${row.name} in ${title.toLowerCase()}`}
                          className={checkboxClassName}
                        />
                      </div>
                    </td>
                    <td className="px-3 font-medium whitespace-nowrap">
                      {row.name}
                    </td>
                    <td className="px-3 text-sand-11 whitespace-nowrap">
                      {row.email}
                    </td>
                    <td className="px-3 text-sand-11 whitespace-nowrap">
                      {row.team}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center gap-1 mt-4">
        {useHitArea ? (
          <CheckCircle2Icon className="fill-green-600 stroke-sand-1 size-8" />
        ) : (
          <XCircleIcon className="fill-red-600 stroke-sand-1 size-8" />
        )}
        <span className="font-sans leading-none">
          {useHitArea ? 'No deadzones' : 'Deadzones'}
        </span>
      </div>
    </div>
  )
}

export function CheckboxColumnDemo() {
  const [debug, setDebug] = React.useState(true)
  const [defaultSelectedIds, setDefaultSelectedIds] = React.useState<RowId[]>(
    [],
  )
  const [expandedSelectedIds, setExpandedSelectedIds] = React.useState<RowId[]>(
    [],
  )

  const toggleDefaultAll = React.useCallback((checked: boolean) => {
    setDefaultSelectedIds(checked ? rows.map((row) => row.id) : [])
  }, [])

  const toggleExpandedAll = React.useCallback((checked: boolean) => {
    setExpandedSelectedIds(checked ? rows.map((row) => row.id) : [])
  }, [])

  const toggleDefaultRow = React.useCallback(
    (rowId: RowId, checked: boolean) => {
      setDefaultSelectedIds((current) => {
        if (checked) return [...current, rowId]
        return current.filter((id) => id !== rowId)
      })
    },
    [],
  )

  const toggleExpandedRow = React.useCallback(
    (rowId: RowId, checked: boolean) => {
      setExpandedSelectedIds((current) => {
        if (checked) return [...current, rowId]
        return current.filter((id) => id !== rowId)
      })
    },
    [],
  )

  return (
    <div className="w-full space-y-10 **:!font-sans **:!tracking-normal">
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
        <SelectionTable
          title="Default checkbox"
          selectedIds={defaultSelectedIds}
          onToggleAll={toggleDefaultAll}
          onToggleRow={toggleDefaultRow}
          debug={debug}
        />
        <SelectionTable
          title="Expanded hit area"
          selectedIds={expandedSelectedIds}
          onToggleAll={toggleExpandedAll}
          onToggleRow={toggleExpandedRow}
          useHitArea
          debug={debug}
        />
      </div>
    </div>
  )
}
