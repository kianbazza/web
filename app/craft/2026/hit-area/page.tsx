import type { Metadata } from 'next'
import { CraftArticlePage } from '../../_/craft-article-page'
import { createCraftMetadata } from '../../_/craft-metadata'

const title = 'Hit area'

export const metadata: Metadata = {
  ...createCraftMetadata({
    title,
    description:
      'Expand the hit area of an interactive element using a CSS pseudo-element.',
  }),
}

export default function Page() {
  return <CraftArticlePage slug="hit-area" />
}
