"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function AddToCartBox({ productId }) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  return (
    <div className="mt-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="w-9 h-9 rounded-lg bg-surface font-bold"
        >
          −
        </button>
        <span className="w-6 text-center font-semibold">{qty}</span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="w-9 h-9 rounded-lg bg-surface font-bold"
        >
          +
        </button>
      </div>

      <button
        onClick={() => addItem(productId, qty)}
        className="btn-glossy w-full mt-4 py-3.5 rounded-lg font-bold text-white bg-gradient-to-b from-primary-light via-primary to-primary-dark shadow-glossy"
      >
        Agregar a la bolsa
      </button>
    </div>
  );
}
