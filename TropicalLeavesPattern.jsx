import React from 'react';

export default function TropicalLeavesPattern({ mobileInverted = false }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Definição do pattern de folhas tropicais */}
          <pattern id="tropical-leaves-pattern" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">

            {/* Folha de Monstera - Parte Superior */}
            <path
              d="M50,20 Q60,10 70,20 Q75,30 70,40 Q65,50 60,60 Q55,70 50,80 Q45,70 40,60 Q35,50 30,40 Q25,30 30,20 Q40,10 50,20 M45,25 L45,75 M55,25 L55,75 M40,40 L60,40 M40,60 L60,60"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              opacity="0.15"
              strokeLinecap="round"
            />

            {/* Folha Palmeira 1 */}
            <path
              d="M150,30 Q155,20 160,30 L165,50 Q167,60 165,70 L160,90 Q155,100 150,90 L145,70 Q143,60 145,50 Z M150,30 L150,90 M145,45 L155,45 M145,60 L155,60 M145,75 L155,75"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              opacity="0.12"
              strokeLinecap="round"
            />

            {/* Folha Tropical Pequena */}
            <path
              d="M280,50 Q290,45 300,50 Q305,60 300,70 Q290,75 280,70 Q275,60 280,50 M280,50 Q290,60 300,70 M300,50 Q290,60 280,70"
              stroke="white"
              strokeWidth="1.2"
              fill="none"
              opacity="0.10"
              strokeLinecap="round"
            />

            {/* Folha de Monstera - Meio */}
            <path
              d="M50,150 Q65,140 80,150 Q88,165 80,180 Q72,195 64,210 Q56,225 50,240 Q44,225 36,210 Q28,195 20,180 Q12,165 20,150 Q35,140 50,150 M42,155 L42,235 M58,155 L58,235 M35,175 L65,175 M35,195 L65,195 M35,215 L65,215"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              opacity="0.08"
              strokeLinecap="round"
            />

            {/* Folha Palmeira 2 */}
            <path
              d="M200,180 Q207,170 214,180 L220,205 Q223,218 220,230 L214,255 Q207,265 200,255 L194,230 Q191,218 194,205 Z M200,180 L200,255 M194,200 L206,200 M194,220 L206,220 M194,240 L206,240"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              opacity="0.07"
              strokeLinecap="round"
            />

            {/* Folha Tropical Grande */}
            <path
              d="M320,160 Q335,150 350,160 Q360,180 350,200 Q335,210 320,200 Q310,180 320,160 M320,160 Q335,180 350,200 M350,160 Q335,180 320,200 M335,160 L335,200"
              stroke="white"
              strokeWidth="1.3"
              fill="none"
              opacity="0.09"
              strokeLinecap="round"
            />

            {/* Folha de Monstera - Parte Inferior */}
            <path
              d="M100,300 Q118,288 136,300 Q146,320 136,340 Q126,360 116,380 Q106,400 100,420 Q94,400 84,380 Q74,360 64,340 Q54,320 64,300 Q82,288 100,300 M90,308 L90,412 M110,308 L110,412 M80,330 L120,330 M80,355 L120,355 M80,380 L120,380 M80,405 L120,405"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              opacity="0.05"
              strokeLinecap="round"
            />

            {/* Folha Palmeira 3 */}
            <path
              d="M250,320 Q258,308 266,320 L273,348 Q277,363 273,378 L266,406 Q258,418 250,406 L243,378 Q239,363 243,348 Z M250,320 L250,406 M243,342 M257,342 M243,365 L257,365 M243,388 L257,388"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              opacity="0.04"
              strokeLinecap="round"
            />

            {/* Folhas Pequenas Espalhadas - Topo */}
            <circle cx="380" cy="30" r="8" stroke="white" strokeWidth="1" fill="none" opacity="0.12" />
            <path d="M380,22 L380,38 M372,30 L388,30" stroke="white" strokeWidth="1" opacity="0.12" strokeLinecap="round" />

            <circle cx="20" cy="80" r="6" stroke="white" strokeWidth="0.8" fill="none" opacity="0.11" />
            <path d="M20,74 L20,86 M14,80 L26,80" stroke="white" strokeWidth="0.8" opacity="0.11" strokeLinecap="round" />

            {/* Folhas Pequenas Espalhadas - Meio */}
            <circle cx="360" cy="200" r="7" stroke="white" strokeWidth="0.9" fill="none" opacity="0.08" />
            <path d="M360,193 L360,207 M353,200 L367,200" stroke="white" strokeWidth="0.9" opacity="0.08" strokeLinecap="round" />

            <circle cx="30" cy="270" r="5" stroke="white" strokeWidth="0.7" fill="none" opacity="0.06" />
            <path d="M30,265 L30,275 M25,270 L35,270" stroke="white" strokeWidth="0.7" opacity="0.06" strokeLinecap="round" />

            {/* Folhas Pequenas Espalhadas - Base */}
            <circle cx="340" cy="370" r="6" stroke="white" strokeWidth="0.8" fill="none" opacity="0.04" />
            <path d="M340,364 L340,376 M334,370 L346,370" stroke="white" strokeWidth="0.8" opacity="0.04" strokeLinecap="round" />

            <circle cx="180" cy="390" r="4" stroke="white" strokeWidth="0.6" fill="none" opacity="0.03" />
            <path d="M180,386 L180,394 M176,390 L184,390" stroke="white" strokeWidth="0.6" opacity="0.03" strokeLinecap="round" />

          </pattern>

          {/* Gradiente de opacidade de cima para baixo - Desktop */}
          <linearGradient id="opacity-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: 'white', stopOpacity: 0.15}} />
            <stop offset="25%" style={{stopColor: 'white', stopOpacity: 0.12}} />
            <stop offset="50%" style={{stopColor: 'white', stopOpacity: 0.08}} />
            <stop offset="75%" style={{stopColor: 'white', stopOpacity: 0.05}} />
            <stop offset="100%" style={{stopColor: 'white', stopOpacity: 0.02}} />
          </linearGradient>

          {/* Gradiente de opacidade invertido - Mobile (mais forte na parte inferior/branca) */}
          <linearGradient id="opacity-gradient-mobile" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: 'white', stopOpacity: 0.05}} />
            <stop offset="25%" style={{stopColor: 'white', stopOpacity: 0.08}} />
            <stop offset="50%" style={{stopColor: 'white', stopOpacity: 0.12}} />
            <stop offset="75%" style={{stopColor: 'white', stopOpacity: 0.18}} />
            <stop offset="100%" style={{stopColor: 'white', stopOpacity: 0.22}} />
          </linearGradient>

          {/* Máscara com gradiente desktop */}
          <mask id="gradient-mask">
            <rect width="100%" height="100%" fill="url(#opacity-gradient)" />
          </mask>

          {/* Máscara com gradiente mobile */}
          <mask id="gradient-mask-mobile">
            <rect width="100%" height="100%" fill="url(#opacity-gradient-mobile)" />
          </mask>
        </defs>

        {/* Aplicar pattern com máscara de gradiente - Desktop */}
        <rect
          className={mobileInverted ? "hidden md:block" : ""}
          width="100%"
          height="100%"
          fill="url(#tropical-leaves-pattern)"
          mask="url(#gradient-mask)"
        />

        {/* Aplicar pattern com máscara de gradiente invertido - Mobile */}
        {mobileInverted && (
          <rect
            className="block md:hidden"
            width="100%"
            height="100%"
            fill="url(#tropical-leaves-pattern)"
            mask="url(#gradient-mask-mobile)"
          />
        )}
      </svg>
    </div>
  );
}
