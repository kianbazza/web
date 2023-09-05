"use client"

import { Button } from "@/components/ui/button"
import { Archive, FileText, Github, Linkedin } from "lucide-react"
import TypingAnimationText from "./_components/TypingAnimationText"
import "./styles.css"

const roles = [
  "web developer",
  "cloud engineer",
  "infrastructure architect",
  // "web/cloud/infrastructure developer",
]

export default function TldrPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-black tracking-tighter">
            Kian Bazarjani
          </h1>
          <a
            className="text-sm text-slate-500 hover:text-red-600 hover:underline hover:underline-offset-4"
            href="mailto:kian@bazza.dev"
          >
            kian@bazza.dev
          </a>
          <a className="text-sm pt-2">
            <TypingAnimationText texts={roles} loop={true} /> @{" "}
            <span className="align-middle">🇨🇦</span>
          </a>
        </div>
        <div className="flex gap-4">
          <Button
            className="hover:bg-slate-100 rounded-xl h-7 w-7"
            variant="ghost"
            // size="icon"
          >
            <a
              href="https://go.bazza.dev/resume"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FileText className="h-4 w-4" />
            </a>
          </Button>
          <Button
            className="hover:bg-slate-100 rounded-xl h-7 w-7"
            variant="ghost"
            size="icon"
          >
            <Github className="h-4 w-4" />
          </Button>
          <Button
            className="hover:bg-slate-100 rounded-xl h-7 w-7"
            variant="ghost"
            size="icon"
          >
            <Linkedin className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div>
        {/* <h2 className="text-2xl font-bold tracking-tighter mb-3">About Me</h2> */}
        {/* <div className="flex flex-col gap-2 text-xs">
          <p className="shared receive">Hey!</p>
          <p className="shared send">
            Hey! I'm <span className="underline">Kian</span> 😊.
          </p>
          <p className="shared receive">What's your background?</p>
          <p className="shared send">
            Graduating with a degree in <b>Computer Science</b>, I've always had
            a passion for building things - starting with{" "}
            <i>complex redstone machinery</i> in Minecraft, all the way to{" "}
            <span className="underline">full-stack web development</span> in{" "}
            <b>Next.js</b>.
          </p>
          <p className="shared receive">Cool! What are you doing now?</p>
          <p className="shared send">
            I'm currently working for <b>National Defence</b> and expanding my
            skills in <span className="underline">web development</span>,{" "}
            <span className="underline">cloud engineering</span> (AWS), and{" "}
            <span className="underline">infrastructure architecture</span>.
          </p>
        </div> */}
        <div className="flex flex-col gap-2 text-sm">
          <p className="shared receive">
            hey! i'm <span className="underline">kian</span> 😊
          </p>
          {/* <p className="shared send">
            I've always had a passion for building things - from creating{" "}
            <i>redstone contraptions</i> in Minecraft, all the way to{" "}
            <span className="underline">full-stack web development</span> in{" "}
            <b>Next.js</b>.
          </p> */}
          <p className="shared receive">
            i'm currently working for <b>National Defence</b> and expanding my
            skills in <span className="underline">web development</span>,{" "}
            <span className="underline">cloud engineering</span> (AWS), and{" "}
            <span className="underline">infrastructure architecture</span>.
          </p>
          <p className="shared receive">
            feel free to explore my projects, or{" "}
            <a
              className="underline font-bold decoration-2 decoration-red-600/30 hover:decoration-red-600/70"
              href="https://go.bazza.dev/resume"
              target="_blank"
              rel="noreferrer noopener"
            >
              if you're here for my resume, click here!
            </a>{" "}
            👈
          </p>

          <p className="shared receive">cheers! 🍻</p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold tracking-tighter mb-3">Projects</h2>
        <div className="flex flex-col gap-2 text-sm">
          <div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-3 items-center">
                <a
                  className="underline"
                  href="https://github.com/bazzadev/optimalenchanttool"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Optimal Enchant Tool
                </a>
                {/* <div>
                  <Badge className="font-medium" variant="secondary">
                    Next.js
                  </Badge>
                </div> */}
              </div>
              <p className="text-gray-500">
                Optimize combining things in an anvil in Minecraft.
              </p>
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-amber-700 opacity-50">
              <a
                className="underline"
                href="https://github.com/bazzadev/simplemenus"
                target="_blank"
                rel="noreferrer noopener"
              >
                Simple Menus
              </a>
              <Archive className="h-4 w-4" />
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-amber-700 opacity-50">
              <a
                className="underline"
                href="https://github.com/bazzadev/deltacore"
                target="_blank"
                rel="noreferrer noopener"
              >
                DeltaCore
              </a>
              <Archive className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
