import { supabase } from "./supabase";

// Valores por defecto: se usan mientras no exista conexión a Supabase,
// o si la fila todavía no se ha guardado desde el panel de administrador.
const DEFAULTS = {
  site_name: "Mi Tienda",
  tagline: "Jabones y velas hechos a mano en Bogotá.",
  hero_eyebrow: "Hecho a mano · Bogotá",
  hero_title: "Jabones y velas que transforman tu espacio",
  hero_subtitle:
    "Ingredientes naturales, aromas exclusivos y un pedido tan simple como escribirnos por WhatsApp.",
  hero_cta_label: "Ver catálogo",
  hero_image: null,
  hero_images: [],
  whatsapp_footer: "+57 300 111 2233",
  contact_email: "hola@example.com",
};

// Server-side: se llama desde app/layout.jsx (Server Component).
// El nombre de la tienda y el resto de textos ya se editan desde el
// panel de administrador (tabla site_settings, fila id = 1).
export async function getSiteSettings() {
  if (!supabase) return DEFAULTS;

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (error || !data) return DEFAULTS;

  // Completa con los valores por defecto cualquier campo vacío.
  return { ...DEFAULTS, ...data };
}
