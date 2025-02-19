"use client"

import * as React from "react"
import {
  CalendarClock,
  Map,
  Ticket,
  LayoutDashboard,
  User,
} from "lucide-react"

import { SidebarMain } from "./sidebar-main"
import { SidebarUser } from "./sidebar-user"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SidebarSettings } from "./sidebar-setting"
const data = {
  user: {
    name: "Bilbis",
    email: "bilbis@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },

  teams: [
    {
      name: "TravelLink",
      logo: "/travel-ticket-logo.svg",
      plan: "Travel",
    },
  ],
  navMain: [
    {
      title: "Dasboards",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Ticket",
      url: "#",
      icon: Ticket,
      subItems: [
        {
          title: "Transport",
          items: [
            {
              title: "List of Airlines",
              url: "/admin/ticket/transport/list-airlines",
            },
            {
              title: "Route List",
              url: "/admin/ticket/transport/route-list",
            },
            {
              title: "Schedule",
              url: "/admin/ticket/transport/schedule",
            },
          ]
        },
      ],
    },
    {
      title: "Booking",
      url: "#",
      icon: CalendarClock,
      items: [
        {
          title: "Order List",
          url: "/admin/booking/order-list",
        },
        {
          title: "Order History",
          url: "/admin/booking/order-history",
        },
      ],
    },
  ],
  Data: [
    {
      name: "User Management",
      url: "/admin/setting/user",
      icon: User,
    },
    {
      name: "Create Staff",
      url: "/admin/setting/create-staff",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <div>
      <Sidebar collapsible="icon" className="px-1" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMain items={data.navMain} />
          <SidebarSettings settings={data.Data} />
        </SidebarContent>
        <SidebarFooter>
          <SidebarUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </div>
  )
}
