'use client';
import { Box, Container, VStack, Heading, Text, Flex, Icon, SimpleGrid } from '@chakra-ui/react';
import { FaUserPlus, FaSearch, FaCommentDots, FaHeart } from 'react-icons/fa';
import PageHeader from '@/components/PageHeader';
import AnimatedSection from '@/components/AnimatedSection';

export default function HowItWorksPage() {
  const steps = [
    {
      icon: FaUserPlus,
      title: "1. Create Your Profile",
      description: "Sign up for free, tell us about yourself, your faith journey, and what you're looking for in a partner.",
    },
    {
      icon: FaSearch,
      title: "2. Find Matches",
      description: "Use our advanced search filters to find Christian singles who share your values and beliefs.",
    },
    {
      icon: FaCommentDots,
      title: "3. Start Connecting",
      description: "Send a smile or a message to start a conversation. Our secure platform keeps your communications safe.",
    },
    {
      icon: FaHeart,
      title: "4. Build a Relationship",
      description: "Get to know each other, build a strong foundation of faith, and let love grow.",
    }
  ];

  return (
    <Box as="main" bg="white" minH="100vh">
      <PageHeader 
        title="How It Works" 
        description="Finding your God-given match is simpler than you think. Follow these easy steps to get started." 
      />

      <Box py={24}>
        <Container maxW="7xl">
          <Box position="relative">
            {/* Connecting line for desktop */}
            <Box 
              display={{ base: 'none', lg: 'block' }}
              position="absolute"
              top="12"
              left="10%"
              right="10%"
              h="2px"
              bg="gray.200"
              zIndex={0}
            />
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={12} position="relative" zIndex={1}>
              {steps.map((step, index) => (
                <AnimatedSection key={index} delay={index * 0.15}>
                  <VStack textAlign="center" gap={6}>
                    <Flex 
                      w={24} 
                      h={24} 
                      bg="white" 
                      border="4px solid #ff0036"
                      color="#ff0036" 
                      borderRadius="full" 
                      align="center" 
                      justify="center"
                      boxShadow="xl"
                      transition="transform 0.3s ease"
                      _hover={{ transform: 'scale(1.1)' }}
                    >
                      <Icon as={step.icon} boxSize={8} />
                    </Flex>
                    <Box>
                      <Heading as="h3" size="lg" mb={4} color="gray.900">
                        {step.title}
                      </Heading>
                      <Text color="gray.600" fontSize="lg" lineHeight="1.6">
                        {step.description}
                      </Text>
                    </Box>
                  </VStack>
                </AnimatedSection>
              ))}
            </SimpleGrid>
          </Box>

          <AnimatedSection direction="up" delay={0.4}>
            <Box 
              mt={32} 
              p={12} 
              bgGradient="linear(to-r, #ff0036, #ff4d79)" 
              borderRadius="3xl" 
              textAlign="center"
              color="white"
              boxShadow="2xl"
            >
              <Heading as="h2" size="2xl" mb={6}>Ready to Begin Your Journey?</Heading>
              <Text fontSize="xl" mb={8} maxW="2xl" mx="auto" opacity={0.9}>
                Join thousands of Christian singles who are looking for a meaningful relationship centered on faith.
              </Text>
              <Box 
                as="button" 
                bg="white" 
                color="#ff0036" 
                px={10} 
                py={4} 
                borderRadius="full"
                fontWeight="bold"
                fontSize="lg"
                transition="all 0.3s ease"
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              >
                Join Free Today
              </Box>
            </Box>
          </AnimatedSection>
        </Container>
      </Box>
    </Box>
  );
}
