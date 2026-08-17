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
} from "@chakra-ui/react";
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password);
      router.push("/");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
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
              Join Afro Faith Match
            </Heading>
            <Text color="gray.600">
              Create your account to start meeting Christian singles.
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

              {/* Name */}
              <Box w="full">
                <Text mb={2} fontWeight="medium" fontSize="sm" color="gray.700">
                  Your Name
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
                  <Box pl={4} pr={2} color="gray.400"><FaUser /></Box>
                  <Input
                    type="text"
                    placeholder="e.g., Leke"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    border="none"
                    bg="transparent"
                    flex={1}
                    _focus={{ boxShadow: "none", outline: "none" }}
                    required
                  />
                </Flex>
              </Box>

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
                    placeholder="At least 6 characters"
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

              {/* Confirm Password */}
              <Box w="full">
                <Text mb={2} fontWeight="medium" fontSize="sm" color="gray.700">
                  Confirm Password
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
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                {loading ? "Creating Account..." : "Create Account"} <Box ml={2}><FaArrowRight /></Box>
              </Button>

              {/* Login Link */}
              <Text fontSize="sm" color="gray.600">
                Already have an account?{" "}
                <Box
                  as="a"
                  href="/login"
                  color="#ff0036"
                  fontWeight="bold"
                  _hover={{ textDecoration: "underline" }}
                >
                  Log in
                </Box>
              </Text>

            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
