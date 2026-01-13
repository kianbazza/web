/**
 * Server-only utilities for reading source code files
 */

import 'server-only'

import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Read source code from a file path relative to the project root
 */
export function getSourceCode(filePath: string): string | null {
  try {
    const fullPath = join(process.cwd(), filePath)
    return readFileSync(fullPath, 'utf-8')
  } catch {
    return null
  }
}

/**
 * Get the language from a file path for syntax highlighting
 */
export function getLanguageFromPath(filePath: string): string {
  const ext = filePath.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'ts':
      return 'typescript'
    case 'tsx':
      return 'tsx'
    case 'js':
      return 'javascript'
    case 'jsx':
      return 'jsx'
    case 'json':
      return 'json'
    case 'css':
      return 'css'
    case 'sh':
    case 'bash':
      return 'bash'
    default:
      return 'typescript'
  }
}
