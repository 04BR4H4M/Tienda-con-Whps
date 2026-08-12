import { NextResponse } from "next/server";
import { getProducts, getCategories } from "@/lib/products";

// Endpoint público de solo lectura. Lo consumen los componentes de cliente
// (CartDrawer, Header, CategoryFilters) para resolver nombre/precio de los
// productos guardados en el carrito (localStorage solo guarda id + cantidad).
export async function GET() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  return NextResponse.json({ products, categories });
}
