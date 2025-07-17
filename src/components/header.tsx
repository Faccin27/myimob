"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface HeaderProps {
  activeSection?: string
}

export function Header({ activeSection = "home" }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const mouseNearTop = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (mouseNearTop.current) {
        return
      }

      const currentScrollY = window.scrollY
      const scrollThreshold = 50 

      if (currentScrollY > lastScrollY.current && currentScrollY > scrollThreshold) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY.current || currentScrollY <= scrollThreshold) {
        setIsVisible(true)
      }
      lastScrollY.current = currentScrollY
    }

    const handleMouseMove = (e: MouseEvent) => {
      const mouseThreshold = 50 
      if (e.clientY < mouseThreshold) {
        mouseNearTop.current = true
        setIsVisible(true)
      } else {
        mouseNearTop.current = false
        if (window.scrollY > 50 && window.scrollY > lastScrollY.current) {
          setIsVisible(false)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const navItems = [
    { id: "home", label: "Início" },
    { id: "about", label: "Sobre" },
    { id: "properties", label: "Propriedades" },
    { id: "services", label: "Serviços" },
    { id: "contact", label: "Contato" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 lg:px-36 transition-all duration-300 bg-transparent",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
      )}
    >
      <div className="flex items-center gap-2">
        <Image src="/images/logo.png" alt="Urbane Logo" width={40} height={40} className="w-12 h-12" />
        <span className="text-xl font-semibold text-[#ffffff]">Myimob</span>
      </div>

      <nav className="hidden md:flex items-center bg-[#363636] rounded-full px-6 py-1">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`px-4 py-1 font-semibold transition-all ${
              activeSection === item.id ? "text-[#ffffff]" : "text-[#a0a0a0] hover:text-[#6a88ff]"
            }`}
            style={
              activeSection === item.id
                ? {
                    textShadow: "0 0 10px rgba(54, 85, 212, 0.8), 0 0 20px rgba(54, 85, 212, 0.6)",
                  }
                : {}
            }
          >
            {item.label}
          </a>
        ))}
      </nav>

      <Button
        style={{
          textShadow: "0 0 10px rgba(54, 85, 212, 0.8), 0 0 20px rgba(54, 85, 212, 0.6)",
        }}
        className="bg-[#3655d4] hover:bg-blue-600 font-semibold text-white px-6 py-2 rounded-full text-[16px]"
      >
        Orçamento
      </Button>
    </header>
  )
}
