import { type RehypeCodeOptions, rehypeCode } from 'fumadocs-core/mdx-plugins'
import { defineConfig, defineDocs } from 'fumadocs-mdx/config'

export const craft = defineDocs({
  dir: 'content/craft',
})

export default defineConfig({
  mdxOptions: {
    rehypePlugins: [
      [rehypeCode, { theme: 'github-dark' } satisfies RehypeCodeOptions],
    ],
  },
})
