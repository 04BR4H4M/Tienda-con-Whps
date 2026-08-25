import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata = { title: "Panel administrativo — Tallo & Cera" };

export default async function AdminLayout({ children }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-white border-b border-black/5">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/admin" className="font-display font-extrabold text-lg text-primary-dark">
            Panel · Tallo &amp; Cera
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/admin/configuracion" className="text-ink-soft hover:text-ink font-semibold">
              Configuración
            </Link>
            <Link href="/" target="_blank" className="text-ink-soft hover:text-ink">
              Ver tienda ↗
            </Link>
            <span className="text-ink-soft hidden sm:inline">{user?.email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-5 py-8">{children}</main>
    </div>
  );
}
