"use client";

import Image from "next/image";
import {
  MapPin,
  Ruler,
  Bed,
  Bath,
  Car,
  Mail,
  Phone,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Property } from "@/lib/mock-data";
import Link from "next/link";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import PanoramaViewer from "./panorama-viewer";

interface PropertyDetailProps {
  property: Property;
}

export function PropertyDetail({ property }: PropertyDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeView, setActiveView] = useState<"gallery" | "map" | "3d">(
    "gallery"
  );
  const carouselRef = useRef<HTMLDivElement>(null);

  if (!property) {
    return (
      <div className="text-center text-[#a0a0a0] text-lg py-16">
        Propriedade não encontrada.
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.gallery.length - 1 : prev - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Mock coordinates for demonstration - in real app, these would come from property data
  const getMapEmbedUrl = () => {
    const address = encodeURIComponent(
      `${property.address}, ${property.location}`
    );
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${address}`;
  };

  const renderMainContent = () => {
    switch (activeView) {
      case "gallery":
        return (
          <div className="relative w-full h-full overflow-hidden rounded-2xl bg-[#1f1f1f]">
            {/* Main Image */}
            <div className="relative w-full h-full">
              <Image
                src={property.gallery[currentImageIndex] || "/placeholder.svg"}
                alt={`${property.title} - Imagem ${currentImageIndex + 1}`}
                fill
                className="object-cover transition-opacity duration-300"
              />
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
              {/* Image Counter */}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {property.gallery.length}
              </div>
            </div>
            {/* Thumbnail Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-2 rounded-lg">
              {property.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === currentImageIndex
                      ? "bg-[#3655d4] scale-125"
                      : "bg-white/50 hover:bg-white/80"
                  )}
                />
              ))}
            </div>
          </div>
        );
      case "map":
        return (
          <div className="relative w-full h-full overflow-hidden rounded-2xl bg-[#1f1f1f]">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.2962643548447!2d-43.17909368502207!3d-22.97133084501401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bda2ed54ec2e1%3A0x4431d262cad1d163!2sAv.%20Atl%C3%A2ntica%2C%20Copacabana%2C%20Rio%20de%20Janeiro%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1635959999999!5m2!1spt-BR!2sbr`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
            />
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
              📍 {property.address}
            </div>
          </div>
        );
      case "3d":
        return (
          <div className="relative w-full h-full overflow-hidden rounded-2xl bg-[#1f1f1f]">
            <PanoramaViewer
              imageUrl={property.panoramaUrl || '/images/panorama.jpg'}
              height="100%"
              width="100%"
              className="w-full h-full"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="text-center lg:text-left">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
          {property.title}
        </h1>
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

      {/* Main Media Section */}
      <div className="space-y-6">
        {/* Large Media Container */}
        <div className="w-full h-[70vh] min-h-[500px] max-h-[600px]">
          {renderMainContent()}
        </div>

        {/* View Selector */}
        <div className="flex justify-center lg:justify-end">
          <div className="flex bg-[#2a2a2a] rounded-full p-1 border border-white/10">
            <button
              onClick={() => setActiveView("gallery")}
              className={cn(
                "px-6 py-3 rounded-full font-semibold transition-all duration-300 relative",
                activeView === "gallery"
                  ? "bg-[#3655d4] text-white shadow-lg"
                  : "text-[#a0a0a0] hover:text-white hover:bg-white/5"
              )}
            >
              <span className="relative z-10">Galeria</span>
              {activeView === "gallery" && (
                <div className="absolute inset-0 bg-[#3655d4] rounded-full animate-pulse opacity-20"></div>
              )}
            </button>
            <button
              onClick={() => setActiveView("map")}
              className={cn(
                "px-6 py-3 rounded-full font-semibold transition-all duration-300 relative",
                activeView === "map"
                  ? "bg-[#3655d4] text-white shadow-lg"
                  : "text-[#a0a0a0] hover:text-white hover:bg-white/5"
              )}
            >
              <span className="relative z-10">Mapa</span>
              {activeView === "map" && (
                <div className="absolute inset-0 bg-[#3655d4] rounded-full animate-pulse opacity-20"></div>
              )}
            </button>
            <button
              onClick={() => setActiveView("3d")}
              className={cn(
                "px-6 py-3 rounded-full font-semibold transition-all duration-300 relative",
                activeView === "3d"
                  ? "bg-[#3655d4] text-white shadow-lg"
                  : "text-[#a0a0a0] hover:text-white hover:bg-white/5"
              )}
            >
              <span className="relative z-10">Vista 360°</span>
              {activeView === "3d" && (
                <div className="absolute inset-0 bg-[#3655d4] rounded-full animate-pulse opacity-20"></div>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Overview */}
          <Card className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border border-white/10 p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-2xl font-bold text-white">
                Visão Geral
              </CardTitle>
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
              <CardTitle className="text-2xl font-bold text-white">
                Descrição
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-[#a0a0a0] leading-relaxed">
              {property.description}
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border border-white/10 p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-2xl font-bold text-white">
                Características
              </CardTitle>
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
              <CardTitle className="text-2xl font-bold text-white">
                Localização
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center text-[#a0a0a0]">
                <MapPin className="w-5 h-5 mr-2 text-[#3655d4]" />
                <span>
                  {property.address}, {property.location}
                </span>
              </div>
              {property.mapLink && (
                <Link
                  href={property.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
              <CardTitle className="text-2xl font-bold text-white">
                Interessado nesta propriedade?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              <p className="text-[#a0a0a0] text-sm">
                Preencha o formulário abaixo ou entre em contato diretamente.
              </p>
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
                    textShadow:
                      "0 0 10px rgba(54, 85, 212, 0.8), 0 0 20px rgba(54, 85, 212, 0.6)",
                  }}
                >
                  Enviar Mensagem
                </Button>
              </form>
              <div className="border-t border-white/10 pt-6 mt-6 space-y-3">
                <p className="text-white font-semibold">
                  Ou entre em contato direto:
                </p>
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
  );
}
