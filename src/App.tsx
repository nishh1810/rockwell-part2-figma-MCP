import { Check, ChevronDown, X } from "lucide-react";

import { useCatalogStore } from "@/stores/catalog-store";

const materials = ["Chrome", "Gunmetal", "White Chrome", "Rose Gold"];
const types = ["Adjustable", "Fixed"];

const products = [
  {
    id: "rockwell-6s",
    name: "Rockwell 6S Adjustable",
    material: "Stainless Steel",
    price: "$120",
  },
  {
    id: "rockwell-6c",
    name: "Rockwell 6C",
    material: "Chrome",
    price: "$80",
  },
  {
    id: "rockwell-t2",
    name: "Rockwell T2",
    material: "Gunmetal",
    price: "$50",
  },
  {
    id: "rockwell-r1",
    name: "Rockwell R1",
    material: "White Chrome",
    price: "$40",
  },
  {
    id: "rockwell-model-t",
    name: "Rockwell Model T",
    material: "Matte Black",
    price: "$150",
  },
  {
    id: "rockwell-2c",
    name: "Rockwell 2C",
    material: "Chrome",
    price: "$30",
  },
];

type ActiveFilter = {
  label: string;
  onRemove: () => void;
};

function CheckboxRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex h-[18px] cursor-pointer items-center gap-2 text-[10px] font-medium leading-none text-neutral-700">
      <span
        className={[
          "grid size-[11px] place-items-center rounded-[2px] border",
          checked
            ? "border-neutral-950 bg-neutral-950 text-white"
            : "border-neutral-300 bg-white",
        ].join(" ")}
      >
        {checked ? <Check className="size-2 stroke-[3]" /> : null}
      </span>
      <input
        className="sr-only"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
}

function FilterChip({ label, onRemove }: ActiveFilter) {
  return (
    <span className="inline-flex h-[18px] items-center gap-1 rounded-full bg-white px-2 text-[9px] font-medium text-neutral-700 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
      {label}
      <button
        aria-label={`Remove ${label} filter`}
        className="-mr-0.5 grid size-3 place-items-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
        type="button"
        onClick={onRemove}
      >
        <X className="size-2.5" />
      </button>
    </span>
  );
}

