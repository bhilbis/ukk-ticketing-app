"use client"

import { useState } from "react";
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
import { Checkbox } from "../ui/checkbox";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await postLogin(name, password);

      if (!response || !response.user) {
        throw new Error("User data is missing");
      }

      const userData = response.user;
      const level = userData.level_id;
      
      console.log(level);

      if (level === 1 || level === 2) {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/";
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
                <Label htmlFor="password">Password</Label>
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
                  
                </div>
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-1">
                    <Checkbox />
                    <span className="text-sm">Ingat saya</span>
                  </div>
                    <Link
                      href="/reset-password"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Lupa password?
                    </Link>
                </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <Button type="submit" className="w-full">
                Login
              </Button>
              </div>
            <div className="text-center text-sm">
              Tidak punya akun?{" "}
              <Link href="/daftar" className="underline underline-offset-4">
                Daftar
              </Link>
            </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
