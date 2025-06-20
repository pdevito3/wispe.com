import { DocsMdxPage } from "@/components/mdx/docs-mdx-page";
import { createFileRoute } from "@tanstack/react-router";
// import { headTextBuilder } from "@/utils";

// @ts-expect-error
import Markdown, { headings } from "./-autocomplete-guide.mdx";

export const Route = createFileRoute("/docs/_docs-layout/autocomplete-guide")({
  component: RouteComponent,
  // meta: () => [
  //   // { title: headTextBuilder({ pageHead: "Docs" }) },
  //   // {
  //   //   name: "description",
  //   //   content: "Documentation for Peak LIMS",
  //   // },
  // ],
});

function RouteComponent() {
  return (
    <DocsMdxPage headings={headings}>
      <Markdown />
    </DocsMdxPage>
  );
}
