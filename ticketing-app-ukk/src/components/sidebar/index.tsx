"use client"

import * as React from "react"
import {
  CalendarClock,
  Map,
  Ticket,
  LayoutDashboard,
  Pocket,
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
const data = {
  user: {
    name: "Bilbis",
    email: "bilbis@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },

  teams: [
    {
      name: "Travel Link",
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
          title: "Airplane",
          items: [
            {
              title: "List of Airlines",
              url: "/admin/ticket/airplane/list-airlines",
            },
            {
              title: "Flight Schedule",
              url: "/admin/ticket/airplane/schedule",
            },
            {
              title: "Class & Ticket Price",
              url: "/admin/ticket/airplane/class-price",
            },
          ]
        },
        {
          title: "Train",
          items: [
            {
              title: "Train List",
              url: "#",
            },
            {
              title: "Train Schedule",
              url: "#",
            },
            {
              title: "Class & Ticket Price",
              url: "#"
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
    {
      title: "Payment",
      url: "#",
      icon: Pocket,
      items: [
        {
          title: "Payment Confirmation",
          url: "#",
        },
        {
          title: "Refund",
          url: "#",
        },
      ],
    },
  ],
  Data: [
    {
      name: "Travel",
      url: "#",
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
          {/* <SidebarProjects projects={data.Data} /> */}
        </SidebarContent>
        <SidebarFooter>
          <SidebarUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </div>
  )
}
