import type { Metadata } from 'next'
import { env } from '@/lib/env'

const DEFAULT_KEYWORDS = [
  'React',
  'shadcn/ui',
  'Next.js',
  'Tailwind CSS',
  'TypeScript',
  'Radix UI',
]

const DEFAULT_AUTHORS = [
  {
    name: 'Kian Bazza',
    url: 'https://bazza.dev',
  },
]

interface CraftMetadataOptions {
  title: string
  description: string
}

export function createCraftMetadata({
  title,
  description,
}: CraftMetadataOptions): Metadata {
  const encodedTitle = encodeURIComponent(title)

  return {
    title,
    description,
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    keywords: DEFAULT_KEYWORDS,
    authors: DEFAULT_AUTHORS,
    creator: 'Kian Bazza',
    openGraph: {
      images: [
        {
          url: `/og?title=${encodedTitle}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: [
        {
          url: `/og?title=${encodedTitle}`,
        },
      ],
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: 'https://bazza.dev/site.webmanifest',
  }
}
