'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'

type ToolbarItem = {
  value: string
  name: string
  paths: string[]
  disabled?: boolean
  hidden?: boolean
}

const toolbarItems: ToolbarItem[] = [
  {
    value: 'home',
    name: 'Home',
    paths: ['/', '/home'],
  },
  {
    value: 'connect',
    name: 'Connect',
    paths: ['/connect'],
    disabled: true,
    hidden: true,
  },
  {
    value: 'career',
    name: 'Career',
    paths: ['/career'],
    disabled: true,
    hidden: true,
  },
  {
    value: 'craft',
    name: 'Craft',
    paths: ['/craft'],
  },

  {
    value: 'projects',
    name: 'Projects',
    paths: ['/projects'],
  },
  {
    value: 'education',
    name: 'Education',
    paths: ['/education'],
    disabled: true,
    hidden: true,
  },
] as const

export default function Toolbar() {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        'text-sand-12 font-mono text-sm select-none',
        'fixed bottom-6 sm:bottom-8 left-[50%] translate-x-[-50%] z-100000',
      )}
    >
      <div className="rounded-full bg-white dark:bg-black pl-4 pr-4 h-11 flex items-center drop-shadow-lg border border-gray-5 w-fit">
        <div className="h-11 overflow-hidden w-11">
          <Image
            height={36}
            width={36}
            className="translate-y-[4px] grayscale mr-2 pr-2"
            alt="Kian Bazza"
            src="/kianbazza-head.png"
          />
        </div>
        {toolbarItems
          .filter((item) => !item.hidden)
          .map((item) => (
            <Link
              key={item.value}
              href={item.paths[0]}
              className={cn(
                'relative',
                'transition-colors duration-200 ease-out px-2 py-3.5',
                item.paths.includes(pathname) ? 'text-gray-12' : 'text-gray-9',
                'hover:text-gray-12',
                item.disabled &&
                  'cursor-not-allowed! *:cursor-not-allowed! pointer-events-none! opacity-50',
              )}
            >
              {item.paths.includes(pathname) && (
                <motion.div
                  layoutId="nav-dot"
                  layout="position"
                  className="rounded-full bg-blue-9 size-1.5 shadow-xs"
                  style={{
                    position: 'absolute',
                    bottom: 8,
                    left: '50%',
                    marginLeft: -3,
                  }}
                />
              )}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        <ThemeToggle />
      </div>
    </div>
  )
}
