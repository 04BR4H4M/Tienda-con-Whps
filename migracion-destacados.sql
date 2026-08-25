-- ============================================================
--  Migración: Destacados administrables + categorías con foto
-- ============================================================

-- Permite marcar un producto para que aparezca en "Destacados"
-- del home, desde el panel de administrador.
alter table products
  add column if not exists is_featured boolean not null default false;

-- Permite que cada categoría tenga su propia foto y frase corta,
-- para las tarjetas de categoría del home (en vez de fijarlas en el código).
alter table categories
  add column if not exists image text;

alter table categories
  add column if not exists tagline text;

NOTIFY pgrst, 'reload schema';
