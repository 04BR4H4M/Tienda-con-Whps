# Tallo & Cera — Tienda vía WhatsApp

Proyecto en **Next.js 14 + Tailwind CSS + Supabase**. Catálogo, filtros, ficha
de producto con carrusel, bolsa/carrito, envío del pedido por WhatsApp — y un
**panel administrativo en `/admin`** desde donde se agregan, editan y eliminan
productos (nombre, foto, precio, categoría) sin tocar código.

## Estructura

```
app/
  layout.jsx                     # Layout raíz: fuentes, header, footer, carrito
  page.jsx                       # Home (hero + categorías + destacados)
  catalogo/page.jsx               # Catálogo con filtro por categoría (?categoria=velas)
  producto/[slug]/page.jsx        # Ficha de producto con carrusel
  api/catalog/route.js            # Endpoint público que alimenta el carrito/header
  admin/login/page.jsx            # Login del panel
  admin/(dashboard)/page.jsx      # Lista de productos, con editar/eliminar
  admin/(dashboard)/productos/... # Formularios de crear/editar producto

components/                # Header, Footer, Hero, ProductCard, ProductGrid,
                            # CategoryFilters, Carousel, CartDrawer, AddToCartBox
components/admin/          # ProductForm, DeleteProductButton, LogoutButton

context/CartContext.jsx    # Estado global del carrito (persistido en localStorage)
context/CatalogContext.jsx # Productos/categorías cargados desde /api/catalog
lib/products.js            # Lectura de productos/categorías desde Supabase
lib/supabase/               # Clientes de Supabase (navegador y servidor)
lib/format.js              # Formato de moneda (COP)
lib/whatsapp.js            # Arma el link wa.me con el pedido
middleware.js               # Protege /admin: sin sesión, redirige al login
supabase/schema.sql         # Tablas, seguridad (RLS) y bucket de imágenes
```

## 1. Crear el proyecto de Supabase (una sola vez)

1. Crea una cuenta gratis en [supabase.com](https://supabase.com) → **New project**.
2. Elige nombre, contraseña de base de datos (guárdala) y región (la más cercana,
   ej. `South America (São Paulo)`).
3. Cuando el proyecto termine de crearse, ve a **SQL Editor → New query**, pega
   **todo** el contenido de [`supabase/schema.sql`](./supabase/schema.sql) y dale
   **Run**. Esto crea las tablas `products` y `categories`, la seguridad (RLS) y
   el bucket de imágenes `productos`.
4. Ve a **Authentication → Users → Add user** y crea el usuario administrador
   (tu correo y una contraseña). Ese es el login del panel — no hay registro
   público, solo tú (o quien invites desde ahí) puede entrar a `/admin`.
5. Ve a **Project Settings → API** y copia:
   - **Project URL**
   - **anon public key**

## 2. Instalación local (en VS Code)

Requisitos: tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).

```bash
# 1. Entra a la carpeta del proyecto
cd tienda-whatsapp

# 2. Instala las dependencias
npm install

# 3. Copia el archivo de variables de entorno
cp .env.example .env.local
```

Abre `.env.local` y completa:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=tu número real, sin "+"
NEXT_PUBLIC_SUPABASE_URL=el Project URL que copiaste
NEXT_PUBLIC_SUPABASE_ANON_KEY=la anon public key que copiaste
```

```bash
# 4. Corre el proyecto en desarrollo
npm run dev
```

Abre `http://localhost:3000` para la tienda, y `http://localhost:3000/admin`
para el panel (te pedirá el correo/contraseña que creaste en el paso 1.4).

## 3. Qué se administra desde `/admin` (sin tocar código)

- **Agregar producto**: nombre, categoría, precio, etiqueta, descripciones y
  fotos (se suben directo a Supabase Storage arrastrando o seleccionando el
  archivo).
- **Editar producto**: mismos campos, incluye poder ocultarlo de la tienda
  sin borrarlo (casilla "Visible en la tienda").
- **Eliminar producto**: botón con confirmación.

Lo único que hoy todavía se edita por código:

- **Número de WhatsApp**: variable `NEXT_PUBLIC_WHATSAPP_NUMBER` (en `.env.local`
  o en Vercel).
- **Categorías** (`Jabones`, `Velas`, `Otros`): se crean por SQL en el paso 1.3.
  Agregar o renombrar categorías nuevas se hace directo en Supabase
  (**Table Editor → categories**) — si quieres que también se administren
  desde el panel visualmente, dímelo y lo agrego.
- **Colores de marca**: en `tailwind.config.js`, dentro de `theme.extend.colors`.

## 4. Desplegarlo gratis en Vercel

1. Crea un repositorio en [GitHub](https://github.com) y sube esta carpeta.
2. Crea una cuenta en [vercel.com](https://vercel.com) (con GitHub es más rápido).
3. **Add New → Project** → selecciona tu repositorio → Vercel detecta que es
   Next.js automáticamente.
4. Antes de darle **Deploy**, abre **Environment Variables** y agrega las
   mismas tres variables de `.env.local` (WhatsApp + las dos de Supabase).
5. Clic en **Deploy**. En un par de minutos tendrás un link público tipo
   `https://tienda-whatsapp.vercel.app`, con HTTPS automático.

Dominio propio: cómpralo en Namecheap o GoDaddy (~US$10-12/año) y agrégalo en
**Settings → Domains** dentro de tu proyecto en Vercel.
