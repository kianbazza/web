'use client'

import { Media, type MediaProps } from '@/app/craft/_/craft-media'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'

export function Frame({
  className,
  children,
  query = '(pointer:none), (pointer:coarse)',
  mediaProps,
}: React.ComponentPropsWithRef<'div'> & {
  query?: string
  mediaProps?: MediaProps
}) {
  const showMedia = useMediaQuery(query || '')

  console.log('showMedia:', showMedia)

  if (showMedia && mediaProps) {
    console.log('returning media:', mediaProps)
    return (
      <Media
        wrapperClassName="w-full max-w-(--breakpoint-sm) h-40 overflow-clip border border-sand-5 rounded-xl z-10"
        {...mediaProps}
      />
    )
  }

  return (
    <div
      className={cn(
        'w-full max-w-(--breakpoint-sm) h-40 flex flex-col justify-center items-center bg-white dark:bg-sand-2 border border-sand-5 rounded-xl gap-12 relative',
        className,
      )}
    >
      {children}
    </div>
  )
}
