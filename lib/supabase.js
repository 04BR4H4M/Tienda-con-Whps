import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Si todavía no has configurado las variables de Supabase, el cliente
// queda en null y el resto del sitio sigue funcionando con los valores
// por defecto (ver lib/site-settings.js).
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
