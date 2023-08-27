"use client"

import { motion } from "framer-motion"

export default function WavingHand() {
  return (
    <motion.div
      className="inline-block"
      layout="position"
      animate={{ rotate: [null, -30, 30, -30, 0] }}
      transition={{
        repeat: Infinity,
        ease: "easeInOut",
        duration: 2,
      }}
    >
      👋
    </motion.div>
  )
}
