'use client'

import {
  CheckIcon,
  CopyIcon,
  RotateCcwIcon,
  SaveIcon,
  XIcon,
} from 'lucide-react'
import { useEffect, useId, useMemo, useState } from 'react'
import { H } from '@/components/h'
import { WidthContainer } from '@/components/width-container'
import { cn } from '@/lib/utils'

const MONOSPACE_UPPERCASE_START = 0x1d670
const MONOSPACE_LOWERCASE_START = 0x1d68a
const MONOSPACE_DIGIT_START = 0x1d7f6
const SAVED_LOCAL_STORAGE_KEY = 'mono-generator-saved-items'
const HISTORY_LOCAL_STORAGE_KEY = 'mono-generator-history-items'
const MAX_HISTORY_ITEMS = 24

const DEFAULT_INPUT = 'useFilters()'

type SavedItem = {
  id: string
  input: string
  output: string
  createdAt: number
}

type HistoryItem = SavedItem

function createSavedItemId() {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function parseStoredItems(value: string | null) {
  if (!value) {
    return []
  }

  try {
    const parsed = JSON.parse(value)

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter((item): item is SavedItem => {
      return (
        typeof item === 'object' &&
        item !== null &&
        typeof item.id === 'string' &&
        typeof item.input === 'string' &&
        typeof item.output === 'string' &&
        typeof item.createdAt === 'number'
      )
    })
  } catch {
    return []
  }
}

function prependDedupedItem<T extends { input: string; output: string }>(
  items: T[],
  nextItem: T,
) {
  const withoutDuplicates = items.filter(
    (item) => item.input !== nextItem.input || item.output !== nextItem.output,
  )

  return [nextItem, ...withoutDuplicates]
}

function toTypewriterSymbols(value: string) {
  const convertedCharacters: string[] = []

  for (const character of value) {
    const codePoint = character.codePointAt(0)

    if (codePoint === undefined) {
      continue
    }

    if (codePoint >= 0x41 && codePoint <= 0x5a) {
      convertedCharacters.push(
        String.fromCodePoint(MONOSPACE_UPPERCASE_START + (codePoint - 0x41)),
      )
      continue
    }

    if (codePoint >= 0x61 && codePoint <= 0x7a) {
      convertedCharacters.push(
        String.fromCodePoint(MONOSPACE_LOWERCASE_START + (codePoint - 0x61)),
      )
      continue
    }

    if (codePoint >= 0x30 && codePoint <= 0x39) {
      convertedCharacters.push(
        String.fromCodePoint(MONOSPACE_DIGIT_START + (codePoint - 0x30)),
      )
      continue
    }

    convertedCharacters.push(character)
  }

  return convertedCharacters.join('')
}

export default function Page() {
  const inputId = useId()
  const [input, setInput] = useState(DEFAULT_INPUT)
  const [hasEditedInput, setHasEditedInput] = useState(false)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>(
    'idle',
  )
  const [saveState, setSaveState] = useState<'idle' | 'saved'>('idle')
  const [savedItems, setSavedItems] = useState<SavedItem[]>([])
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([])
  const [hasLoadedStoredItems, setHasLoadedStoredItems] = useState(false)

  const output = useMemo(() => toTypewriterSymbols(input), [input])

  useEffect(() => {
    const parsedSavedItems = parseStoredItems(
      window.localStorage.getItem(SAVED_LOCAL_STORAGE_KEY),
    )
    const parsedHistoryItems = parseStoredItems(
      window.localStorage.getItem(HISTORY_LOCAL_STORAGE_KEY),
    )

    setSavedItems(parsedSavedItems)
    setHistoryItems(parsedHistoryItems)
    setHasLoadedStoredItems(true)
  }, [])

  useEffect(() => {
    if (!hasLoadedStoredItems) {
      return
    }

    window.localStorage.setItem(
      SAVED_LOCAL_STORAGE_KEY,
      JSON.stringify(savedItems),
    )
    window.localStorage.setItem(
      HISTORY_LOCAL_STORAGE_KEY,
      JSON.stringify(historyItems),
    )
  }, [hasLoadedStoredItems, historyItems, savedItems])

  useEffect(() => {
    if (!hasLoadedStoredItems || !hasEditedInput || !output) {
      return
    }

    const timeout = window.setTimeout(() => {
      const nextHistoryItem: HistoryItem = {
        id: createSavedItemId(),
        input,
        output,
        createdAt: Date.now(),
      }

      setHistoryItems((currentItems) => {
        return prependDedupedItem(currentItems, nextHistoryItem).slice(
          0,
          MAX_HISTORY_ITEMS,
        )
      })
    }, 350)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [hasEditedInput, hasLoadedStoredItems, input, output])

  useEffect(() => {
    if (copyState === 'idle') {
      return
    }

    const timeout = window.setTimeout(() => {
      setCopyState('idle')
    }, 1800)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [copyState])

  useEffect(() => {
    if (saveState === 'idle') {
      return
    }

    const timeout = window.setTimeout(() => {
      setSaveState('idle')
    }, 1800)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [saveState])

  async function handleCopy() {
    if (!output) {
      return
    }

    try {
      await navigator.clipboard.writeText(output)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }

  function handleReset() {
    setInput(DEFAULT_INPUT)
    setHasEditedInput(false)
    setCopyState('idle')
    setSaveState('idle')
  }

  function handleSave() {
    if (!output) {
      return
    }

    const nextSavedItem: SavedItem = {
      id: createSavedItemId(),
      input,
      output,
      createdAt: Date.now(),
    }

    setSavedItems((currentItems) =>
      prependDedupedItem(currentItems, nextSavedItem),
    )

    setSaveState('saved')
  }

  function handleRemoveSavedItem(id: string) {
    setSavedItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    )
  }

  function handleRemoveHistoryItem(id: string) {
    setHistoryItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    )
  }

  return (
    <WidthContainer>
      <div className="relative mt-16 flex w-full flex-col gap-8">
        <div className="pointer-events-none absolute inset-x-0 top-4 -z-10 h-56 rounded-[2rem] bg-gradient-to-b from-blue-3/50 via-sand-2 to-transparent blur-2xl" />
        <div className="mx-auto flex w-full max-w-(--breakpoint-sm) flex-col gap-4">
          <h1 className="tracking-[-0.05em]! text-3xl">Monospace Generator</h1>
          <p className="font-medium text-sand-10">
            Type your text and instantly convert it to <H>typewriter</H> symbols
            like 𝚝𝚢𝚙𝚎𝚠𝚛𝚒𝚝𝚎𝚛.
          </p>
        </div>
        <div className="h-px w-full bg-sand-6" />
        <div className="mx-auto flex w-full max-w-(--breakpoint-sm) flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor={inputId}
              className="text-sm font-medium text-sand-11"
            >
              Input
            </label>
            <textarea
              id={inputId}
              value={input}
              onChange={(event) => {
                setHasEditedInput(true)
                setInput(event.target.value)
              }}
              rows={6}
              placeholder="Type text here"
              className="min-h-36 w-full resize-y rounded-2xl border border-sand-6 bg-sand-2/70 px-4 py-3 font-sans text-[18px] leading-relaxed outline-hidden transition-colors focus:border-sand-8"
            />
            <div className="flex items-center justify-between text-xs text-sand-10">
              <span>
                {input.length} character{input.length === 1 ? '' : 's'}
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-sand-3 hover:text-sand-11"
              >
                <RotateCcwIcon className="size-3.5" />
                Reset
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-medium text-sand-11">Output</h2>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!output}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-md justify-center size-7 text-xs font-medium',
                    'text-sand-11 bg-transparent',
                    'hover:text-sand-12 hover:bg-sand-3',
                    'hover:transition-none transition-colors duration-150 ease-out',
                  )}
                >
                  {saveState === 'saved' ? (
                    <CheckIcon className="size-3.5" />
                  ) : (
                    <SaveIcon className="size-3.5" />
                  )}
                  {/*{saveState === 'saved' ? 'Saved' : 'Save'}*/}
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!output}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-md justify-center size-7 text-xs font-medium',
                    'text-sand-11 bg-transparent border',
                    'hover:text-sand-12 hover:bg-sand-3',
                    'hover:transition-none transition-colors duration-150 ease-out',
                  )}
                >
                  {copyState === 'copied' ? (
                    <CheckIcon className="size-3.5" />
                  ) : (
                    <CopyIcon className="size-3.5" />
                  )}
                  {/*{copyState === 'copied'
                    ? 'Copied'
                    : copyState === 'failed'
                      ? 'Copy failed'
                      : 'Copy text'}*/}
                </button>
              </div>
            </div>

            <div
              className={cn(
                'min-h-36 rounded-2xl border px-4 py-3 transition-colors',
                output
                  ? 'border-sand-6 bg-sand-2/40 text-sand-12'
                  : 'border-sand-5 bg-sand-2/20 text-sand-9',
              )}
            >
              <p className="whitespace-pre-wrap break-words text-xl leading-relaxed tracking-normal">
                {output || '𝚃𝚢𝚙𝚎 𝚜𝚘𝚖𝚎 𝚝𝚎𝚡𝚝 𝚝𝚘 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚎 𝚢𝚘𝚞𝚛 𝚘𝚞𝚝𝚙𝚞𝚝.'}
              </p>
            </div>
            <p className="text-xs text-sand-10">
              Letters and numbers are converted. Spaces, punctuation, and emojis
              stay the same.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-medium text-sand-11">Saved</h2>
                <span className="text-xs text-sand-10">
                  {savedItems.length} item{savedItems.length === 1 ? '' : 's'}
                </span>
              </div>

              {savedItems.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-sand-6 bg-sand-2/20 px-4 py-3 text-sm text-sand-10">
                  Save an output and it will show up here.
                </div>
              ) : (
                <ul className="flex flex-col gap-2">
                  {savedItems.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-2xl border border-sand-6 bg-sand-2/40 px-3 py-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-sans text-xs text-sand-10">
                            {item.input || 'Empty input'}
                          </p>
                          <p className="mt-1 whitespace-pre-wrap break-words text-lg leading-relaxed tracking-normal">
                            {item.output}
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label="Remove saved item"
                          onClick={() => {
                            handleRemoveSavedItem(item.id)
                          }}
                          className="rounded-md p-1.5 text-sand-10 transition-colors hover:bg-sand-3 hover:text-sand-11"
                        >
                          <XIcon className="size-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-medium text-sand-11">History</h2>
                <span className="text-xs text-sand-10">
                  {historyItems.length} item
                  {historyItems.length === 1 ? '' : 's'}
                </span>
              </div>

              {historyItems.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-sand-6 bg-sand-2/20 px-4 py-3 text-sm text-sand-10">
                  Your recent conversions will appear here.
                </div>
              ) : (
                <ul className="flex flex-col gap-2">
                  {historyItems.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-2xl border border-sand-6 bg-sand-2/30 px-3 py-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-sans text-xs text-sand-10">
                            {item.input || 'Empty input'}
                          </p>
                          <p className="mt-1 whitespace-pre-wrap break-words text-base leading-relaxed tracking-normal text-sand-11">
                            {item.output}
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label="Remove history item"
                          onClick={() => {
                            handleRemoveHistoryItem(item.id)
                          }}
                          className="rounded-md p-1.5 text-sand-10 transition-colors hover:bg-sand-3 hover:text-sand-11"
                        >
                          <XIcon className="size-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </WidthContainer>
  )
}
