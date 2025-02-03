'use client'

import { hoveredProjectRowItem } from '@/lib/atoms'
import {
  BacklogStatusIcon,
  DoneStatusIcon,
  InProgressStatusIcon,
} from '@/lib/icons'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useRef } from 'react'

export type TProjectListItem = {
  year: string
  status: 'backlog' | 'in-progress' | 'done'
  title: string
  url: string
  videoSrc: string
}

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

  const [hoveredProject, setHoveredProject] = useAtom(hoveredProjectRowItem)
  const isActive = useMemo(
    () => hoveredProject?.title === title,
    [hoveredProject, title],
  )

  useEffect(() => {
    if (!videoRef.current) return

    if (isActive) {
      // console.log('PLAYING', title)
      videoRef.current.currentTime = 0 // Reset the video
      videoRef.current.play() // Start playing
    } else {
      // console.log('RESETTING', title)
      videoRef.current.pause() // Pause when not hovered
      videoRef.current.currentTime = 0 // Reset to beginning
    }
  }, [isActive])

  return (
    <motion.div
      className={cn(
        'grid grid-cols-subgrid col-span-4 items-center py-2 relative group/row',
        'transition-all duration-200 group-hover/projects:opacity-40 hover:!opacity-100 hover:bg-sand-2 border border-transparent hover:border-sand-3 px-4 rounded-md',
      )}
      onMouseEnter={() => {
        setHoveredProject({
          year,
          status,
          title,
          url,
          videoSrc,
        })
      }}
    >
      <span className="font-medium text-sand-9">{year}</span>
      <span className="flex items-center gap-3">
        {status === 'backlog' && <BacklogStatusIcon />}
        {status === 'in-progress' && <InProgressStatusIcon />}
        {status === 'done' && <DoneStatusIcon />}
        <span className="font-medium text-sand-12">{title}</span>
      </span>
      <span className="font-medium hidden sm:block">{url}</span>
      <AnimatePresence mode="wait">
        {hoveredProject?.title === title && (
          <motion.div
            id="video-preview"
            layoutId="video-preview"
            layout="position"
            className="border-sand-4 overflow-hidden bg-sand-1 hidden 2xl:flex flex-col gap-2"
            style={{
              zIndex: 20,
              position: 'absolute',
              top: '-100px',
              left: '80%',
              height: 'auto',
              width: 'calc(( (100vw - 768px) / 2) + 100px)',
              aspectRatio: '16/9',
              borderWidth: '1px',
              borderRadius: 6,
              boxShadow:
                '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div className="w-full h-full overflow-hidden">
              <motion.video
                initial={{ filter: 'blur(4px)' }}
                animate={{ filter: 'blur(0px)' }}
                exit={{ filter: 'blur(4px)' }}
                src={videoSrc}
                ref={(ref) => {
                  if (ref) videoRef.current = ref
                }}
                playsInline
                loop
                muted
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
