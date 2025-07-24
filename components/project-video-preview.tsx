'use client'

import { useAtom } from 'jotai'
import { animate } from 'motion'
import { useEffect, useRef } from 'react'
import { hoveredProjectRowItem } from '@/lib/atoms'
import type { TProjectListItem } from './project-list-item'

export default function ProjectVideoPreview({
  projects,
}: {
  projects: TProjectListItem[]
}) {
  return (
    <div className="2xl:hidden">
      {projects.map((p) => (
        <VideoPreview key={p.title} project={p} />
      ))}
    </div>
  )
}

function VideoPreview({ project }: { project: TProjectListItem }) {
  const [hoveredProject] = useAtom(hoveredProjectRowItem)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current && hoveredProject) {
      if (hoveredProject?.title === project.title) {
        animate(
          videoRef.current,
          {
            // opacity: [0, 1],
            filter: ['blur(2px)', 'blur(0px)'],
          },
          { duration: 0.5, ease: 'easeInOut' },
        )
        videoRef.current.currentTime = 0
        videoRef.current.play()
      } else {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }
  }, [hoveredProject, project])

  return (
    <div
      key={project.title}
      data-state={hoveredProject?.title === project.title ? 'active' : ''}
      className="hidden data-[state=active]:inline-block lg:hidden bg-sand-1 border border-sand-4 rounded-md shadow-lg overflow-hidden"
    >
      <video
        data-state={hoveredProject?.title === project.title ? 'active' : ''}
        className="w-full h-full"
        src={project.videoSrc}
        ref={(ref) => {
          if (ref) videoRef.current = ref
        }}
        autoPlay
        playsInline
        loop
        muted
      />
    </div>
  )
}
