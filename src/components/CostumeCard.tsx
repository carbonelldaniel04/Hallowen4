import React from 'react';
import { Costume } from '../types';
import { Star, Calendar, ShoppingCart, Check, Tag, ShieldAlert } from 'lucide-react';

interface CostumeCardProps {
  costume: Costume;
  onSelect: (costume: Costume) => void;
  onQuickBook: (costume: Costume) => void;
}

export const CostumeCard: React.FC<CostumeCardProps> = ({
  costume,
  onSelect,
  onQuickBook,
}) => {
  return (
    <div className="group bg-zinc-900 border border-zinc-800 hover:border-orange-500/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-orange-950/30 flex flex-col justify-between">
      
      {/* Top Image Section */}
      <div className="relative h-64 overflow-hidden bg-zinc-950 cursor-pointer" onClick={() => onSelect(costume)}>
        <img
          src={costume.image}
          alt={costume.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/20" />

        {/* Age Badge & Featured */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-md shadow uppercase tracking-wide border ${
            costume.ageCategory === 'Niños'
              ? 'bg-amber-500 text-black border-amber-400'
              : 'bg-orange-600 text-black border-orange-400'
          }`}>
            {costume.ageCategory === 'Niños' ? '👶 Niños' : '🧑 Adultos'}
          </span>
          {costume.isFeatured && (
            <span className="bg-purple-950/90 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-500/40 backdrop-blur-sm">
              ✨ Destacado
            </span>
          )}
        </div>

        {/* Availability / Type Badges */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
          <span className="bg-black/80 backdrop-blur-md text-orange-400 text-[11px] font-bold px-2.5 py-1 rounded-md border border-orange-500/30">
            {costume.type === 'Ambos' ? 'Alquiler / Venta' : costume.type}
          </span>
        </div>

        {/* Rating Badge Overlay */}
        <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md text-amber-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-zinc-800 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>{costume.rating}</span>
          <span className="text-zinc-500 font-normal">({costume.reviewCount})</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Theme tag */}
          <div className="text-[10px] text-orange-400 font-bold uppercase tracking-wider mb-1">
            {costume.theme}
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(costume)}
            className="text-base font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1 cursor-pointer"
          >
            {costume.name}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
            {costume.description}
          </p>

          {/* Included preview tags */}
          <div className="flex flex-wrap gap-1 mt-2.5">
            {costume.includes.slice(0, 2).map((inc, i) => (
              <span key={i} className="text-[10px] bg-zinc-800/80 text-zinc-300 px-2 py-0.5 rounded border border-zinc-700/60 flex items-center gap-1">
                <Check className="w-2.5 h-2.5 text-orange-400" />
                <span>{inc}</span>
              </span>
            ))}
            {costume.includes.length > 2 && (
              <span className="text-[10px] text-zinc-500 font-medium">+{costume.includes.length - 2} más</span>
            )}
          </div>
        </div>

        {/* Pricing Box & Action Buttons */}
        <div className="pt-3 border-t border-zinc-800/80 space-y-3">
          
          <div className="flex items-center justify-between">
            {/* Rental price */}
            {costume.type !== 'Venta' ? (
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-medium">Alquiler desde</span>
                <p className="text-lg font-black text-orange-400">
                  {costume.rentalPricePerDay}€ <span className="text-xs font-normal text-zinc-400">/día</span>
                </p>
              </div>
            ) : (
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-medium">Solo Venta</span>
                <p className="text-lg font-black text-amber-400">{costume.salePrice}€</p>
              </div>
            )}

            {/* Sale option preview if both */}
            {costume.type === 'Ambos' && (
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 uppercase">O Comprar por</span>
                <p className="text-xs font-bold text-zinc-300">{costume.salePrice}€</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelect(costume)}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold py-2.5 px-2 rounded-xl transition-colors border border-zinc-700 text-center"
            >
              Ver Detalles
            </button>

            <button
              onClick={() => onQuickBook(costume)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-black text-xs font-extrabold py-2.5 px-2 rounded-xl transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-1"
            >
              <Calendar className="w-3.5 h-3.5 text-black" />
              <span>Reservar</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
