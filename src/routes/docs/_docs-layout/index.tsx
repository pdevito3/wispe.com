import { DocsMdxPage } from "@/components/mdx/docs-mdx-page";
import { createFileRoute } from "@tanstack/react-router";
// import { headTextBuilder } from "@/utils";
import Markdown, { headings } from "./-index.mdx";

export const Route = createFileRoute("/docs/_docs-layout/")({
  component: RouteComponent,
  meta: () => [
    // { title: headTextBuilder({ pageHead: "Docs" }) },
    // {
    //   name: "description",
    //   content: "Documentation for Peak LIMS",
    // },
  ],
});

function RouteComponent() {
  return (
    <DocsMdxPage headings={headings}>
      <Markdown />
    </DocsMdxPage>
  );
}
