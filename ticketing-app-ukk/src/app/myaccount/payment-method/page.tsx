/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Landmark, Wallet, Trash2, Edit } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { usePaymentMethods,  
  useCreatePaymentMethod, 
  useUpdatePaymentMethod,
  useDeletePaymentMethod,  
  PaymentMethod} from "@/services/methods/payment-method";
import { Skeleton } from "@/components/ui/skeleton";

const indonesianBanks = [
  "BCA (Bank Central Asia)",
  "Mandiri",
  "BRI (Bank Rakyat Indonesia)",
  "BNI (Bank Negara Indonesia)",
  "CIMB Niaga",
  "Danamon",
  "Panin Bank",
  "Maybank Indonesia",
  "OCBC NISP",
  "Bank Mega",
  "HSBC Indonesia",
  "Citibank Indonesia",
];

const eWallets = ["Dana", "Gopay", "Shopee Pay", "OVO"];

const PaymentMethods = () => {
  const { data: methods, isLoading } = usePaymentMethods();
  const { mutate: createMethod } = useCreatePaymentMethod();
  const { mutate: updateMethod } = useUpdatePaymentMethod();
  const { mutate: deleteMethod } = useDeletePaymentMethod();
  const { toast } = useToast();
  
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>({ type: 'bank_transfer' });
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [selectedProvider, setSelectedProvider] = useState("");

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'credit_card': return <CreditCard className="w-6 h-6" />;
      case 'bank_transfer': return <Landmark className="w-6 h-6" />;
      case 'e-wallet': return <Wallet className="w-6 h-6" />;
      default: return <Landmark className="w-6 h-6" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && currentId) {
      updateMethod({ id: currentId, formData: selectedMethod }, {
        onSuccess: () => {
          toast({
            title: "Berhasil",
            description: "Metode pembayaran berhasil diperbarui",
          });
          setOpen(false);
        },
        onError: (error) => {
          toast({
            title: "Gagal",
            description: (error as any).response?.data?.message || 'Terjadi kesalahan',
            variant: "destructive"
          });
        }
      });
    } else {
      createMethod(selectedMethod, {
        onSuccess: () => {
          toast({
            title: "Berhasil",
            description: "Metode pembayaran berhasil ditambahkan",
          });
          setOpen(false);
        },
        onError: (error) => {
          toast({
            title: "Gagal",
            description: (error as any).response?.data?.message || 'Terjadi kesalahan',
            variant: "destructive"
          });
        }
      });
    }
  };

  const handleEdit = (method: any) => {
    setSelectedMethod({
      type: method.type,
      account_number: method.account_number,
      bank_name: method.bank_name
    });
    setSelectedProvider(method.bank_name || '');
    setCurrentId(method.id);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMethod(id, {
      onSuccess: () => {
        toast({
          title: "Berhasil",
          description: "Metode pembayaran berhasil dihapus",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Gagal",
          description: (error as any).response?.data?.message || 'Gagal menghapus metode',
          variant: "destructive"
        });
      }
    });
  };

  const renderFormFields = () => {
    return (
      <>
        {selectedMethod.type === 'bank_transfer' && (
          <div className="space-y-2">
            <Label>Pilih Bank</Label>
            <Select
              value={selectedProvider}
              onValueChange={(value) => {
                setSelectedProvider(value);
                setSelectedMethod(prev => ({ ...prev, bank_name: value }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih bank" />
              </SelectTrigger>
              <SelectContent>
                {indonesianBanks.map(bank => (
                  <SelectItem key={bank} value={bank} className="cursor-pointer">
                    {bank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {selectedMethod.type === 'e-wallet' && (
          <div className="space-y-2">
            <Label>Pilih E-Wallet</Label>
            <Select
              value={selectedProvider}
              onValueChange={(value) => {
                setSelectedProvider(value);
                setSelectedMethod(prev => ({ ...prev, bank_name: value }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih e-wallet" />
              </SelectTrigger>
              <SelectContent>
                {eWallets.map(wallet => (
                  <SelectItem key={wallet} value={wallet} className="cursor-pointer">
                    {wallet}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {selectedMethod.type === 'credit_card' && (
          <div className="space-y-2">
            <Label>Nomor Kartu Kredit</Label>
            <Input
              placeholder="1234 5678 9012 3456"
              value={selectedMethod.account_number || ''}
              onChange={(e) => setSelectedMethod(prev => ({
                ...prev,
                account_number: e.target.value
              }))}
            />
          </div>
        )}

        {selectedMethod.type !== 'credit_card' && (
          <div className="space-y-2">
            <Label>
              {selectedMethod.type === 'e-wallet' ? 'Nomor HP' : 'Nomor Rekening'}
            </Label>
            <Input
              placeholder={
                selectedMethod.type === 'e-wallet' 
                  ? '0812 3456 7890' 
                  : '123 456 7890'
              }
              value={selectedMethod.account_number || ''}
              onChange={(e) => setSelectedMethod(prev => ({
                ...prev,
                account_number: e.target.value
              }))}
            />
          </div>
        )}
      </>
    );
  };

  return (
<div className="space-y-6 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Metode Pembayaran
          </h1>
          <p className="text-muted-foreground mt-2">Kelola semua metode pembayaran Anda di satu tempat</p>
        </div>
        <Button onClick={() => { setOpen(true); setIsEditing(false); }}>
          + Tambah Metode
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="relative hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-3 w-[150px]" />
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 justify-end p-4 pt-0">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : methods?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
          <Wallet className="w-16 h-16 text-muted-foreground" />
          <h3 className="text-xl font-semibold">Belum ada metode pembayaran</h3>
          <p className="text-muted-foreground">Tambahkan metode pembayaran untuk memulai transaksi</p>
          <Button onClick={() => setOpen(true)} className="mt-4">
            Tambah Metode Pertama
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {methods?.map((method: any) => (
              <Card key={method.id} className="relative hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    {getMethodIcon(method.type)}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold capitalize">
                      {method.type.replace('_', ' ')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {method.bank_name || method.account_number}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 justify-end p-4 pt-0">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleEdit(method)}
                  >
                    <Edit className="w-4 h-4 mr-2" /> Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(method.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Hapus
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-8 p-6 bg-muted/50 rounded-lg border-dashed border-2 border-primary/20">
            <div className="flex items-center gap-4">
              <Landmark className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold">Tips Keamanan Pembayaran</h3>
                <p className="text-sm text-muted-foreground">
                  Jangan pernah membagikan detail pembayaran Anda kepada siapapun
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>
            {isEditing ? 'Edit' : 'Tambah'} Metode Pembayaran
          </DialogTitle>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Tipe Pembayaran</Label>
              <Select
                value={selectedMethod.type}
                onValueChange={(value) => {
                  setSelectedMethod(prev => ({
                    ...prev,
                    type: value as PaymentMethod['type'],
                    bank_name: '',
                    account_number: ''
                  }));
                  setSelectedProvider('');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit_card">Kartu Kredit</SelectItem>
                  <SelectItem value="bank_transfer">Transfer Bank</SelectItem>
                  <SelectItem value="e-wallet">E-Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {renderFormFields()}

            <Button type="submit" className="w-full">
              {isEditing ? 'Simpan Perubahan' : 'Tambahkan'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentMethods;