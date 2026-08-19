"use client";

import { useState, useEffect } from "react";
import {
  Box, Container, VStack, HStack, Heading, Text, Button, Flex,
  Image, Badge, SimpleGrid, Spinner, Tabs,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaTimes, FaCheck, FaMapMarkerAlt, FaInbox, FaPaperPlane } from "react-icons/fa";
import { getReceivedInterests, getSentInterests, acceptInterest, rejectInterest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";

const MotionBox = motion(Box);

function InterestCard({ interest, type, onAccept, onReject }) {
  const [acting, setActing] = useState(false);
  const otherUser = type === "received" ? interest.from : interest.to;

  const handleAccept = async () => {
    setActing(true);
    await onAccept(interest._id);
    setActing(false);
  };

  const handleReject = async () => {
    setActing(true);
    await onReject(interest._id);
    setActing(false);
  };

  const statusColor = {
    pending: "orange",
    accepted: "green",
    rejected: "red",
  }[interest.status] || "gray";

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      bg="white"
      rounded="2xl"
      shadow="sm"
      border="1px solid"
      borderColor="gray.100"
      overflow="hidden"
      _hover={{ shadow: "md", transform: "translateY(-2px)" }}
      transition="all 0.2s"
    >
      <Flex p={5} gap={4} align="center">
        <Box position="relative" flexShrink={0}>
          <Image
            src={otherUser?.avatar || "https://via.placeholder.com/60x60?text=" + (otherUser?.name?.[0] || "?")}
            alt={otherUser?.name}
            w="60px" h="60px" rounded="full" objectFit="cover"
            border="2px solid" borderColor="gray.100"
          />
          <Box
            position="absolute" bottom={0} right={0}
            w="14px" h="14px" rounded="full" bg="green.400"
            border="2px solid white"
          />
        </Box>

        <Box flex={1} minW={0}>
          <Heading size="sm" color="gray.900" noOfLines={1}>
            {otherUser?.name || "Unknown"}
          </Heading>
          {interest.message && (
            <Text fontSize="xs" color="gray.500" mt={1} noOfLines={2} fontStyle="italic">
              "{interest.message}"
            </Text>
          )}
          <Text fontSize="xs" color="gray.400" mt={1}>
            {new Date(interest.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </Text>
        </Box>

        <VStack gap={2} flexShrink={0}>
          {type === "received" && interest.status === "pending" ? (
            <>
              <Button
                size="sm"
                bg="green.500" color="white"
                onClick={handleAccept}
                loading={acting}
                _hover={{ bg: "green.600" }}
                rounded="full"
                px={4}
              >
                <FaCheck />
              </Button>
              <Button
                size="sm"
                bg="gray.100" color="gray.600"
                onClick={handleReject}
                loading={acting}
                _hover={{ bg: "red.100", color: "red.500" }}
                rounded="full"
                px={4}
              >
                <FaTimes />
              </Button>
            </>
          ) : (
            <Badge
              px={3} py={1.5} rounded="full" fontSize="xs" fontWeight="bold"
              colorScheme={statusColor}
              textTransform="capitalize"
            >
              {interest.status}
            </Badge>
          )}
        </VStack>
      </Flex>

      {/* View profile link */}
      <Box borderTop="1px solid" borderColor="gray.50" px={5} py={2.5}>
        <Button
          variant="ghost"
          size="xs"
          color="#ff0036"
          _hover={{ bg: "red.50" }}
          as="a"
          href={`/profile/${otherUser?._id}`}
        >
          View Profile →
        </Button>
        {interest.status === "accepted" && (
          <Button
            variant="ghost"
            size="xs"
            color="green.600"
            _hover={{ bg: "green.50" }}
            as="a"
            href="/chat"
            ml={2}
          >
            Open Chat →
          </Button>
        )}
      </Box>
    </MotionBox>
  );
}

export default function InterestsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("received");

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    Promise.all([getReceivedInterests(), getSentInterests()])
      .then(([receivedData, sentData]) => {
        setReceived(receivedData.interests || []);
        setSent(sentData.interests || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const handleAccept = async (id) => {
    await acceptInterest(id);
    setReceived((prev) =>
      prev.map((i) => (i._id === id ? { ...i, status: "accepted" } : i))
    );
  };

  const handleReject = async (id) => {
    await rejectInterest(id);
    setReceived((prev) =>
      prev.map((i) => (i._id === id ? { ...i, status: "rejected" } : i))
    );
  };

  const pendingCount = received.filter((i) => i.status === "pending").length;

  if (authLoading || loading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" color="#ff0036" />
      </Flex>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh" pb={20}>
      <PageHeader
        title="Interests"
        description="See who's interested in you, and manage connections."
      />

      <Container maxW="2xl" mt={10}>
        {/* Tabs */}
        <Flex
          bg="white" rounded="xl" p={1.5} shadow="sm"
          border="1px solid" borderColor="gray.100" mb={8}
        >
          {[
            { key: "received", label: "Received", icon: <FaInbox />, count: pendingCount },
            { key: "sent", label: "Sent", icon: <FaPaperPlane /> },
          ].map((tab) => (
            <Flex
              key={tab.key}
              flex={1}
              as="button"
              align="center"
              justify="center"
              gap={2}
              py={3}
              rounded="lg"
              bg={activeTab === tab.key ? "#ff0036" : "transparent"}
              color={activeTab === tab.key ? "white" : "gray.600"}
              fontWeight="semibold"
              fontSize="sm"
              onClick={() => setActiveTab(tab.key)}
              transition="all 0.2s"
              _hover={{ bg: activeTab === tab.key ? "#d4002d" : "gray.50" }}
            >
              {tab.icon}
              {tab.label}
              {tab.count > 0 && (
                <Badge bg="white" color="#ff0036" rounded="full" fontSize="10px" px={1.5} minW={5} textAlign="center">
                  {tab.count}
                </Badge>
              )}
            </Flex>
          ))}
        </Flex>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "received" ? (
            received.length === 0 ? (
              <MotionBox
                key="empty-received"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                textAlign="center" py={20}
              >
                <Text fontSize="4xl" mb={3}>💌</Text>
                <Heading size="md" color="gray.600" mb={2}>No interests yet</Heading>
                <Text color="gray.400">When someone sends you an interest, it'll appear here.</Text>
              </MotionBox>
            ) : (
              <VStack key="received-list" gap={4} align="stretch">
                {received.map((interest) => (
                  <InterestCard
                    key={interest._id}
                    interest={interest}
                    type="received"
                    onAccept={handleAccept}
                    onReject={handleReject}
                  />
                ))}
              </VStack>
            )
          ) : (
            sent.length === 0 ? (
              <MotionBox
                key="empty-sent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                textAlign="center" py={20}
              >
                <Text fontSize="4xl" mb={3}>🕊️</Text>
                <Heading size="md" color="gray.600" mb={2}>No sent interests</Heading>
                <Text color="gray.400" mb={6}>Browse profiles and send your first interest!</Text>
                <Button
                  as="a" href="/browse"
                  bg="#ff0036" color="white"
                  _hover={{ bg: "#d4002d" }}
                >
                  Browse Profiles
                </Button>
              </MotionBox>
            ) : (
              <VStack key="sent-list" gap={4} align="stretch">
                {sent.map((interest) => (
                  <InterestCard
                    key={interest._id}
                    interest={interest}
                    type="sent"
                    onAccept={() => {}}
                    onReject={() => {}}
                  />
                ))}
              </VStack>
            )
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}
