"use client";

import Image from "next/image";
import Link from "next/link";
import { formatCOP } from "@/lib/format";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="group bg-white border border-black/5 rounded-xl overflow-hidden hover:shadow-card hover:-translate-y-1 transition">
      <Link href={`/producto/${product.slug}`} className="block">
        <div className="relative aspect-square bg-surface">
          {product.badge && (
            <span className="absolute top-2 left-2 z-10 bg-accent text-ink text-[11px] font-bold px-2 py-1 rounded">
              {product.badge}
            </span>
          )}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/producto/${product.slug}`}>
          <h3 className="font-semibold text-sm leading-snug">{product.name}</h3>
        </Link>
        <p className="text-xs text-ink-soft mt-1 line-clamp-2">{product.shortDesc}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-extrabold text-primary-dark">{formatCOP(product.price)}</span>
          <button
            onClick={() => addItem(product.id)}
            className="btn-glossy text-xs font-bold px-3 py-2 rounded-lg text-white bg-gradient-to-b from-primary-light via-primary to-primary-dark shadow-glossy"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
