import { format, parse, parseISO } from 'date-fns'
import { ArrowUpLeftIcon } from 'lucide-react'
import { WidthContainer } from '@/components/width-container'
import { craftSource } from '@/lib/source'
import { cn } from '@/lib/utils'
import { useMDXComponents } from '@/mdx-components'
import { TableOfContents } from './toc'

function BackToCraft({ className }: { className?: string }) {
  return (
    <a
      href="/craft"
      className={cn(
        'flex items-center gap-2 text-sand-10 group hover:text-sand-12 transition-[color] duration-150 ease-out',
        className,
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
  )
}

export default function Page() {
  const page = craftSource.getPage(['cursor-origin'])

  const MDX = page!.data.body

  const date = page!.data.published_date as unknown as Date
  const formattedDate = format(date, 'MMMM yyyy')

  return (
    <div className="grid grid-cols-[1fr_auto_1fr]">
      <div className="col-span-1 flex flex-col items-end">
        <div className="fixed top-36 max-xl:hidden mr-32 flex flex-col gap-4">
          <BackToCraft />
          <TableOfContents toc={page!.data.toc} />
        </div>
      </div>
      <WidthContainer className="col-span-1 overflow-y-visible">
        <div className="mt-16 sm:mt-32 flex flex-col gap-12 relative">
          <div className="xl:hidden translate-x-3">
            <BackToCraft />
          </div>
          <div className="font-[450]">
            <h1 className="text-xl">{page!.data.title}</h1>
            <span className="text-sand-10">{formattedDate}</span>
          </div>
          <div className="space-y-12">
            <MDX components={useMDXComponents()} />
          </div>
        </div>
      </WidthContainer>
    </div>
  )
}
