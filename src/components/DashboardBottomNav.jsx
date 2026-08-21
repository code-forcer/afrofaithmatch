"use client";

import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { FaUserFriends, FaHeart, FaCommentDots, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { name: "Browse", href: "/browse", icon: FaUserFriends },
  { name: "Interests", href: "/interests", icon: FaHeart },
  { name: "Chat", href: "/chat", icon: FaCommentDots },
  { name: "Profile", href: "/profile", icon: FaUserAlt },
];

export default function DashboardBottomNav() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Flex
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      h="80px"
      borderTop="1px solid"
      borderColor="gray.200"
      zIndex={999}
      pb="env(safe-area-inset-bottom)"
      align="center"
      justify="space-around"
      px={2}
    >
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Flex
            as={Link}
            key={item.name}
            href={item.href}
            direction="column"
            align="center"
            justify="center"
            w="full"
            h="full"
            color={isActive ? "#ff0036" : "gray.400"}
            _hover={{ color: isActive ? "#ff0036" : "gray.600" }}
          >
            <Icon
              as={item.icon}
              boxSize={6}
              mb={1}
              transform={isActive ? "scale(1.1)" : "none"}
              transition="all 0.2s"
            />
            <Text fontSize="10px" fontWeight={isActive ? "bold" : "medium"}>
              {item.name}
            </Text>
          </Flex>
        );
      })}

      {/* Logout Button */}
      <Flex
        as="button"
        direction="column"
        align="center"
        justify="center"
        w="full"
        h="full"
        color="gray.400"
        _hover={{ color: "red.500" }}
        onClick={handleLogout}
      >
        <Icon as={FaSignOutAlt} boxSize={6} mb={1} />
        <Text fontSize="10px" fontWeight="medium">
          Sign Out
        </Text>
      </Flex>
    </Flex>
  );
}
