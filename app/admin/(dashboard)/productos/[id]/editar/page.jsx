import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function EditarProductoPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).maybeSingle(),
    supabase.from("categories").select("slug, label").order("sort_order"),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="font-display font-extrabold text-2xl mb-6">Editar producto</h1>
      <ProductForm mode="edit" product={product} categories={categories || []} />
    </div>
  );
}
