import React, { useState, useEffect, useRef } from 'react';
import { Star, CheckCircle, Phone, Mail, Instagram, Facebook, MapPin, Clock, Shield, ChevronLeft, ChevronRight, Users, Zap, Target, Sparkles, Leaf, Heart, Scale, Flame, ShoppingBag } from 'lucide-react';
import TropicalLeavesPattern from './TropicalLeavesPattern';
// import AIAssistant from './AIAssistant'; // Desabilitado temporariamente

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
  const [currentVideo, setCurrentVideo] = useState(0); // Carrossel de vídeos no mobile
  const [currentPricing, setCurrentPricing] = useState(0); // Começa com kit 1 pote (índice 0)
  const [pricingDragStart, setPricingDragStart] = useState(null);
  const [pricingIsDragging, setPricingIsDragging] = useState(false);
  const [selectedStep, setSelectedStep] = useState(0); // Para seção "Como tomar"
  const [isDesktop, setIsDesktop] = useState(false); // Para responsividade do carrossel
  const [currentTarget, setCurrentTarget] = useState(0); // Carrossel "Para quem serve"
  const [currentBenefit, setCurrentBenefit] = useState(0); // Carrossel de benefícios
  const [isScrolled, setIsScrolled] = useState(false); // Para mobile menu
  const [activeSection, setActiveSection] = useState('home'); // Seção ativa no menu
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 }); // Countdown timer

  // Refs para controlar vídeos
  const videoRefs = useRef([]);

  // Lazy loading e animações por seção
  const [sectionsVisible, setSectionsVisible] = useState({
    hero: true, // Sempre visível
    form: false,
    proofs: false,
    targets: false,
    benefits: false,
    howToUse: false,
    testimonials: false,
    pricing: false,
    faq: false,
    footer: false
  });

  const slides = [
    {
      title1: 'Trans-',
      title1b: 'forme',
      title1Desktop: 'Transforme',
      title2: 'Seu',
      title3: 'Corpo',
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
    // Fotos .webp
    { foto: '1cb515ff-298c-44f9-adeb-8f000a3387dc.webp', usuario: '@mariasilva', label: 'ANTES', tipo: 'antes' },
    { foto: '42423aa4-ca46-4e5c-a9b6-bbfbfd35ec28.webp', usuario: '@mariasilva', label: 'DEPOIS', tipo: 'depois' },
    { foto: '61063d8c-faaa-4eb7-8a38-2cb79db64cf2.webp', usuario: '@anapaula', label: 'ANTES', tipo: 'antes' },
    { foto: '6db3223f-8e1e-41f0-9ba1-d782e4adc031.webp', usuario: '@anapaula', label: 'DEPOIS', tipo: 'depois' },
    { foto: '8ce3b7c1-a590-4e7c-8aae-422a89b9ec0e.webp', usuario: '@julianacosta', label: 'ANTES', tipo: 'antes' },
    { foto: '9c0c4978-9f9f-4ee8-948c-ae5afd56643e.webp', usuario: '@julianacosta', label: 'DEPOIS', tipo: 'depois' },
    { foto: '9cfe9175-d0a2-45cb-8028-aee0af7b4f1a.webp', usuario: '@camilasantos', label: 'ANTES', tipo: 'antes' },
    { foto: 'abfe4261-bcd5-47f1-b965-a4b7016fee57.webp', usuario: '@camilasantos', label: 'DEPOIS', tipo: 'depois' },
    { foto: 'acc51b5d-3340-42bb-a960-9ba4625103c8.webp', usuario: '@patricialima', label: 'ANTES', tipo: 'antes' },
    { foto: 'af549431-5da5-4a27-9546-69a6902e1c64.webp', usuario: '@patricialima', label: 'DEPOIS', tipo: 'depois' },
    { foto: 'c7c98b4a-39ce-40a9-8cfe-997a9f79847c.webp', usuario: '@fernandaoliveira', label: 'ANTES', tipo: 'antes' },
    { foto: 'cf15db01-2681-4b77-bc12-26e02aa0d283.webp', usuario: '@fernandaoliveira', label: 'DEPOIS', tipo: 'depois' },
    { foto: 'd35e8fd8-3e1d-46a4-a38d-87b645c9183e.webp', usuario: '@beatrizrodrigues', label: 'ANTES', tipo: 'antes' },
    { foto: '1cb515ff-298c-44f9-adeb-8f000a3387dc.webp', usuario: '@beatrizrodrigues', label: 'DEPOIS', tipo: 'depois' },

    // Fotos .jpg
    { foto: '7547ec4b-1a5b-4877-bc03-2328981c2561.jpg', usuario: '@vanessalopes', label: 'RESULTADO', tipo: 'depois' },
    { foto: '7862f95a-e414-4ff5-8526-f1c57e5f0275.jpg', usuario: '@carolmartins', label: 'RESULTADO', tipo: 'depois' },
    { foto: '649f4dec-51b6-4be4-b593-bc3b9bbc0c14.jpg', usuario: '@renatasouza', label: 'RESULTADO', tipo: 'depois' },
    { foto: '7674fa79-de9b-4f5a-82ce-5458674b28b1.jpg', usuario: '@lucianaalves', label: 'RESULTADO', tipo: 'depois' },
    { foto: '9239b8bb-9c24-4b1b-809f-9042ce41786d.jpg', usuario: '@gabrielaribeiro', label: 'RESULTADO', tipo: 'depois' },
    { foto: '0b63d636-02d8-4d66-a888-67deff7fd81f.jpg', usuario: '@isabelapereira', label: 'RESULTADO', tipo: 'depois' },
    { foto: '6cd1c420-0963-4faf-a43e-fbfb192fe3ac.jpg', usuario: '@andreiafernandes', label: 'RESULTADO', tipo: 'depois' },
    { foto: 'ad952d02-9e98-4ee3-adcf-a56b88c119b9.jpg', usuario: '@vivianerocha', label: 'RESULTADO', tipo: 'depois' },
    { foto: 'dd0896b0-3a91-4b64-b1f7-e206625dc987.jpg', usuario: '@larissacarvalho', label: 'RESULTADO', tipo: 'depois' },
    { foto: '44666dc3-6de3-42aa-b745-9f31000add89.jpg', usuario: '@thaisnunes', label: 'RESULTADO', tipo: 'depois' },
    { foto: 'b35f8f8c-7120-4467-84a9-f6149fcb07e7.jpg', usuario: '@danielabarbosa', label: 'RESULTADO', tipo: 'depois' },
    { foto: '70c366a9-d495-424c-b7e3-69318fb282a3.jpg', usuario: '@leticiagomes', label: 'RESULTADO', tipo: 'depois' },
    { foto: 'f09aa944-b6e4-4f06-a4a9-40e6c3daf22f.jpg', usuario: '@rafaelamelo', label: 'RESULTADO', tipo: 'depois' },
    { foto: '30a98fa0-160a-4723-8fb4-b5b6f4f5dbff.jpg', usuario: '@adrianafreitas', label: 'RESULTADO', tipo: 'depois' },
    { foto: '43ad5121-4e7c-47b7-ac57-70d8fa697049.jpg', usuario: '@monicalima', label: 'RESULTADO', tipo: 'depois' },
    { foto: '262bf06a-73e3-4755-9071-e1949a2ceaf3.jpg', usuario: '@sabrinacosta', label: 'RESULTADO', tipo: 'depois' },
    { foto: 'ae0b7c2e-8950-4215-8bea-2811306c24e5.jpg', usuario: '@brunamendes', label: 'RESULTADO', tipo: 'depois' },
    { foto: '491808e7-3f9c-4f52-ab06-bd3a64b11ca8.jpg', usuario: '@priscilaaraujo', label: 'RESULTADO', tipo: 'depois' },
    { foto: '45eaaf9e-1a76-4a43-88c9-6bb9259c931b.jpg', usuario: '@claudiasantos', label: 'RESULTADO', tipo: 'depois' },
    { foto: 'c1752826-838e-4116-bebe-a97ac21e8954.jpg', usuario: '@rosangelaoliveira', label: 'RESULTADO', tipo: 'depois' },
    { foto: 'fa14f284-5732-43e3-84e0-7a1338735f38.jpg', usuario: '@marciasilva', label: 'RESULTADO', tipo: 'depois' },
    { foto: 'faa44f06-82d7-46f2-ad1e-2ada0e503e7b.jpg', usuario: '@soniarodrigues', label: 'RESULTADO', tipo: 'depois' },
    { foto: 'c3a371dc-08cf-4b27-aea3-76e97083d2bc.jpg', usuario: '@elenalopes', label: 'RESULTADO', tipo: 'depois' },
    { foto: '2611044f-dbaa-4e97-a44d-a08096b3f1ee.jpg', usuario: '@paulamartins', label: 'RESULTADO', tipo: 'depois' },
    { foto: '66e2c6ea-8983-4eaa-8547-d34c798f4269.jpg', usuario: '@simonealves', label: 'RESULTADO', tipo: 'depois' },
    { foto: '3dad8aab-08bc-41ce-b893-f27a97c1eb65.jpg', usuario: '@reginaferreira', label: 'RESULTADO', tipo: 'depois' },
    { foto: '3aa35575-b3aa-473a-97fe-826f52821310.jpg', usuario: '@fatimacosta', label: 'RESULTADO', tipo: 'depois' },
    { foto: '2d2f23f7-fe0c-4b2b-a1fb-d0d10a1e688b.jpg', usuario: '@terezasouza', label: 'RESULTADO', tipo: 'depois' },
    { foto: '5e64dbdd-f4f2-47c4-87ec-5a9d7f0f3d7d.jpg', usuario: '@liliansantos', label: 'RESULTADO', tipo: 'depois' },
    { foto: '4e00767e-c25b-491f-8bbb-191d88298bbd.jpg', usuario: '@helenagomes', label: 'RESULTADO', tipo: 'depois' }
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
    // Detecta scroll para animar folhas, provas sociais e mobile menu
    const handleScroll = () => {
      // Detecta se scrollou mais de 100px para mostrar menu mobile
      setIsScrolled(window.scrollY > 100);

      // Detecta seção ativa baseado no scroll
      const sections = ['home', 'beneficios', 'depoimentos', 'como-tomar', 'comprar'];
      let currentActiveSection = 'home';

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Se a seção está próxima do topo da viewport
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentActiveSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentActiveSection);

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

  // Countdown Timer - Oferta Limitada
  useEffect(() => {
    const calculateTimeLeft = () => {
      // Define o final do countdown para 23:59:59 de hoje
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const difference = endOfDay - now;

      if (difference > 0) {
        return {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }

      return { hours: 0, minutes: 0, seconds: 0 };
    };

    // Atualiza imediatamente
    setTimeLeft(calculateTimeLeft());

    // Atualiza a cada segundo
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Auto avançar provas sociais a cada 2 segundos
    const timer = setInterval(() => {
      setCurrentProof((prev) => (prev + 1) % provasSociais.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [provasSociais.length]);

  // Detectar tamanho da tela para responsividade do carrossel
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDesktop(); // Check inicial
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Intersection Observer para lazy loading e animações
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '50px', // Começa a carregar um pouco antes
      threshold: 0.1 // 10% visível
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId) {
            setSectionsVisible(prev => ({
              ...prev,
              [sectionId]: true
            }));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observar todas as seções
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  // Pausar vídeo anterior quando trocar de vídeo no mobile
  useEffect(() => {
    // Pausa todos os vídeos no mobile quando mudar de vídeo
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentVideo) {
        video.pause();
      }
    });
  }, [currentVideo]);

  // Função para pausar todos os outros vídeos quando um começa a tocar (desktop)
  const handleVideoPlay = (playingIndex) => {
    videoRefs.current.forEach((video, index) => {
      if (video && index !== playingIndex && !video.paused) {
        video.pause();
      }
    });
  };


  // Funções de drag/swipe para carrossel de preços
  const handlePricingDragStart = (e) => {
    setPricingIsDragging(true);
    setPricingDragStart(e.type.includes('mouse') ? e.clientX : e.touches[0].clientX);
  };

  const handlePricingDragMove = (e) => {
    if (!pricingIsDragging || pricingDragStart === null) return;
  };

  const handlePricingDragEnd = (e) => {
    if (!pricingIsDragging || pricingDragStart === null) return;

    const currentPosition = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
    const diff = pricingDragStart - currentPosition;

    // Se arrastou mais de 50px, muda o slide
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Arrastou para esquerda - próximo
        setCurrentPricing((prev) => (prev === pricingKits.length - 1 ? 0 : prev + 1));
      } else {
        // Arrastou para direita - anterior
        setCurrentPricing((prev) => (prev === 0 ? pricingKits.length - 1 : prev - 1));
      }
    }

    setPricingIsDragging(false);
    setPricingDragStart(null);
  };

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

  // Vídeos de depoimentos - Vídeos reais da pasta public/videos
  const videoTestimonials = [
    { video: 'WhatsApp Video 2025-10-30 at 16.15.11.mp4', name: "Carla Mendes", result: "-6kg em 4 semanas" },
    { video: 'WhatsApp Video 2025-10-30 at 16.15.12.mp4', name: "Juliana Santos", result: "-10kg em 2 meses" },
    { video: 'WhatsApp Video 2025-10-30 at 16.15.12 (1).mp4', name: "Patrícia Costa", result: "-9kg no total" },
    { video: 'WhatsApp Video 2025-10-30 at 16.15.15.mp4', name: "Fernanda Lima", result: "-7kg em 5 semanas" },
    { video: 'WhatsApp Video 2025-10-30 at 16.15.18.mp4', name: "Beatriz Souza", result: "-11kg em 3 meses" },
    { video: 'WhatsApp Video 2025-10-30 at 16.15.19.mp4', name: "Mariana Costa", result: "-5kg em 3 semanas" },
    { video: 'WhatsApp Video 2025-10-30 at 16.15.19 (1).mp4', name: "Luciana Alves", result: "-12kg em 4 meses" }
  ];

  const pricingKits = [
    {
      title: "1 POTE",
      subtitle: "Tratamento de 30 dias",
      description: "Ideal para experimentar",
      price: "R$ 250,00",
      oldPrice: null,
      savings: null,
      badge: null
    },
    {
      title: "KIT 3 POTES",
      subtitle: "Tratamento de 90 dias",
      description: "Resultado garantido + Frete GRÁTIS",
      price: "R$ 650,00",
      oldPrice: "R$ 1.050,00",
      savings: "Economize R$ 400!",
      badge: "MAIS VENDIDO"
    },
    {
      title: "KIT 2 POTES",
      subtitle: "Tratamento de 60 dias",
      description: "Ótimo custo-benefício + Frete GRÁTIS",
      price: "R$ 450,00",
      oldPrice: "R$ 700,00",
      savings: "Economize R$ 250!",
      badge: null
    }
  ];

  return (
    <>
      {/* Loader Premium Minimalista */}
      {isLoading && (
        <div className="loader-container fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
          {/* Background igual primeira dobra */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
               style={{backgroundImage: "url('/bg_img.webp')"}}></div>
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

      <div className={`min-h-screen bg-black md:bg-white transition-opacity duration-500 pb-20 md:pb-0 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Countdown Timer - Fixed Top (Todas as dobras) - Compacto - MOBILE ONLY */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-[60] w-full px-2 py-1.5" style={{background: '#0a0a0a'}}>
          <div className="flex items-center justify-center gap-2">
            <svg className="w-3 h-3 text-green-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="text-white text-[10px] font-bold uppercase">Oferta Expira:</span>
            <div className="flex items-center gap-1">
              <div className="flex items-center bg-black/60 rounded px-1.5 py-0.5">
                <span className="text-base font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[8px] text-green-400 font-bold ml-0.5">h</span>
              </div>
              <span className="text-white text-sm font-black">:</span>
              <div className="flex items-center bg-black/60 rounded px-1.5 py-0.5">
                <span className="text-base font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[8px] text-green-400 font-bold ml-0.5">m</span>
              </div>
              <span className="text-white text-sm font-black">:</span>
              <div className="flex items-center bg-black/60 rounded px-1.5 py-0.5">
                <span className="text-base font-black text-white">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[8px] text-green-400 font-bold ml-0.5">s</span>
              </div>
            </div>
            <span className="text-[9px] text-green-400 font-bold">🔥 Últimas unidades!</span>
          </div>
        </div>

        {/* Header/Menu - Desktop: sticky top, Mobile: bottom navigation bar */}
        <header className={`md:bg-black/95 backdrop-blur-sm text-white py-0 md:py-5 fixed md:sticky -bottom-2 md:top-0 left-0 right-0 z-50 md:shadow-lg transition-all duration-300 ${
          isScrolled ? 'md:shadow-2xl' : ''
        } md:border-b md:border-green-500/20`}>
        {/* Desktop Menu */}
        <div className="hidden md:block container mx-auto px-2 md:px-4">
          <nav className="flex items-center justify-center">
            <div className="flex items-center gap-8 lg:gap-12 text-sm lg:text-base font-semibold barlow-thin-italic-font">
              <a
                href="#home"
                className={`relative group py-2 px-2 transition-colors duration-300 ${activeSection === 'home' ? 'text-green-400' : ''}`}
              >
                <span className="relative z-10">O Produto</span>
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-300 ${activeSection === 'home' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                <span className={`absolute inset-0 rounded-lg transition-all duration-300 ${activeSection === 'home' ? 'bg-green-500/20' : 'bg-green-500/0 group-hover:bg-green-500/10'}`}></span>
              </a>
              <a
                href="#beneficios"
                className={`relative group py-2 px-2 transition-colors duration-300 ${activeSection === 'beneficios' ? 'text-green-400' : ''}`}
              >
                <span className="relative z-10">Benefícios</span>
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-300 ${activeSection === 'beneficios' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                <span className={`absolute inset-0 rounded-lg transition-all duration-300 ${activeSection === 'beneficios' ? 'bg-green-500/20' : 'bg-green-500/0 group-hover:bg-green-500/10'}`}></span>
              </a>
              <a
                href="#depoimentos"
                className={`relative group py-2 px-2 transition-colors duration-300 ${activeSection === 'depoimentos' ? 'text-green-400' : ''}`}
              >
                <span className="relative z-10">Depoimentos</span>
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-300 ${activeSection === 'depoimentos' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                <span className={`absolute inset-0 rounded-lg transition-all duration-300 ${activeSection === 'depoimentos' ? 'bg-green-500/20' : 'bg-green-500/0 group-hover:bg-green-500/10'}`}></span>
              </a>
              <a
                href="#como-tomar"
                className={`relative group py-2 px-2 transition-colors duration-300 ${activeSection === 'como-tomar' ? 'text-green-400' : ''}`}
              >
                <span className="relative z-10">Como tomar</span>
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-300 ${activeSection === 'como-tomar' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                <span className={`absolute inset-0 rounded-lg transition-all duration-300 ${activeSection === 'como-tomar' ? 'bg-green-500/20' : 'bg-green-500/0 group-hover:bg-green-500/10'}`}></span>
              </a>
              <a
                href="#comprar"
                className={`relative group py-2 px-2 transition-colors duration-300 ${activeSection === 'comprar' ? 'text-green-400' : ''}`}
              >
                <span className="relative z-10 whitespace-nowrap">Adquira o seu</span>
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-300 ${activeSection === 'comprar' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                <span className={`absolute inset-0 rounded-lg transition-all duration-300 ${activeSection === 'comprar' ? 'bg-green-500/20' : 'bg-green-500/0 group-hover:bg-green-500/10'}`}></span>
              </a>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Bar - Modern Green Theme with Ripple Effect */}
        <nav className="mobile-menu-ripple md:hidden flex items-center justify-around px-4 py-2" style={{background: 'linear-gradient(to top, #0a0a0a 0%, #1a1a1a 100%)'}}>
          <a
            href="#home"
            className={`menu-item flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
              activeSection === 'home' ? 'scale-110 active' : 'scale-100'
            }`}
            style={{transformOrigin: 'bottom center'}}
          >
            <div className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-full transition-all duration-300 ${
              activeSection === 'home'
                ? 'bg-gradient-to-r from-green-500 to-emerald-400 shadow-lg shadow-green-500/50 scale-110'
                : 'bg-transparent'
            }`}>
              <svg className={`transition-all duration-300 ${activeSection === 'home' ? 'w-6 h-6' : 'w-5 h-5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className={`text-[9px] font-bold transition-all duration-300 ${
                activeSection === 'home' ? 'opacity-100 text-white' : 'opacity-60 text-gray-400'
              }`}>Home</span>
            </div>
          </a>

          <a
            href="#beneficios"
            className={`menu-item flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
              activeSection === 'beneficios' ? 'scale-110 active' : 'scale-100'
            }`}
            style={{transformOrigin: 'bottom center'}}
          >
            <div className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-full transition-all duration-300 ${
              activeSection === 'beneficios'
                ? 'bg-gradient-to-r from-green-500 to-emerald-400 shadow-lg shadow-green-500/50 scale-110'
                : 'bg-transparent'
            }`}>
              <Sparkles className={`transition-all duration-300 ${activeSection === 'beneficios' ? 'w-6 h-6' : 'w-5 h-5'}`} />
              <span className={`text-[9px] font-bold transition-all duration-300 ${
                activeSection === 'beneficios' ? 'opacity-100 text-white' : 'opacity-60 text-gray-400'
              }`}>Benefícios</span>
            </div>
          </a>

          <a
            href="#depoimentos"
            className={`menu-item flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
              activeSection === 'depoimentos' ? 'scale-110 active' : 'scale-100'
            }`}
            style={{transformOrigin: 'bottom center'}}
          >
            <div className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-full transition-all duration-300 ${
              activeSection === 'depoimentos'
                ? 'bg-gradient-to-r from-green-500 to-emerald-400 shadow-lg shadow-green-500/50 scale-110'
                : 'bg-transparent'
            }`}>
              <Star className={`transition-all duration-300 ${activeSection === 'depoimentos' ? 'w-6 h-6' : 'w-5 h-5'}`} />
              <span className={`text-[9px] font-bold transition-all duration-300 ${
                activeSection === 'depoimentos' ? 'opacity-100 text-white' : 'opacity-60 text-gray-400'
              }`}>Avaliações</span>
            </div>
          </a>

          <a
            href="#como-tomar"
            className={`menu-item flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
              activeSection === 'como-tomar' ? 'scale-110 active' : 'scale-100'
            }`}
            style={{transformOrigin: 'bottom center'}}
          >
            <div className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-full transition-all duration-300 ${
              activeSection === 'como-tomar'
                ? 'bg-gradient-to-r from-green-500 to-emerald-400 shadow-lg shadow-green-500/50 scale-110'
                : 'bg-transparent'
            }`}>
              <Clock className={`transition-all duration-300 ${activeSection === 'como-tomar' ? 'w-6 h-6' : 'w-5 h-5'}`} />
              <span className={`text-[9px] font-bold transition-all duration-300 ${
                activeSection === 'como-tomar' ? 'opacity-100 text-white' : 'opacity-60 text-gray-400'
              }`}>Como Usar</span>
            </div>
          </a>

          <a
            href="#comprar"
            className={`menu-item flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
              activeSection === 'comprar' ? 'scale-110 active' : 'scale-100'
            }`}
            style={{transformOrigin: 'bottom center'}}
          >
            <div className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-full transition-all duration-300 ${
              activeSection === 'comprar'
                ? 'bg-gradient-to-r from-green-500 to-emerald-400 shadow-lg shadow-green-500/50 scale-110'
                : 'bg-transparent'
            }`}>
              <ShoppingBag className={`transition-all duration-300 ${activeSection === 'comprar' ? 'w-6 h-6' : 'w-5 h-5'}`} />
              <span className={`text-[9px] font-bold transition-all duration-300 ${
                activeSection === 'comprar' ? 'opacity-100 text-white' : 'opacity-60 text-gray-400'
              }`}>Comprar</span>
            </div>
          </a>
        </nav>

        {/* Chat de IA - Desabilitado temporariamente */}
        {/* <div className="md:hidden">
          <AIAssistant bottomPosition="5.5rem" rightPosition="1rem" />
        </div>

        <div className="hidden md:block">
          <AIAssistant bottomPosition="1rem" rightPosition="1rem" />
        </div> */}
      </header>

      {/* Hero Section com Imagem de Fundo - Landing Page de Alta Conversão */}
      <section id="home" className="relative min-h-screen md:min-h-[60vh] flex items-center overflow-hidden py-8 md:py-12 pt-12 md:pt-8">
        {/* Background Image com Overlay Verde Vivo - ÚNICA IMAGEM */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat opacity-90 mix-blend-hard-light"
            style={{
              backgroundImage: "url('/bg_img.webp')",
              backgroundPosition: 'right 20% center'
            }}
          ></div>
          <style jsx>{`
            @media (min-width: 768px) {
              div[style*="background-position"] {
                background-position: center !important;
              }
            }
          `}</style>
          {/* Gradiente forte da esquerda (texto) para direita (imagem visível) - Menos intenso no mobile */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00d900]/80 md:from-[#00d900]/95 via-[#00d900]/40 md:via-[#00d900]/60 via-30% to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00ff00]/20 md:from-[#00ff00]/30 via-[#00ff00]/10 md:via-[#00ff00]/15 via-30% to-transparent"></div>
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
            src="/fita-esquerda2.webp"
            alt="Fita Métrica"
            className="w-auto h-[500px] xl:h-[600px] object-contain opacity-90"
            loading="lazy"
            decoding="async"
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
            src="/fita-esquerda.webp"
            alt="Fita Métrica"
            className="w-auto h-[400px] xl:h-[500px] object-contain opacity-90"
            loading="lazy"
            decoding="async"
            style={{
              transform: 'rotate(15deg) translateX(10%)',
              transformOrigin: 'bottom right',
              filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.3))'
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Container com texto e pote sobrepostos - Mobile */}
            <div className="lg:hidden relative min-h-[550px] flex flex-col justify-center">
              {/* Pote posicionado à direita com sobreposição */}
              <div className={`absolute -right-12 top-6 w-[85%] max-w-lg h-full flex items-center justify-end ${!isLoading ? 'animate-enter-product' : 'opacity-0'}`} style={{zIndex: 1}}>
                <div className="relative w-full h-[550px] flex items-center justify-center">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-600 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>

                  {/* Produto Animado */}
                  <div className="relative z-10 w-full">
                    <img
                      src="/encapsulado_transparente.webp"
                      alt="Full Power - Encapsulado Natural"
                      className="w-full h-auto drop-shadow-2xl animate-float-product"
                      fetchpriority="high"
                      decoding="async"
                      style={{
                        filter: 'drop-shadow(0 20px 40px rgba(34, 197, 94, 0.4))'
                      }}
                    />

                    {/* Badges Flutuantes Mobile */}
                    <div className="absolute top-16 right-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-3 shadow-xl animate-float-badge-1 border-2 border-white/20">
                      <div className="text-center">
                        <div className="text-2xl font-black text-white">-8kg</div>
                        <div className="text-xs text-white/90 font-semibold">30 dias</div>
                      </div>
                    </div>

                    <div className="hidden absolute bottom-20 left-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl p-3 shadow-xl animate-float-badge-2 border-2 border-white/20">
                      <div className="text-center">
                        <div className="text-2xl font-black text-white">100%</div>
                        <div className="text-xs text-white/90 font-semibold">Natural</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Texto sobreposto ao pote */}
              <div className="relative text-white space-y-4 sm:space-y-5 -mt-16" style={{zIndex: 10}}>
                {/* Título Principal com Animação */}
                <div className="space-y-0" key={`title-${currentSlide}`}>
                  <h1 className="text-8xl sm:text-9xl md:text-6xl font-black leading-[0.85] tracking-tight">
                    <span className={`block text-[#F2F2F2] uppercase barlow-font ${!isLoading ? 'animate-enter-title-1' : 'opacity-0'}`} style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
                      {slides[currentSlide].title1}
                    </span>
                    {slides[currentSlide].title1b && (
                      <span className={`block text-[#F2F2F2] uppercase barlow-font ${!isLoading ? 'animate-enter-title-1' : 'opacity-0'}`} style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
                        {slides[currentSlide].title1b}
                      </span>
                    )}
                    <span className={`block text-[#F2F2F2] uppercase barlow-font ${!isLoading ? 'animate-enter-title-2' : 'opacity-0'}`} style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
                      {slides[currentSlide].title2}
                    </span>
                    {slides[currentSlide].title3 && (
                      <span className={`block text-[#F2F2F2] uppercase barlow-font ${!isLoading ? 'animate-enter-title-2' : 'opacity-0'}`} style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
                        {slides[currentSlide].title3}
                      </span>
                    )}
                  </h1>
                </div>

                {/* Subtítulo */}
                <div key={`subtitle-${currentSlide}`} className={`text-3xl sm:text-2xl text-center text-[#F2F2F2] leading-tight max-w-sm barlow-thin-italic-font ${!isLoading ? 'animate-enter-subtitle' : 'opacity-0'}`}>
                  {currentSlide === 0 ? (
                    <>
                      <p className="block">O <span className="barlow-bold-italic-font">composto revolucionário</span></p>
                      <p className="block">que <span className="barlow-bold-italic-font">acelera seu metabolismo</span></p>
                      <p className="block">e <span className="barlow-bold-italic-font">elimina gorduras</span> de forma natural e definitiva</p>
                    </>
                  ) : (
                    slides[currentSlide].subtitle.map((line, i) => (
                      <p key={i} className="block">{line}</p>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Conteúdo de texto - Desktop */}
            <div className="hidden lg:block text-white space-y-4 sm:space-y-5">
              {/* Título Principal com Animação */}
              <div className="space-y-0" key={`title-desktop-${currentSlide}`}>
                <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight lg:leading-[0.9] tracking-tight">
                  <span className={`block text-[#F2F2F2] uppercase barlow-font mb-3 lg:mb-0 ${!isLoading ? 'animate-enter-title-1' : 'opacity-0'}`} style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
                    {slides[currentSlide].title1Desktop || slides[currentSlide].title1}
                  </span>
                  <span className={`block text-[#F2F2F2] uppercase barlow-font ${!isLoading ? 'animate-enter-title-2' : 'opacity-0'}`} style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
                    {slides[currentSlide].title2}{slides[currentSlide].title3 ? ` ${slides[currentSlide].title3}` : ''}
                  </span>
                </h1>
              </div>

              {/* Subtítulo */}
              <div key={`subtitle-desktop-${currentSlide}`} className={`text-lg sm:text-2xl md:text-3xl lg:text-4xl text-[#F2F2F2] leading-tight lg:leading-tight max-w-2xl barlow-thin-italic-font ${!isLoading ? 'animate-enter-subtitle' : 'opacity-0'}`}>
                {currentSlide === 0 ? (
                  <>
                    <p className="block">O <span className="barlow-bold-italic-font">composto revolucionário</span></p>
                    <p className="block">que <span className="barlow-bold-italic-font">acelera seu metabolismo</span></p>
                    <p className="block">e <span className="barlow-bold-italic-font">elimina gorduras</span> de forma natural e definitiva!</p>
                  </>
                ) : (
                  slides[currentSlide].subtitle.map((line, i) => (
                    <p key={i} className="block">{line}</p>
                  ))
                )}
              </div>
            </div>

            {/* Botões e Social Proof - Abaixo do produto no mobile */}
            <div className="lg:hidden text-white space-y-4 -mt-8 relative z-20">

              {/* Botões CTA Otimizados */}
              <div key={`buttons-${currentSlide}`} className="flex flex-col gap-3 sm:gap-4 relative z-20">
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

              {/* Social Proof - Oculto no mobile */}
              <div key={`social-${currentSlide}`} className={`hidden lg:flex flex-wrap items-center gap-4 sm:gap-6 pt-3 sm:pt-6 ${!isLoading ? 'animate-enter-social' : 'opacity-0'}`}>
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

            {/* Product Showcase Desktop - Responsivo com Flutuação */}
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
                      src="/encapsulado_transparente.webp"
                      alt="Full Power - Encapsulado Natural Background"
                      className="w-full h-auto drop-shadow-xl animate-float-product-back"
                      fetchpriority="high"
                      decoding="async"
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
                      src="/encapsulado_transparente.webp"
                      alt="Full Power - Encapsulado Natural"
                      className="w-full h-auto drop-shadow-2xl animate-float-product"
                      fetchpriority="high"
                      decoding="async"
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
                  className="absolute bottom-28 left-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-4 shadow-2xl animate-float-badge-2 border-4 border-white/20 z-20"
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
                  className="absolute top-[58%] right-4 bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl p-3 shadow-2xl animate-float-badge-3 z-20"
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
        <div className="absolute inset-0 pointer-events-none z-20">
          {/* Folha 1 - Topo Esquerda */}
          <div
            className={`absolute top-[1%] md:top-[8%] left-[0%] md:left-[20%] animate-leaf-float-1 leaf-scroll-animate ${leavesVisible ? 'visible' : ''}`}
            style={{
              transform: leavesVisible
                ? `translate(${mousePosition.x * 60}px, ${mousePosition.y * 50}px) rotate(${-12 + mousePosition.x * 5}deg) scale(1)`
                : 'translateY(30px) scale(0.8)',
              transitionDelay: '0.1s'
            }}
          >
            <img
              src="/icon-1.webp"
              alt="Folha decorativa"
              loading="lazy"
              decoding="async"
              className="w-20 h-20 md:w-28 md:h-28 object-contain"
              style={{
                filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.25))'
              }}
            />
          </div>

          {/* Folha 2 - Topo Direita */}
          <div
            className={`absolute top-[2%] md:top-[5%] right-[0%] md:left-[48%] animate-leaf-float-2 leaf-scroll-animate ${leavesVisible ? 'visible' : ''}`}
            style={{
              transform: leavesVisible
                ? `translate(${mousePosition.x * -40}px, ${mousePosition.y * 60}px) rotate(${25 + mousePosition.x * -8}deg) scale(1)`
                : 'translateY(30px) scale(0.8)',
              transitionDelay: '0.2s'
            }}
          >
            <img
              src="/icin2.webp"
              alt="Folha decorativa"
              loading="lazy"
              decoding="async"
              className="w-18 h-18 md:w-24 md:h-24 object-contain"
              style={{
                filter: 'drop-shadow(3px 5px 10px rgba(0,0,0,0.3))'
              }}
            />
          </div>

          {/* Folha 3 - Lateral Esquerda Meio-Alto */}
          <div
            className={`absolute top-[30%] md:top-[12%] left-[0%] md:right-[22%] animate-leaf-float-3 leaf-scroll-animate ${leavesVisible ? 'visible' : ''}`}
            style={{
              transform: leavesVisible
                ? `translate(${mousePosition.x * -70}px, ${mousePosition.y * 45}px) rotate(${78 + mousePosition.x * -10}deg) scale(1)`
                : 'translateY(30px) scale(0.8)',
              transitionDelay: '0.3s'
            }}
          >
            <img
              src="/icin3.webp"
              alt="Folha decorativa"
              loading="lazy"
              decoding="async"
              className="w-22 h-22 md:w-30 md:h-30 object-contain"
              style={{
                filter: 'drop-shadow(2px 3px 6px rgba(0,0,0,0.25))'
              }}
            />
          </div>

          {/* Folha 4 - Lateral Direita Meio-Baixo */}
          <div
            className={`absolute top-[58%] md:top-[28%] right-[0%] md:left-[18%] animate-leaf-float-4 leaf-scroll-animate ${leavesVisible ? 'visible' : ''}`}
            style={{
              transform: leavesVisible
                ? `translate(${mousePosition.x * 50}px, ${mousePosition.y * -55}px) rotate(${-35 + mousePosition.x * 7}deg) scale(1)`
                : 'translateY(30px) scale(0.8)',
              transitionDelay: '0.4s'
            }}
          >
            <img
              src="/icon4.webp"
              alt="Folha decorativa"
              loading="lazy"
              decoding="async"
              className="w-24 h-24 md:w-34 md:h-34 object-contain"
              style={{
                filter: 'drop-shadow(4px 6px 12px rgba(0,0,0,0.3))'
              }}
            />
          </div>

          {/* Folha 5 - Baixo Centro-Esquerda */}
          <div
            className={`absolute bottom-[3%] md:top-[42%] left-[15%] md:left-[25%] animate-leaf-float-5 leaf-scroll-animate ${leavesVisible ? 'visible' : ''}`}
            style={{
              transform: leavesVisible
                ? `translate(${mousePosition.x * 35}px, ${mousePosition.y * 40}px) rotate(${15 + mousePosition.x * 6}deg) scale(1)`
                : 'translateY(30px) scale(0.8)',
              transitionDelay: '0.5s'
            }}
          >
            <img
              src="/icon5.webp"
              alt="Folha decorativa"
              loading="lazy"
              decoding="async"
              className="w-18 h-18 md:w-26 md:h-26 object-contain"
              style={{
                filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.25))'
              }}
            />
          </div>

          {/* Folha 6 - Direita Meio */}
          <div
            className={`hidden md:block absolute top-[35%] right-[20%] animate-leaf-float-6 leaf-scroll-animate ${leavesVisible ? 'visible' : ''}`}
            style={{
              transform: leavesVisible
                ? `translate(${mousePosition.x * -65}px, ${mousePosition.y * -35}px) rotate(${52 + mousePosition.x * -9}deg) scale(1)`
                : 'translateY(30px) scale(0.8)',
              transitionDelay: '0.6s'
            }}
          >
            <img
              src="/icon6.webp"
              alt="Folha decorativa"
              loading="lazy"
              decoding="async"
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
              style={{
                filter: 'drop-shadow(3px 5px 10px rgba(0,0,0,0.3))'
              }}
            />
          </div>

          {/* Folha 7 - Próxima ao Formulário Direita */}
          <div
            className={`hidden md:block absolute top-[48%] right-[26%] animate-leaf-float-7 leaf-scroll-animate ${leavesVisible ? 'visible' : ''}`}
            style={{
              transform: leavesVisible
                ? `translate(${mousePosition.x * -45}px, ${mousePosition.y * 50}px) rotate(${-48 + mousePosition.x * -8}deg) scale(1)`
                : 'translateY(30px) scale(0.8)',
              transitionDelay: '0.7s'
            }}
          >
            <img
              src="/icon-1.webp"
              alt="Folha decorativa"
              loading="lazy"
              decoding="async"
              className="w-20 h-20 md:w-28 md:h-28 object-contain"
              style={{
                filter: 'drop-shadow(2px 4px 9px rgba(0,0,0,0.28))'
              }}
            />
          </div>

          {/* Folha 8 - Centro Baixo do Formulário */}
          <div
            className={`hidden md:block absolute top-[62%] left-[32%] animate-leaf-float-8 leaf-scroll-animate ${leavesVisible ? 'visible' : ''}`}
            style={{
              transform: leavesVisible
                ? `translate(${mousePosition.x * 25}px, ${mousePosition.y * -50}px) rotate(${95 + mousePosition.x * 10}deg) scale(1)`
                : 'translateY(30px) scale(0.8)',
              transitionDelay: '0.8s'
            }}
          >
            <img
              src="/icin2.webp"
              alt="Folha decorativa"
              loading="lazy"
              decoding="async"
              className="w-22 h-22 md:w-30 md:h-30 object-contain"
              style={{
                filter: 'drop-shadow(3px 4px 7px rgba(0,0,0,0.27))'
              }}
            />
          </div>

          {/* Folha 9 - Baixo Esquerda Centro */}
          <div
            className={`hidden md:block absolute bottom-[8%] left-[28%] animate-leaf-float-9 leaf-scroll-animate ${leavesVisible ? 'visible' : ''}`}
            style={{
              transform: leavesVisible
                ? `translate(${mousePosition.x * 55}px, ${mousePosition.y * -60}px) rotate(${-65 + mousePosition.x * 12}deg) scale(1)`
                : 'translateY(30px) scale(0.8)',
              transitionDelay: '0.9s'
            }}
          >
            <img
              src="/icin3.webp"
              alt="Folha decorativa"
              loading="lazy"
              decoding="async"
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
              style={{
                filter: 'drop-shadow(2px 5px 8px rgba(0,0,0,0.26))'
              }}
            />
          </div>

          {/* Folha 10 - Baixo Direita Centro */}
          <div
            className={`hidden md:block absolute bottom-[12%] right-[30%] animate-leaf-float-10 leaf-scroll-animate ${leavesVisible ? 'visible' : ''}`}
            style={{
              transform: leavesVisible
                ? `translate(${mousePosition.x * -50}px, ${mousePosition.y * -45}px) rotate(${42 + mousePosition.x * -11}deg) scale(1)`
                : 'translateY(30px) scale(0.8)',
              transitionDelay: '1s'
            }}
          >
            <img
              src="/icon4.webp"
              alt="Folha decorativa"
              loading="lazy"
              decoding="async"
              className="w-26 h-26 md:w-34 md:h-34 object-contain"
              style={{
                filter: 'drop-shadow(3px 5px 10px rgba(0,0,0,0.3))'
              }}
            />
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-4 relative z-10">
          <div className={`max-w-md md:max-w-lg mx-auto bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 md:p-8 shadow-2xl relative scroll-scale-in ${leavesVisible ? 'visible' : ''}`}>

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
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            {/* Header - Badge e Título */}
            <div className="w-full md:w-auto flex flex-col items-center md:items-start order-1 md:order-none">
              <div className={`inline-block bg-green-700 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold mb-3 md:mb-6 scroll-fade-in ${proofsVisible ? 'visible' : ''}`}>
                RESULTADOS REAIS
              </div>
              <h2 className={`text-7xl md:text-5xl font-black mb-3 md:mb-6 text-center md:text-left scroll-fade-in ${proofsVisible ? 'visible' : ''}`} style={{transitionDelay: '0.1s'}}>
                Provas<br className="md:hidden" /> Sociais
              </h2>

              {/* Textos descritivos - Mobile Only */}
              <div className="md:hidden w-full space-y-3 mb-6">
                <p className={`text-lg text-gray-700 text-center leading-relaxed scroll-fade-in ${proofsVisible ? 'visible' : ''}`} style={{transitionDelay: '0.2s'}}>
                  Milhares de pessoas já transformaram suas vidas com o Full Power. Veja os resultados impressionantes de quem já experimentou!
                </p>
                <p className={`text-lg text-gray-700 text-center leading-relaxed scroll-fade-in ${proofsVisible ? 'visible' : ''}`} style={{transitionDelay: '0.3s'}}>
                  Resultados reais de clientes reais. Cada foto representa uma jornada de transformação autêntica e duradoura.
                </p>
              </div>

              {/* Textos descritivos - Desktop Only */}
              <p className={`hidden md:block text-sm md:text-lg text-gray-700 mb-3 md:mb-6 leading-relaxed scroll-fade-in ${proofsVisible ? 'visible' : ''}`} style={{transitionDelay: '0.2s'}}>
                Milhares de pessoas já transformaram suas vidas com o Full Power. Veja os resultados impressionantes de quem já experimentou!
              </p>
              <p className={`hidden md:block text-sm md:text-lg text-gray-700 mb-3 md:mb-6 leading-relaxed scroll-fade-in ${proofsVisible ? 'visible' : ''}`} style={{transitionDelay: '0.3s'}}>
                Resultados reais de clientes reais. Cada foto representa uma jornada de transformação autêntica e duradoura.
              </p>
              <div className="hidden md:block space-y-2 md:space-y-4">
                <div className={`flex items-start gap-2 md:gap-3 scroll-fade-in ${proofsVisible ? 'visible' : ''}`} style={{transitionDelay: '0.4s'}}>
                  <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-green-700 flex-shrink-0 mt-0.5 md:mt-1" />
                  <p className="text-xs md:text-base text-gray-700">Transformações verificadas e documentadas</p>
                </div>
                <div className={`flex items-start gap-2 md:gap-3 scroll-fade-in ${proofsVisible ? 'visible' : ''}`} style={{transitionDelay: '0.5s'}}>
                  <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-green-700 flex-shrink-0 mt-0.5 md:mt-1" />
                  <p className="text-xs md:text-base text-gray-700">Antes e depois de pessoas reais</p>
                </div>
                <div className={`flex items-start gap-2 md:gap-3 scroll-fade-in ${proofsVisible ? 'visible' : ''}`} style={{transitionDelay: '0.6s'}}>
                  <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-green-700 flex-shrink-0 mt-0.5 md:mt-1" />
                  <p className="text-xs md:text-base text-gray-700">Resultados em semanas, não anos</p>
                </div>
                <div className={`flex items-start gap-2 md:gap-3 scroll-fade-in ${proofsVisible ? 'visible' : ''}`} style={{transitionDelay: '0.7s'}}>
                  <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-green-700 flex-shrink-0 mt-0.5 md:mt-1" />
                  <p className="text-xs md:text-base text-gray-700">Mudanças sustentáveis e saudáveis</p>
                </div>
              </div>
              <a
                href="#comprar"
                className={`hidden md:inline-flex mt-6 md:mt-6 w-full md:w-auto group relative items-center justify-center px-4 md:px-10 py-2.5 md:py-4 text-xs md:text-base font-black rounded-full overflow-hidden transition-all duration-500 transform hover:scale-105 scroll-fade-in ${proofsVisible ? 'visible' : ''}`}
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

                <span className="relative flex items-center gap-3 text-white drop-shadow-2xl tracking-wide whitespace-nowrap">
                  QUERO MEU RESULTADO!
                  <span className="group-hover:translate-x-2 transition-transform duration-300 text-xl">→</span>
                </span>
              </a>
            </div>

            {/* Instagram Stories Carousel */}
            <div className={`w-full md:w-auto relative flex justify-center items-center order-2 md:order-none scroll-scale-in ${proofsVisible ? 'visible' : ''}`} style={{transitionDelay: '0.3s'}}>
              {/* Seta Esquerda - Mobile Only */}
              <button
                onClick={() => setCurrentProof((prev) => (prev - 1 + provasSociais.length) % provasSociais.length)}
                className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Story anterior"
              >
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Mockup de Celular */}
              <div className="relative w-full max-w-[200px] md:max-w-[320px] h-auto aspect-[9/19] md:h-[650px] md:aspect-auto bg-black rounded-[50px] p-3 shadow-2xl">
                {/* Notch do iPhone */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 md:w-40 h-6 md:h-7 bg-black rounded-b-3xl z-20"></div>

                {/* Tela do Celular */}
                <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden">
                  {/* Stories Container - Fundo gradiente Instagram */}
                  <div className="relative w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
                    {/* Header do Instagram */}
                    <div className="absolute top-3 left-0 right-0 flex items-center gap-2 px-4 z-10">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-500 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                        FP
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-sm drop-shadow-lg">fullpower.oficial</p>
                        <p className="text-white/90 text-xs drop-shadow-lg">{provasSociais[currentProof]?.usuario || '@transformacao'}</p>
                      </div>
                    </div>

                    {/* Barra de Progresso do Stories */}
                    <div className="absolute top-16 left-0 right-0 flex gap-1 px-3 z-10">
                      {provasSociais.map((_, idx) => (
                        <div key={idx} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-white transition-all duration-300 ${idx === currentProof ? 'w-full' : idx < currentProof ? 'w-full' : 'w-0'}`}
                          ></div>
                        </div>
                      ))}
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
                                loading="lazy"
                                decoding="async"
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

              {/* Seta Direita - Mobile Only */}
              <button
                onClick={() => setCurrentProof((prev) => (prev + 1) % provasSociais.length)}
                className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Próximo story"
              >
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Checkmarks e Botão - Mobile Only */}
            <div className="w-full md:hidden flex flex-col items-center order-3">
              <div className="space-y-2 w-full flex flex-col items-center">
                <div className={`flex items-center justify-center gap-2 scroll-fade-in ${proofsVisible ? 'visible' : ''}`} style={{transitionDelay: '0.4s'}}>
                  <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0" />
                  <p className="text-xs text-gray-700">Transformações verificadas e documentadas</p>
                </div>
                <div className={`flex items-center justify-center gap-2 scroll-fade-in ${proofsVisible ? 'visible' : ''}`} style={{transitionDelay: '0.5s'}}>
                  <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0" />
                  <p className="text-xs text-gray-700">Antes e depois de pessoas reais</p>
                </div>
                <div className={`flex items-center justify-center gap-2 scroll-fade-in ${proofsVisible ? 'visible' : ''}`} style={{transitionDelay: '0.6s'}}>
                  <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0" />
                  <p className="text-xs text-gray-700">Resultados em semanas, não anos</p>
                </div>
                <div className={`flex items-center justify-center gap-2 scroll-fade-in ${proofsVisible ? 'visible' : ''}`} style={{transitionDelay: '0.7s'}}>
                  <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0" />
                  <p className="text-xs text-gray-700">Mudanças sustentáveis e saudáveis</p>
                </div>
              </div>
              <a
                href="#comprar"
                className={`mt-6 w-full group relative inline-flex items-center justify-center px-4 py-2.5 text-xs font-black rounded-full overflow-hidden transition-all duration-500 transform hover:scale-105 scroll-fade-in ${proofsVisible ? 'visible' : ''}`}
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

                <span className="relative flex items-center gap-3 text-white drop-shadow-2xl tracking-wide whitespace-nowrap">
                  QUERO MEU RESULTADO!
                  <span className="group-hover:translate-x-2 transition-transform duration-300 text-xl">→</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Para quem serve */}
      <section data-section="targets" className={`py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white transition-all duration-1000 ${sectionsVisible.targets ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-4xl lg:text-5xl font-black text-center mb-3 md:mb-4 text-gray-900">
            Para quem serve o<br/>
            <span className="bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">Full Power?</span>
          </h2>
          <p className="text-center text-gray-500 mb-8 md:mb-16 max-w-2xl mx-auto text-base md:text-lg px-4">
            O Full Power foi desenvolvido especialmente para mulheres que desejam emagrecer de forma natural e saudável
          </p>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              { Icon: Users, text: "Mulheres de 25 a 65 anos que querem emagrecer" },
              { Icon: Zap, text: "Quem deseja eliminar gordura localizada" },
              { Icon: Target, text: "Pessoas que querem controlar a ansiedade" },
              { Icon: Sparkles, text: "Quem busca mais energia e disposição" },
              { Icon: Leaf, text: "Quem prefere produtos 100% naturais" },
              { Icon: Heart, text: "Mulheres que querem melhorar a autoestima" },
              { Icon: Scale, text: "Quem luta contra o inchaço e retenção" },
              { Icon: Flame, text: "Pessoas que desejam acelerar o metabolismo" }
            ].map((item, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-2xl p-8 text-center hover:shadow-2xl hover:shadow-green-100/50 transition-all duration-500 border border-gray-100 hover:border-green-200 hover:-translate-y-2"
              >
                {/* Brilho sutil no hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>

                {/* Conteúdo */}
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-green-50 group-hover:to-emerald-50 transition-all duration-500 border border-gray-200 group-hover:border-green-300">
                    <item.Icon className="w-8 h-8 text-gray-600 group-hover:text-green-700 transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed">{item.text}</p>
                </div>

                {/* Linha decorativa inferior */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-green-700 to-emerald-600 group-hover:w-3/4 transition-all duration-500 rounded-full"></div>
              </div>
            ))}
          </div>

          {/* Mobile: Carrossel */}
          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out touch-pan-y"
                style={{ transform: `translateX(-${currentTarget * 100}%)` }}
                onTouchStart={(e) => {
                  const touchStartX = e.touches[0].clientX;
                  e.currentTarget.setAttribute('data-touch-start', touchStartX);
                }}
                onTouchEnd={(e) => {
                  const touchStartX = parseFloat(e.currentTarget.getAttribute('data-touch-start'));
                  const touchEndX = e.changedTouches[0].clientX;
                  const diff = touchStartX - touchEndX;

                  if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                      // Swipe left - próximo
                      setCurrentTarget((prev) => (prev === 7 ? 0 : prev + 1));
                    } else {
                      // Swipe right - anterior
                      setCurrentTarget((prev) => (prev === 0 ? 7 : prev - 1));
                    }
                  }
                }}
              >
                {[
                  { Icon: Users, text: "Mulheres de 25 a 65 anos que querem emagrecer" },
                  { Icon: Zap, text: "Quem deseja eliminar gordura localizada" },
                  { Icon: Target, text: "Pessoas que querem controlar a ansiedade" },
                  { Icon: Sparkles, text: "Quem busca mais energia e disposição" },
                  { Icon: Leaf, text: "Quem prefere produtos 100% naturais" },
                  { Icon: Heart, text: "Mulheres que querem melhorar a autoestima" },
                  { Icon: Scale, text: "Quem luta contra o inchaço e retenção" },
                  { Icon: Flame, text: "Pessoas que desejam acelerar o metabolismo" }
                ].map((item, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-3xl p-8 text-center shadow-xl border-2 border-gray-100 min-h-[280px] flex flex-col justify-center">
                      {/* Ícone */}
                      <div className="inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                        <item.Icon className="w-10 h-10 text-green-700" strokeWidth={1.5} />
                      </div>

                      {/* Texto */}
                      <p className="text-gray-700 font-semibold leading-relaxed text-lg">{item.text}</p>

                      {/* Linha decorativa */}
                      <div className="w-16 h-1 bg-gradient-to-r from-green-700 to-emerald-600 rounded-full mx-auto mt-6"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Indicadores */}
            <div className="flex justify-center gap-2 mt-6">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTarget(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentTarget
                      ? 'w-8 bg-gradient-to-r from-green-700 to-emerald-600'
                      : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Ir para item ${i + 1}`}
                />
              ))}
            </div>

            {/* Botões de navegação */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setCurrentTarget((prev) => (prev === 0 ? 7 : prev - 1))}
                className="bg-white text-green-700 p-3 rounded-full shadow-lg border-2 border-green-200 active:scale-95 transition-transform"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentTarget((prev) => (prev === 7 ? 0 : prev + 1))}
                className="bg-white text-green-700 p-3 rounded-full shadow-lg border-2 border-green-200 active:scale-95 transition-transform"
                aria-label="Próximo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
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
                QUERO COMEÇAR AGORA!
                <span className="group-hover:translate-x-2 transition-transform duration-300 text-xl">→</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Benefícios com Fundo Igual Primeira Dobra */}
      <section data-section="benefits" id="beneficios" className={`py-20 text-white relative overflow-hidden transition-all duration-1000 ${sectionsVisible.benefits ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Background Image com Overlay Verde Vivo - Igual Primeira Dobra */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90 mix-blend-hard-light"
            style={{backgroundImage: "url('/bg_img.webp')", backgroundAttachment: 'fixed'}}
          ></div>
          {/* Gradiente forte da esquerda (texto) para direita (imagem visível) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00d900]/95 via-[#00d900]/60 via-30% to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00ff00]/30 via-[#00ff00]/15 via-30% to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#00d900]/10 via-transparent to-[#00d900]/20"></div>
          {/* Gradiente escuro de baixo para cima */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

          {/* Textura de Folhas Tropicais */}
          <TropicalLeavesPattern mobileInverted={true} />
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

      {/* Como tomar */}
      <section data-section="howToUse" id="como-tomar" className={`py-12 md:py-20 bg-gradient-to-b from-white to-gray-50 transition-all duration-1000 ${sectionsVisible.howToUse ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-4xl lg:text-5xl font-black text-center mb-3 md:mb-4 text-gray-900">
            E como eu tomo o<br/>
            <span className="bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">Full Power?</span>
          </h2>
          <p className="text-center text-gray-500 mb-8 md:mb-16 max-w-2xl mx-auto text-base md:text-lg px-4">
            O uso do Full Power é super simples e prático. Basta seguir as orientações abaixo para obter os melhores resultados
          </p>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start max-w-6xl mx-auto">
            {/* Cards à esquerda - Clicáveis */}
            <div className="space-y-4">
              {[
                {
                  number: 1,
                  title: "Tome 1 cápsula por dia",
                  detail: "Tome sempre após o café da manhã reforçado. O momento ideal é logo após a refeição matinal, garantindo melhor absorção dos nutrientes. Não é necessário tomar em jejum."
                },
                {
                  number: 2,
                  title: "Beba no mínimo 2 litros de água",
                  detail: "A hidratação adequada potencializa os efeitos do Full Power, ajudando na eliminação de toxinas e no funcionamento do metabolismo. Distribua o consumo ao longo do dia."
                },
                {
                  number: 3,
                  title: "Evite bebidas alcoólicas",
                  detail: "Durante o uso do Full Power, evite o consumo de bebidas alcoólicas. O álcool pode interferir na ação dos ingredientes naturais e reduzir a eficácia do tratamento."
                },
                {
                  number: 4,
                  title: "Reponha potássio",
                  detail: "Água de coco, isotônicos ou Gatorade são ótimas opções para repor potássio. Isso ajuda a manter o equilíbrio de eletrólitos e evita cãibras durante o processo de emagrecimento."
                }
              ].map((step, index) => (
                <div key={index}>
                  <button
                    onClick={() => setSelectedStep(selectedStep === index ? -1 : index)}
                    className={`w-full text-left transition-all duration-500 ${
                      selectedStep === index
                        ? 'scale-105'
                        : 'hover:scale-102'
                    }`}
                  >
                    <div className={`flex items-start gap-4 bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-500 ${
                      selectedStep === index
                        ? 'border-green-600 shadow-green-100 shadow-xl'
                        : 'border-gray-100 hover:border-green-200 hover:shadow-xl'
                    }`}>
                      <div className={`rounded-2xl w-14 h-14 flex items-center justify-center font-black text-2xl flex-shrink-0 transition-all duration-500 ${
                        selectedStep === index
                          ? 'bg-gradient-to-br from-green-700 to-emerald-600 text-white scale-110'
                          : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600'
                      }`}>
                        {step.number}
                      </div>
                      <div className="flex-1 pt-2">
                        <h3 className={`font-bold text-lg transition-colors duration-500 ${
                          selectedStep === index ? 'text-green-700' : 'text-gray-800'
                        }`}>
                          {step.title}
                        </h3>
                      </div>
                      <div className={`mt-4 transition-all duration-500 ${
                        selectedStep === index ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'
                      }`}>
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      </div>
                    </div>
                  </button>

                  {/* Card de detalhes no mobile - aparece logo abaixo do botão clicado */}
                  <div className={`md:hidden mt-4 overflow-hidden transition-all duration-500 ${
                    selectedStep === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-100">
                      <div className="mb-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-700 to-emerald-600 text-white text-3xl font-black mb-4">
                          {step.number}
                        </div>
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 mb-4">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-base leading-relaxed mb-4">
                        {step.detail}
                      </p>
                      <div className="flex items-center gap-3 text-green-700 font-semibold">
                        <CheckCircle className="w-5 h-5" />
                        <span>Passo {step.number} de 4</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Painel à direita - Informações detalhadas - Oculto no mobile */}
            <div className="hidden md:flex relative h-full min-h-[500px] items-center">
              <div className="w-full">
                <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 overflow-hidden">
                  {/* Background decorativo */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full blur-3xl opacity-30"></div>

                  <div className="relative z-10">
                    {/* Número grande decorativo */}
                    <div className="absolute -top-4 -right-4 text-9xl font-black text-gray-100 select-none">
                      {[1, 2, 3, 4][selectedStep]}
                    </div>

                    {/* Conteúdo que muda com animação */}
                    <div className="relative">
                      <div className="mb-6">
                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-green-700 to-emerald-600 text-white text-4xl font-black mb-6 transform transition-all duration-700 ${
                          selectedStep >= 0 ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                        }`}>
                          {[1, 2, 3, 4][selectedStep]}
                        </div>
                      </div>

                      <h3 className={`text-3xl font-black text-gray-900 mb-6 transition-all duration-700 transform ${
                        selectedStep >= 0 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}>
                        {[
                          "Tome 1 cápsula por dia",
                          "Beba no mínimo 2 litros de água",
                          "Evite bebidas alcoólicas",
                          "Reponha potássio"
                        ][selectedStep]}
                      </h3>

                      <p className={`text-gray-600 text-lg leading-relaxed mb-8 transition-all duration-700 delay-100 transform ${
                        selectedStep >= 0 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}>
                        {[
                          "Tome sempre após o café da manhã reforçado. O momento ideal é logo após a refeição matinal, garantindo melhor absorção dos nutrientes. Não é necessário tomar em jejum.",
                          "A hidratação adequada potencializa os efeitos do Full Power, ajudando na eliminação de toxinas e no funcionamento do metabolismo. Distribua o consumo ao longo do dia.",
                          "Durante o uso do Full Power, evite o consumo de bebidas alcoólicas. O álcool pode interferir na ação dos ingredientes naturais e reduzir a eficácia do tratamento.",
                          "Água de coco, isotônicos ou Gatorade são ótimas opções para repor potássio. Isso ajuda a manter o equilíbrio de eletrólitos e evita cãibras durante o processo de emagrecimento."
                        ][selectedStep]}
                      </p>

                      {/* Indicador visual */}
                      <div className={`flex items-center gap-3 text-green-700 font-semibold transition-all duration-700 delay-200 transform ${
                        selectedStep >= 0 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}>
                        <CheckCircle className="w-6 h-6" />
                        <span>Passo {[1, 2, 3, 4][selectedStep]} de 4</span>
                      </div>
                    </div>
                  </div>
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

      {/* Depoimentos em Vídeo - Carrossel */}
      <section data-section="testimonials" id="depoimentos" className={`py-20 bg-gradient-to-b from-white to-gray-50 transition-all duration-1000 ${sectionsVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-5xl font-black text-center mb-4 text-gray-900">
            Veja depoimentos<br/>
            <span className="bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">reais em vídeo!</span>
          </h2>
          <p className="text-center text-gray-500 mb-16 text-lg">Resultados autênticos de clientes satisfeitos</p>

          {/* Carrossel de Vídeos - Mobile / Grid - Desktop */}
          <div className="max-w-7xl mx-auto relative">
            {/* Setas de Navegação - Mobile Only */}
            <button
              onClick={() => setCurrentVideo((prev) => (prev === 0 ? videoTestimonials.length - 1 : prev - 1))}
              className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-green-700 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Vídeo anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => setCurrentVideo((prev) => (prev === videoTestimonials.length - 1 ? 0 : prev + 1))}
              className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-green-700 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Próximo vídeo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Container Mobile: Carrossel com Overflow */}
            <div className="lg:hidden overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentVideo * 100}%)`
                }}
                onTouchStart={(e) => {
                  const touchStartX = e.touches[0].clientX;
                  e.currentTarget.setAttribute('data-touch-start', touchStartX);
                }}
                onTouchEnd={(e) => {
                  const touchStartX = parseFloat(e.currentTarget.getAttribute('data-touch-start'));
                  const touchEndX = e.changedTouches[0].clientX;
                  const diff = touchStartX - touchEndX;

                  if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                      // Swipe left - próximo
                      setCurrentVideo((prev) => (prev === videoTestimonials.length - 1 ? 0 : prev + 1));
                    } else {
                      // Swipe right - anterior
                      setCurrentVideo((prev) => (prev === 0 ? videoTestimonials.length - 1 : prev - 1));
                    }
                  }
                }}
              >
                {videoTestimonials.map((testimonial, i) => (
                  <div
                    key={i}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100 transition-all duration-500"
                    >
                  {/* Card Quadrado com Vídeo - MOBILE */}
                  <div className="aspect-square relative bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                    {/* Vídeo */}
                    <video
                      ref={(el) => (videoRefs.current[i] = el)}
                      controls
                      controlsList="nodownload"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: 'center' }}
                      preload="metadata"
                      playsInline
                    >
                      <source src={`/videos/${testimonial.video}`} type="video/mp4" />
                      <source src={`/videos/${testimonial.video.replace('.mp4', '.webm')}`} type="video/webm" />
                    </video>

                    {/* Badge de Resultado sobreposto */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-700 to-emerald-600 text-white text-xs md:text-sm font-black px-3 py-1.5 rounded-full shadow-lg">
                        <Zap className="w-3 h-3 md:w-4 md:h-4" />
                        {testimonial.result}
                      </div>
                    </div>

                    {/* Selo de verificado */}
                    <div className="absolute top-4 right-4 z-10 bg-white/90 p-2 rounded-full">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-700" />
                    </div>
                  </div>

                  {/* Info do Cliente */}
                  <div className="p-4 md:p-5 bg-white">
                    <div className="flex items-center gap-3">
                      {/* Avatar com iniciais */}
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-green-700 to-emerald-600 flex items-center justify-center text-white font-bold text-sm md:text-base flex-shrink-0">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-base md:text-lg">{testimonial.name}</h3>
                        <div className="flex gap-1 mt-1">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
                ))}
              </div>
            </div>

            {/* Container Desktop: Grid 3 Colunas */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6 md:gap-8">
              {videoTestimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border-2 border-gray-100 hover:border-green-200 transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Card Quadrado com Vídeo - DESKTOP */}
                  <div className="aspect-square relative bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                    {/* Vídeo */}
                    <video
                      ref={(el) => (videoRefs.current[videoTestimonials.length + i] = el)}
                      controls
                      controlsList="nodownload"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: 'center' }}
                      preload="metadata"
                      playsInline
                      onPlay={() => handleVideoPlay(videoTestimonials.length + i)}
                    >
                      <source src={`/videos/${testimonial.video}`} type="video/mp4" />
                      <source src={`/videos/${testimonial.video.replace('.mp4', '.webm')}`} type="video/webm" />
                    </video>

                    {/* Badge de Resultado sobreposto */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-700 to-emerald-600 text-white text-xs md:text-sm font-black px-3 py-1.5 rounded-full shadow-lg">
                        <Zap className="w-3 h-3 md:w-4 md:h-4" />
                        {testimonial.result}
                      </div>
                    </div>

                    {/* Selo de verificado */}
                    <div className="absolute top-4 right-4 z-10 bg-white/90 p-2 rounded-full">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-700" />
                    </div>
                  </div>

                  {/* Info do Cliente */}
                  <div className="p-4 md:p-5 bg-white">
                    <div className="flex items-center gap-3">
                      {/* Avatar com iniciais */}
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-green-700 to-emerald-600 flex items-center justify-center text-white font-bold text-sm md:text-base flex-shrink-0">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-base md:text-lg">{testimonial.name}</h3>
                        <div className="flex gap-1 mt-1">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Indicadores - Mobile Only */}
            <div className="lg:hidden flex justify-center gap-2 mt-6">
              {videoTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentVideo(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentVideo
                      ? 'w-8 bg-gradient-to-r from-green-700 to-emerald-600'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir para vídeo ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* CTA após os vídeos */}
          <div className="text-center mt-12">
            <a
              href="#comprar"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-700 via-emerald-600 to-green-700 text-white px-8 md:px-12 py-4 md:py-5 text-base md:text-lg font-black rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              QUERO MEUS RESULTADOS TAMBÉM
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Final - Preços com Carrossel 3D */}
      <section data-section="pricing" id="comprar" className={`py-12 text-white relative overflow-hidden transition-all duration-1000 ${sectionsVisible.pricing ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Background Image com Overlay Verde Vivo - Igual Primeira Dobra */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90 mix-blend-hard-light"
            style={{backgroundImage: "url('/bg_img.webp')", backgroundAttachment: 'fixed'}}
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
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Adquira já o seu!
            </h2>
            <p className="text-lg mb-4 opacity-90">
              Transforme seu corpo com o Full Power. Oferta especial por tempo limitado!
            </p>
          </div>

          {/* Carrossel 3D de Preços */}
          <div className="relative max-w-6xl mx-auto" style={{ perspective: '2000px' }}>
            {/* Botão Anterior */}
            <button
              onClick={() => setCurrentPricing((prev) => (prev === 0 ? pricingKits.length - 1 : prev - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full shadow-2xl transition-all hover:scale-110 -ml-4 md:-ml-12"
              aria-label="Pacote anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Cards Container */}
            <div
              className="flex items-center justify-center py-8 px-4 md:px-20 cursor-grab active:cursor-grabbing select-none"
              onMouseDown={handlePricingDragStart}
              onMouseMove={handlePricingDragMove}
              onMouseUp={handlePricingDragEnd}
              onMouseLeave={handlePricingDragEnd}
              onTouchStart={handlePricingDragStart}
              onTouchMove={handlePricingDragMove}
              onTouchEnd={handlePricingDragEnd}
              style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
            >
              <div className="relative w-full flex items-center justify-center" style={{ height: '580px' }}>
                {pricingKits.map((kit, index) => {
                  const position = index - currentPricing;
                  const isCenter = position === 0;
                  const isLeft = position === -1;
                  const isRight = position === 1;
                  const isVisible = Math.abs(position) <= 1;

                  return (
                    <div
                      key={index}
                      className="absolute transition-all duration-700 ease-out cursor-pointer"
                      style={{
                        transform: isCenter
                          ? 'translateX(0) scale(1) rotateY(0deg)'
                          : isLeft
                          ? 'translateX(-75%) scale(0.8) rotateY(20deg)'
                          : isRight
                          ? 'translateX(75%) scale(0.8) rotateY(-20deg)'
                          : position < 0
                          ? 'translateX(-120%) scale(0.5) rotateY(45deg)'
                          : 'translateX(120%) scale(0.5) rotateY(-45deg)',
                        opacity: isCenter ? 1 : isVisible ? 0.5 : 0,
                        zIndex: isCenter ? 20 : isVisible ? 10 : 0,
                        pointerEvents: isVisible ? 'auto' : 'none',
                        transformStyle: 'preserve-3d'
                      }}
                      onClick={() => !isCenter && setCurrentPricing(index)}
                    >
                      {/* Card Vertical */}
                      <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden ${isCenter ? 'w-80 md:w-[420px]' : 'w-72 md:w-96'} transition-all duration-700`}>
                        {/* Badge */}
                        {kit.badge && isCenter && (
                          <div className="bg-yellow-400 text-black text-center py-3 px-4 font-black text-base">
                            {kit.badge}
                          </div>
                        )}

                        {/* Conteúdo do Card */}
                        <div className={`p-6 ${isCenter ? 'py-10' : 'py-8'} text-center`}>
                          <h3 className={`font-black mb-3 text-gray-900 ${isCenter ? 'text-3xl' : 'text-2xl'}`}>
                            {kit.title}
                          </h3>
                          <p className={`text-green-700 font-bold mb-2 ${isCenter ? 'text-lg' : 'text-base'}`}>
                            {kit.subtitle}
                          </p>
                          <p className={`text-gray-600 mb-6 ${isCenter ? 'text-base' : 'text-sm'}`}>
                            {kit.description}
                          </p>

                          <div className="mb-6">
                            {kit.oldPrice && (
                              <p className={`line-through text-gray-400 mb-2 ${isCenter ? 'text-lg' : 'text-sm'}`}>
                                {kit.oldPrice}
                              </p>
                            )}
                            <p className={`font-black text-green-700 ${isCenter ? 'text-5xl' : 'text-3xl'}`}>
                              {kit.price}
                            </p>
                            {kit.savings && (
                              <p className={`text-green-600 font-bold mt-2 ${isCenter ? 'text-base' : 'text-sm'}`}>
                                {kit.savings}
                              </p>
                            )}
                          </div>

                          {isCenter && (
                            <a href="https://wa.me/5548996899105?text=Ol%C3%A1!%20Tenho%20interesse%20no%20Full%20Power!" target="_blank" rel="noopener noreferrer" className="group relative w-full inline-flex items-center justify-center px-6 py-3 text-base font-black rounded-full overflow-hidden transition-all duration-500 transform hover:scale-105">
                              {/* Gradiente animado de fundo */}
                              <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-emerald-600 via-lime-600 to-green-700 bg-[length:200%_100%] animate-gradient-flow"></div>

                              {/* Gradiente secundário para profundidade */}
                              <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent"></div>

                              {/* Borda dupla animada */}
                              <div className="absolute inset-0 rounded-full border-2 border-white/30 group-hover:border-white/60 transition-all duration-300"></div>
                              <div className="absolute inset-[-2px] rounded-full border border-green-400/50 animate-pulse-border"></div>

                              {/* Glow effect externo */}
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
                                COMPRAR AGORA
                                <span className="group-hover:translate-x-2 transition-transform duration-300 text-xl">→</span>
                              </span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Botão Próximo */}
            <button
              onClick={() => setCurrentPricing((prev) => (prev === pricingKits.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full shadow-2xl transition-all hover:scale-110 -mr-4 md:-mr-12"
              aria-label="Próximo pacote"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicadores */}
            <div className="flex justify-center gap-3 mt-6">
              {pricingKits.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPricing(i)}
                  className={`h-3 rounded-full transition-all ${
                    i === currentPricing ? 'w-12 bg-white' : 'w-3 bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Ir para pacote ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Garantia */}
          <div className="max-w-3xl mx-auto mt-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 flex items-center gap-4">
              <Shield className="w-12 h-12 flex-shrink-0" />
              <div className="text-left">
                <h3 className="text-lg font-bold mb-1">Garantia de 30 Dias</h3>
                <p className="opacity-90 text-sm">Se não gostar, devolvemos 100% do seu dinheiro. Simples assim!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer data-section="footer" className={`bg-black text-white pt-8 pb-2 md:py-12 transition-all duration-1000 ${sectionsVisible.footer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent mb-3 md:mb-4">
                FULL POWER
              </div>
              <p className="text-gray-400 text-sm">
                Transformando vidas através do poder da natureza.
              </p>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">Páginas</h3>
              <ul className="space-y-1.5 md:space-y-2 text-gray-400 text-sm">
                <li><a href="#home" className="hover:text-green-500">O Produto</a></li>
                <li><a href="#beneficios" className="hover:text-green-500">Benefícios</a></li>
                <li><a href="#depoimentos" className="hover:text-green-500">Depoimentos</a></li>
                <li><a href="#comprar" className="hover:text-green-500">Adquira o seu</a></li>
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">Contato</h3>
              <div className="space-y-2 md:space-y-3 text-gray-400 text-sm">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <a href="https://wa.me/5548996899105" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">WhatsApp: (48) 99689-9105</a>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="break-all">contato@fullpower.com.br</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>Seg-Sáb: 9h às 20h</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 md:pt-8">
            <div className="text-center text-gray-500 text-xs md:text-sm">
              <p className="mb-2">Vendedor Autorizado: Reginaldo Valdori da Silva - CPF: 086.246.459-56</p>
              <p className="mb-2 px-4 md:px-0">Rua Manoel Eduardo Cardoso, 198 - Bela Vista, São José/SC - CEP: 88110-792</p>
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

        @font-face {
          font-family: 'BarlowThinItalic';
          src: url('/fontes/Barlow-ThinItalic.ttf') format('truetype');
          font-weight: 100;
          font-style: italic;
          font-display: swap;
        }

        @font-face {
          font-family: 'BarlowMediumRegular';
          src: url('/fontes/Barlow-Medium.ttf') format('truetype');
          font-weight: 500;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'BarlowBoldItalic';
          src: url('/fontes/Barlow-BoldItalic.ttf') format('truetype');
          font-weight: 700;
          font-style: italic;
          font-display: swap;
        }

        .barlow-font {
          font-family: 'Barlow', 'Arial Black', 'Impact', sans-serif !important;
        }

        .barlow-thin-font {
          font-family: 'BarlowMedium', 'Arial', sans-serif !important;
        }

        .barlow-thin-italic-font {
          font-family: 'BarlowThinItalic', 'Arial', sans-serif !important;
        }

        .barlow-medium-font {
          font-family: 'BarlowMediumRegular', 'Arial', sans-serif !important;
        }

        .barlow-bold-italic-font {
          font-family: 'BarlowBoldItalic', 'Arial', sans-serif !important;
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

        /* Animação de entrada do produto TRASEIRO - desliza da direita para esquerda */
        .product-floating-back {
          animation: enter-product-back 1.2s ease-out 0.8s both;
        }

        @keyframes enter-product-back {
          0% {
            opacity: 0;
            transform: translateX(200px) rotate(-18deg) scale(0.92);
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

        /* Ripple Effect - Variação 8 Menu Mobile */
        .mobile-menu-ripple .menu-item {
          position: relative;
          overflow: visible;
        }

        .mobile-menu-ripple .menu-item.active::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 0;
          height: 0;
          background: rgba(0, 255, 0, 0.3);
          border-radius: 50%;
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        }

        @keyframes ripple {
          to {
            width: 100px;
            height: 100px;
            opacity: 0;
          }
        }
      `}</style>
    </div>
    </>
  );
}
