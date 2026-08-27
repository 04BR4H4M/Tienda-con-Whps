/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Los 5 colores pasteles pedidos, disponibles tal cual
        // (bg-color1, text-color3, border-color5, etc.) por si se
        // necesitan sueltos en algún lado.
        color1: "#00C2CB", // turquesa
        color2: "#7FE0D4", // menta
        color3: "#FFE38A", // amarillo pastel
        color4: "#FF9A76", // durazno
        color5: "#FF5D8F", // rosa

        // Mismos nombres de token que ya usa todo el sitio (primary, accent,
        // ink, surface) para que el cambio de paleta se propague solo, sin
        // tener que tocar cada componente uno por uno.
        primary: {
          light: "#7FE0D4", // color2 — hover / fondos suaves
          DEFAULT: "#00C2CB", // color1 — botones, links, marca
          dark: "#048C93", // variante oscura de color1, para texto legible
        },
        accent: {
          light: "#FFE38A", // color3 — detalles, estrellas de destacado
          DEFAULT: "#FF9A76", // color4 — CTA secundario, precios
          dark: "#E8724C", // variante oscura de color4
        },
        rose: {
          DEFAULT: "#FF5D8F", // color5 — insignias, "Destacado", hover llamativo
          dark: "#E23F72",
        },
        ink: {
          DEFAULT: "#2B2B36",
          soft: "#6E6E7A",
        },
        surface: "#F5FEFD", // tinte muy suave de menta, no gris frío
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
        glossy: "0 6px 16px rgba(0,194,203,0.30), inset 0 1px 0 rgba(255,255,255,0.4)",
        card: "0 14px 24px rgba(43,43,54,0.08)",
      },
    },
  },
  plugins: [],
};
