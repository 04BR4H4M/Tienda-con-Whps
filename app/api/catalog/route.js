import { NextResponse } from "next/server";
import { getProducts, getCategories } from "@/lib/products";
import { getSiteSettings } from "@/lib/settings";

// Endpoint público de solo lectura. Lo consumen los componentes de cliente
// (CartDrawer, Header, CategoryFilters) para resolver nombre/precio de los
// productos guardados en el carrito (localStorage solo guarda id + cantidad)
// y para mostrar el nombre del sitio configurado desde el panel.
export async function GET() {
  const [products, categories, settings] = await Promise.all([
    getProducts(),
    getCategories(),
    getSiteSettings(),
  ]);
  return NextResponse.json({ products, categories, settings });
}
