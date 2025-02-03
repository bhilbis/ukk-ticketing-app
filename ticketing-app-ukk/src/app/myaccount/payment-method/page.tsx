"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Landmark, Wallet, DollarSign } from "lucide-react";

const paymentMethods = [
  { id: "credit_card", label: "Kartu Kredit", icon: <CreditCard className="w-6 h-6 mx-auto" /> },
  { id: "bank_transfer", label: "Transfer Bank", icon: <Landmark className="w-6 h-6 mx-auto" /> },
  { id: "e-wallet", label: "E-Wallet", icon: <Wallet className="w-6 h-6 mx-auto" /> },
  { id: "cash", label: "Tunai", icon: <DollarSign className="w-6 h-6 mx-auto" /> },
];

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleSelectMethod = (method: string) => {
    setSelectedMethod(method);
    setOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Metode Pembayaran</h1>
      <p className="text-gray-600 mb-6 text-center">Pilih atau tambahkan metode pembayaran Anda.</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
        {paymentMethods.map(({ id, label, icon }) => (
          <Card
            key={id}
            className="cursor-pointer p-4 text-center border shadow-md hover:bg-gray-100 hover:scale-105 transition duration-200"
            onClick={() => handleSelectMethod(id)}
          >
            <CardContent className="p-2 font-semibold flex flex-col items-center gap-2">
              {icon}
              <span>{label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>
            Tambah {selectedMethod?.replace("_", " ")}
          </DialogTitle>
          
          <form className="space-y-4">
            {selectedMethod === "credit_card" && (
              <>
                <Label>Nomor Kartu Kredit</Label>
                <Input type="text" placeholder="Masukkan nomor kartu" />
              </>
            )}
            {selectedMethod === "bank_transfer" && (
              <>
                <Label>Nama Bank</Label>
                <Input type="text" placeholder="Masukkan nama bank" />
                <Label>Nomor Rekening</Label>
                <Input type="text" placeholder="Masukkan nomor rekening" />
              </>
            )}
            {selectedMethod === "e-wallet" && (
              <>
                <Label>Nama E-Wallet</Label>
                <Input type="text" placeholder="Masukkan nama e-wallet" />
                <Label>Nomor HP</Label>
                <Input type="text" placeholder="Masukkan nomor HP" />
              </>
            )}
            {selectedMethod === "cash" && (
              <p className="text-gray-600 text-center">Pembayaran tunai dapat dilakukan di lokasi.</p>
            )}
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Simpan
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentMethods;
