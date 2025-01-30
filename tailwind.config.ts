import type { Config } from 'tailwindcss'

function getColorScale(name: string) {
  const scale: Record<string, string> = {}
  for (let i = 1; i <= 12; i++) {
    scale[i] = `var(--${name}-${i})`
    // next line only needed if using alpha values
    // scale[`a${i}`] = `var(--${name}-a${i})`
  }

  return scale
}

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: getColorScale('gray'),
        sand: getColorScale('sand'),
        background: 'var(--sand-1)',
        foreground: 'var(--sand-12)',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-berkeley-mono)'],
      },
    },
  },
  plugins: [],
} satisfies Config
