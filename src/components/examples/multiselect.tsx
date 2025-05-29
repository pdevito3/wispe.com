import { fruits, type Fruit } from "@/datasets/fruit";
import { Check, XIcon } from "@/svgs";
import { cn } from "@/utils";
import { useAutoComplete } from "@wispe/wispe-react";

export function MultiselectExample() {
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
  } = useAutoComplete<Fruit>({
    items: fruits,
    onFilterAsync: async ({ searchTerm }) =>
      fruits.filter((f) =>
        f.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    itemToString: (f) => f.label,
    mode: "multiple",
  });

  const selected =
    (getSelectedItem() as (typeof fruits)[0][] | undefined) ?? [];
  const countPlaceholder = `${selected.length} fruit selected`;

  return (
    <div className="w-full">
      <div {...getRootProps()} className="relative">
        <label {...getLabelProps()}>Search fruits</label>

        {/* Combined container for pills + input */}
        <div className="w-full flex flex-wrap items-center gap-1 px-3 py-2 border rounded-md border-slate-300 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500">
          {/* Pills */}
          {selected.length > 0 &&
            selected.length <= 2 &&
            selected.map((fruit) => (
              <span
                key={fruit.value}
                className="flex items-center px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm"
              >
                {fruit.label}
              </span>
            ))}

          {/* The input lives alongside the pills */}
          <input
            {...getInputProps()}
            placeholder={
              selected.length > 2
                ? countPlaceholder
                : "Type to filter fruits..."
            }
            className={cn(
              "flex-1 min-w-0 bg-transparent p-0 border-none focus:outline-none",
              selected.length > 0 && "pl-1"
            )}
          />

          {/* Clear button */}
          {hasSelectedItem() && (
            <button
              type="button"
              {...getClearProps()}
              className="ml-2 text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              <XIcon />
            </button>
          )}
        </div>

        {/* Dropdown */}
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
                      {isSelected && <Check className="text-emerald-500" />}
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        )}
      </div>

      <div className="p-4 mt-4 rounded-md bg-slate-600">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-slate-100">
            Selected Fruits:
          </h3>
          {selected.length ? (
            <ul className="mt-2 flex flex-wrap gap-2">
              {selected.map((fruit) => (
                <li
                  key={fruit.value}
                  className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {fruit.label}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-slate-100">No fruit selected</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ... rest of file unchanged
