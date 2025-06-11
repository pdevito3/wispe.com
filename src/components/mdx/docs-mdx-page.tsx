import { TableOfContents } from "@/components/mdx/table-of-contents";
export function DocsMdxPage({
  children,
  headings,
}: {
  children: React.ReactNode;
  headings: { id: string; text: string; depth: number }[];
}) {
  return (
    <div className="flex w-full">
      <div className="flex-1 px-4">
        <div className="prose max-w-5xl">{children}</div>
      </div>
      <aside className="min-w-64 pl-8 hidden lg:block">
        <TableOfContents headings={headings} />
      </aside>
    </div>
  );
}
