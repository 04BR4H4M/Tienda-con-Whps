import { createClient } from "@/lib/supabase/server";

// Estas funciones reemplazan al antiguo data/products.js: mismo "contrato"
// (mismos nombres, misma forma de los datos) pero ahora consultan Supabase
// en vez de un arreglo fijo. Así el resto de la app no tuvo que cambiar de lógica.

export async function getCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("slug, label")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error cargando categorías:", error.message);
    return [];
  }
  return data;
}

export async function getProducts({ category } = {}) {
  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (category && category !== "todos") {
    query = query.eq("category_slug", category);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error cargando productos:", error.message);
    return [];
  }
  return data.map(mapProduct);
}

export async function getProductBySlug(slug) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("Error cargando producto:", error.message);
    return null;
  }
  return data ? mapProduct(data) : null;
}

export async function getFeaturedProducts(count = 4) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .not("badge", "is", null)
    .order("sort_order", { ascending: true })
    .limit(count);

  if (error) {
    console.error("Error cargando destacados:", error.message);
    return [];
  }
  return data.map(mapProduct);
}

// Convierte el registro de la BD (category_slug, short_desc) a la forma que
// ya esperaban los componentes (category, shortDesc).
function mapProduct(row) {
  return { ...row, category: row.category_slug, shortDesc: row.short_desc };
}
