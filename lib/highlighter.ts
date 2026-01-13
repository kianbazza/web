import { transformerNotationHighlight } from '@shikijs/transformers'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import type { JSX } from 'react'
import { Fragment } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'
import type { ThemeRegistrationRaw } from 'shiki'
import { createHighlighter, type Highlighter } from 'shiki'
import { oscuraMidnight } from './shiki/oscura-midnight'
import { oscuraSunrise } from './shiki/oscura-sunrise'

// Singleton highlighter instance
let highlighterInstance: Highlighter | null = null
let highlighterPromise: Promise<Highlighter> | null = null

/**
 * Get or create the singleton highlighter instance
 */
async function getHighlighter(): Promise<Highlighter> {
  if (highlighterInstance) {
    return highlighterInstance
  }

  if (highlighterPromise) {
    return highlighterPromise
  }

  highlighterPromise = createHighlighter({
    themes: [
      oscuraSunrise as unknown as ThemeRegistrationRaw,
      oscuraMidnight as unknown as ThemeRegistrationRaw,
    ],
    langs: ['typescript', 'javascript', 'tsx', 'jsx', 'json', 'bash', 'css'],
  })

  highlighterInstance = await highlighterPromise
  return highlighterInstance
}

export async function highlight(
  code: string,
  lang: string = 'tsx',
): Promise<JSX.Element> {
  const highlighter = await getHighlighter()
  const out = highlighter.codeToHast(code, {
    lang,
    themes: {
      light: 'oscura-sunrise',
      dark: 'oscura-midnight',
    },
    defaultColor: false,
    transformers: [transformerNotationHighlight()],
  })

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
  }) as JSX.Element
}
