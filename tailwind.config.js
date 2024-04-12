/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#16181E",
        "text-color": "#d5d9e2",
        "border-color": "#343946",
      },
    },
  },
  plugins: [],
};
