import { Switch as SwitchPrimitive } from '@base-ui/react/switch'
import { cn } from '@/lib/utils'

export function Switch({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'relative flex h-4 p-0.75 w-6 rounded-full bg-sand-4 hover:bg-sand-6 data-[checked]:bg-blue-9 data-[checked]:hover:bg-blue-10 transition-colors duration-150 inset-shadow-sm hit-area-2 group/switch',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="aspect-square h-full rounded-full bg-sand-1 dark:bg-sand-12 data-[checked]:translate-x-2 transition-transform duration-150 group-active/switch:scale-90" />
    </SwitchPrimitive.Root>
  )
}
