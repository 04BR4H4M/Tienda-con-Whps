/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Fotos subidas desde el panel de administrador (productos, categorías, portada).
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
