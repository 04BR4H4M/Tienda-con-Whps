import Link from "next/link";
import { categories } from "@/data/products";

export default function CategoryFilters({ active }) {
  const isActive = (slug) => (slug === "todos" ? !active || active === "todos" : active === slug);

  return (
    <aside className="md:sticky md:top-20 md:self-start">
      <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
        <p className="hidden md:block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">
          Filtrar
        </p>
        <FilterLink slug="todos" label="Todos" active={isActive("todos")} />
        {categories.map((c) => (
          <FilterLink key={c.slug} slug={c.slug} label={c.label} active={isActive(c.slug)} />
        ))}
      </div>
    </aside>
  );
}

function FilterLink({ slug, label, active }) {
  const href = slug === "todos" ? "/catalogo" : `/catalogo?categoria=${slug}`;
  return (
    <Link
      href={href}
      className={`whitespace-nowrap text-sm font-medium px-3 py-2 rounded-lg border-l-4 md:border-l-4 border-transparent transition
        ${active ? "border-accent bg-surface text-primary-dark font-bold" : "hover:bg-surface"}`}
    >
      {label}
    </Link>
  );
}
