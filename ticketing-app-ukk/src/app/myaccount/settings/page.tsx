"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("Password baru harus memiliki minimal 6 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    // TODO: Lakukan proses update password ke backend
    alert("Password berhasil diperbarui!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Pengaturan</h1>
      <p className="text-gray-600 mb-6 text-center">Kelola informasi dan keamanan akun Anda.</p>

      {/* Tabs for Settings Sections */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-2 rounded-lg">
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="security">Keamanan</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="text-xl font-semibold">Informasi Akun</h2>
              <div>
                <Label>Nama</Label>
                <Input type="text" placeholder="Masukkan nama Anda" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="Masukkan email Anda" />
              </div>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Simpan Perubahan</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="text-xl font-semibold">Ubah Password</h2>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div>
                  <Label>Password Saat Ini</Label>
                  <Input
                    type="password"
                    placeholder="Masukkan password saat ini"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Password Baru</Label>
                  <Input
                    type="password"
                    placeholder="Masukkan password baru"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Konfirmasi Password</Label>
                  <Input
                    type="password"
                    placeholder="Masukkan kembali password baru"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Perbarui Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
