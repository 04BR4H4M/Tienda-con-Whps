import Hero from "@/components/Hero";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import { getFeaturedProducts, getCategories } from "@/lib/catalog";
import { getSiteSettings } from "@/lib/site-settings";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";

const categoryStyles = [
  { bg: "bg-[#F4F2FF]", icon: "makeup", iconBg: "bg-[#E9E5FF]", iconColor: "text-[#7265B7]" },
  { bg: "bg-[#F0F7F3]", icon: "soap", iconBg: "bg-[#E0EEE7]", iconColor: "text-[#4E8069]" },
  { bg: "bg-[#FFF5ED]", icon: "candle", iconBg: "bg-[#FBE6D7]", iconColor: "text-[#C4774C]" },
];

function getCategoryStyle(index, slug = "") {
  const normalized = slug.toLowerCase();
  if (normalized.includes("maqu") || normalized.includes("beaut")) return categoryStyles[0];
  if (normalized.includes("jab")) return categoryStyles[1];
  if (normalized.includes("vela")) return categoryStyles[2];
  return categoryStyles[index % categoryStyles.length];
}

export const revalidate = 0;

export default async function HomePage() {
  const [featured, categories, settings] = await Promise.all([getFeaturedProducts(), getCategories(), getSiteSettings()]);

  return (
    <main>
      <Hero settings={settings} />

      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 lg:px-7 pt-14 md:pt-16 pb-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-primary font-bold text-[10px] tracking-[0.18em] uppercase">Descubre</p>
              <h2 className="font-display font-extrabold text-2xl md:text-[26px] mt-1">Compra por categoría</h2>
            </div>
            <Link href="/catalogo" className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark transition">Ver todo <Icon name="arrow" size={14} /></Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.slice(0, 3).map((c, i) => {
              const style = getCategoryStyle(i, c.slug);
              return (
                <Link key={c.slug} href={`/catalogo?categoria=${c.slug}`} className={`group relative min-h-[220px] md:min-h-[250px] overflow-hidden rounded-[22px] ${style.bg} border border-black/[0.03] p-6 flex items-center`}>
                  <div className="relative z-10 max-w-[48%]">
                    <span className={`w-11 h-11 rounded-full ${style.iconBg} ${style.iconColor} flex items-center justify-center mb-5`}><Icon name={style.icon} size={21} /></span>
                    <h3 className="font-display font-extrabold text-xl text-ink">{c.label}</h3>
                    <p className="text-xs text-ink-soft leading-5 mt-2 line-clamp-2">{c.tagline || "Descubre nuestros productos seleccionados para ti."}</p>
                    <span className="inline-flex items-center gap-1 mt-4 text-[11px] font-bold text-ink-soft group-hover:text-ink transition">Ver productos <Icon name="arrow" size={13} /></span>
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-[62%] flex items-center justify-end overflow-hidden">
                    <div className="absolute inset-y-3 inset-x-2 md:inset-x-3 rounded-2xl bg-white" />
                    <Image src={c.image} alt={c.label} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain object-right p-4 md:p-6 group-hover:scale-[1.035] transition duration-500" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 lg:px-7 pt-7 pb-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-primary font-bold text-[10px] tracking-[0.18em] uppercase">Destacados</p>
              <h2 className="font-display font-extrabold text-2xl md:text-[26px] mt-1">Productos destacados</h2>
            </div>
            <Link href="/catalogo" className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark transition">Ver todos <Icon name="arrow" size={14} /></Link>
          </div>
          <FeaturedCarousel products={featured} />
        </section>
      )}

      <section className="max-w-7xl mx-auto px-5 lg:px-7 pb-14">
        <div className="rounded-2xl bg-[#FBFBFA] border border-black/[0.04] grid grid-cols-2 md:grid-cols-4 gap-4 px-5 py-5 md:px-8">
          <Benefit icon="truck" title="Envíos rápidos" text="A todo el país" />
          <Benefit icon="leaf" title="Ingredientes naturales" text="Productos seguros" />
          <Benefit icon="heart" title="Hechos a mano" text="Con amor y dedicación" />
          <Benefit icon="shield" title="Pago seguro" text="Protección garantizada" />
        </div>
      </section>
    </main>
  );
}

function Benefit({ icon, title, text }) {
  return <div className="flex items-center gap-3"><span className="w-10 h-10 shrink-0 rounded-full bg-white border border-black/[0.05] flex items-center justify-center text-primary"><Icon name={icon} size={18} /></span><div><p className="font-semibold text-xs">{title}</p><p className="text-[10px] text-ink-soft mt-0.5">{text}</p></div></div>;
}
