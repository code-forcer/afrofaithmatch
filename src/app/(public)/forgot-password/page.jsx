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
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { forgotPassword } from "@/lib/api";

const MotionBox = motion(Box);

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      bg="gray.50"
      minH="100dvh"
      pt={{ base: "calc(env(safe-area-inset-top,0px) + var(--header-height,88px))", md: "calc(var(--header-height,96px) + 24px)" }}
      pb={{ base: "calc(env(safe-area-inset-bottom,0px) + 96px)", md: 20 }}
    >
      <Container maxW="md" px={{ base: 4, md: 6 }}>
        <VStack gap={{ base: 6, md: 8 }}>

          {/* Back link */}
          <Box w="full">
            <Box
              as="a"
              href="/login"
              display="inline-flex"
              alignItems="center"
              gap={2}
              fontSize="sm"
              color="gray.500"
              _hover={{ color: "#ff0036" }}
              transition="color 0.2s"
            >
              <FaArrowLeft size={12} /> Back to Login
            </Box>
          </Box>

          {/* Header */}
          <VStack gap={2} textAlign="center" px={2}>
            <Heading size={{ base: "lg", md: "xl" }} color="gray.800" lineHeight="1.3">
              Reset Your Password
            </Heading>
            <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>
              Enter your email and we'll send you a reset link.
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
            <AnimatePresence mode="wait">
              {sent ? (
                /* ── Success state ── */
                <MotionBox
                  key="success"
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

                  <Heading size="md" color="gray.800" mb={2}>
                    Check your inbox!
                  </Heading>
                  <Text color="gray.500" fontSize="sm" lineHeight="1.7" mb={6}>
                    If <strong>{email}</strong> is registered with us, you'll receive a
                    password reset link within a few minutes. Check your spam folder if
                    you don't see it.
                  </Text>
                  <Text fontSize="xs" color="gray.400" mb={6}>
                    The link expires in <strong>10 minutes</strong>.
                  </Text>

                  <Button
                    as="a"
                    href="/login"
                    w="full"
                    h={12}
                    bg="#ff0036"
                    color="white"
                    fontWeight="700"
                    rounded="lg"
                    _hover={{ bg: "#d4002d" }}
                    transition="all 0.2s"
                  >
                    Back to Login
                  </Button>
                </MotionBox>
              ) : (
                /* ── Form state ── */
                <MotionBox
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
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

                      {/* Email field */}
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
                          _focusWithin={{ borderColor: "#ff0036", bg: "white" }}
                          transition="all 0.2s"
                        >
                          <Box pl={4} pr={2} color="gray.400" flexShrink={0}>
                            <FaEnvelope />
                          </Box>
                          <Input
                            type="email"
                            placeholder="you@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            border="none"
                            bg="transparent"
                            flex={1}
                            h={12}
                            fontSize="16px"
                            autoComplete="email"
                            inputMode="email"
                            _focus={{ boxShadow: "none", outline: "none" }}
                            required
                          />
                        </Flex>
                      </Box>

                      {/* Submit */}
                      <Button
                        type="submit"
                        w="full"
                        h={14}
                        mt={2}
                        bg="#ff0036"
                        color="white"
                        fontWeight="700"
                        loading={loading}
                        loadingText="Sending link..."
                        _hover={{ bg: "#d4002d", transform: "translateY(-1px)" }}
                        _active={{ bg: "#b8002a" }}
                        transition="all 0.2s"
                        shadow="md"
                      >
                        Send Reset Link
                      </Button>

                      <Text fontSize="sm" color="gray.500" textAlign="center" pt={1}>
                        Remembered it?{" "}
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
                </MotionBox>
              )}
            </AnimatePresence>
          </Box>

          {/* Faith note */}
          <Text fontSize="xs" color="gray.400" textAlign="center" px={4}>
            "Call to me and I will answer you." — Jeremiah 33:3
          </Text>

        </VStack>
      </Container>
    </Box>
  );
}
