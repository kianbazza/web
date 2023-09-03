"use client"

import { Button } from "@/components/ui/button"
import { Archive, FileText, Github, Linkedin } from "lucide-react"
import TypingAnimationText from "./_components/TypingAnimationText"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"

const roles = [
  "web developer",
  "cloud engineer",
  "infrastructure architect",
  "web/cloud/infrastructure developer",
]

export default function TldrPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
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
            <TypingAnimationText texts={roles} loop={false} /> @{" "}
            <span className="align-middle">🇨🇦</span>
          </a>
        </div>
        <div className="flex gap-1 sm:gap-2">
          <Button
            className="hover:bg-slate-100 rounded-xl h-7 w-7"
            variant="ghost"
            size="icon"
          >
            <FileText className="h-4 w-4" />
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
        <h2 className="text-2xl font-bold tracking-tighter mb-3">Projects</h2>
        <div className="flex flex-col gap-2 text-sm">
          <div>
            <div className="inline-flex items-center gap-2">
              <span>Optimal Enchant Tool</span>
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-2">
              <span>Simple Menus</span>
              <Archive className="h-4 w-4" />
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-2">
              <span>DeltaCore</span>
              <Archive className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
