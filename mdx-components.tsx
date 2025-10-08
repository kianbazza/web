import type { MDXComponents } from 'mdx/types'
import { cn } from './lib/utils'

const components = {
  h2: ({ children }) => <h2 className="font-medium pt-8">{children}</h2>,
  p: ({ children }) => <p className="text-sand-12/80">{children}</p>,
  pre: ({ children }) => (
    <pre
      className={cn(
        'bg-white dark:bg-sand-2 rounded-md px-1.5 py-0.5 -mx-0.5 text-[15px] border inset-shadow-xs max-w-full overflow-scroll',
        '[&_code]:bg-transparent [&_code]:rounded-none [&_code]:px-0 [&_code]:py-0 [&_code]:text-inherit [&_code]:border-none [&_code]:inset-shadow-none',
      )}
    >
      {children}
    </pre>
  ),
  code: ({ children }) => (
    <code className="bg-sand-2 rounded-md px-1.5 py-0.5 -mx-0.5 text-[15px] border inset-shadow-xs !font-mono">
      {children}
    </code>
  ),
  Frame: ({ className, children }) => (
    <div
      className={cn(
        'w-full max-w-(--breakpoint-sm) h-40 flex flex-col justify-center items-center bg-white dark:bg-sand-2 border border-sand-5 rounded-xl gap-12 relative',
        className,
      )}
    >
      {children}
    </div>
  ),
} satisfies MDXComponents

export function useMDXComponents(): MDXComponents {
  return components
}
