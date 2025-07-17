"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";

interface Testimonial {
  name: string;
  username: string;
  role: string;
  body: string;
  img: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Maria Silva",
    username: "@maria_silva",
    role: "Empresária",
    body: "A experiência foi excepcional. Encontrei minha casa dos sonhos em apenas duas semanas. O atendimento personalizado fez toda a diferença.",
    img: "/images/user2.jpg",
    rating: 5,
  },
  {
    name: "João Santos",
    username: "@joao_dev",
    role: "Desenvolvedor",
    body: "Processo rápido e transparente. A equipe me guiou em cada etapa da compra com total profissionalismo.",
    img: "/images/user1.jpg",
    rating: 5,
  },
  {
    name: "Ana Costa",
    username: "@ana_arquiteta",
    role: "Arquiteta",
    body: "Impressionante como conseguiram entender exatamente o que eu procurava. A curadoria de propriedades é impecável.",
    img: "/images/user4.jpg",
    rating: 5,
  },
  {
    name: "Carlos Oliveira",
    username: "@carlos_invest",
    role: "Investidor",
    body: "Melhor plataforma imobiliária que já utilizei. Interface intuitiva e resultados excepcionais.",
    img: "/images/user3.jpg",
    rating: 4,
  },
  {
    name: "Fernanda Lima",
    username: "@fer_medica",
    role: "Médica",
    body: "O que mais me impressionou foi a atenção aos detalhes. Cada propriedade foi apresentada de forma clara e completa.",
    img: "/images/user6.jpg",
    rating: 5,
  },
  {
    name: "Roberto Mendes",
    username: "@roberto_consultor",
    role: "Consultor",
    body: "Atendimento excepcional e processo muito bem estruturado. Recomendo sem hesitação.",
    img: "/images/user5.jpg",
    rating: 5,
  },
  {
    name: "Juliana Pereira",
    username: "@ju_pereira",
    role: "Designer",
    body: "Encontrei o apartamento perfeito para meu estúdio. A equipe entendeu minhas necessidades específicas.",
    img: "/images/user8.jpg",
    rating: 5,
  },
  {
    name: "Pedro Almeida",
    username: "@pedro_almeida",
    role: "Engenheiro",
    body: "Processo técnico impecável. Toda documentação foi verificada com precisão e transparência total.",
    img: "/images/user7.jpg",
    rating: 4,
  },
  {
    name: "Camila Rodrigues",
    username: "@camila_rod",
    role: "Advogada",
    body: "Como advogada, sou exigente com contratos. A assessoria jurídica foi exemplar em todos os aspectos.",
    img: "/images/user0.jpg",
    rating: 5,
  },
  {
    name: "Lucas Martins",
    username: "@lucas_martins",
    role: "Arquiteto",
    body: "A seleção de propriedades é curada com muito bom gosto. Cada imóvel tem potencial único.",
    img: "/images/user9.jpg",
    rating: 5,
  },
];

const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);

const TestimonialCard = ({
  img,
  name,
  username,
  role,
  body,
  rating,
}: {
  img: string;
  name: string;
  username: string;
  role: string;
  body: string;
  rating: number;
}) => {
  return (
    <figure
      className={cn(
        "relative h-fit w-80 cursor-pointer overflow-hidden rounded-xl border p-3 transition-all duration-300",
        "border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20",
        "backdrop-blur-sm hover:scale-105"
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <Quote className="w-4 h-4 text-[#3655d4] opacity-60" />
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                "w-3 h-3 transition-all duration-300",
                star <= rating
                  ? "text-[#3655d4] fill-[#3655d4]"
                  : "text-gray-600"
              )}
            />
          ))}
        </div>
      </div>

      <blockquote className="text-white text-sm leading-snug mb-3 font-light line-clamp-2">
        "{body}"
      </blockquote>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Image
            className="rounded-full object-cover"
            width="28"
            height="28"
            alt={name}
            src={img || "/placeholder.svg"}
          />
          <div className="absolute inset-0 rounded-full border border-white/10"></div>
        </div>
        <div className="flex flex-col min-w-0">
          <figcaption className="text-sm font-medium text-white truncate">
            {name}
          </figcaption>
          <p className="text-xs text-[#a0a0a0] truncate">{role}</p>
        </div>
      </div>
    </figure>
  );
};

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 bg-[#181818] relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#3655d4]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="px-6 lg:px-36 relative z-10">
        <div
          className={cn(
            "text-center mb-12 transition-all duration-1000 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            O que nossos{" "}
            <span className="bg-gradient-to-r from-[#3655d4] to-blue-400 bg-clip-text text-transparent">
              clientes dizem
            </span>
          </h2>
          <p className="text-[#a0a0a0] text-lg lg:text-xl max-w-2xl mx-auto font-light">
            Histórias reais de pessoas que encontraram sua casa dos sonhos
            conosco
          </p>
        </div>

        <div
          className={cn(
            "relative flex w-full flex-col items-center justify-center overflow-hidden transition-all duration-1000 ease-out delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <Marquee
            pauseOnHover
            className="[--duration:40s] [--gap:1.5rem] hover:[animation-play-state:paused]"
          >
            {firstRow.map((review) => (
              <TestimonialCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee
            reverse
            pauseOnHover
            className="[--duration:45s] [--gap:1.5rem] hover:[animation-play-state:paused]"
          >
            {secondRow.map((review) => (
              <TestimonialCard key={review.username} {...review} />
            ))}
          </Marquee>
          {/* Gradient overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#181818] to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#181818] to-transparent"></div>
        </div>

        <div
          className={cn(
            "mt-16 grid md:grid-cols-3 gap-8 text-center transition-all duration-1000 ease-out delay-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {[
            { number: "1.200+", label: "Clientes Satisfeitos" },
            { number: "4.9", label: "Avaliação Média" },
            { number: "98%", label: "Taxa de Recomendação" },
          ].map((stat, index) => (
            <div key={index} className="group">
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#3655d4] to-blue-400 bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform duration-300">
                {stat.number}
              </div>
              <p className="text-[#a0a0a0] font-light">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
