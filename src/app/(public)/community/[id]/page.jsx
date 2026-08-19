"use client";

import { useState, useEffect } from "react";
import {
  Box, Container, VStack, HStack, Heading, Text, Button, Flex,
  Image, Badge, SimpleGrid, Spinner, Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt, FaHeart, FaChurch, FaUser, FaArrowLeft,
  FaBirthdayCake, FaBriefcase, FaGraduationCap, FaCheckCircle,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { getPublicUserProfile, sendInterest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import PageHeader from "@/components/PageHeader";

const MotionBox = motion(Box);

function InfoRow({ icon, label, value }) {
  if (!value) return null;
  return (
    <Flex align="center" gap={3} py={2.5} borderBottom="1px solid" borderColor="gray.100">
      <Box color="#ff0036" fontSize="14px">{icon}</Box>
      <Text fontSize="sm" color="gray.500" w="120px" flexShrink={0}>{label}</Text>
      <Text fontSize="sm" color="gray.800" fontWeight="medium">{value}</Text>
    </Flex>
  );
}

export default function UserProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interestSent, setInterestSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    getPublicUserProfile(id)
      .then(setData)
      .catch(() => setError("Profile not found."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSendInterest = async () => {
    if (!user) { router.push("/login?redirect=true&message=Please login to send interests"); return; }
    setSending(true);
    try {
      await sendInterest(id, "");
      setInterestSent(true);
    } catch (err) {
      if (err.message?.includes("already")) setInterestSent(true);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" color="#ff0036" />
      </Flex>
    );
  }

  if (error || !data) {
    return (
      <Box minH="100vh" bg="gray.50" py={20}>
        <Container maxW="md" textAlign="center">
          <Heading size="lg" color="gray.700" mb={2}>Profile Not Found</Heading>
          <Text color="gray.500" mb={6}>This profile may have been removed or doesn't exist.</Text>
          <Button onClick={() => router.push("/community")} bg="#ff0036" color="white">
            Back to Community
          </Button>
        </Container>
      </Box>
    );
  }

  const { user: profileUser, profile } = data;
  const photos = profile?.photos || [];
  const mainPhoto = photos.find((p) => p.isMain)?.url || profileUser?.avatar;
  const allPhotos = mainPhoto ? [{ url: mainPhoto }, ...photos.filter((p) => !p.isMain)] : photos;

  const age = profile?.dateOfBirth
    ? Math.floor((new Date() - new Date(profile.dateOfBirth)) / (365.25 * 24 * 3600 * 1000))
    : null;

  return (
    <Box bg="gray.50" minH="100vh" pb={20}>
      {/* Back button */}
      <Box bg="white" borderBottom="1px solid" borderColor="gray.100" py={3}>
        <Container maxW="5xl">
          <Button
            variant="ghost"
            leftIcon={<FaArrowLeft />}
            onClick={() => router.push("/community")}
            color="gray.600"
            _hover={{ color: "#ff0036" }}
          >
            Back
          </Button>
        </Container>
      </Box>

      <Container maxW="5xl" mt={8}>
        <SimpleGrid columns={{ base: 1, md: 5 }} gap={8}>

          {/* Left — Photos */}
          <Box gridColumn={{ md: "span 2" }}>
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Main photo */}
              <Box rounded="2xl" overflow="hidden" shadow="lg" mb={3} position="relative" h="380px">
                <Image
                  src={allPhotos[activePhoto]?.url || "https://via.placeholder.com/400x380?text=No+Photo"}
                  alt={profileUser.name}
                  w="full" h="full" objectFit="cover"
                />
                {profile?.verified && (
                  <Badge
                    position="absolute" top={3} left={3}
                    bg="green.500" color="white"
                    px={2} py={1} rounded="full" fontSize="xs"
                    display="flex" alignItems="center" gap={1}
                  >
                    <FaCheckCircle /> Verified
                  </Badge>
                )}
              </Box>

              {/* Thumbnails */}
              {allPhotos.length > 1 && (
                <SimpleGrid columns={4} gap={2}>
                  {allPhotos.slice(0, 4).map((photo, i) => (
                    <Box
                      key={i}
                      h="70px" rounded="lg" overflow="hidden" cursor="pointer"
                      border="2px solid"
                      borderColor={activePhoto === i ? "#ff0036" : "transparent"}
                      onClick={() => setActivePhoto(i)}
                      transition="all 0.2s"
                    >
                      <Image src={photo.url} w="full" h="full" objectFit="cover" />
                    </Box>
                  ))}
                </SimpleGrid>
              )}

              {/* Interest button */}
              <MotionBox
                as="button"
                mt={5}
                w="full"
                py={4}
                rounded="xl"
                bg={interestSent ? "green.500" : "#ff0036"}
                color="white"
                fontWeight="bold"
                fontSize="md"
                onClick={handleSendInterest}
                disabled={interestSent || sending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
                shadow="md"
              >
                {sending ? (
                  <Spinner size="sm" color="white" />
                ) : interestSent ? (
                  <><FaCheckCircle /> Interest Sent!</>
                ) : (
                  <><FaHeart /> Send Interest</>
                )}
              </MotionBox>
            </MotionBox>
          </Box>

          {/* Right — Profile info */}
          <Box gridColumn={{ md: "span 3" }}>
            <MotionBox
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <VStack align="stretch" gap={6}>

                {/* Name & location */}
                <Box>
                  <Heading size="2xl" color="gray.900">
                    {profileUser.name}{age ? `, ${age}` : ""}
                  </Heading>
                  {(profile?.city || profile?.country) && (
                    <Flex align="center" gap={1.5} color="gray.500" mt={2}>
                      <FaMapMarkerAlt size={12} color="#ff0036" />
                      <Text fontSize="sm">
                        {[profile.city, profile.country].filter(Boolean).join(", ")}
                      </Text>
                    </Flex>
                  )}
                  {profile?.denomination && (
                    <Badge mt={2} bg="red.50" color="#ff0036" px={3} py={1} rounded="full" fontSize="xs">
                      ✝ {profile.denomination}
                    </Badge>
                  )}
                </Box>

                {/* Bio */}
                {profile?.bio && (
                  <Box bg="white" rounded="xl" p={5} shadow="sm" border="1px solid" borderColor="gray.100">
                    <Heading size="sm" color="gray.700" mb={2}>About</Heading>
                    <Text color="gray.600" lineHeight="1.8" fontSize="sm">{profile.bio}</Text>
                  </Box>
                )}

                {/* Details */}
                <Box bg="white" rounded="xl" p={5} shadow="sm" border="1px solid" borderColor="gray.100">
                  <Heading size="sm" color="gray.700" mb={3}>Profile Details</Heading>
                  <InfoRow icon={<FaChurch />} label="Denomination" value={profile?.denomination} />
                  <InfoRow icon={<FaChurch />} label="Attends Church" value={profile?.churchAttendance} />
                  <InfoRow icon={<FaHeart />} label="Relationship Goal" value={profile?.relationshipGoal} />
                  <InfoRow icon={<FaUser />} label="Marital Status" value={profile?.maritalStatus} />
                  <InfoRow icon={<FaBriefcase />} label="Occupation" value={profile?.occupation} />
                  <InfoRow icon={<FaGraduationCap />} label="Education" value={profile?.education} />
                  <InfoRow icon={<FaUser />} label="Height" value={profile?.height} />
                </Box>

                {/* Profile views */}
                <Text fontSize="xs" color="gray.400" textAlign="right">
                  {profile?.profileViews || 0} profile views
                </Text>

              </VStack>
            </MotionBox>
          </Box>

        </SimpleGrid>
      </Container>
    </Box>
  );
}
