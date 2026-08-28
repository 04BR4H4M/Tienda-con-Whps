"use client";

import Image from "next/image";
import Link from "next/link";
import { formatCOP } from "@/lib/format";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <article className="group bg-white border border-black/[0.06] rounded-2xl overflow-hidden hover:shadow-card hover:-translate-y-1 transition duration-300">
      <Link href={`/producto/${product.slug}`} className="block">
        <div className="relative aspect-[1/1.02] bg-white overflow-hidden">
          {product.badge && <span className="absolute top-3 left-3 z-10 bg-color2 text-primary-dark text-[10px] font-bold px-2.5 py-1 rounded-full">{product.badge}</span>}
          <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-contain p-5 group-hover:scale-[1.035] transition duration-500" />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/producto/${product.slug}`} className="block">
          <h3 className="font-semibold text-[13px] leading-snug truncate">{product.name}</h3>
          <p className="text-[11px] text-ink-soft mt-1 line-clamp-1">{product.shortDesc}</p>
        </Link>
        <div className="flex items-center justify-between gap-2 mt-4">
          <span className="font-display font-extrabold text-[14px] text-ink">{formatCOP(product.price)}</span>
          <button onClick={() => addItem(product)} className="btn-glossy bg-color2 text-primary-dark text-[11px] font-bold px-3.5 py-2 rounded-lg hover:bg-[#f9d4dc]">
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
