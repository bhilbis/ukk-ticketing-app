/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUsers, useUpdateUser, useDeleteUser } from "@/services/methods/user";

const UserManagement = () => {
  const [editUser, setEditUser] = useState<any>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const { data: users, isLoading } = useGetUsers();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: updateUser } = useUpdateUser();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    updateUser({ ...editUser ?? {}, ...userData ?? {}}, {
        onSuccess: () => setOpenEdit(false)
    });
  };

  const roleColors: { [key: number]: string } = {
    1: 'bg-red-100 text-red-800',
    2: 'bg-blue-100 text-blue-800',
    3: 'bg-green-100 text-green-800'
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            User Management
          </h1>
          <div className="w-full sm:w-64">
            <Input 
              placeholder="Search users..." 
              className="rounded-lg focus-visible:ring-purple-500"
            />
          </div>
        </div>

        <div className="border rounded-xl overflow-hidden shadow-sm">
          <Table className="min-w-full">
            <TableHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="px-6 py-4 font-semibold text-gray-700">Name</TableHead>
                <TableHead className="px-6 py-4 font-semibold text-gray-700">Email</TableHead>
                <TableHead className="px-6 py-4 font-semibold text-gray-700">Role</TableHead>
                <TableHead className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i} className="hover:bg-gray-50">
                    <TableCell className="px-6 py-4">
                      <Skeleton className="h-4 w-32 rounded-full" />
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Skeleton className="h-4 w-48 rounded-full" />
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Skeleton className="h-8 w-8 rounded-lg" />
                        <Skeleton className="h-8 w-8 rounded-lg" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                users?.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50 border-t">
                    <TableCell className="px-6 py-4 font-medium text-gray-900">
                      {user.name}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-600">
                      {user.email}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${roleColors[user.level_id]}`}>
                        {user.level_id === 1 ? 'Admin' : user.level_id === 2 ? 'Staff' : 'User'}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="rounded-lg hover:bg-blue-50 text-blue-600 hover:text-blue-700"
                              onClick={() => setEditUser(user)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          
                          <DialogContent className="rounded-2xl max-w-md">
                            <DialogHeader>
                              <DialogTitle className="text-lg font-semibold text-gray-900">
                                Edit User
                              </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-6">
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">Name</Label>
                                  <Input 
                                    name="name" 
                                    defaultValue={editUser?.name} 
                                    className="rounded-lg focus-visible:ring-purple-500"
                                    required 
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">Email</Label>
                                  <Input 
                                    name="email" 
                                    type="email" 
                                    defaultValue={editUser?.email} 
                                    className="rounded-lg focus-visible:ring-purple-500"
                                    required 
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">Role</Label>
                                  <Select 
                                    name="level_id" 
                                    defaultValue={editUser?.level_id.toString()}
                                  >
                                    <SelectTrigger className="rounded-lg focus:ring-purple-500">
                                      <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-lg">
                                      <SelectItem value="1" className="focus:bg-purple-50">Admin</SelectItem>
                                      <SelectItem value="2" className="focus:bg-purple-50">Staff</SelectItem>
                                      <SelectItem value="3" className="focus:bg-purple-50">User</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="flex justify-end gap-3">
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  className="rounded-lg"
                                  onClick={() => setOpenEdit(false)}
                                >
                                  Cancel
                                </Button>
                                <Button 
                                  type="submit" 
                                  className="bg-purple-600 hover:bg-purple-700 rounded-lg"
                                >
                                  Save Changes
                                </Button>
                              </div>
                            </form>
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="ghost" 
                          size="sm"
                          className="rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700"
                          onClick={() => {
                            if(confirm('Are you sure you want to delete this user?')) {
                              deleteUser(user.id)
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;