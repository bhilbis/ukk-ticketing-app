import { LoginForm } from "@/components/authentication/login-form"
import Image from "next/image"
export default function Page() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="absolute inset-0 -z-10 bg-black">
        <Image 
          src="/authentication/hold-bag.jpg"
          alt="bg"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="opacity-40"
        />
      </div>
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg">
        <LoginForm />
      </div>
    </div>
  )
}
