import { SignupForm } from "@/components/authentication/signup-form"
import Image from "next/image"

export default function Page() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center">
        <div className="absolute inset-0 -z-10 bg-black">
          <Image 
            src="/authentication/hold-bag.jpg"
            alt="bg"
            draggable={false}
            width={1920}
            height={1080}
            className="opacity-40 object-center object-cover h-full w-full"
          />
        </div>
        <div className="w-full max-w-lg">
            <SignupForm />
        </div>
    </div>
  )
}
