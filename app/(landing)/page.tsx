'use client'

import { interval, intervalToDuration } from 'date-fns'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Fragment } from 'react'
import { MaybeLink } from '@/components/maybe-link'
import { WidthContainer } from '@/components/width-container'
import { content } from './_/content'
import { Header } from './_/header'
import { Section } from './_/section'
import { containerVariants } from './_/variants'

const Divider = () => <motion.div className="h-px w-full bg-sand-6" />

const SectionTitle = ({ children }: { children?: React.ReactNode }) => (
  <h1 className=" text-sm font-bold text-sand-8">{children}</h1>
)

function formatDuration(start: Date, end?: Date, compact?: boolean): string {
  const s = start
  const e = end ?? new Date()
  const months =
    (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth())
  const years = Math.floor(months / 12)
  const remMonths = months % 12

  if (!compact) {
    return [
      years > 0 ? `${years} year${years > 1 ? 's' : ''}` : null,
      remMonths > 0 ? `${remMonths} month${remMonths > 1 ? 's' : ''}` : null,
    ]
      .filter(Boolean)
      .join(', ')
  } else {
    return [
      years > 0 ? `${years} yr${years > 1 ? 's' : ''}` : null,
      remMonths > 0 ? `${remMonths} mo${remMonths > 1 ? 's' : ''}` : null,
    ]
      .filter(Boolean)
      .join(' ')
  }
}

