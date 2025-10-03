/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        'light':'#F3F5F9',
        'dark':'#111111',
      },
      colors:{
        'primary':'#9381FF',
        'secondary':'#3A86FF',
        'tertiary':'#8338EC',
        
      },
      fontFamily:{ 
        'poppins':['Poppins', 'sans-serif'],
        'roboto':['Roboto', 'sans-serif'],
      },
      containerSize:{
        'custom':'1440px',
      },
      

    },
  },
  plugins: [],
}