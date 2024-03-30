"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FileText, Github, Linkedin } from "lucide-react";
import TypingAnimationText from "./_components/TypingAnimationText";
import { Badge } from "@/components/ui/badge";
import A from "@/components/A";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DarkModeToggle from "@/components/DarkModeToggle";
import Footer from "./_components/Footer";
import Chat from "@/components/Chat";

const roles = ["web developer", "cloud engineer", "infrastructure architect"];

export default function TldrPage() {
  return (
    <>
      <div className="flex-1">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tighter">
                Kian Bazarjani
              </h1>
              <a
                className="text-sm text-slate-500 hover:text-red-600 dark:hover:text-red-500 hover:underline hover:underline-offset-4 transition-colors"
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
                className="hover:bg-slate-100 rounded-lg h-7 w-7"
                variant="ghost"
              >
                <A href="https://go.bazza.dev/resume">
                  <FileText className="h-4 w-4" />
                </A>
              </Button>
              <Button
                className="hover:bg-slate-100 rounded-lg h-7 w-7"
                variant="ghost"
                size="icon"
              >
                <A href="https://github.com/bazzadev">
                  <Github className="h-4 w-4" />
                </A>
              </Button>
              <Button
                className="hover:bg-slate-100 rounded-lg h-7 w-7"
                variant="ghost"
                size="icon"
              >
                <A href="https://linkedin.com/in/kianbazarjani">
                  <Linkedin className="h-4 w-4" />
                </A>
              </Button>
              <DarkModeToggle />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 text-sm">
              <Chat>Hey, I'm Kian - nice to meet you! 😊</Chat>
              <Chat>
                I'm currently working for National Defence and expanding my
                skills in web development, cloud engineering, and infrastructure
                architecture.
              </Chat>
              <Chat>
                Feel free to explore my projects, or{" "}
                <A
                  className="underline font-bold decoration-2 decoration-red-600/30 hover:decoration-red-600/70 dark:decoration-red-600/70 dark:hover:decoration-red-600/100"
                  href="https://go.bazza.dev/resume"
                >
                  if you're here for my resume, click here!
                </A>{" "}
                👈
              </Chat>
              <Chat>Cheers! 🍻</Chat>
            </div>
            <div className="inline-flex gap-2 items-center text-sm text-neutral-500">
              <Avatar className="h-5 w-5">
                <AvatarImage src="https://github.com/bazzadev.png" />
                <AvatarFallback>KB</AvatarFallback>
              </Avatar>
              Kian, 3m ago
            </div>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tighter mb-5">
              Projects
            </h2>
            <div className="flex flex-col gap-4 text-sm">
              <div>
                <div className="flex flex-col gap-1">
                  <div className="inline-flex items-center gap-2">
                    <A className="underline" href="https://logbook.bazza.dev/">
                      Logbook
                    </A>
                    <Badge
                      className="font-medium select-none cursor-default bg-green-700/20 text-green-950 hover:bg-green-700/10 dark:bg-green-500/20 dark:text-green-50 dark:hover:bg-greeen-500/30"
                      variant="secondary"
                    >
                      New!
                    </Badge>
                  </div>
                  <p className="text-neutral-500">
                    A simple logbook to keep track of your work.
                  </p>
                </div>
              </div>

              <div>
                <div className="flex flex-col gap-1">
                  <A className="underline" href="https://oet.bazza.dev/">
                    Optimal Enchant Tool
                  </A>
                  <p className="text-neutral-500">
                    Optimize combining things in an anvil in Minecraft.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="inline-flex items-center gap-2">
                  <A className="underline" href="https://github.com/bliiink">
                    blink.
                  </A>
                  <Badge
                    className="font-medium select-none cursor-default bg-sky-700/20 text-sky-950 hover:bg-sky-700/10 dark:bg-sky-500/20 dark:text-sky-50 dark:hover:bg-sky-500/30"
                    variant="secondary"
                  >
                    Upcoming
                  </Badge>
                </div>
                <p className="text-neutral-500">
                  File sharing with zero hassle.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="inline-flex items-center gap-2">
                  <A className="underline cursor-not-allowed">
                    PAM Portal for MIM
                  </A>
                  <div className="inline-flex gap-1 items-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge className="font-medium">Private</Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">
                            The source code for this project will not be
                            released.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Badge
                      className="font-medium select-none cursor-default bg-sky-700/20 text-sky-950 hover:bg-sky-700/10 dark:bg-sky-500/20 dark:text-sky-50 dark:hover:bg-sky-500/30"
                      variant="secondary"
                    >
                      Upcoming
                    </Badge>
                  </div>
                </div>
                <p className="text-neutral-500">
                  Beautiful user interface for{" "}
                  <A
                    className="hover:underline"
                    href="https://learn.microsoft.com/en-us/microsoft-identity-manager/pam/privileged-identity-management-for-active-directory-domain-services"
                  >
                    MIM
                  </A>
                  's Privileged Access Management solution.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="inline-flex items-center gap-2">
                  <A
                    className="underline"
                    href="https://github.com/bazzadev/simplemenus"
                  >
                    Simple Menus
                  </A>
                  <Badge
                    className="font-medium select-none cursor-default bg-amber-700/20 hover:bg-amber-700/10 text-amber-950 dark:bg-amber-500/20 dark:hover:bg-amber-500/30 dark:text-amber-50"
                    variant="secondary"
                  >
                    Archived
                  </Badge>
                </div>
                <p className="text-neutral-500">
                  Command line interface builder for Java applications.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="inline-flex items-center gap-2">
                  <A
                    className="underline"
                    href="https://github.com/bazzadev/deltacore"
                  >
                    DeltaCore
                  </A>
                  <Badge
                    className="font-medium select-none cursor-default bg-amber-700/20 hover:bg-amber-700/10 text-amber-950 dark:bg-amber-500/20 dark:hover:bg-amber-500/30 dark:text-amber-50"
                    variant="secondary"
                  >
                    Archived
                  </Badge>
                </div>
                <p className="text-neutral-500">
                  Core plugin for the DeltaCore SMP Minecraft server.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
