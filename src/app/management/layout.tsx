"use client";

import { LoadingIcon } from "@/components/ui";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user.role !== "admin" && session?.user.role !== "super") {
      router.replace("/home");
      return;
    }

    if (
      path === "/management/AdvertisingManagement" &&
      session?.user.role !== "super"
    ) {
      router.replace("/home");
    }
  }, [status, session, router, path]);

  if (status === "loading") {
    return <LoadingIcon />;
  }

  if (!session) {
    router.replace("/home");
    return <LoadingIcon />;
  }

  return <>{children}</>;
}
