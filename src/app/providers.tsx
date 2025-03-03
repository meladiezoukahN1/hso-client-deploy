"use client";

import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import { createTheme, MantineProvider } from "@mantine/core";
import store from "@/lib/store";

const theme = createTheme({
  /** Your theme override here */
});

export default function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <SessionProvider>
      <MantineProvider theme={theme}>
        <NextUIProvider navigate={router.push} locale="ar-AR">
          <Provider store={store}>{children}</Provider>
        </NextUIProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
