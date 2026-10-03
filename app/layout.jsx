import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { getSiteSettings } from "@/lib/site-settings";
import { getCategories } from "@/lib/catalog";

const SITE_URL = "https://dilustore.com.co";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  const ogImage = settings.hero_images?.[0] || `${SITE_URL}/logo.png`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${settings.site_name} — ${settings.hero_title}`,
      // Las páginas internas (producto, catálogo) arman su propio título y
      // le agregan " — Nombre de la tienda" automáticamente gracias a %s.
      template: `%s — ${settings.site_name}`,
    },
    description: settings.tagline,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "es_CO",
      url: SITE_URL,
      siteName: settings.site_name,
      title: `${settings.site_name} — ${settings.hero_title}`,
      description: settings.tagline,
      images: [{ url: ogImage, width: 1200, height: 1200, alt: settings.site_name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${settings.site_name} — ${settings.hero_title}`,
      description: settings.tagline,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }) {
  const [settings, categories] = await Promise.all([getSiteSettings(), getCategories()]);

  // Datos estructurados (JSON-LD): le dicen a Google explícitamente qué es
  // este sitio (una tienda), su nombre y cómo contactarla. Esto es lo que
  // ayuda a que aparezcan mejor los resultados en la búsqueda, y es
  // requisito para que Google muestre tarjetas enriquecidas de producto.
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: settings.site_name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: settings.tagline,
    address: { "@type": "PostalAddress", addressCountry: "CO" },
  };

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <CartProvider>
          <Header siteName={settings.site_name} categories={categories} />
          {children}
          <Footer settings={settings} />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
