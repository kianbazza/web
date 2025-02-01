'use client'

import { Signature } from '@/components/signature'
import {
  BacklogStatusIcon,
  InProgressStatusIcon,
  LogoAvelin,
} from '@/lib/icons'
import { cn } from '@/lib/utils'
import { ArrowRightIcon } from 'lucide-react'
import { type Variants, motion } from 'motion/react'
import Link from 'next/link'
import type { HTMLAttributes } from 'react'

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.5,
    },
  },
}

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.99,
    translateY: 5,
    filter: 'blur(2px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    translateY: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export default function Home() {
  return (
    <motion.div
      className="flex flex-col gap-6 select-none"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="space-y-8" variants={sectionVariants}>
        <Signature className="max-w-[300px] sm:max-w-[400px] pt-4 stroke-sand-12" />
        <div className="space-y-4 tracking-[-0.01em]">
          <p className="font-mono font-semibold text-sand-9">
            I'm a <H>developer</H> with a passion for designing{' '}
            <H>beautiful, modern interfaces</H>.
          </p>
          <p className="font-mono font-semibold text-sand-9">
            My professional experience in <H>backend systems</H> — AWS, Linux
            and Kubernetes — helps me bring my ideas to life.
          </p>
          <p className="font-mono font-semibold text-sand-9">
            Currently building{' '}
            <Link
              href="https://avelin.app"
              // target="_blank"
              // rel="noopener noreferrer"
            >
              <H className="hover:bg-sand-12 hover:text-sand-1 border tracking-tighter border-transparent hover:border-sand-3 hover:drop-shadow-md py-1.5 rounded-xl px-2 transition-all duration-200 ease-in-out">
                <LogoAvelin
                  className="size-5 inline text-center translate-y-[-1.5px] mr-1.5"
                  style={{ verticalAlign: 'middle' }}
                />
                avelin.app
              </H>
            </Link>
            .
          </p>
        </div>
      </motion.div>
      <motion.div className="h-[1px] w-full bg-sand-6" />
      <motion.div className="space-y-2 font-mono" variants={sectionVariants}>
        <h1 className="font-mono text-sm font-bold text-sand-8">Connect</h1>
        <div className="flex flex-col gap-1.5 font-mono">
          <Link href="mailto:kian@bazza.dev">
            <div className="flex items-center gap-4 group">
              <span className="font-bold">Mail</span>
              <span className="text-sand-10 font-medium">kian@bazza.dev</span>
              <span className="inline-flex items-center gap-2 invisible group-hover:visible font-bold ml-2">
                Open
                <ArrowRightIcon strokeWidth={2.5} className="size-4" />
              </span>
            </div>
          </Link>
          <Link href="https://linkedin.com/in/kianbazarjani">
            <div className="flex items-center gap-4 group">
              <span className="font-bold">LinkedIn</span>
              <span className="text-sand-10 font-medium">@kianbazarjani</span>
              <span className="inline-flex items-center gap-2 invisible group-hover:visible font-bold ml-2">
                Open
                <ArrowRightIcon strokeWidth={2.5} className="size-4" />
              </span>
            </div>
          </Link>
          <Link href="https://github.com/bazzadev">
            <div className="flex items-center gap-4 group">
              <span className="font-bold">GitHub</span>
              <span className="text-sand-10 font-medium">@bazzadev</span>
              <span className="inline-flex items-center gap-2 invisible group-hover:visible font-bold ml-2">
                Open
                <ArrowRightIcon strokeWidth={2.5} className="size-4" />
              </span>
            </div>
          </Link>
          <Link href="https://x.com/kianbazza">
            <div className="flex items-center gap-4 group">
              <span className="font-bold">X</span>
              <span className="text-sand-10 font-medium">@kianbazza</span>
              <span className="inline-flex items-center gap-2 invisible group-hover:visible font-bold ml-2">
                Open
                <ArrowRightIcon strokeWidth={2.5} className="size-4" />
              </span>
            </div>
          </Link>
        </div>
      </motion.div>
      <motion.div className="space-y-2" variants={sectionVariants}>
        <h1 className="font-mono text-sm font-bold text-sand-8">Career</h1>
        <div className="flex flex-col gap-1.5 font-mono">
          <div className="grid grid-cols-[max-content_max-content] sm:grid-cols-[max-content_max-content_max-content] gap-x-6 items-center">
            <span className="font-bold col-span-1">2025</span>
            <span className="text-sand-10 font-medium col-span-1">
              National Defence
            </span>
            <span className="sm:col-span-1 col-start-2">
              DevSecOps Lead Architect <span className="text-sand-10">(A)</span>
            </span>
          </div>
          <div className=" gap-x-6 grid grid-cols-[max-content_max-content] sm:grid-cols-[max-content_max-content_max-content]">
            <span className="font-bold">2023</span>
            <span className="text-sand-10 font-medium">National Defence</span>
            <span className="sm:col-span-1 col-start-2">
              Software Developer
            </span>
          </div>
          <div className=" gap-x-6 grid grid-cols-[max-content_max-content] sm:grid-cols-[max-content_max-content_max-content]">
            <span className="font-bold">2021</span>
            <span className="text-sand-10 font-medium">National Defence</span>
            <span className="sm:col-span-1 col-start-2">
              Software Developer Intern
            </span>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="space-y-2 group/section"
        variants={sectionVariants}
      >
        <div className="flex gap-4">
          <h1 className="font-mono text-sm font-bold text-sand-8">Projects</h1>
          <Link
            className="text-sm font-mono font-bold text-sand-11 blur-[2px] group-hover/section:blur-none transition-all ease-out inline-flex items-center gap-2 *:!cursor-not-allowed !cursor-not-allowed"
            href="/"
          >
            <BacklogStatusIcon className="size-fit" /> Browse {'->'}
          </Link>
        </div>
        <div className="flex flex-col gap-2 font-mono">
          <div className="space-y-0.5">
            <div className="flex items-center gap-6 w-full">
              <span className="font-bold">2025</span>
              <div className="inline-flex items-center gap-2">
                <InProgressStatusIcon className="size-fit" />
                <span className="text-sand-10 font-medium">Avelin</span>
              </div>
              <span className="hidden sm:block">Code together, right now.</span>
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-6 w-full">
              <span className="font-bold">2025</span>
              <div className="inline-flex items-center gap-2">
                <InProgressStatusIcon className="size-fit" />
                <span className="text-sand-10 font-medium">bazza.dev</span>
              </div>
              <span className="hidden sm:block font-bold">
                {'<-- You are here!'}
              </span>
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-6 w-full">
              <span className="font-bold">2023</span>
              <span className="text-sand-10 font-medium">OET</span>
              <span className="hidden sm:block">
                Combine enchanted items, optimized.
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div className="space-y-2" variants={sectionVariants}>
        <h1 className="font-mono text-sm font-bold text-sand-8">Education</h1>
        <div className="flex flex-col gap-1.5 font-mono">
          <Link
            href="https://rhtapps.redhat.com/verify?certId=240-088-146"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="inline-flex items-center gap-6 group">
              <div className="gap-x-6 grid grid-cols-[max-content_max-content] sm:grid-cols-[max-content_max-content_max-content]">
                <span className="font-bold">2025</span>
                <span className="text-sand-10 font-medium">Red Hat</span>
                <span className="sm:block hidden">
                  Certified System Administrator
                </span>
                <span className="col-start-2 sm:hidden">RHCSA</span>
              </div>
              <span className="group-hover:inline-flex hidden items-center gap-2 font-bold ml-2">
                View
                <ArrowRightIcon strokeWidth={2.5} className="size-4" />
              </span>
            </div>
          </Link>
          <div className="gap-x-6 grid grid-cols-[max-content_max-content] sm:grid-cols-[max-content_max-content_max-content]">
            <span className="font-bold">2023</span>
            <span className="text-sand-10 font-medium">
              University of Ottawa
            </span>
            <span className="sm:col-span-1 col-start-2">
              BSc., Computer Science
            </span>
          </div>
        </div>
      </motion.div>
      <motion.div className="space-y-2 mb-8" variants={sectionVariants}>
        <h1 className="font-mono text-sm font-bold text-sand-8">More</h1>
        <div className="flex flex-col gap-1.5 font-mono">
          <div className="gap-x-6 grid grid-cols-[max-content_max-content] !cursor-not-allowed *:!cursor-not-allowed">
            <div className="inline-flex items-center gap-2 *:!cursor-not-allowed">
              <BacklogStatusIcon className="size-fit" />
              <span className="font-bold">Blog</span>
            </div>
            <span className="text-sand-10 font-medium">
              Strong opinions, weak type safety.
            </span>
          </div>
          <div className="gap-x-6 grid grid-cols-[max-content_max-content] !cursor-not-allowed *:!cursor-not-allowed">
            <div className="inline-flex items-center gap-2 *:!cursor-not-allowed">
              <BacklogStatusIcon className="size-fit" />
              <span className="font-bold">Quotes</span>
            </div>
            <span className="text-sand-10 font-medium">
              Borrowed wisdom and stolen wit.
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const H = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('text-sand-12 font-bold', className)} {...props}>
    {children}
  </span>
)
