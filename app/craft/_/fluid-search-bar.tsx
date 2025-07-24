'use client'

import * as Popover from '@radix-ui/react-popover'
import { SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function FluidSearchBar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
      } else if (event.key === 'f') {
        event.preventDefault()
        setOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  console.log('open', open)

  return (
    <div className="h-14 bg-gray-2 w-full flex items-center justify-center rounded-t-xl">
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger className="w-[300px] h-10" />
        <Popover.Portal forceMount>
          <Popover.Content
            sideOffset={-40}
            className={cn(
              'font-sans flex items-start gap-0 border border-gray-4 relative bg-white dark:bg-black overflow-clip',

              'transition-[width,height,border-radius,padding,transform,box-shadow] duration-150 ease-out origin-top',
              {
                'w-[260px] h-9 rounded-lg px-2 py-1.5 translate-y-0 shadow-none':
                  !open,
                'w-[350px] h-[348px] rounded-xl px-4 py-1.5 -translate-y-1 shadow-md':
                  open,
              },
            )}
          >
            <div
              className={cn(
                'flex items-center gap-2 w-full relative h-9 border border-transparent',
                'transition-[margin] duration-150 ease-out',
                {
                  '-mt-[7px]': !open,
                  '-mt-[2px]': open,
                },
              )}
            >
              <SearchIcon
                className={cn(
                  'text-gray-10 stroke-[2.25px]',
                  'transition-[height,width] duration-150 ease-out',
                  {
                    'size-4': !open,
                    'size-[18px]': open,
                  },
                )}
              />
              <input
                className="placeholder:text-sm placeholder:text-gray-8 outline-hidden text-sm bg-white dark:bg-black"
                placeholder="Search keyword..."
              />
              <div
                className={cn(
                  'bg-gray-3 text-gray-10 font-medium h-5 text-[11px] rounded-[4px] absolute top-[50%] translate-y-[-50%] overflow-clip',
                  'transition-[width,right,margin] duration-150 ease-out origin-left',
                  '*:transition-[opacity,filter] *:duration-150 *:ease-out',
                  {
                    'w-5 -right-0.5': !open,
                    'w-9 right-0': open,
                  },
                )}
              >
                <span
                  className={cn(
                    'absolute top-[50%] translate-y-[-50%] right-[7px]',
                    {
                      'opacity-100 blur-none': !open,
                      'opacity-0 blur-xs': open,
                    },
                  )}
                >
                  F
                </span>
                <span
                  className={cn(
                    'absolute top-[50%] translate-y-[-50%] right-[9px]',
                    {
                      'opacity-0 blur-xs': !open,
                      'opacity-100 blur-none': open,
                    },
                  )}
                >
                  Esc
                </span>
              </div>
            </div>
            <div
              className={cn(
                'flex flex-col',
                'h-[300px] w-[350px] absolute top-9 left-[50%] translate-x-[-50%]',
                'transition-[opacity,filter,transform] duration-150 ease-out',
                {
                  ' translate-y-0 opacity-0 blur-[2px]': !open,
                  'translate-y-1 opacity-100 blur-[0px]': open,
                },
              )}
            >
              <div className="w-full h-px bg-gray-4 mb-4" />
              <span className="text-xs font-medium text-gray-10 px-4 mb-2">
                Similar keywords
              </span>
              <div className="flex flex-col gap-2 px-2">
                <div className="flex items-center justify-between h-9 w-full rounded-lg hover:bg-gray-3 px-2">
                  <span className="font-medium text-sm">content creation</span>
                </div>
                <div className="flex items-center justify-between h-9 w-full rounded-lg hover:bg-gray-3 px-2">
                  <span className="font-medium text-sm">content creation</span>
                </div>
                <div className="flex items-center justify-between h-9 w-full rounded-lg hover:bg-gray-3 px-2">
                  <span className="font-medium text-sm">content creation</span>
                </div>
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}
