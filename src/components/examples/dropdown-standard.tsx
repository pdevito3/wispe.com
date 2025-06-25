import { fruits, type Fruit } from "@/datasets/fruit";
import { Check, XIcon } from "@/svgs";
import { cn } from "@/utils";
import { useDropdown } from "@wispe/wispe-react";

export function DropdownStandardExample() {
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
    items: fruits,
    itemToString: (item) => item.label,
    placeholder: "Select a fruit...",
  });

  return (
    <div className="w-full">
      <div className="relative">
        <label {...getLabelProps()}>Choose a fruit</label>
        <div {...getRootProps()} className="relative">
          <button
            {...getTriggerProps()}
            className="flex items-center justify-between w-auto px-3 py-2 font-medium text-left text-white bg-emerald-500 border border-emerald-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {getTriggerText()}
          </button>
          {hasSelectedItem() && (
            <button
              type="button"
              className="absolute text-slate-200 -translate-y-1/2 bg-transparent right-3 top-1/2 hover:text-slate-400 focus:outline-emerald-600"
              {...getClearProps()}
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
        <h3 className="text-sm font-medium text-slate-100">Selected Fruit:</h3>
        {getSelectedItem() ? (
          <div className="mt-2 space-y-1">
            <p className="text-sm text-slate-100">
              Name: {getSelectedItem()?.label}
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