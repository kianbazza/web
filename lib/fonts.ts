import { Inter, Newsreader } from 'next/font/google'
import localFont from 'next/font/local'

export const inter = Inter({
  subsets: ['latin'],
  axes: ['opsz'],
  display: 'block',
  variable: '--font-inter',
})

export const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'block',
  variable: '--font-newsreader',
  style: 'italic',
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
    {
      path: './fonts/berkeley-mono/BerkeleyMono-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/berkeley-mono/BerkeleyMono-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/berkeley-mono/BerkeleyMono-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
})
