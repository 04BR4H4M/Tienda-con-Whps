export default function Footer({ settings }) {
  return <footer className="mt-8 bg-[#F2F6F4] border-t border-black/[0.04]">
    <div className="max-w-7xl mx-auto px-5 lg:px-7 py-12 grid gap-8 md:grid-cols-3 text-sm">
      <div><div className="font-display font-extrabold text-lg text-ink mb-2">{settings.site_name}</div><p className="text-ink-soft max-w-xs">{settings.tagline}</p></div>
      <div><div className="font-semibold text-ink mb-3">Ayuda</div><ul className="space-y-2 text-ink-soft"><li>Envíos</li><li>Cambios y devoluciones</li><li>Preguntas frecuentes</li></ul></div>
      <div><div className="font-semibold text-ink mb-3">Contacto</div><ul className="space-y-2 text-ink-soft"><li>{settings.contact_email}</li><li>WhatsApp: {settings.whatsapp_footer}</li></ul></div>
    </div>
    <div className="border-t border-black/[0.05] py-4 text-center text-xs text-ink-soft">© {new Date().getFullYear()} {settings.site_name} — Todos los derechos reservados</div>
  </footer>;
}
