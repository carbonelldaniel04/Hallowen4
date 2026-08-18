import React, { useState } from 'react';
import { Costume, Booking, BookingStatus } from '../types';
import { 
  ShoppingBag, 
  Package, 
  Film, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Users, 
  CheckCircle, 
  Clock, 
  Play, 
  Store, 
  Image as ImageIcon,
  Video,
  Sparkles,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { CostumeEditModal } from './CostumeEditModal';
import { BookingDetailAdminModal } from './BookingDetailAdminModal';

interface AdminPanelProps {
  costumes: Costume[];
  bookings: Booking[];
  onSaveCostume: (costume: Costume) => void;
  onDeleteCostume: (costumeId: string) => void;
  onUpdateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  onDeleteBooking: (bookingId: string) => void;
  onBackToStore: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  costumes,
  bookings,
  onSaveCostume,
  onDeleteCostume,
  onUpdateBookingStatus,
  onDeleteBooking,
  onBackToStore,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'catalog' | 'media'>('orders');

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCostumeToEdit, setSelectedCostumeToEdit] = useState<Costume | null>(null);

  const [selectedBookingForDetail, setSelectedBookingForDetail] = useState<Booking | null>(null);

  // Filters for Orders
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderTypeFilter, setOrderTypeFilter] = useState<string>('all');

  // Filters for Catalog
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogCategoryFilter, setCatalogCategoryFilter] = useState<string>('all');

  // KPI Calculations
  const totalIncome = bookings.reduce((sum, b) => b.status !== 'Cancelada' ? sum + b.totalPrice : sum, 0);
  const totalBookingsCount = bookings.length;
  const activeRentalsCount = bookings.filter(b => b.type === 'Alquiler' && b.status !== 'Completada' && b.status !== 'Cancelada').length;
  const totalCostumesCount = costumes.length;

  // Filtered Bookings
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      b.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      b.customerEmail.toLowerCase().includes(orderSearch.toLowerCase()) ||
      b.costumeName.toLowerCase().includes(orderSearch.toLowerCase());

    const matchesStatus = orderStatusFilter === 'all' || b.status === orderStatusFilter;
    const matchesType = orderTypeFilter === 'all' || b.type === orderTypeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Filtered Catalog
  const filteredCostumes = costumes.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      c.theme.toLowerCase().includes(catalogSearch.toLowerCase());
    
    const matchesCat = catalogCategoryFilter === 'all' || c.ageCategory === catalogCategoryFilter;

    return matchesSearch && matchesCat;
  });

  const handleCreateNewCostume = () => {
    setSelectedCostumeToEdit(null);
    setIsEditModalOpen(true);
  };

  const handleEditCostume = (costume: Costume) => {
    setSelectedCostumeToEdit(costume);
    setIsEditModalOpen(true);
  };

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

  return (
    <div className="min-h-screen bg-[#0d0d12] text-zinc-100 pb-20">
      
      {/* Top Admin Header */}
      <header className="bg-zinc-950/90 border-b border-orange-500/20 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl text-black shadow-lg shadow-orange-500/20">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight text-white">Halloween Disfraces</h1>
                <span className="bg-orange-500/20 text-orange-400 border border-orange-500/40 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Panel Admin
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Gestión comercial, inventario, edición de fotos/videos y control de pedidos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToStore}
              className="bg-zinc-900 hover:bg-orange-500 hover:text-black text-orange-400 font-extrabold text-xs px-4 py-2.5 rounded-xl border border-orange-500/30 transition-all flex items-center gap-2 shadow-md"
            >
              <Store className="w-4 h-4" />
              <span>Ver Tienda de Clientes</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        
        {/* KPI Metrics Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Ingresos Totales</span>
              <p className="text-2xl font-black text-orange-400">{totalIncome.toFixed(2)}€</p>
              <span className="text-[11px] text-zinc-500">De pedidos confirmados</span>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400 border border-orange-500/20">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Total Pedidos</span>
              <p className="text-2xl font-black text-white">{totalBookingsCount}</p>
              <span className="text-[11px] text-zinc-500">Alquileres y Ventas</span>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Alquileres Activos</span>
              <p className="text-2xl font-black text-amber-400">{activeRentalsCount}</p>
              <span className="text-[11px] text-zinc-500">Pendientes de recogida/entrega</span>
            </div>
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/20">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Catálogo Activo</span>
              <p className="text-2xl font-black text-white">{totalCostumesCount}</p>
              <span className="text-[11px] text-zinc-500">Modelos de disfraces</span>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
              <Package className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex border-b border-zinc-800 gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-3 rounded-t-2xl font-extrabold text-sm flex items-center gap-2 transition-all border-t border-x ${
              activeTab === 'orders'
                ? 'bg-zinc-900 text-orange-400 border-orange-500/40 shadow-lg'
                : 'text-zinc-400 hover:text-white border-transparent'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Gestión de Pedidos y Reservas</span>
            <span className="bg-orange-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full ml-1">
              {bookings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-5 py-3 rounded-t-2xl font-extrabold text-sm flex items-center gap-2 transition-all border-t border-x ${
              activeTab === 'catalog'
                ? 'bg-zinc-900 text-orange-400 border-orange-500/40 shadow-lg'
                : 'text-zinc-400 hover:text-white border-transparent'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Gestión de Catálogo y Precios</span>
            <span className="bg-zinc-800 text-zinc-300 text-[10px] font-black px-2 py-0.5 rounded-full ml-1">
              {costumes.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`px-5 py-3 rounded-t-2xl font-extrabold text-sm flex items-center gap-2 transition-all border-t border-x ${
              activeTab === 'media'
                ? 'bg-zinc-900 text-orange-400 border-orange-500/40 shadow-lg'
                : 'text-zinc-400 hover:text-white border-transparent'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Edición de Fotos y Videos</span>
            <span className="bg-purple-500/30 text-purple-300 text-[10px] font-black px-2 py-0.5 rounded-full ml-1">
              {costumes.filter(c => c.videoUrl || (c.galleryImages && c.galleryImages.length > 0)).length}
            </span>
          </button>
        </div>

        {/* TAB 1: ORDERS & BOOKINGS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            {/* Filter controls bar */}
            <div className="bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
              
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Buscar por cliente, email, ID o disfraz..."
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                  className="w-full bg-black/60 border border-zinc-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <select
                  value={orderStatusFilter}
                  onChange={e => setOrderStatusFilter(e.target.value)}
                  className="bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="all">Todos los Estados</option>
                  <option value="Confirmada">Confirmadas</option>
                  <option value="En preparación">En preparación</option>
                  <option value="Listo para Recogida">Listos para Recogida</option>
                  <option value="Completada">Completadas</option>
                  <option value="Cancelada">Canceladas</option>
                </select>

                <select
                  value={orderTypeFilter}
                  onChange={e => setOrderTypeFilter(e.target.value)}
                  className="bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="all">Alquiler y Venta</option>
                  <option value="Alquiler">Solo Alquileres</option>
                  <option value="Venta">Solo Ventas</option>
                </select>
              </div>

            </div>

            {/* Orders Table */}
            {filteredBookings.length === 0 ? (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-12 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">No se encontraron pedidos</h3>
                <p className="text-xs text-zinc-400">Intenta cambiar los filtros o realizar una reserva en la tienda para ver los resultados aquí.</p>
              </div>
            ) : (
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="p-4">Pedido / ID</th>
                        <th className="p-4">Cliente</th>
                        <th className="p-4">Disfraz / Talla</th>
                        <th className="p-4">Modalidad & Fechas</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Estado Pedido</th>
                        <th className="p-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-zinc-800/40 transition-colors">
                          <td className="p-4 font-mono">
                            <span className="font-bold text-orange-400">#{b.id}</span>
                            <span className="block text-[10px] text-zinc-500">
                              {new Date(b.createdAt).toLocaleDateString('es-ES')}
                            </span>
                          </td>

                          <td className="p-4">
                            <span className="font-bold text-white block">{b.customerName}</span>
                            <span className="text-[11px] text-zinc-400">{b.customerPhone}</span>
                            <span className="text-[10px] text-zinc-500 block truncate max-w-[150px]">{b.customerEmail}</span>
                          </td>

                          <td className="p-4">
                            <div className="flex items-center gap-2.5">
                              <img src={b.costumeImage} alt={b.costumeName} className="w-9 h-11 object-cover rounded-md border border-zinc-700" />
                              <div>
                                <span className="font-bold text-zinc-200 block line-clamp-1">{b.costumeName}</span>
                                <span className="text-[10px] text-orange-300 font-semibold">Talla {b.size}</span>
                              </div>
                            </div>
                          </td>

                          <td className="p-4">
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded border inline-block mb-1 ${
                              b.type === 'Alquiler' ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            }`}>
                              {b.type} {b.type === 'Alquiler' && `(${b.totalDays}d)`}
                            </span>
                            <div className="text-[11px] text-zinc-300 font-medium">
                              {b.startDate} {b.type === 'Alquiler' ? `→ ${b.endDate}` : ''}
                            </div>
                          </td>

                          <td className="p-4">
                            <span className="font-black text-white text-sm block">{b.totalPrice}€</span>
                            {b.depositAmount > 0 && (
                              <span className="text-[10px] text-amber-400">+{b.depositAmount}€ Fianza</span>
                            )}
                          </td>

                          <td className="p-4">
                            <select
                              value={b.status}
                              onChange={(e) => onUpdateBookingStatus(b.id, e.target.value as BookingStatus)}
                              className={`text-[11px] font-bold rounded-lg px-2.5 py-1.5 border focus:outline-none cursor-pointer ${getStatusBadge(b.status)}`}
                            >
                              <option value="Confirmada" className="bg-zinc-900 text-white">Confirmada</option>
                              <option value="En preparación" className="bg-zinc-900 text-white">En preparación</option>
                              <option value="Listo para Recogida" className="bg-zinc-900 text-white">Listo para Recogida</option>
                              <option value="Completada" className="bg-zinc-900 text-white">Completada</option>
                              <option value="Cancelada" className="bg-zinc-900 text-white">Cancelada</option>
                            </select>
                          </td>

                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => setSelectedBookingForDetail(b)}
                              className="bg-zinc-800 hover:bg-orange-500 hover:text-black text-zinc-200 p-2 rounded-lg transition-all border border-zinc-700"
                              title="Ver Ficha Completa del Pedido"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`¿Seguro que deseas eliminar la reserva #${b.id}?`)) {
                                  onDeleteBooking(b.id);
                                }
                              }}
                              className="bg-red-950/40 hover:bg-red-600 text-red-300 hover:text-white p-2 rounded-lg transition-all border border-red-800/40"
                              title="Eliminar Pedido"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: COSTUME CATALOG MANAGEMENT */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            
            {/* Catalog Toolbar */}
            <div className="bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
              
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Buscar disfraz por nombre o temática..."
                  value={catalogSearch}
                  onChange={e => setCatalogSearch(e.target.value)}
                  className="w-full bg-black/60 border border-zinc-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <select
                  value={catalogCategoryFilter}
                  onChange={e => setCatalogCategoryFilter(e.target.value)}
                  className="bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="all">Todas las Categorías</option>
                  <option value="Niños">Niños / Infantil</option>
                  <option value="Adultos">Adultos</option>
                </select>

                <button
                  onClick={handleCreateNewCostume}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-extrabold text-xs px-4 py-2 rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>Añadir Nuevo Disfraz</span>
                </button>
              </div>

            </div>

            {/* Costumes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredCostumes.map((costume) => (
                <div key={costume.id} className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden hover:border-orange-500/40 transition-all flex flex-col justify-between group">
                  
                  {/* Thumbnail & Video Badge */}
                  <div className="relative h-48 bg-black overflow-hidden">
                    <img
                      src={costume.image}
                      alt={costume.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/40" />

                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="bg-black/80 backdrop-blur-md text-orange-400 text-[10px] font-black px-2 py-0.5 rounded uppercase border border-orange-500/30">
                        {costume.ageCategory}
                      </span>
                    </div>

                    {costume.videoUrl && (
                      <div className="absolute top-2 right-2 bg-purple-600/90 text-white text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 backdrop-blur-md shadow">
                        <Video className="w-3 h-3" />
                        <span>Video Incluido</span>
                      </div>
                    )}

                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-bold text-white bg-black/70 backdrop-blur-md p-1.5 rounded-lg border border-zinc-800">
                      <span>Stock: <strong className="text-orange-400">{costume.stock} u.</strong></span>
                      <span className="text-amber-400">★ {costume.rating}</span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm line-clamp-1">{costume.name}</h4>
                      <p className="text-[11px] text-zinc-400">{costume.theme} • {costume.type}</p>
                    </div>

                    <div className="bg-black/40 p-2 rounded-xl border border-zinc-800/80 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-zinc-500 block uppercase">Alquiler</span>
                        <strong className="text-orange-400 font-black">{costume.rentalPricePerDay}€ /día</strong>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-zinc-500 block uppercase">Venta</span>
                        <strong className="text-white font-black">{costume.salePrice}€</strong>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
                      <button
                        onClick={() => handleEditCostume(costume)}
                        className="flex-1 bg-orange-500/20 hover:bg-orange-500 text-orange-400 hover:text-black font-extrabold text-xs py-2 rounded-xl border border-orange-500/30 transition-all flex items-center justify-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Editar Fotos & Info</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`¿Seguro que deseas eliminar '${costume.name}' del catálogo?`)) {
                            onDeleteCostume(costume.id);
                          }
                        }}
                        className="p-2 bg-zinc-800 hover:bg-red-600 text-zinc-400 hover:text-white rounded-xl border border-zinc-700 transition-all"
                        title="Eliminar disfraz"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: MEDIA GALLERY MANAGER (PHOTOS & VIDEOS) */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            
            <div className="bg-purple-950/20 border border-purple-500/30 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Film className="w-5 h-5 text-purple-400" />
                  <span>Biblioteca y Muro de Galería Multimedia</span>
                </h3>
                <p className="text-xs text-zinc-300 mt-1">
                  Revisa los videos de demostración y galerías fotográficas de cada disfraz para garantizar máxima atracción visual.
                </p>
              </div>

              <button
                onClick={handleCreateNewCostume}
                className="bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-purple-600/20 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Disfraz con Multimedia</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {costumes.map((c) => (
                <div key={c.id} className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-3">
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm line-clamp-1">{c.name}</h4>
                      <p className="text-[10px] text-orange-400 font-semibold">{c.ageCategory} • {c.theme}</p>
                    </div>

                    <button
                      onClick={() => handleEditCostume(c)}
                      className="text-xs text-orange-400 hover:underline font-bold flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editar</span>
                    </button>
                  </div>

                  {/* Video Player or Placeholder */}
                  {c.videoUrl ? (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-purple-400 uppercase flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        <span>Video Promocional Activo</span>
                      </span>
                      <div className="relative rounded-xl overflow-hidden bg-black aspect-video border border-purple-500/30">
                        <video src={c.videoUrl} controls className="w-full h-full object-contain" />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-black/40 rounded-xl p-4 border border-zinc-800 border-dashed text-center space-y-2">
                      <Film className="w-6 h-6 text-zinc-600 mx-auto" />
                      <p className="text-[11px] text-zinc-500">No tiene video adjunto aún.</p>
                      <button
                        onClick={() => handleEditCostume(c)}
                        className="text-[11px] font-bold text-orange-400 hover:text-orange-300 underline"
                      >
                        + Añadir URL de Video
                      </button>
                    </div>
                  )}

                  {/* Gallery Photos list */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase flex items-center gap-1">
                      <ImageIcon className="w-3 h-3 text-orange-400" />
                      <span>Galería de Fotos ({1 + (c.galleryImages?.length || 0)})</span>
                    </span>

                    <div className="flex items-center gap-2 overflow-x-auto py-1">
                      <img src={c.image} alt="Principal" className="w-14 h-14 object-cover rounded-lg border-2 border-orange-500 shrink-0" title="Foto Principal" />
                      {c.galleryImages?.map((gUrl, idx) => (
                        <img key={idx} src={gUrl} alt={`Foto ${idx}`} className="w-14 h-14 object-cover rounded-lg border border-zinc-700 shrink-0" />
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

      </main>

      {/* Modals */}
      <CostumeEditModal
        costume={selectedCostumeToEdit}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={onSaveCostume}
      />

      <BookingDetailAdminModal
        booking={selectedBookingForDetail}
        isOpen={Boolean(selectedBookingForDetail)}
        onClose={() => setSelectedBookingForDetail(null)}
        onUpdateBookingStatus={onUpdateBookingStatus}
      />

    </div>
  );
};
