export const dynamic = 'force-static'

import { promises as fs } from 'node:fs'
import path from 'node:path'
import Container from '@/components/container'
import { compileMDX } from 'next-mdx-remote/rsc'
import type { MDXMetadata } from './[slug]/page'
import Link from 'next/link'

export default async function Page() {
  const filenames = await fs.readdir(path.join(process.cwd(), 'writing'))

  const projects = await Promise.all(
    filenames.map(async (filename) => {
      const content = await fs.readFile(
        path.join(process.cwd(), 'writing', filename),
        'utf-8',
      )
      const { frontmatter } = await compileMDX<MDXMetadata>({
        source: content,
        options: {
          parseFrontmatter: true,
        },
      })
      return {
        filename,
        slug: filename.replace('.mdx', ''),
        ...frontmatter,
      }
    }),
  )

  return (
    <Container className="font-mono mt-16 flex flex-col gap-8">
      {projects.map(({ slug, title }) => (
        <Link href={`/writing/${slug}`} key={slug}>
          {title}
        </Link>
      ))}
    </Container>
  )
}
