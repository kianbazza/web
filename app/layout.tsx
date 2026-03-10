import type { Metadata } from 'next'
import './globals.css'
import { NextProvider } from 'fumadocs-core/framework/next'
import BreakpointVisualizer from '@/components/breakpoint-visualizer'
import { ThemeProvider } from '@/components/theme-provider'
import Toolbar from '@/components/toolbar'
import { berkeleyMono, inter, newsreader } from '@/lib/fonts'
import { ContainerProvider } from '@/providers/container-provider'
import OneDollarStatsScript from './stats'

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
      <OneDollarStatsScript />
      <body
        className={`${inter.variable} ${newsreader.variable} ${berkeleyMono.variable} font-mono antialiased bg-background text-foreground min-h-svh w-svw flex flex-col no-scrollbar`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toolbar />
          <BreakpointVisualizer />
          <NextProvider>
            <ContainerProvider>
              <main className="flex flex-col h-full sm:flex-1 px-4 w-full pt-4 pb-32">
                {children}
              </main>
            </ContainerProvider>
          </NextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
