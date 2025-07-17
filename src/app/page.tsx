import { AboutSection } from "@/components/about";
import { PropertyCards } from "@/components/cards";
import { Header } from "@/components/header";
import HeroSection from "@/components/hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#181818] text-white">
      <Header />
      <HeroSection />
      <AboutSection />
      <PropertyCards />
    </div>
  );
}
