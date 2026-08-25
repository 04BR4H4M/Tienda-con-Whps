export default function Footer({ settings }) {
  return (
    <footer className="mt-20 bg-ink text-white/80">
      <div className="max-w-6xl mx-auto px-5 py-12 grid gap-8 md:grid-cols-3 text-sm">
        <div>
          <div className="font-display font-extrabold text-lg text-white mb-2">
            {settings.site_name}
          </div>
          <p>{settings.tagline}</p>
        </div>
        <div>
          <div className="font-semibold text-white mb-2">Ayuda</div>
          <ul className="space-y-1">
            <li>Envíos</li>
            <li>Cambios y devoluciones</li>
            <li>Preguntas frecuentes</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white mb-2">Contacto</div>
          <ul className="space-y-1">
            <li>{settings.contact_email}</li>
            <li>WhatsApp: {settings.whatsapp_footer}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {settings.site_name} — Todos los derechos reservados
      </div>
    </footer>
  );
}
