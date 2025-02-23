/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useEffect } from "react";
import { useGetMy, useUpdateMy, useUpdatePassword } from "@/services/methods/use-passenger";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  const { data: user, isLoading } = useGetMy();
  const updateUser = useUpdateMy();
  const updatePassword = useUpdatePassword();

  const [formData, setFormData] = useState({
    name_passenger: "",
    email: "",
    address: "",
    telp: "",
    gender: "",
    birth: "",
  });

  const [passwordData, setPasswordData] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      setTimeout(() => {
        setFormData({
          name_passenger: user.name_passenger || "",
          email: user.email || "",
          address: user.address || "",
          telp: user.telp || "",
          gender: user.gender || "",
          birth: user.birth || "",
        });
      }, 500);
    }
  }, [user, isLoading]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: any) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();
    updateUser.mutate(formData);
    setIsEditing(false);
  };

  const handlePasswordUpdate = (e: any) => {
    e.preventDefault();
    setError("");

    if (passwordData.password.length < 6) {
      setError("Password baru harus memiliki minimal 6 karakter.");
      return;
    }
    if (passwordData.password !== passwordData.password_confirmation) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    updatePassword.mutate(passwordData);
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Pengaturan</h1>
      <p className="text-gray-600 mb-6 text-center">Kelola informasi dan keamanan akun Anda.</p>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-2 rounded-lg">
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="security">Keamanan</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="text-xl font-semibold">Informasi Akun</h2>
              <Button onClick={() => setIsEditing(true)} className="mb-4 bg-blue-500 hover:bg-blue-600 text-white">Edit Profil</Button>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <Label>Nama</Label>
                  <Input type="text" name="name_passenger" value={formData.name_passenger} onChange={handleChange} disabled={!isEditing} required />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" name="email" value={formData.email} onChange={handleChange} disabled={!isEditing} required />
                </div>
                <div>
                  <Label>Alamat</Label>
                  <Input type="text" name="address" value={formData.address} onChange={handleChange} disabled={!isEditing} required />
                </div>
                <div>
                  <Label>Telepon</Label>
                  <Input type="text" name="telp" value={formData.telp} onChange={handleChange} disabled={!isEditing} required />
                </div>
                <div>
                  <Label>Jenis Kelamin</Label>
                  <Input type="text" name="gender" value={formData.gender} onChange={handleChange} disabled={!isEditing} required />
                </div>
                <div>
                  <Label>Tanggal Lahir</Label>
                  <Input type="date" name="birth" value={formData.birth} defaultValue={user?.birth}  onChange={handleChange} disabled={!isEditing} required />
                </div>
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white" disabled={!isEditing}>Simpan Perubahan</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="text-xl font-semibold">Ubah Password</h2>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div>
                  <Label>Password Saat Ini</Label>
                  <Input type="password" name="old_password" value={passwordData.old_password} onChange={handlePasswordChange} required />
                </div>
                <div>
                  <Label>Password Baru</Label>
                  <Input type="password" name="password" value={passwordData.password} onChange={handlePasswordChange} required />
                </div>
                <div>
                  <Label>Konfirmasi Password</Label>
                  <Input type="password" name="password_confirmation" value={passwordData.password_confirmation} onChange={handlePasswordChange} required />
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">Perbarui Password</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
