import React from "react";
import HeroSection from "../components/sections/hero.jsx";
import TestimonialSection from "../components/sections/testimonials.jsx";
import FAQSection from "../components/sections/frequentlyAskedQuestions.jsx";
import PlatformFeaturesSection from "../components/sections/features.jsx";

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <ProductPreview /> */}
      <PlatformFeaturesSection />
      <TestimonialSection />
      <FAQSection />
    </>
  );
}