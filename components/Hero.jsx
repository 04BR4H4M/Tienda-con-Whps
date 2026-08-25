import Image from "next/image";
import Link from "next/link";

export default function Hero({ settings }) {
  const {
    hero_eyebrow: eyebrow,
    hero_title: title,
    hero_subtitle: subtitle,
    hero_cta_label: ctaLabel,
    hero_image: image,
  } = settings;

  return (
    <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden">
      {image && (
        <>
          <Image src={image} alt="" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/50 to-primary-dark/30" />
        </>
      )}

      <div className="relative max-w-6xl mx-auto px-5 py-24 md:py-32 text-center md:text-left">
        <p className="text-accent font-bold text-xs tracking-[0.2em] uppercase mb-3">{eyebrow}</p>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl leading-tight max-w-2xl">
          {title}
        </h1>
        <p className="mt-4 text-white/85 text-base max-w-md mx-auto md:mx-0">{subtitle}</p>
        <Link
          href="/catalogo"
          className="btn-glossy inline-block mt-8 bg-gradient-to-b from-accent to-accent-dark text-ink font-bold px-7 py-3.5 rounded-lg shadow-glossy"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
