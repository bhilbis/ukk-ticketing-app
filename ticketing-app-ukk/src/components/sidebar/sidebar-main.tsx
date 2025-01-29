"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"

export function SidebarMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title?: string
      url: string
    }[]
    subItems?: {
        title?: string
        items: {
            title?: string;
            url: string;
        }[] 
    }[]
  }[]
}) {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  useEffect(() => {
    const active = items.find(item => item.isActive)
    if (active) {
      setActiveItem(active.title)
    }
  }, [items])

  const handleItemClick = (title: string) => {
    setActiveItem(title)
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`${
                    activeItem === item.title ? "bg-blue-navy text-white" : ""
                  } hover:bg-blue-navy hover:text-white`}
                  onClick={() => handleItemClick(item.title)}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  {(item.items || item.subItems) && (
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {(item.items || item.subItems) && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          className={`${
                            activeItem === subItem.title ? "bg-blue-navy text-white" : ""
                          } hover:bg-blue-navy hover:text-white`}
                          onClick={() => subItem.title && handleItemClick(subItem.title)}
                        >
                          <a href={subItem.url}>
                            <span className="text-xs">{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}

                    {item.subItems?.map((nestedItem) => (
                      <Collapsible
                        key={nestedItem.title}
                        asChild
                        defaultOpen={false}
                        className="group/collapsible"
                      >
                        <SidebarMenuSubItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuSubButton
                              title={nestedItem.title}
                              className={`${
                                activeItem === nestedItem.title ? "bg-blue-navy text-white" : ""
                              } hover:bg-blue-navy hover:text-white`}
                              onClick={() => nestedItem.title && handleItemClick(nestedItem.title)}
                            >
                              <span className="text-xs">{nestedItem.title}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuSubButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {nestedItem.items.map((nestedSubItem) => (
                                <SidebarMenuSubItem key={nestedSubItem.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    className={`${
                                      activeItem === nestedSubItem.title ? "bg-blue-navy text-white" : ""
                                    } hover:bg-blue-navy hover:text-white`}
                                    onClick={() => nestedSubItem.title && handleItemClick(nestedSubItem.title)}
                                  >
                                    <a href={nestedSubItem.url}>
                                      <span className="text-xs">{nestedSubItem.title}</span>
                                    </a>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuSubItem>
                      </Collapsible>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
