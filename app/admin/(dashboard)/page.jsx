import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { formatCOP } from "@/lib/format";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-extrabold text-2xl">Productos</h1>
        <Link
          href="/admin/productos/nuevo"
          className="btn-glossy bg-gradient-to-b from-primary-light via-primary to-primary-dark text-white font-bold text-sm px-4 py-2.5 rounded-lg shadow-glossy"
        >
          + Agregar producto
        </Link>
      </div>

      {error && <p className="text-red-600 text-sm mb-4">Error cargando productos: {error.message}</p>}

      {products?.length === 0 && (
        <p className="text-ink-soft text-sm bg-white rounded-xl p-8 text-center">
          Todavía no hay productos. Crea el primero con el botón de arriba.
        </p>
      )}

      <div className="bg-white rounded-xl overflow-hidden shadow-card">
        {products?.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 px-5 py-4 border-b border-black/5 last:border-0"
          >
            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-surface shrink-0">
              {p.images?.[0] && (
                <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{p.name}</p>
              <p className="text-xs text-ink-soft">
                {p.category_slug} · {formatCOP(p.price)}
                {!p.is_active && <span className="ml-2 text-red-600 font-semibold">Oculto</span>}
              </p>
            </div>
            <Link
              href={`/admin/productos/${p.id}/editar`}
              className="text-sm font-semibold text-primary-dark hover:underline"
            >
              Editar
            </Link>
            <DeleteProductButton productId={p.id} productName={p.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
