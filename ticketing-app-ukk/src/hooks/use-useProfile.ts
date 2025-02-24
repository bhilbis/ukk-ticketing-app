// hooks/use-user.ts
import { useGetMy } from "@/services/methods/use-profile"

export function useUser() {
  const { data: userData, isLoading, error } = useGetMy(true)
  console.log(userData)

  const user = {
    name: userData?.data.user.name || "User",
    email: userData?.data.user.email || "user@example.com",
    avatar: userData?.data.user?.avatar 
      ? `${process.env.NEXT_PUBLIC_BASE_URL}${userData.data.user.avatar}`
      : "https://github.com/shadcn.png"
  }

  return {
    user,
    isLoading,
    error
  }
}