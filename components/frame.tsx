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

export const FrameRoot = ({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'w-full max-w-(--breakpoint-sm) border border-sand-3 rounded-xl z-10',
        'overflow-clip',
        // 'flex flex-col justify-center items-center bg-white dark:bg-sand-2',
        'flex flex-col bg-sand-2',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const FrameDisplay = ({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'w-[calc(100%-8px)] rounded-t-[8px] rounded-b-2xl p-12 mx-1 my-1 shadow-xs',
        'flex flex-col justify-center items-center bg-white dark:bg-sand-3',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const FrameCode = ({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        // 'border-t border-sand-5 rounded-b-xl',
        '[&>pre]:bg-sand-2 [&>pre]:rounded-none [&>pre]:border-none',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
