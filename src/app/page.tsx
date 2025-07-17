import { AboutSection } from "@/components/about"
import { PropertyCards } from "@/components/cards"
import { FloatingSearch } from "@/components/floating-search"
import { Header } from "@/components/header"
import HeroSection from "@/components/hero"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#181818] text-white pt-[76px]">
      {" "}
      {/* Add padding-top equal to header height */}
      <Header />
      <HeroSection />
      <AboutSection />
      <PropertyCards />
      <FloatingSearch />
    </div>
  )
}
