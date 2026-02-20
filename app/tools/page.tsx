import Link from 'next/link'
import { H } from '@/components/h'
import { WidthContainer } from '@/components/width-container'

export default function Page() {
  return (
    <WidthContainer>
      <div className="flex flex-col gap-4 w-full mt-16">
        <div className="flex flex-col gap-4 w-full max-w-(--breakpoint-sm) mx-auto">
          <h1 className="tracking-[-0.05em]! text-3xl">Tools</h1>
          <p className="font-medium text-sand-10">
            Sharp tools. Built to solve. Here to stay.
          </p>
        </div>
        <div className="h-px w-full bg-sand-6 mt-4" />
        <div className="mx-auto flex w-full max-w-(--breakpoint-sm) flex-col gap-3">
          <Link
            href="/tools/mono"
            className="group rounded-2xl border border-sand-6 bg-sand-2/40 px-4 py-4 transition-colors hover:border-sand-8 hover:bg-sand-3/70"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-base font-medium">Monospace Generator</h2>
              <span className="text-xs text-sand-10 transition-colors group-hover:text-sand-11">
                /tools/mono
              </span>
            </div>
            <p className="mt-1 text-sm text-sand-10">
              Convert plain text into typewriter-style Unicode symbols.
            </p>
          </Link>
        </div>
      </div>
    </WidthContainer>
  )
}
