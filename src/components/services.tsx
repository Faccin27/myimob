"use client";

import type { ReactElement } from "react";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  Home,
  FileText,
  Key,
  Shield,
  Headphones,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Service {
  id: number;
  icon: ReactElement;
  title: string;
  description: string;
  details: string[];
  step: string;
}

const services: Service[] = [
  {
    id: 1,
    icon: <Search />,
    title: "Busca Inteligente",
    description:
      "Encontramos propriedades que combinam perfeitamente com seu perfil e necessidades.",
    details: [
      "Algoritmo de matching personalizado",
      "Filtros avançados de busca",
      "Alertas automáticos de novas propriedades",
      "Análise de mercado em tempo real",
    ],
    step: "DESCOBERTA",
  },
  {
    id: 2,
    icon: <Home />,
    title: "Visitas Guiadas",
    description:
      "Agendamento flexível com especialistas que conhecem cada detalhe da propriedade.",
    details: [
      "Agendamento online 24/7",
      "Consultores especializados",
      "Tours virtuais disponíveis",
      "Relatórios detalhados pós-visita",
    ],
    step: "EXPLORAÇÃO",
  },
  {
    id: 3,
    icon: <FileText />,
    title: "Documentação Completa",
    description:
      "Cuidamos de toda a burocracia para que você foque apenas na sua nova casa.",
    details: [
      "Análise jurídica completa",
      "Preparação de contratos",
      "Acompanhamento cartorial",
      "Suporte fiscal especializado",
    ],
    step: "NEGOCIAÇÃO",
  },
  {
    id: 4,
    icon: <Shield />,
    title: "Segurança Garantida",
    description:
      "Transações 100% seguras com verificação completa de documentos e histórico.",
    details: [
      "Verificação de documentos",
      "Análise de histórico da propriedade",
      "Seguro de transação",
      "Garantia pós-venda",
    ],
    step: "PROTEÇÃO",
  },
  {
    id: 5,
    icon: <Key />,
    title: "Entrega das Chaves",
    description:
      "Momento especial com cerimônia personalizada e suporte completo na mudança.",
    details: [
      "Cerimônia de entrega personalizada",
      "Checklist completo da propriedade",
      "Suporte para mudança",
      "Manual do proprietário",
    ],
    step: "CONQUISTA",
  },
  {
    id: 6,
    icon: <Headphones />,
    title: "Suporte Contínuo",
    description:
      "Relacionamento que não termina na entrega. Estamos sempre aqui para você.",
    details: [
      "Suporte 24/7 pós-venda",
      "Rede de parceiros para manutenção",
      "Consultoria para investimentos",
      "Programa de fidelidade exclusivo",
    ],
    step: "PARCERIA",
  },
];

function ServiceCard({
  service,
  index,
  isActive,
  onClick,
}: {
  service: Service;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "transition-all duration-700 ease-out cursor-pointer",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "relative border-l-2 pl-8 pb-12 transition-all duration-300",
          isActive
            ? "border-[#3655d4]"
            : "border-white/20 hover:border-white/40"
        )}
      >
        <div
          className={cn(
            "absolute -left-3 top-0 w-6 h-6 rounded-full border-2 transition-all duration-300",
            isActive
              ? "bg-[#3655d4] border-[#3655d4]"
              : "bg-[#181818] border-white/20"
          )}
        >
          <div
            className={cn(
              "absolute inset-1 rounded-full transition-all duration-300",
              isActive ? "bg-white" : "bg-transparent"
            )}
          />
        </div>

        <div className="mb-4">
          <span
            className={cn(
              "text-xs font-bold tracking-wider transition-colors duration-300",
              isActive ? "text-[#3655d4]" : "text-[#a0a0a0]"
            )}
          >
            {service.step}
          </span>
        </div>

        <div className="flex items-start gap-4 mb-4">
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
              isActive
                ? "bg-[#3655d4]/20 border border-[#3655d4]/30"
                : "bg-white/5 border border-white/10"
            )}
          >
            {service.icon}
          </div>

          <div className="flex-1">
            <h3
              className={cn(
                "text-xl font-bold mb-2 transition-colors duration-300",
                isActive ? "text-white" : "text-[#a0a0a0]"
              )}
            >
              {service.title}
            </h3>
            <p
              className={cn(
                "text-sm leading-relaxed transition-colors duration-300",
                isActive ? "text-[#a0a0a0]" : "text-[#666]"
              )}
            >
              {service.description}
            </p>
          </div>

          <ChevronRight
            className={cn(
              "w-5 h-5 transition-all duration-300",
              isActive
                ? "text-[#3655d4] rotate-90"
                : "text-[#666] group-hover:translate-x-1"
            )}
          />
        </div>

        <div
          className={cn(
            "overflow-hidden transition-all duration-500 ease-out",
            isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="ml-16 pt-4">
            <ul className="space-y-2">
              {service.details.map((detail, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm text-[#a0a0a0]"
                >
                  <div className="w-1 h-1 rounded-full bg-[#3655d4] mt-2 flex-shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState<number>(1);
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
    <section ref={sectionRef} className="py-20 lg:py-32 bg-[#181818]">
      <div className="px-6 lg:px-36">
        <div
          className={cn(
            "mb-16 lg:mb-24 transition-all duration-1000 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="max-w-4xl">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight text-nowrap">
              Juntos fazemos o seu{" "}
              <span className="bg-gradient-to-r from-[#3655d4] to-blue-400 bg-clip-text text-transparent">
                sonho acontecer
              </span>
            </h2>
            <p className="text-[#a0a0a0] text-lg lg:text-xl font-light max-w-2xl">
              Cada etapa do nosso processo foi pensada para oferecer a melhor
              experiência na busca pela sua casa ideal
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="relative">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isActive={activeService === service.id}
                onClick={() => setActiveService(service.id)}
              />
            ))}
          </div>

          <div
            className={cn(
              "lg:sticky lg:top-32 h-fit transition-all duration-1000 ease-out delay-500",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            )}
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl p-8 lg:p-12 border border-white/10">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#3655d4]/20 border border-[#3655d4]/30 flex items-center justify-center">
                    {services.find((s) => s.id === activeService)?.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {services.find((s) => s.id === activeService)?.title}
                  </h3>

                  <p className="text-[#a0a0a0] leading-relaxed mb-8">
                    {services.find((s) => s.id === activeService)?.description}
                  </p>

                  <div className="flex items-center justify-center gap-2">
                    {services.map((_, index) => (
                      <div
                        key={index}
                        className={cn(
                          "h-1 rounded-full transition-all duration-300",
                          index + 1 === activeService
                            ? "w-8 bg-[#3655d4]"
                            : "w-2 bg-white/20"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#3655d4]/20 rounded-full animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400/20 rounded-full animate-pulse delay-1000" />
            </div>
          </div>
        </div>

        <div
          className={cn(
            "mt-20 lg:mt-32 grid md:grid-cols-3 gap-8 text-center transition-all duration-1000 ease-out delay-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {[
            { number: "6", label: "Etapas Personalizadas", suffix: "" },
            { number: "24", label: "Suporte Disponível", suffix: "/7" },
            { number: "100", label: "Processo Seguro", suffix: "%" },
          ].map((stat, index) => (
            <div key={index} className="group">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                {stat.number}
                <span className="text-[#3655d4]">{stat.suffix}</span>
              </div>
              <p className="text-[#a0a0a0] font-light">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
