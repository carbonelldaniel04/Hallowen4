import React, { useState } from 'react';
import { Costume } from '../types';
import { X, Calendar, Star, Check, ShieldCheck, Tag, Sparkles, ShoppingBag, Info, Play } from 'lucide-react';

interface CostumeDetailModalProps {
  costume: Costume | null;
  onClose: () => void;
  onProceedToBooking: (costume: Costume, mode: 'Alquiler' | 'Venta', selectedSize: string) => void;
}

export const CostumeDetailModal: React.FC<CostumeDetailModalProps> = ({
  costume,
  onClose,
  onProceedToBooking,
}) => {
  if (!costume) return null;

  const [selectedSize, setSelectedSize] = useState<string>(costume.sizes[0] || 'M');
  const [mode, setMode] = useState<'Alquiler' | 'Venta'>(costume.type === 'Venta' ? 'Venta' : 'Alquiler');
  const [selectedImage, setSelectedImage] = useState<string>(costume.image);
  const [selectedMedia, setSelectedMedia] = useState<'image' | 'video'>('image');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#121218] border border-orange-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-orange-950/50 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-orange-500 hover:text-black text-white p-2 rounded-full backdrop-blur-md transition-all border border-zinc-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image, Video & Gallery */}
          <div className="relative h-72 md:h-full min-h-[320px] bg-zinc-950 flex flex-col justify-between">
            <div className="relative flex-1 overflow-hidden min-h-[240px]">
              {selectedMedia === 'video' && costume.videoUrl ? (
                <div className="relative w-full h-full bg-black flex items-center justify-center">
                  <video 
                    src={costume.videoUrl} 
                    controls 
                    autoPlay 
                    className="w-full h-full object-contain max-h-[350px]"
                  />
                </div>
              ) : (
                <img
                  src={selectedImage || costume.image}
                  alt={costume.name}
                  className="w-full h-full object-cover object-center"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-transparent to-black/30 pointer-events-none" />

              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                <span className={`text-xs font-black px-3 py-1 rounded-md uppercase border shadow ${
                  costume.ageCategory === 'Niños' ? 'bg-amber-500 text-black border-amber-400' : 'bg-orange-600 text-black border-orange-400'
                }`}>
                  {costume.ageCategory === 'Niños' ? '👶 Infantil / Niños' : '🧑 Talla Adultos'}
                </span>
                <span className="bg-black/80 backdrop-blur-md text-orange-400 text-xs font-bold px-3 py-1 rounded-md border border-orange-500/30">
                  {costume.theme}
                </span>
              </div>
            </div>

            {/* Gallery Thumbnails & Video Selector if available */}
            {(costume.videoUrl || (costume.galleryImages && costume.galleryImages.length > 0)) && (
              <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => { setSelectedMedia('image'); setSelectedImage(costume.image); }}
                  className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 shrink-0 ${
                    selectedMedia === 'image' && selectedImage === costume.image ? 'border-orange-500 scale-105' : 'border-zinc-700 opacity-70'
                  }`}
                >
                  <img src={costume.image} alt="Principal" className="w-full h-full object-cover" />
                </button>

                {costume.galleryImages?.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedMedia('image'); setSelectedImage(imgUrl); }}
                    className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 shrink-0 ${
                      selectedMedia === 'image' && selectedImage === imgUrl ? 'border-orange-500 scale-105' : 'border-zinc-700 opacity-70'
                    }`}
                  >
                    <img src={imgUrl} alt={`Foto ${idx+1}`} className="w-full h-full object-cover" />
                  </button>
                ))}

                {costume.videoUrl && (
                  <button
                    onClick={() => setSelectedMedia('video')}
                    className={`relative px-3 h-12 rounded-lg bg-orange-500/20 text-orange-400 border-2 shrink-0 flex items-center gap-1.5 text-xs font-bold ${
                      selectedMedia === 'video' ? 'border-orange-500 bg-orange-500/30 text-white' : 'border-zinc-700 opacity-80'
                    }`}
                  >
                    <Play className="w-4 h-4 fill-orange-400" />
                    <span>Ver Video</span>
                  </button>
                )}
              </div>
            )}

            <div className="p-3 bg-black/70 border-t border-zinc-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{costume.rating} / 5.0</span>
                <span className="text-zinc-400 font-normal">({costume.reviewCount} opiniones)</span>
              </div>
              <span className="text-zinc-300 font-medium">Stock: <strong className="text-orange-400">{costume.stock} unidades</strong></span>
            </div>
          </div>

          {/* Right Column: Details & Order Options */}
          <div className="p-6 space-y-5 flex flex-col justify-between">
            
            <div className="space-y-4">
              
              <div>
                <h2 className="text-2xl font-black text-white">{costume.name}</h2>
                <p className="text-xs text-orange-400 font-bold uppercase tracking-wider mt-0.5">
                  Categoría: {costume.ageCategory} • {costume.theme}
                </p>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {costume.description}
              </p>

              {/* Purchase vs Rental Mode Toggle (if Both available) */}
              {costume.type === 'Ambos' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400 uppercase">¿Qué deseas hacer?</label>
                  <div className="grid grid-cols-2 gap-2 bg-black/60 p-1 rounded-xl border border-zinc-800">
                    <button
                      onClick={() => setMode('Alquiler')}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex flex-col items-center ${
                        mode === 'Alquiler' ? 'bg-orange-500 text-black shadow' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span>Alquilar por Días</span>
                      <span className="text-[10px] font-extrabold">{costume.rentalPricePerDay}€ / día</span>
                    </button>
                    <button
                      onClick={() => setMode('Venta')}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex flex-col items-center ${
                        mode === 'Venta' ? 'bg-orange-500 text-black shadow' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span>Comprar Disfraz</span>
                      <span className="text-[10px] font-extrabold">{costume.salePrice}€ (Nuevo)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Sizes Selection */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-zinc-300 uppercase">Selecciona Talla:</label>
                  <span className="text-[11px] text-orange-400 underline cursor-pointer">Guía de Tallas</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {costume.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        selectedSize === sz
                          ? 'bg-orange-500 text-black border-orange-400 shadow-md'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Includes List */}
              <div className="space-y-1.5 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-orange-400" />
                  <span>El disfraz incluye:</span>
                </h4>
                <ul className="grid grid-cols-2 gap-1 text-[11px] text-zinc-300">
                  {costume.includes.map((inc, i) => (
                    <li key={i} className="flex items-center gap-1">
                      <span className="text-orange-500">•</span> {inc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Guarantee / Cleaning notice for Rentals */}
              {mode === 'Alquiler' && (
                <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl text-[11px] text-amber-300">
                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold text-amber-200">Garantía de Alquiler:</strong> Se requiere fianza reembolsable de {costume.depositAmount}€ al retirar el disfraz. Lavado e higienizado profesional incluidos.
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Action Button */}
            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase">Precio {mode === 'Alquiler' ? 'diario' : 'total'}</span>
                <p className="text-2xl font-black text-orange-400">
                  {mode === 'Alquiler' ? `${costume.rentalPricePerDay}€` : `${costume.salePrice}€`}
                  {mode === 'Alquiler' && <span className="text-xs font-normal text-zinc-400"> /día</span>}
                </p>
              </div>

              <button
                onClick={() => {
                  onProceedToBooking(costume, mode, selectedSize);
                  onClose();
                }}
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-extrabold text-sm py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-black" />
                <span>Continuar a Calendario de Reserva</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
