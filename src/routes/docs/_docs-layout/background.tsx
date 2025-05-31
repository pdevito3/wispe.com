import { DocsMdxPage } from "@/components/mdx/docs-mdx-page";
import { createFileRoute } from "@tanstack/react-router";
import Markdown, { headings } from "./-background.mdx";

export const Route = createFileRoute("/docs/_docs-layout/background")({
  component: RouteComponent,
  meta: () => [
    // { title: "Sustainable Use License" },
    // {
    //   name: "description",
    //   content: "Documentation for the Peak LIMS Sustainable Use License",
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
