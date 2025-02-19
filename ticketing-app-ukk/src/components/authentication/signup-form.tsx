"use client"

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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useState } from "react"
import { Eye, EyeClosed } from "lucide-react"
import { usePostRegister } from "@/services/methods/auth"
import Link from "next/link"
import { useRouter } from 'next/navigation'

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [formData, setFormData] = useState({
    name_passenger: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    birth: "",
    gender: "",
    telp: "",
    address: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  
  const registerMutation = usePostRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      registerMutation.reset();
      return;
    }

    try {
      await registerMutation.mutateAsync(formData);
      router.push('/login');
    } catch (error) {
      // Error handling is managed by the mutation's onError callback
      console.error("Registration submission error:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Daftar</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="grid gap-2 col-span-2">
              <Label htmlFor="name_passenger">Nama Lengkap</Label>
              <Input 
                id="name_passenger" 
                type="text" 
                placeholder="Your full name" 
                required 
                value={formData.name_passenger} 
                onChange={handleChange}
                disabled={registerMutation.isPending}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                type="text" 
                placeholder="Enter your username" 
                required 
                value={formData.username} 
                onChange={handleChange}
                disabled={registerMutation.isPending}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                required 
                value={formData.email} 
                onChange={handleChange}
                disabled={registerMutation.isPending}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={formData.password} 
                  onChange={handleChange}
                  disabled={registerMutation.isPending}
                />
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-2 flex items-center" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeClosed className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
              <div className="relative">
                <Input 
                  id="password_confirmation" 
                  type={showConfirmPassword ? "text" : "password"} 
                  required 
                  value={formData.password_confirmation} 
                  onChange={handleChange}
                  disabled={registerMutation.isPending}
                />
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-2 flex items-center" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeClosed className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="birth">Tanggal Lahir</Label>
              <Input 
                id="birth" 
                type="date" 
                className="block w-full placeholder:placeholder-input" 
                required 
                value={formData.birth} 
                onChange={handleChange}
                disabled={registerMutation.isPending}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gender">Jenis Kelamin</Label>
              <Select 
                value={formData.gender} 
                onValueChange={(value) => setFormData({ ...formData, gender: value })}
                disabled={registerMutation.isPending}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Laki-laki" className="cursor-pointer">Laki-laki</SelectItem>
                  <SelectItem value="Perempuan" className="cursor-pointer">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2 col-span-2">
              <Label htmlFor="telp">Nomor Tel</Label>
              <Input 
                id="telp" 
                type="tel" 
                placeholder="08********" 
                required 
                value={formData.telp} 
                onChange={handleChange}
                disabled={registerMutation.isPending}
              />
            </div>
            <div className="grid gap-2 col-span-2">
              <Label htmlFor="address">Alamat</Label>
              <Textarea 
                id="address" 
                placeholder="Your address" 
                required 
                value={formData.address} 
                onChange={handleChange}
                disabled={registerMutation.isPending}
              />
            </div>
            
            {formData.password !== formData.password_confirmation && (
              <p className="text-red-500 col-span-2">Password tidak cocok</p>
            )}
            
            {registerMutation.error && (
              <p className="text-red-500 col-span-2">
                {registerMutation.error.message || "Registrasi gagal, coba lagi nanti"}
              </p>
            )}

            <div className="col-span-2">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={registerMutation.isPending || formData.password !== formData.password_confirmation}
              >
                {registerMutation.isPending ? "Memproses..." : "Daftar"}
              </Button>
            </div>
            <div className="col-span-2 text-center text-sm">
              Sudah punya akun? <Link href="/login" className="underline underline-offset-4">Masuk</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}