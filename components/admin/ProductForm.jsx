"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita tildes
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProductForm({ mode, product, categories }) {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState(product?.name || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [slugEdited, setSlugEdited] = useState(Boolean(product?.slug));
  const [categorySlug, setCategorySlug] = useState(product?.category_slug || categories[0]?.slug || "");
  const [price, setPrice] = useState(product?.price ?? "");
  const [badge, setBadge] = useState(product?.badge || "");
  const [shortDesc, setShortDesc] = useState(product?.short_desc || "");
  const [description, setDescription] = useState(product?.description || "");
  const [isActive, setIsActive] = useState(product?.is_active ?? true);
  const [isFeatured, setIsFeatured] = useState(product?.is_featured ?? false);
  const [images, setImages] = useState(product?.images || []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleNameChange(value) {
    setName(value);
    if (!slugEdited) setSlug(slugify(value));
  }

  async function handleImageUpload(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setError("");
    setUploading(true);

    try {
      const uploaded = [];
      for (const file of files) {
        const path = `${Date.now()}-${slugify(file.name)}`;
        const { error: uploadError } = await supabase.storage
          .from("productos")
          .upload(path, file, { cacheControl: "3600", upsert: false });
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("productos").getPublicUrl(path);
        uploaded.push(data.publicUrl);
      }
      setImages((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError("No se pudo subir la imagen: " + err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function removeImage(url) {
    setImages((prev) => prev.filter((img) => img !== url));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !slug.trim() || !categorySlug || price === "") {
      setError("Completa nombre, categoría y precio antes de guardar.");
      return;
    }
    if (images.length === 0) {
      setError("Agrega al menos una foto del producto.");
      return;
    }

    setSaving(true);
    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      category_slug: categorySlug,
      price: Number(price),
      badge: badge.trim() || null,
      short_desc: shortDesc.trim() || null,
      description: description.trim() || null,
      images,
      is_active: isActive,
      is_featured: isFeatured,
    };

    const { error: saveError } =
      mode === "create"
        ? await supabase.from("products").insert(payload)
        : await supabase.from("products").update(payload).eq("id", product.id);

    setSaving(false);
    if (saveError) {
      setError(
        saveError.message.includes("duplicate")
          ? "Ya existe un producto con ese slug. Cámbialo e intenta de nuevo."
          : "No se pudo guardar: " + saveError.message
      );
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-card p-6 space-y-5 max-w-2xl">
      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="name">
          Nombre del producto
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm"
          placeholder="Jabón Avena y Miel"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="slug">
          URL (slug)
        </label>
        <input
          id="slug"
          required
          value={slug}
          onChange={(e) => {
            setSlugEdited(true);
            setSlug(e.target.value);
          }}
          className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm font-mono"
        />
        <p className="text-xs text-ink-soft mt-1">Se genera solo a partir del nombre, pero puedes editarla.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="category">
            Categoría
          </label>
          <select
            id="category"
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
            className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm"
          >
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="price">
            Precio (COP)
          </label>
          <input
            id="price"
            type="number"
            min="0"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm"
            placeholder="14000"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="badge">
          Etiqueta (opcional)
        </label>
        <input
          id="badge"
          value={badge}
          onChange={(e) => setBadge(e.target.value)}
          className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm"
          placeholder="Nuevo, Oferta..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="shortDesc">
          Descripción corta
        </label>
        <input
          id="shortDesc"
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
          className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm"
          placeholder="Se muestra en la tarjeta del catálogo"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="description">
          Descripción completa
        </label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Fotos</label>
        <div className="flex flex-wrap gap-3 mb-3">
          {images.map((url) => (
            <div key={url} className="relative w-20 h-20 rounded-lg overflow-hidden border border-black/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/60 text-white text-xs flex items-center justify-center"
                aria-label="Quitar foto"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <label className="inline-block text-sm font-semibold text-primary-dark border border-primary/30 rounded-lg px-4 py-2 cursor-pointer hover:bg-surface">
          {uploading ? "Subiendo..." : "+ Subir fotos"}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      <label className="flex items-center gap-2 text-sm font-semibold">
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
        Visible en la tienda
      </label>

      <label className="flex items-center gap-2 text-sm font-semibold">
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
        />
        Mostrar en "Destacados" del inicio
      </label>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving || uploading}
          className="btn-glossy bg-gradient-to-b from-primary-light via-primary to-primary-dark text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-glossy disabled:opacity-50"
        >
          {saving ? "Guardando..." : mode === "create" ? "Crear producto" : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}
