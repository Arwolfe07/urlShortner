/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      colors: {
        'primary': '#5429ff',
        // 'secondary': '#',
        'fontcolor': '#344054',
        'bgcol': '#cbcce8',
        'other': '#667085'
      }
    },
  },
  plugins: [],
}

