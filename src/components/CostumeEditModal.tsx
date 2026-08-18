import React, { useState } from 'react';
import { Costume, AgeCategory, CostumeTheme, PurchaseType } from '../types';
import { X, Save, Image, Video, Plus, Trash2, CheckCircle2, Film, AlertCircle } from 'lucide-react';

interface CostumeEditModalProps {
  costume: Costume | null; // Null means creating a new costume
  isOpen: boolean;
  onClose: () => void;
  onSave: (costumeData: Costume) => void;
}

export const CostumeEditModal: React.FC<CostumeEditModalProps> = ({
  costume,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const isEditing = Boolean(costume);

  // Form State
  const [formData, setFormData] = useState<Costume>(() => {
    if (costume) return { ...costume };
    return {
      id: `costume-${Date.now()}`,
      name: '',
      ageCategory: 'Adultos',
      theme: 'Terror',
      type: 'Ambos',
      rentalPricePerDay: 25,
      salePrice: 79,
      sizes: ['S', 'M', 'L', 'XL'],
      depositAmount: 30,
      rating: 5.0,
      reviewCount: 1,
      image: 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      galleryImages: [],
      description: '',
      includes: ['Traje completo', 'Accesorios'],
      stock: 5,
      bookedDates: [],
      isFeatured: false,
      isPopular: false,
    };
  });

  const [newInclude, setNewInclude] = useState('');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newSize, setNewSize] = useState('');

  const themes: CostumeTheme[] = ['Terror', 'Superhéroes', 'Época & Épico', 'Películas & Series', 'Fantasía & Cuentos', 'Animales & Divertidos'];
  const ageCategories: AgeCategory[] = ['Niños', 'Adultos'];
  const purchaseTypes: PurchaseType[] = ['Alquiler', 'Venta', 'Ambos'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Por favor introduce un nombre para el disfraz');
      return;
    }
    if (!formData.image.trim()) {
      alert('Por favor introduce la URL de la imagen principal');
      return;
    }
    onSave(formData);
    onClose();
  };

  const handleAddInclude = () => {
    if (newInclude.trim()) {
      setFormData(prev => ({
        ...prev,
        includes: [...prev.includes, newInclude.trim()]
      }));
      setNewInclude('');
    }
  };

  const handleRemoveInclude = (index: number) => {
    setFormData(prev => ({
      ...prev,
      includes: prev.includes.filter((_, i) => i !== index)
    }));
  };

  const handleAddGalleryImage = () => {
    if (newGalleryUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        galleryImages: [...(prev.galleryImages || []), newGalleryUrl.trim()]
      }));
      setNewGalleryUrl('');
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: (prev.galleryImages || []).filter((_, i) => i !== index)
    }));
  };

  const toggleSize = (sz: string) => {
    if (formData.sizes.includes(sz)) {
      if (formData.sizes.length > 1) {
        setFormData(prev => ({
          ...prev,
          sizes: prev.sizes.filter(s => s !== sz)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, sz]
      }));
    }
  };

  const handleAddCustomSize = () => {
    if (newSize.trim() && !formData.sizes.includes(newSize.trim())) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, newSize.trim()]
      }));
      setNewSize('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#121218] border border-orange-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-orange-950/60 my-8">
        
        {/* Modal Header */}
        <div className="bg-zinc-900/90 border-b border-zinc-800 p-5 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
              {isEditing ? <Image className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-xl font-black text-white">
                {isEditing ? `Editar Disfraz: ${costume?.name}` : 'Añadir Nuevo Disfraz al Catálogo'}
              </h2>
              <p className="text-xs text-zinc-400">
                Gestiona la información comercial, fotos, video demostrativo y stock
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-800 hover:bg-orange-500 hover:text-black text-zinc-300 transition-all border border-zinc-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Section 1: Basic Info */}
          <div className="space-y-4 bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800">
            <h3 className="text-sm font-black text-orange-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-orange-400" />
              <span>1. Información General del Disfraz</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Nombre del Disfraz *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Conde Drácula Gothic Elegance"
                  className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">Categoría Edad</label>
                  <select
                    value={formData.ageCategory}
                    onChange={e => setFormData({ ...formData, ageCategory: e.target.value as AgeCategory })}
                    className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                  >
                    {ageCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">Modalidad</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value as PurchaseType })}
                    className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                  >
                    {purchaseTypes.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Temática</label>
                <select
                  value={formData.theme}
                  onChange={e => setFormData({ ...formData, theme: e.target.value as CostumeTheme })}
                  className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                >
                  {themes.map(th => (
                    <option key={th} value={th}>{th}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Stock Disponible en Almacén</label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                  className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Descripción Detallada</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe las características principales del traje, materiales y acabados..."
                className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Section 2: Pricing & Deposit */}
          <div className="space-y-4 bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800">
            <h3 className="text-sm font-black text-orange-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-orange-400" />
              <span>2. Precios y Fianza de Garantía</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Alquiler (€/Día)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={formData.rentalPricePerDay}
                    onChange={e => setFormData({ ...formData, rentalPricePerDay: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500 pr-8"
                  />
                  <span className="absolute right-3 top-2 text-xs text-zinc-400">€</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Precio Venta Nuevos (€)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={formData.salePrice}
                    onChange={e => setFormData({ ...formData, salePrice: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500 pr-8"
                  />
                  <span className="absolute right-3 top-2 text-xs text-zinc-400">€</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Fianza Reembolsable (€)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={formData.depositAmount}
                    onChange={e => setFormData({ ...formData, depositAmount: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500 pr-8"
                  />
                  <span className="absolute right-3 top-2 text-xs text-zinc-400">€</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured || false}
                  onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 rounded accent-orange-500"
                />
                <span className="text-xs font-bold text-zinc-200">Destacar en Portada</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPopular || false}
                  onChange={e => setFormData({ ...formData, isPopular: e.target.checked })}
                  className="w-4 h-4 rounded accent-orange-500"
                />
                <span className="text-xs font-bold text-zinc-200">Marcar como "Más Popular"</span>
              </label>
            </div>
          </div>

          {/* Section 3: Media Management (Photos & Video) */}
          <div className="space-y-4 bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800">
            <h3 className="text-sm font-black text-orange-400 uppercase tracking-wider flex items-center gap-2">
              <Image className="w-4 h-4 text-orange-400" />
              <span>3. Edición de Contenido Multimedia (Fotos y Videos)</span>
            </h3>

            {/* Main Image URL */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">URL Foto Principal *</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              {formData.image && (
                <div className="mt-2 flex items-center gap-3 bg-black/40 p-2 rounded-xl border border-zinc-800">
                  <img src={formData.image} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-zinc-700" />
                  <span className="text-xs text-zinc-400">Vista previa de la imagen de portada</span>
                </div>
              )}
            </div>

            {/* Video URL */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-orange-400" />
                <span>URL de Video Promocional / Demostración (MP4, WebM o Youtube)</span>
              </label>
              <input
                type="text"
                value={formData.videoUrl || ''}
                onChange={e => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="https://www.w3schools.com/html/mov_bbb.mp4"
                className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
              />
              <p className="text-[11px] text-zinc-500 mt-1">
                Añadir un video aumenta hasta un 40% las reservas. Puedes usar enlaces directos a archivos de video MP4/WebM.
              </p>
            </div>

            {/* Gallery Images */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-300">Fotos Adicionales para la Galería</label>
              
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newGalleryUrl}
                  onChange={e => setNewGalleryUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/otra-foto..."
                  className="flex-1 bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
                <button
                  type="button"
                  onClick={handleAddGalleryImage}
                  className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-3 py-2 rounded-xl text-xs transition-all flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Foto</span>
                </button>
              </div>

              {formData.galleryImages && formData.galleryImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
                  {formData.galleryImages.map((gUrl, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden border border-zinc-800 bg-black">
                      <img src={gUrl} alt={`Galeria ${idx}`} className="w-full h-20 object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(idx)}
                        className="absolute top-1 right-1 bg-red-600/90 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Section 4: Sizes & Includes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800">
            
            {/* Sizes */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-2">Tallas Disponibles</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {['S', 'M', 'L', 'XL', 'Talla Única Adulto', 'Niño 3-5 años', 'Niño 6-8 años', 'Niño 9-12 años'].map(sz => {
                  const isSelected = formData.sizes.includes(sz);
                  return (
                    <button
                      type="button"
                      key={sz}
                      onClick={() => toggleSize(sz)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                        isSelected ? 'bg-orange-500 text-black border-orange-400' : 'bg-black/60 text-zinc-400 border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSize}
                  onChange={e => setNewSize(e.target.value)}
                  placeholder="Otra talla..."
                  className="flex-1 bg-black/60 border border-zinc-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                />
                <button
                  type="button"
                  onClick={handleAddCustomSize}
                  className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-xl text-xs font-bold border border-zinc-700"
                >
                  Añadir
                </button>
              </div>
            </div>

            {/* Includes list */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-2">Qué incluye el disfraz</label>
              <div className="space-y-1.5 mb-2">
                {formData.includes.map((inc, i) => (
                  <div key={i} className="flex items-center justify-between bg-black/60 px-3 py-1.5 rounded-lg border border-zinc-800 text-xs text-zinc-300">
                    <span>• {inc}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveInclude(i)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newInclude}
                  onChange={e => setNewInclude(e.target.value)}
                  placeholder="Ej: Colmillos, Capa..."
                  className="flex-1 bg-black/60 border border-zinc-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                />
                <button
                  type="button"
                  onClick={handleAddInclude}
                  className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-xl text-xs font-bold border border-zinc-700"
                >
                  + Agregar
                </button>
              </div>
            </div>

          </div>

          {/* Footer Submit Button */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs transition-all border border-zinc-700"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-extrabold text-xs transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Guardar Cambios' : 'Crear Disfraz'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
