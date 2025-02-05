/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        primary: '#B94600',
        'primary-2-300': '#FF741F',
        'primary-10': '#FFF2EB',
        'gray-50': '#F1F1F1',
        'gray-100': '#F4F4F5',
        'gray-200': '#E4E4E7',
        'gray-300': '#D4D4D8',
        'gray-400': '#A1A1AA',
        'gray-500': '#71717A',
        'gray-600': '#575761',
        'gray-700': '#3F3F46',
        'gray-900': '#18181B',
        'base-red': '#FF3B30',
      },
    },
  },
  plugins: [],
};
