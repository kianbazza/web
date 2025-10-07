import { ArrowUpLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { WidthContainer } from '@/components/width-container'
import { cn } from '@/lib/utils'
import { Media } from '../_/craft-media'
import { OriginAwareButton, OriginAwareButtonExperiment } from './button'

export default function Page() {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr]">
      <div className="col-span-1 flex flex-col items-end">
        <a
          href="/craft"
          className={cn(
            'fixed top-36',
            'mr-12',
            'flex items-center gap-2 text-sand-10 group hover:text-sand-12 transition-[color] duration-150 ease-out',
          )}
        >
          <div>
            <div className="overflow-hidden size-4 absolute top-0 -left-3">
              <div className="relative *:transition-all *:size-4">
                <ArrowUpLeftIcon className="absolute top-0 left-0 group-hover:-translate-x-4 group-hover:-translate-y-4" />
                <ArrowUpLeftIcon className="absolute top-0 left-0 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:-translate-y-0" />
              </div>
            </div>
          </div>
          <span>Craft</span>
        </a>
      </div>
      <WidthContainer className="col-span-1 overflow-visible">
        <div className="sm:mt-32 flex flex-col gap-12 relative">
          <div className="font-[450]">
            <h1 className="text-xl">Cursor-origin background scale</h1>
            <span className="text-sand-10">October 2025</span>
          </div>
          <div className="space-y-4 text-sand-11">
            <p>
              I saw{' '}
              <Link
                className="underline underline-offset-2 hover:text-sand-12"
                href="https://x.com/merycodes/status/1957184627103375528"
              >
                this post
              </Link>{' '}
              on my X timeline and was intrigued.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Media
              theme="light"
              src="https://bazza-dev.b-cdn.net/subtle-cursor-origin-background-scale-button.mp4"
              type="video"
              width={958}
              height={540}
              alt="Subtle cursor-origin background scale button"
              wrapperClassName={cn(
                'z-10',
                'rounded-xl h-full w-full overflow-clip border',
              )}
            />
            <span className="text-sm text-sand-10 text-center">
              Subtle cursor-origin background scale by{' '}
              <Link
                className="hover:text-sand-12 hover:underline underline-offset-2"
                href="https://x.com/merycodes"
              >
                @merycodes
              </Link>
              .
            </span>
          </div>
          <div className="space-y-4 text-sand-11">
            <p>
              I frequently see design posts like this and think to myself,
              <i>"this looks pretty cool, I should try to recreate this."</i>
            </p>
            <p>
              Unfortunately, balancing three jobs leads to these ideas of
              (seemingly) low ROI to get brushed to the waistline, amongst the
              mountain of more pressing work.
            </p>
          </div>
          <div className="space-y-4 text-sand-11">
            <p>
              Well today I said{' '}
              <span className="font-semibold">enough is enough.</span>
            </p>
          </div>
          <div className="space-y-4 text-sand-11">
            <p>
              Try hovering the button to see the button's background appear.
            </p>
            <p>
              When the button is hovered, the background originates from the
              cursor location.
            </p>
            <p>
              When the button is un-hovered, the background "disappears" from
              the where the cursor left the button.
            </p>
          </div>
          <div
            className="w-full max-w-(--breakpoint-sm) h-40 flex flex-col justify-center items-center bg-white dark:bg-sand-2 border border-sand-5 rounded-xl gap-12 relative"
            style={
              {
                '--duration': '150ms',
              } as React.CSSProperties
            }
          >
            <OriginAwareButton />
          </div>
          <div className="space-y-4 text-sand-11">
            <p>To contrast, see the experiment below.</p>
            <p>
              Use the slow-mo switch to slow down the transition speed to see
              the cursor origin animation more clearly.
            </p>
          </div>
          <OriginAwareButtonExperiment />
        </div>
      </WidthContainer>
    </div>
  )
}
