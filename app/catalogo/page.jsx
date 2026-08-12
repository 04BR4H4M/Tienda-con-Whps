import CategoryFilters from "@/components/CategoryFilters";
import ProductGrid from "@/components/ProductGrid";
import { getProducts, getCategories } from "@/lib/products";

export const metadata = { title: "Catálogo — Tallo & Cera" };
export const dynamic = "force-dynamic"; // siempre trae los productos más recientes del panel

export default async function CatalogoPage({ searchParams }) {
  const params = await searchParams;
  const active = params?.categoria || "todos";

  const [items, categories] = await Promise.all([
    getProducts({ category: active }),
    getCategories(),
  ]);

  const label =
    active === "todos" ? "Todos los productos" : categories.find((c) => c.slug === active)?.label;

  return (
    <main className="max-w-6xl mx-auto px-5 py-10">
      <h1 className="font-display font-extrabold text-3xl mb-8">Catálogo</h1>
      <div className="grid md:grid-cols-[190px_1fr] gap-8">
        <CategoryFilters active={active} categories={categories} />
        <div>
          <h2 className="font-display font-bold text-xl mb-4">{label}</h2>
          <ProductGrid products={items} />
        </div>
      </div>
    </main>
  );
}
