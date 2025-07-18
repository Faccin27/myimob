import type React from "react"
import type { Metadata } from "next"
import { Bai_Jamjuree } from "next/font/google"
import "./globals.css"

const baiJamjuree = Bai_Jamjuree({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-bai",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Myimob - Encontre a Casa dos Seus Sonhos",
  description:
    "Descubra as melhores propriedades urbanas e rurais com a Myimob. Seu parceiro ideal para comprar, vender ou alugar imóveis com segurança e facilidade. Encontre seu lar perfeito hoje!",
  openGraph: {
    title: "Myimob - Encontre a Casa dos Seus Sonhos",
    description:
      "Descubra as melhores propriedades urbanas e rurais com a Myimob. Seu parceiro ideal para comprar, vender ou alugar imóveis com segurança e facilidade. Encontre seu lar perfeito hoje!",
    url: "https://myimob.vercel.app/", 
    siteName: "Myimob",
    images: [
      {
        url: "/images/preview.png", 
        width: 1200,
        height: 630,
        alt: "Myimob - Imobiliária Digital",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Myimob - Encontre a Casa dos Seus Sonhos",
    description:
      "Descubra as melhores propriedades urbanas e rurais com a Myimob. Seu parceiro ideal para comprar, vender ou alugar imóveis com segurança e facilidade. Encontre seu lar perfeito hoje!",
    images: ["/images/preview.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${baiJamjuree.className} `}>{children}</body>
    </html>
  )
}
