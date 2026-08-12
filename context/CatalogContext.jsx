"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CatalogContext = createContext({ products: [], categories: [], loading: true });

export function CatalogProvider({ children }) {
  const [state, setState] = useState({ products: [], categories: [], loading: true });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/catalog")
      .then((res) => res.json())
      .then(({ products, categories }) => {
        if (!cancelled) setState({ products, categories, loading: false });
      })
      .catch((err) => {
        console.error("Error cargando catálogo:", err);
        if (!cancelled) setState((s) => ({ ...s, loading: false }));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <CatalogContext.Provider value={state}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  return useContext(CatalogContext);
}
