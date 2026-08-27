"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero({ settings }) {
  const {
    hero_eyebrow: eyebrow,
    hero_title: title,
    hero_subtitle: subtitle,
    hero_cta_label: ctaLabel,
    hero_image: legacyImage,
    hero_images: heroImages,
  } = settings;

  // Compatibilidad: si no se han subido varias fotos (hero_images), pero sí
  // existe la foto única de la versión anterior (hero_image), se usa esa.
  const images = heroImages?.length > 0 ? heroImages : legacyImage ? [legacyImage] : [];

  const [index, setIndex] = useState(0);

  // Auto-avance del carrusel cada 5 segundos. Se pausa solo si hay una foto o ninguna.
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  function goTo(i) {
    setIndex(((i % images.length) + images.length) % images.length);
  }

  return (
    <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden">
      {images.map((src, i) => (
        <div
          key={src + i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === index ? 1 : 0 }}
          aria-hidden={i !== index}
        >
          <Image src={src} alt="" fill priority={i === 0} className="object-cover" />
        </div>
      ))}
      {images.length > 0 && (
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/50 to-primary-dark/30" />
      )}

      <div className="relative max-w-6xl mx-auto px-5 py-24 md:py-32 text-center md:text-left">
        <p className="text-color3 font-bold text-xs tracking-[0.2em] uppercase mb-3">{eyebrow}</p>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl leading-tight max-w-2xl">
          {title}
        </h1>
        <p className="mt-4 text-white/85 text-base max-w-md mx-auto md:mx-0">{subtitle}</p>
        <Link
          href="/catalogo"
          className="btn-glossy inline-block mt-8 bg-gradient-to-b from-color4 to-rose text-white font-bold px-7 py-3.5 rounded-lg shadow-glossy"
        >
          {ctaLabel}
        </Link>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={() => goTo(index - 1)}
            aria-label="Foto anterior"
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur items-center justify-center text-white text-xl transition"
          >
            ‹
          </button>
          <button
            onClick={() => goTo(index + 1)}
            aria-label="Foto siguiente"
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur items-center justify-center text-white text-xl transition"
          >
            ›
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir a la foto ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-color3" : "w-2 bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
