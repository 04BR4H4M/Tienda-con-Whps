import { formatCOP } from "./format";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573001112233";

/**
 * Construye el link de WhatsApp con el pedido ya redactado.
 * items: [{ product, qty }]
 *
 * NOTA (fase futura de pagos en línea):
 * Si más adelante se agrega pasarela de pago, este es el único punto
 * que cambia: en vez de armar un mensaje de WhatsApp, se generaría una
 * sesión de pago (ej. Wompi/PSE) y solo se usaría WhatsApp para el
 * mensaje de confirmación. El resto del carrito no necesita tocarse.
 */
export function buildWhatsAppOrderUrl(items) {
  const lines = items.map(
    ({ product, qty }) => `• ${qty}x ${product.name} — ${formatCOP(product.price * qty)}`
  );
  const total = items.reduce((sum, { product, qty }) => sum + product.price * qty, 0);

  const message = [
    "¡Hola! Quiero hacer este pedido:",
    "",
    ...lines,
    "",
    `Total: ${formatCOP(total)}`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
