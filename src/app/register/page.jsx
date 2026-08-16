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
    <Box bg={{ base: "gray.50", _dark: "gray.900" }} minH="100vh" py={{ base: 10, md: 20 }}>
      <Container maxW="md">
        <VStack spacing={8}>

          {/* Header */}
          <VStack spacing={2} textAlign="center">
            <Heading size="xl" color={{ base: "gray.800", _dark: "white" }}>
              Join the Community
            </Heading>
            <Text color={{ base: "gray.600", _dark: "gray.400" }}>
              Create your account to start sharing your stories.
            </Text>
          </VStack>

          {/* Form Card */}
          <Box
            as="form"
            onSubmit={handleSubmit}
            w="full"
            bg={{ base: "white", _dark: "gray.800" }}
            p={{ base: 6, md: 8 }}
            rounded="2xl"
            shadow="lg"
            border="1px solid"
            borderColor={{ base: "gray.100", _dark: "gray.700" }}
          >
            <VStack spacing={5}>

              {/* Error */}
              {error && (
                <Box w="full" p={3} bg="red.50" color="red.600" rounded="lg" fontSize="sm" fontWeight="medium">
                  {error}
                </Box>
              )}

              {/* Name */}
              <Box w="full">
                <Text mb={2} fontWeight="medium" fontSize="sm" color={{ base: "gray.700", _dark: "gray.300" }}>
                  Your Name
                </Text>
                <Flex
                  align="center"
                  bg={{ base: "gray.50", _dark: "gray.700" }}
                  rounded="lg"
                  border="1px solid"
                  borderColor={{ base: "gray.200", _dark: "gray.600" }}
                  _focusWithin={{ borderColor: "blue.400" }}
                  transition="all 0.2s"
                >
                  <Box pl={4} color="gray.400"><FaUser /></Box>
                  <Input
                    type="text"
                    placeholder="e.g., Leke"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    border="none"
                    _focus={{ boxShadow: "none" }}
                    required
                  />
                </Flex>
              </Box>

              {/* Email */}
              <Box w="full">
                <Text mb={2} fontWeight="medium" fontSize="sm" color={{ base: "gray.700", _dark: "gray.300" }}>
                  Email Address
                </Text>
                <Flex
                  align="center"
                  bg={{ base: "gray.50", _dark: "gray.700" }}
                  rounded="lg"
                  border="1px solid"
                  borderColor={{ base: "gray.200", _dark: "gray.600" }}
                  _focusWithin={{ borderColor: "blue.400" }}
                  transition="all 0.2s"
                >
                  <Box pl={4} color="gray.400"><FaEnvelope /></Box>
                  <Input
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    border="none"
                    _focus={{ boxShadow: "none" }}
                    required
                  />
                </Flex>
              </Box>

              {/* Password */}
              <Box w="full">
                <Text mb={2} fontWeight="medium" fontSize="sm" color={{ base: "gray.700", _dark: "gray.300" }}>
                  Password
                </Text>
                <Flex
                  align="center"
                  bg={{ base: "gray.50", _dark: "gray.700" }}
                  rounded="lg"
                  border="1px solid"
                  borderColor={{ base: "gray.200", _dark: "gray.600" }}
                  _focusWithin={{ borderColor: "blue.400" }}
                  transition="all 0.2s"
                >
                  <Box pl={4} color="gray.400"><FaLock /></Box>
                  <Input
                    type="password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    border="none"
                    _focus={{ boxShadow: "none" }}
                    required
                  />
                </Flex>
              </Box>

              {/* Confirm Password */}
              <Box w="full">
                <Text mb={2} fontWeight="medium" fontSize="sm" color={{ base: "gray.700", _dark: "gray.300" }}>
                  Confirm Password
                </Text>
                <Flex
                  align="center"
                  bg={{ base: "gray.50", _dark: "gray.700" }}
                  rounded="lg"
                  border="1px solid"
                  borderColor={{ base: "gray.200", _dark: "gray.600" }}
                  _focusWithin={{ borderColor: "blue.400" }}
                  transition="all 0.2s"
                >
                  <Box pl={4} color="gray.400"><FaLock /></Box>
                  <Input
                    type="password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    border="none"
                    _focus={{ boxShadow: "none" }}
                    required
                  />
                </Flex>
              </Box>

              {/* Submit */}
              <Button
                type="submit"
                w="full"
                size="lg"
                bg="blue.500"
                color="white"
                _hover={{ bg: "blue.600", transform: "translateY(-1px)" }}
                transition="all 0.2s"
                py={7}
                disabled={loading}
                loading={loading}
              >
                {loading ? "Creating Account..." : "Create Account"} <Box ml={2}><FaArrowRight /></Box>
              </Button>

              {/* Login Link */}
              <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.400" }}>
                Already have an account?{" "}
                <Box
                  as="a"
                  href="/login"
                  color="blue.500"
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
