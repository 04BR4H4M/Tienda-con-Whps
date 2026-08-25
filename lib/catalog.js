import { supabase } from "./supabase";

// Genera un placeholder como imagen SVG local (data URI) — no depende de
// ningún servicio externo, así que nunca puede fallar por red, límites de
// uso o bloqueos de firewall (a diferencia de placehold.co). Se usa
// solo mientras un producto o categoría todavía no tiene foto propia.
function placeholderImage(label, bg = "1E3B2A", fg = "F6EEDD") {
  const safeLabel = String(label).slice(0, 24);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="700" height="700">
    <rect width="100%" height="100%" fill="#${bg}"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
          font-family="sans-serif" font-size="42" fill="#${fg}">${safeLabel}</text>
  </svg>`;
  const base64 = Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}

function mapProduct(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category_slug,
    price: row.price,
    badge: row.badge,
    shortDesc: row.short_desc,
    description: row.description,
    images: row.images && row.images.length > 0 ? row.images : [placeholderImage(row.name)],
    featured: row.is_featured,
  };
}

function mapCategory(row) {
  return {
    slug: row.slug,
    label: row.label,
    tagline: row.tagline || "",
    image: row.image || placeholderImage(row.label, "3A5F45"),
  };
}

// Todas las funciones devuelven listas vacías (en vez de romper la página)
// si Supabase todavía no está configurado — así el sitio no se cae mientras
// se termina de conectar el panel de administrador.

export async function getCategories() {
  if (!supabase) return [];
  const { data, error } = await supabase.from("categories").select("*").order("sort_order");
  if (error || !data) return [];
  return data.map(mapCategory);
}

export async function getProducts({ category } = {}) {
  if (!supabase) return [];
  let query = supabase.from("products").select("*").order("sort_order");
  if (category && category !== "todos") query = query.eq("category_slug", category);
  const { data, error } = await query;
  if (error || !data) return [];
  return data.map(mapProduct);
}

export async function getProductBySlug(slug) {
  if (!supabase) return null;
  const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single();
  if (error || !data) return null;
  return mapProduct(data);
}

// Destacados: ahora se controla desde el panel de administrador
// (columna is_featured en la tabla products), ya no a mano en el código.
export async function getFeaturedProducts(limit = 4) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .order("sort_order")
    .limit(limit);
  if (error || !data) return [];
  return data.map(mapProduct);
}
