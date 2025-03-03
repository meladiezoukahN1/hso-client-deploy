import { signOut } from "next-auth/react";

export const autoSignOut = async () => {
  try {
    await signOut({ redirect: true, callbackUrl: "/auth/login" });
  } catch {}
};
