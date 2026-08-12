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
      <h1 className="font-display font-extrabold text-2xl mb-6">Nuevo producto</h1>
      <ProductForm mode="create" categories={categories || []} />
    </div>
  );
}
