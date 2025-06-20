import { Check, XIcon } from "@/svgs";
import { cn } from "@/utils";
import { useAutoComplete } from "@wispe/wispe-react";
import { useMemo } from "react";

export function CustomEntryExample() {
  const languages = useMemo(
    () => ["JavaScript", "TypeScript", "Python", "Ruby"],
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
    isCustomItem,
    isOpen,
    getSelectedItem,
  } = useAutoComplete({
    items: languages,
    allowsCustomItems: true,
    onFilterAsync: async ({ searchTerm }) =>
      languages.filter((lang) =>
        lang.toLowerCase().includes(searchTerm.toLowerCase())
      ),
  });

  return (
    <div className="w-full">
      <div className="relative">
        <label {...getLabelProps()} className="block mb-1">
          Choose or add a language
        </label>
        <div {...getRootProps()} className="relative">
          <input
            {...getInputProps()}
            placeholder="Type to filter languages…"
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
                {getItems().map((lang) => {
                  const { isActive, isSelected, isDisabled } =
                    getItemState(lang);

                  return (
                    <li
                      key={lang}
                      {...getItemProps(lang)}
                      className={cn(
                        "px-4 py-2 flex items-center justify-between",
                        !isDisabled && "hover:bg-slate-700",
                        isActive && "bg-slate-700",
                        isDisabled && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        {isCustomItem(lang) && !isSelected
                          ? `Add "${lang}"`
                          : lang}
                        <div className="pl-2">{isSelected && <Check />}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 mt-4 rounded-md bg-slate-600">
        <h3 className="text-sm font-medium text-slate-100">Selected:</h3>
        {getSelectedItem() ? (
          <p className="mt-2 text-sm text-slate-100">
            {getSelectedItem() as string}
          </p>
        ) : (
          <p className="mt-2 text-sm text-slate-100">No language selected</p>
        )}
      </div>
    </div>
  );
}
