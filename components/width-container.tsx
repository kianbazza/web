import { cn } from '@/lib/utils'

export function WidthContainer({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('w-full max-w-(--breakpoint-sm) mx-auto', className)}>
      {children}
    </div>
  )
}
