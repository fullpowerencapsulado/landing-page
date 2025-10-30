import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Phone, Mail, Instagram, Facebook, MapPin, Clock, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import TropicalLeavesPattern from './TropicalLeavesPattern';

export default function FullPowerLanding() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade: ''
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [leavesVisible, setLeavesVisible] = useState(false);
  const [currentProof, setCurrentProof] = useState(0);
  const [proofsVisible, setProofsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const slides = [
    {
      title1: 'Transforme',
      title2: 'Seu Corpo',
      subtitle: ['O composto revolucionário', 'que acelera seu metabolismo', 'e elimina gorduras de forma natural e definitiva'],
      pills: ['Queima Gordura', 'Acelera Metabolismo', 'Mais Energia', 'Zero Efeitos']
    },
    {
      title1: 'Recupere',
      title2: 'Sua Energia',
      subtitle: ['Fórmula natural que aumenta', 'sua disposição e vitalidade', 'para viver melhor a cada dia'],
      pills: ['Mais Disposição', 'Combate Fadiga', 'Melhora o Sono', 'Sem Estimulantes']
    },
    {
      title1: 'Conquiste',
      title2: 'Seu Objetivo',
      subtitle: ['Resultados comprovados', 'por milhares de pessoas', 'que já transformaram suas vidas'],
      pills: ['Resultados Reais', 'Sem Efeito Sanfona', 'Saúde em Dia', '100% Natural']
    }
  ];

  const provasSociais = [
    { foto: '1cb515ff-298c-44f9-adeb-8f000a3387dc.jpg', usuario: '@mariasilva', label: 'ANTES', tipo: 'antes' },
    { foto: '42423aa4-ca46-4e5c-a9b6-bbfbfd35ec28.jpg', usuario: '@mariasilva', label: 'DEPOIS', tipo: 'depois' },
    { foto: '61063d8c-faaa-4eb7-8a38-2cb79db64cf2.jpg', usuario: '@anapaula', label: 'ANTES', tipo: 'antes' },
    { foto: '6db3223f-8e1e-41f0-9ba1-d782e4adc031.jpg', usuario: '@anapaula', label: 'DEPOIS', tipo: 'depois' },
    { foto: '8ce3b7c1-a590-4e7c-8aae-422a89b9ec0e.jpg', usuario: '@julianacosta', label: 'ANTES', tipo: 'antes' },
    { foto: '9c0c4978-9f9f-4ee8-948c-ae5afd56643e.jpg', usuario: '@julianacosta', label: 'DEPOIS', tipo: 'depois' },
    { foto: '9cfe9175-d0a2-45cb-8028-aee0af7b4f1a.jpg', usuario: '@camilasantos', label: 'ANTES', tipo: 'antes' },
    { foto: 'abfe4261-bcd5-47f1-b965-a4b7016fee57.jpg', usuario: '@camilasantos', label: 'DEPOIS', tipo: 'depois' },
    { foto: 'acc51b5d-3340-42bb-a960-9ba4625103c8.jpg', usuario: '@patricialima', label: 'ANTES', tipo: 'antes' },
    { foto: 'af549431-5da5-4a27-9546-69a6902e1c64.jpg', usuario: '@patricialima', label: 'DEPOIS', tipo: 'depois' },
    { foto: 'c7c98b4a-39ce-40a9-8cfe-997a9f79847c.jpg', usuario: '@fernandaoliveira', label: 'ANTES', tipo: 'antes' },
    { foto: 'cf15db01-2681-4b77-bc12-26e02aa0d283.jpg', usuario: '@fernandaoliveira', label: 'DEPOIS', tipo: 'depois' },
    { foto: 'd35e8fd8-3e1d-46a4-a38d-87b645c9183e.jpg', usuario: '@beatrizrodrigues', label: 'ANTES', tipo: 'antes' },
    { foto: '1cb515ff-298c-44f9-adeb-8f000a3387dc.jpg', usuario: '@beatrizrodrigues', label: 'DEPOIS', tipo: 'depois' }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Normaliza a posição do mouse entre -1 e 1
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;

      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Simula carregamento e remove loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Detecta scroll para animar folhas e provas sociais
    const handleScroll = () => {
      const formSection = document.getElementById('form');
      if (formSection) {
        const rect = formSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
        setLeavesVisible(isVisible);
      }

      const proofsSection = document.getElementById('provas-sociais');
      if (proofsSection) {
        const rect = proofsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
        setProofsVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Auto avançar provas sociais a cada 2 segundos
    const timer = setInterval(() => {
      setCurrentProof((prev) => (prev + 1) % (provasSociais.length * 2));
    }, 2000);

    return () => clearInterval(timer);
  }, [provasSociais.length]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    window.location.href = '#comprar';
  };

  const benefits = [
    "100% Natural e sem efeitos colaterais",
    "Acelera o metabolismo naturalmente",
    "Elimina gorduras localizadas",
    "Reduz o apetite e controla a ansiedade",
    "Promove saciedade prolongada",
    "Regula o intestino e reduz inchaço",
    "Elimina retenção de líquidos",
    "Aumenta energia e disposição"
  ];

  const testimonials = [
    { name: "Amanda Oliveira", age: "34 anos", result: "-8kg em 6 semanas", text: "Perdi 8kg em 6 semanas! A barriga que eu tinha há anos finalmente sumiu. Estou usando roupas que não cabiam mais desde 2019." },
    { name: "Carla Mendes", age: "29 anos", result: "-6kg em 4 semanas", text: "No começo eu estava desconfiada, mas resolvi tentar. Resultado: 6kg a menos em 4 semanas e minhas celulites diminuíram muito!" },
    { name: "Juliana Santos", age: "41 anos", result: "-10kg em 2 meses", text: "Depois dos 40 achei que não conseguiria mais emagrecer. Com o Full Power perdi 10kg em 2 meses e meio!" },
    { name: "Patrícia Costa", age: "37 anos", result: "-9kg no total", text: "A retenção de líquido era meu maior problema. Em 2 semanas já senti a diferença! Hoje já eliminei 9kg no total!" }
  ];

  return (
    <>
      {/* Loader Premium Minimalista */}
      {isLoading && (
        <div className="loader-container fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
          {/* Background igual primeira dobra */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
               style={{backgroundImage: "url('/bg_img.png')"}}></div>
          {/* Overlay escuro para destacar o loader */}
          <div className="absolute inset-0 bg-black/90"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-transparent to-emerald-900/30"></div>

          {/* Glowing orbs de fundo - apenas 2 */}
          <div className="absolute inset-0">
            <div className="loader-orb-1"></div>
            <div className="loader-orb-2"></div>
          </div>

          <div className="relative z-10 flex items-center justify-center">
            {/* Loading Circular Minimalista */}
            <div className="relative w-24 h-24 md:w-28 md:h-28">
              {/* Círculo único rotativo */}
              <div className="absolute inset-0">
                <svg className="w-full h-full animate-spin-smooth" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="50%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="45" fill="none" stroke="url(#loaderGrad)"
                          strokeWidth="4" strokeLinecap="round" strokeDasharray="70 200"
                          opacity="0.9" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`min-h-screen bg-white transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Header/Menu */}
        <header className="bg-black/95 backdrop-blur-sm text-white py-5 sticky top-0 z-50 shadow-lg border-b border-green-500/20">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center">
            <div className="flex items-center gap-8 md:gap-12 text-sm md:text-base font-semibold">
              <a href="#home" className="relative group py-2 transition-colors duration-300">
                <span className="relative z-10">O Produto</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-400 group-hover:w-full transition-all duration-300"></span>
                <span className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 rounded-lg transition-all duration-300"></span>
              </a>
              <a href="#beneficios" className="relative group py-2 transition-colors duration-300">
                <span className="relative z-10">Benefícios</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-400 group-hover:w-full transition-all duration-300"></span>
                <span className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 rounded-lg transition-all duration-300"></span>
              </a>
              <a href="#depoimentos" className="relative group py-2 transition-colors duration-300">
                <span className="relative z-10">Depoimentos</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-400 group-hover:w-full transition-all duration-300"></span>
                <span className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 rounded-lg transition-all duration-300"></span>
              </a>
              <a href="#como-tomar" className="relative group py-2 transition-colors duration-300">
                <span className="relative z-10">Como tomar</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-400 group-hover:w-full transition-all duration-300"></span>
                <span className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 rounded-lg transition-all duration-300"></span>
              </a>
              <a href="#comprar" className="relative group py-2 transition-colors duration-300">
                <span className="relative z-10">Adquira o seu</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-400 group-hover:w-full transition-all duration-300"></span>
                <span className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 rounded-lg transition-all duration-300"></span>
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section com Imagem de Fundo - Landing Page de Alta Conversão */}
      <section id="home" className="relative min-h-[65vh] md:min-h-[60vh] flex items-center overflow-hidden py-8">
        {/* Background Image com Overlay Verde Vivo - ÚNICA IMAGEM */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90 mix-blend-hard-light"
            style={{backgroundImage: "url('/bg_img.png')"}}
          ></div>
          {/* Gradiente forte da esquerda (texto) para direita (imagem visível) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00d900]/95 via-[#00d900]/60 via-30% to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00ff00]/30 via-[#00ff00]/15 via-30% to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#00d900]/10 via-transparent to-[#00d900]/20"></div>
          {/* Gradiente escuro de baixo para cima */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

          {/* Textura de Folhas Tropicais */}
          <TropicalLeavesPattern />
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-green-600 rounded-full opacity-20 blur-3xl animate-pulse-slow pointer-events-none hidden md:block"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-500 rounded-full opacity-10 blur-3xl animate-float pointer-events-none hidden md:block"></div>

        {/* Fita Métrica Esquerda Superior - Decoração */}
        <div className="absolute left-[-250px] top-0 z-[5] pointer-events-none hidden lg:block">
          <img
            src="/fita-esquerda2.png"
            alt="Fita Métrica"
            className="w-auto h-[500px] xl:h-[600px] object-contain opacity-90"
            style={{
              transform: 'rotate(-25deg)',
              transformOrigin: 'top left',
              filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.3))'
            }}
          />
        </div>

        {/* Fita Métrica Direita Inferior - Decoração */}
        <div className="absolute right-0 bottom-[-200px] z-[5] pointer-events-none hidden lg:block">
          <img
            src="/fita-esquerda.png"
            alt="Fita Métrica"
            className="w-auto h-[400px] xl:h-[500px] object-contain opacity-90"
            style={{
              transform: 'rotate(15deg) translateX(10%)',
              transformOrigin: 'bottom right',
              filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.3))'
            }}
          />
        </div>

        <div className="container mx-auto px-8 sm:px-12 lg:px-16 xl:px-24 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-white space-y-4 sm:space-y-5">
              {/* Título Principal com Animação */}
              <div className="space-y-0" key={`title-${currentSlide}`}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.5] tracking-tight">
                  <span className={`block text-[#F2F2F2] uppercase barlow-font ${!isLoading ? 'animate-enter-title-1' : 'opacity-0'}`} style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
                    {slides[currentSlide].title1}
                  </span>
                  <span className={`block text-[#F2F2F2] uppercase barlow-font ${!isLoading ? 'animate-enter-title-2' : 'opacity-0'}`} style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
                    {slides[currentSlide].title2}
                  </span>
                </h1>
              </div>

              {/* Subtítulo */}
              <div key={`subtitle-${currentSlide}`} className={`text-sm sm:text-base md:text-lg text-[#F2F2F2] font-medium leading-snug max-w-xl barlow-font ${!isLoading ? 'animate-enter-subtitle' : 'opacity-0'}`}>
                {slides[currentSlide].subtitle.map((line, i) => (
                  <p key={i} className="block">{line}</p>
                ))}
              </div>

              {/* Botões CTA Otimizados */}
              <div key={`buttons-${currentSlide}`} className="flex flex-col gap-3 sm:gap-4 pt-2 sm:pt-4">
                <a
                  href="#form"
                  className={`cta-button-premium group relative inline-flex items-center justify-center px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-black rounded-full overflow-hidden transition-all duration-500 transform hover:scale-105 w-full sm:w-auto ${!isLoading ? 'animate-enter-button-1' : 'opacity-0'}`}
                >
                  {/* Gradiente animado de fundo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-emerald-600 via-lime-600 to-green-700 bg-[length:200%_100%] animate-gradient-flow"></div>

                  {/* Gradiente secundário para profundidade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent"></div>

                  {/* Borda dupla animada */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/30 group-hover:border-white/60 transition-all duration-300"></div>
                  <div className="absolute inset-[-2px] rounded-full border border-green-400/50 animate-pulse-border"></div>

                  {/* Glow effect externo - sempre visível */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-emerald-600 to-lime-600 opacity-40 group-hover:opacity-100 blur-2xl transition-opacity duration-500 animate-glow-pulse"></div>

                  {/* Glow effect interno */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 rounded-full transition-all duration-500 animate-shimmer"></div>

                  {/* Inner glow no hover */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 rounded-full transition-all duration-300"></div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out skew-x-12"></div>
                  </div>

                  <span className="relative flex items-center gap-3 text-white drop-shadow-2xl tracking-wide">
                    COMEÇAR AGORA
                    <span className="group-hover:translate-x-2 transition-transform duration-300 text-xl">→</span>
                  </span>
                </a>

                <a
                  href="#depoimentos"
                  className={`group relative inline-flex items-center justify-center px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-bold rounded-full border-2 border-white/30 backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto ${!isLoading ? 'animate-enter-button-2' : 'opacity-0'}`}
                >
                  <span className="flex items-center gap-2 text-white">
                    Ver Resultados
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-yellow-400 text-yellow-400 group-hover:rotate-12 transition-transform" />
                  </span>
                </a>
              </div>

              {/* Social Proof */}
              <div key={`social-${currentSlide}`} className={`flex flex-wrap items-center gap-4 sm:gap-6 pt-3 sm:pt-6 ${!isLoading ? 'animate-enter-social' : 'opacity-0'}`}>
                <div className="flex -space-x-2 sm:-space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 border-2 border-black flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                      {i}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 sm:gap-1 mb-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300">
                    <span className="font-bold text-white">4.9/5</span> · +2.500 avaliações
                  </p>
                </div>
              </div>
            </div>

            {/* Product Showcase - Responsivo com Flutuação */}
            <div className={`relative hidden lg:flex justify-center items-center ${!isLoading ? 'animate-enter-product' : 'opacity-0'}`}>
              {/* Seta Esquerda */}
              <button
                onClick={prevSlide}
                className="absolute left-0 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-4 rounded-full transition-all duration-300 hover:scale-110 border border-white/30"
                style={{top: '50%', transform: 'translateY(-50%)'}}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="relative w-full max-w-3xl h-[700px] flex items-center justify-center">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-600 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>

                {/* Container para as imagens empilhadas como cartas de baralho */}
                <div className="relative z-10 w-full max-w-2xl">
                  {/* Lista de Benefícios Rápidos - Abaixo da Imagem */}
                  <div key={`pills-${currentSlide}`} className={`absolute bottom-32 left-1/2 -translate-x-1/2 z-[15] flex flex-col gap-3 ${!isLoading ? 'animate-enter-pills' : 'opacity-0'}`}>
                    {slides[currentSlide].pills.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105"
                           style={{animationDelay: `${i * 0.1}s`, textShadow: '1px 1px 2px rgba(0,0,0,0.3)', boxShadow: '0 2px 8px rgba(0,0,0,0.2)'}}>
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-semibold whitespace-nowrap text-white">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Imagem do Produto TRASEIRA - Rotacionada como carta de baralho */}
                  <div
                    className={`absolute inset-0 z-[5] ${!isLoading ? 'product-floating-back' : 'opacity-0'}`}
                    style={{
                      transform: `translate(${-mousePosition.x * 15 - 80}px, ${-mousePosition.y * 15}px) rotate(-18deg) scale(0.92)`,
                      transition: 'transform 0.25s ease-out',
                      transformOrigin: 'center center'
                    }}
                  >
                    <img
                      src="/encapsulado_transparente.png"
                      alt="Full Power - Encapsulado Natural Background"
                      className="w-full h-auto drop-shadow-xl animate-float-product-back"
                      style={{
                        filter: 'drop-shadow(0 20px 40px rgba(34, 197, 94, 0.5)) brightness(0.92)'
                      }}
                    />
                  </div>

                  {/* Imagem do Produto FRONTAL com Efeito de Flutuação */}
                  <div
                    className={`relative z-[10] ${!isLoading ? 'product-floating-front' : 'opacity-0'}`}
                    style={{
                      transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
                      transition: 'transform 0.2s ease-out',
                      transformOrigin: 'center bottom'
                    }}
                  >
                    <img
                      src="/encapsulado_transparente.png"
                      alt="Full Power - Encapsulado Natural"
                      className="w-full h-auto drop-shadow-2xl animate-float-product"
                      style={{
                        filter: 'drop-shadow(0 25px 50px rgba(34, 197, 94, 0.5))'
                      }}
                    />
                  </div>
                </div>

                {/* Badges Flutuantes - Mais próximos da imagem */}
                <div
                  className="absolute top-8 right-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-4 shadow-2xl animate-float-badge-1 border-4 border-white/20 z-20"
                  style={{
                    transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
                    transition: 'transform 0.25s ease-out'
                  }}
                >
                  <div className="text-center">
                    <div className="text-3xl font-black text-white">-8kg</div>
                    <div className="text-xs text-white/90 font-semibold">30 dias</div>
                  </div>
                </div>

                <div
                  className="absolute bottom-16 left-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-4 shadow-2xl animate-float-badge-2 border-4 border-white/20 z-20"
                  style={{
                    transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
                    transition: 'transform 0.25s ease-out'
                  }}
                >
                  <div className="text-center">
                    <div className="text-3xl font-black text-white">100%</div>
                    <div className="text-xs text-white/90 font-semibold">Natural</div>
                  </div>
                </div>

                <div
                  className="absolute top-1/2 right-4 bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl p-3 shadow-2xl animate-float-badge-3 z-20"
                  style={{
                    transform: `translate(${mousePosition.x * 18}px, ${mousePosition.y * -18}px) translateY(-50%)`,
                    transition: 'transform 0.25s ease-out'
                  }}
                >
                  <Shield className="w-8 h-8 text-white" />
                </div>

                {/* Badge Extra - Fogo */}
                <div
                  className="absolute top-24 left-4 bg-gradient-to-br from-lime-400 to-rose-500 rounded-2xl p-3 shadow-2xl animate-float-badge-4 z-20"
                  style={{
                    transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * 15}px)`,
                    transition: 'transform 0.25s ease-out'
                  }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-black text-white">🔥</div>
                  </div>
                </div>
              </div>

              {/* Seta Direita */}
              <button
                onClick={nextSlide}
                className="absolute right-0 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-4 rounded-full transition-all duration-300 hover:scale-110 border border-white/30"
                style={{top: '50%', transform: 'translateY(-50%)'}}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce hidden sm:block">
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs font-semibold">Role para descobrir</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-white/60 rounded-full animate-scroll"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário de Captura */}
      <section id="form" className="py-16 bg-white relative overflow-hidden">
        {/* Textura de Folhas Tropicais de Fundo */}
        <TropicalLeavesPattern />

        {/* Folhas PNG Animadas - Centralizadas ao Redor do Formulário */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Folha 1 - Topo Esquerda do Formulário */}
          <div
            className={`absolute top-[8%] left-[20%] animate-leaf-float-1 leaf-scroll-animate ${leavesVisible ? 'visible' : ''}`}
            style={{
              transform: leavesVisible
                ? `translate(${mousePosition.x * 60}px, ${mousePosition.y * 50}px) rotate(${-12 + mousePosition.x * 5}deg) scale(1)`
                : 'translateY(30px) scale(0.8)',
              transitionDelay: '0.1s'
            }}
          >
            <img
              src="/icon-1.png"
              alt="Folha decorativa"
              className="w-20 h-20 md:w-28 md:h-28 object-contain"
              style={{
                filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.25))'
              }}
            />
          </div>

          {/* Folha 2 - Topo Centro */}
          <div
            className={`absolute top-[5%] left-[48%] animate-leaf-float-2 leaf-scroll-animate ${leavesVisible ? 'visible' : ''}`}
            style={{
              transform: leavesVisible
                ? `translate(${mousePosition.x * -40}px, ${mousePosition.y * 60}px) rotate(${25 + mousePosition.x * -8}deg) scale(1)`
                : 'translateY(30px) scale(0.8)',
              transitionDelay: '0.2s'
            }}
          >
            <img
              src="/icin2.png"
              alt="Folha decorativa"
              className="w-16 h-16 md:w-24 md:h-24 object-contain"
              style={{
                filter: 'drop-shadow(3px 5px 10px rgba(0,0,0,0.3))'
              }}
            />
          </div>

          {/* Folha 3 - Topo Direita do Formulário */}
          <div
            className={`absolute top-[12%] right-[22%] animate-leaf-float-3 leaf-scroll-animate ${leavesVisible ? 'visible' : ''}`}
            style={{
              transform: leavesVisible
                ? `translate(${mousePosition.x * -70}px, ${mousePosition.y * 45}px) rotate(${78 + mousePosition.x * -10}deg) scale(1)`
                : 'translateY(30px) scale(0.8)',
              transitionDelay: '0.3s'
            }}
          >
            <img
              src="/icin3.png"
              alt="Folha decorativa"
              className="w-22 h-22 md:w-30 md:h-30 object-contain"
              style={{
                filter: 'drop-shadow(2px 3px 6px rgba(0,0,0,0.25))'
              }}
            />
          </div>

          {/* Folha 4 - Esquerda Meio-Alto */}
          <div
            className={`absolute top-[28%] left-[18%] animate-leaf-float-4 leaf-scroll-animate ${leavesVisible ? 'visible' : ''}`}
            style={{
              transform: leavesVisible
                ? `translate(${mousePosition.x * 50}px, ${mousePosition.y * -55}px) rotate(${-35 + mousePosition.x * 7}deg) scale(1)`
                : 'translateY(30px) scale(0.8)',
              transitionDelay: '0.4s'
            }}
          >
            <img
              src="/icon4.png"
              alt="Folha decorativa"
              className="w-26 h-26 md:w-34 md:h-34 object-contain"
              style={{
                filter: 'drop-shadow(4px 6px 12px rgba(0,0,0,0.3))'
              }}
            />
          </div>

          {/* Folha 5 - Próxima ao Formulário Esquerda */}
          <div
            className={`absolute top-[42%] left-[25%] animate-leaf-float-5 leaf-scroll-animate ${leavesVisible ? 'visible' : ''}`}
            style={{
              transform: leavesVisible
                ? `translate(${mousePosition.x * 35}px, ${mousePosition.y * 40}px) rotate(${15 + mousePosition.x * 6}deg) scale(1)`
                : 'translateY(30px) scale(0.8)',
              transitionDelay: '0.5s'
            }}
          >
            <img
              src="/icon5.png"
              alt="Folha decorativa"
              className="w-18 h-18 md:w-26 md:h-26 object-contain"
              style={{
                filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.25))'
              }}
            />
          </div>

          {/* Folha 6 - Direita Meio */}
          <div
            className={`absolute top-[35%] right-[20%] animate-leaf-float-6 leaf-scroll-animate ${leavesVisible ? 'visible' : ''}`}
            style={{
              transform: leavesVisible
                ? `translate(${mousePosition.x * -65}px, ${mousePosition.y * -35}px) rotate(${52 + mousePosition.x * -9}deg) scale(1)`
                : 'translateY(30px) scale(0.8)',
              transitionDelay: '0.6s'
            }}
          >
            <img
              src="/icon6.png"
              alt="Folha decorativa"
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
              style={{
                filter: 'drop-shadow(3px 5px 10px rgba(0,0,0,0.3))'
              }}
            />
          </div>

          {/* Folha 7 - Próxima ao Formulário Direita */}
          <div
            className={`absolute top-[48%] right-[26%] animate-leaf-float-7 leaf-scroll-animate ${leavesVisible ? 'visible' : ''}`}
            style={{
              transform: leavesVisible
                ? `translate(${mousePosition.x * -45}px, ${mousePosition.y * 50}px) rotate(${-48 + mousePosition.x * -8}deg) scale(1)`
                : 'translateY(30px) scale(0.8)',
              transitionDelay: '0.7s'
            }}
          >
            <img
              src="/icon-1.png"
              alt="Folha decorativa"
              className="w-20 h-20 md:w-28 md:h-28 object-contain"
              style={{
                filter: 'drop-shadow(2px 4px 9px rgba(0,0,0,0.28))'
              }}
            />
          </div>

          {/* Folha 8 - Centro Baixo do Formulário */}
          <div
            className={`absolute top-[62%] left-[32%] animate-leaf-float-8 leaf-scroll-animate ${leavesVisible ? 'visible' : ''}`}
            style={{
              transform: leavesVisible
                ? `translate(${mousePosition.x * 25}px, ${mousePosition.y * -50}px) rotate(${95 + mousePosition.x * 10}deg) scale(1)`
                : 'translateY(30px) scale(0.8)',
              transitionDelay: '0.8s'
            }}
          >
            <img
              src="/icin2.png"
              alt="Folha decorativa"
              className="w-22 h-22 md:w-30 md:h-30 object-contain"
              style={{
                filter: 'drop-shadow(3px 4px 7px rgba(0,0,0,0.27))'
              }}
            />
          </div>

          {/* Folha 9 - Baixo Esquerda Centro */}
          <div
            className={`absolute bottom-[8%] left-[28%] animate-leaf-float-9 leaf-scroll-animate ${leavesVisible ? 'visible' : ''}`}
            style={{
              transform: leavesVisible
                ? `translate(${mousePosition.x * 55}px, ${mousePosition.y * -60}px) rotate(${-65 + mousePosition.x * 12}deg) scale(1)`
                : 'translateY(30px) scale(0.8)',
              transitionDelay: '0.9s'
            }}
          >
            <img
              src="/icin3.png"
              alt="Folha decorativa"
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
              style={{
                filter: 'drop-shadow(2px 5px 8px rgba(0,0,0,0.26))'
              }}
            />
          </div>

          {/* Folha 10 - Baixo Direita Centro */}
          <div
            className={`absolute bottom-[12%] right-[30%] animate-leaf-float-10 leaf-scroll-animate ${leavesVisible ? 'visible' : ''}`}
            style={{
              transform: leavesVisible
                ? `translate(${mousePosition.x * -50}px, ${mousePosition.y * -45}px) rotate(${42 + mousePosition.x * -11}deg) scale(1)`
                : 'translateY(30px) scale(0.8)',
              transitionDelay: '1s'
            }}
          >
            <img
              src="/icon4.png"
              alt="Folha decorativa"
              className="w-26 h-26 md:w-34 md:h-34 object-contain"
              style={{
                filter: 'drop-shadow(3px 5px 10px rgba(0,0,0,0.3))'
              }}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-lg mx-auto bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 shadow-2xl relative scroll-scale-in ${leavesVisible ? 'visible' : ''}`}>

            <h2 className={`text-3xl font-black text-white text-center mb-6 scroll-fade-in ${leavesVisible ? 'visible' : ''}`} style={{transitionDelay: '0.2s'}}>Preencha seus dados</h2>
            <p className={`text-green-300 text-center mb-8 scroll-fade-in ${leavesVisible ? 'visible' : ''}`} style={{transitionDelay: '0.3s'}}>Receba informações exclusivas sobre o Full Power</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                value={formData.nome}
                onChange={handleInputChange}
                required
                className={`w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-green-500 transition-all scroll-fade-in ${leavesVisible ? 'visible' : ''}`}
                style={{transitionDelay: '0.4s'}}
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-green-500 transition-all scroll-fade-in ${leavesVisible ? 'visible' : ''}`}
                style={{transitionDelay: '0.5s'}}
              />
              <input
                type="tel"
                name="telefone"
                placeholder="Telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                required
                className={`w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-green-500 transition-all scroll-fade-in ${leavesVisible ? 'visible' : ''}`}
                style={{transitionDelay: '0.6s'}}
              />
              <input
                type="text"
                name="cidade"
                placeholder="Cidade"
                value={formData.cidade}
                onChange={handleInputChange}
                required
                className={`w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-green-500 transition-all scroll-fade-in ${leavesVisible ? 'visible' : ''}`}
                style={{transitionDelay: '0.7s'}}
              />
              <button
                type="submit"
                className={`group relative w-full inline-flex items-center justify-center px-10 py-5 text-lg font-black rounded-full overflow-hidden transition-all duration-500 transform hover:scale-105 scroll-fade-in ${leavesVisible ? 'visible' : ''}`}
                style={{transitionDelay: '0.8s'}}
              >
                {/* Gradiente animado de fundo */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-emerald-600 via-lime-600 to-green-700 bg-[length:200%_100%] animate-gradient-flow"></div>

                {/* Gradiente secundário para profundidade */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent"></div>

                {/* Borda dupla animada */}
                <div className="absolute inset-0 rounded-full border-2 border-white/30 group-hover:border-white/60 transition-all duration-300"></div>
                <div className="absolute inset-[-2px] rounded-full border border-green-400/50 animate-pulse-border"></div>

                {/* Glow effect externo - sempre visível */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-emerald-600 to-lime-600 opacity-40 group-hover:opacity-100 blur-2xl transition-opacity duration-500 animate-glow-pulse"></div>

                {/* Glow effect interno */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 rounded-full transition-all duration-500 animate-shimmer"></div>

                {/* Inner glow no hover */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 rounded-full transition-all duration-300"></div>

                {/* Shine effect */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out skew-x-12"></div>
                </div>

                <span className="relative flex items-center gap-3 text-white drop-shadow-2xl tracking-wide">
                  ENVIAR INFORMAÇÕES
                  <span className="group-hover:translate-x-2 transition-transform duration-300 text-xl">→</span>
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Provas Sociais - Instagram Stories Style */}
      <section id="provas-sociais" className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className={`inline-block bg-green-700 text-white px-6 py-2 rounded-full text-sm font-bold mb-6 scroll-fade-in ${proofsVisible ? 'visible' : ''}`}>
                RESULTADOS REAIS
              </div>
              <h2 className={`text-4xl md:text-5xl font-black mb-6 scroll-fade-in ${proofsVisible ? 'visible' : ''}`} style={{transitionDelay: '0.1s'}}>
                Provas Sociais
              </h2>
              <p className={`text-lg text-gray-700 mb-6 leading-relaxed scroll-fade-in ${proofsVisible ? 'visible' : ''}`} style={{transitionDelay: '0.2s'}}>
                Milhares de pessoas já transformaram suas vidas com o Full Power. Veja os resultados impressionantes de quem já experimentou!
              </p>
              <p className={`text-lg text-gray-700 mb-6 leading-relaxed scroll-fade-in ${proofsVisible ? 'visible' : ''}`} style={{transitionDelay: '0.3s'}}>
                Resultados reais de clientes reais. Cada foto representa uma jornada de transformação autêntica e duradoura.
              </p>
              <div className="space-y-4">
                <div className={`flex items-start gap-3 scroll-fade-in ${proofsVisible ? 'visible' : ''}`} style={{transitionDelay: '0.4s'}}>
                  <CheckCircle className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Transformações verificadas e documentadas</p>
                </div>
                <div className={`flex items-start gap-3 scroll-fade-in ${proofsVisible ? 'visible' : ''}`} style={{transitionDelay: '0.5s'}}>
                  <CheckCircle className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Antes e depois de pessoas reais</p>
                </div>
                <div className={`flex items-start gap-3 scroll-fade-in ${proofsVisible ? 'visible' : ''}`} style={{transitionDelay: '0.6s'}}>
                  <CheckCircle className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Resultados em semanas, não anos</p>
                </div>
                <div className={`flex items-start gap-3 scroll-fade-in ${proofsVisible ? 'visible' : ''}`} style={{transitionDelay: '0.7s'}}>
                  <CheckCircle className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Mudanças sustentáveis e saudáveis</p>
                </div>
              </div>
              <a
                href="#comprar"
                className={`group relative inline-flex items-center justify-center px-10 py-4 text-base font-black rounded-full overflow-hidden transition-all duration-500 transform hover:scale-105 scroll-fade-in ${proofsVisible ? 'visible' : ''}`}
                style={{transitionDelay: '0.8s'}}
              >
                {/* Gradiente animado de fundo */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-emerald-600 via-lime-600 to-green-700 bg-[length:200%_100%] animate-gradient-flow"></div>

                {/* Gradiente secundário para profundidade */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent"></div>

                {/* Borda dupla animada */}
                <div className="absolute inset-0 rounded-full border-2 border-white/30 group-hover:border-white/60 transition-all duration-300"></div>
                <div className="absolute inset-[-2px] rounded-full border border-green-400/50 animate-pulse-border"></div>

                {/* Glow effect externo - sempre visível */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-emerald-600 to-lime-600 opacity-40 group-hover:opacity-100 blur-2xl transition-opacity duration-500 animate-glow-pulse"></div>

                {/* Glow effect interno */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 rounded-full transition-all duration-500 animate-shimmer"></div>

                {/* Inner glow no hover */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 rounded-full transition-all duration-300"></div>

                {/* Shine effect */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out skew-x-12"></div>
                </div>

                <span className="relative flex items-center gap-3 text-white drop-shadow-2xl tracking-wide">
                  QUERO MEU RESULTADO!
                  <span className="group-hover:translate-x-2 transition-transform duration-300 text-xl">→</span>
                </span>
              </a>
            </div>

            {/* Instagram Stories Carousel */}
            <div className={`relative flex justify-center items-center scroll-scale-in ${proofsVisible ? 'visible' : ''}`} style={{transitionDelay: '0.3s'}}>
              {/* Mockup de Celular */}
              <div className="relative w-[320px] h-[650px] bg-black rounded-[50px] p-3 shadow-2xl">
                {/* Notch do iPhone */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-20"></div>

                {/* Tela do Celular */}
                <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden">
                  {/* Stories Container - Fundo gradiente Instagram */}
                  <div className="relative w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
                    {/* Barra de Progresso do Stories */}
                    <div className="absolute top-3 left-0 right-0 flex gap-1 px-3 z-10">
                      {provasSociais.map((_, idx) => (
                        <div key={idx} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-white transition-all duration-300 ${idx === currentProof ? 'w-full' : idx < currentProof ? 'w-full' : 'w-0'}`}
                          ></div>
                        </div>
                      ))}
                    </div>

                    {/* Header do Instagram */}
                    <div className="absolute top-8 left-0 right-0 flex items-center gap-2 px-4 z-10">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-500 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                        FP
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-sm drop-shadow-lg">fullpower.oficial</p>
                        <p className="text-white/90 text-xs drop-shadow-lg">{provasSociais[currentProof]?.usuario || '@transformacao'}</p>
                      </div>
                    </div>

                    {/* Stories - Foto em tela cheia */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full overflow-hidden">
                        <div
                          className="flex transition-transform duration-500 ease-out h-full"
                          style={{ transform: `translateX(-${currentProof * 100}%)` }}
                        >
                          {provasSociais.map((prova, idx) => (
                            <div key={idx} className="min-w-full h-full">
                              <img
                                src={`/provas-sociais/${prova.foto}`}
                                alt={`Transformação ${prova.usuario}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Navegação - Oculta mas funcional */}
                    <button
                      onClick={() => setCurrentProof((prev) => (prev - 1 + provasSociais.length) % provasSociais.length)}
                      className="absolute left-0 top-0 bottom-0 w-1/3 z-10 opacity-0 hover:opacity-100 transition-opacity"
                      aria-label="Anterior"
                    >
                    </button>
                    <button
                      onClick={() => setCurrentProof((prev) => (prev + 1) % provasSociais.length)}
                      className="absolute right-0 top-0 bottom-0 w-1/3 z-10 opacity-0 hover:opacity-100 transition-opacity"
                      aria-label="Próximo"
                    >
                    </button>
                  </div>
                </div>

                {/* Botão Home do iPhone */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Para quem serve */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Para quem serve o<br/>
            <span className="text-green-700">Full Power?</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            O Full Power foi desenvolvido especialmente para mulheres que desejam emagrecer de forma natural e saudável
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "👩", text: "Mulheres de 25 a 65 anos que querem emagrecer" },
              { icon: "💪", text: "Quem deseja eliminar gordura localizada" },
              { icon: "🎯", text: "Pessoas que querem controlar a ansiedade" },
              { icon: "✨", text: "Quem busca mais energia e disposição" },
              { icon: "🌿", text: "Quem prefere produtos 100% naturais" },
              { icon: "❤️", text: "Mulheres que querem melhorar a autoestima" },
              { icon: "⚖️", text: "Quem luta contra o inchaço e retenção" },
              { icon: "🔥", text: "Pessoas que desejam acelerar o metabolismo" }
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow border border-purple-100">
                <div className="text-4xl mb-4">{item.icon}</div>
                <p className="text-gray-700 font-medium">{item.text}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a
              href="#comprar"
              className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-black rounded-full overflow-hidden transition-all duration-500 transform hover:scale-105"
            >
              {/* Gradiente animado de fundo */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-emerald-600 via-lime-600 to-green-700 bg-[length:200%_100%] animate-gradient-flow"></div>

              {/* Gradiente secundário para profundidade */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent"></div>

              {/* Borda dupla animada */}
              <div className="absolute inset-0 rounded-full border-2 border-white/30 group-hover:border-white/60 transition-all duration-300"></div>
              <div className="absolute inset-[-2px] rounded-full border border-green-400/50 animate-pulse-border"></div>

              {/* Glow effect externo - sempre visível */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-emerald-600 to-lime-600 opacity-40 group-hover:opacity-100 blur-2xl transition-opacity duration-500 animate-glow-pulse"></div>

              {/* Glow effect interno */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 rounded-full transition-all duration-500 animate-shimmer"></div>

              {/* Inner glow no hover */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 rounded-full transition-all duration-300"></div>

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out skew-x-12"></div>
              </div>

              <span className="relative flex items-center gap-3 text-white drop-shadow-2xl tracking-wide">
                QUERO COMEÇAR AGORA!
                <span className="group-hover:translate-x-2 transition-transform duration-300 text-xl">→</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Benefícios com Fundo Igual Primeira Dobra */}
      <section id="beneficios" className="py-20 text-white relative overflow-hidden">
        {/* Background Image com Overlay Verde Vivo - Igual Primeira Dobra */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90 mix-blend-hard-light"
            style={{backgroundImage: "url('/bg_img.png')", backgroundAttachment: 'fixed'}}
          ></div>
          {/* Gradiente forte da esquerda (texto) para direita (imagem visível) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00d900]/95 via-[#00d900]/60 via-30% to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00ff00]/30 via-[#00ff00]/15 via-30% to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#00d900]/10 via-transparent to-[#00d900]/20"></div>
          {/* Gradiente escuro de baixo para cima */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

          {/* Textura de Folhas Tropicais */}
          <TropicalLeavesPattern />
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-green-600 rounded-full opacity-20 blur-3xl animate-pulse-slow pointer-events-none hidden md:block"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-500 rounded-full opacity-10 blur-3xl animate-float pointer-events-none hidden md:block"></div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            E quais são seus benefícios?
          </h2>
          <p className="text-center text-xl mb-12 opacity-90">
            Descubra tudo o que o Full Power pode fazer por você
          </p>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12">
              <div className="space-y-6">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                    <p className="text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a
              href="#comprar"
              className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-black rounded-full overflow-hidden transition-all duration-500 transform hover:scale-105"
            >
              {/* Gradiente animado de fundo */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-emerald-600 via-lime-600 to-green-700 bg-[length:200%_100%] animate-gradient-flow"></div>

              {/* Gradiente secundário para profundidade */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent"></div>

              {/* Borda dupla animada */}
              <div className="absolute inset-0 rounded-full border-2 border-white/30 group-hover:border-white/60 transition-all duration-300"></div>
              <div className="absolute inset-[-2px] rounded-full border border-green-400/50 animate-pulse-border"></div>

              {/* Glow effect externo - sempre visível */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-emerald-600 to-lime-600 opacity-40 group-hover:opacity-100 blur-2xl transition-opacity duration-500 animate-glow-pulse"></div>

              {/* Glow effect interno */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 rounded-full transition-all duration-500 animate-shimmer"></div>

              {/* Inner glow no hover */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 rounded-full transition-all duration-300"></div>

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out skew-x-12"></div>
              </div>

              <span className="relative flex items-center gap-3 text-white drop-shadow-2xl tracking-wide">
                EU QUERO ESSES BENEFÍCIOS!
                <span className="group-hover:translate-x-2 transition-transform duration-300 text-xl">→</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Product Showcase com Imagem */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-green-700 to-emerald-600 rounded-full w-64 h-64 mx-auto mb-12 flex items-center justify-center shadow-2xl">
              <div className="text-white text-center">
                <div className="text-5xl font-black">FULL</div>
                <div className="text-5xl font-black">POWER</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como tomar */}
      <section id="como-tomar" className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                E como eu tomo o<br/>
                <span className="text-green-700">Full Power?</span>
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                O uso do Full Power é super simples e prático. Basta seguir as orientações abaixo para obter os melhores resultados:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-md">
                  <div className="bg-green-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <p className="text-gray-700">Tome 1 cápsula por dia após o café da manhã reforçado</p>
                </div>
                <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-md">
                  <div className="bg-green-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <p className="text-gray-700">Beba no mínimo 2 litros de água por dia</p>
                </div>
                <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-md">
                  <div className="bg-green-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <p className="text-gray-700">Evite bebidas alcoólicas durante o uso</p>
                </div>
                <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-md">
                  <div className="bg-green-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <p className="text-gray-700">Água de coco ou isotônicos ajudam na reposição de potássio</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <div className="bg-gradient-to-br from-purple-100 to-fuchsia-100 rounded-2xl p-12 text-center">
                  <div className="text-6xl mb-4">💊</div>
                  <h3 className="text-2xl font-bold text-green-900 mb-4">Muito Fácil!</h3>
                  <p className="text-purple-700">Apenas 1 cápsula por dia e você já estará no caminho da transformação</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a
              href="#comprar"
              className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-black rounded-full overflow-hidden transition-all duration-500 transform hover:scale-105"
            >
              {/* Gradiente animado de fundo */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-emerald-600 via-lime-600 to-green-700 bg-[length:200%_100%] animate-gradient-flow"></div>

              {/* Gradiente secundário para profundidade */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent"></div>

              {/* Borda dupla animada */}
              <div className="absolute inset-0 rounded-full border-2 border-white/30 group-hover:border-white/60 transition-all duration-300"></div>
              <div className="absolute inset-[-2px] rounded-full border border-green-400/50 animate-pulse-border"></div>

              {/* Glow effect externo - sempre visível */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-emerald-600 to-lime-600 opacity-40 group-hover:opacity-100 blur-2xl transition-opacity duration-500 animate-glow-pulse"></div>

              {/* Glow effect interno */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 rounded-full transition-all duration-500 animate-shimmer"></div>

              {/* Inner glow no hover */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 rounded-full transition-all duration-300"></div>

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out skew-x-12"></div>
              </div>

              <span className="relative flex items-center gap-3 text-white drop-shadow-2xl tracking-wide">
                QUERO COMEÇAR HOJE!
                <span className="group-hover:translate-x-2 transition-transform duration-300 text-xl">→</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Depoimentos - Carrossel */}
      <section id="depoimentos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Veja o que dizem<br/>
            <span className="text-green-700">quem já usa!</span>
          </h2>
          <p className="text-center text-gray-600 mb-12">Resultados reais de mulheres reais</p>

          {/* Carrossel de Depoimentos */}
          <div className="relative max-w-5xl mx-auto">
            {/* Botão Anterior */}
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-green-700 hover:bg-green-800 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 -ml-4 md:-ml-12"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Cards de Depoimentos */}
            <div className="overflow-hidden px-2">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-2">
                    <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 md:p-12 shadow-xl border border-purple-100 max-w-3xl mx-auto">
                      <div className="flex gap-1 mb-6 justify-center">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="text-center mb-6">
                        <h3 className="font-bold text-2xl text-gray-900 mb-2">{testimonial.name}</h3>
                        <p className="text-base text-green-700 mb-4">{testimonial.age}</p>
                        <div className="bg-green-700 text-white text-lg font-black px-6 py-2 rounded-full inline-block">
                          {testimonial.result}
                        </div>
                      </div>
                      <p className="text-gray-700 italic text-lg text-center leading-relaxed">"{testimonial.text}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botão Próximo */}
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-green-700 hover:bg-green-800 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 -mr-4 md:-mr-12"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicadores */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentTestimonial ? 'w-8 bg-green-700' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir para depoimento ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final com Fundo Roxo */}
      <section id="comprar" className="py-20 bg-gradient-to-br from-green-700 via-emerald-500 to-green-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Adquira já o seu!
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Transforme seu corpo com o Full Power. Oferta especial por tempo limitado!
            </p>
            
            {/* Kits */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-12">
              <div className="space-y-6">
                {/* Kit 3 Potes */}
                <div className="bg-white text-gray-900 rounded-2xl p-6 border-4 border-yellow-400 relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-6 py-2 rounded-full text-sm font-black">
                    MAIS VENDIDO
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-left">
                      <h3 className="text-2xl font-black mb-2">KIT 3 POTES</h3>
                      <p className="text-green-700 font-bold">Tratamento de 90 dias</p>
                      <p className="text-gray-600 text-sm mt-2">Resultado garantido + Frete GRÁTIS</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm line-through text-gray-500">R$ 1.050,00</p>
                      <p className="text-4xl font-black text-green-700">R$ 650,00</p>
                      <p className="text-sm text-green-600 font-bold">Economize R$ 400!</p>
                    </div>
                  </div>
                  <button className="w-full mt-6 bg-gradient-to-r from-green-700 to-emerald-600 text-white py-4 rounded-full font-bold hover:from-purple-700 hover:to-fuchsia-700 transition-all">
                    COMPRAR AGORA
                  </button>
                </div>

                {/* Kit 2 Potes */}
                <div className="bg-white text-gray-900 rounded-2xl p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-left">
                      <h3 className="text-2xl font-black mb-2">KIT 2 POTES</h3>
                      <p className="text-green-700 font-bold">Tratamento de 60 dias</p>
                      <p className="text-gray-600 text-sm mt-2">Ótimo custo-benefício + Frete GRÁTIS</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm line-through text-gray-500">R$ 700,00</p>
                      <p className="text-4xl font-black text-green-700">R$ 450,00</p>
                      <p className="text-sm text-green-600 font-bold">Economize R$ 250!</p>
                    </div>
                  </div>
                  <button className="w-full mt-6 bg-gradient-to-r from-green-700 to-emerald-600 text-white py-4 rounded-full font-bold hover:from-purple-700 hover:to-fuchsia-700 transition-all">
                    COMPRAR AGORA
                  </button>
                </div>

                {/* 1 Pote */}
                <div className="bg-white text-gray-900 rounded-2xl p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-left">
                      <h3 className="text-2xl font-black mb-2">1 POTE</h3>
                      <p className="text-green-700 font-bold">Tratamento de 30 dias</p>
                      <p className="text-gray-600 text-sm mt-2">Ideal para experimentar</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-black text-green-700">R$ 250,00</p>
                    </div>
                  </div>
                  <button className="w-full mt-6 bg-gradient-to-r from-green-700 to-emerald-600 text-white py-4 rounded-full font-bold hover:from-purple-700 hover:to-fuchsia-700 transition-all">
                    COMPRAR AGORA
                  </button>
                </div>
              </div>
            </div>

            {/* Garantia */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center gap-4">
              <Shield className="w-16 h-16 flex-shrink-0" />
              <div className="text-left">
                <h3 className="text-xl font-bold mb-2">Garantia de 30 Dias</h3>
                <p className="opacity-90">Se não gostar, devolvemos 100% do seu dinheiro. Simples assim!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-3xl font-black bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent mb-4">
                FULL POWER
              </div>
              <p className="text-gray-400 text-sm">
                Transformando vidas através do poder da natureza.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Páginas</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-green-500">O Produto</a></li>
                <li><a href="#beneficios" className="hover:text-green-500">Benefícios</a></li>
                <li><a href="#depoimentos" className="hover:text-green-500">Depoimentos</a></li>
                <li><a href="#comprar" className="hover:text-green-500">Adquira o seu</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contato</h3>
              <div className="space-y-3 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp: (XX) XXXXX-XXXX</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>contato@fullpower.com.br</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Seg-Sáb: 9h às 20h</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="text-center text-gray-500 text-sm">
              <p className="mb-2">Vendedor Autorizado: Reginaldo Valdori da Silva - CPF: 086.246.459-56</p>
              <p className="mb-2">Rua Manoel Eduardo Cardoso, 198 - Bela Vista, São José/SC - CEP: 88110-792</p>
              <p>© 2025 Full Power - Todos os direitos reservados</p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        /* Fonte Barlow Local */
        @font-face {
          font-family: 'Barlow';
          src: url('/fontes/Barlow-ExtraBoldItalic.ttf') format('truetype');
          font-weight: 900;
          font-style: italic;
          font-display: swap;
        }

        @font-face {
          font-family: 'BarlowMedium';
          src: url('/fontes/Barlow-MediumItalic.ttf') format('truetype');
          font-weight: 500;
          font-style: italic;
          font-display: swap;
        }

        .barlow-font {
          font-family: 'Barlow', 'Arial Black', 'Impact', sans-serif !important;
        }

        .barlow-thin-font {
          font-family: 'BarlowMedium', 'Arial', sans-serif !important;
        }

        /* Animação do fundo - Da esquerda para direita */
        @keyframes slideBackground {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animated-bg {
          animation: slideBackground 0.8s ease-out forwards;
        }

        /* Cursor piscante */
        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }

        .typing-cursor {
          animation: blink 1s infinite;
          font-weight: 100;
          margin-left: 2px;
        }

        /* Animações de Entrada */
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Gradientes Animados */
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Flutuação */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        /* Pulse Suave */
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }

        /* Bounce Suave */
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* Scroll Indicator */
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(16px); opacity: 0; }
        }

        /* Partículas */
        @keyframes particle-float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(100px, -100vh) rotate(360deg); opacity: 0; }
        }

        /* Classes de Animação */
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out 0.2s both;
        }

        .animate-slide-down {
          animation: slide-down 0.8s ease-out 0.1s both;
        }

        .animate-fade-in-delayed {
          animation: fade-in 1s ease-out 0.4s both;
        }

        .animate-fade-in-delayed-2 {
          animation: fade-in 1s ease-out 0.6s both;
        }

        .animate-fade-in-delayed-3 {
          animation: fade-in 1s ease-out 0.8s both;
        }

        .animate-fade-in-delayed-4 {
          animation: fade-in 1s ease-out 1s both;
        }

        .animate-fade-in-delayed-5 {
          animation: fade-in 1s ease-out 1.2s both;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-gradient-reverse {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite reverse;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-bounce-slow-delayed {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }

        /* Partículas Flutuantes */
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #22c55e, #10b981);
          border-radius: 50%;
          animation: particle-float linear infinite;
        }

        .particle-1 {
          left: 10%;
          animation-duration: 15s;
          animation-delay: 0s;
        }

        .particle-2 {
          left: 30%;
          animation-duration: 20s;
          animation-delay: 2s;
        }

        .particle-3 {
          left: 50%;
          animation-duration: 18s;
          animation-delay: 4s;
        }

        .particle-4 {
          left: 70%;
          animation-duration: 22s;
          animation-delay: 1s;
        }

        .particle-5 {
          left: 90%;
          animation-duration: 16s;
          animation-delay: 3s;
        }

        /* Responsividade */
        @media (max-width: 768px) {
          .particle {
            display: none;
          }
        }

        /* Efeito de Glow ao passar o mouse */
        .group:hover .animate-gradient-x {
          animation-duration: 1.5s;
        }

        /* Parallax suave */
        @media (prefers-reduced-motion: no-preference) {
          .animate-float-slow {
            will-change: transform;
          }
        }

        /* Animação de Flutuação - Produto Principal */
        @keyframes float-product {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }

        .animate-float-product {
          animation: float-product 4s ease-in-out infinite;
        }

        /* Animação do Produto Traseiro - Flutuação diferente */
        @keyframes float-product-back {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-40px);
          }
        }

        .animate-float-product-back {
          animation: float-product-back 5s ease-in-out infinite 0.5s;
        }

        /* Animação de entrada do produto FRONTAL - vem de baixo */
        .product-floating-front {
          animation: enter-product-front 1.2s ease-out 1s both;
        }

        @keyframes enter-product-front {
          from {
            opacity: 0;
            transform: translateY(150px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Animação de entrada do produto TRASEIRO - cresce de trás do primeiro PNG */
        .product-floating-back {
          animation: enter-product-back 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 1.3s both;
        }

        @keyframes enter-product-back {
          0% {
            opacity: 0;
            transform: translateX(-120px) rotate(-25deg) scale(0);
          }
          30% {
            opacity: 0.4;
            transform: translateX(-105px) rotate(-22deg) scale(0.3);
          }
          60% {
            opacity: 0.8;
            transform: translateX(-88px) rotate(-19deg) scale(0.7);
          }
          85% {
            opacity: 1;
            transform: translateX(-78px) rotate(-17deg) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateX(-80px) rotate(-18deg) scale(0.92);
          }
        }

        /* Animações de Flutuação - Badges */
        @keyframes float-badge-1 {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-badge-2 {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-25px);
          }
        }

        @keyframes float-badge-3 {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes float-badge-4 {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-18px);
          }
        }

        .animate-float-badge-1 {
          animation: float-badge-1 3.5s ease-in-out infinite;
        }

        .animate-float-badge-2 {
          animation: float-badge-2 4.2s ease-in-out infinite 0.5s;
        }

        .animate-float-badge-3 {
          animation: float-badge-3 3.8s ease-in-out infinite 0.8s;
        }

        .animate-float-badge-4 {
          animation: float-badge-4 4s ease-in-out infinite 0.3s;
        }

        /* Flutuação suave */
        .product-floating {
          will-change: transform;
        }

        /* Hover suave nos badges */
        .absolute[style*="translate"] {
          will-change: transform;
        }

        /* Animações Premium do Botão CTA */
        @keyframes gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        @keyframes pulse-border {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-gradient-flow {
          animation: gradient-flow 4s ease infinite;
        }

        .animate-glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }

        .animate-pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        /* Botão Premium */
        .cta-button-premium {
          box-shadow: 0 20px 60px rgba(34, 197, 94, 0.4);
        }

        .cta-button-premium:hover {
          box-shadow: 0 25px 80px rgba(34, 197, 94, 0.6);
        }

        /* Animações das Folhas 3D */
        @keyframes leaf-float-1 {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-15px) rotate(5deg) scale(1.05);
          }
          50% {
            transform: translateY(-25px) rotate(-3deg) scale(1.08);
          }
          75% {
            transform: translateY(-10px) rotate(4deg) scale(1.03);
          }
        }

        @keyframes leaf-float-2 {
          0%, 100% {
            transform: translateY(0px) rotate(45deg) scale(1);
          }
          30% {
            transform: translateY(-20px) rotate(50deg) scale(1.06);
          }
          60% {
            transform: translateY(-30px) rotate(40deg) scale(1.1);
          }
          85% {
            transform: translateY(-12px) rotate(48deg) scale(1.04);
          }
        }

        @keyframes leaf-float-3 {
          0%, 100% {
            transform: translateY(0px) rotate(-20deg) scale(1);
          }
          20% {
            transform: translateY(-18px) rotate(-15deg) scale(1.07);
          }
          55% {
            transform: translateY(-28px) rotate(-25deg) scale(1.09);
          }
          80% {
            transform: translateY(-8px) rotate(-18deg) scale(1.02);
          }
        }

        @keyframes leaf-float-4 {
          0%, 100% {
            transform: translateY(0px) rotate(30deg) scale(1);
          }
          35% {
            transform: translateY(-22px) rotate(35deg) scale(1.08);
          }
          65% {
            transform: translateY(-35px) rotate(25deg) scale(1.12);
          }
          90% {
            transform: translateY(-14px) rotate(32deg) scale(1.05);
          }
        }

        @keyframes leaf-float-5 {
          0%, 100% {
            transform: translateY(0px) rotate(-45deg) scale(1);
          }
          28% {
            transform: translateY(-16px) rotate(-40deg) scale(1.06);
          }
          58% {
            transform: translateY(-26px) rotate(-50deg) scale(1.08);
          }
          82% {
            transform: translateY(-10px) rotate(-43deg) scale(1.03);
          }
        }

        @keyframes leaf-float-6 {
          0%, 100% {
            transform: translateY(0px) rotate(60deg) scale(1);
          }
          32% {
            transform: translateY(-24px) rotate(65deg) scale(1.09);
          }
          62% {
            transform: translateY(-32px) rotate(55deg) scale(1.11);
          }
          88% {
            transform: translateY(-13px) rotate(62deg) scale(1.04);
          }
        }

        .animate-leaf-float-1 {
          animation: leaf-float-1 5.5s ease-in-out infinite;
        }

        .animate-leaf-float-2 {
          animation: leaf-float-2 6.2s ease-in-out infinite 0.5s;
        }

        .animate-leaf-float-3 {
          animation: leaf-float-3 5.8s ease-in-out infinite 1s;
        }

        .animate-leaf-float-4 {
          animation: leaf-float-4 6.5s ease-in-out infinite 0.3s;
        }

        .animate-leaf-float-5 {
          animation: leaf-float-5 5.3s ease-in-out infinite 0.8s;
        }

        .animate-leaf-float-6 {
          animation: leaf-float-6 6s ease-in-out infinite 0.2s;
        }

        /* Efeito 3D nas folhas */
        .leaf-3d {
          will-change: transform;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15));
        }

        .leaf-3d:hover {
          filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.25));
        }

        /* Responsividade - Esconde folhas em mobile */
        @media (max-width: 768px) {
          .leaf-3d {
            display: none;
          }
        }

        /* Animações do Loader Premium */
        @keyframes loader-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .loader-container {
          animation: loader-fade-in 0.3s ease-out;
        }

        /* ===== ANIMAÇÕES DO LOADER ULTRA VIBRANTE ===== */

        /* Partículas brilhantes */
        .loader-particle-1, .loader-particle-2, .loader-particle-3,
        .loader-particle-4, .loader-particle-5, .loader-particle-6 {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: linear-gradient(45deg, #22c55e, #34d399);
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.8);
        }

        .loader-particle-1 {
          top: 15%;
          left: 20%;
          animation: particle-float-1 4s ease-in-out infinite;
        }

        .loader-particle-2 {
          top: 25%;
          right: 15%;
          animation: particle-float-2 5s ease-in-out infinite 0.5s;
        }

        .loader-particle-3 {
          bottom: 20%;
          left: 15%;
          animation: particle-float-3 4.5s ease-in-out infinite 1s;
        }

        .loader-particle-4 {
          bottom: 30%;
          right: 25%;
          animation: particle-float-4 5.5s ease-in-out infinite 1.5s;
        }

        .loader-particle-5 {
          top: 50%;
          left: 10%;
          animation: particle-float-5 4.8s ease-in-out infinite 0.8s;
        }

        .loader-particle-6 {
          top: 60%;
          right: 12%;
          animation: particle-float-6 5.2s ease-in-out infinite 1.2s;
        }

        @keyframes particle-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          25% { transform: translate(20px, -30px) scale(1.5); opacity: 0.8; }
          50% { transform: translate(40px, -60px) scale(2); opacity: 1; }
          75% { transform: translate(20px, -30px) scale(1.5); opacity: 0.8; }
        }

        @keyframes particle-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          25% { transform: translate(-25px, 35px) scale(1.8); opacity: 0.9; }
          50% { transform: translate(-50px, 70px) scale(2.2); opacity: 1; }
          75% { transform: translate(-25px, 35px) scale(1.8); opacity: 0.9; }
        }

        @keyframes particle-float-3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          25% { transform: translate(30px, 25px) scale(1.6); opacity: 0.85; }
          50% { transform: translate(60px, 50px) scale(2.1); opacity: 1; }
          75% { transform: translate(30px, 25px) scale(1.6); opacity: 0.85; }
        }

        @keyframes particle-float-4 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          25% { transform: translate(-22px, -28px) scale(1.7); opacity: 0.9; }
          50% { transform: translate(-44px, -56px) scale(2.3); opacity: 1; }
          75% { transform: translate(-22px, -28px) scale(1.7); opacity: 0.9; }
        }

        @keyframes particle-float-5 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          25% { transform: translate(35px, 32px) scale(1.4); opacity: 0.8; }
          50% { transform: translate(70px, 64px) scale(1.9); opacity: 1; }
          75% { transform: translate(35px, 32px) scale(1.4); opacity: 0.8; }
        }

        @keyframes particle-float-6 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          25% { transform: translate(-28px, -35px) scale(1.65); opacity: 0.88; }
          50% { transform: translate(-56px, -70px) scale(2.15); opacity: 1; }
          75% { transform: translate(-28px, -35px) scale(1.65); opacity: 0.88; }
        }

        /* Orbs brilhantes de fundo */
        .loader-orb-1, .loader-orb-2, .loader-orb-3 {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.4;
        }

        .loader-orb-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #22c55e, transparent);
          top: -10%;
          right: -5%;
          animation: orb-float-1 8s ease-in-out infinite;
        }

        .loader-orb-2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #10b981, transparent);
          bottom: -15%;
          left: -10%;
          animation: orb-float-2 10s ease-in-out infinite;
        }

        .loader-orb-3 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, #34d399, transparent);
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: orb-float-3 7s ease-in-out infinite;
        }

        @keyframes orb-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 50px) scale(1.3); }
          66% { transform: translate(30px, -40px) scale(1.1); }
        }

        @keyframes orb-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -60px) scale(1.4); }
          66% { transform: translate(-35px, 45px) scale(1.2); }
        }

        @keyframes orb-float-3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.6); }
        }

        /* Logo entrada e gradiente animado */
        @keyframes logo-entrance {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(30px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-logo-entrance {
          animation: logo-entrance 1.2s ease-out;
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes gradient-x-reverse {
          0%, 100% { background-position: 100% 50%; }
          50% { background-position: 0% 50%; }
        }

        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 3s ease infinite;
        }

        .animate-gradient-x-reverse {
          background-size: 200% auto;
          animation: gradient-x-reverse 3s ease infinite;
        }

        /* Pulse forte */
        @keyframes pulse-strong {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.15);
          }
        }

        .animate-pulse-strong {
          animation: pulse-strong 2s ease-in-out infinite;
        }

        /* Loading circular - Spins suaves */
        @keyframes spin-smooth {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-reverse-smooth {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-smooth {
          animation: spin-smooth 3s linear infinite;
        }

        .animate-spin-reverse-smooth {
          animation: spin-reverse-smooth 2s linear infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }

        /* Centro ultra brilhante */
        @keyframes pulse-ultra {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          25% {
            transform: scale(1.15);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.7;
          }
          75% {
            transform: scale(1.15);
            opacity: 0.9;
          }
        }

        .animate-pulse-ultra {
          animation: pulse-ultra 2s ease-in-out infinite;
        }

        /* Raios rotativos */
        @keyframes rotate-rays {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-rotate-rays {
          animation: rotate-rays 6s linear infinite;
        }

        /* Texto com glow pulsante */
        @keyframes text-glow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.5));
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(52, 211, 153, 0.9));
            transform: scale(1.02);
          }
        }

        .animate-text-glow {
          animation: text-glow 2.5s ease-in-out infinite;
        }

        /* Dots bounce */
        @keyframes bounce-dot-1 {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-12px); }
        }

        @keyframes bounce-dot-2 {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-12px); }
        }

        @keyframes bounce-dot-3 {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-12px); }
        }

        .animate-bounce-dot-1 {
          animation: bounce-dot-1 1.4s ease-in-out infinite;
        }

        .animate-bounce-dot-2 {
          animation: bounce-dot-2 1.4s ease-in-out infinite 0.2s;
        }

        .animate-bounce-dot-3 {
          animation: bounce-dot-3 1.4s ease-in-out infinite 0.4s;
        }

        /* Animações de Entrada - Primeira Dobra */
        @keyframes enter-from-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes enter-from-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes enter-from-top {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes enter-from-bottom {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes enter-scale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Classes de entrada */
        .animate-enter-badge {
          animation: enter-from-top 0.8s ease-out 0.5s both;
        }

        .animate-enter-title-1 {
          animation: enter-from-left 1s ease-out 0.7s both;
        }

        .animate-enter-title-2 {
          animation: enter-from-left 1s ease-out 0.9s both;
        }

        .animate-enter-title-3 {
          animation: enter-from-left 1s ease-out 1.1s both;
        }

        .animate-enter-subtitle {
          animation: enter-from-bottom 1s ease-out 1.3s both;
        }

        .animate-enter-pills {
          animation: enter-from-bottom 1s ease-out 1.5s both;
        }

        .animate-enter-pills > * {
          animation: enter-scale 0.6s ease-out both;
        }

        .animate-enter-buttons {
          animation: enter-from-bottom 1s ease-out 1.7s both;
        }

        .animate-enter-button-1 {
          animation: enter-from-bottom 1s ease-out 1.7s both;
        }

        .animate-enter-button-2 {
          animation: enter-from-bottom 1s ease-out 1.9s both;
        }

        .animate-enter-social {
          animation: enter-from-bottom 1s ease-out 2.1s both;
        }

        .animate-enter-product {
          animation: enter-from-right 1.2s ease-out 1s both;
        }
      `}</style>
    </div>
    </>
  );
}
