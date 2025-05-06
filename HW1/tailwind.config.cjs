const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  content: ["./*.{html,js,ts}"], // This will look for all html, js, and ts files in the root
  theme: {
    extend: {},
  },
  plugins: [
    tailwindcss(),  // This plugin is used to enable Tailwind's styles
    autoprefixer(), // This plugin automatically adds vendor prefixes
  ],
};

