import Features from "@/components/shared/featuredSection/Features";
import HeroSection from "@/components/shared/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <Features></Features>
    </div>
  );
}
