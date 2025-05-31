import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "/docs",
      items: [
        {
          title: "Introduction",
          url: "/docs",
        },
        {
          title: "How It Works",
          url: "/docs/how-it-works",
        },
        {
          title: "Autocomplete Guide",
          url: "/docs/autocomplete-guide",
        },
      ],
    },
    {
      title: "Examples",
      url: "/docs/examples",
      items: [
        {
          title: "TODO",
          url: "/docs/todo",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>Wispe</SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      {/* <a href={item.url}>{item.title}</a> */}
                      <Link
                        to={item.url}
                        className="font-medium"
                        activeOptions={{ exact: true }}
                        activeProps={{
                          className: "text-emerald-500 hover:text-emerald-400",
                        }}
                      >
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
