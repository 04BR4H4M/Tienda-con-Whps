-- ============================================================
-- Tallo & Cera — Esquema de base de datos para Supabase
-- Copia y pega TODO este archivo en: Supabase → SQL Editor → New query → Run
-- ============================================================

-- 1. Tabla de categorías
create table if not exists categories (
  id bigint generated always as identity primary key,
  slug text not null unique,
  label text not null,
  sort_order int not null default 0
);

-- 2. Tabla de productos
create table if not exists products (
  id bigint generated always as identity primary key,
  slug text not null unique,
  name text not null,
  category_slug text not null references categories(slug) on update cascade,
  price integer not null check (price >= 0),
  badge text,
  short_desc text,
  description text,
  images text[] not null default '{}',
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- 3. Categorías iniciales (puedes editarlas luego desde el panel más adelante,
--    por ahora se crean directo por SQL una sola vez)
insert into categories (slug, label, sort_order) values
  ('jabones', 'Jabones', 1),
  ('velas', 'Velas', 2),
  ('otros', 'Otros', 3)
on conflict (slug) do nothing;

-- 4. Seguridad: Row Level Security
alter table products enable row level security;
alter table categories enable row level security;

-- Lectura pública (cualquiera puede VER el catálogo, incluso sin login)
create policy "Productos visibles para todos"
  on products for select
  using (is_active = true);

create policy "Categorías visibles para todos"
  on categories for select
  using (true);

-- Escritura solo para usuarios autenticados (el/los administrador(es))
create policy "Solo admins pueden insertar productos"
  on products for insert
  to authenticated
  with check (true);

create policy "Solo admins pueden editar productos"
  on products for update
  to authenticated
  using (true);

create policy "Solo admins pueden borrar productos"
  on products for delete
  to authenticated
  using (true);

create policy "Solo admins pueden ver productos inactivos"
  on products for select
  to authenticated
  using (true);

-- ============================================================
-- 5. Storage: bucket público para las fotos de producto
--    (Esto también se puede hacer desde la UI: Storage → New bucket → "productos" → Public)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('productos', 'productos', true)
on conflict (id) do nothing;

create policy "Fotos de productos visibles para todos"
  on storage.objects for select
  using (bucket_id = 'productos');

create policy "Solo admins pueden subir fotos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'productos');

create policy "Solo admins pueden borrar fotos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'productos');
