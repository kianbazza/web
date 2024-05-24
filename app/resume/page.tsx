import {
  ArrowRight,
  CalendarRange,
  Github,
  Linkedin,
  MapPin,
  Send,
} from 'lucide-react'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const socials = [
  {
    icon: Send,
    label: 'kian@bazza.dev',
    href: 'mailto:kian@bazza.dev',
  },
  {
    icon: Linkedin,
    label: 'kianbazarjani',
    href: 'https://linkedin.com/in/kianbazarjani',
  },
  {
    icon: Github,
    label: 'bazzadev',
    href: 'https://github.com/bazzadev',
  },
]

const work = [
  {
    title: 'Software/Cloud Developer',
    company: 'National Defence',
    startDate: new Date(2023, 6),
    endDate: null,
    location: 'Ottawa, ON',
    content: [
      'Developed a Next.js (React) web application for end users to interface with an internal Privileged Access Management (PAM) solution; utilized TypeScript for type safety, React Query for async data management, React Server Components (RSCs) for server-side rendering, and designed a custom component library using Radix UI components for a modern, accessible UI/UX.',
      'Deployed an AWS-based development lab mirroring the production environment for prototyping; deployed, configured, and maintained core services and workstations; created detailed documentation and onboarding guides for all services.',
      'Deployed and maintained a Red Hat OpenShift cluster in AWS, which allowed clients to efficiently develop and test their containerized applications, leading to a significant reduction in time-to-production.',
      'Hardened infrastructure using Microsoft best practices, implemented tiered environment models, applied GPOs to manage access and permissions, and leveraged AWS services (EC2, Lambda, EventBridge, S3, IAM).',
      'Automated training processes by integrating a Learning Management System (LMS) with an internal Identity and Access Management (IdAM) solution using Microsoft Identity Manager (MIM); developed a custom synchronization service management agent for updating user records in external databases based on LMS course completion data, enhancing compliance and reducing overhead and human error.',
    ],
  },
  {
    title: 'Software Developer Intern',
    company: 'National Defence',
    startDate: new Date(2021, 8),
    endDate: new Date(2023, 4),
    location: 'Ottawa, ON',
    content: [
      'Participated in the initial delivery of a classified project with a combined budget of $249 million',
      'Contributed to major improvements of intelligence & security capabilities on highly classified information networks',
      'Oversaw the development of an internal publishing platform solution to efficiently store documentation, resulting in marked improvements in day-to-day operational efficiency',
      'Authored comprehensive documentation outlining project solutions installation, configuration, and usage, leading to client satisfaction and increased employee onboarding efficiency',
    ],
  },
]

const projects = [
  {
    name: 'code.',
    technologies: ['React', 'Next.js', 'WebRTC', 'PostgreSQL'],
    description: 'Collaborative code editing on the web.',
  },
]

const certifications = [
  {
    organization: 'Red Hat',
    certifications: [
      {
        name: 'Red Hat Certified System Administrator',
        status: 'Certified',
      },
      {
        name: 'Red Hat Certified OpenShift Administrator',
        status: 'In Progress',
      },
    ],
  },
  {
    organization: 'Amazon Web Services (AWS)',
    certifications: [
      {
        name: 'AWS Solutions Architect Associate',
        status: 'In Progress',
      },
    ],
  },
]

const languages = [
  '{Java,Type}script',
  'SQL',
  'Java',
  'Python',
  'HTML',
  'CSS',
  'C/C++',
  'OCaml',
]

const tools = [
  '(neo)vim',
  'VS Code',
  'Git',
  'Podman',
  'Docker',
  'Kubernetes',
  'OpenShift',
]

const frameworks = ['Next.js']

const libraries = ['React']

const DATE_FORMAT_STR = 'MMM yyyy'

