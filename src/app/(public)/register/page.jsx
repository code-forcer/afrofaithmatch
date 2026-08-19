"use client";

import { useState, useEffect } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const MotionBox = motion(Box);
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// Shared field wrapper so every input is styled identically and stays
// touch-friendly (44px+ target, 16px font to stop iOS auto-zoom on focus)
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

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  // After showing the success toast for 2.5 s, redirect to /login
  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => router.push("/login"), 2500);
    return () => clearTimeout(timer);
  }, [success, router]);

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
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Success Toast ─────────────────────────────────────────── */}
      <AnimatePresence>
        {success && (
          <MotionBox
            key="success-toast"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            position="fixed"
            bottom={{ base: 6, md: 8 }}
            left="50%"
            transform="translateX(-50%)"
            zIndex={9999}
            bg="white"
            border="1px solid"
            borderColor="green.200"
            shadow="2xl"
            rounded="2xl"
            px={6}
            py={4}
            display="flex"
            alignItems="center"
            gap={4}
            minW="300px"
            maxW="90vw"
          >
            {/* Animated check icon */}
            <MotionBox
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              color="green.500"
              fontSize="28px"
              flexShrink={0}
            >
              <FaCheckCircle />
            </MotionBox>

            <Box>
              <Text fontWeight="700" color="gray.900" fontSize="sm">
                Account created! 🎉
              </Text>
              <Text fontSize="xs" color="gray.500">
                Redirecting you to login…
              </Text>
            </Box>

            {/* Progress bar */}
            <MotionBox
              position="absolute"
              bottom={0}
              left={0}
              h="3px"
              bg="green.400"
              rounded="full"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 2.5, ease: "linear" }}
            />
          </MotionBox>
        )}
      </AnimatePresence>

      <Box
      bg="gray.50"
      minH="100dvh"
      // clears the fixed/sticky site navbar — falls back to 88px if the
      // layout doesn't define --header-height as a CSS custom property
      pt={{ base: "calc(env(safe-area-inset-top, 0px) + var(--header-height, 88px))", md: "calc(var(--header-height, 96px) + 24px)" }}
      pb={{ base: "calc(env(safe-area-inset-bottom, 0px) + 96px)", md: 20 }}
    >
      <Container maxW="md" px={{ base: 4, md: 6 }}>
        <VStack gap={{ base: 6, md: 8 }}>
          {/* Header */}
          <VStack gap={2} textAlign="center" px={2}>
            <Heading size={{ base: "lg", md: "xl" }} color="gray.800" lineHeight="1.3">
              Join Afro Faith Match
            </Heading>
            <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>
              Create your account to start meeting Christian singles.
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
                label="Your Name"
                icon={<FaUser />}
                type="text"
                placeholder="e.g., Leke"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />

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
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
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

              <FieldRow
                label="Confirm Password"
                icon={<FaLock />}
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
                rightElement={
                  <IconButton
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    onClick={() => setShowConfirm((s) => !s)}
                    variant="ghost"
                    size="sm"
                    color="gray.400"
                    minW={8}
                    h={8}
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                }
              />

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
                {loading ? "Creating Account..." : "Create Account"}
                {!loading && (
                  <Box ml={2}>
                    <FaArrowRight />
                  </Box>
                )}
              </Button>

              {/* Login Link */}
              <Text fontSize="sm" color="gray.600" pb={1}>
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
    </>
  );
}