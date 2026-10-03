"use client";

import Image from "next/image";
import { useState } from "react";

export default function Carousel({ images, alt }) {
  const [slide, setSlide] = useState(0);
  const [zooming, setZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const move = (dir) => setSlide((s) => (s + dir + images.length) % images.length);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }

  return (
    <div className="relative aspect-square rounded-xl overflow-hidden bg-surface">
      <div
        className="flex h-full transition-transform duration-300"
        style={{ transform: `translateX(-${slide * 100}%)` }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="relative min-w-full h-full md:cursor-zoom-in"
            onMouseEnter={() => setZooming(true)}
            onMouseLeave={() => setZooming(false)}
            onMouseMove={handleMouseMove}
          >
            <Image src={src} alt={`${alt} — foto ${i + 1}`} fill className="object-cover" />
            {/* Lupa: solo en pantallas con mouse (md+); en móvil no hay "hover" */}
            {zooming && i === slide && (
              <div
                className="hidden md:block absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "220%",
                  backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={() => move(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"
            aria-label="Foto anterior"
          >
            ‹
          </button>
          <button
            onClick={() => move(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"
            aria-label="Foto siguiente"
          >
            ›
          </button>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${i === slide ? "bg-accent" : "bg-white/70"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
