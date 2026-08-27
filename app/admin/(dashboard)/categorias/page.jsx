import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import CategoryForm from "@/components/admin/CategoryForm";
import NewCategoryForm from "@/components/admin/NewCategoryForm";

export const dynamic = "force-dynamic";

export default async function CategoriasPage() {
  const supabase = await createClient();
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");

  return (
    <div>
      <Link href="/admin" className="text-sm font-semibold text-primary-dark hover:underline">
        ← Volver al panel
      </Link>

      <h1 className="font-display font-extrabold text-2xl mt-3 mb-1">Categorías</h1>
      <p className="text-sm text-ink-soft mb-6">
        La foto y la frase se muestran en las tarjetas de categoría del inicio. Aquí también
        puedes crear categorías nuevas.
      </p>

      {error && <p className="text-red-600 text-sm mb-4">Error cargando categorías: {error.message}</p>}

      <div className="space-y-4 max-w-2xl">
        {categories?.map((c) => (
          <CategoryForm key={c.slug} category={c} />
        ))}
      </div>

      <h2 className="font-display font-extrabold text-lg mt-10 mb-4">Nueva categoría</h2>
      <NewCategoryForm />
    </div>
  );
}
