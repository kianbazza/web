'use client'

import { cn } from '@/lib/utils'
import { LightbulbIcon, LightbulbOffIcon, MonitorCogIcon } from 'lucide-react'
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
  const [mounted, setMounted] = useState(false)

  const pathname = usePathname()
  const { setTheme, theme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div
      className={cn(
        'text-sand-12 font-mono text-sm',
        'fixed left-8 top-[50%] translate-y-[-50%] z-10 flex flex-col gap-2',
        'lg:flex hidden',
      )}
    >
      {toolbarItems.map((item) => (
        <Link
          key={item.value}
          href={item.paths[0]}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl shadow-sm backdrop-blur-md bg-sand-4 hover:bg-sand-5 transition-all duration-200 select-none',
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
      <button
        type="button"
        className="mt-2 w-fit flex items-center gap-2 px-4 py-2 rounded-xl shadow-sm backdrop-blur-md bg-sand-4 hover:bg-sand-5 transition-all duration-200 select-none"
        onClick={() =>
          setTheme(
            theme === 'dark' ? 'system' : theme === 'light' ? 'dark' : 'light',
          )
        }
      >
        {theme === 'light' && <LightbulbIcon className="size-4" />}
        {theme === 'dark' && <LightbulbOffIcon className="size-4" />}
        {theme === 'system' && <MonitorCogIcon className="size-4" />}
      </button>
    </div>
  )
}
