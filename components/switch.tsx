import { Switch as SwitchPrimitive } from '@base-ui-components/react/switch'
import { cn } from '@/lib/utils'

export function Switch({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        'relative flex h-4 p-0.75 w-7 rounded-full bg-sand-4 data-[checked]:bg-blue-9 transition-colors duration-150 inset-shadow-sm',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="aspect-square h-full rounded-full bg-sand-1 dark:bg-sand-12 data-[checked]:translate-x-3 transition-transform duration-150" />
    </SwitchPrimitive.Root>
  )
}
