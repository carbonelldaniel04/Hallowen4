export type AgeCategory = 'Niños' | 'Adultos' | 'Todos';
export type PurchaseType = 'Alquiler' | 'Venta' | 'Ambos';
export type CostumeTheme = 'Terror' | 'Superhéroes' | 'Películas & Series' | 'Época & Épico' | 'Fantasía & Cuentos' | 'Animales & Divertidos';

export interface Costume {
  id: string;
  name: string;
  ageCategory: AgeCategory; // 'Niños' | 'Adultos'
  theme: CostumeTheme;
  type: PurchaseType; // 'Alquiler' | 'Venta' | 'Ambos'
  rentalPricePerDay: number;
  salePrice: number;
  sizes: string[];
  depositAmount: number; // Deposit required for rental
  rating: number;
  reviewCount: number;
  image: string;
  videoUrl?: string;
  galleryImages?: string[];
  description: string;
  includes: string[];
  isFeatured?: boolean;
  isPopular?: boolean;
  stock: number;
  // Dates in format YYYY-MM-DD that are already booked for this costume
  bookedDates: string[];
}

export type BookingStatus = 'Confirmada' | 'En preparación' | 'Listo para Recogida' | 'Completada' | 'Cancelada';

export interface Booking {
  id: string;
  costumeId: string;
  costumeName: string;
  costumeImage: string;
  type: 'Alquiler' | 'Venta';
  size: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD (same as startDate for Venta)
  totalDays: number;
  dailyRate: number;
  totalPrice: number;
  depositAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  fulfillmentType: 'Recogida en Tienda' | 'Envío a Domicilio';
  address?: string;
  notes?: string;
  status: BookingStatus;
  createdAt: string;
  qrCodeSeed: string;
}

export interface CartItem {
  costume: Costume;
  type: 'Alquiler' | 'Venta';
  size: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  price: number;
  deposit: number;
}

export interface FilterState {
  searchQuery: string;
  ageCategory: 'Todos' | 'Niños' | 'Adultos';
  theme: 'Todos' | CostumeTheme;
  type: 'Todos' | 'Alquiler' | 'Venta';
  maxPrice: number;
  selectedSize: string;
  sortBy: 'popular' | 'price-low' | 'price-high' | 'rating';
}
