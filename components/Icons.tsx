"use client"

import Icon from "@/components/Icon" // Import your icon components
import { motion, LayoutGroup } from "framer-motion"
import { Github, Linkedin, ScrollText, Send } from "lucide-react"

const iconsData = [
  {
    icon: <Github width={20} height={20} />,
    text: "Github",
    hoverText: "BazzaDEV",
    link: "https://github.com/BazzaDEV",
  },
  {
    icon: <Linkedin width={20} height={20} />,
    text: "LinkedIn",
    hoverText: "kianbazarjani",
    link: "https://linkedin.com/in/kianbazarjani",
  },
  {
    icon: <Send width={20} height={20} />,
    text: "Email",
    hoverText: "kian@bazza.dev",
    link: "mailto:kian@bazza.dev",
  },
  {
    icon: <ScrollText width={20} height={20} />,
    text: "Resume",
    hoverText: "My Resume",
    link: "https://go.bazza.dev/resume",
  },
]

export default function Icons() {
  return (
    <LayoutGroup>
      <div className="flex">
        {iconsData.map((data, index) => (
          <Icon
            key={index}
            icon={data.icon}
            text={data.text}
            hoverText={data.hoverText}
            link={data.link}
          />
        ))}
      </div>
    </LayoutGroup>
  )
}
