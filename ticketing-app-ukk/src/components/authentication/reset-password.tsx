"use client"

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeftToLine, Eye, EyeClosed } from "lucide-react";
import { postSendOtp, postVerifyOtp, postResetPassword } from "@/services/reset-password";
import { useToast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string>("")
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  const [errors, setErrors] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSendEmail = async () => {
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email tidak boleh kosong." }));
      return;
    }

    if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Format email tidak valid." }));
      return;
    }

    setErrors((prev) => ({ ...prev, email: "" }));
    setLoading(true);
    
    try {
      await postSendOtp({ email });
      toast({ title: "Kode OTP telah dikirim ke email." });
      setStep(2);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors((prev) => ({ ...prev, email: error.message }));
      } else {
        toast({ title: "Terjadi kesalahan.", variant: "destructive" });
      }
    }
    setLoading(false);
  };

  // Fungsi Verifikasi OTP
  const handleVerifyOtp = async () => {
    if (otp.length !== 4) {
      setErrors((prev) => ({ ...prev, otp: "Kode OTP harus lengkap." }));
      return;
    }

    setErrors((prev) => ({ ...prev, otp: "" }));
    setLoading(true);
    
    try {
      await postVerifyOtp(email, otp);
      toast({ title: "Kode OTP berhasil diverifikasi." });
      setStep(3);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors((prev) => ({ ...prev, otp: error.message }));
      } else {
        toast({ title: "An unknown error occurred", variant: "destructive" });
      }
    }
    setLoading(false);
  };

  // Fungsi Reset Password
  const handleResetPassword = async () => {
    if (newPassword.length < 8) {
      setErrors((prev) => ({ ...prev, newPassword: "Password minimal 8 karakter." }));
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Konfirmasi password tidak cocok." }));
      return;
    }

    setErrors({ email: "", otp: "", newPassword: "", confirmPassword: "" });
    setLoading(true);

    try {
      await postResetPassword(email, otp, newPassword, confirmPassword);
      toast({ title: "Password berhasil diubah." });
      window.location.href = "/login";
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors((prev) => ({ ...prev, newPassword: error.message }));
      } else {
          toast({ title: "Terjadi kesalahan.", variant: "destructive" });
      }
    }
    setLoading(false);
  };
  
  const handleOtpChange = (value: string) => {
    if (/^\d{0,4}$/.test(value)) {
      setOtp(value);
    }
  };
  
  return (
      <Card className="w-full h-full p-[27px] shadow-none border-none rounded-r-none bg-transparent">
        <CardHeader>
          <CardTitle className="text-center text-2xl">{step === 1 ? "Reset Password" : step === 2 ? "Masukkan OTP" : "Buat Password Baru"}</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              <div className="flex gap-5">
                <Button className="w-full" disabled={loading}>
                    <Link href="/login" className="flex gap-2 items-center">
                        <ArrowLeftToLine />
                        <span>Kembali Login</span>
                    </Link>
                </Button>
                <Button className="w-full" onClick={handleSendEmail} disabled={loading}>
                  {loading ? "Mengirim..." : "Kirim"}
                </Button>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4">
              <Label>Masukkan Kode OTP</Label>
              <InputOTP maxLength={4} value={otp} onChange={handleOtpChange} className="items-center justify-center">
                <InputOTPGroup className="gap-6 justify-center">
                  {[...Array(4)].map((_, index) => (
                    <InputOTPSlot key={index} index={index} className="border border-gray-300 rounded-md p-2 text-center text-lg bg-gray-100"/>
                  ))}
                </InputOTPGroup>
              </InputOTP>
              {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
              <Button className="w-full" onClick={handleVerifyOtp} disabled={loading}>
                {loading ? "Memverifikasi..." : "Verifikasi"}
              </Button>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-4">
              <Label htmlFor="new-password">Password Baru</Label>
              <div className="relative">
                <Input 
                  id="new-password" 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)}
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
              {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
              <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
              <div className="relative">
                <Input 
                  id="confirm-password" 
                  type={showConfirmPassword ? "text" : "password"} 
                  required 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-2 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeClosed className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              <Button className="w-full" onClick={handleResetPassword} disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
  );
}
