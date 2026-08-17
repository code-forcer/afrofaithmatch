'use client';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import PageHeader from '@/components/PageHeader';
import AnimatedSection from '@/components/AnimatedSection';

export default function TermsPage() {
  const lastUpdated = "August 17, 2026";

  return (
    <Box as="main" bg="gray.50" minH="100vh" pb={24}>
      <PageHeader 
        title="Terms & Conditions" 
        description={`Last updated: ${lastUpdated}`} 
      />

      <Container maxW="4xl" mt={10}>
        <AnimatedSection direction="up">
          <Box bg="white" p={{ base: 8, md: 12 }} borderRadius="2xl" boxShadow="lg">
            <VStack align="stretch" gap={8}>
              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">1. Agreement to Terms</Heading>
                <Text color="gray.600" lineHeight="1.8">
                  By accessing or using Afro Faith Match, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our services.
                </Text>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">2. Eligibility</Heading>
                <Text color="gray.600" lineHeight="1.8">
                  You must be at least 18 years of age to create an account on Afro Faith Match and use the Service. By creating an account and using the Service, you represent and warrant that you can form a binding contract and that you will comply with these Terms and all applicable laws.
                </Text>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">3. User Conduct</Heading>
                <Text color="gray.600" lineHeight="1.8" mb={4}>
                  You agree to use the Service in a respectful and lawful manner. You will not:
                </Text>
                <VStack align="stretch" gap={2} pl={4} borderLeft="4px solid #ff0036" color="gray.600">
                  <Text>• Harass, abuse, or harm another person.</Text>
                  <Text>• Use the Service for any illegal or unauthorized purpose.</Text>
                  <Text>• Post any content that is offensive, pornographic, or promotes violence.</Text>
                  <Text>• Attempt to defraud or mislead other users.</Text>
                </VStack>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">4. Account Security</Heading>
                <Text color="gray.600" lineHeight="1.8">
                  You are responsible for maintaining the confidentiality of your login credentials you use to sign up for Afro Faith Match, and you are solely responsible for all activities that occur under those credentials.
                </Text>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">5. Termination</Heading>
                <Text color="gray.600" lineHeight="1.8">
                  We reserve the right to suspend or terminate your account at any time, for any reason, including if you violate these Terms and Conditions. You may also terminate your account at any time through your account settings.
                </Text>
              </Box>
            </VStack>
          </Box>
        </AnimatedSection>
      </Container>
    </Box>
  );
}
