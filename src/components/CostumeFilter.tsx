import React from 'react';
import { FilterState, CostumeTheme } from '../types';
import { Filter, Search, RotateCcw, Flame, Sparkles, SlidersHorizontal } from 'lucide-react';

interface CostumeFilterProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  totalResultsCount: number;
}

const THEMES: { id: 'Todos' | CostumeTheme; label: string; icon: string }[] = [
  { id: 'Todos', label: 'Todas las Temáticas', icon: '🎭' },
  { id: 'Terror', label: 'Terror & Halloween', icon: '🎃' },
  { id: 'Superhéroes', label: 'Superhéroes & Marvel', icon: '⚡' },
  { id: 'Películas & Series', label: 'Películas & TV', icon: '🎬' },
  { id: 'Época & Épico', label: 'Época & Medieval', icon: '⚔️' },
  { id: 'Fantasía & Cuentos', label: 'Fantasía & Cuentos', icon: '🦄' },
  { id: 'Animales & Divertidos', label: 'Humor & Animales', icon: '🦖' },
];

export const CostumeFilter: React.FC<CostumeFilterProps> = ({
  filter,
  setFilter,
  totalResultsCount,
}) => {
  const resetFilters = () => {
    setFilter({
      searchQuery: '',
      ageCategory: 'Todos',
      theme: 'Todos',
      type: 'Todos',
      maxPrice: 150,
      selectedSize: 'Todos',
      sortBy: 'popular',
    });
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-5">
      
      {/* Top Filter Bar Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        
        {/* Title & Counter */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/10 border border-orange-500/30 rounded-xl text-orange-500">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Explorar Catálogo de Disfraces</span>
              <span className="bg-orange-500/20 text-orange-400 text-xs px-2.5 py-0.5 rounded-full font-extrabold border border-orange-500/30">
                {totalResultsCount} disponibles
              </span>
            </h3>
            <p className="text-xs text-zinc-400">Filtra por edad (niños/adultos), modalidad y temática</p>
          </div>
        </div>

        {/* Sort selector & Reset button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-medium">Ordenar:</span>
            <select
              value={filter.sortBy}
              onChange={(e) => setFilter(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-black/60 text-zinc-200 text-xs rounded-xl px-3 py-2 border border-zinc-700 focus:outline-none focus:border-orange-500 font-medium"
            >
              <option value="popular">Más Populares 🌟</option>
              <option value="price-low">Precio: Menor a Mayor 💶</option>
              <option value="price-high">Precio: Mayor a Menor 💎</option>
              <option value="rating">Mejor Valorados ⭐</option>
            </select>
          </div>

          <button
            onClick={resetFilters}
            className="text-xs text-zinc-400 hover:text-orange-400 flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 px-3 py-2 rounded-xl transition-all"
            title="Restablecer filtros"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Limpiar</span>
          </button>
        </div>

      </div>

      {/* Primary Category Switcher: Niños vs Adultos vs Todos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setFilter(prev => ({ ...prev, ageCategory: 'Todos' }))}
          className={`py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 border ${
            filter.ageCategory === 'Todos'
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black border-orange-400 shadow-md shadow-orange-500/20'
              : 'bg-zinc-800/80 text-zinc-300 border-zinc-700/80 hover:bg-zinc-800 hover:border-zinc-600'
          }`}
        >
          <span>👨‍👩‍👧‍👦 Para Todos</span>
        </button>

        <button
          onClick={() => setFilter(prev => ({ ...prev, ageCategory: 'Niños' }))}
          className={`py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 border ${
            filter.ageCategory === 'Niños'
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black border-orange-400 shadow-md shadow-orange-500/20'
              : 'bg-zinc-800/80 text-zinc-300 border-zinc-700/80 hover:bg-zinc-800 hover:border-zinc-600'
          }`}
        >
          <span>👶 Disfraces Infantiles (Niños)</span>
        </button>

        <button
          onClick={() => setFilter(prev => ({ ...prev, ageCategory: 'Adultos' }))}
          className={`py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 border ${
            filter.ageCategory === 'Adultos'
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black border-orange-400 shadow-md shadow-orange-500/20'
              : 'bg-zinc-800/80 text-zinc-300 border-zinc-700/80 hover:bg-zinc-800 hover:border-zinc-600'
          }`}
        >
          <span>🧑 Disfraces para Adultos</span>
        </button>
      </div>

      {/* Secondary Row: Type (Alquiler vs Venta) & Themes */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        
        {/* Type Toggle: Alquiler vs Venta */}
        <div className="flex items-center bg-black/60 p-1 rounded-xl border border-zinc-800 text-xs font-semibold">
          <button
            onClick={() => setFilter(prev => ({ ...prev, type: 'Todos' }))}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filter.type === 'Todos' ? 'bg-orange-500 text-black font-extrabold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter(prev => ({ ...prev, type: 'Alquiler' }))}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              filter.type === 'Alquiler' ? 'bg-orange-500 text-black font-extrabold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>🏷️ Alquiler</span>
          </button>
          <button
            onClick={() => setFilter(prev => ({ ...prev, type: 'Venta' }))}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              filter.type === 'Venta' ? 'bg-orange-500 text-black font-extrabold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>🛒 Venta</span>
          </button>
        </div>

        {/* Search Input Filter */}
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Filtrar por palabra clave..."
            value={filter.searchQuery}
            onChange={(e) => setFilter(prev => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full bg-black/60 text-zinc-100 placeholder-zinc-500 text-xs rounded-xl pl-9 pr-4 py-2 border border-zinc-800 focus:outline-none focus:border-orange-500"
          />
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

      </div>

      {/* Theme Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
        {THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(prev => ({ ...prev, theme: t.id }))}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border ${
              filter.theme === t.id
                ? 'bg-orange-500/20 text-orange-400 border-orange-500/60 shadow-sm'
                : 'bg-zinc-800/50 text-zinc-400 border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200'
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

    </div>
  );
};
