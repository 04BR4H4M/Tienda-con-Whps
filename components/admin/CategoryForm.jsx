"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function CategoryForm({ category }) {
  const router = useRouter();
  const supabase = createClient();

  const [label, setLabel] = useState(category.label);
  const [tagline, setTagline] = useState(category.tagline || "");
  const [image, setImage] = useState(category.image || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);

    try {
      const path = `categoria-${category.slug}-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]+/g, "-")}`;
      const { error: uploadError } = await supabase.storage
        .from("productos")
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("productos").getPublicUrl(path);
      setImage(data.publicUrl);
    } catch (err) {
      setError("No se pudo subir la imagen: " + err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleSave() {
    setError("");
    setSaved(false);
    setSaving(true);

    const { error: saveError } = await supabase
      .from("categories")
      .update({ label: label.trim(), tagline: tagline.trim() || null, image: image || null })
      .eq("slug", category.slug);

    setSaving(false);
    if (saveError) {
      setError("No se pudo guardar: " + saveError.message);
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <div className="bg-white rounded-xl shadow-card p-5 flex gap-4">
      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-surface shrink-0">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[11px] text-ink-soft text-center px-1">
            Sin foto
          </div>
        )}
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex gap-2">
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="flex-1 border border-black/10 rounded-lg px-3 py-1.5 text-sm font-semibold"
          />
          <span className="text-xs text-ink-soft self-center font-mono">/{category.slug}</span>
        </div>
        <input
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="Frase corta (opcional)"
          className="w-full border border-black/10 rounded-lg px-3 py-1.5 text-sm"
        />
        <div className="flex items-center gap-3 pt-1">
          <label className="text-xs font-semibold text-primary-dark border border-primary/30 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-surface">
            {uploading ? "Subiendo..." : "Cambiar foto"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
          <button
            onClick={handleSave}
            disabled={saving || uploading}
            className="text-xs font-bold text-white bg-gradient-to-b from-primary-light to-primary-dark rounded-lg px-3 py-1.5 disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
          {saved && !error && <span className="text-xs text-primary-dark font-semibold">Guardado ✓</span>}
          {error && <span className="text-xs text-red-600">{error}</span>}
        </div>
      </div>
    </div>
  );
}
