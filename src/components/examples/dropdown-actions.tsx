import { fruits, type Fruit } from "@/datasets/fruit";
import { Check } from "@/svgs";
import { cn } from "@/utils";
import { useDropdown } from "@wispe/wispe-react";

export function DropdownActionsExample() {
  const {
    getRootProps,
    getLabelProps,
    getTriggerProps,
    getListProps,
    getItemProps,
    getItemState,
    getItems,
    isOpen,
    getSelectedItem,
    getTriggerText,
    clear,
    setIsOpen,
  } = useDropdown<Fruit>({
    items: fruits.slice(0, 8),
    itemToString: (f) => f.label,
    placeholder: "Select a fruit...",
    actions: [
      {
        label: "🔄 Refresh list",
        placement: "top",
        onAction: () => {
          console.log("Refreshing fruit list...");
          alert("Fruit list refreshed!");
        },
      },
      {
        label: "➕ Add new fruit...",
        placement: "bottom",
        onAction: () => {
          console.log("Opening modal to add a new fruit");
          alert("Would open 'Add Fruit' modal");
          setIsOpen(false);
        },
      },
      {
        label: "❌ Clear selection",
        placement: "bottom",
        onAction: () => {
          clear();
          setIsOpen(false);
        },
      },
    ],
  });

  return (
    <div className="w-full">
      <div className="relative">
        <label {...getLabelProps()}>Dropdown with Actions</label>
        <div {...getRootProps()} className="relative">
          <button
            {...getTriggerProps()}
            className="flex items-center justify-between w-auto px-3 py-2 font-medium text-left text-white bg-emerald-500 border border-emerald-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {getTriggerText()}
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-slate-900 border border-slate-900 rounded-md shadow-lg">
              <ul {...getListProps()} className="overflow-auto max-h-80">
                {getItems().length === 0 ? (
                  <li className="px-4 py-2 text-slate-500">No fruits found</li>
                ) : (
                  getItems().map((item) => {
                    // Handle action items
                    if ((item as any).__isAction) {
                      const action = item as any;
                      return (
                        <li
                          key={`action-${action.label}`}
                          {...getItemProps(item)}
                          className="px-4 py-2 cursor-pointer bg-slate-800 hover:bg-slate-700 border-t border-slate-700 first:border-t-0 text-green-400 font-medium"
                        >
                          {action.label}
                        </li>
                      );
                    }

                    // Handle regular fruit items
                    const fruit = item as Fruit;
                    const itemState = getItemState(fruit);
                    return (
                      <li
                        key={fruit.value}
                        {...getItemProps(fruit)}
                        className={cn(
                          "px-4 py-2 flex items-center justify-between",
                          !itemState.isDisabled && "hover:bg-slate-700",
                          itemState.isActive && "bg-slate-700",
                          itemState.isDisabled && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          {fruit.label}
                          <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                            {fruit.type}
                          </span>
                        </div>
                        {itemState.isSelected && (
                          <Check className="text-green-500" />
                        )}
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
              Type: {getSelectedItem()?.type}
            </p>
            <p className="text-sm text-slate-100">
              Color: {getSelectedItem()?.color}
            </p>
          </div>
        ) : (
          <p className="mt-2 text-sm text-slate-100">No fruit selected</p>
        )}
      </div>
    </div>
  );
}