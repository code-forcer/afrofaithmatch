"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FaHandHoldingHeart, FaShieldAlt, FaUsers, FaDiscord } from "react-icons/fa";

export default function CommunityPage() {
  return (
    <>
      <Box bg={{ base: "white", _dark: "black" }} minH="100vh">
        
        {/* Hero */}
        <Box bg="blue.600" py={24} textAlign="center" color="white">
          <Container maxW="4xl">
            <Heading size="3xl" mb={6}>Our Community</Heading>
            <Text fontSize="xl" opacity={0.9}>
              We are a group of humans trying to figure it out together. 
              Kindness is our currency.
            </Text>
          </Container>
        </Box>

        {/* Guidelines Grid */}
        <Container maxW="7xl" py={20}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            
            <VStack 
              align="flex-start" 
              p={8} 
              bg={{ base: "gray.50", _dark: "gray.900" }} 
              rounded="2xl"
            >
              <Icon as={FaShieldAlt} boxSize={8} color="green.500" mb={4} />
              <Heading size="md" color={{ base: "gray.900", _dark: "white" }}>Safe Space First</Heading>
              <Text color="gray.500">
                Zero tolerance for hate speech, bullying, or judgment. This is a place for vulnerability, not attacks.
              </Text>
            </VStack>

            <VStack 
              align="flex-start" 
              p={8} 
              bg={{ base: "gray.50", _dark: "gray.900" }} 
              rounded="2xl"
            >
              <Icon as={FaHandHoldingHeart} boxSize={8} color="red.500" mb={4} />
              <Heading size="md" color={{ base: "gray.900", _dark: "white" }}>Empathy over Advice</Heading>
              <Text color="gray.500">
                Sometimes people just need to be heard, not fixed. Listen first before offering solutions.
              </Text>
            </VStack>

            <VStack 
              align="flex-start" 
              p={8} 
              bg={{ base: "gray.50", _dark: "gray.900" }} 
              rounded="2xl"
            >
              <Icon as={FaUsers} boxSize={8} color="blue.500" mb={4} />
              <Heading size="md" color={{ base: "gray.900", _dark: "white" }}>You Are Not Alone</Heading>
              <Text color="gray.500">
                Whatever you are going through, someone here has felt it too. Connect and heal together.
              </Text>
            </VStack>

          </SimpleGrid>

          {/* Discord/Join Section */}
          <Box 
            mt={20} 
            p={12} 
            bg={{ base: "gray.900", _dark: "gray.800" }} 
            rounded="3xl" 
            textAlign="center"
          >
            <Heading color="white" mb={4}>Want to chat in real-time?</Heading>
            <Text color="gray.400" mb={8}>Join our Discord server to chat with others instantly.</Text>
            <Button 
              size="lg" 
              colorScheme="purple" 
              bg="#5865F2" 
              _hover={{ bg: "#4752C4" }}
              leftIcon={<Icon as={FaDiscord} />}
            >
              Join the Discord
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}