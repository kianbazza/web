'use client'

import { Button } from '@base-ui/react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ReplayIcon } from '../../2025/video-player/examples/linear-motion/icons'
import { Signature, type SignatureProps } from './signature'

export interface SignatureDemoProps extends Omit<SignatureProps, 'className'> {
  className?: string
  signatureClassName?: string
}

export function SignatureDemo({
  className,
  signatureClassName,
  ...signatureProps
}: SignatureDemoProps) {
  const [replayKey, setReplayKey] = useState(0)

  return (
    <div
      className={cn(
        'w-full sm:w-(--breakpoint-sm) rounded-xl border border-sand-5 p-6 sm:p-16',
        'flex flex-col items-center relative',
        className,
      )}
    >
      <Signature
        key={replayKey}
        className={cn('stroke-sand-12', signatureClassName)}
        {...signatureProps}
      />
      <Button
        onClick={() => setReplayKey((value) => value + 1)}
        className={cn(
          'absolute top-4 right-4',
          'flex items-center justify-center size-8',
          'bg-transparent hover:bg-sand-3 rounded-md',
          'hover:transition-none transition-colors text-sand-10 hover:text-sand-12 duration-150',
        )}
      >
        <ReplayIcon />
      </Button>
    </div>
  )
}
