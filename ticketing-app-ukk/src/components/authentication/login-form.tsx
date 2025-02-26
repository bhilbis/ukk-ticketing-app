/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react";
import { usePostLogin } from "@/services/methods/auth";
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
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { login } = useAuth();
  const loginMutation = usePostLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await loginMutation.mutateAsync({ email, password });
      login(result.token);
      const level = result.user.level_id;
      toast.success("Login Berhasil")
      
      if (level === 1 || level === 2) {
        window.location.href = ("/admin/dashboard");
      } else {
        router.push("/");
      }

    } catch (error: any) {
      console.error("Login submission error:", error);
      setErrorMessage(error.response?.data?.message || "Login gagal, coba lagi nanti");
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loginMutation.isPending}
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
                    disabled={loginMutation.isPending}
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
                {errorMessage && (
                  <p className="text-red-500 text-center">{errorMessage}</p>
                )}
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Loading..." : "Login"}
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