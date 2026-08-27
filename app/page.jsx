import Hero from "@/components/Hero";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import { getFeaturedProducts, getCategories } from "@/lib/catalog";
import { getSiteSettings } from "@/lib/site-settings";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 0; // siempre trae lo último del panel de administrador

export default async function HomePage() {
  const [featured, categories, settings] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
    getSiteSettings(),
  ]);

  return (
    <main>
      <Hero settings={settings} />

      {categories.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 py-14">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-display font-extrabold text-2xl">Categorías</h2>
            <div className="flex-1 h-[3px] bg-color3 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/catalogo?categoria=${c.slug}`}
                className="group relative aspect-[4/5] rounded-xl overflow-hidden"
              >
                <Image
                  src={c.image}
                  alt={c.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display font-extrabold text-xl text-white">{c.label}</h3>
                  {c.tagline && <p className="text-white/80 text-xs mt-1">{c.tagline}</p>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 py-6 pb-16">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-display font-extrabold text-2xl">Destacados</h2>
            <div className="flex-1 h-[3px] bg-color3 rounded" />
          </div>
          <FeaturedCarousel products={featured} />
        </section>
      )}
    </main>
  );
}
