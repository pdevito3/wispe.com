import { fruits, type Fruit } from "@/datasets/fruit";
import { Check } from "@/svgs";
import { cn } from "@/utils";
import { useDropdown } from "@wispe/wispe-react";

export function DropdownGroupingExample() {
  const {
    getRootProps,
    getLabelProps,
    getTriggerProps,
    getListProps,
    getGroupProps,
    getGroupLabelProps,
    getItemProps,
    getItemState,
    getItems,
    isOpen,
    getSelectedItem,
    getTriggerText,
  } = useDropdown<Fruit>({
    items: fruits,
    state: {
      grouping: [{ key: "type", label: "Fruit Type" }],
    },
    itemToString: (f) => f.label,
    placeholder: "Select a fruit...",
  });

  return (
    <div className="w-full">
      <div className="relative">
        <label {...getLabelProps()}>Grouped Dropdown</label>
        <div {...getRootProps()} className="relative">
          <button
            {...getTriggerProps()}
            className="flex items-center justify-between w-auto px-3 py-2 font-medium text-left text-white bg-emerald-500 border border-emerald-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {getTriggerText()}
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-slate-900 border border-slate-900 rounded-md shadow-lg">
              <div {...getListProps()} className="overflow-auto max-h-80">
                {getItems().length === 0 ? (
                  <div className="px-4 py-2 text-slate-500">No fruits found</div>
                ) : (
                  getItems().map((group) => (
                    <div key={group.key} className="border-b border-slate-700 last:border-b-0">
                      {/* Group Header */}
                      <div
                        {...getGroupLabelProps(group)}
                        className="px-4 py-2 bg-slate-800 border-b border-slate-700 font-medium text-slate-200 text-sm sticky top-0"
                      >
                        {group.header.label}
                        <span className="ml-2 text-xs text-slate-400">
                          ({group.items.length} items)
                        </span>
                      </div>
                      {/* Group Items */}
                      <ul {...getGroupProps(group)}>
                        {group.items.map((fruit) => {
                          const { isActive, isSelected, isDisabled } =
                            getItemState(fruit);

                          return (
                            <li
                              key={fruit.value}
                              {...getItemProps(fruit)}
                              className={cn(
                                "px-4 py-2 flex items-center justify-between",
                                !isDisabled && "hover:bg-slate-700",
                                isActive && "bg-slate-700",
                                isDisabled && "opacity-50 cursor-not-allowed"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                {fruit.label}
                                <span className="text-xs bg-slate-700 text-slate-400 px-2 py-1 rounded">
                                  {fruit.color}
                                </span>
                              </div>
                              {isSelected && (
                                <Check className="text-green-500" />
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 mt-4 rounded-md bg-slate-600">
        <h3 className="text-sm font-medium text-slate-100">Selected Fruit:</h3>
        {getSelectedItem() ? (
          <div className="mt-2 space-y-1">
            <p className="text-sm text-slate-100">
              Name: {getSelectedItem()?.label}
            </p>
            <p className="text-sm text-slate-100">
              Type: {getSelectedItem()?.type}
            </p>
            <p className="text-sm text-slate-100">
              Color: {getSelectedItem()?.color}
            </p>
            <p className="text-sm text-slate-100">
              Season: {getSelectedItem()?.season}
            </p>
          </div>
        ) : (
          <p className="mt-2 text-sm text-slate-100">No fruit selected</p>
        )}
      </div>
    </div>
  );
}