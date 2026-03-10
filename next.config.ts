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
      source: '/ingest/static/:path*',
      destination: 'https://us-assets.i.posthog.com/static/:path*',
    },
    {
      source: '/ingest/:path*',
      destination: 'https://us.i.posthog.com/:path*',
    },
  ],
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [new URL('https://bazza-dev.b-cdn.net/**')],
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
