import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import { WidthContainer } from '@/components/width-container'
import { craftSource } from '@/lib/source'
import { cn } from '@/lib/utils'
import { useMDXComponents } from '@/mdx-components'
import { BackToCraft } from './back-to-craft'
import { TableOfContents } from './table-of-contents'

const ROOT_CLASSNAME =
  'grid grid-cols-[1fr_auto_1fr] [&_h1]:scroll-mt-[114px] [&_h2]:scroll-mt-[114px] [&_h3]:scroll-mt-[114px] [&_h4]:scroll-mt-[114px] [&_h5]:scroll-mt-[114px] [&_h6]:scroll-mt-[114px]'

const SIDEBAR_CLASSNAME = 'fixed top-36 max-xl:hidden mr-32 flex flex-col gap-4'
const CONTAINER_CLASSNAME = 'col-span-1 overflow-y-visible'
const MOBILE_BACK_CLASSNAME = 'xl:hidden translate-x-3'

interface CraftArticlePageProps {
  slug: string
  showIntro?: boolean
  introLabel?: string
  rootClassName?: string
  sidebarClassName?: string
  containerClassName?: string
  mobileBackClassName?: string
}

export function CraftArticlePage({
  slug,
  showIntro = false,
  introLabel = 'Intro',
  rootClassName,
  sidebarClassName,
  containerClassName,
  mobileBackClassName,
}: CraftArticlePageProps) {
  const page = craftSource.getPage([slug])

  if (!page) {
    notFound()
  }

  const MDX = page.data.body
  const publishedDate = format(new Date(page.data.published_date), 'MMMM yyyy')

  return (
    <div className={cn(ROOT_CLASSNAME, rootClassName)}>
      <div className="col-span-1 flex flex-col items-end">
        <div className={cn(SIDEBAR_CLASSNAME, sidebarClassName)}>
          <BackToCraft />
          <TableOfContents
            toc={page.data.toc}
            showIntro={showIntro}
            introLabel={introLabel}
          />
        </div>
      </div>
      <WidthContainer className={cn(CONTAINER_CLASSNAME, containerClassName)}>
        <div className="mt-16 sm:mt-32 flex flex-col gap-12 relative">
          <div className={cn(MOBILE_BACK_CLASSNAME, mobileBackClassName)}>
            <BackToCraft />
          </div>
          <div className="font-[450]">
            <h1 className="text-xl">{page.data.title}</h1>
            <span className="text-sand-10">{publishedDate}</span>
          </div>
          <div className="space-y-12">
            <MDX components={useMDXComponents()} />
          </div>
        </div>
      </WidthContainer>
    </div>
  )
}
