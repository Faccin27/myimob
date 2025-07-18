import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyDetail } from "@/components/property-detail"
import { mockProperties } from "@/lib/mock-data"

interface PropertyDetailPageProps {
  params: {
    id: string
  }
}

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const propertyId = Number(params.id)
  const property = mockProperties.find((p) => p.id === propertyId)

  return (
    <div className="min-h-screen bg-[#181818] text-white pt-[76px] overflow-x-hidden">
      <Header />
      <main className="px-6 lg:px-36 py-12">
        <PropertyDetail property={property!} /> {/* Pass the found property */}
      </main>
      <Footer />
    </div>
  )
}
