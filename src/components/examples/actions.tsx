import { fruits, type Fruit } from "@/datasets/fruit";
import { Check, XIcon } from "@/svgs";
import { cn } from "@/utils";
import { useAutoComplete } from "@wispe/wispe-react";

export function Actions() {
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
    clear,
    setIsOpen,
  } = useAutoComplete<Fruit>({
    items: fruits,
    onFilterAsync: async ({ searchTerm }) =>
      fruits.filter((f) =>
        f.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    itemToString: (f) => f.label,
    actions: [
      {
        label: "Clear search",
        placement: "top",
        onAction: () => {
          clear();
          setIsOpen(true);
        },
      },
      {
        label: "Clear it better",
        placement: "top",
        onAction: () => {
          clear();
          setIsOpen(true);
        },
      },
      {
        label: "Add a special fruit…",
        placement: "bottom",
        onAction: () => {
          console.log("Opening modal to add a new fruit");
        },
      },
    ],
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
                  getItems().map((item, idx) => {
                    const { isActive, isSelected, isAction } =
                      getItemState(item);

                    if (isAction) {
                      return (
                        <li
                          key={`action-${idx}`}
                          {...getItemProps(item)}
                          className="px-4 py-2 text-emerald-200 cursor-pointer hover:bg-emerald-900"
                        >
                          {item.label}
                        </li>
                      );
                    }

                    // we know it's a fruit because we got actions above
                    const fruit = item as Fruit;

                    return (
                      <li
                        key={(fruit as Fruit).value}
                        {...getItemProps(fruit)}
                        className={cn(
                          "px-4 py-2 flex items-center justify-between hover:bg-slate-700",
                          isActive && "bg-slate-700"
                        )}
                      >
                        <span>{(fruit as Fruit).label}</span>
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
