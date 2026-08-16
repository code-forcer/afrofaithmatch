"use client";

import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    SimpleGrid,
    Image,
    Flex,
    Icon,
    Button,
} from "@chakra-ui/react";
import { FaHeart, FaUserSecret, FaHandsHelping, FaArrowRight } from "react-icons/fa";

export default function AboutPage() {
    return (
        <>

            <Box bg={{ base: "white", _dark: "black" }} minH="100vh">

                {/* 1. Hero Section - The Mission */}
                <Box
                    py={{ base: 20, md: 32 }}
                    bg={{ base: "blue.50", _dark: "gray.900" }}
                    textAlign="center"
                >
                    <Container maxW="4xl">
                        <Heading
                            size="2xl"
                            mb={6}
                            color={{ base: "gray.900", _dark: "white" }}
                            lineHeight="1.2"
                        >
                            We believe that your <br />
                            <Box as="span" color="blue.500">feelings are valid.</Box>
                        </Heading>
                        <Text fontSize={{ base: "lg", md: "xl" }} color={{ base: "gray.600", _dark: "gray.400" }} maxW="2xl" mx="auto">
                            LekeTheInfoGuy is more than just a website. It is a digital sanctuary for wins, worries, lost opportunities, and the lessons that shape us.
                        </Text>
                    </Container>
                </Box>

                {/* 2. The Story Section */}
                <Container maxW="7xl" py={{ base: 16, md: 24 }}>
                    <Flex direction={{ base: "column", md: "row" }} align="center" gap={12}>
                        {/* Text Side */}
                        <Box flex={1}>
                            <Text
                                fontWeight="bold"
                                color="blue.500"
                                letterSpacing="wide"
                                fontSize="sm"
                                textTransform="uppercase"
                                mb={2}
                            >
                                Our Story
                            </Text>
                            <Heading size="xl" mb={6} color={{ base: "gray.900", _dark: "white" }}>
                                Why we built this safe space
                            </Heading>
                            <VStack spacing={4} align="start" color={{ base: "gray.600", _dark: "gray.400" }} fontSize="lg">
                                <Text>
                                    In a world that is obsessed with "perfect" social media lives, we often forget that it's okay not to be okay. We hide our worries, bury our regrets, and celebrate our wins in silence.
                                </Text>
                                <Text>
                                    I realized that we needed a place where the mask could come off. A place where you can say, "I missed this opportunity," and instead of judgment, you find others who say, "Me too."
                                </Text>
                                <Text>
                                    This platform was built to turn lived experiences into a library of human wisdom.
                                </Text>
                            </VStack>
                        </Box>

                        {/* Image Side */}
                        <Box flex={1} w="full">
                            <Image
                                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop"
                                alt="Friends talking"
                                rounded="2xl"
                                shadow="2xl"
                                objectFit="cover"
                                h={{ base: "300px", md: "500px" }}
                                w="full"
                            />
                        </Box>
                    </Flex>
                </Container>

                {/* 3. Core Values */}
                <Box bg={{ base: "gray.50", _dark: "gray.900" }} py={{ base: 16, md: 24 }}>
                    <Container maxW="7xl">
                        <VStack spacing={12}>
                            <Heading textAlign="center" size="xl" color={{ base: "gray.900", _dark: "white" }}>
                                Our Core Values
                            </Heading>

                            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} w="full">
                                {/* Value 1 */}
                                <VStack
                                    bg={{ base: "white", _dark: "gray.800" }}
                                    p={8}
                                    rounded="xl"
                                    shadow="sm"
                                    align="start"
                                    spacing={4}
                                >
                                    <Box p={3} bg="red.100" color="red.500" rounded="lg">
                                        <Icon as={FaHeart} boxSize={6} />
                                    </Box>
                                    <Heading size="md" color={{ base: "gray.900", _dark: "white" }}>Empathy First</Heading>
                                    <Text color={{ base: "gray.600", _dark: "gray.400" }}>
                                        We listen to understand, not to reply. Every story posted here is treated with respect and kindness.
                                    </Text>
                                </VStack>

                                {/* Value 2 */}
                                <VStack
                                    bg={{ base: "white", _dark: "gray.800" }}
                                    p={8}
                                    rounded="xl"
                                    shadow="sm"
                                    align="start"
                                    spacing={4}
                                >
                                    <Box p={3} bg="blue.100" color="blue.500" rounded="lg">
                                        <Icon as={FaUserSecret} boxSize={6} />
                                    </Box>
                                    <Heading size="md" color={{ base: "gray.900", _dark: "white" }}>Safety & Anonymity</Heading>
                                    <Text color={{ base: "gray.600", _dark: "gray.400" }}>
                                        Your identity is yours to keep. We provide the tools to share your truth without fear of exposure.
                                    </Text>
                                </VStack>

                                {/* Value 3 */}
                                <VStack
                                    bg={{ base: "white", _dark: "gray.800" }}
                                    p={8}
                                    rounded="xl"
                                    shadow="sm"
                                    align="start"
                                    spacing={4}
                                >
                                    <Box p={3} bg="green.100" color="green.500" rounded="lg">
                                        <Icon as={FaHandsHelping} boxSize={6} />
                                    </Box>
                                    <Heading size="md" color={{ base: "gray.900", _dark: "white" }}>Shared Growth</Heading>
                                    <Text color={{ base: "gray.600", _dark: "gray.400" }}>
                                        Your "Lesson Learned" might save someone else from making the same mistake. We grow together.
                                    </Text>
                                </VStack>
                            </SimpleGrid>
                        </VStack>
                    </Container>
                </Box>

                {/* 4. Creator Section */}
                <Container maxW="4xl" py={{ base: 16, md: 24 }} textAlign="center">
                    <Heading size="lg" mb={8} color={{ base: "gray.900", _dark: "white" }}>
                        Meet the Creator
                    </Heading>
                    <Box
                        bg={{ base: "white", _dark: "gray.800" }}
                        p={8}
                        rounded="2xl"
                        border="1px solid"
                        borderColor={{ base: "gray.100", _dark: "gray.700" }}
                    >
                        <Flex direction="column" align="center" gap={4}>
                            <Image
                                src="https://api.dicebear.com/9.x/avataaars/svg?seed=Leke"
                                alt="Leke Avatar"
                                boxSize="100px"
                                rounded="full"
                                bg="blue.100"
                            />
                            <Heading size="md" color={{ base: "gray.900", _dark: "white" }}>Leke</Heading>
                            <Text fontSize="sm" color="blue.500" fontWeight="bold">TheInfoGuy</Text>
                            <Text color={{ base: "gray.600", _dark: "gray.400" }} maxW="lg">
                                "I started this platform because I believe that information isn't just about facts—it's about emotional intelligence. Learning how to navigate our feelings is the most important information we can share."
                            </Text>
                        </Flex>
                    </Box>
                </Container>

                {/* 5. CTA */}
                <Box py={20} bg="blue.600" textAlign="center">
                    <Container maxW="3xl">
                        <Heading color="white" mb={6}>Ready to be part of the story?</Heading>
                        <Button
                            size="lg"
                            bg="white"
                            color="blue.600"
                            _hover={{ bg: "blue.50" }}
                            as="a"
                            href="/write"
                            gap={2}
                        >
                            Share Your First Story <FaArrowRight />
                        </Button>
                    </Container>
                </Box>

            </Box>
        </>
    );
} ``