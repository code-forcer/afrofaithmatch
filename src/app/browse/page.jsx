'use client';
import { Box, Container, SimpleGrid, VStack, Heading, Text, Flex, Icon, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaMapMarkerAlt, FaHeart, FaCheckCircle } from 'react-icons/fa';
import PageHeader from '@/components/PageHeader';
import AnimatedSection from '@/components/AnimatedSection';
const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionFlex = motion(Flex);

const profiles = [
  {
    id: 1,
    name: "Sarah M.",
    age: 28,
    location: "Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=600&auto=format&fit=crop",
    bio: "Passionate about youth ministry and finding someone who puts God first.",
    match: 92,
  },
  {
    id: 2,
    name: "David O.",
    age: 32,
    location: "Accra, Ghana",
    image: "https://images.unsplash.com/photo-1625181796571-7f0d4571ab12?q=80&w=600&auto=format&fit=crop",
    bio: "Worship leader looking for a partner to build a Christ-centered home.",
    match: 87,
  },
  {
    id: 3,
    name: "Grace K.",
    age: 26,
    location: "Nairobi, Kenya",
    image: "https://images.unsplash.com/photo-1527203561188-dae1bc1a417f?q=80&w=600&auto=format&fit=crop",
    bio: "Love serving in the community. Seeking a God-fearing man.",
    match: 95,
  },
  {
    id: 4,
    name: "Michael T.",
    age: 30,
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1612299320930-31e3506614df?q=80&w=600&auto=format&fit=crop",
    bio: "Engineer by day, youth pastor by weekend. Let's pray together.",
    match: 81,
  },
  {
    id: 5,
    name: "Joy A.",
    age: 29,
    location: "Johannesburg, SA",
    image: "https://images.unsplash.com/photo-1512361436605-a484bdb34b5f?q=80&w=600&auto=format&fit=crop",
    bio: "Looking for someone to run the race with. Faith is everything.",
    match: 89,
  },
  {
    id: 6,
    name: "Emmanuel U.",
    age: 34,
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1621624666561-84d0107001dc?q=80&w=600&auto=format&fit=crop",
    bio: "Christian author and speaker. Looking for my Proverbs 31 woman.",
    match: 84,
  }
];

function ProfileCard({ profile, index }) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <AnimatedSection delay={index * 0.1}>
      <MotionBox
        bg="white"
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="lg"
        position="relative"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -10 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        style={{
          boxShadow: hovered
            ? '0 24px 48px rgba(255,0,54,0.18)'
            : '0 10px 30px rgba(0,0,0,0.08)',
        }}
      >
        <Box h="300px" w="full" position="relative" overflow="hidden">
          <MotionImage
            src={profile.image}
            alt={profile.name}
            objectFit="cover"
            w="full"
            h="full"
            animate={{ scale: hovered ? 1.09 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />

          {/* Gradient wash for badge legibility */}
          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(to-t, rgba(0,0,0,0.55) 0%, transparent 45%)"
            pointerEvents="none"
          />

          {/* Match percentage badge, springs in */}
          <MotionFlex
            initial={{ opacity: 0, scale: 0.7, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.05, type: 'spring', stiffness: 260, damping: 16 }}
            position="absolute"
            top={4}
            left={4}
            align="center"
            gap={1.5}
            bg="rgba(255,255,255,0.9)"
            backdropFilter="blur(4px)"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="xs"
            fontWeight="bold"
            color="#ff0036"
          >
            <Box as="span" w="6px" h="6px" borderRadius="full" bg="#22c55e" />
            {profile.match}% Match
          </MotionFlex>

          {/* Like button */}
          <MotionFlex
            as="button"
            onClick={() => setLiked((l) => !l)}
            position="absolute"
            top={4}
            right={4}
            bg="white"
            w={10}
            h={10}
            borderRadius="full"
            align="center"
            justify="center"
            boxShadow="md"
            color={liked ? 'white' : '#ff0036'}
            cursor="pointer"
            animate={{
              backgroundColor: liked ? '#ff0036' : '#ffffff',
              scale: liked ? [1, 1.3, 1] : 1,
            }}
            transition={{ duration: 0.35 }}
          >
            <Icon as={FaHeart} />
          </MotionFlex>

          {/* Verified ribbon, bottom-left over the fade */}
          <Flex
            position="absolute"
            bottom={4}
            left={4}
            align="center"
            gap={1.5}
            fontSize="xs"
            fontWeight="semibold"
            color="white"
            opacity={0.95}
          >
            <Icon as={FaCheckCircle} color="#4ade80" boxSize={3} />
            Bible Verified
          </Flex>
        </Box>

        <VStack align="stretch" p={6} gap={3}>
          <Flex justify="space-between" align="center">
            <Heading as="h3" size="md" color="gray.900">
              {profile.name}, {profile.age}
            </Heading>
          </Flex>
          <Flex align="center" color="gray.500" fontSize="sm">
            <Icon as={FaMapMarkerAlt} mr={2} color="#ff0036" />
            {profile.location}
          </Flex>
          <Text color="gray.600" fontSize="sm" lineHeight="1.6" noOfLines={2}>
            {profile.bio}
          </Text>

          <MotionBox
            as="button"
            mt={4}
            w="full"
            py={3}
            bg="gray.50"
            color="#ff0036"
            fontWeight="bold"
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.100"
            whileHover={{
              backgroundColor: '#ff0036',
              color: '#ffffff',
              borderColor: '#ff0036',
              scale: 1.02,
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            View Profile
          </MotionBox>
        </VStack>
      </MotionBox>
    </AnimatedSection>
  );
}

export default function BrowsePage() {
  return (
    <Box as="main" bg="gray.50" minH="100vh" pb={24}>
      <PageHeader
        title="Browse Profiles"
        description="Discover Christian singles near you who share your faith and values."
      />

      <Container maxW="7xl" mt={12}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10}>
          {profiles.map((profile, index) => (
            <ProfileCard key={profile.id} profile={profile} index={index} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}