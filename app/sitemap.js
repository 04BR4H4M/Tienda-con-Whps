import { getProducts, getCategories } from "@/lib/catalog";

const SITE_URL = "https://dilustore.com.co";

// Se regenera en cada visita de Google (no es un archivo estático), así que
// cuando agregues o elimines un producto desde el panel, el sitemap se
// actualiza solo — nunca hay que tocar este archivo a mano.
export default async function sitemap() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const staticRoutes = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/catalogo`, changeFrequency: "daily", priority: 0.9 },
  ];

  const categoryRoutes = categories.map((c) => ({
    url: `${SITE_URL}/catalogo?categoria=${c.slug}`,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const productRoutes = products.map((p) => ({
    url: `${SITE_URL}/producto/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
