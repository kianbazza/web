'use client'

import { useAtom } from 'jotai'
import { motion } from 'motion/react'
import { BackLink } from '@/components/back-link'
import Container from '@/components/container'
import { H } from '@/components/h'
import {
  ProjectListItem,
  type TProjectListItem,
} from '@/components/project-list-item'
import ProjectVideoPreview from '@/components/project-video-preview'
import { WidthContainer } from '@/components/width-container'
import { hoveredProjectRowItem, isHoveringProjectsAtom } from '@/lib/atoms'

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
    videoSrc: '/projects/avelin/avelin-pre-launch-alpha.mp4',
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
    <WidthContainer>
      <Container className="font-mono mt-16 flex flex-col gap-8">
        <div
          data-state={isHoveringProjects ? 'projects-hover' : ''}
          className="flex flex-col gap-4 opacity-100 2xl:data-[state=projects-hover]:opacity-40 transition-opacity duration-200"
        >
          <BackLink
            href="/"
            label="[Index]"
            className="text-sand-7 -translate-x-2 mb-2"
          />
          <h1 className="tracking-[-0.05em]! text-3xl">Projects</h1>
          <p className="font-medium text-sand-10">
            The <H>craft</H> of creation — projects born from <H>curiosity</H>,
            built with <H>precision</H>, and shaped by an{' '}
            <H>obsession with detail</H>.
          </p>
          <div className="h-px w-full bg-sand-6 mt-4" />
        </div>
        <motion.div
          className="grid grid-cols-[max-content_max-content_max-content_minmax(0,1fr)] gap-x-6 items-center group/projects w-full 2xl:hover:scale-[102%] 2xl:transition-transform 2xl:ease-in-out"
          onMouseEnter={() => setHoveringProjects(true)}
          onMouseLeave={() => {
            setHoveringProjects(false)
            setHoveredProject(null)
          }}
        >
          {projects.map(({ year, status, title, url, videoSrc }) => (
            <ProjectListItem
              key={url}
              year={year}
              status={status}
              title={title}
              url={url}
              videoSrc={videoSrc}
            />
          ))}
        </motion.div>
        <ProjectVideoPreview projects={projects} />
      </Container>
    </WidthContainer>
  )
}
