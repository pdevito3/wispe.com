import type { User } from "@/datasets/users";
import { Check, XIcon } from "@/svgs";
import { cn } from "@/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useAutoComplete } from "@wispe/wispe-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const mockUsers: User[] = Array.from({ length: 80 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
}));

// Simulate a paged API that accepts a searchTerm
async function fetchUserPage(
  limit: number,
  offset = 0,
  searchTerm = ""
): Promise<{ rows: User[]; nextOffset: number }> {
  try {
    let filtered = mockUsers;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term)
      );
    }
    const start = offset * limit;
    const rows = filtered.slice(start, start + limit);
    // simulate network latency
    await new Promise((r) => setTimeout(r, 500));
    return { rows, nextOffset: offset + 1 };
  } catch (error) {
    console.error('Error in fetchUserPage:', error);
    throw error;
  }
}

export function Infinite() {
  const [filter, setFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<User | null>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["users", filter],
    queryFn: ({ pageParam = 0 }) => {
      console.log('Fetching page:', pageParam, 'filter:', filter);
      return fetchUserPage(20, pageParam as number, filter);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      console.log('getNextPageParam:', { lastPage, pagesCount: pages.length });
      return lastPage.rows.length === 20 ? lastPage.nextOffset : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  });

  const allUsers = useMemo(() => {
    const users = data?.pages.flatMap((d) => d.rows) ?? [];
    console.log('allUsers computed:', users.length);
    return users;
  }, [data?.pages]);

  const parentRef = useRef<HTMLUListElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allUsers.length + 1 : allUsers.length,
    getScrollElement: () => parentRef.current,
    getItemKey: useCallback(
      (index: number) => {
        if (index > allUsers.length - 1) {
          return `loader-${index}`;
        }
        return allUsers[index].id;
      },
      [allUsers]
    ),
    estimateSize: () => 60,
    overscan: 5,
  });

  // auto‐load next page on scroll end
  const virtualItems = rowVirtualizer.getVirtualItems();
  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1];
    if (
      lastItem &&
      lastItem.index >= allUsers.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    allUsers.length,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    virtualItems,
  ]);

  const {
    getRootProps,
    getLabelProps,
    getInputProps,
    getListProps,
    getItemProps,
    getItemState,
    hasSelectedItem,
    getClearProps,
  } = useAutoComplete({
    state: {
      inputValue: filter,
      setInputValue: setFilter,
      isOpen,
      setIsOpen,
      activeItem,
      setActiveItem,
    },
    items: allUsers,
    itemToString: (u) => u.name,
    asyncDebounceMs: 300,
    onFilterAsync: async ({ searchTerm }) => {
      // update the React Query filter
      setFilter(searchTerm);
      // return allUsers so hook's internal list stays in sync
      return allUsers;
    },
    // listboxRef: parentRef,
  });
  return (
    <div className="relative max-w-md">
      <label {...getLabelProps()}>Search users</label>
      <div {...getRootProps()} className="relative">
        <input
          {...getInputProps()}
          placeholder="Type to filter users…"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {isLoading || isFetchingNextPage ? (
          <div
            role="status"
            aria-live="polite"
            className="absolute flex items-center -translate-y-1/2 right-3 top-1/2"
          >
            <span className="sr-only">Loading…</span>
            <div
              className="w-5 h-5 border-2 border-slate-300 rounded-full border-t-emerald-500 animate-spin"
              aria-hidden="true"
            />
          </div>
        ) : hasSelectedItem() ? (
          <button
            {...getClearProps()}
            type="button"
            className="absolute text-slate-400 -translate-y-1/2 right-3 top-1/2 hover:text-slate-600 focus:outline-sky-600"
          >
            <XIcon />
          </button>
        ) : null}
        {isOpen && (
          <ul
            {...getListProps()}
            className="absolute z-10 w-full mt-1 overflow-auto bg-slate-700 border rounded-md shadow-lg h-80"
            ref={parentRef}
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
                const isLoader = idx > allUsers.length - 1;
                const key = isLoader ? `loader-${idx}` : allUsers[idx].id;
                const style = {
                  position: "absolute" as const,
                  top: virtualRow.start,
                  width: "100%",
                };

                if (isLoader) {
                  return (
                    <p
                      key={key}
                      style={style}
                      className="flex items-center justify-center py-2 mt-3 border-t border-slate-200 bg-slate-700"
                    >
                      {hasNextPage ? "Loading more…" : "End of users"}
                    </p>
                  );
                }

                const user = allUsers[idx];
                return (
                  <li
                    key={user.id}
                    {...getItemProps(user)}
                    style={style}
                    className={cn(
                      "px-4 py-2 cursor-pointer hover:bg-slate-600 bg-slate-900",
                      getItemState(user).isActive && "bg-slate-900"
                    )}
                  >
                    <div>
                      <div className="flex font-medium">
                        <p className="flex-1">{user.name}</p>
                        {getItemState(user).isSelected && (
                          <Check className="text-emerald-500" />
                        )}
                      </div>
                      <div className="text-sm text-slate-500">{user.email}</div>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
