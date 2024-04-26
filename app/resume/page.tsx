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
    title: 'Software Developer',
    company: 'National Defence',
    startDate: new Date(2023, 7),
    endDate: null,
    location: 'Ottawa, ON',
    content: [
      'Developed a Next.js (React) web application for end users to interface with an internal Privileged Access Management (PAM) solution; utilized TypeScript for type safety, React Query for async data management, React Server Components (RSCs) for server-side rendering, and designed a custom component library using Radix UI components for a modern, accessible UI/UX.',
      'Deployed an AWS-based development lab mirroring the production environment for prototyping; deployed, configured, and maintained core services and workstations; created detailed documentation and onboarding guides for all services.',
      'Hardened infrastructure using Microsoft best practices, implemented tiered environment models, applied GPOs to manage access and permissions, and leveraged AWS services (EC2, Lambda, EventBridge, S3).',
      'Automated training processes by integrating a Learning Management System (LMS) with an internal Identity and Access Management (IdAM) solution using Microsoft Identity Manager (MIM); developed a custom synchronization service management agent for updating user records in external databases based on LMS course completion data, enhancing compliance and reducing overhead and human error.',
    ],
  },
  {
    title: 'Software Developer Intern',
    company: 'National Defence',
    startDate: new Date(2023, 7),
    endDate: new Date(2021, 8),
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
        status: 'In Progress',
      },
      {
        name: 'Red Hat Certified Specialist in Containers',
        status: 'Pending Exam',
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
        <h1 className="text-center text-4xl font-semibold tracking-tighter">
          Kian Bazarjani
        </h1>
        <div className="flex items-center gap-4">
          {socials.map((social) => (
            <Link
              key={social.label}
              href={social.href}
            >
              <span className="inline-flex items-center gap-1.5 text-xs">
                <social.icon className="h-4 w-4" /> {social.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="bg-none text-3xl font-bold tracking-tighter text-zinc-300">
          Education
        </h2>
        <ul>
          <li>
            <div className="flex w-full flex-col ">
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarRange className="mr-0.5 h-4 w-4 text-zinc-600" />
                Sep 2018
                <ArrowRight className="h-3 w-3" />
                Apr 2023
              </span>

              <h3 className="mt-1.5 font-medium">University of Ottawa</h3>
            </div>
            <div className="flex w-full justify-between">
              <p className="text-xs">
                BSc with Honours in Computer Science, Data Science Stream
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="bg-none text-3xl font-bold tracking-tighter text-zinc-300">
          Certifications
        </h2>
        <ul className="space-y-4">
          {certifications.map(({ organization, certifications }) => (
            <li
              key={organization}
              className="flex flex-col"
            >
              <h3>
                <span className="font-medium">{organization}</span>
              </h3>
              <ul className="mt-2 space-y-1 text-xs">
                {certifications.map((c, index) => (
                  <li key={index}>
                    {c.name}{' '}
                    <Badge
                      className={cn(
                        'h-fit w-fit px-2 py-0 text-xs font-medium',
                        c.status === 'In Progress' &&
                          'bg-blue-600/10 text-blue-700 hover:bg-blue-600/10',
                        c.status === 'Pending Exam' &&
                          'bg-purple-600/10 text-purple-700 hover:bg-purple-600/10',
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
        <h2 className="bg-none text-3xl font-bold tracking-tighter text-zinc-300">
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
                  <MapPin className="mr-1 h-4 w-4 text-zinc-600" /> {w.location}
                </span>

                <span className="inline-flex items-center gap-1 text-xs">
                  <CalendarRange className="mr-1 h-4 w-4 text-zinc-600" />
                  {format(w.startDate, DATE_FORMAT_STR)}
                  <ArrowRight className="h-3 w-3" />
                  {w.endDate ? format(w.endDate, DATE_FORMAT_STR) : 'Present'}
                </span>
              </div>
              <h3 className="mt-1.5">
                <span className="font-medium">{w.title}</span> @ {w.company}
              </h3>
              <ul className="ml-4 mt-2 list-outside list-disc space-y-2 text-xs">
                {w.content.map((c, index) => (
                  <li key={index}>{c}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="bg-none text-3xl font-bold tracking-tighter text-zinc-300">
          Projects
        </h2>
        <ul className="space-y-6">
          {projects.map((p) => (
            <li
              key={p.name}
              className="flex flex-col"
            >
              <h3 className="flex items-center gap-2">
                <span className="font-medium">{p.name}</span>
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
              <p className="mt-2 text-xs">{p.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="bg-none text-3xl font-bold tracking-tighter text-zinc-300">
          More
        </h2>
        <ul className="space-y-1 text-xs">
          <li>
            <b>Languages:</b> {languages.join(', ')}
          </li>
          <li>
            <b>Tools/Technologies:</b> {tools.join(', ')}
          </li>
          <li>
            <b>Frameworks:</b> {frameworks.join(', ')}
          </li>
          <li>
            <b>Libraries:</b> {libraries.join(', ')}
          </li>
        </ul>
      </div>
    </div>
  )
}
