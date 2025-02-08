/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "beammp-orange": '#f36d24',
      "beammp-white": '#ffffff',
      "beammp-black": '#000000',
      "beammp-gray": '#333333',
      "beammp-green": '#1d9749',
      "beammp-blue": '4470b6'
    },
    fontFamily: {
      sans: [
        '"Noto Sans"',
      ],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}

