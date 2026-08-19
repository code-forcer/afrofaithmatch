"use client";

import { useState, useEffect, Suspense } from "react";
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
  Spinner,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { resetPassword } from "@/lib/api";
import { useSearchParams, useRouter } from "next/navigation";

const MotionBox = motion(Box);

// ── Password strength indicator ─────────────────────────────────────
function StrengthBar({ password }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;

  const colors = ["red.300", "orange.400", "yellow.400", "green.500"];
  const labels = ["Weak", "Fair", "Good", "Strong"];

  if (!password) return null;

  return (
    <Box w="full" mt={1}>
      <Flex gap={1} mb={1}>
        {[0, 1, 2, 3].map((i) => (
          <Box
            key={i}
            flex={1}
            h="3px"
            rounded="full"
            bg={i < score ? colors[score - 1] : "gray.200"}
            transition="background 0.3s"
          />
        ))}
      </Flex>
      <Text fontSize="10px" color={`${colors[score - 1]?.split(".")[0]}.500`}>
        {score > 0 ? labels[score - 1] : ""}
      </Text>
    </Box>
  );
}

function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  // No token in URL — show error immediately
  const invalidToken = !token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, password);
      setDone(true);
      // Auto-redirect to login after 3 seconds
      setTimeout(() => router.push("/login"), 3000);
    } catch (err) {
      setError(err.message || "Reset failed. The link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  // ── Invalid / missing token ────────────────────────────────────────
  if (invalidToken) {
    return (
      <Box textAlign="center" py={8}>
        <Box color="orange.400" fontSize="48px" mb={4} display="flex" justifyContent="center">
          <FaExclamationTriangle />
        </Box>
        <Heading size="md" color="gray.800" mb={2}>Invalid Reset Link</Heading>
        <Text color="gray.500" fontSize="sm" lineHeight="1.7" mb={6}>
          This password reset link is invalid or missing. Please request a new one.
        </Text>
        <Button
          as="a" href="/forgot-password"
          bg="#ff0036" color="white" h={12} px={8}
          fontWeight="700" rounded="lg"
          _hover={{ bg: "#d4002d" }}
        >
          Request New Link
        </Button>
      </Box>
    );
  }

  // ── Success state ──────────────────────────────────────────────────
  if (done) {
    return (
      <MotionBox
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        textAlign="center"
        py={6}
      >
        <MotionBox
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 0.5, delay: 0.1 }}
          display="inline-flex"
          mb={4}
        >
          <Box color="green.500" fontSize="52px">
            <FaCheckCircle />
          </Box>
        </MotionBox>
        <Heading size="md" color="gray.800" mb={2}>Password Reset!</Heading>
        <Text color="gray.500" fontSize="sm" mb={2}>
          Your password has been updated successfully.
        </Text>
        <Text color="gray.400" fontSize="xs" mb={6}>
          Redirecting you to login in 3 seconds...
        </Text>
        <Button
          as="a" href="/login"
          w="full" h={12}
          bg="#ff0036" color="white"
          fontWeight="700" rounded="lg"
          _hover={{ bg: "#d4002d" }}
        >
          Go to Login Now
        </Button>
      </MotionBox>
    );
  }

  // ── Reset form ─────────────────────────────────────────────────────
  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack gap={4}>

        {/* Error */}
        {error && (
          <Box
            w="full" p={3}
            bg="red.50" color="red.600"
            rounded="lg" fontSize="sm"
            fontWeight="medium"
            role="alert"
          >
            {error}
          </Box>
        )}

        {/* New Password */}
        <Box w="full">
          <Text mb={2} fontWeight="medium" fontSize="sm" color="gray.700">
            New Password
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
            <Box pl={4} pr={2} color="gray.400" flexShrink={0}><FaLock /></Box>
            <Input
              type={showPw ? "text" : "password"}
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              border="none" bg="transparent" flex={1}
              h={12} fontSize="16px"
              autoComplete="new-password"
              _focus={{ boxShadow: "none", outline: "none" }}
              required
            />
            <Box pr={2} flexShrink={0}>
              <IconButton
                aria-label={showPw ? "Hide password" : "Show password"}
                onClick={() => setShowPw((s) => !s)}
                variant="ghost" size="sm"
                color="gray.400" minW={8} h={8}
              >
                {showPw ? <FaEyeSlash /> : <FaEye />}
              </IconButton>
            </Box>
          </Flex>
          <StrengthBar password={password} />
        </Box>

        {/* Confirm Password */}
        <Box w="full">
          <Text mb={2} fontWeight="medium" fontSize="sm" color="gray.700">
            Confirm New Password
          </Text>
          <Flex
            align="center"
            w="full"
            bg="gray.50"
            rounded="lg"
            border="1px solid"
            borderColor={
              confirm && confirm !== password ? "red.300" :
              confirm && confirm === password ? "green.400" :
              "gray.200"
            }
            _focusWithin={{ borderColor: "#ff0036", bg: "white" }}
            transition="all 0.2s"
          >
            <Box pl={4} pr={2} color="gray.400" flexShrink={0}><FaLock /></Box>
            <Input
              type={showConfirm ? "text" : "password"}
              placeholder="Repeat your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              border="none" bg="transparent" flex={1}
              h={12} fontSize="16px"
              autoComplete="new-password"
              _focus={{ boxShadow: "none", outline: "none" }}
              required
            />
            <Box pr={2} flexShrink={0}>
              <IconButton
                aria-label={showConfirm ? "Hide password" : "Show password"}
                onClick={() => setShowConfirm((s) => !s)}
                variant="ghost" size="sm"
                color="gray.400" minW={8} h={8}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </IconButton>
            </Box>
          </Flex>
          {/* Match feedback */}
          {confirm && (
            <Text fontSize="xs" mt={1} color={confirm === password ? "green.500" : "red.400"}>
              {confirm === password ? "✓ Passwords match" : "✗ Passwords do not match"}
            </Text>
          )}
        </Box>

        {/* Password requirements */}
        <Box w="full" bg="gray.50" rounded="lg" p={3}>
          <Text fontSize="xs" color="gray.500" mb={1.5} fontWeight="medium">
            Password requirements:
          </Text>
          {[
            { label: "At least 6 characters", met: password.length >= 6 },
            { label: "One uppercase letter (A–Z)", met: /[A-Z]/.test(password) },
            { label: "One number (0–9)", met: /[0-9]/.test(password) },
          ].map(({ label, met }) => (
            <Flex key={label} align="center" gap={2} mb={0.5}>
              <Box color={met ? "green.500" : "gray.300"} fontSize="11px">●</Box>
              <Text fontSize="xs" color={met ? "green.600" : "gray.400"}>{label}</Text>
            </Flex>
          ))}
        </Box>

        {/* Submit */}
        <Button
          type="submit"
          w="full"
          h={14}
          mt={1}
          bg="#ff0036"
          color="white"
          fontWeight="700"
          loading={loading}
          loadingText="Resetting..."
          disabled={!password || password !== confirm}
          _hover={{ bg: "#d4002d", transform: "translateY(-1px)" }}
          _active={{ bg: "#b8002a" }}
          _disabled={{ opacity: 0.5, cursor: "not-allowed", transform: "none" }}
          transition="all 0.2s"
          shadow="md"
        >
          Reset Password
        </Button>

      </VStack>
    </Box>
  );
}

