import { useDropdown, type Tab } from "@wispe/wispe-react";
import { useMemo } from "react";
import { fruits, type Fruit } from "@/datasets/fruit";
import { Check } from "@/svgs";
import { cn } from "@/utils";

export function DropdownTabsExample() {
  const tabs = useMemo<Tab<Fruit>[]>(
    () => [
      { key: "all", label: "All" },
      {
        key: "berries",
        label: "Berries",
        filter: (f: Fruit) => f.type === "berry",
      },
      {
        key: "citrus",
        label: "Citrus",
        filter: (f: Fruit) => f.type === "citrus",
      },
      {
        key: "tropical",
        label: "Tropical",
        filter: (f: Fruit) => f.type === "tropical",
      },
    ],
    []
  );

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
    getTabListProps,
    getTabProps,
    getTabState,
  } = useDropdown<Fruit>({
    items: fruits,
    itemToString: (f) => f.label,
    placeholder: "Select a fruit...",
    tabs,
    defaultTabKey: "all",
  });

  return (
    <div className="w-full">
      <div className="relative">
        <label {...getLabelProps()}>Dropdown with Tabs</label>
        <div {...getRootProps()} className="relative">
          <button
            {...getTriggerProps()}
            className="flex items-center justify-between w-auto px-3 py-2 font-medium text-left text-white bg-emerald-500 border border-emerald-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {getTriggerText()}
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-slate-900 border border-slate-900 rounded-md shadow-lg">
              {/* Tab List */}
              <div
                {...getTabListProps()}
                className="flex overflow-x-auto border-b border-slate-700 bg-slate-800 rounded-t-md"
              >
                {tabs.map((tab, index) => {
                  const tabState = getTabState(tab);
                  return (
                    <button
                      key={tab.key}
                      {...getTabProps(tab, index)}
                      className={cn(
                        "px-3 py-2 text-sm font-medium border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset",
                        tabState.isSelected
                          ? "border-green-500 text-green-400 bg-slate-900"
                          : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600"
                      )}
                    >
                      {tab.label}
                      {tabState.itemCount > 0 && (
                        <span className="ml-1 text-xs bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded-full">
                          {tabState.itemCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Items List */}
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
                          "px-4 py-2",
                          !isDisabled && "hover:bg-slate-700",
                          isActive && "bg-slate-700",
                          isDisabled && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {fruit.label}
                            <span className="px-2 py-1 text-xs text-slate-300 bg-slate-700 rounded">
                              {fruit.type}
                            </span>
                          </div>
                          {isSelected && (
                            <Check className="text-green-500" />
                          )}
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