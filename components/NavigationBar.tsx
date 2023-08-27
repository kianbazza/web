"use client"

import { motion } from "framer-motion"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import Link from "next/link"
import { jetbrains_mono } from "@/app/fonts"
import { cn } from "@/lib/utils"

const pages = [
  {
    href: "/",
    name: "Home",
  },
  {
    href: "/work",
    name: "Work",
  },
  {
    href: "/projects",
    name: "Projects",
  },
  {
    href: "/more",
    name: "More",
  },
]

export default function NavigationBar() {
  return (
    <div className="flex items-center">
      <motion.div
        className="mr-10"
        layout="position"
        whileHover={{
          rotate: [null, -30, 30, -30, 0],
        }}
      >
        <Image src="/bazzadev.png" alt="bazzadev logo" width={30} height={30} />
      </motion.div>
      <NavigationMenu
        className={cn(jetbrains_mono.className, "tracking-tight")}
      >
        <NavigationMenuList className="flex text-sm sm:text-base">
          {pages.map(({ href, name }) => (
            <NavigationMenuItem
              className={cn(
                "px-3 sm:px-5 select-none cursor-pointer hover:font-bold transition-all text-slate-500 font-light"
              )}
              key={name}
            >
              <Link href={href} legacyBehavior passHref>
                <span>{name}</span>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
