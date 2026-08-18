import React, { useState, useMemo } from 'react';
import { Costume, Booking } from '../types';
import { Calendar as CalendarIcon, CheckCircle2, ChevronLeft, ChevronRight, Clock, AlertTriangle, ShieldCheck, User, Phone, Mail, MapPin, Truck, Sparkles, QrCode, Printer, Download, RefreshCw } from 'lucide-react';

interface BookingCalendarSectionProps {
  costumes: Costume[];
  selectedCostume: Costume | null;
  onSelectCostume: (c: Costume) => void;
  onAddBooking: (booking: Booking) => void;
}

export const BookingCalendarSection: React.FC<BookingCalendarSectionProps> = ({
  costumes,
  selectedCostume,
  onSelectCostume,
  onAddBooking,
}) => {
  // Active costume falling back to first item if none selected
  const activeCostume = selectedCostume || costumes[0];

  // Booking config states
  const [bookingType, setBookingType] = useState<'Alquiler' | 'Venta'>('Alquiler');
  const [selectedSize, setSelectedSize] = useState<string>(activeCostume?.sizes[0] || 'M');

  // Calendar state: current view month/year
  const [currentDate, setCurrentDate] = useState(() => new Date());

  // Date selection state (YYYY-MM-DD strings)
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Customer form
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [fulfillmentType, setFulfillmentType] = useState<'Recogida en Tienda' | 'Envío a Domicilio'>('Recogida en Tienda');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Confirmation state
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  // Sync size when active costume changes
  React.useEffect(() => {
    if (activeCostume && activeCostume.sizes.length > 0) {
      setSelectedSize(activeCostume.sizes[0]);
    }
  }, [activeCostume]);

  // Calendar Helper Math
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  // Days in month calculations
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Get day index for Monday start (0 = Mon, 6 = Sun)
    let startDayIndex = firstDayOfMonth.getDay() - 1;
    if (startDayIndex === -1) startDayIndex = 6;

    const totalDaysInMonth = lastDayOfMonth.getDate();
    const days: Array<{ dateStr: string; dayNum: number; isCurrentMonth: boolean; isToday: boolean; isPast: boolean; isBooked: boolean }> = [];

    // Today YYYY-MM-DD
    const todayObj = new Date();
    todayObj.setHours(0, 0, 0, 0);
    const todayStr = todayObj.toISOString().split('T')[0];

    // Previous month padding
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayIndex - 1; i >= 0; i--) {
      const prevDate = new Date(year, month - 1, prevMonthLastDay - i);
      const dateStr = prevDate.toISOString().split('T')[0];
      days.push({
        dateStr,
        dayNum: prevMonthLastDay - i,
        isCurrentMonth: false,
        isToday: false,
        isPast: true,
        isBooked: false,
      });
    }

    // Current month days
    for (let d = 1; d <= totalDaysInMonth; d++) {
      const dObj = new Date(year, month, d);
      dObj.setHours(0,0,0,0);
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isPast = dObj < todayObj;

      days.push({
        dateStr,
        dayNum: d,
        isCurrentMonth: true,
        isToday: dateStr === todayStr,
        isPast,
        isBooked: false,
      });
    }

    return days;
  }, [year, month, activeCostume]);

  // Handle Date Click - Allows selecting any future date for budget quotation
  const handleDateClick = (dateStr: string, isPast: boolean) => {
    if (isPast) return; // Cannot pick past days

    if (bookingType === 'Venta') {
      // For sale, single date selection for pickup/shipping
      setStartDate(dateStr);
      setEndDate(dateStr);
      return;
    }

    // For rental (range selection)
    if (!startDate || (startDate && endDate)) {
      setStartDate(dateStr);
      setEndDate('');
    } else if (startDate && !endDate) {
      if (dateStr < startDate) {
        setStartDate(dateStr);
        setEndDate('');
      } else {
        setEndDate(dateStr);
      }
    }
  };

  // Helper check if date is in selected range
  const isSelectedDate = (dateStr: string) => dateStr === startDate || dateStr === endDate;
  const isInSelectedRange = (dateStr: string) => {
    if (startDate && endDate) {
      return dateStr >= startDate && dateStr <= endDate;
    }
    return false;
  };

  // Calculate Days count & Price
  const totalDays = useMemo(() => {
    if (!startDate) return 0;
    if (bookingType === 'Venta') return 1;
    if (!endDate) return 1;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  }, [startDate, endDate, bookingType]);

  const rentalSubtotal = totalDays * (activeCostume?.rentalPricePerDay || 0);
  const deliveryFee = fulfillmentType === 'Envío a Domicilio' ? 4.90 : 0;
  const totalPrice = bookingType === 'Alquiler' ? rentalSubtotal + deliveryFee : (activeCostume?.salePrice || 0) + deliveryFee;

  // Submit Reservation
  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate) {
      alert('Por favor selecciona las fechas en el calendario.');
      return;
    }

    if (!customerName || !customerEmail || !customerPhone) {
      alert('Por favor completa todos los datos de contacto.');
      return;
    }

    const newBooking: Booking = {
      id: `RES-${Math.floor(100000 + Math.random() * 900000)}`,
      costumeId: activeCostume.id,
      costumeName: activeCostume.name,
      costumeImage: activeCostume.image,
      type: bookingType,
      size: selectedSize,
      startDate: startDate,
      endDate: endDate || startDate,
      totalDays: totalDays,
      dailyRate: activeCostume.rentalPricePerDay,
      totalPrice: totalPrice,
      depositAmount: bookingType === 'Alquiler' ? activeCostume.depositAmount : 0,
      customerName,
      customerEmail,
      customerPhone,
      fulfillmentType,
      address: deliveryAddress,
      notes,
      status: 'Confirmada',
      createdAt: new Date().toISOString(),
      qrCodeSeed: `HALLOWEEN-DISFRACES-${Date.now()}`
    };

    onAddBooking(newBooking);
    setCreatedBooking(newBooking);
  };

  const handleMonthPrev = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleMonthNext = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <section id="calendar-reservation" className="py-16 bg-[#0c0c10] border-b border-zinc-800 relative overflow-hidden">
      
      {/* Accent Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold px-3.5 py-1.5 rounded-full">
            <CalendarIcon className="w-4 h-4 text-orange-500 animate-pulse" />
            <span>Sistema Oficial de Reservas Online</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Presupuesto de Alquiler <span className="text-orange-500">por Tiempo y Fechas</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-300">
            Selecciona las fechas de inicio y fin en el calendario para calcular tu presupuesto automático. Disponemos de amplio stock en almacén; si ocurriera cualquier incidencia con la talla o disfraz seleccionado, te lo haremos saber inmediatamente.
          </p>
        </div>

        {/* Successful Booking Confirmation Voucher View */}
        {createdBooking ? (
          <div className="bg-zinc-900 border-2 border-orange-500 rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto shadow-2xl shadow-orange-950/60 animate-in zoom-in-95 duration-300">
            
            <div className="text-center space-y-3 border-b border-zinc-800 pb-6">
              <div className="w-16 h-16 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center mx-auto border border-orange-500/40">
                <CheckCircle2 className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase">¡Reserva Confirmada con Éxito!</h3>
              <p className="text-xs text-orange-400 font-bold uppercase tracking-wider">
                Código de Reserva: <span className="bg-orange-500 text-black px-2 py-0.5 rounded font-extrabold text-sm">{createdBooking.id}</span>
              </p>
              <p className="text-xs text-zinc-400">
                Hemos enviado un correo de confirmación a <strong className="text-zinc-200">{createdBooking.customerEmail}</strong>.
              </p>
            </div>

            {/* Voucher Body Details */}
            <div className="py-6 space-y-4 text-xs text-zinc-300">
              <div className="flex items-center gap-4 bg-zinc-950 p-3 rounded-2xl border border-zinc-800">
                <img src={createdBooking.costumeImage} alt={createdBooking.costumeName} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-white text-sm">{createdBooking.costumeName}</h4>
                  <p className="text-zinc-400">Modalidad: <strong className="text-orange-400">{createdBooking.type}</strong> • Talla: <strong className="text-white">{createdBooking.size}</strong></p>
                  <p className="text-zinc-400">Entrega: <strong className="text-amber-400">{createdBooking.fulfillmentType}</strong></p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-zinc-800/50 p-4 rounded-xl">
                <div>
                  <span className="text-zinc-500 uppercase text-[10px]">Fecha de Inicio</span>
                  <p className="font-bold text-white text-sm">{createdBooking.startDate}</p>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase text-[10px]">Fecha de Devolución</span>
                  <p className="font-bold text-white text-sm">{createdBooking.endDate}</p>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase text-[10px]">Cliente</span>
                  <p className="font-semibold text-zinc-200">{createdBooking.customerName}</p>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase text-[10px]">Teléfono</span>
                  <p className="font-semibold text-zinc-200">{createdBooking.customerPhone}</p>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-300 font-medium">Total a Pagar ({createdBooking.totalDays} días)</span>
                  {createdBooking.depositAmount > 0 && (
                    <p className="text-[10px] text-amber-400">+ {createdBooking.depositAmount}€ de fianza reembolsable al entregar</p>
                  )}
                </div>
                <p className="text-2xl font-black text-orange-400">{createdBooking.totalPrice}€</p>
              </div>

              {/* QR Code representation */}
              <div className="flex items-center justify-center gap-3 pt-2 text-center text-[11px] text-zinc-400">
                <QrCode className="w-12 h-12 text-orange-500 p-1 bg-white rounded-lg" />
                <p className="text-left max-w-xs">Muestra este código QR en tienda para recoger tu disfraz sin esperas.</p>
              </div>
            </div>

            {/* Voucher Actions */}
            <div className="pt-4 border-t border-zinc-800 flex flex-wrap gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" /> Imprimir Comprobante
              </button>
              <button
                onClick={() => setCreatedBooking(null)}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4 text-black" /> Realizar Otra Reserva
              </button>
            </div>

          </div>
        ) : (
          /* Main Interactive Calendar App Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Costume Selection & Summary Box */}
            <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6 shadow-xl">
              
              <div>
                <label className="text-xs font-extrabold text-orange-400 uppercase tracking-wider block mb-2">
                  1. Selecciona el Disfraz a Reservar:
                </label>
                <select
                  value={activeCostume.id}
                  onChange={(e) => {
                    const found = costumes.find(c => c.id === e.target.value);
                    if (found) onSelectCostume(found);
                  }}
                  className="w-full bg-black/80 text-white font-bold text-sm rounded-xl p-3 border border-zinc-700 focus:outline-none focus:border-orange-500"
                >
                  {costumes.map((c) => (
                    <option key={c.id} value={c.id}>
                      [{c.ageCategory}] {c.name} ({c.rentalPricePerDay}€/día)
                    </option>
                  ))}
                </select>
              </div>

              {/* Active Costume Card Summary */}
              <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80 flex gap-4">
                <img
                  src={activeCostume.image}
                  alt={activeCostume.name}
                  className="w-24 h-28 object-cover rounded-xl shrink-0"
                />
                <div className="space-y-1.5 flex-1">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase border ${
                    activeCostume.ageCategory === 'Niños' ? 'bg-amber-500 text-black border-amber-400' : 'bg-orange-600 text-black border-orange-400'
                  }`}>
                    {activeCostume.ageCategory}
                  </span>
                  <h3 className="text-sm font-bold text-white line-clamp-1">{activeCostume.name}</h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">{activeCostume.description}</p>
                  <p className="text-xs text-orange-400 font-bold pt-1">
                    Alquiler: {activeCostume.rentalPricePerDay}€ / día • Venta: {activeCostume.salePrice}€
                  </p>
                </div>
              </div>

              {/* Option Mode & Size Picker */}
              <div className="space-y-4 pt-2 border-t border-zinc-800">
                
                {/* Type Selection */}
                <div>
                  <label className="text-xs font-bold text-zinc-300 uppercase block mb-1.5">
                    Modalidad:
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-black/60 p-1 rounded-xl border border-zinc-800">
                    <button
                      type="button"
                      onClick={() => {
                        setBookingType('Alquiler');
                        setStartDate('');
                        setEndDate('');
                      }}
                      className={`py-2 px-3 rounded-lg text-xs font-extrabold transition-all ${
                        bookingType === 'Alquiler' ? 'bg-orange-500 text-black' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      🏷️ Alquiler por Días
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBookingType('Venta');
                        setStartDate('');
                        setEndDate('');
                      }}
                      className={`py-2 px-3 rounded-lg text-xs font-extrabold transition-all ${
                        bookingType === 'Venta' ? 'bg-orange-500 text-black' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      🛒 Compra Directa
                    </button>
                  </div>
                </div>

                {/* Size selector */}
                <div>
                  <label className="text-xs font-bold text-zinc-300 uppercase block mb-1.5">
                    Talla Requerida:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {activeCostume.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          selectedSize === s
                            ? 'bg-orange-500 text-black border-orange-400 shadow'
                            : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Real-time Order Summary Box */}
              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300">Periodo seleccionado:</span>
                  <span className="font-extrabold text-orange-400">
                    {startDate ? (endDate ? `${startDate} al ${endDate}` : startDate) : 'Haz clic en el calendario'}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300">Días totales:</span>
                  <span className="font-extrabold text-white">{totalDays} días</span>
                </div>

                {bookingType === 'Alquiler' && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-300">Fianza Reembolsable:</span>
                    <span className="font-extrabold text-amber-400">{activeCostume.depositAmount}€</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2 border-t border-orange-500/20 text-sm font-black text-white">
                  <span>Total Alquiler / Compra:</span>
                  <span className="text-2xl text-orange-400">{totalPrice}€</span>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Availability Calendar & Customer Form */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Calendar Container */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-5">
                
                {/* Calendar Month Header */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div>
                    <span className="text-xs text-orange-400 font-bold uppercase tracking-wider block">
                      2. Calendario de Disponibilidad
                    </span>
                    <h3 className="text-xl font-black text-white">
                      {monthNames[month]} {year}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleMonthPrev}
                      className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl border border-zinc-700 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleMonthNext}
                      className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl border border-zinc-700 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Calendar Legend */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-zinc-400 bg-black/40 p-2.5 rounded-xl border border-zinc-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
                    <span>Fechas Habilitadas</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-orange-500 shadow-sm" />
                    <span>Tu Selección (Presupuesto)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-500">
                    <span className="w-3 h-3 rounded-full bg-zinc-800 shadow-sm" />
                    <span>Fechas Pasadas</span>
                  </div>
                </div>

                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-orange-400 uppercase">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="py-1.5">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                  {calendarDays.map((dayObj, index) => {
                    const isSel = isSelectedDate(dayObj.dateStr);
                    const isInRange = isInSelectedRange(dayObj.dateStr);

                    let buttonStyles = "bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-orange-500/50";

                    if (!dayObj.isCurrentMonth) {
                      buttonStyles = "opacity-25 bg-transparent border-transparent cursor-default";
                    } else if (dayObj.isPast) {
                      buttonStyles = "opacity-40 bg-zinc-950 text-zinc-600 line-through cursor-not-allowed border-zinc-900";
                    } else if (isSel) {
                      buttonStyles = "bg-orange-500 text-black font-extrabold border-orange-400 shadow-lg shadow-orange-500/30 scale-105";
                    } else if (isInRange) {
                      buttonStyles = "bg-orange-500/30 text-orange-300 border-orange-500/60 font-bold";
                    } else {
                      buttonStyles = "bg-emerald-950/30 hover:bg-orange-500/20 text-emerald-300 hover:text-orange-400 border-emerald-900/40 cursor-pointer";
                    }

                    return (
                      <button
                        key={index}
                        type="button"
                        disabled={dayObj.isPast || !dayObj.isCurrentMonth}
                        onClick={() => handleDateClick(dayObj.dateStr, dayObj.isPast)}
                        className={`h-11 rounded-xl border flex flex-col items-center justify-center transition-all relative ${buttonStyles}`}
                      >
                        <span className="text-xs">{dayObj.dayNum}</span>
                        {dayObj.isToday && (
                          <span className="absolute bottom-1 w-1 h-1 bg-amber-400 rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Rental Range Info Helper */}
                <div className="text-xs text-zinc-300 bg-orange-500/10 border border-orange-500/20 p-3 rounded-xl flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-bold block mb-0.5">Cálculo de Presupuesto Abierto por Tiempo:</strong>
                    <span>Elige la fecha de inicio y la fecha de fin. El sistema calculará el importe proporcional al número de días. Si no hubiera disponibilidad puntual del talle o disfraz en esas fechas, te lo comunicaremos enseguida.</span>
                  </div>
                </div>

              </div>

              {/* Customer Contact & Pickup Form */}
              <form onSubmit={handleConfirmReservation} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
                <h4 className="text-sm font-extrabold text-orange-400 uppercase tracking-wider">
                  3. Datos de la Reserva & Forma de Entrega:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-zinc-300 font-semibold mb-1 block">Nombre y Apellidos *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Carlos Mendoza"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-black/60 text-zinc-100 text-xs rounded-xl p-3 border border-zinc-800 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-300 font-semibold mb-1 block">Teléfono WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej: +34 612 345 678"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-black/60 text-zinc-100 text-xs rounded-xl p-3 border border-zinc-800 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-300 font-semibold mb-1 block">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    placeholder="carlos@ejemplo.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-black/60 text-zinc-100 text-xs rounded-xl p-3 border border-zinc-800 focus:outline-none focus:border-orange-500"
                  />
                </div>

                {/* Fulfillment option */}
                <div className="space-y-2">
                  <label className="text-xs text-zinc-300 font-semibold block">Modalidad de Recogida / Entrega:</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFulfillmentType('Recogida en Tienda')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                        fulfillmentType === 'Recogida en Tienda'
                          ? 'bg-orange-500/20 text-orange-400 border-orange-500'
                          : 'bg-black/60 text-zinc-400 border-zinc-800'
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <div className="text-left">
                        <div>Recogida en Local</div>
                        <span className="text-[10px] font-normal text-zinc-400">Gratis en Tienda</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFulfillmentType('Envío a Domicilio')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                        fulfillmentType === 'Envío a Domicilio'
                          ? 'bg-orange-500/20 text-orange-400 border-orange-500'
                          : 'bg-black/60 text-zinc-400 border-zinc-800'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-orange-500" />
                      <div className="text-left">
                        <div>Envío Express</div>
                        <span className="text-[10px] font-normal text-zinc-400">+4.90€ en tu puerta</span>
                      </div>
                    </button>
                  </div>
                </div>

                {fulfillmentType === 'Envío a Domicilio' && (
                  <div>
                    <label className="text-xs text-zinc-300 font-semibold mb-1 block">Dirección de Envío Completa</label>
                    <input
                      type="text"
                      required
                      placeholder="Calle, Número, Piso, Ciudad, Código Postal"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full bg-black/60 text-zinc-100 text-xs rounded-xl p-3 border border-zinc-800 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-extrabold text-base py-4 rounded-xl transition-all shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5 text-black" />
                  <span>Confirmar Reserva Online Instantánea ({totalPrice}€)</span>
                </button>
              </form>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
