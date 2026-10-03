const SITE_URL = "https://dilustore.com.co";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // El panel de administrador no debe aparecer en Google bajo
        // ninguna circunstancia — ni el login, ni nada debajo de /admin.
        disallow: "/admin",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
