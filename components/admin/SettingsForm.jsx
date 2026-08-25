"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SettingsForm({ settings }) {
  const router = useRouter();
  const supabase = createClient();

  const [siteName, setSiteName] = useState(settings.site_name);
  const [tagline, setTagline] = useState(settings.tagline);
  const [heroEyebrow, setHeroEyebrow] = useState(settings.hero_eyebrow);
  const [heroTitle, setHeroTitle] = useState(settings.hero_title);
  const [heroSubtitle, setHeroSubtitle] = useState(settings.hero_subtitle);
  const [heroCtaLabel, setHeroCtaLabel] = useState(settings.hero_cta_label);
  const [heroImage, setHeroImage] = useState(settings.hero_image || "");
  const [whatsappFooter, setWhatsappFooter] = useState(settings.whatsapp_footer);
  const [contactEmail, setContactEmail] = useState(settings.contact_email);

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
      const path = `hero-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]+/g, "-")}`;
      const { error: uploadError } = await supabase.storage
        .from("productos")
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("productos").getPublicUrl(path);
      setHeroImage(data.publicUrl);
    } catch (err) {
      setError("No se pudo subir la imagen: " + err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaved(false);
    setSaving(true);

    const { error: saveError } = await supabase
      .from("site_settings")
      .update({
        site_name: siteName.trim(),
        tagline: tagline.trim(),
        hero_eyebrow: heroEyebrow.trim(),
        hero_title: heroTitle.trim(),
        hero_subtitle: heroSubtitle.trim(),
        hero_cta_label: heroCtaLabel.trim(),
        hero_image: heroImage || null,
        whatsapp_footer: whatsappFooter.trim(),
        contact_email: contactEmail.trim(),
      })
      .eq("id", 1);

    setSaving(false);
    if (saveError) {
      setError("No se pudo guardar: " + saveError.message);
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-card p-6 space-y-6 max-w-2xl">
      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="siteName">
          Nombre de la tienda
        </label>
        <input
          id="siteName"
          required
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          className="w-full border border-ink/10 rounded-lg px-3 py-2 text-sm"
        />
        <p className="text-xs text-ink-soft mt-1">
          Aparece en el logo, el pie de página y el título de la pestaña del navegador.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="tagline">
          Frase corta (pie de página)
        </label>
        <input
          id="tagline"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          className="w-full border border-ink/10 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="contactEmail">
            Correo de contacto
          </label>
          <input
            id="contactEmail"
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="w-full border border-ink/10 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="whatsappFooter">
            WhatsApp (texto visible)
          </label>
          <input
            id="whatsappFooter"
            value={whatsappFooter}
            onChange={(e) => setWhatsappFooter(e.target.value)}
            className="w-full border border-ink/10 rounded-lg px-3 py-2 text-sm"
            placeholder="+57 300 111 2233"
          />
        </div>
      </div>

      <hr className="border-ink/10" />

      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="heroEyebrow">
          Portada — texto pequeño de arriba
        </label>
        <input
          id="heroEyebrow"
          value={heroEyebrow}
          onChange={(e) => setHeroEyebrow(e.target.value)}
          className="w-full border border-ink/10 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="heroTitle">
          Portada — título grande
        </label>
        <input
          id="heroTitle"
          value={heroTitle}
          onChange={(e) => setHeroTitle(e.target.value)}
          className="w-full border border-ink/10 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="heroSubtitle">
          Portada — texto debajo del título
        </label>
        <textarea
          id="heroSubtitle"
          rows={2}
          value={heroSubtitle}
          onChange={(e) => setHeroSubtitle(e.target.value)}
          className="w-full border border-ink/10 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="heroCtaLabel">
          Portada — texto del botón
        </label>
        <input
          id="heroCtaLabel"
          value={heroCtaLabel}
          onChange={(e) => setHeroCtaLabel(e.target.value)}
          className="w-full border border-ink/10 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Foto de portada</label>
        {heroImage && (
          <div className="relative w-full max-w-xs aspect-video rounded-lg overflow-hidden border border-ink/10 mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImage} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => setHeroImage("")}
              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white text-xs flex items-center justify-center"
              aria-label="Quitar foto de portada"
            >
              ✕
            </button>
          </div>
        )}
        <label className="inline-block text-sm font-semibold text-forest-dark border border-forest/30 rounded-lg px-4 py-2 cursor-pointer hover:bg-surface">
          {uploading ? "Subiendo..." : heroImage ? "Cambiar foto" : "+ Subir foto de portada"}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
        <p className="text-xs text-ink-soft mt-1">
          Sin foto, la portada muestra un fondo verde con una textura decorativa.
        </p>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {saved && !error && <p className="text-forest-dark text-sm font-semibold">Guardado ✓</p>}

      <button
        type="submit"
        disabled={saving || uploading}
        className="btn-glossy bg-gradient-to-b from-forest-light to-forest-dark text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-glossy disabled:opacity-50"
      >
        {saving ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}
