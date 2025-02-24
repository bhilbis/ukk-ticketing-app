/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from "react";
import { useGetMy, useUpdateMy, useUpdatePassword } from "@/services/methods/use-passenger";
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
  name_passenger: string;
  email: string;
  address: string;
  telp: string;
  gender: string;
  birth: string;
  avatar: File | string | null;
}

const profileValidationSchema = Yup.object().shape({
  name_passenger: Yup.string().required("Nama wajib diisi"),
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  address: Yup.string().required("Alamat wajib diisi"),
  telp: Yup.string().required("Telepon wajib diisi"),
  gender: Yup.string().required("Jenis kelamin wajib diisi"),
  birth: Yup.string().required("Tanggal lahir wajib diisi"),
});

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
  const {isLoggedIn} = useAuth();
  const { data: user, isLoading } = useGetMy(isLoggedIn);
  const updateUser = useUpdateMy();
  const updatePassword = useUpdatePassword();
  const [isEditing, setIsEditing] = React.useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  // const initialProfileValues = {
  //   name_passenger: "",
  //   email: "",
  //   address: "",
  //   telp: "",
  //   gender: "",
  //   birth: "",
  //   avatar: null as string | File | null,
  // };

  const initialPasswordValues = {
    old_password: "",
    password: "",
    password_confirmation: "",
  };

  const handleProfileSubmit = async (values:  ProfileFormValues, { setSubmitting, setErrors }: any) => {
    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (key === 'avatar') {
          if (value instanceof File) {
            formData.append('avatar', value);
          }
        }else if (key === 'gender') {
          formData.append(key, String(value).trim());
        } else {
          if (value !== null && value !== undefined) {
            formData.append(key, value.toString());
          }
        }
      });

      const response = await updateUser.mutateAsync(formData);
      console.log('Update response:', response);
      toast.success("Profil berhasil diperbarui");
      setIsEditing(false);
    } catch (error: any) {
      if (error.response?.data?.message) {
        // Handle backend validation errors
        const errorMessage = error.response.data.message;
        const errors: Record<string, string> = {};
        
        // Parse error message and set appropriate field errors
        if (errorMessage.includes("name passenger field is required")) {
          errors.name_passenger = "Nama wajib diisi";
        }
        if (errorMessage.includes("email field is required")) {
          errors.email = "Email wajib diisi";
        }
        // Add other field error checks as needed
        
        setErrors(errors);
        toast.error("Gagal memperbarui profil");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Ensure we have default values
  const initialValues: ProfileFormValues = {
    name_passenger: user?.name_passenger ?? "",
    email: user?.email ?? "",
    address: user?.address ?? "",
    telp: user?.telp ?? "",
    gender: user?.gender ?? "",
    birth: user?.birth ?? "",
    avatar: user?.avatar ?? null,
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
                      <Label>Nama</Label>
                      <Field
                        as={Input}
                        name="name_passenger"
                        id="name_passenger"
                        disabled={!isEditing}
                        // value={values.name_passenger}
                      />
                      {errors.name_passenger && touched.name_passenger && (
                        <div className="text-red-500 text-sm mt-1">{typeof errors.name_passenger === 'string' ? errors.name_passenger : ''}</div>
                      )}
                    </div>

                    <div>
                      <Label>Email</Label>
                      <Field
                        as={Input}
                        name="email"
                        id="email"
                        type="email"
                        disabled={!isEditing}
                        value={values.email}
                      />
                      {errors.email && touched.email && (
                        <div className="text-red-500 text-sm mt-1">{typeof errors.email === 'string' ? errors.email : ''}</div>
                      )}
                    </div>

                    <div>
                      <Label>Alamat</Label>
                      <Field
                        as={Input}
                        name="address"
                        id="address"
                        disabled={!isEditing}
                        value={values.address}
                      />
                      {errors.address && touched.address && (
                        <div className="text-red-500 text-sm mt-1">{typeof errors.address === 'string' ? errors.address : ''}</div>
                      )}
                    </div>

                    <div>
                      <Label>Telepon</Label>
                      <Field
                        as={Input}
                        name="telp"
                        id="telp"
                        disabled={!isEditing}
                        value={values.telp}
                      />
                      {errors.telp && touched.telp && (
                        <div className="text-red-500 text-sm mt-1">{typeof errors.telp === 'string' ? errors.telp : ''}</div>
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
                        <div className="text-red-500 text-sm mt-1">{typeof errors.gender === 'string' ? errors.gender : ''}</div>
                      )}
                    </div>

                    <div>
                      <Label>Tanggal Lahir</Label>
                      <Field
                        as={Input}
                        type="date"
                        name="birth"
                        id="birth"
                        max={new Date().toISOString().split("T")[0]}
                        disabled={!isEditing}
                        value={values.birth}
                      />
                      {errors.birth && touched.birth && (
                        <div className="text-red-500 text-sm mt-1">{typeof errors.birth === 'string' ? errors.birth : ''}</div>
                      )}
                    </div>

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