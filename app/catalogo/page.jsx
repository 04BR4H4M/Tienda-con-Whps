import CategoryFilters from "@/components/CategoryFilters";
import ProductGrid from "@/components/ProductGrid";
import { getProducts, getCategories } from "@/lib/catalog";

export const metadata = { title: "Catálogo" };
export const revalidate = 0; // siempre trae lo último del panel de administrador

export default async function CatalogoPage({ searchParams }) {
  const active = searchParams?.categoria || "todos";
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
