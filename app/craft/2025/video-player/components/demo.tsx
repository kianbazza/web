import { Suspense } from 'react'
import { highlight } from '@/lib/highlighter'
import { getLanguageFromPath, getSourceCode } from '@/lib/source-code.server'
import { DemoClient } from './demo.client'

export interface SourceFile {
  /** Display name for the tab, e.g. "index.tsx" */
  name: string
  /** Path to the source file relative to project root */
  path: string
}

interface DemoProps {
  children: React.ReactNode
  /** Array of source files to display */
  files: SourceFile[]
}

/** Transform import paths for display purposes */
function transformImports(source: string): string {
  return (
    source
      // Transform VideoPlayer component import
      .replace(
        /from ['"]@\/app\/craft\/2025\/video-player\/component['"]/g,
        "from '@bazza-ui/react/video-player'",
      )
      // Transform relative icon imports to just './icons'
      .replace(/from ['"]\.\/icons['"]/g, "from './icons'")
  )
}

export async function Demo({ children, files }: DemoProps) {
  const processedFiles = await Promise.all(
    files.map(async (file) => {
      const rawSource = getSourceCode(file.path)
      const source = rawSource ? transformImports(rawSource) : null
      const lang = getLanguageFromPath(file.path)
      const highlighted = source ? await highlight(source, lang) : null

      return {
        name: file.name,
        path: file.path,
        source: source ?? '',
        highlighted,
      }
    }),
  )

  return (
    <Suspense fallback={<DemoSkeleton files={files}>{children}</DemoSkeleton>}>
      <DemoClient files={processedFiles}>{children}</DemoClient>
    </Suspense>
  )
}

function DemoSkeleton({
  files,
  children,
}: {
  files: SourceFile[]
  children: React.ReactNode
}) {
  return (
    <div className="border border-sand-6 rounded-lg overflow-hidden">
      <div className="p-8 flex items-center justify-center min-h-[300px] bg-sand-2">
        {children}
      </div>
      <div className="flex items-center justify-between px-4 py-3 border-t border-sand-6 bg-sand-1">
        <span className="text-sm font-medium text-sand-12">
          {files[0]?.name ?? 'Loading...'}
        </span>
        <span className="text-sm text-sand-11">Loading...</span>
      </div>
    </div>
  )
}
