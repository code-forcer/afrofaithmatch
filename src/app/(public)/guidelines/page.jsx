'use client';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import PageHeader from '@/components/PageHeader';
import AnimatedSection from '@/components/AnimatedSection';

export default function CommunityGuidelinesPage() {
  return (
    <Box as="main" bg="gray.50" minH="100vh" pb={24}>
      <PageHeader 
        title="Community Guidelines" 
        description="How we maintain a safe and respectful environment." 
      />

      <Container maxW="4xl" mt={10}>
        <AnimatedSection direction="up">
          <Box bg="white" p={{ base: 8, md: 12 }} borderRadius="2xl" boxShadow="lg">
            <VStack align="stretch" gap={8}>
              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">Welcome to Our Community</Heading>
                <Text color="gray.600" lineHeight="1.8">
                  Afro Faith Match is dedicated to fostering a safe, respectful, and uplifting environment for African Christian singles to connect. By joining our platform, you agree to adhere to these community guidelines.
                </Text>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">1. Be Respectful and Kind</Heading>
                <Text color="gray.600" lineHeight="1.8" mb={4}>
                  Treat everyone with respect and kindness. We do not tolerate harassment, bullying, hate speech, or discriminatory remarks based on race, ethnicity, denomination, or any other characteristic.
                </Text>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">2. Honesty and Authenticity</Heading>
                <Text color="gray.600" lineHeight="1.8">
                  Please be genuine in your interactions and ensure your profile information is accurate. Creating fake profiles, impersonating others, or attempting to scam members will result in an immediate ban.
                </Text>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">3. Keep it Clean</Heading>
                <Text color="gray.600" lineHeight="1.8">
                  As a faith-based platform, we require all interactions to remain clean and appropriate. Do not share sexually explicit content, use profanity, or engage in inappropriate conversations.
                </Text>
              </Box>
              
              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">4. Reporting Violations</Heading>
                <Text color="gray.600" lineHeight="1.8">
                  If you encounter a member who is violating these guidelines, please report them immediately using the tools provided on their profile or by contacting support. Our team reviews all reports and will take appropriate action.
                </Text>
              </Box>
            </VStack>
          </Box>
        </AnimatedSection>
      </Container>
    </Box>
  );
}
