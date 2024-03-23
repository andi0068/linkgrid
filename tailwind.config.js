/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/components/**/*.{ts,tsx}',
    './styles/**/*.ts',
  ],
  theme: {
    extend: {
      colors: {
        separator: 'hsla(0, 0%, 50%, .24)',
        foreground: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          accent: 'hsl(211, 100%, 67%)',
          danger: 'hsl(0, 100%, 74%)',
          secondary: 'hsl(240, 1%, 66%)',
          tertiary: 'hsl(0, 0%, 50%)',
        },
        background: {
          DEFAULT: 'hsl(0, 0%, 0%)',
          accent: 'hsl(211, 100%, 35%)',
          danger: 'hsl(0, 100%, 35%)',
          secondary: 'hsl(0, 0%, 9%)',
          tertiary: 'hsl(0, 0%, 13%)',
        },
      },
    },
  },
  plugins: [],
};
