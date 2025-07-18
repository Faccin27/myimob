"use client"

import Image from "next/image"
import { MapPin, Ruler, Bed, Bath, Car, Mail, Phone, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Property } from "@/lib/mock-data"
import Link from "next/link"

interface PropertyDetailProps {
  property: Property
}

export function PropertyDetail({ property }: PropertyDetailProps) {
  if (!property) {
    return <div className="text-center text-[#a0a0a0] text-lg py-16">Propriedade não encontrada.</div>
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="text-center lg:text-left">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">{property.title}</h1>
        <div className="flex items-center justify-center lg:justify-start text-[#a0a0a0] mb-4">
          <MapPin className="w-5 h-5 mr-2 text-[#3655d4]" />
          <span className="text-lg">
            {property.address}, {property.location}
          </span>
        </div>
        <p className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#3655d4] to-blue-400 bg-clip-text text-transparent">
          {formatPrice(property.price)}
        </p>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {property.gallery.map((image, index) => (
          <div key={index} className="relative w-full h-60 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={image || "/placeholder.svg"}
              alt={`${property.title} - Imagem ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Overview */}
          <Card className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border border-white/10 p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-2xl font-bold text-white">Visão Geral</CardTitle>
            </CardHeader>
            <CardContent className="p-0 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center text-[#a0a0a0]">
                <Ruler className="w-6 h-6 mb-2 text-[#3655d4]" />
                <span className="text-sm">{property.area}</span>
                <span className="text-xs">Área</span>
              </div>
              <div className="flex flex-col items-center text-[#a0a0a0]">
                <Bed className="w-6 h-6 mb-2 text-[#3655d4]" />
                <span className="text-sm">{property.bedrooms}</span>
                <span className="text-xs">Quartos</span>
              </div>
              <div className="flex flex-col items-center text-[#a0a0a0]">
                <Bath className="w-6 h-6 mb-2 text-[#3655d4]" />
                <span className="text-sm">{property.bathrooms}</span>
                <span className="text-xs">Banheiros</span>
              </div>
              {property.garage > 0 && (
                <div className="flex flex-col items-center text-[#a0a0a0]">
                  <Car className="w-6 h-6 mb-2 text-[#3655d4]" />
                  <span className="text-sm">{property.garage}</span>
                  <span className="text-xs">Vagas</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border border-white/10 p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-2xl font-bold text-white">Descrição</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-[#a0a0a0] leading-relaxed">{property.description}</CardContent>
          </Card>

          {/* Features */}
          <Card className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border border-white/10 p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-2xl font-bold text-white">Características</CardTitle>
            </CardHeader>
            <CardContent className="p-0 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#a0a0a0]">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#3655d4] flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Location & Map */}
          <Card className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border border-white/10 p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-2xl font-bold text-white">Localização</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center text-[#a0a0a0]">
                <MapPin className="w-5 h-5 mr-2 text-[#3655d4]" />
                <span>
                  {property.address}, {property.location}
                </span>
              </div>
              {property.mapLink && (
                <Link href={property.mapLink} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="border-[#3665d4] hover:bg-[#c1d3ff] text-[#3665d4] px-6 py-3 rounded-full font-normal bg-transparent"
                  >
                    Ver no Mapa
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Contact Form */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border border-white/10 p-6 lg:sticky top-24">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-2xl font-bold text-white">Interessado nesta propriedade?</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              <p className="text-[#a0a0a0] text-sm">Preencha o formulário abaixo ou entre em contato diretamente.</p>
              <form className="space-y-4">
                <Input
                  placeholder="Seu Nome"
                  className="bg-[#363636] text-gray-200 placeholder:text-gray-400 border-none"
                />
                <Input
                  type="email"
                  placeholder="Seu Email"
                  className="bg-[#363636] text-gray-200 placeholder:text-gray-400 border-none"
                />
                <Input
                  type="tel"
                  placeholder="Seu Telefone (Opcional)"
                  className="bg-[#363636] text-gray-200 placeholder:text-gray-400 border-none"
                />
                <Textarea
                  placeholder="Sua Mensagem (ex: Gostaria de agendar uma visita)"
                  className="bg-[#363636] text-gray-200 placeholder:text-gray-400 border-none min-h-[100px]"
                />
                <Button
                  type="submit"
                  className="w-full bg-[#3655d4] hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold"
                  style={{
                    textShadow: "0 0 10px rgba(54, 85, 212, 0.8), 0 0 20px rgba(54, 85, 212, 0.6)",
                  }}
                >
                  Enviar Mensagem
                </Button>
              </form>
              <div className="border-t border-white/10 pt-6 mt-6 space-y-3">
                <p className="text-white font-semibold">Ou entre em contato direto:</p>
                <div className="flex items-center gap-3 text-[#a0a0a0]">
                  <Mail className="w-5 h-5 text-[#3655d4]" />
                  <span>{property.contactEmail}</span>
                </div>
                <div className="flex items-center gap-3 text-[#a0a0a0]">
                  <Phone className="w-5 h-5 text-[#3655d4]" />
                  <span>{property.contactPhone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
