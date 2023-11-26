/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#5094ED',
        'secondary': '#5CF0B0',
        'defaultText': '#132043'
      },
    }
  },
  plugins: [],
}