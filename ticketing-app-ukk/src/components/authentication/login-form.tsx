"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postLogin } from "@/services/auth";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await postLogin(name, password);

      if (!response || !response.user) {
        throw new Error("User data is missing");
      }

      const userData = response.user;
      const level = userData.role;
      
      console.log(level);

      if (level === "Super Admin" || level === "Staff") {
        router.push("/admin"); 
      } else {
        router.push("/");
      }

    } catch (error: unknown) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        setError(error.message || "Login gagal, coba lagi nanti");
      } else {
        setError("Login gagal, coba lagi nanti");
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 z-10", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Masuk</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="name"
                  type="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/reset-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Lupa password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeClosed className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                {/* <Input 
                  id="password" 
                  type={showPassword ? "text" : "password" }
                  required  
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/> */}
                  
                </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <Button type="submit" className="w-full">
                Login
              </Button>
              </div>
            <div className="mt-4 text-center text-sm">
              Tidak punya akun?{" "}
              <a href="/daftar" className="underline underline-offset-4">
                Daftar
              </a>
            </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