export default function ResetPasswordPage() {
  return (
    <Box
      bg="gray.50"
      minH="100dvh"
      pt={{ base: "calc(env(safe-area-inset-top,0px) + var(--header-height,88px))", md: "calc(var(--header-height,96px) + 24px)" }}
      pb={{ base: "calc(env(safe-area-inset-bottom,0px) + 96px)", md: 20 }}
    >
      <Container maxW="md" px={{ base: 4, md: 6 }}>
        <VStack gap={{ base: 6, md: 8 }}>

          {/* Header */}
          <VStack gap={2} textAlign="center" px={2}>
            <Heading size={{ base: "lg", md: "xl" }} color="gray.800" lineHeight="1.3">
              Choose a New Password
            </Heading>
            <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>
              Make it strong and memorable.
            </Text>
          </VStack>

          {/* Card */}
          <Box
            w="full"
            bg="white"
            p={{ base: 5, md: 8 }}
            rounded={{ base: "xl", md: "2xl" }}
            shadow="lg"
            border="1px solid"
            borderColor="gray.100"
          >
            <Suspense fallback={
              <Flex justify="center" py={10}>
                <Spinner size="lg" color="#ff0036" />
              </Flex>
            }>
              <ResetForm />
            </Suspense>
          </Box>

          {/* Faith note */}
          <Text fontSize="xs" color="gray.400" textAlign="center" px={4}>
            "For I know the plans I have for you." — Jeremiah 29:11
          </Text>

        </VStack>
      </Container>
    </Box>
  );
}
