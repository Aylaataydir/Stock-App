"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/shared/sidebar/nav-main"
import { NavUser } from "@/components/shared/sidebar/nav-user"
import { TeamSwitcher } from "@/components/shared/sidebar/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  BadgeDollarSign,
  Warehouse,
  CircleStar,
  ShoppingCart,
  Boxes,
  ChartNetwork,
} from "lucide-react";




const data = {

  navMain: [
    {
      title: "Analytics",
      url: "/stock",
      icon: ChartNetwork,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/stock",
        },
        {
          title: "Reports",
          url: "/stock/reports",
        },
      ],
    },
    {
      title: "Purchases",
      url: "purchases",
      icon: ShoppingCart,
    },
    {
      title: "Sales",
      url: "sales",
      icon: BadgeDollarSign,
    },
    {
      title: "Firms",
      url: "firms",
      icon: Warehouse,
    },
    {
      title: "Brands",
      url: "brands",
      icon: CircleStar,
    },
    {
      title: "Products",
      url: "products",
      icon: Boxes,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher  />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
