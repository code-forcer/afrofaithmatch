'use client';
import { Box, Container, SimpleGrid, Text, Heading, VStack, Icon, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaHeart, FaHandsHelping, FaGlobeAfrica, FaCross } from 'react-icons/fa';
import PageHeader from '@/components/PageHeader';
import AnimatedSection from '@/components/AnimatedSection';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

export default function AboutUsPage() {
  const values = [
    {
      title: "Faith First",
      description: "We believe that a strong foundation in Christ is the key to a lasting and fulfilling marriage.",
      icon: FaCross,
    },
    {
      title: "Authentic Connections",
      description: "We foster an environment where members can build genuine, meaningful relationships.",
      icon: FaHeart,
    },
    {
      title: "Community Driven",
      description: "Our platform is designed to support and uplift the Christian community worldwide.",
      icon: FaHandsHelping,
    },
    {
      title: "Global Reach",
      description: "Connecting faithful singles across borders and cultures, united by one belief.",
      icon: FaGlobeAfrica,
    }
  ];

  return (
    <Box as="main" bg="white" minH="100vh" overflowX="hidden">
      <PageHeader
        title="About Afro Faith Match"
        description="Discover our mission to connect Christian singles globally, grounded in faith and purpose."
      />

      {/* ── Our Story ── */}
      <Box py={20} position="relative">
        {/* Ambient decorative blob */}
        <MotionBox
          position="absolute"
          top="-10%"
          right="-6%"
          w="380px"
          h="380px"
          bg="#ff003608"
          borderRadius="full"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          pointerEvents="none"
        />

        <Container maxW="7xl" position="relative">
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={16} alignItems="center">
            <AnimatedSection direction="right">
              <Box position="relative">
                <MotionBox
                  position="absolute"
                  top="-4"
                  left="-4"
                  w="20"
                  h="20"
                  bg="#ff0036"
                  opacity={0.1}
                  borderRadius="full"
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <MotionBox
                  w="full"
                  h="400px"
                  bg="gray.100"
                  borderRadius="2xl"
                  overflow="hidden"
                  boxShadow="xl"
                  position="relative"
                  zIndex={1}
                  initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ type: 'spring', stiffness: 120, damping: 16 }}
                  whileHover={{ scale: 1.015 }}
                >
                  <Box
                    as="img"
                    src="/images/about/a1.jpg"
                    alt="A Christian couple who found each other through shared faith"
                    w="full"
                    h="full"
                    objectFit="cover"
                  />
                </MotionBox>

                {/* Small floating stat card */}
                <MotionBox
                  initial={{ opacity: 0, y: 20, scale: 0.85 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 260, damping: 15 }}
                  animate={{ y: [0, -8, 0] }}
                  style={{ animationDuration: '4s' }}
                  position="absolute"
                  bottom="-6"
                  right="-6"
                  bg="white"
                  borderRadius="xl"
                  boxShadow="lg"
                  px={5}
                  py={4}
                  zIndex={2}
                >
                  <Text fontSize="2xl" fontWeight="bold" color="#ff0036" lineHeight="1">
                    10,000+
                  </Text>
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    Faith-verified members
                  </Text>
                </MotionBox>
              </Box>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.2}>
              <VStack align="flex-start" gap={6}>
                <Text color="#ff0036" fontWeight="bold" textTransform="uppercase" letterSpacing="wide">
                  Our Story
                </Text>
                <Heading as="h2" size="2xl" color="gray.900" fontWeight="bold" lineHeight="1.2">
                  Built on Faith, Designed for Love.
                </Heading>
                <Text fontSize="lg" color="gray.600" lineHeight="1.8">
                  Afro Faith Match was born out of a desire to create a safe, welcoming, and faith-centered environment for Christian singles to meet. In a world where values are often compromised, we wanted to build a platform where your faith is celebrated, not hidden.
                </Text>
                <Text fontSize="lg" color="gray.600" lineHeight="1.8">
                  Whether you are looking for fellowship, friendship, or a lifelong partner, our community is here to support you in your journey towards a Christ-centered relationship.
                </Text>
              </VStack>
            </AnimatedSection>
          </SimpleGrid>
        </Container>
      </Box>

      {/* ── Core Values ── */}
      <Box py={20} bg="gray.50">
        <Container maxW="7xl">
          <AnimatedSection direction="up">
            <VStack mb={16} textAlign="center">
              <Heading as="h2" size="2xl" color="gray.900">Our Core Values</Heading>
              <Text fontSize="lg" color="gray.600" maxW="2xl">
                The principles that guide everything we do at Afro Faith Match.
              </Text>
            </VStack>
          </AnimatedSection>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            gap={{ base: 6, md: 8 }}
            rowGap={{ base: 6, md: 10 }}
          >
            {values.map((value, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <ValueCard value={value} />
              </AnimatedSection>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
}

function ValueCard({ value }) {
  const [hovered, setHovered] = useState(false);

  return (
    <MotionBox
      bg="white"
      p={8}
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.100"
      h="full"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      style={{
        boxShadow: hovered
          ? '0 20px 36px rgba(255,0,54,0.14)'
          : '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <MotionFlex
        w={12}
        h={12}
        bg="#ff003615"
        color="#ff0036"
        borderRadius="lg"
        align="center"
        justify="center"
        mb={6}
        animate={{ rotate: hovered ? -8 : 0, scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.35 }}
      >
        <Icon as={value.icon} boxSize={5} />
      </MotionFlex>
      <Heading as="h3" size="md" mb={3} color="gray.900">
        {value.title}
      </Heading>
      <Text color="gray.600" lineHeight="1.6">
        {value.description}
      </Text>
    </MotionBox>
  );
}