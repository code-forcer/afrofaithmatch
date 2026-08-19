'use client';
import {
  Box, Container, SimpleGrid, VStack, Heading, Text, Input, Textarea,
  Button, Flex, Icon,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaUser, FaAt,
  FaCheck, FaInstagram, FaFacebookF, FaTwitter, FaTiktok,
} from 'react-icons/fa';
import PageHeader from '@/components/PageHeader';
import AnimatedSection from '@/components/AnimatedSection';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const contactInfo = [
  {
    icon: FaMapMarkerAlt,
    title: "Our Location",
    details: "123 Faith Avenue, Glory City, GC 12345",
  },
  {
    icon: FaPhoneAlt,
    title: "Phone Number",
    details: "+1 (555) 123-4567",
  },
  {
    icon: FaEnvelope,
    title: "Email Address",
    details: "support@afrofaithmatch.com",
  },
];

const socials = [
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FaTwitter, label: "Twitter" },
  { icon: FaTiktok, label: "TikTok" },
];

function InfoRow({ info, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <MotionBox
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ x: 6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      display="flex"
      alignItems="center"
      gap={4}
      bg="white"
      p={5}
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.100"
      style={{
        boxShadow: hovered
          ? '0 12px 28px rgba(255,0,54,0.12)'
          : '0 2px 8px rgba(0,0,0,0.03)',
      }}
    >
      <Flex
        w={12}
        h={12}
        minW={12}
        bg="#ff003615"
        color="#ff0036"
        borderRadius="lg"
        align="center"
        justify="center"
      >
        <Icon as={info.icon} boxSize={5} />
      </Flex>
      <Box textAlign="left">
        <Text fontWeight="bold" color="gray.900" fontSize="sm">
          {info.title}
        </Text>
        <Text color="gray.600" fontSize="sm">
          {info.details}
        </Text>
      </Box>
    </MotionBox>
  );
}

function FieldInput({ label, icon, ...props }) {
  return (
    <Box w="full">
      <Text as="label" display="block" fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
        {label}
      </Text>
      <Flex
        align="center"
        bg="white"
        rounded="md"
        border="1px solid"
        borderColor="gray.200"
        _focusWithin={{ borderColor: "#ff0036", boxShadow: "0 0 0 1px #ff0036" }}
        transition="all 0.2s"
      >
        <Box pl={4} pr={2} color="gray.400" display="flex" alignItems="center">
          <Icon as={icon} boxSize={4} />
        </Box>
        <Input
          {...props}
          size="lg"
          border="none"
          _focus={{ boxShadow: "none" }}
          bg="transparent"
          pl={2}
        />
      </Flex>
    </Box>
  );
}

export default function ContactPage() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status !== 'idle') return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setTimeout(() => setStatus('idle'), 2200);
    }, 900);
  };

  return (
    <Box as="main" bg="gray.50" minH="100vh" pb={24}>
      <PageHeader
        title="Contact Us"
        description="We're here to help. Reach out to us for any questions or support."
      />

      <Container maxW="7xl" mt={{ base: 8, lg: 12 }}>
        <SimpleGrid columns={{ base: 1, lg: 12 }} gap={{ base: 10, lg: 14 }} alignItems="start">
          {/* ── Left: info column ── */}
          <Box gridColumn={{ base: 'span 1', lg: 'span 5' }}>
            <AnimatedSection direction="right">
              <Box>
              <Text color="#ff0036" fontWeight="bold" textTransform="uppercase" letterSpacing="wide" fontSize="sm" mb={3}>
                Get In Touch
              </Text>
              <Heading as="h2" size="xl" color="gray.900" mb={4} lineHeight="1.25">
                We'd love to hear from you
              </Heading>
              <Text color="gray.600" fontSize="lg" mb={8} lineHeight="1.8">
                Questions, feedback, or need a hand with your account? Our team
                typically responds within 24 hours.
              </Text>

              <VStack spacing={4} align="stretch">
                {contactInfo.map((info, index) => (
                  <InfoRow key={index} info={info} index={index} />
                ))}
              </VStack>

              <Box mt={10}>
                <Text fontWeight="bold" color="gray.900" fontSize="sm" mb={4}>
                  Follow Us
                </Text>
                <Flex gap={3}>
                  {socials.map((s, i) => (
                    <MotionBox
                      key={s.label}
                      as="button"
                      aria-label={s.label}
                      w={11}
                      h={11}
                      borderRadius="full"
                      bg="white"
                      border="1px solid"
                      borderColor="gray.200"
                      color="#ff0036"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      whileHover={{ y: -4, backgroundColor: '#ff0036', color: '#ffffff' }}
                      whileTap={{ scale: 0.92 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Icon as={s.icon} boxSize={4} />
                    </MotionBox>
                  ))}
                </Flex>
              </Box>
              </Box>
            </AnimatedSection>
          </Box>

          {/* ── Right: form ── */}
          <Box gridColumn={{ base: 'span 1', lg: 'span 7' }}>
            <AnimatedSection direction="left" delay={0.15}>
              <Box
                bg="white"
                p={{ base: 6, md: 10 }}
              borderRadius="2xl"
              boxShadow="xl"
              border="1px solid"
              borderColor="gray.100"
            >
              <Heading as="h3" size="lg" color="gray.900" mb={2}>
                Send Us a Message
              </Heading>
              <Text color="gray.600" mb={8}>
                Fill out the form below and we'll get back to you shortly.
              </Text>

              <Box as="form" onSubmit={handleSubmit}>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={4}>
                  <FieldInput label="First Name" icon={FaUser} placeholder="John" required />
                  <FieldInput label="Last Name" icon={FaUser} placeholder="Mark" required />
                </SimpleGrid>

                <Box mb={5}>
                  <FieldInput
                    label="Email Address"
                    icon={FaAt}
                    type="email"
                    placeholder="john@example.com"
                  />
                </Box>

                <Box mb={8}>
                  <Text as="label" display="block" fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                    Message
                  </Text>
                  <Textarea
                    placeholder="How can we help you?"
                    rows={6}
                    size="lg"
                    borderColor="gray.200"
                    focusBorderColor="#ff0036"
                    _hover={{ borderColor: 'gray.300' }}
                  />
                </Box>

                <MotionButton
                  type="submit"
                  w="full"
                  size="lg"
                  h={14}
                  fontSize="lg"
                  borderRadius="xl"
                  bg={status === 'sent' ? '#16a34a' : '#ff0036'}
                  color="white"
                  whileHover={status === 'idle' ? { y: -2, boxShadow: '0 12px 28px rgba(255,0,54,0.3)' } : {}}
                  whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                  transition={{ duration: 0.25 }}
                  isDisabled={status !== 'idle'}
                  _hover={{}}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {status === 'idle' && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                      >
                        Send Message
                      </motion.span>
                    )}
                    {status === 'sending' && (
                      <motion.span
                        key="sending"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                      >
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            border: '2px solid rgba(255,255,255,0.4)',
                            borderTopColor: '#fff',
                            display: 'inline-block',
                          }}
                        />
                        Sending...
                      </motion.span>
                    )}
                    {status === 'sent' && (
                      <motion.span
                        key="sent"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                      >
                        <Icon as={FaCheck} />
                        Message Sent!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </MotionButton>
              </Box>
            </Box>
            </AnimatedSection>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}