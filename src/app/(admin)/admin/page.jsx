"use client";

import { useState, useEffect } from "react";
import {
  Box, Container, VStack, Heading, Text, Input, Button, Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaLock, FaEnvelope, FaShieldAlt } from "react-icons/fa";
import { adminLogin, getAdminToken } from "@/lib/api";
import { useRouter } from "next/navigation";

const MotionBox = motion(Box);

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (getAdminToken()) router.push("/admin/dashboard");
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminLogin(email, password);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Invalid admin credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        w="full"
        maxW="420px"
      >
        {/* Logo/Header */}
        <VStack mb={8} textAlign="center">
          <MotionBox
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <Box
              w="72px" h="72px" rounded="2xl"
              bg="linear-gradient(135deg, #ff0036, #d4002d)"
              display="flex" alignItems="center" justifyContent="center"
              shadow="0 0 30px rgba(255,0,54,0.4)"
              mx="auto" mb={4}
            >
              <FaShieldAlt color="white" size={30} />
            </Box>
          </MotionBox>
          <Heading color="white" size="xl" fontWeight="800">
            Admin Portal
          </Heading>
          <Text color="rgba(255,255,255,0.6)" fontSize="sm">
            Afro Faith Match — Superadmin Access
          </Text>
        </VStack>

        {/* Card */}
        <Box
          as="form"
          onSubmit={handleSubmit}
          bg="rgba(255,255,255,0.05)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(255,255,255,0.1)"
          rounded="2xl"
          p={8}
        >
          <VStack gap={5}>
            {error && (
              <Box
                w="full" p={3}
                bg="rgba(255,0,54,0.15)"
                border="1px solid rgba(255,0,54,0.3)"
                color="#ff6b8a"
                rounded="lg"
                fontSize="sm"
              >
                {error}
              </Box>
            )}

            <Box w="full">
              <Text mb={2} fontSize="sm" fontWeight="medium" color="rgba(255,255,255,0.8)">
                Admin Email
              </Text>
              <Flex
                align="center"
                bg="rgba(255,255,255,0.08)"
                border="1px solid rgba(255,255,255,0.15)"
                rounded="lg"
                _focusWithin={{ borderColor: "#ff0036", bg: "rgba(255,0,54,0.1)" }}
                transition="all 0.2s"
              >
                <Box pl={4} pr={2} color="rgba(255,255,255,0.4)"><FaEnvelope /></Box>
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  border="none"
                  bg="transparent"
                  color="white"
                  _placeholder={{ color: "rgba(255,255,255,0.3)" }}
                  _focus={{ boxShadow: "none" }}
                  required
                />
              </Flex>
            </Box>

            <Box w="full">
              <Text mb={2} fontSize="sm" fontWeight="medium" color="rgba(255,255,255,0.8)">
                Password
              </Text>
              <Flex
                align="center"
                bg="rgba(255,255,255,0.08)"
                border="1px solid rgba(255,255,255,0.15)"
                rounded="lg"
                _focusWithin={{ borderColor: "#ff0036", bg: "rgba(255,0,54,0.1)" }}
                transition="all 0.2s"
              >
                <Box pl={4} pr={2} color="rgba(255,255,255,0.4)"><FaLock /></Box>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  border="none"
                  bg="transparent"
                  color="white"
                  _placeholder={{ color: "rgba(255,255,255,0.3)" }}
                  _focus={{ boxShadow: "none" }}
                  required
                />
              </Flex>
            </Box>

            <Button
              type="submit"
              w="full"
              size="lg"
              py={7}
              bg="linear-gradient(135deg, #ff0036, #d4002d)"
              color="white"
              fontWeight="700"
              loading={loading}
              loadingText="Authenticating..."
              _hover={{
                transform: "translateY(-2px)",
                shadow: "0 8px 24px rgba(255,0,54,0.4)",
              }}
              transition="all 0.2s"
              shadow="0 4px 14px rgba(255,0,54,0.3)"
            >
              Sign In to Admin Panel
            </Button>
          </VStack>
        </Box>

        <Text textAlign="center" color="rgba(255,255,255,0.3)" fontSize="xs" mt={6}>
          🔒 Restricted access — authorised personnel only
        </Text>
      </MotionBox>
    </Box>
  );
}
