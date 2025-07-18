"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

interface HeaderProps {
  activeSection?: string;
}

export function Header({ activeSection = "home" }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const mouseNearTop = useRef(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (mouseNearTop.current) {
        return;
      }
      const currentScrollY = window.scrollY;
      const scrollThreshold = 50;
      if (
        currentScrollY > lastScrollY.current &&
        currentScrollY > scrollThreshold
      ) {
        setIsVisible(false);
      } else if (
        currentScrollY < lastScrollY.current ||
        currentScrollY <= scrollThreshold
      ) {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const mouseThreshold = 50;
      if (e.clientY < mouseThreshold) {
        mouseNearTop.current = true;
        setIsVisible(true);
      } else {
        mouseNearTop.current = false;
        if (window.scrollY > 50 && window.scrollY > lastScrollY.current) {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const navItems = [
    { id: "home", label: "Início" },
    { id: "about", label: "Sobre" },
    { id: "properties", label: "Propriedades" },
    { id: "services", label: "Serviços" },
    { id: "contact", label: "Contato" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 lg:px-36 transition-all duration-300 bg-transparent",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}
    >
      <div>
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Urbane Logo"
            width={40}
            height={40}
            className="w-12 h-12"
          />
          <span className="text-xl font-semibold transition-all duration-300 hover:animate-pulse text-[#ffffff] hover:text-[#3655d4]">
            Myimob
          </span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center bg-[#363636] rounded-full px-6 py-1">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`px-4 py-1 font-semibold transition-all ${
              activeSection === item.id
                ? "text-[#ffffff]"
                : "text-[#a0a0a0] hover:text-[#6a88ff]"
            }`}
            style={
              activeSection === item.id
                ? {
                    textShadow:
                      "0 0 10px rgba(54, 85, 212, 0.8), 0 0 20px rgba(54, 85, 212, 0.6)",
                  }
                : {}
            }
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Desktop Button */}
      <Button
        onClick={() => {
          window.alert(
            "Olá, esté não é um site atualmente utilizado com fim de imobiliaria, se clicou aqui, pode ter um interesse em comprá-lo para seu negocio. Me contate em 49 9 9921-5720. Atenciosamente: Guilherme Faccin, seu desenvolvedor web."
          );
        }}
        style={{
          textShadow:
            "0 0 10px rgba(54, 85, 212, 0.8), 0 0 20px rgba(54, 85, 212, 0.6)",
        }}
        className="hidden md:flex bg-[#3655d4] hover:bg-blue-600 font-semibold text-white px-6 py-2 rounded-full text-[16px]"
      >
        Orçamento
      </Button>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="max-w-[250px] sm:max-w-[300px] h-[80vh] bg-[#1a1a1a] text-white flex flex-col p-6 rounded-l-2xl border-none top-1/2 -translate-y-1/2"
          >
            <div className="flex justify-between items-center mb-6">
              <Link
                href={"/"}
                className="flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Image
                  src="/images/logo.png"
                  alt="Urbane Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <span className="text-2xl font-bold text-[#ffffff]">
                  Myimob
                </span>
              </Link>
            </div>
            <nav className="flex flex-col gap-2 flex-grow">
              {navItems.map((item) => (
                <SheetClose asChild key={item.id}>
                  <Link
                    href={`#${item.id}`}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-colors hover:bg-[#2a2a2a] hover:text-[#6a88ff]",
                      activeSection === item.id
                        ? "bg-[#2a2a2a] text-[#3655d4]"
                        : "text-[#a0a0a0]"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <SheetClose asChild>
              <Button
                style={{
                  textShadow:
                    "0 0 10px rgba(54, 85, 212, 0.8), 0 0 20px rgba(54, 85, 212, 0.6)",
                }}
                className="mt-6 bg-[#3655d4] hover:bg-blue-600 font-semibold text-white px-6 py-3 rounded-full text-[16px] w-full"
                onClick={() => {
                  window.alert(
                    "Olá, esté não é um site atualmente utilizado com fim de imobiliaria, se clicou aqui, pode ter um interesse em comprá-lo para seu negocio. Me contate em 49 9 9921-5720. Atenciosamente: Guilherme Faccin, seu desenvolvedor web."
                  );
                }}
              >
                Orçamento
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
