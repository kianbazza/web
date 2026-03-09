'use client'

import { Tabs } from '@base-ui/react/tabs'
import { CheckIcon, CopyIcon } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/lib/utils'

const STORAGE_KEY_PREFIX = 'kb:mdx-tabs:'

interface CodeBlockTabsContextValue {
  activeValue: string
  copied: boolean
  onCopy: () => Promise<void>
  registerPanel: (value: string, node: HTMLDivElement | null) => void
}

const CodeBlockTabsContext =
  React.createContext<CodeBlockTabsContextValue | null>(null)

function getStorageKey(groupId: string) {
  return `${STORAGE_KEY_PREFIX}${groupId}`
}

function extractCodeText(panel: HTMLDivElement) {
  const code = panel.querySelector('pre code')

  if (!code) {
    return panel.textContent?.trimEnd() ?? ''
  }

  const lines = Array.from(code.querySelectorAll('.line'))

  if (lines.length > 0) {
    return lines
      .map((line) => line.textContent ?? '')
      .join('\n')
      .trimEnd()
  }

  return code.textContent?.trimEnd() ?? ''
}

function useCodeBlockTabsContext() {
  const context = React.useContext(CodeBlockTabsContext)

  if (!context) {
    throw new Error(
      'CodeBlockTabs components must be used within CodeBlockTabs',
    )
  }

  return context
}

interface CodeBlockTabsProps extends React.ComponentPropsWithoutRef<'div'> {
  defaultValue?: string
  groupId?: string
  persist?: boolean
}

export function CodeBlockTabs({
  children,
  className,
  defaultValue,
  groupId,
  persist = false,
  ...props
}: CodeBlockTabsProps) {
  const [value, setValue] = React.useState(defaultValue ?? '')
  const [copied, setCopied] = React.useState(false)
  const panelRefs = React.useRef(new Map<string, HTMLDivElement>())
  const copiedTimeoutRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    setValue(defaultValue ?? '')
  }, [defaultValue])

  React.useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) {
        window.clearTimeout(copiedTimeoutRef.current)
      }
    }
  }, [])

  React.useEffect(() => {
    if (!persist || !groupId) return

    const storedValue = window.localStorage.getItem(getStorageKey(groupId))

    if (storedValue) {
      setValue(storedValue)
    }
  }, [groupId, persist])

  const registerPanel = React.useCallback(
    (panelValue: string, node: HTMLDivElement | null) => {
      if (node) {
        panelRefs.current.set(panelValue, node)
      } else {
        panelRefs.current.delete(panelValue)
      }

      if (!panelRefs.current.has(value)) {
        const fallbackValue =
          (defaultValue && panelRefs.current.has(defaultValue)
            ? defaultValue
            : null) ?? panelRefs.current.keys().next().value

        if (fallbackValue) {
          setValue(fallbackValue)
        }
      }
    },
    [defaultValue, value],
  )

  const handleValueChange = React.useCallback(
    (nextValue: string) => {
      setValue(nextValue)
      setCopied(false)

      if (persist && groupId) {
        window.localStorage.setItem(getStorageKey(groupId), nextValue)
      }
    },
    [groupId, persist],
  )

  const handleCopy = React.useCallback(async () => {
    const panel = panelRefs.current.get(value)

    if (!panel) return

    const text = extractCodeText(panel)

    if (!text) return

    await navigator.clipboard.writeText(text)
    setCopied(true)

    if (copiedTimeoutRef.current) {
      window.clearTimeout(copiedTimeoutRef.current)
    }

    copiedTimeoutRef.current = window.setTimeout(() => {
      setCopied(false)
    }, 2000)
  }, [value])

  const contextValue = React.useMemo(
    () => ({
      activeValue: value,
      copied,
      onCopy: handleCopy,
      registerPanel,
    }),
    [copied, handleCopy, registerPanel, value],
  )

  return (
    <CodeBlockTabsContext.Provider value={contextValue}>
      <Tabs.Root value={value} onValueChange={handleValueChange}>
        <div
          className={cn(
            'overflow-clip rounded-xl border border-sand-3 bg-sand-2',
            '[&_pre]:!m-0 [&_pre]:!w-full [&_pre]:!rounded-none [&_pre]:!border-0 [&_pre]:!bg-transparent',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </Tabs.Root>
    </CodeBlockTabsContext.Provider>
  )
}

export function CodeBlockTabsList({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { activeValue, copied, onCopy } = useCodeBlockTabsContext()

  return (
    <div className="px-2 pt-1 pb-2" {...props}>
      <div className="flex items-center justify-between gap-3">
        <Tabs.List
          className={cn('flex flex-wrap items-center gap-1', className)}
        >
          {children}
        </Tabs.List>
        <button
          type="button"
          onClick={onCopy}
          disabled={!activeValue}
          className={cn(
            'inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm leading-none text-sand-11 transition-colors',
            'hover:bg-sand-3 hover:text-sand-12',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
        >
          {copied ? (
            <>
              <CheckIcon className="size-3.5" />
              Copied
            </>
          ) : (
            <>
              <CopyIcon className="size-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  )
}

interface CodeBlockTabsTriggerProps {
  children: React.ReactNode
  className?: string
  value: string
}

export function CodeBlockTabsTrigger({
  children,
  className,
  value,
}: CodeBlockTabsTriggerProps) {
  return (
    <Tabs.Tab
      value={value}
      className={cn(
        'cursor-pointer rounded-md px-2.5 py-1.5 text-sm leading-none text-sand-11',
        'hover:bg-sand-3 hover:text-sand-12',
        'data-[active]:bg-white data-[active]:text-sand-12 data-[active]:shadow-xs',
        'dark:data-[active]:bg-sand-2',
        className,
      )}
    >
      {children}
    </Tabs.Tab>
  )
}

interface CodeBlockTabProps {
  children: React.ReactNode
  className?: string
  value: string
}

export function CodeBlockTab({
  children,
  className,
  value,
}: CodeBlockTabProps) {
  const { registerPanel } = useCodeBlockTabsContext()
  const panelRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    registerPanel(value, panelRef.current)

    return () => {
      registerPanel(value, null)
    }
  }, [registerPanel, value])

  return (
    <Tabs.Panel
      value={value}
      className={cn(
        'mx-1 mb-1 rounded-[8px] bg-white shadow-xs outline-none dark:bg-sand-2',
        className,
      )}
    >
      <div ref={panelRef}>{children}</div>
    </Tabs.Panel>
  )
}
