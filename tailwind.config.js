/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        color1: "#FFF1E6",
        color2: "#FDE2E4",
        color3: "#E2ECE9",
        color4: "#CDDAFD",
        color5: "#DBE7E4",
        primary: {
          light: "#FDE2E4",
          DEFAULT: "#E58A9D",
          dark: "#C9687F",
        },
        accent: {
          light: "#FFF1E6",
          DEFAULT: "#FDE2E4",
          dark: "#D77E91",
        },
        rose: {
          DEFAULT: "#E58A9D",
          dark: "#C9687F",
        },
        ink: {
          DEFAULT: "#24242C",
          soft: "#77757D",
        },
        surface: "#FAF9F7",
        whatsapp: {
          DEFAULT: "#3A9B78",
          dark: "#2E7E63",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        glossy: "0 10px 24px rgba(229,138,157,0.20)",
        card: "0 14px 35px rgba(36,36,44,0.08)",
        soft: "0 8px 30px rgba(36,36,44,0.06)",
      },
    },
  },
  plugins: [],
};
