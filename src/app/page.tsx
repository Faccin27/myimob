import { AboutSection } from "@/components/about"
import { PropertyCards } from "@/components/cards"
import { FloatingSearch } from "@/components/floating-search"
import { Header } from "@/components/header"
import HeroSection from "@/components/hero"
import { ServicesSection } from "@/components/services"
import {TestimonialsSection} from '@/components/testimonials'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#181818] text-white pt-[76px]">
      {" "}
      <Header />
      <HeroSection />
      <AboutSection />
      <PropertyCards />
      <ServicesSection />
      <TestimonialsSection />
      <FloatingSearch />
    </div>
  )
}
