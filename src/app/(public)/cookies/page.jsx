'use client';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import PageHeader from '@/components/PageHeader';
import AnimatedSection from '@/components/AnimatedSection';

export default function CookiePolicyPage() {
  const lastUpdated = "August 17, 2026";

  return (
    <Box as="main" bg="gray.50" minH="100vh" pb={24}>
      <PageHeader 
        title="Cookie Policy" 
        description={`Last updated: ${lastUpdated}`} 
      />

      <Container maxW="4xl" mt={10}>
        <AnimatedSection direction="up">
          <Box bg="white" p={{ base: 8, md: 12 }} borderRadius="2xl" boxShadow="lg">
            <VStack align="stretch" gap={8}>
              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">1. What Are Cookies?</Heading>
                <Text color="gray.600" lineHeight="1.8">
                  Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work or function more efficiently, as well as to provide reporting information and assist with service or personalization.
                </Text>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">2. How We Use Cookies</Heading>
                <Text color="gray.600" lineHeight="1.8" mb={4}>
                  We use cookies for several reasons, including:
                </Text>
                <VStack align="stretch" gap={2} pl={4} borderLeft="4px solid #ff0036" color="gray.600">
                  <Text>• <b>Essential Cookies:</b> Necessary for the website to function correctly, such as maintaining your session when you log in.</Text>
                  <Text>• <b>Performance Cookies:</b> Help us understand how visitors interact with our website by collecting and reporting information anonymously.</Text>
                  <Text>• <b>Functionality Cookies:</b> Allow the website to remember choices you make (such as your username or region) to provide a more personalized experience.</Text>
                </VStack>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">3. Managing Cookies</Heading>
                <Text color="gray.600" lineHeight="1.8">
                  Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies or delete certain cookies. However, if you choose to block all cookies, you may not be able to access all or parts of our website.
                </Text>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4} color="gray.900">4. Contact Us</Heading>
                <Text color="gray.600" lineHeight="1.8">
                  If you have any questions about our Cookie Policy, please contact us at support@afrofaithmatch.com.
                </Text>
              </Box>
            </VStack>
          </Box>
        </AnimatedSection>
      </Container>
    </Box>
  );
}
