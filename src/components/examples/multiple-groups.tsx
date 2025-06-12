import { fruits, type Fruit } from "@/datasets/fruit";
import { Check, XIcon } from "@/svgs";
import { cn } from "@/utils";
import { useAutoComplete } from "@wispe/wispe-react";

export function MultipleGroupsExample() {
  const {
    getRootProps,
    getLabelProps,
    getInputProps,
    getListProps,
    getItemProps,
    getItemState,
    getItems,
    getGroupProps,
    getGroupLabelProps,
    getClearProps,
    hasSelectedItem,
    isOpen,
    getSelectedItem,
  } = useAutoComplete<Fruit>({
    items: fruits,
    onFilterAsync: async ({ searchTerm }) =>
      fruits.filter((f) =>
        f.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    itemToString: (f) => f.label,
    state: {
      grouping: [
        { key: "season", label: "Season" },
        { key: "type", label: "Fruit Type" },
      ],
    },
  });

  return (
    <div className="w-full">
      <div className="relative">
        <label {...getLabelProps()}>Search fruits</label>
        <div {...getRootProps()} className="relative">
          <input
            {...getInputProps()}
            placeholder="Type to filter fruits…"
            className="w-full px-3 py-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          {hasSelectedItem() && (
            <button
              type="button"
              {...getClearProps()}
              className="absolute text-slate-200 -translate-y-1/2 bg-transparent right-3 top-1/2 hover:text-slate-400 focus:outline-emerald-600"
            >
              <XIcon />
            </button>
          )}

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-slate-900 border border-slate-900 rounded-md shadow-lg">
              <ul {...getListProps()} className="overflow-auto max-h-60">
                {getItems().length === 0 ? (
                  <li className="px-4 py-2 text-slate-500">No fruits found</li>
                ) : (
                  <>
                    {getItems().length === 0 ? (
                      <div className="px-4 py-2 text-slate-500">
                        No results found
                      </div>
                    ) : (
                      getItems().map((seasonGroup) => (
                        <ul
                          {...getGroupProps(seasonGroup)}
                          key={seasonGroup.key}
                        >
                          <span
                            {...getGroupLabelProps(seasonGroup)}
                            className="block px-4 py-1 text-xs font-bold tracking-wider text-slate-300 uppercase bg-slate-700"
                          >
                            {seasonGroup.key}
                          </span>

                          {/* second‐level groups = by type */}
                          {seasonGroup.groups?.map((typeGroup) => (
                            <ul
                              {...getGroupProps(typeGroup)}
                              key={typeGroup.key}
                              className="pl-4"
                            >
                              <span
                                {...getGroupLabelProps(typeGroup)}
                                className="block px-4 py-1 text-xs font-bold tracking-wider text-slate-300 uppercase bg-slate-600"
                              >
                                {typeGroup.key}
                              </span>
                              <ul {...typeGroup.listProps} className="py-1">
                                {typeGroup.items.map((fruit) => (
                                  <li
                                    key={fruit.value}
                                    {...getItemProps(fruit)}
                                    className={cn(
                                      "px-4 py-2 flex items-center justify-between hover:bg-slate-700",
                                      getItemState(fruit).isActive &&
                                        "bg-slate-700"
                                    )}
                                  >
                                    <span>{fruit.label}</span>
                                    {getItemState(fruit).isSelected && (
                                      <Check className="text-green-500 h-5 w-5" />
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </ul>
                          ))}
                        </ul>
                      ))
                    )}
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
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
