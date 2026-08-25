"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "tienda-whatsapp:cart";

export function CartProvider({ children }) {
  // items: { [productId]: { product, qty } }
  // Se guarda el producto completo (no solo el id) para no depender
  // de un catálogo fijo en el código al momento de armar el pedido.
  const [items, setItems] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch (e) {
      // localStorage no disponible: seguimos con carrito vacío
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function addItem(product, qty = 1) {
    setItems((prev) => {
      const existingQty = prev[product.id]?.qty || 0;
      return { ...prev, [product.id]: { product, qty: existingQty + qty } };
    });
    setIsOpen(true);
  }

  function changeQty(productId, delta) {
    setItems((prev) => {
      const current = prev[productId];
      if (!current) return prev;
      const nextQty = current.qty + delta;
      const next = { ...prev };
      if (nextQty <= 0) {
        delete next[productId];
      } else {
        next[productId] = { ...current, qty: nextQty };
      }
      return next;
    });
  }

  function clearCart() {
    setItems({});
  }

  const value = {
    items,
    addItem,
    changeQty,
    clearCart,
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
