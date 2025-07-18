"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Bed, Bath, Car, DollarSign } from "lucide-react"
import { mockLocations } from "@/lib/mock-data"

interface PropertiesFilterProps {
  onFilterChange: (filters: {
    minPrice: number | undefined
    maxPrice: number | undefined
    bedrooms: number | undefined
    bathrooms: number | undefined
    garage: boolean | undefined
    location: string | undefined
  }) => void
}

export function PropertiesFilter({ onFilterChange }: PropertiesFilterProps) {
  const [minPrice, setMinPrice] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<string>("")
  const [bedrooms, setBedrooms] = useState<string>("any")
  const [bathrooms, setBathrooms] = useState<string>("any")
  const [garage, setGarage] = useState<string>("any")
  const [locationQuery, setLocationQuery] = useState<string>("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
  const locationInputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutsideInput = (event: MouseEvent) => {
      if (locationInputRef.current && !locationInputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutsideInput)
    return () => document.removeEventListener("mousedown", handleClickOutsideInput)
  }, [])

  const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setLocationQuery(query)

    if (query.length > 0) {
      const filteredSuggestions = mockLocations.filter((loc: any) => loc.toLowerCase().includes(query.toLowerCase()))
      setSuggestions(filteredSuggestions)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSelectSuggestion = (suggestion: string) => {
    setLocationQuery(suggestion)
    setShowSuggestions(false)
  }

  const applyFilters = () => {
    onFilterChange({
      minPrice: minPrice ? Number.parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? Number.parseFloat(maxPrice) : undefined,
      bedrooms: bedrooms === "any" ? undefined : Number.parseInt(bedrooms),
      bathrooms: bathrooms === "any" ? undefined : Number.parseInt(bathrooms),
      garage: garage === "yes" ? true : garage === "no" ? false : undefined,
      location: locationQuery || undefined,
    })
  }

  const clearFilters = () => {
    setMinPrice("")
    setMaxPrice("")
    setBedrooms("any")
    setBathrooms("any")
    setGarage("any")
    setLocationQuery("")
    setSuggestions([])
    setShowSuggestions(false)
    onFilterChange({
      minPrice: undefined,
      maxPrice: undefined,
      bedrooms: undefined,
      bathrooms: undefined,
      garage: undefined,
      location: undefined,
    })
  }

  return (
    <div className="bg-[#2a2a2a] rounded-2xl p-6 shadow-xl mb-12">
      <h3 className="text-2xl font-bold text-white mb-6">Filtrar Propriedades</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {/* Price Range */}
        <div className="col-span-full md:col-span-2 lg:col-span-1 flex gap-2">
          <div className="relative flex-1">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="number"
              placeholder="Preço Mín."
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="pl-9 bg-[#363636] text-gray-200 placeholder:text-gray-400 border-none"
            />
          </div>
          <div className="relative flex-1">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="number"
              placeholder="Preço Máx."
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="pl-9 bg-[#363636] text-gray-200 placeholder:text-gray-400 border-none"
            />
          </div>
        </div>

        {/* Bedrooms */}
        <Select value={bedrooms} onValueChange={setBedrooms}>
          <SelectTrigger className="w-full bg-[#363636] text-gray-200 border-none">
            <Bed className="w-4 h-4 mr-2 text-gray-400" />
            <SelectValue placeholder="Quartos" />
          </SelectTrigger>
          <SelectContent className="bg-[#363636] text-white border-[#444]">
            <SelectItem value="any">Qualquer</SelectItem>
            <SelectItem value="1">1+ Quarto</SelectItem>
            <SelectItem value="2">2+ Quartos</SelectItem>
            <SelectItem value="3">3+ Quartos</SelectItem>
            <SelectItem value="4">4+ Quartos</SelectItem>
            <SelectItem value="5">5+ Quartos</SelectItem>
          </SelectContent>
        </Select>

        {/* Bathrooms */}
        <Select value={bathrooms} onValueChange={setBathrooms}>
          <SelectTrigger className="w-full bg-[#363636] text-gray-200 border-none">
            <Bath className="w-4 h-4 mr-2 text-gray-400" />
            <SelectValue placeholder="Banheiros" />
          </SelectTrigger>
          <SelectContent className="bg-[#363636] text-white border-[#444]">
            <SelectItem value="any">Qualquer</SelectItem>
            <SelectItem value="1">1+ Banheiro</SelectItem>
            <SelectItem value="2">2+ Banheiros</SelectItem>
            <SelectItem value="3">3+ Banheiros</SelectItem>
            <SelectItem value="4">4+ Banheiros</SelectItem>
          </SelectContent>
        </Select>

        {/* Garage */}
        <Select value={garage} onValueChange={setGarage}>
          <SelectTrigger className="w-full bg-[#363636] text-gray-200 border-none">
            <Car className="w-4 h-4 mr-2 text-gray-400" />
            <SelectValue placeholder="Garagem" />
          </SelectTrigger>
          <SelectContent className="bg-[#363636] text-white border-[#444]">
            <SelectItem value="any">Qualquer</SelectItem>
            <SelectItem value="yes">Sim</SelectItem>
            <SelectItem value="no">Não</SelectItem>
          </SelectContent>
        </Select>

        {/* Location */}
        <div className="relative col-span-full md:col-span-2 lg:col-span-1" ref={locationInputRef}>
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Localização"
            value={locationQuery}
            onChange={handleLocationInputChange}
            className="pl-9 bg-[#363636] text-gray-200 placeholder:text-gray-400 border-none"
            aria-autocomplete="list"
            aria-expanded={showSuggestions}
            role="combobox"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul
              className="absolute top-full mt-2 w-full bg-[#363636] text-white border border-[#444] rounded-xl shadow-lg max-h-[192px] overflow-auto z-20 scrollbar-hide"
              role="listbox"
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion}
                  className="px-4 py-3 cursor-pointer hover:bg-[#3655d4] transition-colors first:rounded-t-xl last:rounded-b-xl text-sm"
                  onClick={() => handleSelectSuggestion(suggestion)}
                  role="option"
                  aria-selected={locationQuery === suggestion}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <Button
          onClick={clearFilters}
          variant="outline"
          className="border-[#3665d4] hover:bg-[#c1d3ff] text-[#3665d4] px-6 py-3 rounded-full font-normal bg-transparent"
        >
          Limpar Filtros
        </Button>
        <Button
          onClick={applyFilters}
          className="bg-[#3655d4] hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold"
        >
          Aplicar Filtros
        </Button>
      </div>
    </div>
  )
}
