'use client';
import { Box, Container, SimpleGrid, VStack, Heading, Text, Flex, Icon, Image, Input, Select, Button, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaHeart, FaCheckCircle, FaSearch, FaFilter } from 'react-icons/fa';
import PageHeader from '@/components/PageHeader';
import AnimatedSection from '@/components/AnimatedSection';
import { getProfiles, sendInterest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionFlex = motion(Flex);

function ProfileCard({ profile, index, currentUserId }) {
  const [liked, setLiked] = useState(false);
  const [liking, setLiking] = useState(false);
  const [hovered, setHovered] = useState(false);

  const user = profile.userId;
  const age = profile.dateOfBirth
    ? Math.floor((new Date() - new Date(profile.dateOfBirth)) / (365.25 * 24 * 3600 * 1000))
    : null;

  const mainPhoto = profile.photos?.find((p) => p.isMain)?.url || user?.avatar;

  const handleLike = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (liked || liking) return;
    setLiking(true);
    try {
      await sendInterest(user._id, '');
      setLiked(true);
    } catch {
      setLiked(true); // Already sent
    } finally {
      setLiking(false);
    }
  };

  return (
    <AnimatedSection delay={index * 0.1}>
      <MotionBox
        as="a"
        href={`/profile/${user?._id}`}
        display="block"
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
          textDecoration: 'none',
        }}
      >
        <Box h="300px" w="full" position="relative" overflow="hidden">
          <MotionImage
            src={mainPhoto || `https://ui-avatars.com/api/?name=${user?.name}&background=ff0036&color=fff&size=300`}
            alt={user?.name}
            objectFit="cover"
            w="full"
            h="full"
            animate={{ scale: hovered ? 1.09 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />

          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(to-t, rgba(0,0,0,0.55) 0%, transparent 45%)"
            pointerEvents="none"
          />

          {/* Location badge */}
          {(profile.city || profile.country) && (
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
              <FaMapMarkerAlt size={10} />
              {[profile.city, profile.country].filter(Boolean).join(', ')}
            </MotionFlex>
          )}

          {/* Like button */}
          <MotionFlex
            as="button"
            onClick={handleLike}
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
            {liking ? '...' : <Icon as={FaHeart} />}
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
            {profile.denomination || 'Christian'}
          </Flex>
        </Box>

        <VStack align="stretch" p={6} spacing={3}>
          <Flex justify="space-between" align="center">
            <Heading as="h3" size="md" color="gray.900">
              {user?.name}{age ? `, ${age}` : ''}
            </Heading>
          </Flex>
          {profile.relationshipGoal && (
            <Text fontSize="xs" color="#ff0036" fontWeight="semibold">
              Looking for: {profile.relationshipGoal}
            </Text>
          )}
          <Text color="gray.600" fontSize="sm" lineHeight="1.6" noOfLines={2}>
            {profile.bio || 'Faithful Christian looking for a God-centered relationship.'}
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
  const { user } = useAuth();
  const router = useRouter();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ gender: '', country: '', denomination: '', page: 1 });
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadProfiles();
  }, [filters]);

  const loadProfiles = async () => {
    setLoading(true);
    try {
      const data = await getProfiles(filters);
      setProfiles(data.profiles || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Browse error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field) => (e) => {
    setFilters((prev) => ({ ...prev, [field]: e.target.value, page: 1 }));
  };

  return (
    <Box as="main" bg="gray.50" minH="100vh" pb={24}>
      <PageHeader
        title="Browse Profiles"
        description="Discover Christian singles who share your faith and values."
      />

      <Container maxW="7xl" mt={10}>
        {/* Filters */}
        <Box bg="white" rounded="2xl" shadow="sm" border="1px solid" borderColor="gray.100" p={5} mb={8}>
          <Flex gap={3} flexWrap="wrap" align="center">
            <Box color="gray.500"><FaFilter /></Box>
            {[
              { label: 'Gender', field: 'gender', options: [['', 'All Genders'], ['male', 'Men'], ['female', 'Women']] },
              { label: 'Denomination', field: 'denomination', options: [['', 'All Denominations'], ['Baptist', 'Baptist'], ['Catholic', 'Catholic'], ['Pentecostal', 'Pentecostal'], ['Anglican', 'Anglican'], ['Non-denominational', 'Non-denominational'], ['Other', 'Other']] },
            ].map(({ label, field, options }) => (
              <Box key={field}>
                <select
                  value={filters[field]}
                  onChange={handleFilterChange(field)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                    background: '#F7FAFC',
                    fontSize: '13px',
                    color: '#4a5568',
                  }}
                >
                  {options.map(([val, lbl]) => (
                    <option key={val} value={val}>{lbl}</option>
                  ))}
                </select>
              </Box>
            ))}
            <Input
              placeholder="🔍 Country..."
              value={filters.country}
              onChange={handleFilterChange('country')}
              border="1px solid" borderColor="gray.200" rounded="lg" bg="gray.50"
              fontSize="sm" w="160px" py={2}
              _focus={{ borderColor: '#ff0036', boxShadow: 'none' }}
            />
            <Button
              size="sm" variant="ghost" color="gray.500"
              onClick={() => setFilters({ gender: '', country: '', denomination: '', page: 1 })}
            >
              Clear
            </Button>
          </Flex>
        </Box>

        {/* Grid */}
        {loading ? (
          <Flex justify="center" align="center" h="40vh">
            <VStack gap={3}>
              <Spinner size="xl" color="#ff0036" />
              <Text color="gray.400" fontSize="sm">Finding your matches...</Text>
            </VStack>
          </Flex>
        ) : profiles.length === 0 ? (
          <Box textAlign="center" py={20}>
            <Text fontSize="4xl" mb={3}>🔍</Text>
            <Heading size="md" color="gray.600" mb={2}>No profiles found</Heading>
            <Text color="gray.400">Try adjusting your filters or check back soon as more members join.</Text>
          </Box>
        ) : (
          <>
            <Text fontSize="sm" color="gray.500" mb={4}>{profiles.length} profile{profiles.length !== 1 ? 's' : ''} found</Text>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10}>
              {profiles.map((profile, index) => (
                <ProfileCard
                  key={profile._id}
                  profile={profile}
                  index={index}
                  currentUserId={user?._id}
                />
              ))}
            </SimpleGrid>

            {/* Pagination */}
            {totalPages > 1 && (
              <Flex justify="center" gap={2} mt={10}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Button
                    key={p}
                    size="sm"
                    bg={filters.page === p ? '#ff0036' : 'white'}
                    color={filters.page === p ? 'white' : 'gray.600'}
                    border="1px solid"
                    borderColor={filters.page === p ? '#ff0036' : 'gray.200'}
                    onClick={() => setFilters((prev) => ({ ...prev, page: p }))}
                    _hover={{ borderColor: '#ff0036', color: '#ff0036' }}
                    rounded="lg"
                  >
                    {p}
                  </Button>
                ))}
              </Flex>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}