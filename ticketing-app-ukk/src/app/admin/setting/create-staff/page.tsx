/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateStaff } from "@/services/methods/user";
import { Formik, Form, Field } from "formik";
import { toast } from "sonner";

const CreateStaffForm = () => {
  const { mutate, isPending } = useCreateStaff();

  return (
    <div className="p-8 w-full min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Create New User</h1>
        <Formik
          initialValues={{ name: "", username: "", email: "", level_id: "" }}
          validate={(values) => {
            const errors: any = {};
            if (!values.name) errors.name = "Name is required";
            if (!values.username) errors.username = "Username is required";
            if (!values.email) {
              errors.email = "Email is required";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
              errors.email = "Invalid email address";
            }
            if (!values.level_id) errors.level_id = "Role is required";
            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            const payload = { id: 0, ...values, level_id: Number(values.level_id) };
            mutate(payload, {
              onSuccess: () => {
                toast.success("User baru berhasil ditambahkan");
                resetForm();
              },
              onError: (error: any) => {
                toast.error(error.response?.data?.message || "Error creating staff");
              },
            });
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Field as={Input} id="name" name="name" placeholder="John Doe" />
                {errors.name && touched.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Field as={Input} id="username" name="username" placeholder="johndoe123" />
                {errors.username && touched.username && <p className="text-red-500 text-sm">{errors.username}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Field as={Input} id="email" name="email" type="email" placeholder="john@example.com" />
                {errors.email && touched.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <Select onValueChange={(value) => setFieldValue("level_id", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">Staff</SelectItem>
                    <SelectItem value="3">Passenger</SelectItem>
                  </SelectContent>
                </Select>
                {errors.level_id && touched.level_id && <p className="text-red-500 text-sm">{errors.level_id}</p>}
              </div>

              <Button type="submit" className="w-full rounded-full px-6 py-6 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" disabled={isPending}>
                {isPending ? "Creating..." : "Create Staff Account"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateStaffForm;