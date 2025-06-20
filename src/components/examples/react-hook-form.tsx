import { fruits, type Fruit } from "@/datasets/fruit";
import { Check, XIcon } from "@/svgs";
import { cn } from "@/utils";
import { useAutoComplete } from "@wispe/wispe-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface AutocompleteProps<T> {
  value?: T;
  onChange: (value: T | undefined) => void;
  items: T[];
  label: string;
  itemToString: (item: T) => string;
  onClearAsync?: (params: { signal: AbortSignal }) => Promise<void>;
}

export function ControllableAutocomplete<T>({
  value,
  onChange,
  items,
  label,
  itemToString,
  onClearAsync,
}: AutocompleteProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    getRootProps,
    getLabelProps,
    getInputProps,
    getListProps,
    getItemProps,
    getItemState,
    getClearProps,
    hasSelectedItem,
    getItems,
  } = useAutoComplete<T>({
    items,
    state: {
      selectedValue: value,
      setSelectedValue: onChange,
      isOpen,
      setIsOpen,
    },
    asyncDebounceMs: 300,
    onFilterAsync: async ({ searchTerm }) =>
      items.filter((item) =>
        itemToString(item).toLowerCase().includes(searchTerm.toLowerCase())
      ),
    itemToString,
    onClearAsync,
  });

  return (
    <div className="w-full">
      <div className="relative">
        <label {...getLabelProps()}>{label}</label>
        <div {...getRootProps()} className="relative">
          <input
            {...getInputProps()}
            value={value ? itemToString(value) : ""}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ReactHookFormExample() {
  type FormValues = {
    fruit?: Fruit;
  };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { fruit: undefined },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Submitted:", data.fruit);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
      <Controller
        name="fruit"
        control={control}
        render={({ field }) => (
          <ControllableAutocomplete<Fruit>
            value={field.value}
            onChange={field.onChange}
            // RHF needs onChange to set to null not undefined
            onClearAsync={async () => {
              field.onChange(null);
            }}
            items={fruits}
            label="Fruit"
            itemToString={(f) => f.label}
          />
        )}
      />

      <div className="space-y-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-white bg-emerald-600 rounded-md hover:bg-emerald-700 disabled:opacity-50"
        >
          {isSubmitting ? "Saving…" : "Submit"}
        </button>
        <p className="text-xs text-slate-400 italic">Logs to console</p>
      </div>
    </form>
  );
}
