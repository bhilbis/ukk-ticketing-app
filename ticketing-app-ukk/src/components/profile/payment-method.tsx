"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  usePaymentMethods,
  PaymentMethod as PaymentMethodType
} from "@/services/methods/payment-method";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, CreditCard, Landmark, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentMethodsProps {
  onSelectMethod: (method: PaymentMethodType) => void;
  selectedAmount: number;
}

const PaymentMethods = ({ onSelectMethod, selectedAmount }: PaymentMethodsProps) => {
  const { toast } = useToast();
  const { data: methods, isLoading } = usePaymentMethods();

  const handlePayment = (method: PaymentMethodType) => {
    if (method.type === 'bank_transfer' && !method.bank_name) {
      toast({
        title: "Peringatan",
        description: "Silakan pilih bank terlebih dahulu",
        variant: "destructive"
      });
      return;
    }
    
    if (!method.account_number) {
      toast({
        title: "Peringatan",
        description: "Nomor rekening/HP belum terisi",
        variant: "destructive"
      });
      return;
    }

    onSelectMethod(method);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total Pembayaran:</span>
          <span className="text-xl font-bold text-primary">
            Rp {selectedAmount.toLocaleString()}
          </span>
        </div>
      </div>

      {methods?.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-muted-foreground mb-4">
            Belum ada metode pembayaran tersedia
          </p>
          <Button variant="outline">
            Tambah Metode Pembayaran
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {methods?.map((method) => (
            <Card key={method.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    {method.type === 'credit_card' ? (
                      <CreditCard className="w-6 h-6" />
                    ) : method.type === 'e-wallet' ? (
                      <Wallet className="w-6 h-6" />
                    ) : (
                      <Landmark className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold capitalize">
                      {method.bank_name || method.type.replace('_', ' ')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {method.account_number}
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handlePayment(method)}
                  className="gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Pilih
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;