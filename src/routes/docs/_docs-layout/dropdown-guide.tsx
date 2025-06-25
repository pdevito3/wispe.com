import { DocsMdxPage } from "@/components/mdx/docs-mdx-page";
import { createFileRoute } from "@tanstack/react-router";

// @ts-expect-error
import Markdown, { headings } from "./-dropdown-guide.mdx";

export const Route = createFileRoute("/docs/_docs-layout/dropdown-guide")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DocsMdxPage headings={headings}>
      <Markdown />
    </DocsMdxPage>
  );
}