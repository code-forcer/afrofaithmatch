'use client';
import { Box, Container, SimpleGrid, VStack, Heading, Text, Image, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import AnimatedSection from '@/components/AnimatedSection';

const MotionBox = motion(Box);
const MotionImage = motion(Image);

const posts = [
  {
    id: 1,
    title: "How to Build a Christ-Centered Relationship",
    category: "Relationships",
    date: "August 12, 2026",
    image: "https://images.unsplash.com/photo-1644041852210-4873f99366be?q=80&w=800&auto=format&fit=crop",
    excerpt: "Building a foundation on faith requires intentionality. Here are 5 practical ways to keep God at the center of your dating life.",
  },
  {
    id: 2,
    title: "Navigating Online Dating as a Christian",
    category: "Online Dating",
    date: "August 5, 2026",
    image: "https://images.unsplash.com/photo-1614174669570-037a92241af8?q=80&w=800&auto=format&fit=crop",
    excerpt: "Online dating can be overwhelming, but it doesn't have to compromise your values. Learn how to navigate the digital dating landscape faithfully.",
  },
  {
    id: 3,
    title: "The Importance of Shared Values in Marriage",
    category: "Marriage",
    date: "July 28, 2026",
    image: "https://images.unsplash.com/photo-1614804471619-50084aff54bd?q=80&w=800&auto=format&fit=crop",
    excerpt: "Why being equally yoked goes beyond just checking a box. Understanding the deep significance of shared faith in a lifelong partnership.",
  },
  {
    id: 4,
    title: "Praying for Your Future Spouse",
    category: "Faith",
    date: "July 20, 2026",
    image: "https://images.unsplash.com/photo-1561406636-b80293969660?q=80&w=800&auto=format&fit=crop",
    excerpt: "Even before you meet them, you can start praying for your future spouse. Discover powerful prayers for the one God has for you.",
  },
  {
    id: 5,
    title: "Red Flags vs. Grace: Discerning When to Walk Away",
    category: "Dating Advice",
    date: "July 15, 2026",
    image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=800&auto=format&fit=crop",
    excerpt: "As Christians we are called to give grace, but we also need wisdom. How to tell the difference between a flaw and a toxic red flag.",
  },
  {
    id: 6,
    title: "Success Story: How Marcus and Aisha Met",
    category: "Success Stories",
    date: "July 8, 2026",
    image: "https://images.unsplash.com/photo-1522941471521-6ee21ec5cc26?q=80&w=800&auto=format&fit=crop",
    excerpt: "Read the beautiful testimony of how God brought Marcus and Aisha together across borders through Afro Faith Match.",
  }
];

function BlogCard({ post }) {
  const [hovered, setHovered] = useState(false);

  return (
    <MotionBox
      as="article"
      bg="white"
      borderRadius="2xl"
      overflow="hidden"
      border="1px solid"
      borderColor="gray.100"
      cursor="pointer"
      h="full"
      display="flex"
      flexDirection="column"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      style={{
        boxShadow: hovered
          ? '0 22px 40px rgba(255,0,54,0.14)'
          : '0 2px 10px rgba(0,0,0,0.04)',
      }}
    >
      <Box h="240px" overflow="hidden">
        <MotionImage
          src={post.image}
          alt={post.title}
          objectFit="cover"
          w="full"
          h="full"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
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

        <Flex align="center" gap={2} color="#ff0036" fontWeight="semibold" fontSize="sm" mt="auto" pt={4}>
          <Text>Read Article</Text>
          <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.25 }}>
            &rarr;
          </motion.span>
        </Flex>
      </VStack>
    </MotionBox>
  );
}

export default function BlogPage() {
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
              <BlogCard post={post} />
            </AnimatedSection>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}