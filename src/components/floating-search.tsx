"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Building, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface CustomSelectProps {
  placeholder: string;
  icon: React.ElementType; // For Lucide icons
  options: { value: string; label: string }[];
  className?: string; // For the trigger button
  contentClassName?: string; // For the dropdown content
  onValueChange?: (value: string) => void;
}

function CustomSelect({
  placeholder,
  icon: Icon,
  options,
  className,
  contentClassName,
  onValueChange,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onValueChange?.(value);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayLabel = selectedValue
    ? options.find((opt) => opt.value === selectedValue)?.label
    : placeholder;

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        className={cn(
          "bg-[#3655d4] text-white border-none rounded-xl px-4 py-3 w-full h-10 text-base group flex items-center justify-between",
          className
        )}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {Icon && (
          <Icon className="w-5 h-5 mr-2 text-blue-200 group-hover:text-white transition-colors" />
        )}
        <span className="flex-1 text-left">{displayLabel}</span>
        <svg
          className={cn(
            "ml-2 h-5 w-5 transition-transform",
            isOpen ? "rotate-180" : "rotate-0"
          )}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <ul
          className={cn(
            "absolute bottom-full mb-2 w-full bg-[#363636] text-white border border-[#444] rounded-xl shadow-lg max-h-60 overflow-auto z-10 scrollbar-hide",
            contentClassName
          )}
          role="listbox"
        >
          {options.map((option) => (
            <li
              key={option.value}
              className="px-4 py-3 cursor-pointer hover:bg-[#3655d4] transition-colors first:rounded-t-xl last:rounded-b-xl"
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={selectedValue === option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const mockLocations = [
  "Guarulhos, São Paulo",
  "São Paulo, São Paulo",
  "Campinas, São Paulo",
  "Rio de Janeiro, Rio de Janeiro",
  "Belo Horizonte, Minas Gerais",
  "Curitiba, Paraná",
  "Porto Alegre, Rio Grande do Sul",
  "Salvador, Bahia",
  "Fortaleza, Ceará",
  "Brasília, Distrito Federal",
  "Recife, Pernambuco",
  "Manaus, Amazonas",
  "Goiânia, Goiás",
  "Belém, Pará",
  "Joaçaba, Santa Catarina",
];

export function FloatingSearch() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const mouseNearBottom = useRef(false);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const [locationQuery, setLocationQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 50;

      if (mouseNearBottom.current) {
        return;
      }

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
      const threshold = 100;
      if (e.clientY > window.innerHeight - threshold) {
        mouseNearBottom.current = true;
        setIsVisible(true);
      } else {
        mouseNearBottom.current = false;
        if (window.scrollY > 50 && window.scrollY > lastScrollY.current) {
          setIsVisible(false);
        }
      }
    };

    const handleClickOutsideInput = (event: MouseEvent) => {
      if (
        inputContainerRef.current &&
        !inputContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleClickOutsideInput);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleClickOutsideInput);
    };
  }, []);

  const handleLocationInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = e.target.value;
    setLocationQuery(query);

    if (query.length > 0) {
      const filteredSuggestions = mockLocations.filter((location) =>
        location.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setLocationQuery(suggestion);
    setShowSuggestions(false);
  };

  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState<
    string | null
  >(null);

  return (
    <div
      className={cn(
        "fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 scrollbar-hide",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="bg-[#2a2a2a] rounded-2xl py-2 pl-4 pr-2 shadow-2xl w-3xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <CustomSelect
            placeholder="Comprar"
            icon={Home}
            options={[
              { value: "buy", label: "Comprar" },
              { value: "rent", label: "Alugar" },
              { value: "sell", label: "Vender" },
            ]}
            className="w-full md:w-[150px]"
            onValueChange={setSelectedAction}
          />
          <CustomSelect
            placeholder="Tipo"
            icon={Building}
            options={[
              { value: "apartment", label: "Apartamento" },
              { value: "house", label: "Casa" },
              { value: "condo", label: "Condomínio" },
              { value: "townhouse", label: "Sobrado" },
            ]}
            className="w-full md:w-[180px]"
            onValueChange={setSelectedPropertyType}
          />
          <div className="relative flex-1" ref={inputContainerRef}>
            <Input
              placeholder="Selecione sua localização desejada"
              className="flex-1 border-none bg-[#363636] text-gray-200 placeholder:text-gray-400 rounded-xl px-4 py-3 h-10 text-base"
              value={locationQuery}
              onChange={handleLocationInputChange}
              aria-autocomplete="list"
              aria-expanded={showSuggestions}
              role="combobox"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul
                className="absolute bottom-full mb-2 w-full bg-[#363636] text-white border border-[#444] rounded-xl shadow-lg max-h-[192px] overflow-auto z-20 scrollbar-hide" // max-h for 4 items (4*48px)
                role="listbox"
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    key={suggestion}
                    className="px-4 py-3 cursor-pointer hover:bg-[#3655d4] transition-colors first:rounded-t-xl last:rounded-b-xl"
                    onClick={() => handleSelectSuggestion(suggestion)}
                    role="option"
                    aria-selected={locationQuery === suggestion}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button className="bg-[#3655d4] transition-all duration-300 hover:bg-blue-600 text-blue-200 hover:text-white p-1 rounded-xl h-10 w-10 flex-shrink-0 -translate-x-3 hover:scale-105">
            <Search className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
