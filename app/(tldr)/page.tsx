"use client"

import { Button } from "@/components/ui/button"
import { Archive, FileText, Github, Linkedin } from "lucide-react"
import TypingAnimationText from "./_components/TypingAnimationText"
import { ReceiveChatBubble } from "@/components/ChatBubble/ChatBubble"
import { Badge } from "@/components/ui/badge"
import A from "@/components/A"
import Image from "next/image"
import microsoftLogo from "@/public/Microsoft_logo.svg.png"

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
            <A href="https://go.bazza.dev/resume">
              <FileText className="h-4 w-4" />
            </A>
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
        <div className="flex flex-col gap-2 text-sm">
          <ReceiveChatBubble>hey! i'm Kian 😊</ReceiveChatBubble>
          <ReceiveChatBubble>
            i'm currently working for <b>National Defence</b> and expanding my
            skills in <span className="underline">web development</span>,{" "}
            <span className="underline">cloud engineering</span> (AWS), and{" "}
            <span className="underline">infrastructure architecture</span>.
          </ReceiveChatBubble>
          <ReceiveChatBubble>
            feel free to explore my projects, or{" "}
            <A
              className="underline font-bold decoration-2 decoration-red-600/30 hover:decoration-red-600/70"
              href="https://go.bazza.dev/resume"
            >
              if you're here for my resume, click here!
            </A>{" "}
            👈
          </ReceiveChatBubble>

          <ReceiveChatBubble>cheers! 🍻</ReceiveChatBubble>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold tracking-tighter mb-3">Projects</h2>
        <div className="flex flex-col gap-2 text-sm">
          <div>
            <div className="flex flex-col gap-1">
              <A className="underline" href="https://oet.bazza.dev/">
                Optimal Enchant Tool
              </A>
              <p className="text-gray-500">
                Optimize combining things in an anvil in Minecraft.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="inline-flex items-center gap-2 text-sky-700">
              <A className="underline" href="https://github.com/bliiink">
                blink.
              </A>
              <Badge
                className="font-medium bg-sky-700/20 text-sky-950 hover:bg-sky-700/10"
                variant="secondary"
              >
                Upcoming
              </Badge>
            </div>
            <p className="text-sky-700/50">File sharing with zero hassle.</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="inline-flex items-center gap-2 text-sky-700">
              <A
                className="underline inline-flex items-center gap-2"
                href="https://github.com/bazzadev/PAMPortal"
              >
                {/* <svg
                  // role="img"
                  className="h-4 w-4 fill-sky-700"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Windows 11</title>
                  <path d="M0,0H11.377V11.372H0ZM12.623,0H24V11.372H12.623ZM0,12.623H11.377V24H0Zm12.623,0H24V24H12.623" />
                </svg> */}
                <Image
                  src={microsoftLogo}
                  alt="Microsoft"
                  // layout="fill" // required
                  // objectFit="cover" // change to suit your needs
                  className="h-4 w-auto" // just an example
                />
                PAM Portal for MIM
              </A>
              <Badge
                className="font-medium bg-sky-700/20 text-sky-950 hover:bg-sky-700/10"
                variant="secondary"
              >
                Upcoming
              </Badge>
            </div>
            <p className="text-sky-700/50">
              Beautiful user interface for{" "}
              <A
                className="hover:underline"
                href="https://learn.microsoft.com/en-us/microsoft-identity-manager/pam/privileged-identity-management-for-active-directory-domain-services"
              >
                Microsoft Identity Manager
              </A>
              's Privileged Access Management solution.
            </p>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-amber-700 opacity-50">
              <A
                className="underline"
                href="https://github.com/bazzadev/simplemenus"
              >
                Simple Menus
              </A>
              <Badge
                className="inline-flex gap-1 font-medium bg-amber-700/20 hover:bg-amber-700/10 text-amber-950"
                variant="secondary"
              >
                Archived <Archive className="h-4 w-4" />
              </Badge>
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-amber-700 opacity-50">
              <A
                className="underline"
                href="https://github.com/bazzadev/deltacore"
              >
                DeltaCore
              </A>
              <Badge
                className="inline-flex gap-1 font-medium bg-amber-700/20 hover:bg-amber-700/10 text-amber-950"
                variant="secondary"
              >
                Archived <Archive className="h-4 w-4" />
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold tracking-tighter mb-3">Experience</h2>
        <div className="-my-6">
          <div className="relative pl-8 sm:pl-32 py-6 group">
            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
              <div>
                <Badge
                  variant="secondary"
                  className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs mb-3 sm:mb-0"
                >
                  Sept 2021
                </Badge>
              </div>
              <div className="text-base font-bold text-slate-900">
                Developer (Intern){" "}
                <span className="text-slate-600">@ National Defence</span>
              </div>
            </div>

            <div className="text-xs text-slate-500 flex flex-col gap-1"></div>
          </div>
          <div className="relative pl-8 sm:pl-32 py-6 group">
            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
              <div>
                <Badge
                  variant="secondary"
                  className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs mb-3 sm:mb-0"
                >
                  April 2023
                </Badge>
              </div>
              <div className="text-base font-bold text-slate-900">
                BSc in Computer Science{" "}
                <span className="text-slate-600">@ uOttawa</span>
              </div>
            </div>

            <div className="text-xs text-slate-500 flex flex-col gap-1">
              <p>
                Started in Electrical Engineering, then switched into Computer
                Science a year later.
              </p>
              <p>
                After five years and many more virtual courses, I finished my
                undergraduate degree and headed off to the workforce.
              </p>
            </div>
          </div>
          <div className="relative pl-8 sm:pl-32 py-6 group">
            {/* <div className="font-medium text-2xl text-indigo-500 mb-1 sm:mb-0">
              The origin
            </div> */}

            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
              <Badge
                variant="secondary"
                className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs mb-3 sm:mb-0"
              >
                July 2023
              </Badge>
              <div className="text-base font-bold text-slate-900">
                Developer{" "}
                <span className="text-slate-600">@ National Defence</span>
              </div>
            </div>

            <div className="text-xs text-slate-500 flex flex-col gap-1">
              <p>
                After taking a few months to myself after finishing school, I
                jumped into work with my previous team from DND.
              </p>
              <p>We get to wear many hats in my position:</p>
              <div className="flex flex-col">
                <span>• web application development using Next.js</span>
                <span>
                  • setup/configuration/maintenance of Windows server
                  infrastructure
                </span>
                <span>• management of cloud resources in AWS</span>
              </div>
            </div>
          </div>
          <div className="relative pl-8 sm:pl-32 py-6 group">
            {/* <div className="font-medium text-2xl text-indigo-500 mb-1 sm:mb-0">
              The origin
            </div> */}

            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
              <Badge
                variant="secondary"
                className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs mb-3 sm:mb-0"
              >
                Upcoming
              </Badge>
              <div className="text-base font-bold text-slate-900">
                AWS Certified Cloud Practitioner
              </div>
            </div>

            <div className="text-xs text-slate-500 flex flex-col gap-1"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
