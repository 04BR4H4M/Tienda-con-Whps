import Link from "next/link";
import { notFound } from "next/navigation";
import Carousel from "@/components/Carousel";
import AddToCartBox from "@/components/AddToCartBox";
import { getProductBySlug } from "@/lib/catalog";
import { formatCOP } from "@/lib/format";
import Icon from "@/components/Icon";

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params.slug);
  return { title: product ? product.name : "Producto no encontrado" };
}

export default async function ProductoPage({ params }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <main className="max-w-7xl mx-auto px-5 lg:px-7 py-10 md:py-14">
      <Link
        href="/catalogo"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-ink transition mb-6"
      >
        <Icon name="arrow" size={14} className="rotate-180" />
        Volver al catálogo
      </Link>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div className="rounded-[26px] bg-white border border-black/[0.04] p-4">
          <Carousel images={product.images} alt={product.name} />
        </div>

        <div className="pt-2">
          <p className="text-primary font-bold text-[10px] tracking-[0.18em] uppercase">
            {product.category}
          </p>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl mt-2">{product.name}</h1>
          <p className="font-display font-extrabold text-2xl text-primary-dark mt-5">
            {formatCOP(product.price)}
          </p>
          <p className="text-ink-soft text-sm mt-4 leading-7 max-w-lg whitespace-pre-line">
            {product.description}
          </p>

          <AddToCartBox product={product} />

          <div className="grid grid-cols-3 gap-2 mt-7">
            <SmallBenefit icon="truck" text="Envío rápido" />
            <SmallBenefit icon="shield" text="Compra segura" />
            <SmallBenefit icon="heart" text="Devoluciones fáciles" />
          </div>
        </div>
      </div>
    </main>
  );
}

function SmallBenefit({ icon, text }) {
  return (
    <div className="rounded-xl bg-white border border-black/[0.06] p-3 text-center text-[10px] text-ink-soft">
      <Icon name={icon} size={16} className="mx-auto mb-1 text-primary" />
      {text}
    </div>
  );
}
