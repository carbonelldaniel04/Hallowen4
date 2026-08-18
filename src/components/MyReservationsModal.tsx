import React, { useState } from 'react';
import { Booking } from '../types';
import { X, Search, Calendar, User, Phone, CheckCircle, QrCode, Tag, Clock } from 'lucide-react';

interface MyReservationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
}

export const MyReservationsModal: React.FC<MyReservationsModalProps> = ({
  isOpen,
  onClose,
  bookings,
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = bookings.filter((b) =>
    b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.customerPhone.includes(searchQuery) ||
    b.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#121218] border border-orange-500/30 rounded-3xl p-6 space-y-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-orange-500/10 border border-orange-500/30 rounded-xl text-orange-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Mis Reservas de Disfraces</h3>
              <p className="text-xs text-zinc-400">Consulta tus reservas confirmadas con tu teléfono o código</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-900 rounded-full border border-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por teléfono (ej: 612345678) o código de reserva (ej: RES-123456)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/60 text-zinc-100 text-xs rounded-xl pl-9 pr-4 py-3 border border-zinc-800 focus:outline-none focus:border-orange-500"
          />
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Bookings List */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12 space-y-3 bg-zinc-900/50 rounded-2xl border border-zinc-800">
              <Calendar className="w-10 h-10 text-zinc-600 mx-auto" />
              <p className="text-sm font-semibold text-zinc-300">No se encontraron reservas con esa búsqueda.</p>
              <p className="text-xs text-zinc-500">Asegúrate de ingresar el mismo número o correo con el que realizaste la reserva.</p>
            </div>
          ) : (
            filteredBookings.map((b) => (
              <div key={b.id} className="bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 p-4 rounded-2xl space-y-3 transition-all">
                
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div>
                    <span className="bg-orange-500 text-black text-[10px] font-black px-2 py-0.5 rounded">
                      {b.id}
                    </span>
                    <span className="text-xs text-zinc-400 ml-2">Reservado el {new Date(b.createdAt).toLocaleDateString()}</span>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> {b.status}
                  </span>
                </div>

                <div className="flex gap-3 items-center">
                  <img src={b.costumeImage} alt={b.costumeName} className="w-14 h-16 object-cover rounded-xl shrink-0" />
                  <div className="flex-1 text-xs">
                    <h4 className="font-bold text-white text-sm">{b.costumeName}</h4>
                    <p className="text-zinc-400">Tipo: <strong className="text-orange-400">{b.type}</strong> • Talla: <strong className="text-zinc-200">{b.size}</strong></p>
                    <p className="text-zinc-400">Fechas: <strong className="text-amber-400">{b.startDate} al {b.endDate}</strong> ({b.totalDays} días)</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-500 uppercase">Total</span>
                    <p className="text-lg font-black text-orange-400">{b.totalPrice}€</p>
                  </div>
                </div>

                <div className="bg-black/50 p-2.5 rounded-xl text-[11px] text-zinc-400 flex items-center justify-between">
                  <span>Cliente: <strong className="text-zinc-200">{b.customerName}</strong> ({b.customerPhone})</span>
                  <span>Recogida: <strong className="text-orange-300">{b.fulfillmentType}</strong></span>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
