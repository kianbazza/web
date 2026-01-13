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
  ],
  images: {
    remotePatterns: [new URL('https://bazza-dev.b-cdn.net/**')],
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
