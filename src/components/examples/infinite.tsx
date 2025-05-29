import { fruits, type Fruit } from "@/datasets/fruit";
import { Check, XIcon } from "@/svgs";
import { cn } from "@/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useAutoComplete } from "@wispe/wispe-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const cache = new Map<number, any[]>();

const generateFruits = (n: number) => {
  if (cache.has(n)) {
    return cache.get(n)!;
  }

  // Generate the dataset
  const dataset = [];
  for (let i = 0; i < n; i++) {
    const item = fruits[i % fruits.length];
    dataset.push({
      ...item,
      name: `${item.label}${i}`,
      value: `${item.value.toLowerCase()}${i}`,
      label: `${item.label} ${i}`,
    });
  }

  // Cache the result before returning
  cache.set(n, dataset);
  return dataset;
};

// Simulate a paged API that accepts a searchTerm
async function fetchFruitPage(
  limit: number,
  offset = 0,
  searchTerm = ""
): Promise<{ rows: Fruit[]; nextOffset: number }> {
  let filtered = generateFruits(10000);
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter((u) => u.name.toLowerCase().includes(term));
  }
  const start = offset * limit;
  const rows = filtered.slice(start, start + limit);
  // simulate network latency
  await new Promise((r) => setTimeout(r, 500));
  return { rows, nextOffset: offset + 1 };
}

export function Infinite() {
  const [filter, setFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<Fruit | null>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["fruits", filter],
    queryFn: ({ pageParam }) => fetchFruitPage(20, pageParam as number, filter),
    initialPageParam: 0,
    getNextPageParam: (last) =>
      last.rows.length === 20 ? last.nextOffset : undefined,
  });

  const allFruits = useMemo(
    () => data?.pages.flatMap((d) => d.rows) ?? [],
    [data?.pages]
  );

  const parentRef = useRef<HTMLUListElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allFruits.length + 1 : allFruits.length,
    getScrollElement: () => parentRef.current,
    getItemKey: useCallback(
      (index: number) => {
        if (index > allFruits.length - 1) {
          return `loader-${index}`;
        }
        return allFruits[index].value;
      },
      [allFruits]
    ),
    estimateSize: () => 48,
    overscan: 5,
  });

  // auto‐load next page on scroll end
  const virtualItems = rowVirtualizer.getVirtualItems();
  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1];
    if (
      lastItem &&
      lastItem.index >= allFruits.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    allFruits.length,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    virtualItems,
  ]);

  // wire up autocomplete so typing drives `filter`
  const {
    getRootProps,
    getLabelProps,
    getInputProps,
    getListProps,
    getItemProps,
    getItemState,
    hasSelectedItem,
    getSelectedItem,
    getClearProps,
  } = useAutoComplete<Fruit>({
    state: {
      inputValue: filter,
      setInputValue: setFilter,
      isOpen,
      setIsOpen,
      activeItem,
      setActiveItem,
    },
    items: allFruits,
    itemToString: (u) => u.label,
    asyncDebounceMs: 500,
    onFilterAsync: async ({ searchTerm }) => {
      // update the React Query filter
      setFilter(searchTerm);
      // return allFruits so hook's internal list stays in sync
      return allFruits;
    },
    // listboxRef: parentRef,
  });

  return (
    <div className="relative max-w-md">
      <label {...getLabelProps()}>Search fruits</label>
      <div {...getRootProps()} className="relative">
        <input
          {...getInputProps()}
          placeholder="Type to filter fruits…"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {isLoading || isFetchingNextPage ? (
          <div
            role="status"
            aria-live="polite"
            className="absolute flex items-center -translate-y-1/2 right-3 top-1/2"
          >
            <span className="sr-only">Loading…</span>
            <div
              className="w-5 h-5 border-2 border-gray-300 rounded-full border-t-emerald-500 animate-spin"
              aria-hidden="true"
            />
          </div>
        ) : hasSelectedItem() ? (
          <button
            {...getClearProps()}
            type="button"
            className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600 focus:outline-emerald-600"
          >
            <XIcon />
          </button>
        ) : null}
        {isOpen && (
          <ul
            {...getListProps()}
            ref={parentRef}
            className="absolute z-10 w-full mt-1 overflow-auto bg-slate-700 border rounded-md shadow-lg h-80"
          >
            {isLoading ? (
              <p className="p-4">Loading...</p>
            ) : isError ? (
              <p className="p-4 text-red-500">
                Error: {(error as Error).message}
              </p>
            ) : (
              rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const idx = virtualRow.index;
                const isLoader = idx > allFruits.length - 1;
                const key = isLoader ? `loader-${idx}` : allFruits[idx].value;
                const style = {
                  position: "absolute" as const,
                  top: virtualRow.start,
                  width: "100%",
                  size: virtualRow.size,
                };

                if (isLoader) {
                  return (
                    <p
                      key={key}
                      style={style}
                      className="flex items-center justify-center py-3 border-t border-slate-300 bg-slate-700"
                    >
                      {hasNextPage ? "Loading more…" : "End of fruits"}
                    </p>
                  );
                }

                const fruit = allFruits[idx];
                return (
                  <li
                    key={fruit.value}
                    {...getItemProps(fruit)}
                    style={style}
                    className={cn(
                      "px-4 py-3 cursor-pointer hover:bg-gray-700 bg-slate-900",
                      getItemState(fruit).isActive && "bg-gray-700"
                    )}
                  >
                    <div>
                      <div className="flex font-medium">
                        <p className="flex-1">{fruit.label}</p>
                        {getItemState(fruit).isSelected && (
                          <Check className="text-emerald-500" />
                        )}
                      </div>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>

      <div className="p-4 mt-4 rounded-md bg-slate-600">
        <h3 className="text-sm font-medium text-slate-100">Selected Fruit:</h3>
        {getSelectedItem() ? (
          <p className="mt-2 text-sm text-slate-100">
            {getSelectedItem()?.label}
          </p>
        ) : (
          <p className="mt-2 text-sm text-slate-100">No fruit selected</p>
        )}
      </div>
    </div>
  );
}
