import { fruits, type Fruit } from "@/datasets/fruit";
import { Check, XIcon } from "@/svgs";
import { cn } from "@/utils";
import { useAutoComplete, type Tab } from "@wispe/wispe-react";
import React, { useMemo } from "react";

export function TabsExample() {
  const tabs = useMemo<Tab<Fruit>[]>(
    () => [
      { key: "all", label: "All" },
      {
        key: "berries",
        label: "Berries",
        filter: (f: Fruit) => f.type === "berry",
      },
      {
        key: "melons",
        label: "Melons",
        filter: (f: Fruit) => f.type === "melon",
      },
    ],
    []
  );

  const {
    getRootProps,
    getLabelProps,
    getInputProps,
    getListProps,
    getItemProps,
    getItemState,
    getItems,
    getClearProps,
    hasSelectedItem,
    isOpen,
    getSelectedItem,
    getTabListProps,
    getTabProps,
    getTabState,
  } = useAutoComplete({
    items: fruits,
    onFilterAsync: async ({ searchTerm }) =>
      fruits.filter((f) =>
        f.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    itemToString: (f) => f.label,
    tabs,
    defaultTabKey: "all",
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
              {/* Tabs */}
              <div
                {...getTabListProps()}
                className="relative flex p-3 space-x-2 overflow-auto bg-slate-900"
              >
                {tabs.map((tab, i) => {
                  const { isSelected, itemCount } = getTabState(tab);
                  return (
                    <div key={tab.key} className="relative z-10">
                      <button
                        {...getTabProps(tab, i)}
                        className={cn(
                          "pl-3 pr-2 py-1 text-sm font-medium rounded-full focus:outline-none relative z-10 flex items-center space-x-2",
                          isSelected
                            ? "text-slate-100 bg-slate-700 rounded-full focus:bg-emerald-500"
                            : "text-slate-100 hover:text-slate-200 hover:bg-slate-500 focus:bg-emerald-500"
                        )}
                      >
                        <p>{tab.label}</p>
                        {itemCount > 0 && (
                          <span className="bg-emerald-500 focus:bg-blue-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                            {itemCount}
                          </span>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Options */}
              <ul {...getListProps()} className="overflow-auto max-h-60">
                {getItems().length === 0 ? (
                  <li className="px-4 py-2 text-slate-500">No fruits found</li>
                ) : (
                  getItems().map((fruit) => {
                    const { isActive, isSelected, isDisabled } =
                      getItemState(fruit);

                    return (
                      <li
                        key={(fruit as Fruit).value}
                        {...getItemProps(fruit)}
                        className={cn(
                          "px-4 py-2 flex items-center justify-between",
                          !isDisabled && "hover:bg-slate-700",
                          isActive && "bg-slate-700",
                          isDisabled && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <span>{(fruit as Fruit).label}</span>
                        {isSelected && <Check className="text-green-500" />}
                      </li>
                    );
                  })
                )}
              </ul>
              <KeyboardNavFooter />
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

const KeyboardNavFooter = () => {
  return (
    <div className="flex items-center justify-start gap-4 p-2 border-t">
      <div className="flex items-center justify-start flex-1 space-x-3">
        <ShortcutGroup
          icons={[
            <svg
              key={"up"}
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 12 7-7 7 7" />
              <path d="M12 19V5" />
            </svg>,
            <svg
              key={"down"}
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>,
          ]}
          label="to navigate"
        />

        <ShortcutGroup
          icons={[
            <svg
              key={"left"}
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>,
            <svg
              key={"right"}
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>,
          ]}
          label="to switch tabs"
        />
      </div>

      <ShortcutGroup
        icons={[
          <svg
            key={"enter"}
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 10 4 15 9 20" />
            <path d="M20 4v7a4 4 0 0 1-4 4H4" />
          </svg>,
        ]}
        label="to select"
      />
    </div>
  );
};

const ShortcutGroup = ({
  icons,
  label,
}: {
  icons: React.ReactNode[];
  label: string;
}) => {
  return (
    <div className="flex items-center gap-[2px]">
      {icons.map((icon, index) => (
        <React.Fragment key={index}>
          <kbd className="flex items-center justify-center w-4 h-4 p-0.5 bg-slate-200 rounded-md text-slate-800 border border-slate-400 shadow-sm">
            {icon}
          </kbd>
        </React.Fragment>
      ))}
      <span className="ml-1 text-[0.55rem] font-medium">{label}</span>
    </div>
  );
};
