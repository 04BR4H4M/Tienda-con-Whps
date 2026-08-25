import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { getSiteSettings } from "@/lib/site-settings";
import { getCategories } from "@/lib/catalog";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return {
    title: `${settings.site_name} — Jabones y velas hechos a mano`,
    description: settings.tagline,
  };
}

export default async function RootLayout({ children }) {
  const [settings, categories] = await Promise.all([getSiteSettings(), getCategories()]);

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
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
