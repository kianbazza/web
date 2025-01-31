import type { Metadata } from 'next'
import './globals.css'
import { berkeleyMono, inter } from '@/lib/fonts'
import { MotionLogo, NextJSLogo, VercelLogo } from '@/lib/icons'
import Link from 'next/link'
import Toolbar from '@/components/toolbar'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Kian Bazarjani',
  description:
    'Kian Bazarjani. Designing beautiful, modern interfaces. Building avelin.app.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${berkeleyMono.variable} font-sans antialiased bg-background text-foreground min-h-screen w-screen flex flex-col py-4`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toolbar />
          <main className="flex flex-col max-w-screen-md h-full mx-auto w-full sm:flex-1 px-4">
            {children}
          </main>
          <footer className="flex flex-col w-full font-mono text-sand-10 text-sm select-none">
            <div className="h-[1px] w-full bg-sand-4 mb-4" />
            <div className="max-w-screen-md mx-auto flex w-full px-4 justify-between">
              <p>2025 © Kian Bazarjani.</p>
              <p className="h-4 inline-flex items-center">
                <span className="hidden sm:block">Built with </span>
                <Link href="https://vercel.com">
                  <VercelLogo className="ml-[1.5ch] size-5 inline-block mr-1 dark:fill-sand-12" />
                </Link>
                <Link href="https://nextjs.org">
                  <NextJSLogo className="size-5 inline-block mr-1" />
                </Link>
                <Link href="https://motion.dev">
                  <MotionLogo className="inline-block size-5 translate-y-1 bg-[#fff312]" />
                </Link>
                .
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
