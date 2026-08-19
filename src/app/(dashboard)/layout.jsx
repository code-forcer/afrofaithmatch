"use client";

import { Box, Flex } from "@chakra-ui/react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardBottomNav from "@/components/DashboardBottomNav";

export default function DashboardLayout({ children }) {
  return (
    <Flex h="100dvh" bg="gray.50" overflow="hidden">
      {/* Desktop Sidebar (hidden on mobile) */}
      <Box
        display={{ base: "none", md: "block" }}
        w="280px"
        h="full"
        bg="white"
        borderRight="1px solid"
        borderColor="gray.200"
        flexShrink={0}
      >
        <DashboardSidebar />
      </Box>

      {/* Main Content Area */}
      <Box
        flex={1}
        h="100%"
        overflowY="auto"
        pb={{ base: "calc(env(safe-area-inset-bottom, 0px) + 80px)", md: 0 }}
      >
        {children}
      </Box>

      {/* Mobile Bottom Navigation (hidden on desktop) */}
      <Box display={{ base: "block", md: "none" }}>
        <DashboardBottomNav />
      </Box>
    </Flex>
  );
}