export default function Home() {
  return (
    <WidthContainer>
      <motion.div
        className="flex flex-col gap-12 select-none sm:mt-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Header />
        <Divider />
        <Section>
          <SectionTitle>Connect</SectionTitle>
          <div className="flex items-center gap-6">
            {/* <span className="font-medium">Socials</span> */}
            <div className="flex items-center gap-2">
              {content.connect.map(({ key, icon: Icon, href }, index) => (
                <Fragment key={key}>
                  <MaybeLink
                    className="flex items-center gap-4 group hover-expand-3 relative"
                    href={href}
                  >
                    {Icon ? (
                      <div className="flex items-center h-7">
                        <Icon className="size-3.5 fill-sand-12" />
                      </div>
                    ) : (
                      <span className="font-[450] text-sand-12">{key}</span>
                    )}
                    {href && (
                      <div className="h-[2px] w-0 absolute bottom-0 bg-text-quaternary rounded-full group-hover:w-full" />
                    )}
                  </MaybeLink>
                  {index < content.connect.length - 1 && (
                    <span className="text-sand-11">⋅</span>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sand-11">Let's find some time to chat.</span>
            <MaybeLink
              href="https://cal.com/bazza/30min"
              className="group relative text-sand-12 font-medium"
            >
              Book a call.
              <div className="h-[2px] w-0 absolute bottom-0 bg-text-quaternary rounded-full group-hover:w-full" />
              <div className="overflow-hidden size-4 absolute -top-2 -right-4">
                <div className="relative *:transition-all">
                  <span className="absolute top-0 left-0 text-sand-11 group-hover:translate-x-4 group-hover:-translate-y-4">
                    ↗
                  </span>
                  <span className="absolute top-0 left-0 text-sand-11 -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:-translate-y-0">
                    ↗
                  </span>
                </div>
              </div>
            </MaybeLink>
          </div>
        </Section>
        <Section>
          <SectionTitle>Career</SectionTitle>
          <div className="flex flex-col gap-3">
            {content.career.map((organization) => {
              const OrgIcon = organization.icon

              return (
                <div key={organization.name} className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <OrgIcon className="fill-sand-11 size-4" />
                    <span className="text-sand-12 font-medium">
                      {organization.name}
                    </span>
                  </div>
                  {organization.description && (
                    <p className="text-sm text-sand-10 ml-7">
                      {organization.description}
                    </p>
                  )}
                  <ul
                    className="relative text-sm font-[450]"
                    style={
                      {
                        '--row-height': 'calc(var(--spacing) * 6',
                      } as React.CSSProperties
                    }
                  >
                    <div className="absolute left-0 top-0 w-[1.5px] h-[calc(100%-calc(var(--row-height)*0.75))] bg-gray-5 translate-x-2 rounded-full" />
                    {organization.roles.map((role) => {
                      const isIncoming = role.startDate.getTime() > Date.now()

                      const incomingInterval = interval(
                        new Date(),
                        role.startDate,
                      )
                      const incomingDiff =
                        intervalToDuration(incomingInterval).days

                      const calculatedDiff = formatDuration(
                        role.startDate,
                        role.endDate,
                      )
                      const calculatedDiffCompact = formatDuration(
                        role.startDate,
                        role.endDate,
                        true,
                      )
                      const duration = calculatedDiff
                        ? calculatedDiff
                        : '1 month'

                      const durationCompact = calculatedDiffCompact
                        ? calculatedDiffCompact
                        : '1 mo'

                      return (
                        <li
                          key={role.title}
                          className="flex items-center gap-5 ml-7 relative h-6"
                        >
                          <div className="absolute -left-5 w-3.5 h-[1.5px] bg-gray-5 rotate-25 -translate-y-0.75 rounded-full" />
                          <span className="text-sand-10">
                            {role.startDate.getFullYear()}
                          </span>
                          <div className="flex items-center gap-2">
                            {role.icon && (
                              <role.icon className="size-3.5 fill-sand-9" />
                            )}
                            <span className="text-sand-11">{role.title}</span>
                          </div>
                          {isIncoming ? (
                            <div className="flex sm:hidden items-center gap-[1ch]">
                              <span className="text-plum-10">Incoming ⋅</span>
                              <span className="text-sand-9">
                                {incomingDiff} days
                              </span>
                            </div>
                          ) : (
                            <div className="flex sm:hidden items-center gap-[1ch]">
                              {!role.endDate && (
                                <span className="text-blue-10">Now ⋅</span>
                              )}
                              <span className="text-sand-9">
                                {durationCompact}
                              </span>
                            </div>
                          )}

                          {isIncoming ? (
                            <div className="items-center gap-[1ch] hidden sm:flex">
                              <span className="text-plum-10">Incoming ⋅</span>
                              <span className="text-sand-9">
                                {incomingDiff} days
                              </span>
                            </div>
                          ) : (
                            <div className="items-center gap-[1ch] hidden sm:flex">
                              {!role.endDate && (
                                <span className="text-blue-10">Now ⋅</span>
                              )}
                              <span className="text-sand-9">{duration}</span>
                            </div>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </Section>

        <Section className="group/section">
          <div className="flex gap-4">
            <SectionTitle>Projects</SectionTitle>
            <Link
              className="text-sm font-bold tracking-normal! text-blue-11 group-hover/section:opacity-100 group-hover/section:blur-none hover-expand hover:text-blue-12 transition-all ease-out inline-flex items-center gap-2 group/link"
              href="/projects"
            >
              Browse{' '}
              <span className="tracking-normal! group-hover/link:translate-x-1 transition-transform">
                {'->'}
              </span>
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {content.projects.map(
              ({ icon: Icon, title, description, href }) => {
                return (
                  <MaybeLink
                    href={href}
                    key={title}
                    className="flex-col sm:flex-row flex sm:items-center gap-x-6 gap-y-1 w-full group hover-expand-1 **:!cursor-pointer"
                  >
                    {/* <span className="font-bold">{year}</span> */}
                    <div className="inline-flex items-center gap-2 relative">
                      <Icon className="size-4 fill-sand-9" />
                      <span className="text-sand-12 font-[450]">{title}</span>
                      <div className="h-[2px] w-0 absolute bottom-0 bg-text-quaternary rounded-full group-hover:w-full" />
                    </div>
                    <span className="text-sand-10 text-sm sm:text-base">
                      {description}
                    </span>
                  </MaybeLink>
                )
              },
            )}
          </div>
        </Section>
        <Section>
          <SectionTitle>Education</SectionTitle>
          <div className="flex flex-col gap-2">
            {content.education.map(
              ({ year, institution, description, href }) => (
                <MaybeLink
                  key={`${year}-${institution}-${description}`}
                  className="hover-expand-1 inline-flex items-center gap-6 group w-full"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="gap-x-6 grid grid-cols-[max-content_max-content] sm:grid-cols-[max-content_max-content_max-content]">
                    <span className="font-medium">{year}</span>
                    <div className="relative">
                      <span className="text-sand-10 font-medium">
                        {institution}
                      </span>
                      {href && (
                        <div className="h-[2px] w-0 absolute bottom-0 bg-text-quaternary rounded-full group-hover:w-full" />
                      )}
                    </div>

                    <span className="sm:block hidden">{description}</span>
                  </div>
                </MaybeLink>
              ),
            )}
          </div>
        </Section>
      </motion.div>
    </WidthContainer>
  )
}
