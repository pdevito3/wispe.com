import { fruits } from "@/datasets/fruit";
import { Check, XIcon } from "@/svgs";
import { cn } from "@/utils";
import { useAutoComplete } from "@wispe/wispe-react";

export function GroupsExample() {
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
  } = useAutoComplete({
    items: fruits,
    onFilterAsync: async ({ searchTerm }) =>
      fruits.filter((f) =>
        f.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    itemToString: (f) => f.label,
    state: {
      grouping: [{ key: "type", label: "Fruit Type" }],
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
                  getItems().map((group) => (
                    <li key={group.key} className="">
                      <ul {...getGroupProps(group)} className="py-1">
                        <li>
                          <span
                            {...getGroupLabelProps(group)}
                            className="block px-4 py-1 text-xs uppercase tracking-wider font-bold bg-gray-600 text-gray-200"
                          >
                            {group.key}
                          </span>
                        </li>
                        {/* Actual options */}
                        {group.items.map((fruit) => (
                          <li
                            key={fruit.value}
                            {...getItemProps(fruit)}
                            className={cn(
                              "px-4 py-2 flex items-center justify-between hover:bg-slate-700",
                              getItemState(fruit).isActive && "bg-slate-700"
                            )}
                          >
                            <span>{fruit.label}</span>
                            {getItemState(fruit).isSelected && (
                              <Check className="text-green-500 h-5 w-5" />
                            )}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))
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
