import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect } from "react"
import CursorBlinker from "./CursorBlinker"

interface Props {
  texts: string[]
  loop?: boolean
}

export default function TypingAnimationText({ texts, loop = false }: Props) {
  const textIndex = useMotionValue(0)

  const baseText = useTransform(textIndex, (latest) => texts[latest] || "")
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const displayText = useTransform(rounded, (latest) =>
    baseText.get().slice(0, latest)
  )
  const updatedThisRound = useMotionValue(true)

  const controls = animate(count, 60, {
    type: "tween",
    duration: 1.5,
    ease: "easeIn",
    repeat: Infinity,
    repeatType: "reverse",
    repeatDelay: 0.1,
    onUpdate(latest) {
      // console.log(
      //   `textIndex: ${textIndex.get()} baseText: ${baseText.get()} count: ${count.get()} displayText: ${displayText.get()} updatedThisRound: ${updatedThisRound.get()}`
      // )
      if (updatedThisRound.get() === true && latest > 0) {
        updatedThisRound.set(false)
      } else if (
        !loop &&
        updatedThisRound.get() === false &&
        latest === 60 &&
        textIndex.get() === texts.length - 1
      ) {
        controls.stop()
      } else if (updatedThisRound.get() === false && latest === 0) {
        if (textIndex.get() === texts.length - 1) {
          textIndex.set(0)
        } else {
          textIndex.set(textIndex.get() + 1)
        }
        updatedThisRound.set(true)
      }
    },
  })

  useEffect(() => {
    return controls.stop
  }, [controls.stop])

  return (
    <motion.span className="inline">
      <motion.span>{displayText}</motion.span>
      <CursorBlinker />
    </motion.span>
  )
}
