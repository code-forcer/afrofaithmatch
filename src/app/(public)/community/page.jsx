"use client";

import { Box, Container, SimpleGrid, VStack, Heading, Text, Flex, Icon, Image, Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaHeart, FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import { getPublicProfiles } from "@/lib/api";

const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionFlex = motion(Flex);

function ProfileCard({ profile, index }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  // Users must login to like/send interest
  const handleLikeClick = (e) => {
    e.stopPropagation();
    router.push("/login?redirect=true&message=Please login to send interests");
  };

  const handleViewProfile = () => {
    router.push(`/community/${profile.userId._id}`);
  };

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
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        style={{
          boxShadow: hovered
            ? "0 24px 48px rgba(255,0,54,0.18)"
            : "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <Box h="300px" w="full" position="relative" overflow="hidden">
          <MotionImage
            src={profile.userId?.avatar || `https://ui-avatars.com/api/?name=${profile.userId?.name}&background=ff0036&color=fff&size=200`}
            alt={profile.userId?.name || "User"}
            objectFit="cover"
            w="full"
            h="full"
            animate={{ scale: hovered ? 1.09 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
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
            transition={{ delay: 0.2 + index * 0.05, type: "spring", stiffness: 260, damping: 16 }}
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
            New User
          </MotionFlex>

          {/* Like button (redirects to login) */}
          <MotionFlex
            as="button"
            onClick={handleLikeClick}
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
            color="#ff0036"
            cursor="pointer"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <Icon as={FaHeart} />
          </MotionFlex>

          {/* Verified ribbon */}
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
            Verified Member
          </Flex>
        </Box>

        <VStack align="stretch" p={6} spacing={3}>
          <Flex justify="space-between" align="center">
            <Heading as="h3" size="md" color="gray.900" truncate>
              {profile.userId?.name}
              {profile.dateOfBirth && (
                <>, {new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear()}</>
              )}
            </Heading>
          </Flex>
          <Flex align="center" color="gray.500" fontSize="sm">
            <Icon as={FaMapMarkerAlt} mr={2} color="#ff0036" flexShrink={0} />
            <Text truncate>{profile.country || "Global"}</Text>
          </Flex>
          <Text color="gray.600" fontSize="sm" lineHeight="1.6" noOfLines={2}>
            {profile.bio || "This user hasn't written a bio yet."}
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
            onClick={handleViewProfile}
            whileHover={{
              backgroundColor: "#ff0036",
              color: "#ffffff",
              borderColor: "#ff0036",
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

export default function CommunityPage() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      setLoading(true);
      const data = await getPublicProfiles(1, 12);
      setProfiles(data.profiles || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box as="main" bg="gray.50" minH="100vh" pb={24}>
      <PageHeader
        title="Community Profiles"
        description="Discover Christian singles globally. Login to match, chat, and connect!"
      />

      <Container maxW="7xl" mt={12}>
        {loading ? (
          <Flex justify="center" py={20}>
            <Spinner size="xl" color="#ff0036" />
          </Flex>
        ) : profiles.length === 0 ? (
          <Flex justify="center" py={20}>
            <Text color="gray.500">No public profiles found yet.</Text>
          </Flex>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10}>
            {profiles.map((profile, index) => (
              <ProfileCard key={profile._id} profile={profile} index={index} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
}