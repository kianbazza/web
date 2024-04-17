import { AnimatePresence, motion, useCycle } from 'framer-motion'
import { Button } from './ui/button'
import Link from 'next/link'

interface Props {
  icon: JSX.Element
  text: string
  hoverText: string
  link: string
}

export default function Icon({ icon, text, hoverText, link }: Props) {
  const [open, cycleOpen] = useCycle(false, true)

  return (
    <Button
      className="flex flex-1"
      asChild
      variant="ghost"
      onMouseEnter={() => cycleOpen()}
      onMouseLeave={() => cycleOpen()}
    >
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <motion.div
          layout="position"
          className="flex items-center justify-evenly gap-2"
        >
          <motion.div layout="position">{icon}</motion.div>
          <AnimatePresence>
            {open && (
              <motion.span
                className="whitespace-nowrap text-sm sm:text-base"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                transition={{ duration: 0.2 }}
                exit={{ width: 0, opacity: 0 }}
              >
                {hoverText}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </Link>
    </Button>
  )
}
