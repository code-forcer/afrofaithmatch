"use client";

import { useState, useEffect } from "react";
import {
  Box, Container, VStack, HStack, Heading, Text, Input, Button,
  Textarea, SimpleGrid, Flex, Badge, Image, Spinner,
  createListCollection,
} from "@chakra-ui/react";
import { FaCamera, FaTrash, FaStar, FaUser, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { updateProfile, uploadProfilePhoto, deleteProfilePhoto, setMainPhoto } from "@/lib/api";
import { useRouter } from "next/navigation";

const MotionBox = motion(Box);

const DENOMINATIONS = [
  "Catholic", "Baptist", "Anglican", "Pentecostal", "Methodist",
  "Presbyterian", "Seventh-day Adventist", "Evangelical", "Non-denominational", "Orthodox", "Other",
];
const CHURCH_ATTENDANCE = ["Every week", "Few times a month", "Occasionally", "Rarely", "Never"];
const MARITAL_STATUS = ["Single", "Divorced", "Widowed", "Separated"];
const RELATION_GOALS = ["Marriage", "Friendship", "Dating", "Not sure yet"];
const EDUCATION = ["High School", "Some College", "Associate Degree", "Bachelor's Degree", "Master's Degree", "Doctorate", "Trade School", "Other"];

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState({
    gender: "", dateOfBirth: "", country: "", city: "",
    denomination: "", churchAttendance: "", maritalStatus: "Single",
    relationshipGoal: "", bio: "", lookingFor: "", occupation: "",
    education: "", height: "",
  });
  const [photos, setPhotos] = useState([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  // Load existing profile data
  useEffect(() => {
    if (user?.profile) {
      const p = user.profile;
      setProfile({
        gender: p.gender || "",
        dateOfBirth: p.dateOfBirth ? p.dateOfBirth.split("T")[0] : "",
        country: p.country || "",
        city: p.city || "",
        denomination: p.denomination || "",
        churchAttendance: p.churchAttendance || "",
        maritalStatus: p.maritalStatus || "Single",
        relationshipGoal: p.relationshipGoal || "",
        bio: p.bio || "",
        lookingFor: p.lookingFor || "",
        occupation: p.occupation || "",
        education: p.education || "",
        height: p.height || "",
      });
      setPhotos(p.photos || []);
    }
  }, [user]);

  const handleChange = (field) => (e) => {
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: "", text: "" });
    try {
      await updateProfile(profile);
      setMessage({ type: "success", text: "Profile saved successfully! ✓" });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to save profile." });
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const data = await uploadProfilePhoto(file);
      setPhotos((prev) => [...prev, data.photo]);
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Photo upload failed." });
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    try {
      await deleteProfilePhoto(photoId);
      setPhotos((prev) => prev.filter((p) => p._id !== photoId));
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete photo." });
    }
  };

  const handleSetMain = async (photoId) => {
    try {
      await setMainPhoto(photoId);
      setPhotos((prev) => prev.map((p) => ({ ...p, isMain: p._id === photoId })));
    } catch (err) {
      setMessage({ type: "error", text: "Failed to set main photo." });
    }
  };

  if (authLoading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" color="#ff0036" />
      </Flex>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh" py={{ base: 8, md: 16 }}>
      <Container maxW="3xl">
        <VStack gap={8} align="stretch">

          {/* Header */}
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading size="xl" color="gray.800">Edit Your Profile</Heading>
            <Text color="gray.500" mt={1}>
              Complete your profile so others can find and connect with you.
            </Text>
          </MotionBox>

          {/* Status Message */}
          <AnimatePresence>
            {message.text && (
              <MotionBox
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                p={4}
                bg={message.type === "success" ? "green.50" : "red.50"}
                color={message.type === "success" ? "green.700" : "red.600"}
                rounded="lg"
                fontWeight="medium"
              >
                {message.text}
              </MotionBox>
            )}
          </AnimatePresence>

          {/* Photos Section */}
          <Box bg="white" rounded="2xl" shadow="sm" p={6} border="1px solid" borderColor="gray.100">
            <Heading size="md" color="gray.800" mb={4}>
              Profile Photos
            </Heading>
            <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} gap={3} mb={4}>
              {photos.map((photo) => (
                <Box key={photo._id} position="relative" rounded="xl" overflow="hidden" h="120px">
                  <Image src={photo.url} alt="Profile photo" w="full" h="full" objectFit="cover" />
                  {photo.isMain && (
                    <Badge position="absolute" top={1} left={1} bg="#ff0036" color="white" fontSize="9px" px={1.5} py={0.5} rounded="sm">
                      MAIN
                    </Badge>
                  )}
                  <Flex position="absolute" bottom={0} left={0} right={0} bg="rgba(0,0,0,0.5)" p={1} gap={1}>
                    {!photo.isMain && (
                      <Button size="xs" bg="yellow.400" color="white" onClick={() => handleSetMain(photo._id)} p={1} minW="auto">
                        <FaStar />
                      </Button>
                    )}
                    <Button size="xs" bg="red.500" color="white" onClick={() => handleDeletePhoto(photo._id)} p={1} minW="auto">
                      <FaTrash />
                    </Button>
                  </Flex>
                </Box>
              ))}

              {/* Upload button */}
              <Box
                as="label"
                htmlFor="photo-upload"
                h="120px"
                border="2px dashed"
                borderColor={uploading ? "#ff0036" : "gray.200"}
                rounded="xl"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                cursor={uploading ? "wait" : "pointer"}
                _hover={{ borderColor: "#ff0036", bg: "red.50" }}
                transition="all 0.2s"
              >
                {uploading ? (
                  <Spinner size="sm" color="#ff0036" />
                ) : (
                  <>
                    <Box color="gray.400" mb={1}><FaCamera /></Box>
                    <Text fontSize="xs" color="gray.400">Add Photo</Text>
                  </>
                )}
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  display="none"
                  onChange={handlePhotoUpload}
                  disabled={uploading}
                />
              </Box>
            </SimpleGrid>
            <Text fontSize="xs" color="gray.400">Upload up to 6 photos. Click the ★ to set your main photo.</Text>
          </Box>

          {/* Personal Info */}
          <Box bg="white" rounded="2xl" shadow="sm" p={6} border="1px solid" borderColor="gray.100">
            <Heading size="md" color="gray.800" mb={5}>Personal Details</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>

              <Box>
                <Text mb={1.5} fontSize="sm" fontWeight="medium" color="gray.700">Gender</Text>
                <select
                  value={profile.gender}
                  onChange={handleChange("gender")}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0",
                    background: "#F7FAFC",
                    fontSize: "14px",
                    color: profile.gender ? "#1a202c" : "#a0aec0",
                    outline: "none",
                  }}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </Box>

              <Box>
                <Text mb={1.5} fontSize="sm" fontWeight="medium" color="gray.700">Date of Birth</Text>
                <Input
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={handleChange("dateOfBirth")}
                  border="1px solid" borderColor="gray.200" rounded="lg" bg="gray.50"
                  _focus={{ borderColor: "#ff0036", boxShadow: "none" }}
                />
              </Box>

              <Box>
                <Text mb={1.5} fontSize="sm" fontWeight="medium" color="gray.700">Country</Text>
                <Input
                  placeholder="e.g. Nigeria"
                  value={profile.country}
                  onChange={handleChange("country")}
                  border="1px solid" borderColor="gray.200" rounded="lg" bg="gray.50"
                  _focus={{ borderColor: "#ff0036", boxShadow: "none" }}
                />
              </Box>

              <Box>
                <Text mb={1.5} fontSize="sm" fontWeight="medium" color="gray.700">City</Text>
                <Input
                  placeholder="e.g. Lagos"
                  value={profile.city}
                  onChange={handleChange("city")}
                  border="1px solid" borderColor="gray.200" rounded="lg" bg="gray.50"
                  _focus={{ borderColor: "#ff0036", boxShadow: "none" }}
                />
              </Box>

              <Box>
                <Text mb={1.5} fontSize="sm" fontWeight="medium" color="gray.700">Occupation</Text>
                <Input
                  placeholder="e.g. Engineer"
                  value={profile.occupation}
                  onChange={handleChange("occupation")}
                  border="1px solid" borderColor="gray.200" rounded="lg" bg="gray.50"
                  _focus={{ borderColor: "#ff0036", boxShadow: "none" }}
                />
              </Box>

              <Box>
                <Text mb={1.5} fontSize="sm" fontWeight="medium" color="gray.700">Height</Text>
                <Input
                  placeholder="e.g. 5'9"
                  value={profile.height}
                  onChange={handleChange("height")}
                  border="1px solid" borderColor="gray.200" rounded="lg" bg="gray.50"
                  _focus={{ borderColor: "#ff0036", boxShadow: "none" }}
                />
              </Box>
            </SimpleGrid>

            <Box mt={5}>
              <Text mb={1.5} fontSize="sm" fontWeight="medium" color="gray.700">About Me</Text>
              <Textarea
                placeholder="Share a bit about yourself, your faith journey, and what you're looking for..."
                value={profile.bio}
                onChange={handleChange("bio")}
                rows={4}
                border="1px solid" borderColor="gray.200" rounded="lg" bg="gray.50"
                _focus={{ borderColor: "#ff0036", boxShadow: "none" }}
                resize="vertical"
                maxLength={500}
              />
              <Text fontSize="xs" color="gray.400" textAlign="right">{profile.bio.length}/500</Text>
            </Box>
          </Box>

          {/* Faith Details */}
          <Box bg="white" rounded="2xl" shadow="sm" p={6} border="1px solid" borderColor="gray.100">
            <Heading size="md" color="gray.800" mb={5}>
              <Flex align="center" gap={2}>
                <Box color="#ff0036">✝</Box> Faith & Relationship
              </Flex>
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>

              {[
                { label: "Denomination", field: "denomination", options: DENOMINATIONS },
                { label: "Church Attendance", field: "churchAttendance", options: CHURCH_ATTENDANCE },
                { label: "Marital Status", field: "maritalStatus", options: MARITAL_STATUS },
                { label: "Relationship Goal", field: "relationshipGoal", options: RELATION_GOALS },
                { label: "Looking For", field: "lookingFor", options: [["male", "Men"], ["female", "Women"], ["both", "Both"]] },
                { label: "Education", field: "education", options: EDUCATION },
              ].map(({ label, field, options }) => (
                <Box key={field}>
                  <Text mb={1.5} fontSize="sm" fontWeight="medium" color="gray.700">{label}</Text>
                  <select
                    value={profile[field]}
                    onChange={handleChange(field)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: "1px solid #E2E8F0",
                      background: "#F7FAFC",
                      fontSize: "14px",
                      color: profile[field] ? "#1a202c" : "#a0aec0",
                      outline: "none",
                    }}
                  >
                    <option value="">Select {label}</option>
                    {options.map((opt) =>
                      Array.isArray(opt) ? (
                        <option key={opt[0]} value={opt[0]}>{opt[1]}</option>
                      ) : (
                        <option key={opt} value={opt}>{opt}</option>
                      )
                    )}
                  </select>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* Save Button */}
          <Button
            size="lg"
            bg="#ff0036"
            color="white"
            onClick={handleSave}
            loading={saving}
            loadingText="Saving..."
            _hover={{ bg: "#d4002d", transform: "translateY(-1px)" }}
            transition="all 0.2s"
            py={7}
            shadow="md"
          >
            <Flex align="center" gap={2}>
              <FaCheckCircle /> Save Profile
            </Flex>
          </Button>

        </VStack>
      </Container>
    </Box>
  );
}
