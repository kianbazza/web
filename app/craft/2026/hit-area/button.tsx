import { cn } from '@/lib/utils'

export const Button = ({
  className,
  children,
  ...props
}: React.ComponentProps<'button'>) => {
  return (
    <button
      data-slot="button"
      className={cn(
        'bg-sand-12 text-sand-1 text-sm font-medium rounded-lg h-9 px-4 font-sans flex items-center gap-2',
        'hover:bg-sand-12/85',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
