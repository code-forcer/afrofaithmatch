'use client';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import PageHeader from '@/components/PageHeader';
import AnimatedSection from '@/components/AnimatedSection';

export default function ChristianValuesPage() {
  return (
    <Box as="main" bg="gray.50" minH="100vh" pb={24}>
      <PageHeader 
        title="Christian Values" 
        description="The foundation of our community." 
      />

      <Container maxW="4xl" mt={10}>
        <AnimatedSection direction="up">
          <Box bg="white" p={{ base: 8, md: 12 }} borderRadius="2xl" boxShadow="lg">
            <VStack align="stretch" gap={8}>
              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">Our Core Beliefs</Heading>
                <Text color="gray.600" lineHeight="1.8">
                  At Afro Faith Match, we are committed to providing a platform that honors and upholds traditional Christian values. We believe that relationships should be built on a strong foundation of faith, mutual respect, and a shared commitment to Christ.
                </Text>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">Faith First</Heading>
                <Text color="gray.600" lineHeight="1.8">
                  We encourage our members to seek a partner who shares their devotion to God. Our platform is designed to foster connections that are spiritually enriching and aligned with biblical principles.
                </Text>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">Purity and Respect</Heading>
                <Text color="gray.600" lineHeight="1.8">
                  We believe in honoring God through our interactions. We expect all members to treat one another with kindness, purity, and the utmost respect, reflecting the love of Christ in all their communications.
                </Text>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">Commitment to Marriage</Heading>
                <Text color="gray.600" lineHeight="1.8">
                  Our goal is to help individuals find a lifelong partner. We uphold marriage as a sacred covenant and provide resources to support couples as they prepare for a Christ-centered marriage.
                </Text>
              </Box>
            </VStack>
          </Box>
        </AnimatedSection>
      </Container>
    </Box>
  );
}
