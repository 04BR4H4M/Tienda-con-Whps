import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="max-w-6xl mx-auto px-5 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-accent font-bold text-xs tracking-[0.2em] uppercase mb-3">
            Hecho a mano · Bogotá
          </p>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl leading-tight">
            Jabones y velas que transforman tu espacio
          </h1>
          <p className="mt-4 text-white/85 text-base max-w-md">
            Ingredientes naturales, aromas exclusivos y un pedido tan simple
            como escribirnos por WhatsApp.
          </p>
          <Link
            href="/catalogo"
            className="btn-glossy inline-block mt-8 bg-gradient-to-b from-accent to-accent-dark text-ink font-bold px-7 py-3.5 rounded-lg shadow-glossy"
          >
            Ver catálogo
          </Link>
        </div>
        <div className="hidden md:flex justify-center text-[120px]">🕯️🧼</div>
      </div>
    </section>
  );
}
