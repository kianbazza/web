import type { Metadata } from 'next'
import { CraftArticlePage } from '../../_/craft-article-page'
import { createCraftMetadata } from '../../_/craft-metadata'

const title = 'Hit area'

export const metadata: Metadata = {
  ...createCraftMetadata({
    title,
    description:
      'A collection of TailwindCSS utility classes for expanding the hit area of interactive elements.',
  }),
}

export default function Page() {
  return <CraftArticlePage slug="hit-area" />
}
