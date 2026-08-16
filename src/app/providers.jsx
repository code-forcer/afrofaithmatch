"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/AuthContext";

export default function Providers({ children }) {
  return (
    // FIX: v3 uses 'value={defaultSystem}', not 'theme={theme}'
    <ChakraProvider value={defaultSystem}>
      {/* ThemeProvider is required for Dark Mode to work in v3 */}
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}