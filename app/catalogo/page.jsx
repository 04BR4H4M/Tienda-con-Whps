import CategoryFilters from "@/components/CategoryFilters";
import ProductGrid from "@/components/ProductGrid";
import { getProducts, getCategories } from "@/lib/catalog";
export const metadata = { title: "Catálogo" };
export const revalidate = 0;
export default async function CatalogoPage({ searchParams }) { const active=searchParams?.categoria||"todos"; const [items,categories]=await Promise.all([getProducts({category:active}),getCategories()]); const label=active==="todos"?"Todos los productos":categories.find(c=>c.slug===active)?.label; return <main className="max-w-7xl mx-auto px-5 lg:px-7 py-10 md:py-14"><div className="mb-9"><p className="text-primary font-bold text-[10px] tracking-[0.18em] uppercase">Descubre</p><h1 className="font-display font-extrabold text-3xl md:text-4xl mt-1">Catálogo</h1></div><div className="grid md:grid-cols-[190px_1fr] gap-8"><CategoryFilters active={active} categories={categories}/><div><div className="flex items-center justify-between mb-5"><h2 className="font-display font-bold text-xl">{label}</h2><span className="text-xs text-ink-soft">{items.length} productos</span></div><ProductGrid products={items}/></div></div></main>; }
