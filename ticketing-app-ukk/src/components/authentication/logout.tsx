"use client"

// import { useState } from "react";
import { useLogout } from "@/services/methods/auth";
// import { Button } from "@/components/ui/button";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  // AlertDialogTrigger 
} from "../ui/alert-dialog";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ isOpen, onClose}) => {
  const logoutMutation = useLogout();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      window.location.href = ('/login');
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "Unauthenticated.") {
          router.push('/login');
        } else {
          console.error("Logout failed:", error);
        }
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Anda yakin ingin keluar?</AlertDialogTitle>
          <AlertDialogDescription>
            Anda perlu login kembali untuk mengakses akun Anda.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onClose()}>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? "Logging out..." : "Ya, Keluar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LogoutButton;