import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B94600',
        'primary-10': '#FFF2EB',
        'gray-300': '#D4D4D8',
        'gray-400': '#A1A1AA',
        'gray-500': '#71717A',
        'gray-600': '#575761',
        'gray-700': '#3F3F46',
        'gray-900': '#18181B'
      }
    },
    boxShadow: {
      'group-card': '0px -2px 4px 0px rgba(0, 0, 0, 0.05), 0px 4px 8px 0px rgba(0, 0, 0, 0.10)'
    }
  },
  plugins: []
};
export default config;
