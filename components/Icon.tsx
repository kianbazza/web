import { AnimatePresence, Variants, motion, useCycle } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import Link from "next/link"

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
      asChild
      variant="ghost"
      className="flex-1 flex"
      onMouseEnter={() => cycleOpen()}
      onMouseLeave={() => cycleOpen()}
    >
      <Link href={link} target="_blank" rel="noopener noreferrer">
        <motion.div
          layout="position"
          className="flex gap-2 justify-evenly items-center"
        >
          <motion.div layout="position">{icon}</motion.div>
          <AnimatePresence>
            {open && (
              <motion.span
                className="whitespace-nowrap"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
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
