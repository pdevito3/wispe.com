import { fruits, type Fruit } from "@/datasets/fruit";
import { Check, XIcon } from "@/svgs";
import { cn } from "@/utils";
import { useDropdown } from "@wispe/wispe-react";

export function DropdownMultiselectExample() {
  const {
    getRootProps,
    getLabelProps,
    getTriggerProps,
    getListProps,
    getItemProps,
    getItemState,
    getItems,
    getClearProps,
    hasSelectedItem,
    isOpen,
    getSelectedItem,
    getTriggerText,
  } = useDropdown<Fruit>({
    mode: "multiple",
    items: fruits.slice(0, 10),
    itemToString: (f) => f.label,
    placeholder: "Select fruits...",
  });

  const selected = (getSelectedItem() as Fruit[] | undefined) ?? [];

  return (
    <div className="w-full">
      <div className="relative">
        <label {...getLabelProps()}>Multiselect Dropdown</label>
        <div {...getRootProps()} className="relative">
          <div className="space-y-2">
            {/* Selected items pills */}
            {selected.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selected.slice(0, 3).map((fruit) => (
                  <span
                    key={fruit.value}
                    className="flex items-center px-2 py-1 bg-slate-700 text-slate-100 rounded-full text-sm"
                  >
                    {fruit.label}
                    <button
                      type="button"
                      className="ml-1 text-slate-300 hover:text-slate-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Implement individual item removal
                      }}
                    >
                      <XIcon className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selected.length > 3 && (
                  <span className="flex items-center px-2 py-1 bg-slate-600 text-slate-300 rounded-full text-sm">
                    +{selected.length - 3} more
                  </span>
                )}
              </div>
            )}
            
            {/* Trigger button */}
            <div className="flex items-center gap-2">
              <button
                {...getTriggerProps()}
                className="flex items-center justify-between w-auto px-3 py-2 font-medium text-left text-white bg-emerald-500 border border-emerald-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {getTriggerText()}
              </button>
              {hasSelectedItem() && (
                <button
                  type="button"
                  className="text-slate-200 hover:text-slate-400"
                  {...getClearProps()}
                >
                  <XIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-slate-900 border border-slate-900 rounded-md shadow-lg">
              <ul {...getListProps()} className="overflow-auto max-h-60">
                {getItems().length === 0 ? (
                  <li className="px-4 py-2 text-slate-500">No fruits found</li>
                ) : (
                  getItems().map((fruit) => {
                    const itemState = getItemState(fruit);
                    return (
                      <li
                        key={fruit.value}
                        {...getItemProps(fruit)}
                        className={cn(
                          "px-4 py-2",
                          !itemState.isDisabled && "hover:bg-slate-700",
                          itemState.isActive && "bg-slate-700",
                          itemState.isDisabled && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {/* Checkbox-style indicator */}
                            <div className={cn(
                              "w-4 h-4 border-2 rounded flex items-center justify-center",
                              itemState.isSelected 
                                ? "bg-green-500 border-green-500 text-white"
                                : "border-slate-400"
                            )}>
                              {itemState.isSelected && (
                                <Check className="w-3 h-3" />
                              )}
                            </div>
                            <span>{fruit.label}</span>
                          </div>
                          <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                            {fruit.type}
                          </span>
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 mt-4 rounded-md bg-slate-600">
        <h3 className="text-sm font-medium text-slate-100">
          Selected Fruits ({selected.length}):
        </h3>
        {selected.length > 0 ? (
          <div className="mt-2 space-y-1">
            {selected.map((fruit) => (
              <p key={fruit.value} className="text-sm text-slate-100">
                • {fruit.label} ({fruit.type})
              </p>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-slate-100">No fruits selected</p>
        )}
      </div>
    </div>
  );
}