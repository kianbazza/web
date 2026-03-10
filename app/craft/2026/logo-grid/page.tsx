import type { Metadata } from 'next'
import { CraftArticlePage } from '../../_/craft-article-page'
import { createCraftMetadata } from '../../_/craft-metadata'

const title = 'Company logo grid'

export const metadata: Metadata = {
  ...createCraftMetadata({
    title,
    description:
      "A recreation of Navattic's animated company logo grid with staggered shimmer and hover color reveal.",
  }),
}

export default function Page() {
  return <CraftArticlePage slug="logo-grid" />
}
