'use client'

import { ScrollArea } from '@base-ui/react/scroll-area'
import { Tabs } from '@base-ui/react/tabs'
import { ChevronsDownUp, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ProcessedFile {
  name: string
  path: string
  source: string
  highlighted: React.ReactNode
}

interface DemoClientProps {
  children: React.ReactNode
  files: ProcessedFile[]
}

const COLLAPSED_HEIGHT = 250
const EXPANDED_HEIGHT = 600

export function DemoClient({ children, files }: DemoClientProps) {
  const [expanded, setExpanded] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState(files[0]?.name ?? '')
  const viewportRef = React.useRef<HTMLDivElement>(null)

  const activeFile = files.find((f) => f.name === activeTab) ?? files[0]

  const handleTabChange = React.useCallback((value: string) => {
    setActiveTab(value)
    // Reset scroll position when changing tabs
    if (viewportRef.current) {
      viewportRef.current.scrollTop = 0
      viewportRef.current.scrollLeft = 0
    }
  }, [])

  return (
    <div className="border border-sand-6 rounded-lg overflow-hidden">
      {/* Preview area */}
      <div className="p-8 flex items-center justify-center min-h-[300px] bg-sand-2">
        {children}
      </div>

      {/* Code section */}
      <div className="border-t border-sand-6">
        <Tabs.Root value={activeTab} onValueChange={handleTabChange}>
          {/* Header with tabs and copy button */}
          <div className="flex items-center justify-between px-4 py-2 bg-sand-1 border-b border-sand-6">
            <Tabs.List className="flex items-center gap-1">
              {files.map((file) => (
                <Tabs.Tab
                  key={file.name}
                  value={file.name}
                  className={cn(
                    'px-3 py-1.5 text-sm rounded-md',
                    'text-sand-11 hover:bg-sand-3/75',
                    'data-[active]:text-sand-12 data-[active]:bg-sand-3',
                  )}
                >
                  {file.name}
                </Tabs.Tab>
              ))}
            </Tabs.List>
            <CopyButton source={activeFile?.source ?? ''} />
          </div>

          {/* Code content with fade */}
          <div className="relative">
            {expanded ? (
              // Expanded: scrollable
              <ScrollArea.Root
                className="transition-[height] duration-300 ease-out"
                style={{ height: EXPANDED_HEIGHT }}
              >
                <ScrollArea.Viewport
                  ref={viewportRef}
                  className={cn(
                    'h-full bg-sand-1 text-sm [&_pre]:!rounded-none [&_pre]:!border-0 [&_pre]:!m-0 [&_pre]:!bg-transparent p-4',
                    'overscroll-contain',
                  )}
                >
                  <ScrollArea.Content>
                    {files.map((file) => (
                      <Tabs.Panel
                        key={file.name}
                        value={file.name}
                        className="outline-none"
                      >
                        {file.highlighted}
                      </Tabs.Panel>
                    ))}
                  </ScrollArea.Content>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  orientation="vertical"
                  className="flex w-2 touch-none select-none p-0.5 transition-opacity duration-150 data-[hovering]:bg-sand-3"
                >
                  <ScrollArea.Thumb className="relative flex-1 rounded-full bg-sand-8 transition-colors hover:bg-sand-9" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Scrollbar
                  orientation="horizontal"
                  className="flex h-2 touch-none select-none flex-col p-0.5 transition-opacity duration-150 data-[hovering]:bg-sand-3"
                >
                  <ScrollArea.Thumb className="relative flex-1 rounded-full bg-sand-8 transition-colors hover:bg-sand-9" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner className="bg-sand-3" />
              </ScrollArea.Root>
            ) : (
              // Collapsed: not scrollable, fixed height with overflow hidden
              <div
                className="bg-sand-1 text-sm [&_pre]:!rounded-none [&_pre]:!border-0 [&_pre]:!m-0 [&_pre]:!bg-transparent overflow-hidden p-4"
                style={{ height: COLLAPSED_HEIGHT }}
              >
                {files.map((file) => (
                  <Tabs.Panel
                    key={file.name}
                    value={file.name}
                    className="outline-none"
                  >
                    {file.highlighted}
                  </Tabs.Panel>
                ))}
              </div>
            )}

            {/* Fade overlay when collapsed */}
            <div
              className={cn(
                'absolute bottom-0 left-0 right-0 h-24 pointer-events-none transition-opacity duration-300',
                'bg-gradient-to-t from-sand-1 to-transparent',
                expanded ? 'opacity-0' : 'opacity-100',
              )}
            />
          </div>
        </Tabs.Root>

        {/* Show/Hide code button */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="w-full py-3 text-sm text-sand-11 hover:text-sand-12 hover:bg-sand-2 transition-colors cursor-pointer border-t border-sand-6 bg-sand-1 flex items-center justify-center gap-1.5"
        >
          {expanded ? (
            <>
              <ChevronsDownUp className="size-4" />
              Collapse
            </>
          ) : (
            <>
              <ChevronsUpDown className="size-4" />
              Expand
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function CopyButton({ source }: { source: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = React.useCallback(async () => {
    await navigator.clipboard.writeText(source)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [source])

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="text-sm text-sand-11 hover:text-sand-12 transition-colors cursor-pointer flex items-center gap-1.5"
    >
      {copied ? (
        <>
          <CheckIcon className="size-4" />
          Copied
        </>
      ) : (
        <>
          <CopyIcon className="size-4" />
          Copy
        </>
      )}
    </button>
  )
}

const CopyIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
)

const CheckIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
