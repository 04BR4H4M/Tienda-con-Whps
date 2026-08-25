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
          light: "#3A5F45",
          DEFAULT: "#1E3B2A",
          dark: "#12261A",
        },
        accent: {
          DEFAULT: "#B8860B",
          dark: "#8F6A08",
        },
        ink: {
          DEFAULT: "#211D14",
          soft: "#6B6353",
        },
        surface: "#F6EEDD",
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
