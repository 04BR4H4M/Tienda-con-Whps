export default function Footer() {
  return (
    <footer className="mt-20 bg-ink text-white/80">
      <div className="max-w-6xl mx-auto px-5 py-12 grid gap-8 md:grid-cols-3 text-sm">
        <div>
          <div className="font-display font-extrabold text-lg text-white mb-2">Tallo &amp; Cera</div>
          <p>Jabones y velas hechos a mano en Bogotá.</p>
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
            <li>hola@talloycera.com</li>
            <li>WhatsApp: +57 300 111 2233</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Tallo &amp; Cera — Todos los derechos reservados
      </div>
    </footer>
  );
}
