'use client';
import { motion } from 'framer-motion';
import { Box, Heading, Text, Container } from '@chakra-ui/react';

export default function PageHeader({ title, description }) {
  return (
    <Box 
      as="section" 
      position="relative" 
      py={{ base: 20, md: 28 }}
      bgGradient="linear(to-br, #fcedeb, #ffffff)"
      overflow="hidden"
      textAlign="center"
    >
      {/* Decorative blobs */}
      <Box 
        position="absolute"
        top="-10%"
        left="-10%"
        width="40%"
        height="150%"
        bgGradient="radial(#ff003615, transparent)"
        borderRadius="full"
        filter="blur(60px)"
        zIndex={0}
      />
      <Box 
        position="absolute"
        bottom="-10%"
        right="-5%"
        width="30%"
        height="100%"
        bgGradient="radial(#ff003610, transparent)"
        borderRadius="full"
        filter="blur(40px)"
        zIndex={0}
      />
      
      <Container maxW="4xl" position="relative" zIndex={1}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Heading 
            as="h1" 
            size="3xl" 
            mb={6} 
            color="gray.900"
            fontWeight="bold"
            letterSpacing="tight"
          >
            {title}
          </Heading>
          {description && (
            <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto">
              {description}
            </Text>
          )}
        </motion.div>
      </Container>
    </Box>
  );
}
