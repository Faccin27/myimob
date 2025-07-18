"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertiesFilter } from "@/components/properties-filter"
import { PropertyGrid } from "@/components/property-grid"
import { mockProperties, type Property } from "@/lib/mock-data"

export default function PropertiesPage() {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties)
  const [filters, setFilters] = useState({
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    bedrooms: undefined as number | undefined,
    bathrooms: undefined as number | undefined,
    garage: undefined as boolean | undefined,
    location: undefined as string | undefined,
  })

  useEffect(() => {
    const applyFilters = () => {
      let currentFiltered = mockProperties

      if (filters.minPrice !== undefined) {
        currentFiltered = currentFiltered.filter((p) => p.price >= filters.minPrice!)
      }
      if (filters.maxPrice !== undefined) {
        currentFiltered = currentFiltered.filter((p) => p.price <= filters.maxPrice!)
      }
      if (filters.bedrooms !== undefined) {
        currentFiltered = currentFiltered.filter((p) => p.bedrooms >= filters.bedrooms!)
      }
      if (filters.bathrooms !== undefined) {
        currentFiltered = currentFiltered.filter((p) => p.bathrooms >= filters.bathrooms!)
      }
      if (filters.garage !== undefined) {
        currentFiltered = currentFiltered.filter((p) => (filters.garage ? p.garage > 0 : p.garage === 0))
      }
      if (filters.location) {
        currentFiltered = currentFiltered.filter((p) =>
          p.location.toLowerCase().includes(filters.location!.toLowerCase()),
        )
      }

      setFilteredProperties(currentFiltered)
    }

    applyFilters()
  }, [filters])

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  return (
    <div className="min-h-screen bg-[#181818] text-white pt-[76px] overflow-x-hidden">
      <Header />
      <main className="px-6 lg:px-36 py-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-8">
          Todas as{" "}
          <span className="bg-gradient-to-r from-[#3655d4] to-blue-400 bg-clip-text text-transparent">
            Propriedades
          </span>
        </h1>
        <PropertiesFilter onFilterChange={handleFilterChange} />
        {filteredProperties.length > 0 ? (
          <PropertyGrid properties={filteredProperties} />
        ) : (
          <div className="text-center text-[#a0a0a0] text-lg py-16">
            Nenhuma propriedade encontrada com os filtros selecionados.
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
