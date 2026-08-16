"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaPaperPlane, FaLock, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { createStory } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function WritePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("win");
  const [mood, setMood] = useState("hopeful");
  const [anonymous, setAnonymous] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createStory({ title, content, category, mood, anonymous });
      setSuccess(true);
      // Reset form
      setTitle("");
      setContent("");
      setCategory("win");
      setMood("hopeful");
      setAnonymous(true);

      // Redirect to stories after a brief pause
      setTimeout(() => {
        router.push("/stories");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to publish story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show nothing while checking auth
  if (authLoading) {
    return (
      <Box bg={{ base: "gray.50", _dark: "gray.900" }} minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Text color={{ base: "gray.600", _dark: "gray.400" }}>Loading...</Text>
      </Box>
    );
  }

  // Success state
  if (success) {
    return (
      <Box bg={{ base: "gray.50", _dark: "gray.900" }} minH="100vh" py={{ base: 10, md: 20 }}>
        <Container maxW="3xl">
          <VStack spacing={6} textAlign="center" py={20}>
            <Icon as={FaCheckCircle} boxSize={16} color="green.400" />
            <Heading size="xl" color={{ base: "gray.800", _dark: "white" }}>
              Story Published! 🎉
            </Heading>
            <Text color={{ base: "gray.600", _dark: "gray.400" }} fontSize="lg">
              Thank you for sharing. Your story is now live and might help someone who needs it.
            </Text>
            <Text color="gray.500" fontSize="sm">
              Redirecting to stories...
            </Text>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <>
      <Box 
        bg={{ base: "gray.50", _dark: "gray.900" }} 
        minH="100vh" 
        py={{ base: 10, md: 20 }}
      >
        <Container maxW="3xl">
          <VStack spacing={8} align="stretch">
            
            {/* Page Title */}
            <VStack spacing={2} textAlign="center">
              <Heading size="xl" color={{ base: "gray.800", _dark: "white" }}>
                Share Your Story
              </Heading>
              <Text color={{ base: "gray.600", _dark: "gray.400" }}>
                This is a safe space. Express your feelings, share your wins, or let go of your worries.
              </Text>
            </VStack>

            {/* Error */}
            {error && (
              <Box p={4} bg="red.50" color="red.600" rounded="lg" fontSize="sm" fontWeight="medium">
                {error}
              </Box>
            )}

            {/* Form Card */}
            <Box
              as="form"
              onSubmit={handleSubmit}
              bg={{ base: "white", _dark: "gray.800" }}
              p={{ base: 6, md: 8 }}
              shadow="lg"
              border="1px solid"
              borderColor={{ base: "gray.100", _dark: "gray.700" }}
            >
              <VStack spacing={6}>
                
                {/* Title Input */}
                <Box w="full">
                  <Text mb={2} fontWeight="medium" color={{ base: "gray.700", _dark: "gray.300" }}>
                    Give your story a title
                  </Text>
                  <Input 
                    placeholder="e.g., The day I finally let go..." 
                    size="lg" 
                    bg={{ base: "gray.50", _dark: "gray.700" }}
                    border="1px solid"
                    borderColor={{ base: "gray.200", _dark: "gray.600" }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Box>

                {/* Category & Mood */}
                <Flex direction={{ base: "column", md: "row" }} gap={4} w="full">
                  {/* Category Select */}
                  <Box w="full">
                    <Text mb={2} fontWeight="medium" color={{ base: "gray.700", _dark: "gray.300" }}>
                      Category
                    </Text>
                    <Box 
                      as="select"
                      w="full"
                      h="48px"
                      px={4}
                      rounded="md"
                      bg={{ base: "gray.50", _dark: "gray.700" }}
                      border="1px solid"
                      borderColor={{ base: "gray.200", _dark: "gray.600" }}
                      color={{ base: "gray.800", _dark: "white" }}
                      _focus={{ outline: "none", borderColor: "blue.400" }}
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="win">Win & Celebration</option>
                      <option value="worry">Worry & Anxiety</option>
                      <option value="loss">Lost Opportunity</option>
                      <option value="lesson">Life Lesson</option>
                    </Box>
                  </Box>
                  
                  {/* Mood Select */}
                  <Box w="full">
                    <Text mb={2} fontWeight="medium" color={{ base: "gray.700", _dark: "gray.300" }}>
                      Current Mood
                    </Text>
                    <Box 
                      as="select"
                      w="full"
                      h="48px"
                      px={4}
                      rounded="md"
                      bg={{ base: "gray.50", _dark: "gray.700" }}
                      border="1px solid"
                      borderColor={{ base: "gray.200", _dark: "gray.600" }}
                      color={{ base: "gray.800", _dark: "white" }}
                      _focus={{ outline: "none", borderColor: "blue.400" }}
                      value={mood}
                      onChange={(e) => setMood(e.target.value)}
                    >
                      <option value="hopeful">Hopeful</option>
                      <option value="sad">Sad / Melancholy</option>
                      <option value="anxious">Anxious</option>
                      <option value="grateful">Grateful</option>
                      <option value="angry">Frustrated</option>
                    </Box>
                  </Box>
                </Flex>

                {/* Main Content */}
                <Box w="full">
                  <Text mb={2} fontWeight="medium" color={{ base: "gray.700", _dark: "gray.300" }}>
                    Your Story
                  </Text>
                  <Textarea
                    placeholder="Write as much as you need. No judgment here..."
                    size="lg"
                    minH="250px"
                    bg={{ base: "gray.50", _dark: "gray.700" }}
                    border="1px solid"
                    borderColor={{ base: "gray.200", _dark: "gray.600" }}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </Box>

                {/* Anonymity Checkbox */}
                <Flex 
                  w="full" 
                  justify="space-between" 
                  align="center" 
                  p={4} 
                  bg={{ base: "blue.50", _dark: "blue.900" }} 
                  rounded="lg"
                >
                  <Flex align="center" gap={3}>
                    <Icon as={FaLock} color="blue.500" />
                    <Box>
                      <Text fontWeight="bold" fontSize="sm" color={{ base: "gray.800", _dark: "white" }}>
                        Post Anonymously
                      </Text>
                      <Text fontSize="xs" color={{ base: "gray.600", _dark: "gray.300" }}>
                        Your name will be hidden
                      </Text>
                    </Box>
                  </Flex>
                  {/* Standard Checkbox Input */}
                  <Box 
                    as="input" 
                    type="checkbox" 
                    checked={anonymous}
                    onChange={(e) => setAnonymous(e.target.checked)}
                    w={5} 
                    h={5} 
                    accentColor="#3182ce"
                  />
                </Flex>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  w="full"
                  bg="blue.500"
                  color="white"
                  _hover={{ bg: "blue.600" }}
                  py={8}
                  fontSize="xl"
                  disabled={loading}
                  loading={loading}
                >
                  <Box as="span" mr={2}><FaPaperPlane /></Box> 
                  {loading ? "Publishing..." : "Publish Story"}
                </Button>

              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  );
}