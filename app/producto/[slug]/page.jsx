import { notFound } from "next/navigation";
import Carousel from "@/components/Carousel";
import AddToCartBox from "@/components/AddToCartBox";
import { getProductBySlug } from "@/lib/catalog";
import { formatCOP } from "@/lib/format";

export const revalidate = 0; // siempre trae lo último del panel de administrador

export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params.slug);
  return { title: product ? product.name : "Producto no encontrado" };
}

export default async function ProductoPage({ params }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <main className="max-w-5xl mx-auto px-5 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <Carousel images={product.images} alt={product.name} />

        <div>
          <p className="text-accent-dark font-bold text-xs tracking-[0.15em] uppercase">
            {product.category}
          </p>
          <h1 className="font-display font-extrabold text-3xl mt-2">{product.name}</h1>
          <p className="text-ink-soft text-sm mt-4 leading-relaxed">{product.description}</p>
          <p className="font-display font-extrabold text-2xl text-primary-dark mt-6">
            {formatCOP(product.price)}
          </p>

          <AddToCartBox product={product} />
        </div>
      </div>
    </main>
  );
}
