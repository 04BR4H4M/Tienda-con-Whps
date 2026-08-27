"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatCOP } from "@/lib/format";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import Icon from "@/components/Icon";

export default function CartDrawer() {
  const { items, changeQty, clearCart, isOpen, close } = useCart();
  const lineItems = Object.values(items);
  const total = lineItems.reduce((sum, l) => sum + l.product.price * l.qty, 0);

  function sendOrder() {
    if (lineItems.length === 0) return;
    window.open(buildWhatsAppOrderUrl(lineItems), "_blank");
    clearCart();
  }

  return <>
    <div className={`fixed inset-0 bg-ink/25 backdrop-blur-[2px] z-40 transition-opacity ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={close} />
    <aside className={`fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex items-center justify-between px-6 py-5 border-b border-black/[0.05]">
        <div><h2 className="font-display font-extrabold text-xl">Tu carrito</h2><p className="text-xs text-ink-soft mt-1">{lineItems.length} {lineItems.length === 1 ? "producto" : "productos"}</p></div>
        <div className="flex items-center gap-3"><button onClick={clearCart} disabled={!lineItems.length} className="text-[11px] font-semibold text-ink-soft hover:text-primary disabled:opacity-0 transition">Vaciar</button><button onClick={close} className="w-9 h-9 rounded-full hover:bg-surface flex items-center justify-center text-ink-soft" aria-label="Cerrar carrito"><Icon name="close" size={19} /></button></div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5">
        {lineItems.length === 0 ? <div className="text-center mt-16 text-ink-soft"><span className="w-14 h-14 mx-auto rounded-full bg-color2 text-primary flex items-center justify-center"><Icon name="bag" size={23} /></span><p className="font-semibold text-sm text-ink mt-4">Tu carrito está vacío</p><p className="text-xs mt-1">Agrega productos del catálogo.</p></div> : (
          <ul className="divide-y divide-black/[0.06]">
            {lineItems.map(({ product, qty }) => <li key={product.id} className="py-5 flex gap-4">
              <div className="relative w-20 h-20 rounded-xl bg-[#FAF9F7] overflow-hidden shrink-0"><Image src={product.images[0]} alt={product.name} fill sizes="80px" className="object-contain p-2" /></div>
              <div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><div><p className="text-sm font-semibold truncate">{product.name}</p><p className="text-[11px] text-ink-soft mt-1">{formatCOP(product.price)}</p></div><button onClick={() => changeQty(product.id, -qty)} aria-label={`Eliminar ${product.name}`} className="text-ink-soft hover:text-red-500"><Icon name="trash" size={16} /></button></div>
                <div className="flex items-center justify-between mt-3"><div className="flex items-center border border-black/[0.08] rounded-lg overflow-hidden"><button onClick={() => changeQty(product.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-surface"><Icon name="minus" size={13} /></button><span className="w-8 text-center text-xs font-semibold">{qty}</span><button onClick={() => changeQty(product.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-surface"><Icon name="plus" size={13} /></button></div><span className="font-bold text-sm">{formatCOP(product.price * qty)}</span></div>
              </div>
            </li>)}
          </ul>
        )}
      </div>

      <div className="p-6 border-t border-black/[0.05] bg-white">
        <div className="rounded-2xl bg-[#FAF9F7] border border-black/[0.04] p-4 mb-4"><div className="flex justify-between text-xs"><span>Subtotal</span><span>{formatCOP(total)}</span></div><div className="flex justify-between text-xs mt-2"><span>Envío</span><span>Por confirmar</span></div><div className="border-t border-black/[0.06] mt-3 pt-3 flex justify-between items-center"><strong className="text-sm">Total</strong><strong className="font-display text-xl text-primary-dark">{formatCOP(total)}</strong></div></div>
        <button onClick={sendOrder} disabled={!lineItems.length} className="btn-glossy w-full py-3.5 rounded-xl font-bold text-white bg-primary shadow-glossy disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2"><Icon name="bag" size={17} /> Finalizar compra</button>
        <button onClick={sendOrder} disabled={!lineItems.length} className="mt-2 w-full py-3 rounded-xl border border-primary/30 text-ink font-semibold text-sm flex items-center justify-center gap-2 hover:bg-color2 transition disabled:opacity-40"><Icon name="whatsapp" size={17} className="text-[#3A9B78]" /> Pedir por WhatsApp</button>
        <p className="text-[10px] text-ink-soft text-center mt-3 flex items-center justify-center gap-1"><Icon name="shield" size={13} /> Tus datos están protegidos</p>
      </div>
    </aside>
  </>;
}
