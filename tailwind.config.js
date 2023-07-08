/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#00C9FF',
      },
      fontFamily: {
        inter: ['var(--inter-font)'],
        martian: ['var(--martian-mono-font)'],
      },
    },
  },
};
