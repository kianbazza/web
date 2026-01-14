import { format } from 'date-fns'
import type { Metadata } from 'next'
import { WidthContainer } from '@/components/width-container'
import { env } from '@/lib/env'
import { craftSource } from '@/lib/source'
import { useMDXComponents } from '@/mdx-components'
import { BackToCraft } from '../../_/back-to-craft'
import { TableOfContents } from '../cursor-origin/toc'

const title = 'Video player'

export const metadata: Metadata = {
  title,
  description:
    'A prototype of a video player with a timeless, modern interface.',
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  keywords: [
    'React',
    'shadcn/ui',
    'Next.js',
    'Tailwind CSS',
    'TypeScript',
    'Radix UI',
  ],
  authors: [
    {
      name: 'Kian Bazza',
      url: 'https://bazza.dev',
    },
  ],
  creator: 'Kian Bazza',
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(title)}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: `/og?title=${encodeURIComponent(title)}`,
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `https://bazza.dev/site.webmanifest`,
}

export default function Page() {
  const page = craftSource.getPage(['video-player'])

  const MDX = page!.data.body

  const date = page!.data.published_date as unknown as Date
  const formattedDate = format(date, 'MMMM yyyy')

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] [&_h1]:scroll-mt-[114px] [&_h2]:scroll-mt-[114px] [&_h3]:scroll-mt-[114px] [&_h4]:scroll-mt-[114px] [&_h5]:scroll-mt-[114px] [&_h6]:scroll-mt-[114px]">
      {/*<HideGlobalFade />*/}
      <div className="col-span-1 flex flex-col items-end">
        <div className="fixed top-36 bottom-64 max-2xl:hidden mr-48 flex flex-col gap-4">
          <BackToCraft />
          <TableOfContents
            toc={page!.data.toc}
            showIntro
            introLabel="Introduction"
          />
        </div>
      </div>
      <WidthContainer className="col-span-1 [--breakpoint:var(--breakpoint-md)]">
        <div className="mt-16 sm:mt-32 flex flex-col gap-12 relative">
          <div className="2xl:hidden translate-x-3">
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
