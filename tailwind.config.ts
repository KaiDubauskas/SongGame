import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'murk': {
          background: '#2d343d',
          foreground: '#aec3b0',
          highlight: '#598392',
          accent: '#a4cb50',
          acccentDark: '#769339',
          text: '#eff6e0',
          DEFAULT: '#eff6e0',
          dark: '#01161e',
        }
      },

    },
  },
  plugins: [],
}
export default config



// 'murk': {

// background: '#124559',
//   foreground: '#aec3b0',
//     highlight: '#598392',
//       text: '#eff6e0',
//         DEFAULT: '#eff6e0',
//           dark: '#01161e',
//         }
