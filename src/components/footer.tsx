import Link from "next/link"
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  const navLinks = [
    { href: "#home", label: "Início" },
    { href: "#about", label: "Sobre" },
    { href: "#properties", label: "Propriedades" },
    { href: "#services", label: "Serviços" },
    { href: "#testimonials", label: "Depoimentos" },
    { href: "#contact", label: "Contato" },
  ]

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/gui.faccin", label: "Instagram" },
    { icon: Facebook, href: "https://faccindev.pro", label: "Facebook" },
    { icon: Twitter, href: "https://faccindev.pro", label: "Twitter" },
    { icon: Linkedin, href: "https://faccindev.pro", label: "LinkedIn" },
  ]

  return (
    <footer className="text-white relative overflow-hidden">
      <div className="px-6 lg:px-36 py-16 border-b border-white/10">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-6">Entre em Contato</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#a0a0a0] hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-[#3655d4]" />
                <span>gfaccin27@gmail.com.br</span>
              </div>
              <div className="flex items-center gap-3 text-[#a0a0a0] hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-[#3655d4]" />
                <span>(49) 99921-5720</span>
              </div>
              <div className="flex items-center gap-3 text-[#a0a0a0] hover:text-white transition-colors">
                <MapPin className="w-5 h-5 text-[#3655d4]" />
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-6 lg:ml-28">Navegação</h3>
            <nav className="grid grid-cols-2 gap-3 lg:ml-28">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#a0a0a0] hover:text-white transition-all hover:translate-x-1 duration-300 text-sm lg:text-base truncate"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-6">Redes Sociais</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-[#a0a0a0] hover:text-white hover:bg-[#3655d4] hover:border-[#3655d4] transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-[#a0a0a0] text-sm leading-relaxed">
                Siga-nos nas redes sociais para ficar por dentro das melhores oportunidades imobiliárias.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-20 lg:py-36 lg:pt-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#3655d4]/5 rounded-full blur-2xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-400/5 rounded-full blur-3xl" />
        </div>

        {/* Large Text */}
        <div className="relative z-10 px-6 lg:px-36">
          <div className="text-center">
            <h2 className="text-[6rem] sm:text-[6rem] md:text-[8rem] lg:text-[14rem] xl:text-[20rem] font-black leading-none tracking-tighter text-white/10 animate-pulse select-none break-all">
              myimob
            </h2>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="px-6 lg:px-36 py-6 border-t border-white/10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="text-[#a0a0a0] text-sm">© 2025 Myimob. Todos os direitos reservados.</div>
          <div className="text-[#666] ">
            desenvolvido por{" "}
            <Link
              href="https://faccindev.pro"
              target="_blank"
              className="text-[#3655d4] hover:text-blue-400 transition-colors font-medium"
            >
              FaccinDev
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
