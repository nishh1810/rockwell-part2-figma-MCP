import { create } from "zustand";

type SortOption = "featured" | "price-low" | "price-high";

interface CatalogState {
  materials: string[];
  types: string[];
  inStockOnly: boolean;
  selectedProductId: string;
  sort: SortOption;
  toggleMaterial: (material: string) => void;
  toggleType: (type: string) => void;
  removeMaterial: (material: string) => void;
  removeType: (type: string) => void;
  setInStockOnly: (value: boolean) => void;
  setSelectedProductId: (id: string) => void;
  setSort: (sort: SortOption) => void;
  clearFilters: () => void;
}

const toggleValue = (values: string[], value: string) =>
  values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];

export const useCatalogStore = create<CatalogState>((set) => ({
  materials: ["Chrome", "Gunmetal"],
  types: ["Adjustable"],
  inStockOnly: true,
  selectedProductId: "rockwell-6s",
  sort: "featured",
  toggleMaterial: (material) =>
    set((state) => ({ materials: toggleValue(state.materials, material) })),
  toggleType: (type) =>
    set((state) => ({ types: toggleValue(state.types, type) })),
  removeMaterial: (material) =>
    set((state) => ({
      materials: state.materials.filter((item) => item !== material),
    })),
  removeType: (type) =>
    set((state) => ({
      types: state.types.filter((item) => item !== type),
    })),
  setInStockOnly: (value) => set({ inStockOnly: value }),
  setSelectedProductId: (id) => set({ selectedProductId: id }),
  setSort: (sort) => set({ sort }),
  clearFilters: () => set({ materials: [], types: [], inStockOnly: false }),
}));
