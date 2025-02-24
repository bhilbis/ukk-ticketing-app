/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from "react";
import { useGetMy, useUpdateMy, useUpdatePassword } from "@/services/methods/use-profile";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

interface ProfileFormValues {
  email: string;
  avatar: File | string | null;
  name_passenger?: string;
  address?: string;
  telp?: string;
  gender?: string;
  birth?: string;
  name?: string;
  username?: string;
}

const passwordValidationSchema = Yup.object().shape({
  old_password: Yup.string().required("Password lama wajib diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password baru wajib diisi"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Password tidak cocok")
    .required("Konfirmasi password wajib diisi"),
});

const Page = () => {
  const {isLoggedIn, userLevel} = useAuth();
  const { data: user, isLoading } = useGetMy(isLoggedIn);
  const updateUser = useUpdateMy();
  const updatePassword = useUpdatePassword();
  const [isEditing, setIsEditing] = React.useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const profileValidationSchema = Yup.object().shape({
    email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
    ...(userLevel === 3 && {
      name_passenger: Yup.string().required("Nama wajib diisi"),
      address: Yup.string().required("Alamat wajib diisi"),
      telp: Yup.string().required("Telepon wajib diisi"),
      gender: Yup.string().required("Jenis kelamin wajib diisi"),
      birth: Yup.string().required("Tanggal lahir wajib diisi"),
    }),
    ...(userLevel === 2 && {
      name: Yup.string().required("Nama wajib diisi"),
      username: Yup.string().required("Username wajib diisi"),
    }),
  });

  const initialPasswordValues = {
    old_password: "",
    password: "",
    password_confirmation: "",
  };

  const initialValues: ProfileFormValues = {
    email: user?.email ?? "",
    avatar: user?.avatar ?? null,
    name_passenger: user?.passenger?.name_passenger ?? "",
    address: user?.passenger?.address ?? "",
    telp: user?.passenger?.telp ?? "",
    gender: user?.passenger?.gender ?? "",
    birth: user?.passenger?.birth ?? "",
    name: user?.staff?.name ?? "",
    username: user?.staff?.username ?? "",
  };

  const handleProfileSubmit = async (values: ProfileFormValues, { setSubmitting }: any) => {
    try {
      const formData = new FormData();
      formData.append('email', values.email);
      
      if (values.avatar instanceof File) {
        formData.append('avatar', values.avatar);
      }

      switch (userLevel) {
        case 2:
          formData.append('name', values.name || '');
          formData.append('username', values.username || '');
          break;
        case 3:
          formData.append('name_passenger', values.name_passenger || '');
          formData.append('address', values.address || '');
          formData.append('telp', values.telp || '');
          formData.append('gender', values.gender || '');
          formData.append('birth', values.birth || '');
          break;
      }

      formData.append('_method', 'PUT');
      
      await updateUser.mutateAsync(formData);
      toast.success("Profil berhasil diperbarui");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal memperbarui profil");
    } finally {
      setSubmitting(false);
    }
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
              <Button 
                onClick={() => setIsEditing(true)} 
                className="mb-4 bg-blue-500 hover:bg-blue-600 text-white"
              >
                Edit Profil
              </Button>

              <Formik
                initialValues={initialValues}
                validationSchema={profileValidationSchema}
                onSubmit={handleProfileSubmit}
                enableReinitialize
              >
                {({ values, errors, touched, setFieldValue, isSubmitting }) => (
                  <Form className="space-y-4">
                    <div>
                      <Label>Foto Profil</Label>
                      {values.avatar && typeof values.avatar === "string" && (
                        <Image
                          src={`${BASE_URL}${values.avatar}`}
                          width={500}
                          height={500}
                          alt="Profile"
                          className="w-24 h-24 rounded-full mb-2"
                        />
                      )}
                      <Input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFieldValue("avatar", file);
                          }
                        }}
                        disabled={!isEditing}
                        accept="image/*"
                      />
                      {values.avatar && (
                        <Button
                          type="button"
                          onClick={() => setFieldValue("avatar", null)}
                          className="mt-2"
                        >
                          Hapus Foto
                        </Button>
                      )}
                    </div>

                    <div>
                      <Label>Email</Label>
                      <Field
                        as={Input}
                        name="email"
                        disabled={!isEditing}
                      />
                      {errors.email && touched.email && (
                        <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                      )}
                    </div>

                    {userLevel === 3 && (
                      <>
                        <div>
                          <Label>Nama Lengkap</Label>
                          <Field
                            as={Input}
                            name="name_passenger"
                            disabled={!isEditing}
                          />
                          {errors.name_passenger && touched.name_passenger && (
                            <div className="text-red-500 text-sm mt-1">{errors.name_passenger}</div>
                          )}
                        </div>

                        <div>
                          <Label>Alamat</Label>
                          <Field
                            as={Input}
                            name="address"
                            disabled={!isEditing}
                          />
                          {errors.address && touched.address && (
                            <div className="text-red-500 text-sm mt-1">{errors.address}</div>
                          )}
                        </div>

                        <div>
                          <Label>Telepon</Label>
                          <Field
                            as={Input}
                            name="telp"
                            disabled={!isEditing}
                          />
                          {errors.telp && touched.telp && (
                            <div className="text-red-500 text-sm mt-1">{errors.telp}</div>
                          )}
                        </div>

                        <div>
                          <Label>Jenis Kelamin</Label>
                          <Select
                            name="gender"
                            value={values.gender}
                            onValueChange={(value) => setFieldValue("gender", value)}
                            disabled={!isEditing}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih jenis kelamin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                              <SelectItem value="Perempuan">Perempuan</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.gender && touched.gender && (
                            <div className="text-red-500 text-sm mt-1">{errors.gender}</div>
                          )}
                        </div>

                        <div>
                          <Label>Tanggal Lahir</Label>
                          <Field
                            as={Input}
                            type="date"
                            name="birth"
                            max={new Date().toISOString().split("T")[0]}
                            disabled={!isEditing}
                          />
                          {errors.birth && touched.birth && (
                            <div className="text-red-500 text-sm mt-1">{errors.birth}</div>
                          )}
                        </div>
                      </>
                    )}

                    {userLevel === 2 && (
                      <>
                        <div>
                          <Label>Nama Staff</Label>
                          <Field
                            as={Input}
                            name="name"
                            disabled={!isEditing}
                          />
                          {errors.name && touched.name && (
                            <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                          )}
                        </div>

                        <div>
                          <Label>Username</Label>
                          <Field
                            as={Input}
                            name="username"
                            disabled={!isEditing}
                          />
                          {errors.username && touched.username && (
                            <div className="text-red-500 text-sm mt-1">{errors.username}</div>
                          )}
                        </div>
                      </>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                      disabled={!isEditing || isSubmitting}
                    >
                      {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="text-xl font-semibold">Ubah Password</h2>
              <Formik
                initialValues={initialPasswordValues}
                validationSchema={passwordValidationSchema}
                onSubmit={async (values, { resetForm, setSubmitting }) => {
                  try {
                    await updatePassword.mutateAsync(values);
                    toast.success("Password berhasil diperbarui");
                    resetForm();
                  } catch (error: any) {
                    toast.error(error.response?.data?.message || "Gagal memperbarui password");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form className="space-y-4">
                    <div>
                      <Label>Password Saat Ini</Label>
                      <Field
                        as={Input}
                        type="password"
                        name="old_password"
                      />
                      {errors.old_password && touched.old_password && (
                        <div className="text-red-500 text-sm mt-1">{errors.old_password}</div>
                      )}
                    </div>

                    <div>
                      <Label>Password Baru</Label>
                      <Field
                        as={Input}
                        type="password"
                        name="password"
                      />
                      {errors.password && touched.password && (
                        <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                      )}
                    </div>

                    <div>
                      <Label>Konfirmasi Password</Label>
                      <Field
                        as={Input}
                        type="password"
                        name="password_confirmation"
                      />
                      {errors.password_confirmation && touched.password_confirmation && (
                        <div className="text-red-500 text-sm mt-1">{errors.password_confirmation}</div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Memperbarui..." : "Perbarui Password"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;