function App() {
  const {
    materials: selectedMaterials,
    types: selectedTypes,
    inStockOnly,
    selectedProductId,
    sort,
    toggleMaterial,
    toggleType,
    removeMaterial,
    removeType,
    setInStockOnly,
    setSelectedProductId,
    setSort,
    clearFilters,
  } = useCatalogStore();

  const activeFilters: ActiveFilter[] = [
    ...selectedMaterials.map((material) => ({
      label: material,
      onRemove: () => removeMaterial(material),
    })),
    ...selectedTypes.map((type) => ({
      label: type,
      onRemove: () => removeType(type),
    })),
    ...(inStockOnly
      ? [
          {
            label: "In stock",
            onRemove: () => setInStockOnly(false),
          },
        ]
      : []),
  ];

  return (
    <main className="min-h-screen bg-[#f5f5f5] px-4 py-6 font-sans text-neutral-950 sm:px-7">
      <section className="mx-auto w-full max-w-[720px]">
        <header className="mb-6">
          <h1 className="text-[15px] font-semibold leading-none tracking-normal">
            Shop Razors
          </h1>
          <p className="mt-2 text-[10px] leading-none text-neutral-500">
            Precision-engineered safety razors. Find the right fit for your shave.
          </p>
        </header>

        <div className="grid items-start gap-5 md:grid-cols-[176px_minmax(0,1fr)]">
          <aside className="rounded-[4px] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.035)]">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[11px] font-semibold leading-none">
                Filters
              </h2>
              <button
                className="text-[9px] font-medium leading-none text-neutral-400 transition-colors hover:text-neutral-950"
                type="button"
                onClick={clearFilters}
              >
                Clear all
              </button>
            </div>

            <label className="mt-5 block">
              <span className="sr-only">Search razors</span>
              <input
                className="h-8 w-full rounded-[4px] border-0 bg-[#f7f7f7] px-3 text-[10px] font-medium text-neutral-700 outline-none placeholder:text-neutral-300"
                placeholder="Search razors"
                type="search"
              />
            </label>

            <fieldset className="mt-5">
              <legend className="mb-2 text-[8px] font-semibold uppercase tracking-[0.1em] text-neutral-500">
                Material
              </legend>
              <div className="space-y-1.5">
                {materials.map((material) => (
                  <CheckboxRow
                    key={material}
                    label={material}
                    checked={selectedMaterials.includes(material)}
                    onChange={() => toggleMaterial(material)}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-5">
              <legend className="mb-2 text-[8px] font-semibold uppercase tracking-[0.1em] text-neutral-500">
                Type
              </legend>
              <div className="space-y-1.5">
                {types.map((type) => (
                  <CheckboxRow
                    key={type}
                    label={type}
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                  />
                ))}
              </div>
            </fieldset>

            <div className="mt-5 flex h-5 items-center justify-between">
              <span className="text-[10px] font-medium text-neutral-700">
                In stock only
              </span>
              <button
                aria-pressed={inStockOnly}
                className={[
                  "relative h-[15px] w-[30px] rounded-full transition-colors",
                  inStockOnly ? "bg-neutral-950" : "bg-neutral-200",
                ].join(" ")}
                type="button"
                onClick={() => setInStockOnly(!inStockOnly)}
              >
                <span
                  className={[
                    "absolute top-[3px] size-[9px] rounded-full bg-white transition-transform",
                    inStockOnly ? "translate-x-[18px]" : "translate-x-[3px]",
                  ].join(" ")}
                />
              </button>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold leading-none">
                  {products.length} razors
                </p>
                <div className="mt-3 flex min-h-[18px] flex-wrap gap-1.5">
                  {activeFilters.map((filter) => (
                    <FilterChip
                      key={filter.label}
                      label={filter.label}
                      onRemove={filter.onRemove}
                    />
                  ))}
                </div>
              </div>

              <label className="relative shrink-0">
                <span className="sr-only">Sort products</span>
                <select
                  className="h-[26px] appearance-none rounded-[4px] border border-neutral-200 bg-white py-0 pl-3 pr-7 text-[9px] font-medium text-neutral-700 shadow-sm outline-none"
                  value={sort}
                  onChange={(event) =>
                    setSort(event.target.value as typeof sort)
                  }
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-3 -translate-y-1/2 text-neutral-500" />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {products.map((product) => {
                const isSelected = selectedProductId === product.id;

                return (
                  <article
                    key={product.id}
                    className="overflow-hidden rounded-[4px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.035)]"
                  >
                    <div className="h-[96px] bg-[#e8e8ea]" />
                    <div className="grid min-h-[66px] grid-cols-[1fr_auto] gap-3 px-3 py-3">
                      <div>
                        <h3 className="text-[10px] font-semibold leading-3 text-neutral-950">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-[8px] font-medium leading-3 text-neutral-500">
                          {product.material}
                        </p>
                        <p className="mt-2 text-[10px] font-semibold leading-none">
                          {product.price}
                        </p>
                      </div>

                      <button
                        className={[
                          "inline-flex h-[20px] items-center gap-1 self-end rounded-[3px] px-2.5 text-[8px] font-semibold leading-none transition-colors",
                          isSelected
                            ? "bg-neutral-950 text-white"
                            : "bg-white text-neutral-700 hover:bg-neutral-100",
                        ].join(" ")}
                        type="button"
                        onClick={() => setSelectedProductId(product.id)}
                      >
                        {isSelected ? (
                          <>
                            <Check className="size-2 stroke-[3]" />
                            Selected
                          </>
                        ) : (
                          "Select"
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
