import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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

export default nextConfig
