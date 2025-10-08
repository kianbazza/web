import { cn } from '@/lib/utils'

export function WidthContainer({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn(
        'w-full max-w-[min(var(--breakpoint-sm),calc(100svw-calc(var(--spacing)*8)))] mx-auto',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
