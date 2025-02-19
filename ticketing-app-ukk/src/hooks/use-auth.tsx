"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children, allowedLevels }: { children: React.ReactNode, allowedLevels?: number[] }) {
  const [isAllowed, setIsAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      router.replace("/");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (allowedLevels && !allowedLevels.includes(payload.level_id)) {
        router.replace("/");
        return;
      }

      setIsAllowed(true);
    } catch {
      router.replace("/");
    }
  }, [router, allowedLevels]);

  if (!isAllowed) return null;

  return <>{children}</>;
}
