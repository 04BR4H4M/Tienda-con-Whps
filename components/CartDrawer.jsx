"use client";

import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { formatCOP } from "@/lib/format";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";

export default function CartDrawer() {
  const { items, changeQty, isOpen, close } = useCart();

  const lineItems = Object.entries(items)
    .map(([id, qty]) => ({ product: products.find((p) => p.id === Number(id)), qty }))
    .filter((l) => l.product);

  const total = lineItems.reduce((sum, l) => sum + l.product.price * l.qty, 0);

  function sendOrder() {
    if (lineItems.length === 0) return;
    window.open(buildWhatsAppOrderUrl(lineItems), "_blank");
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/45 z-40 transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
      />
      <aside
        className={`fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-black/5">
          <h2 className="font-display font-extrabold text-lg">Tu bolsa</h2>
          <button onClick={close} className="text-ink-soft text-lg">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {lineItems.length === 0 ? (
            <p className="text-center text-ink-soft text-sm mt-10">
              Tu bolsa está vacía.
              <br />
              Agrega productos del catálogo.
            </p>
          ) : (
            <ul className="space-y-4">
              {lineItems.map(({ product, qty }) => (
                <li key={product.id} className="flex items-center justify-between gap-3 border-b border-black/5 pb-4">
                  <div>
                    <p className="text-sm font-semibold">{product.name}</p>
                    <p className="text-xs text-ink-soft">{formatCOP(product.price)} c/u</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => changeQty(product.id, -1)}
                      className="w-6 h-6 rounded bg-surface font-bold text-sm"
                    >
                      −
                    </button>
                    <span className="text-sm">{qty}</span>
                    <button
                      onClick={() => changeQty(product.id, 1)}
                      className="w-6 h-6 rounded bg-surface font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-5 border-t border-black/5">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm">Total</span>
            <strong className="text-lg text-primary-dark font-display">{formatCOP(total)}</strong>
          </div>
          <button
            onClick={sendOrder}
            disabled={lineItems.length === 0}
            className="btn-glossy w-full py-3.5 rounded-lg font-bold text-white bg-gradient-to-b from-whatsapp to-whatsapp-dark shadow-glossy disabled:opacity-40 disabled:pointer-events-none"
          >
            Enviar pedido por WhatsApp
          </button>
          <p className="text-[11px] text-ink-soft text-center mt-2">
            Se abrirá WhatsApp con tu pedido ya redactado, listo para confirmar.
          </p>
        </div>
      </aside>
    </>
  );
}
