/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Fotos de producto subidas desde el panel, guardadas en Supabase Storage.
      { protocol: "https", hostname: "*.supabase.co" },
      // Se puede quitar una vez que ya no queden productos de ejemplo con
      // imágenes de placeholder.
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
};

export default nextConfig;
