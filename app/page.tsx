import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { FileText, Github, Linkedin } from 'lucide-react'
import TypingAnimationText from './_components/TypingAnimationText'
import { Badge } from '@/components/ui/badge'
import A from '@/components/A'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import DarkModeToggle from '@/components/DarkModeToggle'
import Footer from './_components/Footer'
import Chat from '@/components/Chat'

const roles = ['web developer', 'cloud engineer', 'infrastructure architect']

export default function TldrPage() {
  return (
    <>
      <div className="flex-1">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-black tracking-tighter sm:text-3xl">
                Kian Bazarjani
              </h1>
              <a
                className="text-sm text-zinc-500 transition-colors hover:text-red-600 hover:underline hover:underline-offset-4 dark:hover:text-red-500"
                href="mailto:kian@bazza.dev"
              >
                kian@bazza.dev
              </a>
              <a className="pt-2 text-sm">
                <TypingAnimationText
                  texts={roles}
                  loop={true}
                />{' '}
                @ <span className="align-middle">🇨🇦</span>
              </a>
            </div>
            <div className="flex gap-4">
              <Button
                className="h-7 w-7 rounded-lg"
                variant="ghost"
              >
                <A href="https://go.bazza.dev/resume">
                  <FileText className="h-4 w-4" />
                </A>
              </Button>
              <Button
                className="h-7 w-7 rounded-lg"
                variant="ghost"
                size="icon"
              >
                <A href="https://github.com/bazzadev">
                  <Github className="h-4 w-4" />
                </A>
              </Button>
              <Button
                className="h-7 w-7 rounded-lg"
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
              <Chat>{`Hey, I'm Kian - nice to meet you! 😊`}</Chat>
              <Chat>
                {`I'm currently working for National Defence and expanding my
                skills in web development, cloud engineering, and infrastructure
                architecture.`}
              </Chat>
              <Chat>
                Feel free to explore my projects, or{' '}
                <A
                  className="font-bold underline decoration-red-600/30 decoration-2 hover:decoration-red-600/70 dark:decoration-red-600/70 dark:hover:decoration-red-600/100"
                  href="https://go.bazza.dev/resume"
                >
                  {`if you're here for my resume, click here!`}
                </A>{' '}
                👈
              </Chat>
              <Chat>Cheers! 🍻</Chat>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-zinc-500">
              <Avatar className="h-5 w-5">
                <AvatarImage src="https://github.com/bazzadev.png" />
                <AvatarFallback>KB</AvatarFallback>
              </Avatar>
              Kian, just now
            </div>
          </div>
          <div>
            <h2 className="mb-5 text-xl font-bold tracking-tighter sm:text-2xl">
              Projects
            </h2>
            <div className="flex flex-col gap-4 text-sm">
              <div>
                <div className="flex flex-col gap-1">
                  <div className="inline-flex items-center gap-2">
                    <A
                      href="https://code.bazza.dev/"
                      className="hover:underline"
                    >
                      code.
                    </A>
                    <Badge
                      className="cursor-default select-none bg-green-700/20 font-medium text-green-950 dark:bg-green-500/20 dark:text-green-50"
                      variant="secondary"
                    >
                      New!
                    </Badge>
                  </div>
                  <p className="text-zinc-500">Code together, right now.</p>
                </div>
              </div>

              <div>
                <div className="flex flex-col gap-1">
                  <div className="inline-flex items-center gap-2">
                    <A
                      href="https://ui.bazza.dev/"
                      className="hover:underline"
                    >
                      ui labs.
                    </A>
                    <Badge
                      className="cursor-default select-none bg-green-700/20 font-medium text-green-950 dark:bg-green-500/20 dark:text-green-50"
                      variant="secondary"
                    >
                      New!
                    </Badge>
                  </div>
                  <p className="text-zinc-500">
                    My UI laboratory for designing beautiful components.
                  </p>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-1">
                  <div className="inline-flex items-center gap-2">
                    <A
                      className="hover:underline"
                      href="https://logbook.bazza.dev/"
                    >
                      logbook
                    </A>
                    <Badge
                      className="cursor-default select-none bg-green-700/20 font-medium text-green-950 dark:bg-green-500/20 dark:text-green-50"
                      variant="secondary"
                    >
                      New!
                    </Badge>
                  </div>
                  <p className="text-zinc-500">Your workday, timed and told.</p>
                </div>
              </div>

              <div>
                <div className="flex flex-col gap-1">
                  <A
                    className="hover:underline"
                    href="https://oet.bazza.dev/"
                  >
                    Optimal Enchant Tool
                  </A>
                  <p className="text-zinc-500">
                    Optimize combining things in an anvil in Minecraft.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="inline-flex items-center gap-2">
                  <A
                    className="hover:underline"
                    href="https://github.com/bliiink"
                  >
                    blink.
                  </A>
                  <Badge
                    className="cursor-default select-none bg-sky-700/20 font-medium text-sky-950 hover:bg-sky-700/10 dark:bg-sky-500/20 dark:text-sky-50 dark:hover:bg-sky-500/30"
                    variant="secondary"
                  >
                    Upcoming
                  </Badge>
                </div>
                <p className="text-zinc-500">File sharing with zero hassle.</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="inline-flex items-center gap-2">
                  <A className="cursor-not-allowed">PAM Portal for MIM</A>
                  <div className="inline-flex items-center gap-1">
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
                      className="cursor-default select-none bg-sky-700/20 font-medium text-sky-950 hover:bg-sky-700/10 dark:bg-sky-500/20 dark:text-sky-50 dark:hover:bg-sky-500/30"
                      variant="secondary"
                    >
                      Upcoming
                    </Badge>
                  </div>
                </div>
                <p className="text-zinc-500">
                  Beautiful user interface for{' '}
                  <A
                    className="hover:underline"
                    href="https://learn.microsoft.com/en-us/microsoft-identity-manager/pam/privileged-identity-management-for-active-directory-domain-services"
                  >
                    MIM
                  </A>
                  {`'s Privileged Access Management solution.`}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="inline-flex items-center gap-2">
                  <A
                    className="hover:underline"
                    href="https://github.com/bazzadev/simplemenus"
                  >
                    Simple Menus
                  </A>
                  <Badge
                    className="cursor-default select-none bg-amber-700/20 font-medium text-amber-950 hover:bg-amber-700/10 dark:bg-amber-500/20 dark:text-amber-50 dark:hover:bg-amber-500/30"
                    variant="secondary"
                  >
                    Archived
                  </Badge>
                </div>
                <p className="text-zinc-500">
                  Command line interface builder for Java applications.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="inline-flex items-center gap-2">
                  <A
                    className="hover:underline"
                    href="https://github.com/bazzadev/deltacore"
                  >
                    DeltaCore
                  </A>
                  <Badge
                    className="cursor-default select-none bg-amber-700/20 font-medium text-amber-950 hover:bg-amber-700/10 dark:bg-amber-500/20 dark:text-amber-50 dark:hover:bg-amber-500/30"
                    variant="secondary"
                  >
                    Archived
                  </Badge>
                </div>
                <p className="text-zinc-500">
                  Core plugin for the DeltaCore SMP Minecraft server.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
