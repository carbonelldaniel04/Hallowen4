import React, { useState } from 'react';
import { ShoppingBag, Calendar, Sparkles, MapPin, Search, Phone, Ghost, User, Menu, X, SlidersHorizontal } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenReservations: () => void;
  onOpenAssistant: () => void;
  onOpenAdmin: () => void;
  onScrollToSection: (sectionId: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  onOpenReservations,
  onOpenAssistant,
  onOpenAdmin,
  onScrollToSection,
  searchQuery,
  setSearchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cartItems.length;

  return (
    <header className="sticky top-0 z-40 bg-[#0d0d12]/95 backdrop-blur-md border-b border-orange-500/20 shadow-lg shadow-black/50">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-black font-semibold text-xs py-1 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <Ghost className="w-3.5 h-3.5 animate-bounce text-black" />
        <span>¡Reserva online tu disfraz de Halloween o evento! Entregas rápidas y opción de recogida gratis en local.</span>
        <span className="hidden sm:inline bg-black/20 px-2 py-0.5 rounded text-[11px] font-bold uppercase ml-2 text-white">Venta y Alquiler</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => onScrollToSection('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 p-0.5 shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-300">
              <div className="w-full h-full bg-[#0d0d12] rounded-[10px] flex items-center justify-center">
                <Ghost className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase font-sans">
                Halloween <span className="text-orange-500 underline decoration-orange-500/50 decoration-2">Disfraces</span>
              </span>
              <p className="text-[10px] text-zinc-400 tracking-wider uppercase font-medium">Venta & Alquiler • Niños y Adultos</p>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xs relative">
            <input
              type="text"
              placeholder="Buscar disfraz (ej: Vampiro, Bruja, T-Rex)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/80 text-zinc-100 placeholder-zinc-500 text-sm rounded-full pl-10 pr-4 py-2 border border-zinc-800 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-300">
            <button 
              onClick={() => onScrollToSection('catalog')} 
              className="hover:text-orange-400 transition-colors"
            >
              Catálogo
            </button>
            <button 
              onClick={() => {
                onScrollToSection('catalog');
              }} 
              className="hover:text-orange-400 transition-colors"
            >
              Niños & Adultos
            </button>
            <button 
              onClick={() => onScrollToSection('calendar-reservation')} 
              className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/30 px-3 py-1.5 rounded-lg transition-all hover:bg-orange-500/20"
            >
              <Calendar className="w-4 h-4" />
              Reservar Online
            </button>
            <button 
              onClick={() => onScrollToSection('how-it-works')} 
              className="hover:text-orange-400 transition-colors"
            >
              ¿Cómo Funciona?
            </button>
            <button 
              onClick={() => onScrollToSection('location')} 
              className="hover:text-orange-400 transition-colors flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5" />
              Tienda
            </button>
          </nav>

          {/* Actions: AI Assistant, My Bookings, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Assistant Button */}
            <button
              onClick={onOpenAssistant}
              className="flex items-center gap-1.5 bg-gradient-to-r from-purple-900/60 to-orange-900/60 hover:from-purple-800/80 hover:to-orange-800/80 text-orange-300 border border-orange-500/30 text-xs sm:text-sm font-medium px-3 py-2 rounded-xl transition-all shadow-sm"
              title="Asistente IA de Disfraces"
            >
              <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
              <span className="hidden sm:inline">Asistente IA</span>
            </button>

            {/* My Reservations Button */}
            <button
              onClick={onOpenReservations}
              className="flex items-center gap-1.5 text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs sm:text-sm px-3 py-2 rounded-xl transition-all"
              title="Consultar Mis Reservas"
            >
              <User className="w-4 h-4 text-orange-400" />
              <span className="hidden md:inline">Mis Reservas</span>
            </button>

            {/* Admin Dashboard Button */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 bg-zinc-900 hover:bg-orange-500 hover:text-black text-orange-400 border border-orange-500/40 text-xs sm:text-sm font-extrabold px-3 py-2 rounded-xl transition-all shadow-sm"
              title="Panel de Administración"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Admin</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative bg-orange-500 hover:bg-orange-600 text-black font-bold p-2.5 rounded-xl transition-all shadow-md shadow-orange-500/20 flex items-center justify-center"
              aria-label="Ver bolsa de reservas"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-black text-xs font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0d0d12] shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-300 hover:text-white bg-zinc-900 rounded-xl border border-zinc-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0d12] border-b border-orange-500/20 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar disfraz..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 text-zinc-100 placeholder-zinc-500 text-sm rounded-lg pl-9 pr-4 py-2 border border-zinc-800 focus:outline-none focus:border-orange-500"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button 
              onClick={() => { onScrollToSection('catalog'); setMobileMenuOpen(false); }} 
              className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 p-2.5 rounded-lg text-left"
            >
              🎃 Ver Catálogo Complete
            </button>
            <button 
              onClick={() => { onScrollToSection('calendar-reservation'); setMobileMenuOpen(false); }} 
              className="bg-orange-500/20 border border-orange-500/40 text-orange-400 font-semibold p-2.5 rounded-lg text-left flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" /> Reservar Online
            </button>
            <button 
              onClick={() => { onScrollToSection('how-it-works'); setMobileMenuOpen(false); }} 
              className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 p-2.5 rounded-lg text-left"
            >
              📋 ¿Cómo Alquilar?
            </button>
            <button 
              onClick={() => { onScrollToSection('location'); setMobileMenuOpen(false); }} 
              className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 p-2.5 rounded-lg text-left flex items-center gap-1"
            >
              <MapPin className="w-4 h-4 text-orange-500" /> Ver Local & Horario
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
