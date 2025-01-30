import localFont from 'next/font/local'
import { Inter } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'block',
  variable: '--font-inter',
})

export const berkeleyMono = localFont({
  display: 'block',
  variable: '--font-berkeley-mono',
  src: [
    {
      path: './fonts/berkeley-mono/BerkeleyMono-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/berkeley-mono/BerkeleyMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/berkeley-mono/BerkeleyMono-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/berkeley-mono/BerkeleyMono-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
})
