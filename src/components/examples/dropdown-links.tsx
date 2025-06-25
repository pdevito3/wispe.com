import { Link } from "@tanstack/react-router";
import { cn } from "@/utils";
import { useDropdown } from "@wispe/wispe-react";

interface LinkItem {
  id: number;
  name: string;
  url: string;
  target: "internal" | "external" | "download" | "ping";
}

const links: LinkItem[] = [
  { id: 1, name: "Introduction Page", url: "/docs", target: "internal" },
  { id: 2, name: "Autocomplete Guide", url: "/docs/autocomplete-guide", target: "internal" },
  { id: 3, name: "GitHub", url: "https://github.com", target: "external" },
  { id: 4, name: "React Docs", url: "https://react.dev", target: "external" },
  {
    id: 5,
    name: "Download Sample PDF",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    target: "download",
  },
  {
    id: 6,
    name: "Ping Example",
    url: "https://example.com/ping-endpoint",
    target: "ping",
  },
];

export function DropdownLinksExample() {
  const {
    getRootProps,
    getLabelProps,
    getTriggerProps,
    getListProps,
    getItemLinkProps,
    getItemState,
    getItems,
    isOpen,
    getTriggerText,
  } = useDropdown<LinkItem>({
    items: links,
    itemToString: (item) => item.name,
    placeholder: "Choose a link...",
    getItemLink: (item) => {
      switch (item.target) {
        case "internal":
          return { to: item.url };
        case "external":
          return { href: item.url, target: "_blank", rel: "noopener noreferrer" };
        case "download":
          return { href: item.url, download: true };
        case "ping":
          return { href: item.url, ping: item.url };
        default:
          return { href: item.url };
      }
    },
  });

  const getTargetIcon = (target: LinkItem["target"]) => {
    switch (target) {
      case "external":
        return "🔗";
      case "download":
        return "⬇️";
      case "ping":
        return "📡";
      default:
        return "📄";
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        <label {...getLabelProps()}>Link Dropdown</label>
        <div {...getRootProps()} className="relative">
          <button
            {...getTriggerProps()}
            className="flex items-center justify-between w-auto px-3 py-2 font-medium text-left text-white bg-emerald-500 border border-emerald-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {getTriggerText()}
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-slate-900 border border-slate-900 rounded-md shadow-lg">
              <ul {...getListProps()} className="overflow-auto max-h-60">
                {getItems().length === 0 ? (
                  <li className="px-4 py-2 text-slate-500">No results found</li>
                ) : (
                  getItems().map((link) => {
                    if (link.target === "internal") {
                      return (
                        <Link
                          {...getItemLinkProps(link)}
                          key={link.id || link.url}
                          to={link.url}
                          className={cn(
                            "flex items-center justify-between w-full",
                            "px-4 py-2 hover:bg-slate-700 text-slate-100 hover:text-green-400",
                            getItemState(link).isActive && "bg-slate-700"
                          )}
                        >
                          <span>{link.name}</span>
                          <span className="text-lg">{getTargetIcon(link.target)}</span>
                        </Link>
                      );
                    } else if (link.target === "download") {
                      return (
                        <a
                          {...getItemLinkProps(link)}
                          key={link.id || link.url}
                          className={cn(
                            "flex items-center justify-between w-full",
                            "px-4 py-2 hover:bg-slate-700 text-slate-100 hover:text-green-400",
                            getItemState(link).isActive && "bg-slate-700"
                          )}
                          download
                        >
                          <span>{link.name}</span>
                          <span className="text-lg">{getTargetIcon(link.target)}</span>
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
                            "px-4 py-2 hover:bg-slate-700 text-slate-100 hover:text-green-400",
                            getItemState(link).isActive && "bg-slate-700"
                          )}
                        >
                          <span>{link.name}</span>
                          <span className="text-lg">{getTargetIcon(link.target)}</span>
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
      
      <div className="p-4 mt-4 rounded-md bg-slate-600">
        <p className="text-sm text-slate-100">
          <strong>Note:</strong> Click on any option to navigate to that link. Icons indicate link types:
        </p>
        <ul className="mt-2 text-xs text-slate-300 space-y-1">
          <li>📄 Internal page navigation</li>
          <li>🔗 External link (opens in new tab)</li>
          <li>⬇️ Download link</li>
          <li>📡 Ping link</li>
        </ul>
      </div>
    </div>
  );
}