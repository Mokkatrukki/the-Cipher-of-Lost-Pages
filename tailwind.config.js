/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#1a1a1a',
          green: '#00ff00',
          white: '#ffffff',
          yellow: '#ffff00',
          red: '#ff0000',
          cyan: '#00ffff',
          purple: '#ff00ff',
          gray: '#808080',
        }
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
      }
    },
  },
  plugins: [],
}