/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Ensure dark mode is enabled
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // Include all component files
  theme: {
    extend: {
      colors: {
        "midnight-blue": "#1E3A5F",
        "soothing-lavender": "#A68ACB",
        "sleepy-moon-yellow": "#F7D08A",
      },
    },
  },
  plugins: [],
};
