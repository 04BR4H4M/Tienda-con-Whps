/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#12A377",
          DEFAULT: "#0E7C5A",
          dark: "#0A5C43",
        },
        accent: {
          DEFAULT: "#FFB100",
          dark: "#D99400",
        },
        ink: {
          DEFAULT: "#12141A",
          soft: "#5B5F6B",
        },
        surface: "#F3F4F7",
        whatsapp: {
          DEFAULT: "#20BD5A",
          dark: "#12A34C",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        glossy: "0 6px 16px rgba(14,124,90,0.35), inset 0 1px 0 rgba(255,255,255,0.3)",
        card: "0 14px 24px rgba(18,20,26,0.10)",
      },
    },
  },
  plugins: [],
};
