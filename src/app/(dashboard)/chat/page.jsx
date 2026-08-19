"use client";

import { useState, useEffect } from "react";
import {
  Box, Container, VStack, Heading, Text, Flex,
  Image, Badge, Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaComment, FaCircle } from "react-icons/fa";
import { getConversations } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { formatDistanceToNow } from "date-fns";

const MotionBox = motion(Box);

function ConversationItem({ conversation, currentUserId, index }) {
  const other = conversation.participants?.find(
    (p) => p._id !== currentUserId
  );

  const timeAgo = conversation.lastMessageAt
    ? formatDistanceToNow(new Date(conversation.lastMessageAt), { addSuffix: true })
    : "";

  return (
    <MotionBox
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07 }}
      as="a"
      href={`/chat/${conversation._id}`}
      display="block"
      bg="white"
      rounded="xl"
      shadow="sm"
      border="1px solid"
      borderColor="gray.100"
      p={4}
      _hover={{ shadow: "md", borderColor: "#ff0036", transform: "translateX(4px)" }}
      transition="all 0.2s"
      cursor="pointer"
    >
      <Flex gap={4} align="center">
        <Box position="relative" flexShrink={0}>
          <Image
            src={other?.avatar || `https://ui-avatars.com/api/?name=${other?.name}&background=ff0036&color=fff`}
            alt={other?.name}
            w="52px" h="52px" rounded="full" objectFit="cover"
          />
          <Box
            position="absolute" bottom={0} right={0}
            w="12px" h="12px" rounded="full" bg="green.400"
            border="2px solid white"
          />
        </Box>

        <Box flex={1} minW={0}>
          <Flex justify="space-between" align="center">
            <Heading size="sm" color="gray.900">{other?.name || "User"}</Heading>
            <Text fontSize="xs" color="gray.400">{timeAgo}</Text>
          </Flex>
          <Text
            fontSize="sm" color="gray.500" mt={0.5}
            noOfLines={1} overflow="hidden" textOverflow="ellipsis"
          >
            {conversation.lastMessageText || "Start a conversation..."}
          </Text>
        </Box>

        <Box color="gray.300" flexShrink={0}>
          <FaComment />
        </Box>
      </Flex>
    </MotionBox>
  );
}

export default function ChatPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    getConversations()
      .then((data) => setConversations(data.conversations || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

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
        title="Messages"
        description="Chat with your connections — matched pairs can talk here."
      />

      <Container maxW="2xl" mt={10}>
        {conversations.length === 0 ? (
          <Box textAlign="center" py={20}>
            <Text fontSize="5xl" mb={4}>💬</Text>
            <Heading size="md" color="gray.600" mb={2}>No conversations yet</Heading>
            <Text color="gray.400" mb={6}>
              Accept or receive an interest to start chatting with someone.
            </Text>
            <Box as="a" href="/interests" display="inline-block"
              bg="#ff0036" color="white" px={6} py={3} rounded="xl"
              fontWeight="bold" _hover={{ bg: "#d4002d" }}
            >
              View Interests
            </Box>
          </Box>
        ) : (
          <VStack gap={3} align="stretch">
            <Text fontSize="sm" color="gray.500" mb={2}>
              {conversations.length} active conversation{conversations.length !== 1 ? "s" : ""}
            </Text>
            {conversations.map((conv, i) => (
              <ConversationItem
                key={conv._id}
                conversation={conv}
                currentUserId={user._id}
                index={i}
              />
            ))}
          </VStack>
        )}
      </Container>
    </Box>
  );
}
