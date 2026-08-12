"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      setError("Correo o contraseña incorrectos.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-surface px-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-card p-8 w-full max-w-sm"
      >
        <h1 className="font-display font-extrabold text-2xl mb-1">Panel administrativo</h1>
        <p className="text-sm text-ink-soft mb-6">Tallo &amp; Cera</p>

        <label className="block text-sm font-semibold mb-1" htmlFor="email">
          Correo
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-black/10 rounded-lg px-3 py-2 mb-4 text-sm"
        />

        <label className="block text-sm font-semibold mb-1" htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-black/10 rounded-lg px-3 py-2 mb-4 text-sm"
        />

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn-glossy w-full py-3 rounded-lg font-bold text-white bg-gradient-to-b from-primary-light via-primary to-primary-dark shadow-glossy disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}
