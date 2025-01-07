"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Map,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { SidebarMain } from "./sidebar-main"
import { SidebarProjects } from "./sidebar-projects"
import { SidebarUser } from "./sidebar-user"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
// import { url } from "inspector"
// import { title } from "process"

// This is sample data.
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
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Sales Statistics ",
          url: "#",
        },
        {
          title: "Order Chart",
          url: "#",
        },
        {
          title: "Schedule Information",
          url: "#",
        },
      ],
    },
    {
      title: "Ticket",
      url: "#",
      icon: Bot,
      subItems: [
        {
          title: "Airplane",
          items: [
            {
              title: "List of Airlines",
              url: "#",
            },
            {
              title: "Flight Schedule",
              url: "#",
            },
            {
              title: "Class & Ticket Price",
              url: "#",
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
      icon: BookOpen,
      items: [
        {
          title: "Order List",
          url: "#",
        },
        {
          title: "Order History",
          url: "#",
        },
      ],
    },
    {
      title: "Payment",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Payment Confirmation",
          url: "#",
        },
        {
          title: "Refund",
          url: "#",
        },
        {
          title: "Financial Summary",
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
    <div className="z-20">
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMain items={data.navMain} />
          <SidebarProjects projects={data.Data} />
        </SidebarContent>
        <SidebarFooter>
          <SidebarUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </div>
  )
}
