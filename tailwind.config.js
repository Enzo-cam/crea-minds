/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        poppins: "Poppins",
      },
      colors:{
        brown: "#463f3a",
        brownStrong: "#43281c"
      }
    },
  },
  plugins: [],
}

//Colors: 5e503f c6ac8f 22333b eae0d5 0a0908