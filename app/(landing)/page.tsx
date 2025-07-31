'use client'

import { ArrowRightIcon } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { WidthContainer } from '@/components/width-container'
import { content } from './_/content'
import { Header } from './_/header'
import { Section } from './_/section'
import { containerVariants } from './_/variants'
import { MaybeLink } from '@/components/maybe-link'
import { cn } from '@/lib/utils'

const Divider = () => <motion.div className="h-px w-full bg-sand-6" />

const SectionTitle = ({ children }: { children?: React.ReactNode }) => (
  <h1 className=" text-sm font-bold text-sand-8">{children}</h1>
)

export default function Home() {
  return (
    <WidthContainer>
      <motion.div
        className="flex flex-col gap-6 select-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Header />
        <Divider />
        <Section>
          <SectionTitle>Connect</SectionTitle>
          <div className="flex flex-col gap-1.5 ">
            {content.connect.map(({ key, value, href }) => (
              <MaybeLink
                className="flex items-center gap-4 group hover-expand-1"
                key={key}
                href={href}
              >
                <span className="font-bold">{key}</span>
                <div className="relative">
                  <span className="text-sand-10 font-medium">{value}</span>
                  {href && (
                    <div className="h-[2px] w-0 absolute bottom-0 bg-text-quaternary rounded-full group-hover:w-full" />
                  )}
                </div>
              </MaybeLink>
            ))}
          </div>
        </Section>
        <Section>
          <SectionTitle>Career</SectionTitle>
          <div className="flex flex-col gap-1.5">
            {content.career.map(({ year, company, role }) => (
              <div
                key={`${year}-${company}-${role}`}
                className="gap-x-6 grid grid-cols-[max-content_max-content] sm:grid-cols-[max-content_max-content_max-content]"
              >
                <span className="font-bold col-span-1">{year}</span>
                <span className="text-sand-10 font-medium col-span-1">
                  {company}
                </span>
                <span className="sm:col-span-1 col-start-2">{role}</span>
              </div>
            ))}
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
          <div className="flex flex-col gap-2">
            {content.projects.map(({ year, title, description, href }) => (
              <MaybeLink
                href={href}
                key={title}
                className="flex items-center gap-6 w-full group hover-expand-1"
              >
                <span className="font-bold">{year}</span>
                <div className="inline-flex items-center gap-2 relative">
                  <span className="text-sand-10 font-medium">{title}</span>
                  <div className="h-[2px] w-0 absolute bottom-0 bg-text-quaternary rounded-full group-hover:w-full" />
                </div>
                <span className="hidden sm:block">{description}</span>
              </MaybeLink>
            ))}
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
                    <span className="font-bold">{year}</span>
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
