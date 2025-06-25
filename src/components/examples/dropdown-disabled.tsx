import { fruits, type Fruit } from "@/datasets/fruit";
import { Check } from "@/svgs";
import { cn } from "@/utils";
import { useDropdown } from "@wispe/wispe-react";

export function DropdownDisabledExample() {
  const {
    getRootProps,
    getLabelProps,
    getTriggerProps,
    getListProps,
    getItemProps,
    getItemState,
    getItems,
    isOpen,
    getTriggerText,
    getIsDisabled,
  } = useDropdown<Fruit>({
    items: fruits.slice(0, 5),
    itemToString: (item) => item.label,
    placeholder: "Select a fruit",
    state: {
      disabled: true,
    },
  });

  return (
    <div className="w-full">
      <div className="relative">
        <label {...getLabelProps()}>Disabled Dropdown</label>
        <div {...getRootProps()} className="relative">
          <button
            {...getTriggerProps()}
            className={cn(
              "flex items-center justify-between w-auto px-3 py-2 font-medium text-left border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              getIsDisabled()
                ? "bg-gray-900 border-gray-800 text-gray-600 cursor-not-allowed"
                : "text-white bg-emerald-500 border-emerald-400"
            )}
          >
            {getTriggerText()}
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-slate-900 border border-slate-900 rounded-md shadow-lg">
              <ul {...getListProps()} className="overflow-auto max-h-60">
                {getItems().length === 0 ? (
                  <li className="px-4 py-2 text-slate-500">No fruits found</li>
                ) : (
                  getItems().map((fruit) => {
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
                        <span>{fruit.label}</span>
                        {isSelected && <Check className="text-green-500" />}
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
        <p className="text-sm text-slate-100">The dropdown is disabled</p>
      </div>
    </div>
  );
}
