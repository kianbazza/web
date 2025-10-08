import { transformerNotationHighlight } from '@shikijs/transformers'
import { defineConfig, defineDocs } from 'fumadocs-mdx/config'
import { oscuraMidnight } from './lib/shiki/oscura-midnight'
import { oscuraSunrise } from './lib/shiki/oscura-sunrise'

export const craft = defineDocs({
  dir: 'content/craft',
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
