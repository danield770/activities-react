/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#333b43',
        secondary: '#008081',
        borderColor: '#cbcccd',
        'bg-primary': '#fbf9e5',
        'bg-secondary': '#ecfdfd',
      },
    },
  },
  plugins: [],
};