export default function Page() {
  return (
    <div className="flex flex-col gap-8 py-12">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center text-4xl font-semibold tracking-tighter sm:text-5xl">
          Kian Bazarjani
        </h1>
        <div className="flex items-center gap-4">
          {socials.map((social) => (
            <Link
              key={social.label}
              href={social.href}
            >
              <span className="inline-flex items-center gap-1.5 text-xs">
                <social.icon className="h-4 w-4" />{' '}
                <span className="text-muted-foreground">{social.label}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="bg-none text-3xl font-bold tracking-tighter text-zinc-300 dark:text-primary sm:text-4xl">
          Education
        </h2>
        <ul>
          <li>
            <div className="flex w-full flex-col ">
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarRange className="mr-0.5 h-4 w-4 text-zinc-600 dark:text-zinc-300" />
                Sep 2018
                <ArrowRight className="h-3 w-3" />
                Apr 2023
              </span>

              <h3 className="mt-1.5 font-semibold">University of Ottawa</h3>
            </div>
            <div className="mt-2 flex w-full justify-between dark:text-muted-foreground">
              <p className="text-xs">
                BSc with Honours in Computer Science, Data Science Stream
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="bg-none text-3xl font-bold tracking-tighter text-zinc-300 dark:text-primary sm:text-4xl">
          Certifications
        </h2>
        <ul className="space-y-4">
          {certifications.map(({ organization, certifications }) => (
            <li
              key={organization}
              className="flex flex-col"
            >
              <h3>
                <span className="font-semibold">{organization}</span>
              </h3>
              <ul className="mt-2 space-y-1 text-xs">
                {certifications.map((c, index) => (
                  <li key={index}>
                    <span className="dark:text-muted-foreground">{c.name}</span>{' '}
                    <Badge
                      variant="secondary"
                      className={cn(
                        'h-fit w-fit px-2 py-0 text-xs font-medium',
                        c.status === 'In Progress' &&
                          'dark:hover:bg-sky-500/300 h-fit cursor-default select-none whitespace-nowrap bg-sky-700/20 font-medium text-sky-950 hover:bg-sky-700/10 dark:bg-sky-500/20 dark:text-sky-50',
                        c.status === 'Pending Exam' &&
                          'dark:hover:bg-purple-500/300 h-fit cursor-default select-none whitespace-nowrap bg-purple-700/20 font-medium text-purple-950 hover:bg-purple-700/10 dark:bg-purple-500/20 dark:text-purple-50',
                        c.status === 'Certified' &&
                          'dark:hover:bg-green-500/300 h-fit cursor-default select-none whitespace-nowrap bg-green-700/20 font-medium text-green-950 hover:bg-green-700/10 dark:bg-green-500/20 dark:text-green-50',
                      )}
                    >
                      {c.status}
                    </Badge>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="bg-none text-3xl font-bold tracking-tighter text-zinc-300 dark:text-primary sm:text-4xl">
          Work
        </h2>
        <ul className="space-y-6">
          {work.map((w) => (
            <li
              key={w.title + w.location}
              className="flex flex-col"
            >
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="inline-flex items-center text-xs">
                  <MapPin className="mr-1 h-4 w-4 text-zinc-600 dark:text-zinc-300" />{' '}
                  {w.location}
                </span>

                <span className="inline-flex items-center gap-1 text-xs">
                  <CalendarRange className="mr-1 h-4 w-4 text-zinc-600 dark:text-zinc-300" />
                  {format(w.startDate, DATE_FORMAT_STR)}
                  <ArrowRight className="h-3 w-3" />
                  {w.endDate ? format(w.endDate, DATE_FORMAT_STR) : 'Present'}
                </span>
              </div>
              <h3 className="mt-1.5">
                <span className="font-semibold">{w.title}</span> @ {w.company}
              </h3>
              <ul className="ml-4 mt-2 list-outside list-disc space-y-2 text-xs">
                {w.content.map((c, index) => (
                  <li
                    className="dark:text-muted-foreground"
                    key={index}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="bg-none text-3xl font-bold tracking-tighter text-zinc-300 dark:text-primary sm:text-4xl">
          Projects
        </h2>
        <ul className="space-y-6">
          {projects.map((p) => (
            <li
              key={p.name}
              className="flex flex-col"
            >
              <h3 className="flex items-center gap-2">
                <span className="font-semibold">{p.name}</span>
                <div className="flex gap-1">
                  {p.technologies.map((t) => (
                    <Badge
                      variant="secondary"
                      className="h-fit w-fit px-2 py-0 text-xs font-medium"
                      key={t}
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </h3>
              <p className="mt-2 text-xs dark:text-muted-foreground">
                {p.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="bg-none text-3xl font-bold tracking-tighter text-zinc-300 dark:text-primary sm:text-4xl">
          More
        </h2>
        <ul className="space-y-1 text-xs">
          <li>
            <b>Languages:</b>{' '}
            <span className="dark:text-muted-foreground">
              {languages.join(', ')}
            </span>
          </li>
          <li>
            <b>Tools/Technologies:</b>{' '}
            <span className="dark:text-muted-foreground">
              {tools.join(', ')}
            </span>
          </li>
          <li>
            <b>Frameworks:</b>{' '}
            <span className="dark:text-muted-foreground">
              {frameworks.join(', ')}
            </span>
          </li>
          <li>
            <b>Libraries:</b>{' '}
            <span className="dark:text-muted-foreground">
              {libraries.join(', ')}
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
