import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function NuevoProductoPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("slug, label")
    .order("sort_order");

  return (
    <div>
      <Link href="/admin" className="text-sm font-semibold text-primary-dark hover:underline">
        ← Volver al panel
      </Link>
      <h1 className="font-display font-extrabold text-2xl mt-3 mb-6">Nuevo producto</h1>
      <ProductForm mode="create" categories={categories || []} />
    </div>
  );
}
