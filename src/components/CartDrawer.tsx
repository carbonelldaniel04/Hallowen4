import React from 'react';
import { CartItem } from '../types';
import { X, ShoppingBag, Trash2, Calendar, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);
  const totalDeposit = cartItems.reduce((acc, item) => acc + item.deposit, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121218] border-l border-orange-500/30 p-6 flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="space-y-4 border-b border-zinc-800 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-black text-white uppercase">Bolsa de Reservas</h3>
                <span className="bg-orange-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              </div>

              <button onClick={onClose} className="p-1.5 text-zinc-400 hover:text-white bg-zinc-900 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-zinc-400">Revisa los disfraces seleccionados antes de confirmar tu pedido.</p>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-zinc-700 mx-auto" />
                <p className="text-sm font-semibold text-zinc-400">Tu bolsa de reservas está vacía.</p>
                <button
                  onClick={onClose}
                  className="text-xs text-orange-400 underline font-bold"
                >
                  Ver Catálogo de Disfraces
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div key={idx} className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl flex gap-3 relative">
                  <img src={item.costume.image} alt={item.costume.name} className="w-16 h-20 object-cover rounded-xl shrink-0" />
                  
                  <div className="flex-1 space-y-1 text-xs">
                    <h4 className="font-bold text-white pr-6">{item.costume.name}</h4>
                    <p className="text-zinc-400">Modalidad: <strong className="text-orange-400">{item.type}</strong> • Talla: <strong className="text-white">{item.size}</strong></p>
                    {item.type === 'Alquiler' && (
                      <p className="text-zinc-400">Fechas: <strong className="text-amber-400">{item.startDate} al {item.endDate}</strong> ({item.totalDays}d)</p>
                    )}
                    <p className="font-extrabold text-orange-400 text-sm pt-0.5">{item.price}€</p>
                  </div>

                  <button
                    onClick={() => onRemoveItem(idx)}
                    className="absolute top-3 right-3 text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout button */}
          {cartItems.length > 0 && (
            <div className="border-t border-zinc-800 pt-4 space-y-3">
              {totalDeposit > 0 && (
                <div className="bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl text-[11px] text-amber-300">
                  Total fianza reembolsable: <strong>{totalDeposit}€</strong> (a abonar al retirar).
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-300">Total a Pagar:</span>
                <span className="text-2xl font-black text-orange-400">{totalAmount}€</span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-extrabold text-sm py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Finalizar Reserva en Calendario</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
