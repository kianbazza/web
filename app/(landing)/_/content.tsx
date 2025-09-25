import type { JSX } from 'react'
import {
  AvelinIcon,
  BazzaLabsIcon,
  BazzaUIIcon,
  CanadaIcon,
  FusedIcon,
  NavatticIcon,
  ProfoundIcon,
  XIcon,
} from '@/lib/icons'

type ConnectSectionItem = {
  key: string
  icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  value: string
  href: string
}

const connect: Array<ConnectSectionItem> = [
  {
    key: 'X',
    icon: XIcon,
    value: '@kianbazza',
    href: 'https://x.com/kianbazza',
  },
  {
    key: 'Mail',
    value: 'kian@bazza.dev',
    href: 'mailto:kian@bazza.dev',
  },
  {
    key: 'GitHub',
    value: '@kianbazza',
    href: 'https://github.com/kianbazza',
  },
  {
    key: 'LinkedIn',
    value: '@kianbazarjani',
    href: 'https://linkedin.com/in/kianbazarjani',
  },
]

type Role = {
  icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  startDate: Date
  endDate?: Date
  title: string
}

type Organization = {
  name: string
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  description?: string
  roles: Role[]
}

export const career: Array<Organization> = [
  {
    name: 'Navattic',
    icon: NavatticIcon,
    roles: [
      {
        title: 'Design Engineer',
        startDate: new Date(2025, 9, 6),
      },
    ],
  },
  {
    name: 'Bazza Labs',
    icon: BazzaLabsIcon,
    description: 'Partnering with startups to launch and scale.',
    roles: [
      {
        title: 'Fused',
        icon: FusedIcon,
        startDate: new Date(2025, 7, 24),
      },
      {
        title: 'Profound',
        icon: ProfoundIcon,
        startDate: new Date(2025, 4, 22),
        endDate: new Date(2025, 6, 17),
      },
    ],
  },
  {
    name: 'National Defence',
    icon: CanadaIcon,
    roles: [
      {
        title: 'DevSecOps Lead Architect',
        startDate: new Date(2025, 0, 1),
        endDate: new Date(2025, 9, 6),
      },
      {
        title: 'Software Developer',
        startDate: new Date(2023, 6, 1),
        endDate: new Date(2025, 0, 1),
      },
      {
        title: 'Software Developer Intern',
        startDate: new Date(2021, 8, 1),
        endDate: new Date(2023, 4, 1),
      },
    ],
  },
]

export const consulting = [
  {
    company: 'Profound',
    icon: ProfoundIcon,
    startDate: new Date(2025, 4, 22),
    endDate: new Date(2025, 6, 17),
  },
  {
    company: 'Fused',
    icon: FusedIcon,
    startDate: new Date(2025, 7, 24),
  },
]

type ProjectsSectionItem = {
  year: number
  title: string
  description: string
  href?: string
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
}

const projects: Array<ProjectsSectionItem> = [
  {
    year: 2025,
    title: 'bazza/ui',
    description: 'Data filters and action menu.',
    href: 'https://ui.bazza.dev',
    icon: BazzaUIIcon,
  },
  {
    year: 2025,
    title: 'Avelin',
    description: 'Collaborative brainstorming tool for code.',
    href: 'https://avelin.app',
    icon: AvelinIcon,
  },
]

type EducationSectionItem = {
  year: number
  institution: string
  description: string
  href?: string
}

const education: Array<EducationSectionItem> = [
  {
    year: 2025,
    institution: 'Red Hat',
    description: 'Certified System Administrator',
    href: 'https://rhtapps.redhat.com/verify?certId=240-088-146',
  },
  {
    year: 2023,
    institution: 'University of Ottawa',
    description: 'BSc., Computer Science',
  },
]

export const content = {
  connect,
  career,
  projects,
  consulting,
  education,
}
