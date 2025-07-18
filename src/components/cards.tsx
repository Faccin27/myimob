"use client";
import Image from "next/image";
import { MapPin, Ruler, Bed, Bath } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";

interface Property {
  id: number;
  title: string;
  location: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
}

const properties: Property[] = [
  {
    id: 1,
    title: "Apartamento de Luxo com Vista Panorâmica",
    location: "Copacabana, Rio de Janeiro",
    area: "1.800 m²",
    bedrooms: 3,
    bathrooms: 4,
    image: "/images/hero.png",
  },
  {
    id: 2,
    title: "Estúdio Moderno no Coração da Cidade",
    location: "Pinheiros, São Paulo",
    area: "600 m²",
    bedrooms: 2,
    bathrooms: 3,
    image: "/images/hero.png",
  },
  {
    id: 3,
    title: "Casa Espaçosa com Jardim Privativo",
    location: "Jurerê Internacional, Florianópolis",
    area: "2.500 m²",
    bedrooms: 4,
    bathrooms: 5,
    image: "/images/hero.png",
  },
  {
    id: 4,
    title: "Loft Urbano com Design Contemporâneo",
    location: "Centro, Salvador",
    area: "950 m²",
    bedrooms: 2,
    bathrooms: 2,
    image: "/images/hero.png",
  },
  {
    id: 5,
    title: "Residência Exclusiva em Condomínio Fechado",
    location: "Alphaville, São Paulo",
    area: "1.600 m²",
    bedrooms: 3,
    bathrooms: 3,
    image: "/images/hero.png",
  },
  {
    id: 6,
    title: "Apartamento Clássico com Charme Histórico",
    location: "Santa Teresa, Rio de Janeiro",
    area: "1.200 m²",
    bedrooms: 3,
    bathrooms: 2,
    image: "/images/hero.png",
  },
  {
    id: 7,
    title: "Cobertura Duplex com Vista Deslumbrante",
    location: "Leblon, Rio de Janeiro",
    area: "3.000 m²",
    bedrooms: 5,
    bathrooms: 6,
    image: "/images/hero.png",
  },
  {
    id: 8,
    title: "Studio Compacto e Funcional",
    location: "Moema, São Paulo",
    area: "550 m²",
    bedrooms: 1,
    bathrooms: 1,
    image: "/images/hero.png",
  },
];

export function PropertyCards() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.pageX - scrollContainer.offsetLeft);
      setScrollLeft(scrollContainer.scrollLeft);
      scrollContainer.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 1.5;
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      scrollContainer.style.cursor = "grab";
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
      scrollContainer.style.cursor = "grab";
    };

    scrollContainer.addEventListener("mousedown", handleMouseDown);
    scrollContainer.addEventListener("mousemove", handleMouseMove);
    scrollContainer.addEventListener("mouseup", handleMouseUp);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      scrollContainer.removeEventListener("mousedown", handleMouseDown);
      scrollContainer.removeEventListener("mousemove", handleMouseMove);
      scrollContainer.removeEventListener("mouseup", handleMouseUp);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDragging, startX, scrollLeft]);

  return (
    <section className="py-20 bg-[#181818] px-6 lg:px-36">
      <div className="mb-12">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          Propriedades em{" "}
          <span className="bg-gradient-to-r from-[#3655d4] to-blue-400 bg-clip-text text-transparent">
            Destaque
          </span>
        </h2>
        <p className="text-[#a0a0a0] text-lg max-w-2xl">
          Descubra nossa seleção exclusiva de propriedades premium,
          cuidadosamente escolhidas para oferecer o melhor em conforto e
          localização.
        </p>
      </div>
      <div>
        <div
          ref={scrollContainerRef}
          className="flex flex-nowrap gap-6 overflow-x-auto pb-4 scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ WebkitOverflowScrolling: "touch" }} // For smooth scrolling on iOS
        >
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex-shrink-0 w-80 bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              style={{ boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="p-3">
                <div className="relative h-48 overflow-hidden rounded-xl">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                    <Button
                      className="bg-[#3655d4] hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold"
                      style={{
                        textShadow:
                          "0 0 10px rgba(54, 85, 212, 0.8), 0 0 20px rgba(54, 85, 212, 0.6)",
                      }}
                    >
                      Ver Mais
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-2">
                <h3 className="text-lg font-bold text-white mb-1 min-h-[3rem]">
                  {property.title}
                </h3>
                <div className="flex items-center text-[#a0a0a0] mb-4">
                  <MapPin className="w-4 h-4 mr-2 text-[#3655d4]" />
                  <span className="text-sm">{property.location}</span>
                </div>
                {/* Features */}
                <div className="flex items-center justify-around border-t border-[#333] pt-4">
                  <div className="flex items-center text-[#a0a0a0]">
                    <Ruler className="w-4 h-4 mr-1 text-[#3655d4]" />
                    <span className="text-sm">{property.area}</span>
                  </div>
                  <div className="flex items-center text-[#a0a0a0]">
                    <Bed className="w-4 h-4 mr-1 text-[#3655d4]" />
                    <span className="text-sm">{property.bedrooms} Quarto</span>
                  </div>
                  <div className="flex items-center text-[#a0a0a0]">
                    <Bath className="w-4 h-4 mr-1 text-[#3655d4]" />
                    <span className="text-sm">
                      {property.bathrooms} Banheiro
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Scroll Indicator and Button */}
      <div className="mt-2 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center text-[#a0a0a0] text-sm">
          <span>Deslize para ver mais propriedades</span>
          <div className="ml-2 flex space-x-1">
            <div className="w-2 h-2 bg-[#3655d4] rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-[#3655d4] rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-[#3655d4] rounded-full animate-pulse delay-200"></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-center lg:justify-end">
          <Button
            onClick={() => {
              window.location.href = "/propriedades";
            }}
            variant="outline"
            className="border-[#3665d4] hover:bg-[#c1d3ff] text-[#3665d4] px-4 lg:px-8 py-2 rounded-full font-normal text-sm bg-transparent"
          >
            Ver casas
          </Button>
          <Button
            onClick={() => {
              window.location.href = "/propriedades";
            }}
            variant="outline"
            className="border-[#3665d4] hover:bg-[#c1d3ff] text-[#3665d4] px-4 lg:px-8 py-2 rounded-full font-normal text-sm bg-transparent"
          >
            Ver apartamentos
          </Button>
          <Button
            onClick={() => {
              window.location.href = "/propriedades";
            }}
            variant="outline"
            className="border-[#3665d4] bg-[#3665d4] hover:bg-[#c1d3ff] text-white px-4 lg:px-8 py-2 rounded-full font-normal transition-all duration-300 text-sm"
          >
            Ver todos
          </Button>
        </div>
      </div>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
