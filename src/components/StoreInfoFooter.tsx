import React from 'react';
import { MapPin, Phone, Clock, Mail, MessageSquare, Ghost, Heart, Instagram, Facebook } from 'lucide-react';

export const StoreInfoFooter: React.FC = () => {
  const whatsappNumber = "+34612345678";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('¡Hola Halloween Disfraces! Me gustaría consultar disponibilidad de un disfraz.')}`;

  return (
    <footer id="location" className="bg-[#08080b] border-t border-zinc-800 text-zinc-400 text-xs">
      
      {/* Top Direct WhatsApp Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-black p-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-bold">
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <MessageSquare className="w-5 h-5 text-black animate-bounce" />
            <span>¿Tienes dudas con la talla o disponibilidad urgente? ¡Atención inmediata por WhatsApp!</span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black hover:bg-zinc-900 text-orange-400 font-extrabold px-5 py-2 rounded-xl text-xs flex items-center gap-2 transition-all shadow"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Escribir por WhatsApp</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-black font-black">
                <Ghost className="w-5 h-5" />
              </div>
              <span className="text-lg font-black text-white uppercase tracking-tight">
                Halloween <span className="text-orange-500">Disfraces</span>
              </span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Tienda especializada en venta y alquiler de disfraces de alta calidad para niños y adultos. Transforma cada fiesta en una experiencia inolvidable.
            </p>
            <div className="flex items-center gap-3 text-zinc-300 pt-2">
              <span className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg hover:text-orange-400 cursor-pointer">
                <Instagram className="w-4 h-4" />
              </span>
              <span className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg hover:text-orange-400 cursor-pointer">
                <Facebook className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-orange-400">
              📍 Ubicación de la Tienda
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Av. de la Fiesta 45, Local 2B, Madrid / Barcelona</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>+34 912 345 678 / +34 612 345 678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>contacto@halloweendisfraces.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-orange-400">
              ⏰ Horario de Atención
            </h4>
            <div className="bg-zinc-900/80 p-3 rounded-2xl border border-zinc-800 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-zinc-300">Lunes a Viernes:</span>
                <strong className="text-white">10:00 - 20:30h</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-300">Sábados:</span>
                <strong className="text-white">10:00 - 21:00h</strong>
              </div>
              <div className="flex justify-between text-orange-400 font-semibold">
                <span>Temporada Halloween:</span>
                <span>Abierto Domingos</span>
              </div>
            </div>
          </div>

          {/* Interactive Map Mock Representation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-orange-400">
              🗺️ Mapa Interactivo
            </h4>
            <div className="relative h-32 rounded-2xl overflow-hidden border border-zinc-800 group bg-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80"
                alt="Mapa de Ubicación"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] bg-black/80 p-1.5 rounded-lg backdrop-blur-sm">
                <span className="font-bold text-white flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                  Local Físico
                </span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-400 font-bold hover:underline"
                >
                  Abrir en GPS
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 mt-8 border-t border-zinc-800/80 text-center text-[11px] text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Halloween Disfraces. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            <span>Venta y Alquiler de Disfraces con Reserva Online</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
