"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { items, open } = useCart();
  const count = Object.values(items).reduce((s, q) => s + q, 0);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-black/5">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="font-display font-extrabold text-xl tracking-tight text-primary-dark">
          Tallo &amp; Cera
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <Link href="/catalogo" className="hover:text-primary-dark transition">
            Catálogo
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/catalogo?categoria=${c.slug}`}
              className="hover:text-primary-dark transition"
            >
              {c.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={open}
            className="btn-glossy relative bg-gradient-to-b from-accent to-accent-dark text-ink shadow-glossy w-11 h-11 rounded-full flex items-center justify-center text-lg"
            aria-label="Abrir bolsa"
          >
            🛍️
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-dark text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {count}
              </span>
            )}
          </button>
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center text-xl"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-black/5 px-5 py-3 flex flex-col gap-3 text-sm font-semibold">
          <Link href="/catalogo" onClick={() => setMenuOpen(false)}>
            Catálogo
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/catalogo?categoria=${c.slug}`}
              onClick={() => setMenuOpen(false)}
            >
              {c.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
