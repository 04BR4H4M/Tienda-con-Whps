"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";

export default function Hero({ settings }) {
  const { hero_eyebrow: eyebrow, hero_title: title, hero_subtitle: subtitle, hero_cta_label: ctaLabel, hero_image: legacyImage, hero_images: heroImages } = settings;
  const images = heroImages?.length > 0 ? heroImages : legacyImage ? [legacyImage] : [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const isDefaultTitle = !title || title === "Jabones y velas que transforman tu espacio";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-7 pt-4 md:pt-6">
      <div className="relative overflow-hidden rounded-[28px] bg-[#FFF7F3] min-h-[430px] md:min-h-[470px] flex items-center">
        <div className="absolute -left-16 -bottom-24 w-72 h-72 rounded-full bg-[#FDE2E4]/60 blur-2xl" />
        <div className="absolute right-[34%] top-5 w-28 h-28 rounded-full bg-white/80 blur-xl" />

        <div className="relative z-10 w-full md:w-[48%] px-7 py-12 md:px-12 lg:px-14 md:py-16">
          <p className="text-primary font-bold text-[10px] tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
            {eyebrow || "Hecho a mano en Bogotá"} <span>♡</span>
          </p>
          <h1 className="font-display font-extrabold text-[40px] sm:text-5xl lg:text-[52px] leading-[1.04] tracking-[-0.035em] max-w-xl">
            {isDefaultTitle ? (
              <>Jabones, velas y <span className="text-primary">maquillaje</span> que transforman tu espacio</>
            ) : title}
          </h1>
          <p className="mt-5 text-[14px] sm:text-[15px] leading-7 text-ink-soft max-w-md">
            {subtitle || "Ingredientes naturales, aromas exclusivos y un pedido tan simple como escribirnos por WhatsApp."}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/catalogo" className="btn-glossy inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3.5 rounded-xl shadow-glossy text-sm">
              {ctaLabel || "Ver catálogo"} <Icon name="arrow" size={16} />
            </Link>
            <Link href="/catalogo" className="inline-flex items-center justify-center border border-black/10 bg-white/80 px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-white transition">
              Conócenos
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-ink-soft">
            <span className="inline-flex items-center gap-2"><Icon name="leaf" size={15} className="text-[#5D8A77]" /> Ingredientes naturales</span>
            <span className="inline-flex items-center gap-2"><Icon name="heart" size={15} className="text-primary" /> Hecho con amor</span>
            <span className="inline-flex items-center gap-2"><Icon name="truck" size={15} className="text-[#6479B8]" /> Envíos a todo el país</span>
          </div>
        </div>

        <div className="absolute inset-y-4 right-4 md:right-5 w-full md:w-[56%] pointer-events-none">
          <div className="absolute inset-0 rounded-[24px] bg-white" />
          {images.length > 0 ? images.map((src, i) => (
            <div key={src + i} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === index ? 1 : 0 }} aria-hidden={i !== index}>
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/35 to-transparent z-[1]" />
              <Image src={src} alt="Productos de belleza y bienestar" fill priority={i === 0} sizes="(max-width: 768px) 100vw, 60vw" className="object-contain object-right p-3 md:p-5 lg:p-8" />
            </div>
          )) : (
            <div className="absolute inset-0 flex items-center justify-center text-ink-soft/40">Productos de la tienda</div>
          )}
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {images.map((_, i) => <button key={i} onClick={() => setIndex(i)} aria-label={`Ir a la foto ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-primary" : "w-1.5 bg-black/15"}`} />)}
          </div>
        )}
      </div>
    </section>
  );
}
