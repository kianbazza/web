import type { Metadata } from 'next'
import { CraftArticlePage } from '../../_/craft-article-page'
import { createCraftMetadata } from '../../_/craft-metadata'

const title = 'Hand-drawn signature'

export const metadata: Metadata = {
  ...createCraftMetadata({
    title,
    description:
      'A hand-drawn signature animation built with SVG path drawing.',
  }),
}

export default function Page() {
  return <CraftArticlePage slug="signature" />
}
