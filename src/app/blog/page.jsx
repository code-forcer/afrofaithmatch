'use client';
import { Box, Container, SimpleGrid, VStack, Heading, Text, Image, Flex } from '@chakra-ui/react';
import PageHeader from '@/components/PageHeader';
import AnimatedSection from '@/components/AnimatedSection';

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "How to Build a Christ-Centered Relationship",
      category: "Relationships",
      date: "August 12, 2026",
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800&auto=format&fit=crop",
      excerpt: "Building a foundation on faith requires intentionality. Here are 5 practical ways to keep God at the center of your dating life.",
    },
    {
      id: 2,
      title: "Navigating Online Dating as a Christian",
      category: "Online Dating",
      date: "August 5, 2026",
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800&auto=format&fit=crop",
      excerpt: "Online dating can be overwhelming, but it doesn't have to compromise your values. Learn how to navigate the digital dating landscape faithfully.",
    },
    {
      id: 3,
      title: "The Importance of Shared Values in Marriage",
      category: "Marriage",
      date: "July 28, 2026",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop",
      excerpt: "Why being equally yoked goes beyond just checking a box. Understanding the deep significance of shared faith in a lifelong partnership.",
    },
    {
      id: 4,
      title: "Praying for Your Future Spouse",
      category: "Faith",
      date: "July 20, 2026",
      image: "https://images.unsplash.com/photo-1544427920-c49ccca8a075?q=80&w=800&auto=format&fit=crop",
      excerpt: "Even before you meet them, you can start praying for your future spouse. Discover powerful prayers for the one God has for you.",
    },
    {
      id: 5,
      title: "Red Flags vs. Grace: Discerning When to Walk Away",
      category: "Dating Advice",
      date: "July 15, 2026",
      image: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=800&auto=format&fit=crop",
      excerpt: "As Christians we are called to give grace, but we also need wisdom. How to tell the difference between a flaw and a toxic red flag.",
    },
    {
      id: 6,
      title: "Success Story: How Marcus and Aisha Met",
      category: "Success Stories",
      date: "July 8, 2026",
      image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=800&auto=format&fit=crop",
      excerpt: "Read the beautiful testimony of how God brought Marcus and Aisha together across borders through Afro Faith Match.",
    }
  ];

  return (
    <Box as="main" bg="white" minH="100vh" pb={24}>
      <PageHeader 
        title="Faith & Relationships Blog" 
        description="Articles, advice, and testimonies to encourage you on your journey." 
      />

      <Container maxW="7xl" mt={12}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10}>
          {posts.map((post, index) => (
            <AnimatedSection key={post.id} delay={index * 0.1}>
              <Box 
                as="article"
                bg="white"
                borderRadius="2xl" 
                overflow="hidden" 
                border="1px solid"
                borderColor="gray.100"
                transition="all 0.3s ease"
                _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
                cursor="pointer"
                h="full"
                display="flex"
                flexDirection="column"
              >
                <Box h="240px" overflow="hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    objectFit="cover" 
                    w="full" 
                    h="full" 
                    transition="transform 0.5s ease"
                    _hover={{ transform: 'scale(1.05)' }}
                  />
                </Box>
                <VStack align="stretch" p={6} gap={4} flex="1">
                  <Flex justify="space-between" align="center" fontSize="sm">
                    <Text color="#ff0036" fontWeight="bold" textTransform="uppercase" letterSpacing="wide">
                      {post.category}
                    </Text>
                    <Text color="gray.500">{post.date}</Text>
                  </Flex>
                  <Heading as="h3" size="md" color="gray.900" lineHeight="1.4">
                    {post.title}
                  </Heading>
                  <Text color="gray.600" fontSize="sm" lineHeight="1.6">
                    {post.excerpt}
                  </Text>
                  
                  <Text color="#ff0036" fontWeight="semibold" fontSize="sm" mt="auto" pt={4}>
                    Read Article &rarr;
                  </Text>
                </VStack>
              </Box>
            </AnimatedSection>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
