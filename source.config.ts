import { transformerNotationHighlight } from '@shikijs/transformers'
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from 'fumadocs-mdx/config'
import z from 'zod'
import { oscuraMidnight } from './lib/shiki/oscura-midnight'
import { oscuraSunrise } from './lib/shiki/oscura-sunrise'

export const craft = defineDocs({
  dir: 'content/craft',
  docs: {
    schema: frontmatterSchema.extend({
      published_date: z.coerce.string().transform((str) => String(str)),
    }),
  },
})

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: oscuraSunrise,
        dark: oscuraMidnight,
      },
      transformers: [transformerNotationHighlight()],
    },
  },
})
