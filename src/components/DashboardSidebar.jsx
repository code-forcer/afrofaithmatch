"use client";

import { Box, VStack, Flex, Text, Icon, Image } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { FaUserFriends, FaHeart, FaCommentDots, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const navItems = [
  { name: "Browse Profiles", href: "/browse", icon: FaUserFriends },
  { name: "Interests", href: "/interests", icon: FaHeart },
  { name: "Messages", href: "/chat", icon: FaCommentDots },
  { name: "My Profile", href: "/profile", icon: FaUserAlt },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Flex direction="column" h="full" py={6}>
      {/* Brand */}
      <Box px={6} mb={10}>
        <Link href="/browse">
          <Image
            src="/logo/logo.svg"
            alt="Afro Faith Match"
            h="40px"
            objectFit="contain"
          />
        </Link>
      </Box>

      {/* Nav Items */}
      <VStack align="stretch" spacing={2} px={4} flex={1}>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.name} href={item.href} passHref legacyBehavior>
              <Box
                as="a"
                display="flex"
                alignItems="center"
                px={4}
                py={3}
                rounded="lg"
                color={isActive ? "#ff0036" : "gray.600"}
                bg={isActive ? "red.50" : "transparent"}
                fontWeight={isActive ? "bold" : "medium"}
                _hover={{ bg: isActive ? "red.50" : "gray.50", color: isActive ? "#ff0036" : "gray.900" }}
                transition="all 0.2s"
              >
                <Icon as={item.icon} boxSize={5} mr={4} />
                <Text>{item.name}</Text>
              </Box>
            </Link>
          );
        })}
      </VStack>

      {/* User Info & Logout */}
      <Box px={4}>
        <Box borderBottom="1px solid" borderColor="gray.100" mb={4} />
        {user && (
          <Flex align="center" px={4} mb={4}>
            <Box
              w="40px" h="40px" rounded="full" overflow="hidden" bg="gray.200" mr={3} flexShrink={0}
              border="2px solid" borderColor="gray.100"
            >
              <Image
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=ff0036&color=fff`}
                alt={user.name}
                w="full" h="full" objectFit="cover"
              />
            </Box>
            <Box overflow="hidden">
              <Text fontWeight="bold" fontSize="sm" color="gray.800" isTruncated>{user.name}</Text>
              <Text fontSize="xs" color="gray.500" isTruncated>{user.email}</Text>
            </Box>
          </Flex>
        )}
        <Box
          as="button"
          onClick={handleLogout}
          display="flex"
          alignItems="center"
          w="full"
          px={4}
          py={3}
          rounded="lg"
          color="gray.600"
          fontWeight="medium"
          _hover={{ bg: "red.50", color: "#ff0036" }}
          transition="all 0.2s"
        >
          <Icon as={FaSignOutAlt} boxSize={5} mr={4} />
          <Text>Log out</Text>
        </Box>
      </Box>
    </Flex>
  );
}
