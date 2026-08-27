import Link from "next/link";
import { getSiteSettings } from "@/lib/site-settings";
import SettingsForm from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function ConfiguracionPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <Link href="/admin" className="text-sm font-semibold text-primary-dark hover:underline">
        ← Volver al panel
      </Link>

      <h1 className="font-display font-extrabold text-2xl mt-3 mb-1 text-primary-dark">
        Configuración del sitio
      </h1>
      <p className="text-sm text-ink-soft mb-6">
        Cambia el nombre de la tienda y los textos de la portada. Se actualizan al instante.
      </p>
      <SettingsForm settings={settings} />
    </div>
  );
}
