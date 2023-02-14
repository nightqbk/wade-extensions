/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    './**/*.tsx',
    './src/**/*.{html,js}',
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  plugins: [require('tw-elements/dist/plugin')]
}
