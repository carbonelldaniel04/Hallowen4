import React from 'react';
import { Booking, BookingStatus } from '../types';
import { X, Calendar, MapPin, User, Phone, Mail, Package, Shield, QrCode, CheckCircle2, MessageCircle, Printer, Clock } from 'lucide-react';

interface BookingDetailAdminModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (bookingId: string, newStatus: BookingStatus) => void;
}

export const BookingDetailAdminModal: React.FC<BookingDetailAdminModalProps> = ({
  booking,
  isOpen,
  onClose,
  onUpdateStatus,
}) => {
  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const statusOptions: BookingStatus[] = [
    'Confirmada',
    'En preparación',
    'Listo para Recogida',
    'Completada',
    'Cancelada',
  ];

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Confirmada':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'En preparación':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Listo para Recogida':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Completada':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Cancelada':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-zinc-800 text-zinc-300';
    }
  };

  const cleanPhone = booking.customerPhone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hola%20${encodeURIComponent(booking.customerName)},%20te%20contactamos%20de%20Halloween%20Disfraces%20respecto%20a%20tu%20reserva%20%23${booking.id}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#121218] border border-orange-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-orange-950/60 my-8">
        
        {/* Header */}
        <div className="bg-zinc-900/90 border-b border-zinc-800 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400 font-mono">ID: #{booking.id}</span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase border ${getStatusBadge(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
              <h2 className="text-lg font-black text-white mt-0.5">
                Reserva de {booking.costumeName}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-800 hover:bg-orange-500 hover:text-black text-zinc-300 transition-all border border-zinc-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Status Update Control */}
          <div className="bg-orange-950/20 border border-orange-500/30 p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block">Estado del Pedido</span>
              <p className="text-xs text-zinc-300">Modifica el estado para notificar el progreso interno</p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={booking.status}
                onChange={e => onUpdateStatus(booking.id, e.target.value as BookingStatus)}
                className="bg-black border border-orange-500/50 text-white font-bold text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-orange-400"
              >
                {statusOptions.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Costume & Booking details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Costume card info */}
            <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 flex items-center gap-4">
              <img
                src={booking.costumeImage}
                alt={booking.costumeName}
                className="w-20 h-24 object-cover rounded-xl border border-zinc-700 shrink-0"
              />
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-orange-400 px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 inline-block">
                  {booking.type}
                </span>
                <h4 className="text-sm font-bold text-white line-clamp-1">{booking.costumeName}</h4>
                <p className="text-xs text-zinc-400">Talla: <strong className="text-white">{booking.size}</strong></p>
                <p className="text-xs text-zinc-400">Fecha de pedido: <span className="text-zinc-300">{new Date(booking.createdAt).toLocaleDateString('es-ES')}</span></p>
              </div>
            </div>

            {/* Dates & Payment */}
            <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs border-b border-zinc-800 pb-2">
                <span className="text-zinc-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-orange-400" />
                  <span>Fechas:</span>
                </span>
                <span className="font-bold text-white">
                  {booking.startDate} {booking.type === 'Alquiler' ? `→ ${booking.endDate}` : ''}
                </span>
              </div>

              {booking.type === 'Alquiler' && (
                <div className="flex items-center justify-between text-xs border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400">Duración Alquiler:</span>
                  <span className="font-bold text-amber-400">{booking.totalDays} Días</span>
                </div>
              )}

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-zinc-400">Total abonado / a pagar:</span>
                <span className="text-base font-black text-orange-400">{booking.totalPrice}€</span>
              </div>

              {booking.depositAmount > 0 && (
                <div className="flex items-center justify-between text-[11px] text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg">
                  <span>Fianza retenida (Devolución):</span>
                  <strong className="font-bold">{booking.depositAmount}€</strong>
                </div>
              )}
            </div>

          </div>

          {/* Customer info */}
          <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 space-y-3">
            <h4 className="text-xs font-black text-orange-400 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-orange-400" />
              <span>Datos del Cliente</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-black/40 p-2.5 rounded-xl border border-zinc-800">
                <span className="text-zinc-500 block text-[10px] uppercase">Nombre completo</span>
                <span className="font-bold text-white">{booking.customerName}</span>
              </div>

              <div className="bg-black/40 p-2.5 rounded-xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">Teléfono</span>
                  <span className="font-bold text-white">{booking.customerPhone}</span>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-black px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold flex items-center gap-1 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="bg-black/40 p-2.5 rounded-xl border border-zinc-800">
                <span className="text-zinc-500 block text-[10px] uppercase">Correo Electrónico</span>
                <span className="font-bold text-white">{booking.customerEmail}</span>
              </div>

              <div className="bg-black/40 p-2.5 rounded-xl border border-zinc-800">
                <span className="text-zinc-500 block text-[10px] uppercase">Método de Entrega</span>
                <span className="font-bold text-orange-300">{booking.fulfillmentType}</span>
                {booking.address && (
                  <p className="text-[11px] text-zinc-300 mt-1 italic">{booking.address}</p>
                )}
              </div>
            </div>

            {booking.notes && (
              <div className="bg-black/40 p-2.5 rounded-xl border border-zinc-800 text-xs text-zinc-300">
                <span className="text-zinc-500 block text-[10px] uppercase">Notas especiales del cliente</span>
                <p>{booking.notes}</p>
              </div>
            )}
          </div>

          {/* Verification Code */}
          <div className="bg-black p-4 rounded-2xl border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-xl">
                <QrCode className="w-8 h-8 text-black" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 block">Código de Verificación QR</span>
                <span className="text-sm font-mono font-bold text-orange-400">{booking.qrCodeSeed}</span>
              </div>
            </div>

            <button
              onClick={handlePrint}
              className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold px-3 py-2 rounded-xl border border-zinc-700 flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-orange-400" />
              <span>Imprimir Ticket</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-zinc-900 border-t border-zinc-800 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-extrabold text-xs transition-all"
          >
            Cerrar Ventana
          </button>
        </div>

      </div>
    </div>
  );
};
