import { format } from 'date-fns'
import type { Metadata } from 'next'
import { WidthContainer } from '@/components/width-container'
import { env } from '@/lib/env'
import { craftSource } from '@/lib/source'
import { useMDXComponents } from '@/mdx-components'
import { BackToCraft } from '../../_/back-to-craft'
import { TableOfContents } from './toc'

const title = 'Hand-drawn signature'

export const metadata: Metadata = {
  title,
  description: 'A hand-drawn signature animation built with SVG path drawing.',
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
  // biome-ignore lint/style/noNonNullAssertion: allowed
  const page = craftSource.getPage(['signature'])!

  const MDX = page.data.body

  const date = page.data.published_date as unknown as Date
  const formattedDate = format(date, 'MMMM yyyy')

  return (
    <div className="grid grid-cols-[1fr_auto_1fr]">
      <div className="col-span-1 flex flex-col items-end">
        <div className="fixed top-36 max-xl:hidden mr-32 flex flex-col gap-4">
          <BackToCraft />
          <TableOfContents toc={page.data.toc} />
        </div>
      </div>
      <WidthContainer className="col-span-1 overflow-y-visible">
        <div className="mt-16 sm:mt-32 flex flex-col gap-12 relative">
          <div className="xl:hidden translate-x-3">
            <BackToCraft />
          </div>
          <div className="font-[450]">
            <h1 className="text-xl">{page.data.title}</h1>
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
