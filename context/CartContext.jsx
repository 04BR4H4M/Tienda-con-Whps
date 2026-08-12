"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "tienda-whatsapp:cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState({}); // { [productId]: qty }
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Cargar el carrito guardado en el navegador del cliente
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch (e) {
      // localStorage no disponible: seguimos con carrito vacío
    }
    setHydrated(true);
  }, []);

  // Guardar cada vez que cambia
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function addItem(productId, qty = 1) {
    setItems((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + qty }));
    setIsOpen(true);
  }

  function changeQty(productId, delta) {
    setItems((prev) => {
      const next = { ...prev, [productId]: (prev[productId] || 0) + delta };
      if (next[productId] <= 0) delete next[productId];
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
