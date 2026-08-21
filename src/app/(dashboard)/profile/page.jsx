"use client";

import { useState, useEffect } from "react";
import {
  Box, Container, VStack, HStack, Heading, Text, Input, Button,
  Textarea, SimpleGrid, Flex, Badge, Image, Spinner
} from "@chakra-ui/react";
import { FaCamera, FaTrash, FaStar, FaCheckCircle, FaVideo, FaMusic } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { updateProfile, uploadProfilePhoto, deleteProfilePhoto, setMainPhoto } from "@/lib/api";
import { useRouter } from "next/navigation";

const MotionBox = motion(Box);

const DENOMINATIONS = [
  "African Baptist Church", "Assemblies of God Church", "Baptist Church",
  "Christ Apostolic Church", "Christ Embassy", "Church of God",
  "Church of God Mission", "Church of God Mission International",
  "Church of Pentecost", "Deeper Life Church", "Dunamis International Gospel Center",
  "Evangelistic Association", "Four Square Gospel Church", "Gospel Faith Mission",
  "Gospel Light International Ministries", "House On The Rock",
  "International Church of Four Square (USA)", "Kingsway International Christian Centre (KICC)",
  "Living Faith Church (Winners Chapel)", "Methodist Church",
  "Mountain of Fire and Miracles Ministries", "Redeemed Christian Church of God",
  "Salvation Ministries", "Seventh Day Adventist", "The Apostolic Church",
  "Triumph Christian Center", "Other"
];

