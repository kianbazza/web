import type { Config } from 'tailwindcss'

function getColorScale(name: string, alpha?: boolean) {
  const scale: Record<string, string> = {}
  for (let i = 1; i <= 12; i++) {
    scale[i] = `var(--${name}-${i})`
    // next line only needed if using alpha values
    // if (alpha) scale[`a${i}`] = `var(--${name}-a${i})`
  }

  return scale
}

export default {
  darkMode: 'class',
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
        red: getColorScale('red'),
        plum: getColorScale('plum'),
        blue: getColorScale('blue'),
        lime: getColorScale('lime'),
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

export function hello() {
  try {
    console.log('hello')
  } catch (e) {
    console.error(`
      On this lonely road,
      Something else here.
    `)

    throw new Error('404')
  }
}
