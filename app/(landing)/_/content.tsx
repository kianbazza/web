type ConnectSectionItem = {
  key: string
  value: string
  href: string
}

const connect: Array<ConnectSectionItem> = [
  {
    key: 'Mail',
    value: 'kian@bazza.dev',
    href: 'mailto:kian@bazza.dev',
  },
  {
    key: 'LinkedIn',
    value: '@kianbazarjani',
    href: 'https://linkedin.com/in/kianbazarjani',
  },
  {
    key: 'GitHub',
    value: '@kianbazza',
    href: 'https://github.com/kianbazza',
  },
  {
    key: 'X',
    value: '@kianbazza',
    href: 'https://x.com/kianbazza',
  },
]

type CareerSectionItem = {
  year: number
  company: string
  role: string
}

const career: Array<CareerSectionItem> = [
  {
    year: 2025,
    company: 'National Defence',
    role: 'DevSecOps Lead Architect',
  },
  {
    year: 2023,
    company: 'National Defence',
    role: 'Software Developer',
  },
  {
    year: 2021,
    company: 'National Defence',
    role: 'Software Developer Intern',
  },
]

type ProjectsSectionItem = {
  year: number
  title: string
  description: string
  href?: string
}

const projects: Array<ProjectsSectionItem> = [
  {
    year: 2025,
    title: 'bazza/ui',
    description: 'Filters for your next data table.',
    href: 'https://ui.bazza.dev',
  },
  {
    year: 2025,
    title: 'Avelin',
    description: 'Collaborative brainstorming tool for code.',
    href: 'https://avelin.app',
  },
  {
    year: 2025,
    title: 'bazza.dev',
    description: 'My personal portfolio.',
    href: 'https://bazza.dev',
  },
  {
    year: 2023,
    title: 'OET',
    description: 'Combine enchanted items, optimized.',
    href: 'https://oet.bazza.dev',
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
  education,
}
