/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e85a4f',
          50: '#fdf2f1',
          100: '#fbe6e4',
          200: '#f6c0bc',
          300: '#f2a49d',
          400: '#ed7c71',
          500: '#e85a4f',
          600: '#d33b2f',
          700: '#ac2f25',
          800: '#8a2820',
          900: '#71211a',
        },
        sage: {
          DEFAULT: '#8d9b6a',
          50: '#f5f7f0',
          100: '#eaefe1',
          200: '#d5e0c3',
          300: '#b8c99e',
          400: '#9caf7f',
          500: '#8d9b6a',
          600: '#717c51',
          700: '#5c6642',
          800: '#4a5235',
          900: '#3d442c',
        },
        sand: {
          DEFAULT: '#e8d7b5',
          50: '#fcfaf5',
          100: '#f8f5eb',
          200: '#f2e9d6',
          300: '#e8d7b5',
          400: '#dcc090',
          500: '#d0a76b',
          600: '#c48a46',
          700: '#ab723c',
          800: '#8a5c36',
          900: '#704c2f',
        },
        dark: {
          DEFAULT: '#333333',
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#333333',
        }
      },
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 