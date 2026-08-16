"use client";

import { IconButton } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useColorMode } from "@/components/ui/color-mode"; 

export default function ColorModeToggle() {
  const { theme, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle dark mode"
      variant="ghost"
      onClick={toggleColorMode}
      _hover={{
        bg: theme === "light" ? "gray.200" : "whiteAlpha.200",
      }}
    >
      {/* V3 FIX: Place icons directly inside as children */}
      {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
    </IconButton>
  );
}