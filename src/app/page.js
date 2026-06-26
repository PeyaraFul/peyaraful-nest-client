import Features from "@/components/shared/featuredSection/Features";
import HeroSection from "@/components/shared/Hero";
import RentalStatistics from "@/components/shared/rentalStatistic/RentalStatics";
import WhyChooseUs from "@/components/shared/whyChooseUsSection/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <Features></Features>
      <WhyChooseUs />
      <RentalStatistics />
    </div>
  );
}
