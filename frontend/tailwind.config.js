/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'beammp-orange': {
          DEFAULT: '#F36D24', // Base color
        },
        'beammp-white': {
          DEFAULT: '#FFFFFF', // Base color
        },
        'beammp-black': {
          DEFAULT: '#000000', // Base color
        },
        'beammp-gray': {
          DEFAULT: '#333333', // Base color
        },
        'beammp-green': {
          DEFAULT: '#1D9749', // Base color
        },
        'beammp-blue': {
          DEFAULT: '#4470B6', // Base color
        },
      },
    },
  },
  plugins: [],
}

