import { CodeBlock } from "@/components/code-block";
import { DocsSidebar } from "@/components/docs-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { MDXProvider } from "@mdx-js/react";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/_docs-layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <DocsSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="px-4 py-10 max-w-5xl">
          <MDXProvider
            components={{
              pre: (props) => <CodeBlock {...props} />,
            }}
          >
            <Outlet />
          </MDXProvider>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
