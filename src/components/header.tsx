import Image from "next/image";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  activeSection?: string;
}

export function Header({ activeSection = "home" }: HeaderProps) {
  const navItems = [
    { id: "home", label: "Início" },
    { id: "about", label: "Sobre" },
    { id: "properties", label: "Propriedades" },
    { id: "services", label: "Serviços" },
    { id: "contact", label: "Contato" },
  ];

  return (
    <header className="flex items-center justify-between px-6 py-4 lg:px-12">
      <div className="flex items-center gap-3">
        <Image
          src="/images/logo.png"
          alt="Urbane Logo"
          width={40}
          height={40}
          className="w-10 h-10"
        />
        <span className="text-xl font-semibold text-[#ffffff]">Myimob</span>
      </div>

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

      <Button
        style={{
          textShadow:
            "0 0 10px rgba(54, 85, 212, 0.8), 0 0 20px rgba(54, 85, 212, 0.6)",
        }}
        className="bg-[#3655d4] hover:bg-blue-600 font-semibold text-white px-6 py-2 rounded-full text-[16px]"
      >
        Orçamento
      </Button>
    </header>
  );
}
