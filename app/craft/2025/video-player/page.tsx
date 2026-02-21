import type { Metadata } from 'next'
import { CraftArticlePage } from '../../_/craft-article-page'
import { createCraftMetadata } from '../../_/craft-metadata'

const title = 'Video player'

export const metadata: Metadata = {
  ...createCraftMetadata({
    title,
    description:
      'A prototype of a video player with a timeless, modern interface.',
  }),
}

export default function Page() {
  return (
    <CraftArticlePage
      slug="video-player"
      showIntro
      introLabel="Introduction"
      sidebarClassName="fixed top-36 bottom-64 max-2xl:hidden mr-48 flex flex-col gap-4"
      containerClassName="[--breakpoint:var(--breakpoint-md)]"
      mobileBackClassName="2xl:hidden translate-x-3"
    />
  )
}
