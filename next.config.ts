// import { readFileSync } from 'node:fs'
// import { parse as parseJSONC } from 'jsonc-parser'
// import { rehypeCode } from 'fumadocs-core/mdx-plugins'
import { createMDX } from 'fumadocs-mdx/next'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  redirects: async () => [
    {
      source: '/meet',
      destination: 'https://cal.com/bazza',
      permanent: false,
    },
  ],
  images: {
    remotePatterns: [new URL('https://bazza-dev.b-cdn.net/**')],
  },
}

// const oscuraSunrise = parseJSONC(
//   readFileSync('./lib/shiki/oscura-sunrise.jsonc', 'utf-8'),
// )
//
// const oscuraMidnight = parseJSONC(
//   readFileSync('./lib/shiki/oscura-midnight.jsonc', 'utf-8'),
// )

const withMDX = createMDX({})

export default withMDX(nextConfig)
