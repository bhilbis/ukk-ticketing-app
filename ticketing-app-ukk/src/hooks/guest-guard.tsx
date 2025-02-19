"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GuestGuard({ children }: { children: React.ReactNode }) {
    const [isGuest, setIsGuest] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            router.back();
            return;
        }

        setIsGuest(true);
    }, [router]);

    if (!isGuest) return null;

    return <>{children}</>;
}