import Image from "next/image"
import { MapPin, Ruler, Bed, Bath, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Property } from "@/lib/mock-data" 

interface PropertyGridProps {
  properties: Property[]
}

export function PropertyGrid({ properties }: PropertyGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {properties.map((property) => (
        <div
          key={property.id}
          className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
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
                    textShadow: "0 0 10px rgba(54, 85, 212, 0.8), 0 0 20px rgba(54, 85, 212, 0.6)",
                  }}
                >
                  Ver Mais
                </Button>
              </div>
            </div>
          </div>
          <div className="p-4 pt-2">
            <h3 className="text-lg font-bold text-white mb-1 min-h-[3rem]">{property.title}</h3>
            <div className="flex items-center text-[#a0a0a0] mb-2">
              <MapPin className="w-4 h-4 mr-2 text-[#3655d4]" />
              <span className="text-sm">{property.location}</span>
            </div>
            <div className="text-white text-xl font-bold mb-4">R$ {property.price.toLocaleString("pt-BR")}</div>
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
                <span className="text-sm">{property.bathrooms} Banheiro</span>
              </div>
              {property.garage > 0 && (
                <div className="flex items-center text-[#a0a0a0]">
                  <Car className="w-4 h-4 mr-1 text-[#3655d4]" />
                  <span className="text-sm">{property.garage} Garagem</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
