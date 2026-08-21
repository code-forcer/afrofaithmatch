"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Box, Flex, VStack, HStack, Heading, Text, Input, Button,
  Image, Spinner, IconButton,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaArrowLeft, FaSmile } from "react-icons/fa";
import { getMessages, sendMessage as restSendMessage } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import io from "socket.io-client";

const MotionBox = motion(Box);

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function MessageBubble({ message, isOwn, showAvatar }) {
  return (
    <Flex
      justify={isOwn ? "flex-end" : "flex-start"}
      gap={2}
      align="flex-end"
      mb={1}
    >
      {!isOwn && showAvatar && (
        <Image
          src={message.sender?.avatar || `https://ui-avatars.com/api/?name=${message.sender?.name}&background=ff0036&color=fff&size=32`}
          alt={message.sender?.name}
          w="32px" h="32px" rounded="full" objectFit="cover" flexShrink={0}
        />
      )}
      {!isOwn && !showAvatar && <Box w="32px" flexShrink={0} />}

      <MotionBox
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        maxW="70%"
        bg={isOwn ? "#ff0036" : "white"}
        color={isOwn ? "white" : "gray.800"}
        px={4}
        py={2.5}
        rounded="2xl"
        roundedBottomRight={isOwn ? "md" : "2xl"}
        roundedBottomLeft={isOwn ? "2xl" : "md"}
        shadow="sm"
        border={!isOwn ? "1px solid" : "none"}
        borderColor="gray.100"
      >
        <Text fontSize="sm" lineHeight="1.5">{message.text}</Text>
        <Text
          fontSize="10px"
          color={isOwn ? "rgba(255,255,255,0.7)" : "gray.400"}
          textAlign="right"
          mt={0.5}
        >
          {new Date(message.createdAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </MotionBox>
    </Flex>
  );
}

export default function ChatRoomPage() {
  const { id: conversationId } = useParams();
  const { user } = useAuth();
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [otherUser, setOtherUser] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Initialize Socket.IO
  useEffect(() => {
    if (!user || !conversationId) return;

    socketRef.current = io(API_URL, {
      auth: { userId: user._id },
      transports: ["websocket"],
    });

    socketRef.current.emit("join_conversation", { conversationId });

    socketRef.current.on("message_received", ({ message, conversationId: convId }) => {
      if (convId === conversationId) {
        setMessages((prev) => {
          // Prevent adding duplicate real messages
          if (prev.some(m => m._id === message._id)) return prev;

          // Replace optimistic message if it's from the current user
          const isOwn = message.sender?._id === user._id || message.sender === user._id;
          if (isOwn) {
            const tempIndex = prev.findIndex(m => m._id.toString().startsWith("temp-") && m.text === message.text);
            if (tempIndex !== -1) {
              const newArr = [...prev];
              newArr[tempIndex] = message;
              return newArr;
            }
          }

          return [...prev, message];
        });
        scrollToBottom();
      }
    });

    socketRef.current.on("user_typing", ({ userId: typingId }) => {
      if (typingId !== user._id) setIsTyping(true);
    });

    socketRef.current.on("user_stop_typing", ({ userId: typingId }) => {
      if (typingId !== user._id) setIsTyping(false);
    });

    // Mark as read
    socketRef.current.emit("mark_read", { conversationId, userId: user._id });

    return () => {
      socketRef.current?.emit("leave_conversation", { conversationId });
      socketRef.current?.disconnect();
    };
  }, [user, conversationId]);

  // Load initial messages
  useEffect(() => {
    if (!conversationId) return;
    getMessages(conversationId)
      .then((data) => {
        setMessages(data.messages || []);
        // Find the other participant
        if (data.messages?.length > 0) {
          const other = data.messages.find((m) => m.sender?._id !== user?._id)?.sender;
          if (other) setOtherUser(other);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [conversationId, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleTyping = () => {
    if (!socketRef.current) return;
    socketRef.current.emit("typing", { conversationId, userId: user._id });

    if (typingTimeout) clearTimeout(typingTimeout);
    const timeout = setTimeout(() => {
      socketRef.current?.emit("stop_typing", { conversationId, userId: user._id });
    }, 2000);
    setTypingTimeout(timeout);
  };

  const handleSend = async () => {
    const text = newMessage.trim();
    if (!text) return;

    setNewMessage("");
    setSending(true);

    // Optimistic update
    const optimisticMsg = {
      _id: `temp-${Date.now()}`,
      text,
      sender: { _id: user._id, name: user.name, avatar: user.avatar },
      createdAt: new Date().toISOString(),
      readBy: [user._id],
    };
    setMessages((prev) => [...prev, optimisticMsg]);

    try {
      if (socketRef.current?.connected) {
        socketRef.current.emit("send_message", {
          conversationId,
          senderId: user._id,
          text,
        });
      } else {
        // Fallback to REST
        const data = await restSendMessage(conversationId, text);
        setMessages((prev) => [
          ...prev.filter((m) => m._id !== optimisticMsg._id),
          data.message,
        ]);
      }
    } catch (err) {
      console.error("Send failed:", err);
      setMessages((prev) => prev.filter((m) => m._id !== optimisticMsg._id));
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" color="#ff0036" />
      </Flex>
    );
  }

  return (
    <Flex h="100vh" flexDirection="column" bg="gray.50">

      {/* Header */}
      <Box
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.100"
        py={3} px={4}
        shadow="sm"
        zIndex={10}
      >
        <Flex align="center" gap={3}>
          <IconButton
            icon={<FaArrowLeft />}
            variant="ghost"
            onClick={() => router.push("/chat")}
            color="gray.600"
            _hover={{ color: "#ff0036" }}
            size="sm"
          />
          {otherUser && (
            <>
              <Image
                src={otherUser.avatar || `https://ui-avatars.com/api/?name=${otherUser.name}&background=ff0036&color=fff`}
                alt={otherUser.name}
                w="40px" h="40px" rounded="full" objectFit="cover"
              />
              <Box>
                <Heading size="sm" color="gray.900">{otherUser.name}</Heading>
                <Flex align="center" gap={1}>
                  <Box w="8px" h="8px" bg="green.400" rounded="full" />
                  <Text fontSize="xs" color="green.500">Online</Text>
                </Flex>
              </Box>
            </>
          )}
        </Flex>
      </Box>

      {/* Messages area */}
      <Box
        flex={1}
        overflowY="auto"
        px={{ base: 4, md: 6 }}
        py={4}
        css={{
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": { background: "#e2e8f0", borderRadius: "2px" },
        }}
      >
        {messages.length === 0 ? (
          <Box textAlign="center" py={20}>
            <Text fontSize="3xl" mb={3}>👋</Text>
            <Text color="gray.400" fontSize="sm">
              Say hello! Start your conversation with a kind message.
            </Text>
            <Text color="gray.300" fontSize="xs" mt={1}>
              "A gentle answer turns away wrath." — Proverbs 15:1
            </Text>
          </Box>
        ) : (
          <VStack align="stretch" gap={0.5} maxW="800px" mx="auto">
            {messages.map((message, i) => {
              const isOwn = message.sender?._id === user?._id || message.sender === user?._id;
              const prevMsg = messages[i - 1];
              const showAvatar = !isOwn && (
                !prevMsg ||
                prevMsg.sender?._id !== message.sender?._id
              );
              return (
                <MessageBubble
                  key={message._id}
                  message={message}
                  isOwn={isOwn}
                  showAvatar={showAvatar}
                />
              );
            })}

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <MotionBox
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  pl={10}
                >
                  <Flex align="center" gap={1} py={2}>
                    {[0, 1, 2].map((i) => (
                      <MotionBox
                        key={i}
                        w="7px" h="7px" bg="gray.400" rounded="full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                      />
                    ))}
                  </Flex>
                </MotionBox>
              )}
            </AnimatePresence>
          </VStack>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input area */}
      <Box
        bg="white"
        borderTop="1px solid"
        borderColor="gray.100"
        px={{ base: 4, md: 6 }}
        py={4}
        shadow="sm"
      >
        <Flex gap={3} maxW="800px" mx="auto" align="flex-end">
          <Input
            ref={inputRef}
            placeholder="Type a message... (Enter to send)"
            value={newMessage}
            onChange={(e) => { setNewMessage(e.target.value); handleTyping(); }}
            onKeyDown={handleKeyDown}
            border="1px solid"
            borderColor="gray.200"
            rounded="xl"
            bg="gray.50"
            py={4}
            px={4}
            fontSize="sm"
            _focus={{ borderColor: "#ff0036", boxShadow: "0 0 0 1px #ff0036", outline: "none" }}
            flex={1}
          />
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim() || sending}
            bg="#ff0036"
            color="white"
            rounded="xl"
            px={5}
            py={6}
            _hover={{ bg: "#d4002d", transform: "translateY(-1px)" }}
            transition="all 0.2s"
            shadow="md"
          >
            <FaPaperPlane />
          </Button>
        </Flex>
        <Text fontSize="xs" color="gray.400" textAlign="center" mt={2}>
          ✝ Keep your conversations respectful and faith-centered
        </Text>
      </Box>
    </Flex>
  );
}
