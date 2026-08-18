import React, { useState, useEffect, useMemo } from 'react';
import { Costume, Booking, CartItem, FilterState, BookingStatus } from './types';
import { INITIAL_COSTUMES } from './data/costumes';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CostumeFilter } from './components/CostumeFilter';
import { CostumeCard } from './components/CostumeCard';
import { CostumeDetailModal } from './components/CostumeDetailModal';
import { BookingCalendarSection } from './components/BookingCalendarSection';
import { RentalHowItWorks } from './components/RentalHowItWorks';
import { StoreInfoFooter } from './components/StoreInfoFooter';
import { MyReservationsModal } from './components/MyReservationsModal';
import { CartDrawer } from './components/CartDrawer';
import { AICostumeAssistant } from './components/AICostumeAssistant';
import { AdminPanel } from './components/AdminPanel';
import { Ghost, Calendar, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  // View mode state ('store' vs 'admin')
  const [viewMode, setViewMode] = useState<'store' | 'admin'>('store');

  // Persisted Costumes State
  const [costumes, setCostumes] = useState<Costume[]>(() => {
    try {
      const saved = localStorage.getItem('halloween_disfraces_costumes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_COSTUMES;
  });

  // Save costumes to localStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem('halloween_disfraces_costumes', JSON.stringify(costumes));
    } catch (e) {
      console.error(e);
    }
  }, [costumes]);
  
  // LocalStorage persisted bookings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('halloween_disfraces_bookings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'RES-882319',
        costumeId: 'costume-1',
        costumeName: 'Conde Drácula Gothic Elegance',
        costumeImage: 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?auto=format&fit=crop&w=800&q=80',
        type: 'Alquiler',
        size: 'L',
        startDate: '2026-10-30',
        endDate: '2026-11-01',
        totalDays: 3,
        dailyRate: 25,
        totalPrice: 75,
        depositAmount: 30,
        customerName: 'Daniel Carbonell',
        customerEmail: 'carbonelldaniel04@gmail.com',
        customerPhone: '+34 612 345 678',
        fulfillmentType: 'Recogida en Tienda',
        notes: 'Deseo retirar el pedido sobre las 17:00h',
        status: 'Confirmada',
        createdAt: new Date().toISOString(),
        qrCodeSeed: 'HALLOWEEN-DEMO-1'
      },
      {
        id: 'RES-993412',
        costumeId: 'costume-5',
        costumeName: 'Catrina Mística de la Noche',
        costumeImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80',
        type: 'Alquiler',
        size: 'M',
        startDate: '2026-10-31',
        endDate: '2026-11-02',
        totalDays: 3,
        dailyRate: 28,
        totalPrice: 84,
        depositAmount: 35,
        customerName: 'Laura Morales',
        customerEmail: 'laura.morales@example.com',
        customerPhone: '+34 655 432 109',
        fulfillmentType: 'Envío a Domicilio',
        address: 'Calle Mayor 45, 3ºB, Madrid',
        status: 'En preparación',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        qrCodeSeed: 'HALLOWEEN-DEMO-2'
      },
      {
        id: 'RES-771204',
        costumeId: 'costume-4',
        costumeName: 'Superhéroe Arácnido Kids',
        costumeImage: 'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&w=800&q=80',
        type: 'Venta',
        size: 'Niño 6-8 años',
        startDate: '2026-10-28',
        endDate: '2026-10-28',
        totalDays: 1,
        dailyRate: 39,
        totalPrice: 39,
        depositAmount: 0,
        customerName: 'Carlos Gómez',
        customerEmail: 'cgomez@example.com',
        customerPhone: '+34 688 990 011',
        fulfillmentType: 'Recogida en Tienda',
        status: 'Listo para Recogida',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        qrCodeSeed: 'HALLOWEEN-DEMO-3'
      }
    ];
  });

  // Save bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('halloween_disfraces_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  // Costume Management Handlers (Admin)
  const handleSaveCostume = (costumeData: Costume) => {
    setCostumes(prev => {
      const exists = prev.some(c => c.id === costumeData.id);
      if (exists) {
        return prev.map(c => c.id === costumeData.id ? costumeData : c);
      }
      return [costumeData, ...prev];
    });
  };

  const handleDeleteCostume = (costumeId: string) => {
    setCostumes(prev => prev.filter(c => c.id !== costumeId));
  };

  // Booking Management Handlers (Admin)
  const handleUpdateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
  };

  const handleDeleteBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Selected Costume for Modal & Calendar
  const [selectedCostume, setSelectedCostume] = useState<Costume | null>(null);
  const [activeCalendarCostume, setActiveCalendarCostume] = useState<Costume>(INITIAL_COSTUMES[0]);

  // Modals visibility
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [reservationsModalOpen, setReservationsModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);

  // Search & Filter State
  const [filter, setFilter] = useState<FilterState>({
    searchQuery: '',
    ageCategory: 'Todos',
    theme: 'Todos',
    type: 'Todos',
    maxPrice: 150,
    selectedSize: 'Todos',
    sortBy: 'popular',
  });

  // Filter Logic
  const filteredCostumes = useMemo(() => {
    return costumes.filter((costume) => {
      // Age Category Filter (Niños vs Adultos)
      if (filter.ageCategory !== 'Todos' && costume.ageCategory !== filter.ageCategory) {
        return false;
      }

      // Theme Filter
      if (filter.theme !== 'Todos' && costume.theme !== filter.theme) {
        return false;
      }

      // Type Filter (Alquiler vs Venta)
      if (filter.type === 'Alquiler' && costume.type === 'Venta') return false;
      if (filter.type === 'Venta' && costume.type === 'Alquiler') return false;

      // Search Query
      if (filter.searchQuery.trim() !== '') {
        const q = filter.searchQuery.toLowerCase();
        const nameMatch = costume.name.toLowerCase().includes(q);
        const descMatch = costume.description.toLowerCase().includes(q);
        const themeMatch = costume.theme.toLowerCase().includes(q);
        const includesMatch = costume.includes.some(i => i.toLowerCase().includes(q));
        if (!nameMatch && !descMatch && !themeMatch && !includesMatch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filter.sortBy === 'price-low') return a.rentalPricePerDay - b.rentalPricePerDay;
      if (filter.sortBy === 'price-high') return b.rentalPricePerDay - a.rentalPricePerDay;
      if (filter.sortBy === 'rating') return b.rating - a.rating;
      return b.reviewCount - a.reviewCount; // popular default
    });
  }, [costumes, filter]);

  // Scroll to section helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Quick book trigger from costume card
  const handleQuickBook = (costume: Costume) => {
    setActiveCalendarCostume(costume);
    scrollToSection('calendar-reservation');
  };

  // Open Costume Detail
  const handleInspectCostume = (costume: Costume) => {
    setSelectedCostume(costume);
    setDetailModalOpen(true);
  };

  // Proceed to calendar from detail modal
  const handleProceedToBooking = (costume: Costume) => {
    setActiveCalendarCostume(costume);
    scrollToSection('calendar-reservation');
  };

  // Add new booking from calendar
  const handleAddBooking = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);

    // Also update costume booked dates locally
    const costumeIndex = costumes.findIndex(c => c.id === newBooking.costumeId);
    if (costumeIndex !== -1) {
      const datesToAdd: string[] = [];
      const cur = new Date(newBooking.startDate);
      const end = new Date(newBooking.endDate);
      while (cur <= end) {
        datesToAdd.push(cur.toISOString().split('T')[0]);
        cur.setDate(cur.getDate() + 1);
      }
      costumes[costumeIndex].bookedDates.push(...datesToAdd);
    }
  };

  if (viewMode === 'admin') {
    return (
      <AdminPanel
        costumes={costumes}
        bookings={bookings}
        onSaveCostume={handleSaveCostume}
        onDeleteCostume={handleDeleteCostume}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        onDeleteBooking={handleDeleteBooking}
        onBackToStore={() => setViewMode('store')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0e] text-zinc-100 font-sans selection:bg-orange-500 selection:text-black">
      
      {/* Header Navbar */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setCartOpen(true)}
        onOpenReservations={() => setReservationsModalOpen(true)}
        onOpenAssistant={() => setAssistantOpen(true)}
        onOpenAdmin={() => setViewMode('admin')}
        onScrollToSection={scrollToSection}
        searchQuery={filter.searchQuery}
        setSearchQuery={(q) => setFilter(prev => ({ ...prev, searchQuery: q }))}
      />

      {/* Hero Header */}
      <Hero
        onScrollToCalendar={() => scrollToSection('calendar-reservation')}
        onScrollToCatalog={() => scrollToSection('catalog')}
        onOpenAssistant={() => setAssistantOpen(true)}
      />

      {/* Main Catalog Section */}
      <section id="catalog" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Costume Filters */}
        <CostumeFilter
          filter={filter}
          setFilter={setFilter}
          totalResultsCount={filteredCostumes.length}
        />

        {/* Costume Cards Grid */}
        {filteredCostumes.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/60 rounded-3xl border border-zinc-800 space-y-4">
            <Ghost className="w-12 h-12 text-zinc-600 mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-white">No se encontraron disfraces con los filtros seleccionados.</h3>
            <p className="text-xs text-zinc-400">Intenta cambiar la categoría de edad (niños/adultos) o limpiar la búsqueda.</p>
            <button
              onClick={() => setFilter({
                searchQuery: '',
                ageCategory: 'Todos',
                theme: 'Todos',
                type: 'Todos',
                maxPrice: 150,
                selectedSize: 'Todos',
                sortBy: 'popular',
              })}
              className="bg-orange-500 hover:bg-orange-600 text-black text-xs font-bold px-4 py-2 rounded-xl transition-colors"
            >
              Restablecer Todos los Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCostumes.map((costume) => (
              <CostumeCard
                key={costume.id}
                costume={costume}
                onSelect={handleInspectCostume}
                onQuickBook={handleQuickBook}
              />
            ))}
          </div>
        )}

      </section>

      {/* Online Reservation Module with Availability Calendar */}
      <BookingCalendarSection
        costumes={costumes}
        selectedCostume={activeCalendarCostume}
        onSelectCostume={(c) => setActiveCalendarCostume(c)}
        onAddBooking={handleAddBooking}
      />

      {/* How Rental Works Section */}
      <RentalHowItWorks />

      {/* Footer with Store Info & Location */}
      <StoreInfoFooter />

      {/* Modals & Drawers */}
      <CostumeDetailModal
        costume={selectedCostume}
        onClose={() => setDetailModalOpen(false)}
        onProceedToBooking={handleProceedToBooking}
      />

      <MyReservationsModal
        isOpen={reservationsModalOpen}
        onClose={() => setReservationsModalOpen(false)}
        bookings={bookings}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={(index) => setCartItems(prev => prev.filter((_, i) => i !== index))}
        onProceedToCheckout={() => scrollToSection('calendar-reservation')}
      />

      <AICostumeAssistant
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        costumes={costumes}
        onSelectCostume={(c) => {
          setActiveCalendarCostume(c);
          scrollToSection('calendar-reservation');
        }}
      />

    </div>
  );
}
