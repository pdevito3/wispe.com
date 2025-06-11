import { cn } from "@/utils";
import { Check, Copy } from "lucide-react";
import { themes } from "prism-react-renderer";
import { useState } from "react";
import { CodeBlock as CodeBlockPrimitive } from "react-code-block";

export function CodeBlock({
  children,
  classNames,
  language = "tsx",
  showLineNumbers = true,
}: {
  children: string;
  classNames?: {
    wrapper?: string;
    code?: string;
  };
  language?: string;
  showLineNumbers?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const code = normalizeCodeChildren(children);

  const handleCopy = async () => {
    try {
      var trimmedChildren = code.trim();
      await navigator.clipboard.writeText(trimmedChildren);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div
      className={cn("relative", classNames?.wrapper)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CodeBlockPrimitive
        code={code}
        language={language}
        theme={themes.dracula}
      >
        <CodeBlockPrimitive.Code
          className={cn(
            "bg-slate-900 px-6 py-4 rounded-xl shadow-lg overflow-auto",
            classNames?.code
          )}
        >
          <div className="table-row">
            {showLineNumbers && (
              <CodeBlockPrimitive.LineNumber className="table-cell pr-4 text-sm text-slate-500 text-right select-none" />
            )}
            <CodeBlockPrimitive.LineContent className="table-cell whitespace-pre font-mono">
              <CodeBlockPrimitive.Token />
            </CodeBlockPrimitive.LineContent>
          </div>
        </CodeBlockPrimitive.Code>
      </CodeBlockPrimitive>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className={cn(
          "absolute top-3 right-3 p-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all duration-200 border border-slate-600",
          isHovered ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}

export function TabbedCodeBlock({
  tabs,
  defaultTab = 0,
}: {
  tabs: Array<{
    label: string;
    language: string;
    code: string;
  }>;
  defaultTab?: number;
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="relative">
      {/* Tab Headers */}
      <div className="flex border-b border-slate-700 bg-slate-800 rounded-t-xl">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors relative",
              activeTab === index
                ? "text-white bg-slate-900"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700"
            )}
          >
            {tab.label}
            {activeTab === index && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="relative">
        <CodeBlock
          language={tabs[activeTab].language}
          showLineNumbers={false}
          classNames={{
            code: "rounded-t-none",
          }}
        >
          {tabs[activeTab].code}
        </CodeBlock>
      </div>
    </div>
  );
}

export function InstallTabs() {
  const installTabs = [
    { label: "npm", language: "bash", code: "npm install @wispe/autocomplete" },
    { label: "yarn", language: "bash", code: "yarn add @wispe/autocomplete" },
    { label: "pnpm", language: "bash", code: "pnpm add @wispe/autocomplete" },
    { label: "bun", language: "bash", code: "bun add @wispe/autocomplete" },
  ];

  return <TabbedCodeBlock tabs={installTabs} />;
}

function normalizeCodeChildren(children: unknown): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.join("");
  if (children && typeof children === "object" && "props" in children) {
    // Try to dig through React elements (edge case)
    // @ts-ignore
    return normalizeCodeChildren(children.props.children);
  }
  return "";
}

interface CodePreviewTabsProps {
  /**
   * The raw source string (e.g. imported via `?raw`).
   * Pass this exact string to <CodeBlock> when “Code” is active.
   */
  code: string;

  /**
   * A React node (e.g. `<ExampleComponent />`) to render when “Preview” is active.
   */
  preview: React.ReactNode;

  /**
   * Syntax for <CodeBlock>. Default is “tsx”.
   */
  language?: string;
}

export function CodePreviewTabs({
  code,
  preview,
  language = "tsx",
}: CodePreviewTabsProps) {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);

  return (
    <div className="border border-slate-700 rounded-xl overflow-hidden not-prose">
      {/* ───── Tab Headers ───── */}
      <div className="flex bg-slate-900 text-sm font-medium">
        {/* “Preview” tab */}
        <button
          onClick={() => setActiveTab(0)}
          className={cn(
            "px-4 py-2 transition-colors relative",
            activeTab === 0
              ? "text-white bg-slate-900"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-700"
          )}
        >
          Preview
          {activeTab === 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
          )}
        </button>

        {/* “Code” tab */}
        <button
          onClick={() => setActiveTab(1)}
          className={cn(
            "px-4 py-2 transition-colors relative",
            activeTab === 1
              ? "text-white bg-slate-900"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-700"
          )}
        >
          Code
          {activeTab === 1 && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
          )}
        </button>
      </div>

      {/* ───── Tab Content ───── */}
      <div className="bg-slate-900 max-h-[40rem] [color-scheme:dark] overflow-auto">
        {activeTab === 0 ? (
          // PREVIEW TAB: render the React node inside a little padded container
          <div className="p-4 bg-slate-800 rounded-b-xl h-96 overflow-auto">
            <div className="max-w-md">{preview}</div>
          </div>
        ) : (
          // CODE TAB: feed the raw source into your existing <CodeBlock>
          <CodeBlock language={language} showLineNumbers>
            {code}
          </CodeBlock>
        )}
      </div>
    </div>
  );
}