const STEPS = [
  { id: 1, name: "Basic" },
  { id: 2, name: "Story" },
  { id: 3, name: "Details" },
  { id: 4, name: "Media" },
  { id: 5, name: "Finish" }
];

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState(3); // Start at Details step for now based on context

  const [profile, setProfile] = useState({
    gender: "", country: "", city: "",
    age: "",
    churchAndDenomination: "",
    activelyServing: "",
    favoriteBibleVerse: "",
    datingForMarriage: "",
    lifeCommitmentDate: "",
    christianValues: "",
    marriedBefore: "",
    countryOfOriginAndEthnicity: "",
    openToLongDistance: "",
    pastorObjection: "",
    occupation: "",
    bio: "",
  });
  
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user?.profile) {
      const p = user.profile;
      setProfile({
        gender: p.gender || "",
        country: p.country || "",
        city: p.city || "",
        age: p.age || "",
        churchAndDenomination: p.churchAndDenomination || "",
        activelyServing: p.activelyServing || "",
        favoriteBibleVerse: p.favoriteBibleVerse || "",
        datingForMarriage: p.datingForMarriage || "",
        lifeCommitmentDate: p.lifeCommitmentDate || "",
        christianValues: p.christianValues || "",
        marriedBefore: p.marriedBefore || "",
        countryOfOriginAndEthnicity: p.countryOfOriginAndEthnicity || "",
        openToLongDistance: p.openToLongDistance || "",
        pastorObjection: p.pastorObjection || "",
        occupation: p.occupation || "",
        bio: p.bio || "",
      });
      setPhotos(p.photos || []);
      setVideos(p.videos || []);
      setAudios(p.audios || []);
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

  if (authLoading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" color="#ff0036" />
      </Flex>
    );
  }

  const renderField = (label, field, type="text", options=null, placeholder="") => (
    <Box>
      <Text mb={1.5} fontSize="sm" fontWeight="semibold" color="gray.700">{label}</Text>
      {options ? (
        <Box
          as="select"
          value={profile[field]}
          onChange={handleChange(field)}
          bg="#F7FAFC"
          border="1px solid #E2E8F0"
          _focus={{ borderColor: "#ff0036", boxShadow: "none" }}
          fontSize="14px"
          color={profile[field] ? "#1a202c" : "#a0aec0"}
          w="full"
          h="40px"
          px={3}
          rounded="md"
        >
          <option value="">Select option...</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </Box>
      ) : type === "textarea" ? (
        <Textarea
          value={profile[field]}
          onChange={handleChange(field)}
          placeholder={placeholder}
          bg="#F7FAFC"
          border="1px solid #E2E8F0"
          _focus={{ borderColor: "#ff0036", boxShadow: "none" }}
          rows={3}
        />
      ) : (
        <Input
          type={type}
          value={profile[field]}
          onChange={handleChange(field)}
          placeholder={placeholder}
          bg="#F7FAFC"
          border="1px solid #E2E8F0"
          _focus={{ borderColor: "#ff0036", boxShadow: "none" }}
        />
      )}
    </Box>
  );

  return (
    <Box bg="#e6d4ba" minH="100vh" py={{ base: 6, md: 10 }} backgroundImage="url('/noise.jpeg')" backgroundBlendMode="overlay">
      <Container maxW="4xl">
        <Box bg="white" rounded="2xl" shadow="xl" overflow="hidden">
          
          <Box p={8} bg="#fdfaf3">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <MotionBox key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <Heading size="lg" mb={6} color="gray.800">Basic Info</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    {renderField("Gender", "gender", "text", ["Male", "Female", "Prefer not to say"])}
                    {renderField("Country", "country")}
                    {renderField("City", "city")}
                  </SimpleGrid>
                </MotionBox>
              )}

              {step === 2 && (
                <MotionBox key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <Heading size="lg" mb={6} color="gray.800">Story</Heading>
                  <SimpleGrid columns={1} gap={6}>
                    {renderField("About Me", "bio", "textarea")}
                  </SimpleGrid>
                </MotionBox>
              )}

              {step === 3 && (
                <MotionBox key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <Heading size="lg" mb={6} color="gray.800" borderBottom="1px solid" borderColor="gray.200" pb={3}>About Me</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    {renderField("Age", "age", "number", Array.from({length: 60}, (_, i) => i + 18))}
                    {renderField("When did you commit your life to Christ? *", "lifeCommitmentDate", "text", ["Childhood", "Teenage years", "Adulthood", "Recently"])}
                    
                    {renderField("What is the name of your church and denomination? *", "churchAndDenomination", "text", DENOMINATIONS)}
                    {renderField("What Christian values matter most to you in marriage? *", "christianValues", "text", ["Faithfulness", "Prayer", "Service", "Biblical Submission/Leadership", "Grace and Forgiveness", "Other"])}
                    
                    {renderField("Are you actively serving in church? If yes, in what capacity? *", "activelyServing", "text", ["Not currently serving", "Choir/Worship Team", "Usher/Greeter", "Youth/Children Ministry", "Media/Tech Team", "Prayer/Intercessory Team", "Leadership/Pastoral", "Other"])}
                    {renderField("Favorite Bible verse and why? *", "favoriteBibleVerse", "textarea")}

                    {renderField("Are you dating for marriage? *", "datingForMarriage", "text", ["Yes", "No", "Not sure yet"])}
                    {renderField("Have you ever been married before? *", "marriedBefore", "text", ["No, never married", "Yes, divorced", "Yes, widowed", "Yes, annulled", "Separated"])}

                    {renderField("Country of origin and tribe/ethnicity (optional)", "countryOfOriginAndEthnicity")}
                    {renderField("Current Occupation? *", "occupation")}

                    {renderField("Open to long-distance courtship? *", "openToLongDistance", "text", ["Yes", "No", "Depends on the distance", "Open to relocating"])}
                    {renderField("Would you have objection if at some point our pastors are involved? *", "pastorObjection", "text", ["No objection", "I prefer to wait until engagement", "Yes, I would object"])}
                  </SimpleGrid>
                </MotionBox>
              )}

              {step === 4 && (
                <MotionBox key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <Heading size="lg" mb={6} color="gray.800">Media</Heading>
                  <VStack align="stretch" spacing={8} gap={8}>
                    
                    {/* Photos */}
                    <Box>
                      <Flex justify="space-between" align="center" borderBottom="1px solid" borderColor="gray.300" pb={2} mb={4}>
                        <Text fontWeight="bold" color="gray.700">My Photos</Text>
                        <Text color="gray.500" fontSize="sm">{photos.length} / 10</Text>
                      </Flex>
                      <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} gap={4}>
                        {photos.map((photo) => (
                          <Box key={photo._id} position="relative" rounded="lg" overflow="hidden" h="120px">
                            <Image src={photo.url} alt="Profile photo" w="full" h="full" objectFit="cover" />
                            <Button size="xs" position="absolute" bottom={1} right={1} bg="red.500" color="white" onClick={() => handleDeletePhoto(photo._id)} p={1} minW="auto">
                              <FaTrash />
                            </Button>
                          </Box>
                        ))}
                        {photos.length < 10 && (
                          <Box as="label" h="120px" border="2px dashed" borderColor="gray.300" rounded="lg" display="flex" flexDirection="column" alignItems="center" justifyContent="center" cursor="pointer" _hover={{ bg: "gray.100" }}>
                            {uploading ? <Spinner size="sm" /> : <><FaCamera color="gray.400" /><Text fontSize="xs" mt={2} color="gray.500">add new</Text></>}
                            <Input type="file" accept="image/*" display="none" onChange={handlePhotoUpload} disabled={uploading} />
                          </Box>
                        )}
                      </SimpleGrid>
                    </Box>

                    {/* Videos */}
                    <Box>
                      <Flex justify="space-between" align="center" borderBottom="1px solid" borderColor="gray.300" pb={2} mb={4}>
                        <Text fontWeight="bold" color="gray.700">My Videos</Text>
                        <Text color="gray.500" fontSize="sm">{videos.length} / 10</Text>
                      </Flex>
                      <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} gap={4}>
                        {videos.length < 10 && (
                          <Box as="label" h="120px" border="2px dashed" borderColor="gray.300" rounded="lg" display="flex" flexDirection="column" alignItems="center" justifyContent="center" cursor="pointer" _hover={{ bg: "gray.100" }}>
                            <FaVideo color="gray.400" />
                            <Text fontSize="xs" mt={2} color="gray.500">add new</Text>
                            <Input type="file" accept="video/*" display="none" disabled={true} />
                          </Box>
                        )}
                      </SimpleGrid>
                    </Box>

                    {/* Audios */}
                    <Box>
                      <Flex justify="space-between" align="center" borderBottom="1px solid" borderColor="gray.300" pb={2} mb={4}>
                        <Text fontWeight="bold" color="gray.700">My Audio Files</Text>
                        <Text color="gray.500" fontSize="sm">{audios.length} / 10</Text>
                      </Flex>
                      <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} gap={4}>
                        {audios.length < 10 && (
                          <Box as="label" h="120px" border="2px dashed" borderColor="gray.300" rounded="lg" display="flex" flexDirection="column" alignItems="center" justifyContent="center" cursor="pointer" _hover={{ bg: "gray.100" }}>
                            <FaMusic color="gray.400" />
                            <Text fontSize="xs" mt={2} color="gray.500">add new</Text>
                            <Input type="file" accept="audio/*" display="none" disabled={true} />
                          </Box>
                        )}
                      </SimpleGrid>
                    </Box>

                  </VStack>
                </MotionBox>
              )}

              {step === 5 && (
                <MotionBox key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} textAlign="center" py={10}>
                  <Heading size="lg" mb={4} color="gray.800">Finish</Heading>
                  <Text color="gray.600" mb={8}>You're all set! Review your details and save your profile.</Text>
                  
                  {message.text && (
                    <Box p={4} mb={6} bg={message.type === "success" ? "green.50" : "red.50"} color={message.type === "success" ? "green.700" : "red.600"} rounded="lg" fontWeight="medium">
                      {message.text}
                    </Box>
                  )}

                  <Button size="lg" bg="#ff0036" color="white" onClick={handleSave} loading={saving} loadingText="Saving..." _hover={{ bg: "#d4002d" }} px={10} py={7} rounded="full">
                    <Flex align="center" gap={2}><FaCheckCircle /> Save Profile</Flex>
                  </Button>
                </MotionBox>
              )}
            </AnimatePresence>
          </Box>

          {/* Navigation & Stepper */}
          <Box p={6} bg="gray.50" borderTop="1px solid" borderColor="gray.200">
            <Flex justify="space-between" align="center" mb={6}>
              <Button variant="ghost" onClick={() => setStep(s => Math.max(1, s - 1))} isDisabled={step === 1} color="gray.600">
                &larr; Back
              </Button>
              <Button variant="ghost" onClick={() => setStep(s => Math.min(5, s + 1))} isDisabled={step === 5} color="gray.600" fontWeight="bold">
                Next &rarr;
              </Button>
            </Flex>

            <Flex justify="center" gap={{ base: 2, md: 8 }} flexWrap="wrap">
              {STEPS.map((s) => (
                <Flex key={s.id} align="center" gap={2} cursor="pointer" onClick={() => setStep(s.id)} opacity={step === s.id ? 1 : 0.5} _hover={{ opacity: 0.8 }} transition="all 0.2s">
                  <Badge bg={step === s.id ? "gray.700" : "gray.300"} color="white" rounded="full" px={2} py={1}>
                    0{s.id}
                  </Badge>
                  <Text fontSize="sm" fontWeight="bold" color="gray.700" display={{ base: "none", sm: "block" }}>
                    {s.name}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Box>

        </Box>
      </Container>
    </Box>
  );
}
