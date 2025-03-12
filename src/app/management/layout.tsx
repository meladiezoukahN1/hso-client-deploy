"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingIcon from "@/components/ui/LoadingIcon";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status !== "loading" &&
      (status === "unauthenticated" || session?.user.role !== "admin")
    ) {
      router.replace("/home");
    }
  }, [status, session, router]);

  // في حالة التحميل أو عدم التوثيق أو عدم صلاحية المستخدم، يتم عرض LoadingIcon
  if (
    status === "loading" ||
    status === "unauthenticated" ||
    session?.user.role !== "admin"
  ) {
    return <LoadingIcon />;
  }

  return <>{children}</>;
}
