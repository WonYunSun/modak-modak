import type { Config } from 'tailwindcss';
import tailwindcssAnimated from 'tailwindcss-animated';
import scrollbarHide from 'tailwind-scrollbar-hide';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-day-picker/**/*.{js,jsx,ts,tsx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
      keyframes: {
        fade: {
          '0%': { opacity: '0' }, // 투명
          '50%': { opacity: '1' }, // 불투명
          '100%': { opacity: '0' }, // 다시 투명
        },
      },

      animation: {
        fade: 'fade 2s ease-in-out infinite', // 2초 지속, 부드럽게 반복
      },
    },
    boxShadow: {
      'group-card': '0px -2px 4px 0px rgba(0, 0, 0, 0.05), 0px 4px 8px 0px rgba(0, 0, 0, 0.10)',
    },
  },
  plugins: [tailwindcssAnimated, scrollbarHide],
};
export default config;
