import React from 'react';
import { Calendar, ShieldCheck, Sparkles, Ghost, ArrowRight, Clock, Star, Users, Flame } from 'lucide-react';

interface HeroProps {
  onScrollToCalendar: () => void;
  onScrollToCatalog: () => void;
  onOpenAssistant: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToCalendar,
  onScrollToCatalog,
  onOpenAssistant
}) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-[#0d0d12] pt-12 pb-20 border-b border-zinc-800">
      {/* Halloween Ambient Glow Lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-64 h-64 bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-amber-500/10 border border-orange-500/40 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold text-orange-400 backdrop-blur-sm">
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
              <span>Tu Tienda Especializada de Alquiler y Venta</span>
              <span className="bg-orange-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Online 24/7</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Disfraces Mágicos para <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 underline decoration-orange-500/40">
                Niños y Adultos
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Elige entre más de 500 disfraces de terror, superhéroes, películas y cuentos. 
              Reserva online con nuestro <strong className="text-orange-400 font-semibold">Calendario de Disponibilidad en Tiempo Real</strong> para tu fiesta o evento.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onScrollToCalendar}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-extrabold text-base px-8 py-4 rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-black" />
                <span>Reservar Online con Calendario</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onScrollToCatalog}
                className="w-full sm:w-auto bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 font-semibold text-base px-7 py-4 rounded-xl border border-zinc-700 hover:border-orange-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explorar Catálogo</span>
              </button>
            </div>

            {/* Feature Highlights Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-zinc-800/80 text-left">
              <div className="flex items-center gap-2.5 bg-zinc-900/60 border border-zinc-800 p-2.5 rounded-xl">
                <Clock className="w-5 h-5 text-orange-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white">Alquiler Flexible</h4>
                  <p className="text-[11px] text-zinc-400">Desde 1 hasta 7 días</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-zinc-900/60 border border-zinc-800 p-2.5 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-orange-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white">Higienizado Pro</h4>
                  <p className="text-[11px] text-zinc-400">Lavado ecológico listo</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 bg-zinc-900/60 border border-zinc-800 p-2.5 rounded-xl">
                <Users className="w-5 h-5 text-orange-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white">Todas las Tallas</h4>
                  <p className="text-[11px] text-zinc-400">De 2 años a XL Adultos</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Cards */}
          <div className="lg:col-span-5 relative">
            
            {/* Glowing Accent Frame */}
            <div className="relative rounded-2xl bg-zinc-900 border border-orange-500/30 p-4 shadow-2xl shadow-orange-950/40">
              
              {/* Featured Showcase Header */}
              <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1509557965875-b88c97052f0e?auto=format&fit=crop&w=1000&q=80"
                  alt="Disfraz Destacado Dracula"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-transparent to-black/30" />

                {/* Badges on Image */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="bg-orange-500 text-black text-xs font-extrabold px-3 py-1 rounded-full uppercase shadow">
                    Top Reservado
                  </span>
                  <span className="bg-black/70 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
                    Adultos & Niños
                  </span>
                </div>

                {/* Bottom Overlay Card Details */}
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-900/90 backdrop-blur-md border border-orange-500/30 rounded-xl p-4 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Conde Drácula Gothic Elegance</h3>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>4.9</span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-300 line-clamp-1">Capa de terciopelo borgoña, chaleco gótico y medallón.</p>
                  
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[10px] text-zinc-400 uppercase">Alquiler desde</span>
                      <p className="text-base font-extrabold text-orange-400">25€ <span className="text-xs font-normal text-zinc-400">/día</span></p>
                    </div>
                    <button
                      onClick={onScrollToCalendar}
                      className="bg-orange-500 hover:bg-orange-600 text-black text-xs font-bold px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Consultar Fecha
                    </button>
                  </div>
                </div>

              </div>

              {/* Quick AI Costume Recommendation Bar */}
              <div 
                onClick={onOpenAssistant}
                className="mt-3 bg-gradient-to-r from-purple-950/80 to-zinc-900 border border-purple-500/30 hover:border-orange-500/50 p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-900/50 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors">¿Dudas sobre qué disfraz elegir?</h4>
                    <p className="text-[11px] text-zinc-400">Prueba nuestro recomendador inteligente por temáticas</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
