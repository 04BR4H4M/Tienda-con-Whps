import Link from "next/link";
import Icon from "@/components/Icon";

export default function CategoryFilters({ active, categories = [] }) {
  const isActive = (slug) => (slug === "todos" ? !active || active === "todos" : active === slug);
  return <aside className="md:sticky md:top-24 md:self-start"><div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0"><p className="hidden md:block text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft mb-2">Categorías</p><FilterLink slug="todos" label="Todos" active={isActive("todos")} />{categories.map((c) => <FilterLink key={c.slug} slug={c.slug} label={c.label} active={isActive(c.slug)} />)}</div></aside>;
}
function FilterLink({ slug, label, active }) { const href = slug === "todos" ? "/catalogo" : `/catalogo?categoria=${slug}`; return <Link href={href} className={`whitespace-nowrap text-sm font-medium px-4 py-2.5 rounded-xl transition flex items-center gap-2 ${active ? "bg-color2 text-primary-dark font-bold" : "hover:bg-surface text-ink-soft"}`}>{active && <Icon name="check" size={14} />}{label}</Link>; }
