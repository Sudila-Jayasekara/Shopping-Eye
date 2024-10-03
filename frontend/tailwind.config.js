/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        lora: ['Lora', 'serif'],
      },
      colors: {
        'dark-red': '#b33a3a', // Define your custom dark red color
      },
    },
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your project structure
  ],
  plugins: [],
}
