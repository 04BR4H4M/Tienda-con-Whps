"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DeleteProductButton({ productId, productName }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(`¿Eliminar "${productName}"? Esta acción no se puede deshacer.`);
    if (!confirmed) return;

    setLoading(true);
    const { error } = await supabase.from("products").delete().eq("id", productId);
    setLoading(false);

    if (error) {
      alert("No se pudo eliminar: " + error.message);
      return;
    }
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-sm font-semibold text-red-600 hover:underline disabled:opacity-50"
    >
      {loading ? "Eliminando..." : "Eliminar"}
    </button>
  );
}
