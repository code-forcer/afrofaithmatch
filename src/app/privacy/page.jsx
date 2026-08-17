'use client';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import PageHeader from '@/components/PageHeader';
import AnimatedSection from '@/components/AnimatedSection';

export default function PrivacyPolicyPage() {
  const lastUpdated = "August 17, 2026";

  return (
    <Box as="main" bg="gray.50" minH="100vh" pb={24}>
      <PageHeader 
        title="Privacy Policy" 
        description={`Last updated: ${lastUpdated}`} 
      />

      <Container maxW="4xl" mt={10}>
        <AnimatedSection direction="up">
          <Box bg="white" p={{ base: 8, md: 12 }} borderRadius="2xl" boxShadow="lg">
            <VStack align="stretch" gap={8}>
              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">1. Introduction</Heading>
                <Text color="gray.600" lineHeight="1.8">
                  Welcome to Afro Faith Match. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                </Text>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">2. The Data We Collect About You</Heading>
                <Text color="gray.600" lineHeight="1.8" mb={4}>
                  Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                </Text>
                <VStack align="stretch" gap={2} pl={4} borderLeft="4px solid #ff0036" color="gray.600">
                  <Text>• <b>Identity Data:</b> includes first name, last name, username or similar identifier.</Text>
                  <Text>• <b>Contact Data:</b> includes email address and telephone numbers.</Text>
                  <Text>• <b>Profile Data:</b> includes your interests, preferences, feedback and survey responses.</Text>
                  <Text>• <b>Usage Data:</b> includes information about how you use our website, products and services.</Text>
                </VStack>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">3. How We Use Your Personal Data</Heading>
                <Text color="gray.600" lineHeight="1.8">
                  We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: Where we need to perform the contract we are about to enter into or have entered into with you; Where it is necessary for our legitimate interests; Where we need to comply with a legal obligation.
                </Text>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">4. Data Security</Heading>
                <Text color="gray.600" lineHeight="1.8">
                  We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                </Text>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">5. Contact Us</Heading>
                <Text color="gray.600" lineHeight="1.8">
                  If you have any questions about this privacy policy or our privacy practices, please contact us at support@afrofaithmatch.com.
                </Text>
              </Box>
            </VStack>
          </Box>
        </AnimatedSection>
      </Container>
    </Box>
  );
}
