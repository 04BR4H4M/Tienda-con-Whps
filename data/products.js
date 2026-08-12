// Catálogo de ejemplo (placeholders).
// En la Fase 2, esta función se reemplaza por una consulta a Supabase,
// para que el usuario administrador alimente esto desde un panel.

export const categories = [
  { slug: "jabones", label: "Jabones" },
  { slug: "velas", label: "Velas" },
  { slug: "otros", label: "Otros" },
];

const ph = (label, bg) =>
  `https://placehold.co/700x700/${bg}/ffffff?text=${encodeURIComponent(label)}`;

export const products = [
  {
    id: 1,
    slug: "jabon-avena-y-miel",
    name: "Jabón Avena y Miel",
    category: "jabones",
    price: 14000,
    badge: "Nuevo",
    shortDesc: "Exfoliante suave, base de aceite de oliva",
    description:
      "Elaborado con avena molida, miel pura y base de aceite de oliva. Ideal para piel sensible, uso diario. 100g.",
    images: [ph("Avena y Miel", "0E7C5A"), ph("Detalle", "12A377")],
  },
  {
    id: 2,
    slug: "jabon-carbon-activado",
    name: "Jabón Carbón Activado",
    category: "jabones",
    price: 15000,
    shortDesc: "Piel grasa, purificante",
    description:
      "Carbón activado de coco que absorbe el exceso de grasa y limpia en profundidad sin resecar. 100g.",
    images: [ph("Carbón Activado", "12141A")],
  },
  {
    id: 3,
    slug: "jabon-lavanda",
    name: "Jabón Lavanda",
    category: "jabones",
    price: 14000,
    shortDesc: "Relajante, ideal para la noche",
    description:
      "Aceite esencial de lavanda francesa. Aroma relajante, perfecto para la rutina nocturna. 100g.",
    images: [ph("Lavanda", "6B4FA0")],
  },
  {
    id: 4,
    slug: "vela-sandalo",
    name: "Vela Sándalo",
    category: "velas",
    price: 32000,
    badge: "Oferta",
    shortDesc: "Cera de soya, 180g, 40h de quema",
    description:
      "Cera de soya 100% natural con mecha de madera. Aroma cálido a sándalo. 180g, aprox. 40 horas de quema.",
    images: [ph("Vela Sándalo", "D99400"), ph("Encendida", "FFB100")],
  },
  {
    id: 5,
    slug: "vela-citrica",
    name: "Vela Cítrica",
    category: "velas",
    price: 32000,
    shortDesc: "Naranja y jengibre",
    description: "Mezcla energizante de naranja dulce y jengibre. Cera de soya, 180g.",
    images: [ph("Vela Cítrica", "E8720C")],
  },
  {
    id: 6,
    slug: "vela-cafe",
    name: "Vela Café",
    category: "velas",
    price: 35000,
    shortDesc: "Aroma intenso",
    description: "Notas torradas de café recién molido. Cera de soya, 220g, frasco reutilizable.",
    images: [ph("Vela Café", "4A2E1F")],
  },
  {
    id: 7,
    slug: "set-de-regalo",
    name: "Set de Regalo",
    category: "otros",
    price: 48000,
    badge: "Nuevo",
    shortDesc: "Jabón + vela + empaque",
    description:
      "Incluye un jabón y una vela a elección, con empaque de regalo en kraft y cinta natural.",
    images: [ph("Set de Regalo", "0A5C43"), ph("Empaque", "0E7C5A")],
  },
  {
    id: 8,
    slug: "difusor-de-varillas",
    name: "Difusor de Varillas",
    category: "otros",
    price: 28000,
    shortDesc: "Aroma bosque",
    description: "Difusor de varillas de 100ml, aroma bosque húmedo. Dura entre 6 y 8 semanas.",
    images: [ph("Difusor", "2F5233")],
  },
];

export function getProducts({ category } = {}) {
  if (!category || category === "todos") return products;
  return products.filter((p) => p.category === category);
}

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) || null;
}

export function getFeaturedProducts(count = 4) {
  return products.filter((p) => p.badge).slice(0, count);
}
