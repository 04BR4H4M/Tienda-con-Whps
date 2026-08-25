/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Mientras conectamos Supabase Storage / Cloudinary, permitimos
    // imágenes de placeholder para maquetar el catálogo.
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
