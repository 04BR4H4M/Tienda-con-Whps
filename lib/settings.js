import { createClient } from "@/lib/supabase/server";

const DEFAULTS = {
  site_name: "Tallo & Cera",
  tagline: "Jabones y velas hechos a mano en Bogotá.",
  hero_eyebrow: "Hecho a mano · Bogotá",
  hero_title: "Jabones y velas que transforman tu espacio",
  hero_subtitle:
    "Ingredientes naturales, aromas exclusivos y un pedido tan simple como escribirnos por WhatsApp.",
  hero_cta_label: "Ver catálogo",
  hero_image: null,
  whatsapp_footer: "+57 300 111 2233",
  contact_email: "hola@talloycera.com",
};

// Trae la fila única de configuración del sitio. Si todavía no se corrió
// supabase/schema.sql, o la tabla está vacía, cae de vuelta a los valores
// por defecto para que el sitio nunca se rompa por esto.
export async function getSiteSettings() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();

  if (error || !data) return DEFAULTS;
  return { ...DEFAULTS, ...data };
}
