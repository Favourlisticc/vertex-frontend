/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        medical: {
          light: '#e6f3ff',
          DEFAULT: '#2196f3',
          dark: '#1565c0',
        },
        accent: {
          light: '#fff8e6',
          DEFAULT: '#ffc107',
          dark: '#ffa000',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      height: {
        'screen-90': '90vh',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.10)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: '#0d9488',
              '&:hover': {
                color: '#0f766e',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}