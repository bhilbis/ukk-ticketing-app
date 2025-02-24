"use client"

import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

interface UserProfileProps {
  user?: {
    name: string
    email: string
    avatar: string
  }
  isLoading?: boolean
  error?: Error | null
}

export function UserProfile({ user, isLoading, error }: UserProfileProps) {
  if (isLoading) {
    return (
      <div className="flex items-center space-x-4 px-4 py-3">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-3 w-[80px]" />
        </div>
      </div>
    )
  }

  if (error || !user) {
    return <div className="px-4 py-3 text-red-500">Error loading user data</div>
  }

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className="rounded-lg">
          {user.name[0]?.toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">{user.name.split(' ')[0]}</p>
        <p className="text-xs text-muted-foreground">{user.email}</p>
      </div>
    </div>
  )
}