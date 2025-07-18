import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PropertyDetail } from "@/components/property-detail";
import { mockProperties } from "@/lib/mock-data";

export default function PropertyDetailPage({ params }: { params: { id: number } }) {
  const propertyId = Number(params.id);
  const property = mockProperties.find((p) => p.id === propertyId);


  
  if (!property) {
    return (
      <div className="min-h-screen bg-[#181818] text-white pt-[76px] overflow-x-hidden">
        <Header />
        <main className="px-6 lg:px-36 py-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-8">Propriedade Não Encontrada</h1>
          <p className="text-[#a0a0a0] text-lg">
            A propriedade que você está procurando não existe ou foi removida.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181818] text-white pt-[76px] overflow-x-hidden">
      <Header />
      <main className="px-6 lg:px-36 py-12">
        <PropertyDetail property={property} />
      </main>
      <Footer />
    </div>
  );
}
