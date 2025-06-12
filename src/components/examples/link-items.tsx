import { XIcon } from "@/svgs";
import { cn } from "@/utils";
import { Link } from "@tanstack/react-router";
import { useAutoComplete } from "@wispe/wispe-react";

interface LinkItem {
  id: number;
  name: string;
  url: string;
  target: "internal" | "external" | "download" | "ping";
}

const links: LinkItem[] = [
  { id: 1, name: "Party Time 🎉", url: "/party-time", target: "internal" },
  { id: 2, name: "Google", url: "https://www.google.com", target: "external" },
  { id: 3, name: "GitHub", url: "https://github.com", target: "external" },
  { id: 4, name: "BlueSky", url: "https://bsky.app", target: "external" },
  {
    id: 5,
    name: "Stack Overflow",
    url: "https://stackoverflow.com",
    target: "external",
  },
  {
    id: 6,
    name: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    target: "external",
  },
  {
    id: 7,
    name: "Download Report",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    target: "download",
  },
  {
    id: 8,
    name: "Ping Example",
    url: "https://example.com/ping-endpoint",
    target: "ping",
  },
];

export function LinkItemsExample() {
  const {
    getRootProps,
    getLabelProps,
    getInputProps,
    getListProps,
    getItemState,
    getItems,
    getItemLinkProps,
    getClearProps,
    hasSelectedItem,
    isOpen,
  } = useAutoComplete({
    items: links,
    getItemLink: (item) =>
      item.target === "internal"
        ? { to: item.url }
        : item.target === "download"
        ? { href: item.url, download: "" }
        : item.target === "ping"
        ? { href: item.url, ping: item.url }
        : item.url,
    onFilterAsync: async ({ searchTerm }) =>
      links.filter((link) =>
        link.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    itemToString: (link) => link.name,
  });

  return (
    <div className="w-full">
      <div className="relative">
        <label {...getLabelProps()}>Navigate</label>
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
                  getItems().map((link) => {
                    if (link.target === "internal") {
                      return (
                        <Link
                          {...getItemLinkProps(link)}
                          key={link.id || link.url}
                          to={link.url}
                          rel="noopener noreferrer"
                          target="_blank"
                          className={cn(
                            "flex items-center justify-between w-full",
                            "px-4 py-2 cursor-pointer hover:bg-slate-700",
                            getItemState(link).isActive && "bg-slate-700"
                          )}
                        >
                          <span>{link.name}</span>
                          <span className="text-slate-500 italic text-xs">
                            {link.target}
                          </span>
                        </Link>
                      );
                    } else if (link.target === "download") {
                      return (
                        <a
                          {...getItemLinkProps(link)}
                          key={link.id || link.url}
                          className={cn(
                            "flex items-center justify-between w-full",
                            "px-4 py-2 cursor-pointer hover:bg-slate-700",
                            getItemState(link).isActive && "bg-slate-700"
                          )}
                          download
                        >
                          <span>{link.name}</span>
                          <span className="text-slate-500 italic text-xs">
                            {link.target}
                          </span>
                        </a>
                      );
                    } else {
                      return (
                        <a
                          {...getItemLinkProps(link)}
                          key={link.id || link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "flex items-center justify-between w-full",
                            "px-4 py-2 cursor-pointer hover:bg-slate-700",
                            getItemState(link).isActive && "bg-slate-700"
                          )}
                        >
                          <span>{link.name}</span>
                          <span className="text-slate-500 italic text-xs">
                            {link.target}
                          </span>
                        </a>
                      );
                    }
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
