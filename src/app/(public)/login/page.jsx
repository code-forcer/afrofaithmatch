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
  IconButton,
} from "@chakra-ui/react";
import { FaEnvelope, FaLock, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// Shared field wrapper so every input is styled identically and stays
// touch-friendly (48px target, 16px font to stop iOS auto-zoom on focus)
function FieldRow({ label, icon, rightElement, ...inputProps }) {
  return (
    <Box w="full">
      <Text mb={2} fontWeight="medium" fontSize="sm" color="gray.700">
        {label}
      </Text>
      <Flex
        align="center"
        w="full"
        bg="gray.50"
        rounded="lg"
        border="1px solid"
        borderColor="gray.200"
        _focusWithin={{ borderColor: "#ff0036", bg: "white" }}
        transition="all 0.2s"
      >
        <Box pl={4} pr={2} color="gray.400" flexShrink={0}>
          {icon}
        </Box>
        <Input
          {...inputProps}
          border="none"
          bg="transparent"
          flex={1}
          h={12}
          fontSize="16px"
          _focus={{ boxShadow: "none", outline: "none" }}
        />
        {rightElement && (
          <Box pr={2} flexShrink={0}>
            {rightElement}
          </Box>
        )}
      </Flex>
    </Box>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      router.push("/browse");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      bg="gray.50"
      minH="100dvh"
      // clears the fixed/sticky site navbar — falls back to 88px if the
      // layout doesn't define --header-height as a CSS custom property
      pt={{ base: "calc(env(safe-area-inset-top, 0px) + var(--header-height, 88px))", md: "calc(var(--header-height, 96px) + 24px)" }}
      // extra bottom room on mobile so the mobile bottom nav / home-indicator
      // never overlaps the submit button or register link
      pb={{ base: "calc(env(safe-area-inset-bottom, 0px) + 96px)", md: 20 }}
    >
      <Container maxW="md" px={{ base: 4, md: 6 }}>
        <VStack gap={{ base: 6, md: 8 }}>
          {/* Header */}
          <VStack gap={2} textAlign="center" px={2}>
            <Heading size={{ base: "lg", md: "xl" }} color="gray.800" lineHeight="1.3">
              Welcome Back
            </Heading>
            <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>
              Log in to connect with Christian singles globally.
            </Text>
          </VStack>

          {/* Form Card */}
          <Box
            as="form"
            onSubmit={handleSubmit}
            w="full"
            bg="white"
            p={{ base: 5, md: 8 }}
            rounded={{ base: "xl", md: "2xl" }}
            shadow="lg"
            border="1px solid"
            borderColor="gray.100"
          >
            <VStack gap={4}>
              {/* Error */}
              {error && (
                <Box
                  w="full"
                  p={3}
                  bg="red.50"
                  color="red.600"
                  rounded="lg"
                  fontSize="sm"
                  fontWeight="medium"
                  role="alert"
                >
                  {error}
                </Box>
              )}

              <FieldRow
                label="Email Address"
                icon={<FaEnvelope />}
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                inputMode="email"
                required
              />

              <FieldRow
                label="Password"
                icon={<FaLock />}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                rightElement={
                  <IconButton
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((s) => !s)}
                    variant="ghost"
                    size="sm"
                    color="gray.400"
                    minW={8}
                    h={8}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                }
              />

              {/* Forgot password */}
              <Flex w="full" justify="flex-end" mt={-2}>
                <Box
                  as="a"
                  href="/forgot-password"
                  fontSize="sm"
                  color="#ff0036"
                  fontWeight="medium"
                  _hover={{ textDecoration: "underline" }}
                >
                  Forgot password?
                </Box>
              </Flex>

              {/* Submit */}
              <Button
                type="submit"
                w="full"
                size="lg"
                bg="#ff0036"
                color="white"
                _hover={{ bg: "#d4002d", transform: "translateY(-1px)" }}
                _active={{ bg: "#b8002a" }}
                transition="all 0.2s"
                h={14}
                mt={2}
                disabled={loading}
                loading={loading}
              >
                {loading ? "Logging in..." : "Log In"}
                {!loading && (
                  <Box ml={2}>
                    <FaArrowRight />
                  </Box>
                )}
              </Button>

              {/* Register Link */}
              <Text fontSize="sm" color="gray.600" pb={1}>
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