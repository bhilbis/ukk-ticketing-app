// hooks/use-user.ts
import { useGetMy } from "@/services/methods/use-passenger"

export function useUser() {
  const { data: userData, isLoading, error } = useGetMy()
  console.log(userData)

  const user = {
    name: userData?.data.passenger.name_passenger || "User",
    email: userData?.data.passenger.email || "user@example.com",
    avatar: userData?.data.user.avatar 
      ? `${process.env.NEXT_PUBLIC_BASE_URL}${userData.data.user.avatar}`
      : "https://github.com/shadcn.png"
  }

  return {
    user,
    isLoading,
    error
  }
}