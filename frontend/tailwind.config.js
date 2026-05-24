/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17211f",
        mint: "#0f766e",
        coral: "#e85d4f",
        amber: "#f4a261",
        paper: "#f8faf7",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(23, 33, 31, 0.09)",
      },
    },
  },
  plugins: [],
};
