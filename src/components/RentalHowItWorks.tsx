import React from 'react';
import { Calendar, ShieldCheck, Sparkles, RefreshCw, Truck, Heart, HelpCircle } from 'lucide-react';

export const RentalHowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Elige tu Disfraz & Fechas',
      desc: 'Navega en nuestro catálogo para niños o adultos. Selecciona tu talla y comprueba la disponibilidad en el calendario online.',
      icon: <Calendar className="w-6 h-6 text-orange-400" />
    },
    {
      step: '02',
      title: 'Reserva & Recoge o Recibe',
      desc: 'Confirma tu reserva online. Puedes recoger gratis en nuestro local físico o solicitar envío express a tu domicilio.',
      icon: <Truck className="w-6 h-6 text-orange-400" />
    },
    {
      step: '03',
      title: 'Disfruta de tu Fiesta',
      desc: 'Luce tu disfraz con total confianza. Todos nuestros trajes son higienizados minuciosamente con proceso ecológico.',
      icon: <Sparkles className="w-6 h-6 text-orange-400" />
    },
    {
      step: '04',
      title: 'Devuélvelo sin Lavar',
      desc: 'Devuelve el traje en nuestro local o solicita recogida. ¡Nosotros nos encargamos de la limpieza y desinfección!',
      icon: <RefreshCw className="w-6 h-6 text-orange-400" />
    }
  ];

  const faqs = [
    {
      q: '¿Tienen disfraces para niños y adultos?',
      a: '¡Sí! Contamos con más de 500 disfraces desde talla 2 años para niños hasta XL para adultos, incluyendo trajes a juego para toda la familia.'
    },
    {
      q: '¿Cómo funciona la fianza en los alquileres?',
      a: 'Al recoger el disfraz se solicita una pequeña fianza reembolsable (normalmente entre 15€ y 30€). Te la devolvemos íntegramente al retornar el traje.'
    },
    {
      q: '¿Debo lavar el disfraz antes de devolverlo?',
      a: '¡No! Nosotros realizamos una limpieza e higienización profesional ecológica tras cada uso para garantizar máxima seguridad e higiene.'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-[#09090d] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
            Alquiler Sencillo y Transparente
          </span>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">
            ¿Cómo Funciona el Alquiler?
          </h2>
          <p className="text-sm text-zinc-400">
            Disfruta del disfraz perfecto para Halloween, cumpleaños o eventos temáticos en 4 simples pasos.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div key={idx} className="bg-zinc-900/80 border border-zinc-800 hover:border-orange-500/40 p-6 rounded-2xl relative space-y-3 transition-all">
              <span className="text-4xl font-black text-zinc-800 absolute top-4 right-4 pointer-events-none">
                {s.step}
              </span>
              <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/30 rounded-xl flex items-center justify-center">
                {s.icon}
              </div>
              <h3 className="text-base font-bold text-white">{s.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQs Box */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-2 text-orange-400 font-bold text-lg border-b border-zinc-800 pb-4">
            <HelpCircle className="w-5 h-5 text-orange-500" />
            <span>Preguntas Frecuentes sobre Alquiler y Venta</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqs.map((f, i) => (
              <div key={i} className="space-y-2">
                <h4 className="text-sm font-bold text-white leading-snug">{f.q}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
