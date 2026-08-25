# Tienda vía WhatsApp

Proyecto en **Next.js 14 + Tailwind CSS + Supabase**. Catálogo, filtros, ficha
de producto con carrusel, bolsa/carrito, envío del pedido por WhatsApp — y un
**panel administrativo en `/admin`** desde donde se controla todo: nombre de
la tienda, textos e imagen de la portada, categorías (foto y frase) y
productos (nombre, foto, precio, destacados), sin tocar código.

## Estructura

```
app/
  layout.jsx                     # Layout raíz: fuentes, header, footer, carrito
  page.jsx                       # Home (hero + categorías + destacados)
  catalogo/page.jsx               # Catálogo con filtro por categoría (?categoria=velas)
  producto/[slug]/page.jsx        # Ficha de producto con carrusel
  admin/login/page.jsx            # Login del panel
  admin/(dashboard)/page.jsx      # Lista de productos, con editar/eliminar
  admin/(dashboard)/productos/... # Formularios de crear/editar producto
  admin/(dashboard)/categorias/   # Foto y frase de cada categoría
  admin/(dashboard)/configuracion/# Nombre de la tienda y textos de la portada

components/                # Header, Footer, Hero, ProductCard, ProductGrid,
                            # CategoryFilters, Carousel, CartDrawer, AddToCartBox
components/admin/          # ProductForm, CategoryForm, NewCategoryForm,
                            # SettingsForm, DeleteProductButton, LogoutButton

context/CartContext.jsx    # Estado global del carrito (persistido en localStorage)
lib/catalog.js             # Lectura de productos/categorías desde Supabase (público)
lib/site-settings.js       # Lectura de la configuración del sitio (público)
lib/supabase.js            # Cliente de Supabase para lecturas públicas (sin sesión)
lib/supabase/               # Clientes de Supabase para el panel (con sesión de admin)
lib/format.js              # Formato de moneda (COP)
lib/whatsapp.js            # Arma el link wa.me con el pedido
middleware.js               # Protege /admin: sin sesión, redirige al login
supabase/schema.sql         # Tablas, seguridad (RLS) y bucket de imágenes
```

> **Nota para quien siga editando este proyecto:** las páginas públicas
> (`app/page.jsx`, `app/catalogo/...`, `app/producto/...`) leen datos con
> `lib/catalog.js` y `lib/site-settings.js`, usando el cliente público de
> `lib/supabase.js` (sin sesión — la seguridad la da directamente Supabase
> con RLS). Las páginas de `/admin` usan en cambio `lib/supabase/client.js`
> y `lib/supabase/server.js`, que sí manejan la sesión del administrador
> (necesaria para poder editar). Son dos caminos distintos a propósito —
> evita crear un tercer archivo de datos "por si acaso"; si algo no
> aparece en el sitio, es casi seguro que el archivo que hay que tocar es
> uno de estos dos, no uno nuevo.

## 1. Crear el proyecto de Supabase (una sola vez)

1. Crea una cuenta gratis en [supabase.com](https://supabase.com) → **New project**.
2. Elige nombre, contraseña de base de datos (guárdala) y región (la más cercana,
   ej. `South America (São Paulo)`).
3. Cuando el proyecto termine de crearse, ve a **SQL Editor → New query**, pega
   **todo** el contenido de [`supabase/schema.sql`](./supabase/schema.sql) y dale
   **Run**. Esto crea las tablas, la seguridad (RLS) y el bucket de imágenes
   `productos`. Es seguro volver a correr este archivo más adelante si se
   actualiza (por ejemplo, si agregamos una columna nueva) — no borra datos.
4. Ve a **Authentication → Users → Add user** y crea el usuario administrador
   (tu correo y una contraseña). Ese es el login del panel — no hay registro
   público, solo tú (o quien invites desde ahí) puede entrar a `/admin`.
5. Ve a **Project Settings → API Keys** y copia:
   - **Project URL** (en la pestaña "Data API" de esa misma sección)
   - **Publishable key** (empieza con `sb_publishable_...`; es el reemplazo
     moderno de la antigua "anon key" — cumple la misma función y es segura
     para el navegador)

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
NEXT_PUBLIC_SUPABASE_ANON_KEY=la Publishable key que copiaste
```

```bash
# 4. Corre el proyecto en desarrollo
npm run dev
```

Abre `http://localhost:3000` para la tienda, y `http://localhost:3000/admin`
para el panel (te pedirá el correo/contraseña que creaste en el paso 1.4).

## 3. Qué se administra desde `/admin` (sin tocar código)

- **Configuración**: nombre de la tienda, frase corta, correo y WhatsApp de
  contacto, y todos los textos + la foto de la portada.
- **Categorías**: foto y frase de cada una (se muestran en las tarjetas del
  inicio), además de crear categorías nuevas.
- **Productos**: nombre, categoría, precio, etiqueta, descripciones, fotos
  (arrastrando o seleccionando el archivo), marcarlo como **Destacado**
  (aparece en la sección "Destacados" del inicio), ocultarlo sin borrarlo, o
  eliminarlo.

Mientras un producto o categoría no tenga foto propia, se muestra un
placeholder de color generado localmente (no depende de ningún servicio
externo, así que nunca da error de red).

Lo único que hoy todavía se edita por código:

- **Número de WhatsApp para recibir pedidos**: variable
  `NEXT_PUBLIC_WHATSAPP_NUMBER` (en `.env.local` o en Vercel). El WhatsApp
  que se *muestra* en el pie de página sí se edita desde Configuración.
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
