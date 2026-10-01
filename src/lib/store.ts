"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CatalogItem = {
  id: number;
  name: string;
  price: number;
  category: "Automation" | "Analytics" | "Security" | "Operations";
  badge: string;
  accent: string;
};

export const catalogItems: CatalogItem[] = [
  { id: 1, name: "Signal Board", price: 199, category: "Automation", badge: "Fastest", accent: "from-sky-400 to-cyan-500" },
  { id: 2, name: "Heatmap Lens", price: 249, category: "Analytics", badge: "Popular", accent: "from-violet-500 to-indigo-500" },
  { id: 3, name: "Trust Check", price: 179, category: "Security", badge: "Secure", accent: "from-emerald-400 to-teal-500" },
  { id: 4, name: "Ops Relay", price: 319, category: "Operations", badge: "New", accent: "from-amber-400 to-orange-500" },
];

type StoreState = {
  cart: CatalogItem[];
  filters: {
    category: "All" | CatalogItem["category"];
    sort: "featured" | "price-asc" | "price-desc";
  };
  addToCart: (item: CatalogItem) => void;
  removeFromCart: (id: number) => void;
  setCategory: (category: StoreState["filters"]["category"]) => void;
  setSort: (sort: StoreState["filters"]["sort"]) => void;
  clearCart: () => void;
};

export const useCartStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      filters: {
        category: "All",
        sort: "featured",
      },
      addToCart: (item) =>
        set((state) => ({
          cart: [...state.cart, item],
        })),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      setCategory: (category) =>
        set((state) => ({
          filters: { ...state.filters, category },
        })),
      setSort: (sort) =>
        set((state) => ({
          filters: { ...state.filters, sort },
        })),
      clearCart: () =>
        set(() => ({
          cart: [],
        })),
    }),
    {
      name: "aurora-flow-state",
      partialize: (state) => ({ cart: state.cart, filters: state.filters }),
    },
  ),
);
