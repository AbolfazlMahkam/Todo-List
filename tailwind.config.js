/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './public/**/*.{ejs,js}',
      './src/views/home.ejs',
    ],
    theme: {
        extend: {
          boxShadow: {
            'inr': 'inset 5px 5px 5px 5px rgb(0 0 0 / 0.05);',
          }
        }
      }
  }
