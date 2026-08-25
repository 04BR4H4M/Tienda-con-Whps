import { getSiteSettings } from "@/lib/settings";
import SettingsForm from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function ConfiguracionPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="font-display italic font-medium text-2xl mb-1 text-forest-dark">
        Configuración del sitio
      </h1>
      <p className="text-sm text-ink-soft mb-6">
        Cambia el nombre de la tienda y los textos de la portada. Se actualizan al instante.
      </p>
      <SettingsForm settings={settings} />
    </div>
  );
}
