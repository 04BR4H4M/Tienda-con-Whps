"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Icon from "@/components/Icon";

export default function Header({ siteName, categories = [] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { items, open } = useCart();
  const count = Object.values(items).reduce((s, i) => s + i.qty, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-5 lg:px-7 h-[74px] flex items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3 shrink-0">
            <img  src="/logo.png"alt="DILU STORE" className="w-12 h-12 object-contain" />
          <span>
            <span className="block font-display font-extrabold text-[17px] tracking-tight leading-none">{siteName}</span>
            <span className="hidden sm:block text-[10px] text-ink-soft mt-1">Belleza · Bienestar · Hogar</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-[13px] font-semibold text-ink-soft">
          <Link href="/catalogo" className="hover:text-ink transition">Catálogo</Link>
          {categories.slice(0, 4).map((c) => (
            <Link key={c.slug} href={`/catalogo?categoria=${c.slug}`} className="hover:text-ink transition">
              {c.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button onClick={open} aria-label="Abrir carrito" className="relative w-10 h-10 rounded-full bg-color2 text-primary-dark flex items-center justify-center hover:bg-[#f9d4dc] transition">
            <Icon name="bag" size={19} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center border-2 border-white">
                {count}
              </span>
            )}
          </button>
          <button className="lg:hidden w-10 h-10 flex items-center justify-center text-ink-soft" onClick={() => setMenuOpen((v) => !v)} aria-label="Abrir menú">
            <Icon name={menuOpen ? "close" : "menu"} size={21} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden border-t border-black/[0.04] px-5 py-4 bg-white flex flex-col gap-3 text-sm font-semibold">
          <Link href="/catalogo" onClick={() => setMenuOpen(false)}>Catálogo</Link>
          {categories.map((c) => (
            <Link key={c.slug} href={`/catalogo?categoria=${c.slug}`} onClick={() => setMenuOpen(false)}>{c.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
