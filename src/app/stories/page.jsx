"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  Flex,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { getStories } from "@/lib/api";

// Category badge color map
const categoryColors = {
  win: "green",
  worry: "blue",
  loss: "red",
  lesson: "purple",
};

const categoryLabels = {
  win: "WIN",
  worry: "WORRY",
  loss: "LOST OPPORTUNITY",
  lesson: "LESSON",
};

const filters = [
  { label: "All", value: "all" },
  { label: "Wins", value: "win" },
  { label: "Worries", value: "worry" },
  { label: "Lost Opportunities", value: "loss" },
  { label: "Lessons", value: "lesson" },
];

export default function StoriesPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [searchDebounced, setSearchDebounced] = useState("");
  const [total, setTotal] = useState(0);

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => setSearchDebounced(search), 400);
    return () => clearTimeout(timeout);
  }, [search]);

  const fetchStories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getStories({
        category: activeFilter,
        search: searchDebounced,
        limit: 20,
      });
      setStories(data.stories || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Failed to fetch stories:", err);
      setStories([]);
    } finally {
      setLoading(false);
    }
  }, [activeFilter, searchDebounced]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  return (
    <>
      <Box bg={{ base: "white", _dark: "black" }} minH="100vh">
        
        {/* Page Header */}
        <Box bg={{ base: "blue.50", _dark: "gray.900" }} py={16}>
          <Container maxW="7xl">
            <VStack spacing={6} align="center" textAlign="center">
              <Heading size="2xl" color={{ base: "gray.900", _dark: "white" }}>Real Stories</Heading>
              <Text maxW="2xl" fontSize="xl" color={{ base: "gray.600", _dark: "gray.400" }}>
                Browse stories from people just like you. Filter by what you need to read today.
              </Text>
              
              {/* Search Bar */}
              <Input 
                maxW="md" 
                placeholder="Search stories..." 
                bg={{ base: "white", _dark: "gray.800" }} 
                size="lg"
                border="none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </VStack>
          </Container>
        </Box>

        {/* Filters */}
        <Container maxW="7xl" py={8}>
          <Flex gap={3} overflowX="auto" pb={4} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
            {filters.map((filter) => (
              <Button 
                key={filter.value} 
                rounded="full" 
                variant={activeFilter === filter.value ? "solid" : "outline"}
                bg={activeFilter === filter.value ? "blue.500" : undefined}
                color={activeFilter === filter.value ? "white" : { base: "gray.600", _dark: "gray.300" }}
                borderColor={{ base: "gray.300", _dark: "gray.700" }}
                _hover={{ bg: "blue.500", color: "white", borderColor: "blue.500" }}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </Button>
            ))}
          </Flex>

          {/* Loading State */}
          {loading && (
            <Flex justify="center" py={20}>
              <VStack spacing={4}>
                <Spinner size="xl" color="blue.500" />
                <Text color="gray.500">Loading stories...</Text>
              </VStack>
            </Flex>
          )}

          {/* Empty State */}
          {!loading && stories.length === 0 && (
            <Box textAlign="center" py={20}>
              <Heading size="md" color={{ base: "gray.500", _dark: "gray.400" }} mb={4}>
                No stories found
              </Heading>
              <Text color="gray.500" mb={6}>
                {search ? "Try a different search term." : "Be the first to share your story!"}
              </Text>
              <Button
                as="a"
                href="/write"
                bg="blue.500"
                color="white"
                _hover={{ bg: "blue.600" }}
              >
                Share Your Story
              </Button>
            </Box>
          )}

          {/* Grid */}
          {!loading && stories.length > 0 && (
            <>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} mt={8}>
                {stories.map((story) => (
                  <Box 
                    key={story.id}
                    p={8}
                    bg={{ base: "white", _dark: "gray.900" }}
                    border="1px solid"
                    borderColor={{ base: "gray.100", _dark: "gray.800" }}
                    rounded="xl"
                    shadow="sm"
                    _hover={{ shadow: "md", borderColor: "blue.200" }}
                    transition="all 0.2s"
                  >
                    <Flex justify="space-between" align="center" mb={4}>
                      <Badge colorScheme={categoryColors[story.category] || "gray"}>
                        {categoryLabels[story.category] || story.category?.toUpperCase()}
                      </Badge>
                      <Text fontSize="xs" color="gray.500">
                        {new Date(story.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </Text>
                    </Flex>
                    <Heading size="md" mb={3} color={{ base: "gray.900", _dark: "white" }}>{story.title}</Heading>
                    <Text color={{ base: "gray.600", _dark: "gray.400" }} noOfLines={3} mb={4}>
                      {story.content}
                    </Text>
                    <Flex justify="space-between" align="center" pt={3} borderTop="1px solid" borderColor={{ base: "gray.100", _dark: "gray.800" }}>
                      <Text fontSize="sm" color="blue.500" fontWeight="medium">
                        {story.anonymous ? "Anonymous" : story.authorName}
                      </Text>
                    </Flex>
                  </Box>
                ))}
              </SimpleGrid>

              {/* Count */}
              <Text textAlign="center" color="gray.500" fontSize="sm" mt={8}>
                Showing {stories.length} of {total} stories
              </Text>
            </>
          )}
        </Container>
      </Box>
    </>
  );
}