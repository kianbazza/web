'use client'

import { BacklogStatusIcon, InProgressStatusIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { LightbulbIcon, LightbulbOffIcon, MonitorCogIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type ToolbarItem = {
  value: string
  name: string
  paths: string[]
  disabled?: boolean
}

const toolbarItems: ToolbarItem[] = [
  {
    value: 'home',
    name: 'Home',
    paths: ['/', '/home'],
    disabled: false,
  },
  {
    value: 'connect',
    name: 'Connect',
    paths: ['/connect'],
    disabled: true,
  },
  {
    value: 'career',
    name: 'Career',
    paths: ['/career'],
    disabled: true,
  },
  {
    value: 'projects',
    name: 'Projects',
    paths: ['/projects'],
    disabled: true,
  },
  {
    value: 'education',
    name: 'Education',
    paths: ['/education'],
    disabled: true,
  },
] as const

export default function Toolbar() {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        'text-sand-12 font-mono text-sm select-none',
        'fixed left-8 top-[50%] translate-y-[-50%] z-10 grid grid-rows-3 gap-4 h-full',
        'lg:grid hidden',
      )}
    >
      {/* <div className="row-span-1 pt-4 justify-self-end">Index</div> */}
      <div className="row-start-2 self-center flex flex-col gap-2">
        {toolbarItems.map((item) => (
          <Link
            key={item.value}
            href={item.paths[0]}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl shadow-sm backdrop-blur-md bg-sand-4 hover:bg-sand-5 transition-all duration-200',
              item.paths.includes(pathname) && 'bg-sand-6',
              item.disabled &&
                '!cursor-not-allowed *:!cursor-not-allowed !pointer-events-none opacity-50',
            )}
          >
            <span className="font-medium mr-4">{item.name}</span>
            {item.paths.includes(pathname) && (
              <span className="text-sand-12 mr-2 absolute right-2">*</span>
            )}
          </Link>
        ))}
        <ThemeToggle />
      </div>
      <div className="row-start-3 rounded-xl px-4 py-4 shadow-sm backdrop-blur-md bg-sand-2 border border-sand-3 self-end mb-24 flex flex-col gap-2">
        <span className="text-sand-10 font-bold text-xs">Legend</span>
        <div className="space-y-1">
          <div className="flex gap-2 items-center">
            <BacklogStatusIcon />
            <span>Backlog</span>
          </div>
          <div className="flex gap-2 items-center">
            <InProgressStatusIcon />
            <span>In Progress</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        type="button"
        className="mt-2 w-fit flex items-center gap-2 px-4 py-2 rounded-xl shadow-sm backdrop-blur-md bg-sand-4 hover:bg-sand-5 transition-all duration-200 select-none"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <LightbulbIcon className="size-4 inline-block dark:hidden" />
        <LightbulbOffIcon className="size-4 hidden dark:inline-block" />
      </button>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.2 }}
      type="button"
      className="mt-2 w-fit flex items-center gap-2 px-4 py-2 rounded-xl shadow-sm backdrop-blur-md bg-sand-4 hover:bg-sand-5 transition-all duration-200 select-none"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'light' && <LightbulbIcon className="size-4" />}
      {theme === 'dark' && <LightbulbOffIcon className="size-4" />}
      {theme === 'system' && <MonitorCogIcon className="size-4" />}
    </motion.button>
  )
}
