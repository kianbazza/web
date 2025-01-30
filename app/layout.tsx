import type { Metadata } from 'next'
import './globals.css'
import { berkeleyMono, inter } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'Kian Bazarjani',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${berkeleyMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  )
}
