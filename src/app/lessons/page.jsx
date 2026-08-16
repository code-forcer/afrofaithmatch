"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Text,
  VStack,
  Flex,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { FaLightbulb, FaQuoteLeft } from "react-icons/fa";
import { getLessons } from "@/lib/api";

export default function LessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLessons() {
      try {
        const data = await getLessons();
        setLessons(data.lessons || []);
      } catch (err) {
        console.error("Failed to fetch lessons:", err);
        // Fallback to empty array
        setLessons([]);
      } finally {
        setLoading(false);
      }
    }

    fetchLessons();
  }, []);

  return (
    <>
      <Box bg={{ base: "gray.50", _dark: "black" }} minH="100vh" py={16}>
        <Container maxW="7xl">
          <VStack spacing={12}>
            
            <VStack textAlign="center" spacing={4}>
              <Icon as={FaLightbulb} boxSize={12} color="yellow.400" />
              <Heading size="2xl" color={{ base: "gray.900", _dark: "white" }}>The Wisdom Board</Heading>
              <Text fontSize="xl" color={{ base: "gray.600", _dark: "gray.400" }} maxW="2xl">
                Short, powerful lessons learned from real life experiences. Take what you need.
              </Text>
            </VStack>

            {/* Loading State */}
            {loading && (
              <Flex justify="center" py={10}>
                <VStack spacing={4}>
                  <Spinner size="xl" color="blue.500" />
                  <Text color="gray.500">Loading wisdom...</Text>
                </VStack>
              </Flex>
            )}

            {/* Empty State */}
            {!loading && lessons.length === 0 && (
              <Box textAlign="center" py={10}>
                <Text color="gray.500" fontSize="lg">
                  No lessons shared yet. Be the first to contribute your wisdom!
                </Text>
              </Box>
            )}

            {/* Lessons Grid */}
            {!loading && lessons.length > 0 && (
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="full">
                {lessons.map((lesson) => (
                  <Flex 
                    key={lesson.id}
                    direction="column"
                    p={10}
                    bg={{ base: "white", _dark: "gray.900" }}
                    rounded="3xl"
                    position="relative"
                    shadow="md"
                  >
                    <Icon as={FaQuoteLeft} color="gray.200" boxSize={10} position="absolute" top={6} left={6} />
                    
                    <Text 
                      fontSize="2xl" 
                      fontWeight="medium" 
                      color={{ base: "gray.800", _dark: "white" }} 
                      fontStyle="italic"
                      zIndex={1}
                      mb={6}
                      mt={4}
                    >
                      "{lesson.quote}"
                    </Text>
                    
                    <Box mt="auto" borderTop="1px solid" borderColor="gray.100" pt={4}>
                      <Text fontWeight="bold" color="blue.500">{lesson.author}</Text>
                      <Text fontSize="sm" color="gray.500">Context: {lesson.context}</Text>
                    </Box>
                  </Flex>
                ))}
              </SimpleGrid>
            )}

          </VStack>
        </Container>
      </Box>
    </>
  );
}