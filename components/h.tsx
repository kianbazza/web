import { cn } from '@/lib/utils'

export const H = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('text-sand-12 font-semibold', className)} {...props}>
    {children}
  </span>
)
