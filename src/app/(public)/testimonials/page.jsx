'use client';
import { Box } from '@chakra-ui/react';
import PageHeader from '@/components/PageHeader';
import Testimonials from '@/components/Testimonials';

export default function TestimonialsPage() {
  return (
    <Box as="main" bg="white" minH="100vh">
      <PageHeader 
        title="Success Stories" 
        description="Read about the couples who found love and faith together on Afro Faith Match." 
      />

      <Box pt={10}>
        <Testimonials />
      </Box>
    </Box>
  );
}
