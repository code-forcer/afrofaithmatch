"use client";
import HeroSection from "@/components/HeroSection";
import Categories from "@/components/Categories";
import FeaturedStories from "@/components/FeaturedStories";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main>
      {/* 1. Hero — slideshow + stagger entrance */}
      <HeroSection />

      {/* 2. Why Choose Us — glassmorphism feature cards */}
      <Categories />

      {/* 3. Mission + How It Works + Profile Cards */}
      <FeaturedStories />

      {/* 4. Love Stories — drag carousel */}
      <Testimonials />

      {/* 5. Community faith card + Final CTA */}
      <CTASection />
    </main>
  );
}