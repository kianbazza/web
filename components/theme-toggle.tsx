import { LightbulbIcon, LightbulbOffIcon, MonitorCogIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const ThemeToggle = () => {
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
        className="pl-4"
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
      className="pl-4"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'light' && <LightbulbIcon className="size-4" />}
      {theme === 'dark' && <LightbulbOffIcon className="size-4" />}
      {theme === 'system' && <MonitorCogIcon className="size-4" />}
    </motion.button>
  )
}
