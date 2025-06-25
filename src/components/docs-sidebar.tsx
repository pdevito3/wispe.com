import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";

const data = {
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
          title: "Autocomplete Guide",
          url: "/docs/autocomplete-guide",
        },
        {
          title: "Dropdown Guide",
          url: "/docs/dropdown-guide",
        },
      ],
    },
    // {
    //   title: "Examples",
    //   url: "/docs/examples",
    //   items: [
    //     {
    //       title: "TODO",
    //       url: "/docs/todo",
    //     },
    //   ],
    // },
  ],
};

export function DocsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src="/logo.svg" alt="Wispe Logo" className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Wispe</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="gap-2">
          {data.navMain.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarMenuItem key={item.title}>
                <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <Link
                            to={item.url}
                            className="font-medium"
                            activeOptions={{ exact: true }}
                            activeProps={{
                              className: "text-emerald-500",
                            }}
                          >
                            {item.title}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            </SidebarGroup>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
