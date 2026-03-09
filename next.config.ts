import { createMDX } from 'fumadocs-mdx/next'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  redirects: async () => [
    {
      source: '/meet',
      destination: 'https://cal.com/bazza',
      permanent: false,
    },
    {
      source: '/chat',
      destination: 'https://cal.com/bazza',
      permanent: false,
    },
  ],
  rewrites: async () => [
    {
      source: '/r',
      destination: '/r/registry.json',
    },
    {
      source: '/r/:name((?!.*\\.json$).+)',
      destination: '/r/:name.json',
    },
  ],
  images: {
    remotePatterns: [new URL('https://bazza-dev.b-cdn.net/**')],
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
