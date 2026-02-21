import type { Metadata } from 'next'
import { CraftArticlePage } from '../../_/craft-article-page'
import { createCraftMetadata } from '../../_/craft-metadata'

const title = 'Cursor-origin background scale'

export const metadata: Metadata = {
  ...createCraftMetadata({
    title,
    description:
      'A prototype of a button with a cursor-origin background scaling animation.',
  }),
}

export default function Page() {
  return <CraftArticlePage slug="cursor-origin" />
}
