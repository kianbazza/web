'use client'

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'
import { CheckIcon } from 'lucide-react'
import type * as React from 'react'
import { cn } from '@/lib/utils'

export function Checkbox({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'relative inline-flex size-4 shrink-0 items-center justify-center rounded-[5px] border border-sand-7 bg-white text-sand-11 shadow-xs transition-colors ease-out hover:duration-0 duration-150 outline-none',
        'hover:border-sand-10 focus-visible:ring-4 focus-visible:ring-blue-5/40',
        'data-[checked]:border-sand-12 data-[checked]:bg-sand-12 data-[checked]:text-white',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <CheckIcon className="size-3" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
