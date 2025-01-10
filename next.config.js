/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/toolbox/passgen',
        destination: `${process.env.NEXT_PUBLIC_PASSGEN_URL}/toolbox/passgen`,
      },
      {
        source: '/toolbox/passgen/:path*',
        destination: `${process.env.NEXT_PUBLIC_PASSGEN_URL}/toolbox/passgen/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
