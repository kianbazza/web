import type { MDXComponents } from 'mdx/types'
import { Frame } from './components/frame'
import { cn } from './lib/utils'

const components = {
  h1: ({ children, className, ...props }) => (
    <h1 className={cn('text-3xl font-medium pt-10', className)} {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, className, ...props }) => (
    <h2 className={cn('text-2xl font-medium pt-8', className)} {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, className, ...props }) => (
    <h3 className={cn('text-xl font-medium pt-6', className)} {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, className, ...props }) => (
    <h4 className={cn('text-lg font-medium pt-5', className)} {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, className, ...props }) => (
    <h5 className={cn('text-base font-medium pt-4', className)} {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, className, ...props }) => (
    <h6
      className={cn('text-sm font-medium pt-4 text-sand-11', className)}
      {...props}
    >
      {children}
    </h6>
  ),
  p: ({ children }) => (
    <p className="text-sand-12/80 !font-sans !tabular-nums leading-7 font-[420]">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="text-sand-12/80 font-serif font-normal text-[18px]">
      {children}
    </em>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 pl-6 border-sand-6">
      {children}
    </blockquote>
  ),
  a: ({ children, className, ...props }) => (
    <a
      className={cn(
        'underline underline-offset-2 hover:text-sand-12',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  ),
  pre: ({ children, className, ...props }) => (
    <pre
      className={cn(
        'bg-white dark:bg-sand-2 overflow-scroll w-full rounded-lg border [&_code]:!text-sm py-3',
        '[&_code]:bg-transparent [&_code]:rounded-none [&_code]:px-0 [&_code]:py-0 [&_code]:text-inherit [&_code]:border-none [&_code]:inset-shadow-none',
        '[&>code]:!w-full [&>code]:flex [&>code]:flex-col',
        '[&_code_span.line]:px-4 [&_code_span.line]:h-6 [&_code_span.line]:flex [&_code_span.line]:items-center',
        '[&_code_span.line.highlighted]:bg-sand-3/75 [&_code_span.line.highlighted]:relative [&_code_span.line.highlighted]:before:absolute [&_code_span.line.highlighted]:before:inset-0 [&_code_span.line.highlighted]:before:border-l-3 [&_code_span.line.highlighted]:before:border-l-sand-7',
        className,
      )}
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ children, className, ...props }) => (
    <code
      className={cn(
        'bg-sand-2 rounded-md px-1 py-0.5 text-[14px] border inset-shadow-xs !font-mono',
        className,
      )}
      {...props}
    >
      {children}
    </code>
  ),
  table: ({ children, className, ...props }) => (
    <div className="overflow-x-auto">
      <table
        className={cn('w-full font-sans text-sm border-collapse', className)}
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, className, ...props }) => (
    <thead className={cn('border-b border-sand-6', className)} {...props}>
      {children}
    </thead>
  ),
  th: ({ children, className, ...props }) => (
    <th
      className={cn('text-left font-medium py-2 pr-4 text-sand-11', className)}
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, className, ...props }) => (
    <td className={cn('py-2 pr-4 text-sand-12/80', className)} {...props}>
      {children}
    </td>
  ),
  tr: ({ children, className, ...props }) => (
    <tr
      className={cn('border-b border-sand-4 last:border-b-0', className)}
      {...props}
    >
      {children}
    </tr>
  ),
  Frame,
} satisfies MDXComponents

export function useMDXComponents(): MDXComponents {
  return components
}
