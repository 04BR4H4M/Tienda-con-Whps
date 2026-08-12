# Tallo & Cera — Tienda vía WhatsApp

Proyecto en **Next.js 14 + Tailwind CSS**. Esta es la **Fase 1: parte del cliente**
(catálogo, filtros, ficha de producto con carrusel, bolsa/carrito, envío del pedido
por WhatsApp). Los productos hoy están en `data/products.js` como placeholders —
en la Fase 2 ese archivo se reemplaza por una consulta a Supabase para que el
administrador los edite desde un panel.

## Estructura

```
app/
  layout.jsx              # Layout raíz: fuentes, header, footer, carrito
  page.jsx                # Home (hero + categorías + destacados)
  catalogo/page.jsx        # Catálogo con filtro por categoría (?categoria=velas)
  producto/[slug]/page.jsx # Ficha de producto con carrusel

components/                # Header, Footer, Hero, ProductCard, ProductGrid,
                            # CategoryFilters, Carousel, CartDrawer, AddToCartBox

context/CartContext.jsx    # Estado global del carrito (persistido en localStorage)
data/products.js           # Catálogo de ejemplo — próximamente vendrá de Supabase
lib/format.js              # Formato de moneda (COP)
lib/whatsapp.js            # Arma el link wa.me con el pedido
```

## 1. Instalación local (en VS Code)

Requisitos: tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).

```bash
# 1. Entra a la carpeta del proyecto
cd tienda-whatsapp

# 2. Instala las dependencias
npm install

# 3. Copia el archivo de variables de entorno
cp .env.example .env.local
# Abre .env.local y pon tu número real de WhatsApp

# 4. Corre el proyecto en desarrollo
npm run dev
```

Abre `http://localhost:3000` — verás la tienda funcionando con recarga en vivo:
cualquier cambio que guardes se refleja al instante en el navegador.

## 2. Qué puedes editar tú mismo

- **Número de WhatsApp**: en `.env.local`, variable `NEXT_PUBLIC_WHATSAPP_NUMBER`
  (formato internacional, sin `+`).
- **Productos**: en `data/products.js`, el arreglo `products`. Cada producto
  tiene `name`, `category`, `price`, `shortDesc`, `description` e `images`
  (arreglo de fotos para el carrusel).
- **Colores de marca**: en `tailwind.config.js`, dentro de `theme.extend.colors`
  (`primary`, `accent`, etc.) — cambiar esos valores actualiza toda la paleta
  del sitio de una sola vez.

## 3. Desplegarlo gratis en Vercel

1. Crea un repositorio en [GitHub](https://github.com) y sube esta carpeta
   (puedes arrastrar los archivos desde la web de GitHub, sin usar comandos).
2. Crea una cuenta en [vercel.com](https://vercel.com) (con GitHub es más rápido).
3. **Add New → Project** → selecciona tu repositorio → Vercel detecta que es
   Next.js automáticamente.
4. Antes de darle **Deploy**, abre la sección **Environment Variables** y agrega:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` → tu número real.
5. Clic en **Deploy**. En un par de minutos tendrás un link público tipo
   `https://tienda-whatsapp.vercel.app`, con HTTPS automático.

Dominio propio: cómpralo en Namecheap o GoDaddy (~US$10-12/año) y agrégalo en
`Settings → Domains` dentro de tu proyecto en Vercel.

## 4. Siguiente fase: panel de administrador

Cuando quieras que el administrador suba productos, precios y fotos sin tocar
código, el paso es conectar **Supabase** (base de datos + almacenamiento de
imágenes + login) y reemplazar `data/products.js` por una consulta real. La
estructura de componentes ya está lista para ese cambio — solo se toca la
fuente de datos, no el catálogo ni el carrito.
