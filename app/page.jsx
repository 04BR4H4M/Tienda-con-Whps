import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { getFeaturedProducts, categories } from "@/data/products";
import Link from "next/link";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <main>
      <Hero />

      <section className="max-w-6xl mx-auto px-5 py-14">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-display font-extrabold text-2xl">Categorías</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/catalogo?categoria=${c.slug}`}
              className="bg-surface hover:bg-primary hover:text-white transition rounded-xl p-6 text-center font-bold"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 py-6 pb-16">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-display font-extrabold text-2xl">Destacados</h2>
            <div className="flex-1 h-[3px] bg-accent rounded" />
          </div>
          <ProductGrid products={featured} />
        </section>
      )}
    </main>
  );
}
