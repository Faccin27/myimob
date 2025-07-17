import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="px-6 lg:px-36 pt-16 pb-16">
      <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
        {/* left side */}
        <div className="space-y-6 mt-8">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight 2xl:text-nowrap">
            <span className="text-[#fffff]">Ajudando você</span>
            <br />
            <span className="text-[#fffff]">encontrar a sua </span>
            <span className="bg-gradient-to-r from-[#3655d4] to-blue-200 bg-clip-text text-transparent">
              Casa Perfeita
            </span>
          </h1>
        </div>

        {/* right side */}
        <div className="space-y-6 lg:pt-8 lg:ml-32">
          <p className="text-[#a0a0a0] text-lg leading-relaxed">
            Explore uma seleção inspiradora de propriedades urbanas adaptadas
            para o seu estilo de vida. Comece sua busca hoje ou embarque na
            jornada para a vida urbana na sua melhor forma.
          </p>

          <div className="flex gap-4">
            <Button className="bg-[#3665d4] hover:bg-blue-600 text-white px-8 py-4 rounded-full font-normal">
              Explorar mais
            </Button>
            <Button
              variant="outline"
              className="border-[#3665d4] hover:bg-[#c1d3ff] text-[#3665d4] px-8 py-4 rounded-full font-normal"
            >
              Assistir Demo
            </Button>
          </div>
        </div>
      </div>

      {/* hero image */}
      <div className="mb-16">
        <div className="rounded-[45px] overflow-hidden">
          <Image
            src="/images/hero.png"
            alt="urban cityscape skyscrapper at dusk // hero impact image"
            width={1200}
            height={600}
            className="w-full h-[80dvh] object-cover"
          ></Image>
        </div>
      </div>
    </section>
  );
}
