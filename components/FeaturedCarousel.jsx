"use client";

import { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";

export default function FeaturedCarousel({ products }) {
  const trackRef = useRef(null);
  const timerRef = useRef(null);

  function scrollByOneCard(direction = 1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-card]");
    const step = card ? card.offsetWidth + 16 /* gap-4 */ : track.clientWidth * 0.8;

    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    if (direction > 0 && atEnd) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      track.scrollBy({ left: step * direction, behavior: "smooth" });
    }
  }

  // Auto-avance cada 4 segundos, en pausa mientras el mouse está encima.
  useEffect(() => {
    if (products.length <= 1) return;
    function start() {
      timerRef.current = setInterval(() => scrollByOneCard(1), 4000);
    }
    function stop() {
      clearInterval(timerRef.current);
    }
    start();
    const track = trackRef.current;
    track?.addEventListener("mouseenter", stop);
    track?.addEventListener("mouseleave", start);
    return () => {
      stop();
      track?.removeEventListener("mouseenter", stop);
      track?.removeEventListener("mouseleave", start);
    };
  }, [products.length]);

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <div
            key={p.id}
            data-card
            className="snap-start shrink-0 w-[72%] sm:w-[45%] md:w-[31%] lg:w-[23%]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {products.length > 1 && (
        <>
          <button
            onClick={() => scrollByOneCard(-1)}
            aria-label="Producto anterior"
            className="hidden md:flex absolute -left-4 top-[38%] -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-card items-center justify-center text-lg text-primary-dark hover:bg-surface"
          >
            ‹
          </button>
          <button
            onClick={() => scrollByOneCard(1)}
            aria-label="Siguiente producto"
            className="hidden md:flex absolute -right-4 top-[38%] -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-card items-center justify-center text-lg text-primary-dark hover:bg-surface"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
