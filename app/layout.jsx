import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { CatalogProvider } from "@/context/CatalogContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export const metadata = {
  title: "Tallo & Cera — Jabones y velas hechos a mano",
  description: "Catálogo de jabones y velas naturales. Arma tu pedido y envíalo por WhatsApp.",
};

export default function RootLayout({ children }) {
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
        <CatalogProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
            <CartDrawer />
          </CartProvider>
        </CatalogProvider>
      </body>
    </html>
  );
}
