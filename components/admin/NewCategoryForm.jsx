"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function NewCategoryForm() {
  const router = useRouter();
  const supabase = createClient();
  const [label, setLabel] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!label.trim()) return;
    setError("");
    setSaving(true);

    const { error: saveError } = await supabase
      .from("categories")
      .insert({ slug: slugify(label), label: label.trim() });

    setSaving(false);
    if (saveError) {
      setError(
        saveError.message.includes("duplicate")
          ? "Ya existe una categoría con ese nombre."
          : "No se pudo crear: " + saveError.message
      );
      return;
    }
    setLabel("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-card p-5 flex gap-3 max-w-md">
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Nombre de la categoría"
        className="flex-1 border border-black/10 rounded-lg px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={saving}
        className="text-sm font-bold text-white bg-gradient-to-b from-primary-light to-primary-dark rounded-lg px-4 py-2 disabled:opacity-50"
      >
        {saving ? "Creando..." : "Crear"}
      </button>
      {error && <p className="text-red-600 text-xs self-center">{error}</p>}
    </form>
  );
}
