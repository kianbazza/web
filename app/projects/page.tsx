'use client'

import Container from '@/components/container'
import {
  ProjectListItem,
  type TProjectListItem,
} from '@/components/project-list-item'
import ProjectVideoPreview from '@/components/project-video-preview'
import { hoveredProjectRowItem, isHoveringProjectsAtom } from '@/lib/atoms'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import type { HTMLAttributes } from 'react'

const H = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('text-sand-12 font-bold', className)} {...props}>
    {children}
  </span>
)

const projects: TProjectListItem[] = [
  {
    year: '2025',
    status: 'in-progress',
    title: 'Kian Bazarjani',
    url: 'bazza.dev',
    videoSrc: '/projects/kian-bazarjani/video-sm.mp4',
  },
  {
    year: '2025',
    status: 'in-progress',
    title: 'Avelin',
    url: 'avelin.app',
    videoSrc: '/projects/avelin/video-sm.mp4',
  },
  {
    year: '2023',
    status: 'done',
    title: 'Optimal Enchant Tool',
    url: 'oet.bazza.dev',
    videoSrc: '/projects/oet/video-sm.mp4',
  },
]

export default function Page() {
  const [isHoveringProjects, setHoveringProjects] = useAtom(
    isHoveringProjectsAtom,
  )
  const [_, setHoveredProject] = useAtom(hoveredProjectRowItem)

  return (
    <Container className="font-mono mt-16 flex flex-col gap-8">
      <div
        data-state={isHoveringProjects ? 'projects-hover' : ''}
        className="flex flex-col gap-4 opacity-100 2xl:data-[state=projects-hover]:opacity-40 transition-opacity duration-200"
      >
        <h1 className="!tracking-[-0.05em] text-3xl">Projects</h1>
        <p className="font-medium text-sand-10">
          The <H>craft</H> of creation — projects born from <H>curiosity</H>,
          built with <H>precision</H>, and shaped by an{' '}
          <H>obsession with detail</H>.
        </p>
        <div className="h-[1px] w-full bg-sand-6 mt-4" />
      </div>
      <div
        className="grid grid-cols-[max-content_max-content_max-content_minmax(0,_1fr)] gap-x-6 items-center group/projects w-full 2xl:hover:scale-[102%] 2xl:transition-transform 2xl:ease-in-out"
        onMouseEnter={() => setHoveringProjects(true)}
        onMouseLeave={() => {
          setHoveringProjects(false)
          setHoveredProject(null)
        }}
      >
        <ProjectListItem
          // id="kian-bazarjani"
          year="2025"
          status="in-progress"
          title="Kian Bazarjani"
          url="bazza.dev"
          videoSrc="/projects/kian-bazarjani/video-sm.mp4"
        />
        <ProjectListItem
          // id="avelin"
          year="2025"
          status="in-progress"
          title="Avelin"
          url="avelin.app"
          videoSrc="/projects/avelin/video-sm.mp4"
        />
        <ProjectListItem
          // id="oet"
          year="2023"
          status="done"
          title="Optimal Enchant Tool"
          url="oet.bazza.dev"
          videoSrc="/projects/oet/video-sm.mp4"
        />
      </div>
      <ProjectVideoPreview projects={projects} />
    </Container>
  )
}
