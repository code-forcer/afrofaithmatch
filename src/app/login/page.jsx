"use client";

import { useState } from "react";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg="gray.50" minH="100vh" py={{ base: 10, md: 20 }}>
      <Container maxW="md">
        <VStack gap={8}>

          {/* Header */}
          <VStack gap={2} textAlign="center">
            <Heading size="xl" color="gray.800">
              Welcome Back
            </Heading>
            <Text color="gray.600">
              Log in to connect with Christian singles globally.
            </Text>
          </VStack>

          {/* Form Card */}
          <Box
            as="form"
            onSubmit={handleSubmit}
            w="full"
            bg="white"
            p={{ base: 6, md: 8 }}
            rounded="2xl"
            shadow="lg"
            border="1px solid"
            borderColor="gray.100"
          >
            <VStack gap={5}>

              {/* Error */}
              {error && (
                <Box w="full" p={3} bg="red.50" color="red.600" rounded="lg" fontSize="sm" fontWeight="medium">
                  {error}
                </Box>
              )}

              {/* Email */}
              <Box w="full">
                <Text mb={2} fontWeight="medium" fontSize="sm" color="gray.700">
                  Email Address
                </Text>
                <Flex
                  align="center"
                  w="full"
                  bg="gray.50"
                  rounded="lg"
                  border="1px solid"
                  borderColor="gray.200"
                  _focusWithin={{ borderColor: "#ff0036" }}
                  transition="all 0.2s"
                >
                  <Box pl={4} pr={2} color="gray.400"><FaEnvelope /></Box>
                  <Input
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    border="none"
                    bg="transparent"
                    flex={1}
                    _focus={{ boxShadow: "none", outline: "none" }}
                    required
                  />
                </Flex>
              </Box>

              {/* Password */}
              <Box w="full">
                <Text mb={2} fontWeight="medium" fontSize="sm" color="gray.700">
                  Password
                </Text>
                <Flex
                  align="center"
                  w="full"
                  bg="gray.50"
                  rounded="lg"
                  border="1px solid"
                  borderColor="gray.200"
                  _focusWithin={{ borderColor: "#ff0036" }}
                  transition="all 0.2s"
                >
                  <Box pl={4} pr={2} color="gray.400"><FaLock /></Box>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    border="none"
                    bg="transparent"
                    flex={1}
                    _focus={{ boxShadow: "none", outline: "none" }}
                    required
                  />
                </Flex>
              </Box>

              {/* Submit */}
              <Button
                type="submit"
                w="full"
                size="lg"
                bg="#ff0036"
                color="white"
                _hover={{ bg: "#d4002d", transform: "translateY(-1px)" }}
                transition="all 0.2s"
                py={7}
                disabled={loading}
                loading={loading}
              >
                {loading ? "Logging in..." : "Log In"} <Box ml={2}><FaArrowRight /></Box>
              </Button>

              {/* Register Link */}
              <Text fontSize="sm" color="gray.600">
                Don't have an account?{" "}
                <Box
                  as="a"
                  href="/register"
                  color="#ff0036"
                  fontWeight="bold"
                  _hover={{ textDecoration: "underline" }}
                >
                  Create one
                </Box>
              </Text>

            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
