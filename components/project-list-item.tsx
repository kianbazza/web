'use client'

import {
  BacklogStatusIcon,
  InProgressStatusIcon,
  DoneStatusIcon,
} from '@/lib/icons'
import { cn } from '@/lib/utils'
import { useRef } from 'react'

export function ProjectListItem({
  year,
  status,
  title,
  url,
  videoSrc,
}: {
  year: string
  status: 'backlog' | 'in-progress' | 'done'
  title: string
  url: string
  videoSrc: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div
      className={cn(
        'grid grid-cols-subgrid col-span-4 items-center py-2 relative group/row',
        'transition-all duration-200 group-hover/projects:opacity-40 hover:!opacity-100 hover:bg-sand-2 border border-transparent hover:border-sand-3 px-4 rounded-md',
      )}
      onMouseEnter={() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0 // Reset the video
          videoRef.current.play() // Start playing
        }
      }}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause() // Pause when not hovered
          videoRef.current.currentTime = 0 // Reset to beginning
        }
      }}
    >
      <span className="font-medium text-sand-9">{year}</span>
      <span className="flex items-center gap-2">
        {status === 'backlog' && <BacklogStatusIcon />}
        {status === 'in-progress' && <InProgressStatusIcon />}
        {status === 'done' && <DoneStatusIcon />}
        <span className="font-medium text-sand-12">{title}</span>
      </span>
      <span className="font-medium">{url}</span>
      <div className="absolute invisible group-hover/row:visible hover:opacity-0 transition-none h-[400px] rounded-md drop-shadow-lg border border-sand-4 bg-[url(/projects/avelin/thumbnail.png)] bg-cover aspect-video right-[-70%] top-[50%] translate-y-[-50%] overflow-hidden">
        <div className="w-full h-full overflow-hidden">
          <video
            src={videoSrc}
            ref={(ref) => {
              if (ref) videoRef.current = ref
            }}
            playsInline
            loop
            muted
          />
        </div>
      </div>
    </div>
  )
}
