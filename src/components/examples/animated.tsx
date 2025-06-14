import { fruits, type Fruit } from "@/datasets/fruit";
import { Check, XIcon } from "@/svgs";
import { cn } from "@/utils";
import { useAutoComplete } from "@wispe/wispe-react";
import { AnimatePresence, motion } from "framer-motion";

export function AnimatedExample() {
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
  } = useAutoComplete({
    items: fruits,
    onFilterAsync: async ({ searchTerm }) =>
      fruits.filter((f) =>
        f.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    itemToString: (f) => f.label,
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
          <AnimatePresence>
            {hasSelectedItem() && (
              <button
                type="button"
                {...getClearProps()}
                className="absolute text-slate-200 -translate-y-1/2 bg-transparent right-3 top-1/2 hover:text-slate-400 focus:outline-emerald-600"
              >
                <XIcon />
              </button>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="absolute z-10 w-full mt-1 bg-slate-900 border border-slate-900 rounded-md shadow-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.1 }}
              >
                <ul {...getListProps()} className="overflow-auto max-h-60">
                  {getItems().length === 0 ? (
                    <li className="px-4 py-2 text-slate-500">
                      No fruits found
                    </li>
                  ) : (
                    getItems().map((fruit, index) => {
                      const { isActive, isSelected, isDisabled } =
                        getItemState(fruit);

                      return (
                        // @ts-expect-error motion
                        <motion.li
                          key={(fruit as Fruit).value}
                          {...getItemProps(fruit)}
                          className={cn(
                            "px-4 py-2 flex items-center justify-between",
                            !isDisabled && "hover:bg-slate-700",
                            isActive && "bg-slate-700",
                            isDisabled && "opacity-50 cursor-not-allowed"
                          )}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.02, duration: 0.1 }}
                        >
                          <span>{(fruit as Fruit).label}</span>
                          <AnimatePresence>
                            {isSelected && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Check className="text-green-500" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.li>
                      );
                    })
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
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
