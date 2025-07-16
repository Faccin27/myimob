export function AboutSection() {
  return (
    <section className="px-6 lg:px-12 py-20 pt-0">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Escolher sua casa,
            <br />
            agora ficou{" "}
            <span className="bg-gradient-to-r from-[#3655d4] to-blue-400 bg-clip-text text-transparent">
              fácil.
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-white opacity-30"></div>

          {/* Curved Connection SVG */}
          <svg
            className="absolute left-1/2 transform -translate-x-1/2 w-full h-full max-w-4xl hidden lg:block"
            viewBox="0 0 800 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M400 50 C200 150, 600 200, 400 300 C600 400, 200 450, 400 550"
              stroke="white"
              strokeWidth="2"
              fill="none"
              className="opacity-40"
            />
          </svg>

          <div className="space-y-32">
            {/* Step 1 */}
            <div className="relative flex items-center">
              {/* Left Side - Number and Sparkles */}
              <div className="w-1/2 flex justify-end pr-16">
                <div className="relative">
                  {/* Sparkles */}
                  <div className="absolute -top-4 -left-8">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-6">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  {/* Number */}
                  <div className="text-8xl font-bold bg-gradient-to-r from-[#3655d4] to-blue-400 bg-clip-text text-transparent">
                    1.
                  </div>
                </div>
              </div>

              {/* Center Circle */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full z-10"></div>

              {/* Right Side - Content */}
              <div className="w-1/2 pl-16 text-left">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Descubra uma Propriedade
                </h3>
                <p className="text-[#a0a0a0] leading-relaxed">
                  Explore nossa seleção curada de propriedades em nosso site ou
                  aplicativo móvel fácil de usar. Utilize filtros de busca
                  avançados para refinar suas opções com base na localização,
                  faixa de preço, comodidades e muito mais.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-center">
              {/* Left Side - Content */}
              <div className="w-1/2 flex justify-end pr-16 text-right">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Agende uma Visita
                  </h3>
                  <p className="text-[#a0a0a0] leading-relaxed">
                    Depois de encontrar uma propriedade que desperte seu
                    interesse, entre em contato com nossa equipe dedicada de
                    especialistas imobiliários para agendar uma visita. Receba
                    confirmação instantânea da sua visita agendada, garantindo
                    uma experiência sem complicações.
                  </p>
                </div>
              </div>

              {/* Center Circle */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full z-10"></div>

              {/* Right Side - Number and Sparkles */}
              <div className="w-1/2 pl-16 flex justify-start">
                <div className="relative">
                  {/* Sparkles */}
                  <div className="absolute -top-4 -right-8">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -left-6">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  {/* Number */}
                  <div className="text-8xl font-bold bg-gradient-to-r from-[#3655d4] to-blue-400 bg-clip-text text-transparent">
                    2.
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-center">
              {/* Left Side - Number and Sparkles */}
              <div className="w-1/2 flex justify-end pr-16">
                <div className="relative">
                  {/* Sparkles */}
                  <div className="absolute -top-4 -left-8">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="absolute top-16 -right-8"></div>
                  {/* Number */}
                  <div className="text-8xl font-bold bg-gradient-to-r from-[#3655d4] to-blue-400 bg-clip-text text-transparent">
                    3.
                  </div>
                </div>
              </div>

              {/* Center Circle */}
              <div className="absolute left-1/2 top-2/5 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full z-10"></div>

              {/* Right Side - Content */}
              <div className="w-1/2 pl-16 text-left">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Finalize sua Reserva
                </h3>
                <p className="text-[#a0a0a0] leading-relaxed">
                  Finalize a reserva da sua propriedade com nosso processo
                  seguro e simplificado. Complete a documentação necessária,
                  efetue o pagamento e receba confirmação instantânea. A casa
                  dos seus sonhos agora é oficialmente sua!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 lg:px-12 py-16 pt-32">
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8 text-center">
            {[
              { number: "500+", label: "Propriedades Vendidas" },
              { number: "98%", label: "Clientes Satisfeitos" },
              { number: "15+", label: "Anos de Experiência" },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-[#3655d4] to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <p className="text-[#a0a0a0] text-xl font-semibold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
