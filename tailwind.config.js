/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'beammp-orange': '#F36D24',
        'beammp-white': '#FFFFFF',
        'beammp-black': '#000000',
        'beammp-gray': '#333333',
        'beammp-green': '#1D9749',
        'beammp-blue': '#4470B6',
      },
    },
  },
  plugins: [],
}
