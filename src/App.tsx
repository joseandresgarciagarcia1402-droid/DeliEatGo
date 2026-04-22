/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ShoppingBag, 
  Clock, 
  Star, 
  Heart, 
  ChevronRight, 
  MapPin, 
  Menu,
  Sparkles,
  Leaf,
  Zap,
  Utensils,
  Wine,
  ShoppingCart,
  Store,
  Pill,
  Home,
  User,
  History,
  Bell,
  MessageCircle,
  Send,
  CreditCard,
  Plus,
  LogOut,
  Settings,
  Phone,
  Mail,
  Car,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

type ThemeMode = 'light' | 'dark';
type UserRole = 'client' | 'driver' | 'partner' | null;
type AppView = 'role-selection' | 'login' | 'main';
type BusinessType = 'Restaurante' | 'Licor Store' | 'Supermercado' | 'Tienda' | 'Farmacia';

interface PartnerOrder extends Order {
  customerName: string;
  customerPhone: string;
  chatOpen?: boolean;
  driverFound?: boolean;
  isSearchingDriver?: boolean;
}

const LOGO_URL = "https://lh3.googleusercontent.com/d/131MAFFEBJ0h31ihraicy_p-Tk8rBZ7G3";

const DeliCar = ({ className = "w-12 h-12" }: { className?: string }) => (
  <img 
    src={LOGO_URL} 
    alt="DeliEatGo Icon" 
    className={`${className} object-contain`} 
    referrerPolicy="no-referrer"
  />
);

const Logo = ({ className = "", showTagline = false, isDark = false }: { className?: string, showTagline?: boolean, isDark?: boolean }) => (
  <div className={`flex flex-col items-center ${className}`}>
    <img 
      src={LOGO_URL} 
      alt="DeliEatGo Logo" 
      className="w-48 h-auto object-contain" 
      referrerPolicy="no-referrer"
      style={{ filter: isDark ? 'brightness(1.2)' : 'none' }}
    />
    {/* Tagline is already part of the official logo image usually, but if not we can keep it or remove it based on the image content */}
  </div>
);

interface Category {
  id: string;
  name: string;
  icon: any;
  color: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
}

interface Item {
  id: number;
  name: string;
  price?: string;
  rating: number;
  time: string;
  image: string;
  category: string;
  type: 'restaurant' | 'store' | 'pharmacy';
  products: Product[];
}

const CATEGORIES: Category[] = [
  { id: 'rest', name: 'Restaurantes', icon: Utensils, color: 'bg-orange-100 text-orange-600' },
  { id: 'liq', name: 'Licores', icon: Wine, color: 'bg-purple-100 text-purple-600' },
  { id: 'super', name: 'Supermercado', icon: ShoppingCart, color: 'bg-green-100 text-green-600' },
  { id: 'shop', name: 'Tiendas', icon: Store, color: 'bg-blue-100 text-blue-600' },
  { id: 'pharm', name: 'Farmacia', icon: Pill, color: 'bg-red-100 text-red-600' },
];

const ITEMS: Item[] = [
  // Restaurantes
  {
    id: 1,
    name: "Burger King - Centro",
    rating: 4.5,
    time: "15-25 min",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    category: "Restaurantes",
    type: 'restaurant',
    products: [
      { id: 101, name: "Whopper Clásico", price: "$8.50", description: "La hamburguesa a la parrilla más famosa.", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=400&q=80" },
      { id: 102, name: "Papas Fritas Grandes", price: "$3.20", description: "Crujientes y doradas.", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80" },
      { id: 103, name: "Nuggets x10", price: "$5.00", description: "Pollo tierno con empanizado crujiente.", image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    id: 5,
    name: "Pizza Hut Express",
    rating: 4.3,
    time: "20-35 min",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    category: "Restaurantes",
    type: 'restaurant',
    products: [
      { id: 501, name: "Pepperoni Lovers", price: "$12.00", description: "Doble pepperoni y extra queso.", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80" },
      { id: 502, name: "Pan Pizza Hawaiana", price: "$11.50", description: "Piña, jamón y queso.", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    id: 6,
    name: "Sushi Zen Master",
    rating: 4.9,
    time: "30-45 min",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    category: "Restaurantes",
    type: 'restaurant',
    products: [
      { id: 601, name: "California Roll", price: "$9.00", description: "Cangrejo, aguacate y pepino.", image: "https://images.unsplash.com/photo-1559466273-d95e72debaf8?auto=format&fit=crop&w=400&q=80" },
      { id: 602, name: "Sashimi de Salmón", price: "$14.00", description: "Cortes frescos de salmón premium.", image: "https://images.unsplash.com/photo-1534422298391-e4f8c170db06?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  // Farmacia
  {
    id: 2,
    name: "Farmacia San Pablo",
    rating: 4.9,
    time: "10-20 min",
    image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=800&q=80",
    category: "Farmacia",
    type: 'pharmacy',
    products: [
      { id: 201, name: "Paracetamol 500mg", price: "$4.50", description: "Caja con 20 tabletas.", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80" },
      { id: 202, name: "Vitamina C Efervescente", price: "$8.00", description: "Refuerza tus defensas.", image: "https://images.unsplash.com/photo-1616671285410-994363290946?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    id: 7,
    name: "CVS Pharmacy",
    rating: 4.6,
    time: "15-25 min",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=800&q=80",
    category: "Farmacia",
    type: 'pharmacy',
    products: [
      { id: 701, name: "Protector Solar SPF 50", price: "$15.00", description: "Protección total para tu piel.", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80" },
      { id: 702, name: "Kit de Primeros Auxilios", price: "$22.00", description: "Esencial para el hogar.", image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  // Supermercado
  {
    id: 3,
    name: "Walmart Supercenter",
    rating: 4.7,
    time: "30-50 min",
    image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=800&q=80",
    category: "Supermercado",
    type: 'store',
    products: [
      { id: 301, name: "Leche Entera 1L", price: "$1.50", description: "Fresco y nutritivo.", image: "https://images.unsplash.com/photo-1563636619-e9107daaf721?auto=format&fit=crop&w=400&q=80" },
      { id: 302, name: "Pack de Huevos x12", price: "$3.00", description: "Huevos de granja frescos.", image: "https://images.unsplash.com/photo-1587486914663-75e23927cf39?auto=format&fit=crop&w=400&q=80" },
      { id: 303, name: "Pan de Caja Integral", price: "$2.80", description: "Alto en fibra.", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    id: 8,
    name: "Whole Foods Market",
    rating: 4.8,
    time: "25-40 min",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    category: "Supermercado",
    type: 'store',
    products: [
      { id: 801, name: "Aceite de Oliva Orgánico", price: "$18.00", description: "Extra virgen, primera prensa.", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80" },
      { id: 802, name: "Miel de Abeja Pura", price: "$12.00", description: "Sin aditivos ni conservadores.", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  // Licores
  {
    id: 4,
    name: "The Wine Store",
    rating: 4.8,
    time: "20-30 min",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    category: "Licores",
    type: 'store',
    products: [
      { id: 401, name: "Vino Tinto Malbec", price: "$25.00", description: "Reserva especial 2021.", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80" },
      { id: 402, name: "Champagne Brut", price: "$45.00", description: "Perfecto para celebraciones.", image: "https://images.unsplash.com/photo-1594460753070-ad5a96aa5d47?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    id: 9,
    name: "Craft Beer Garden",
    rating: 4.7,
    time: "15-25 min",
    image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=800&q=80",
    category: "Licores",
    type: 'store',
    products: [
      { id: 901, name: "IPA Artesanal", price: "$6.00", description: "Intenso aroma a lúpulo.", image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=400&q=80" },
      { id: 902, name: "Stout de Chocolate", price: "$7.00", description: "Notas de café y cacao.", image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  // Tiendas
  {
    id: 10,
    name: "Apple Store",
    rating: 4.9,
    time: "40-60 min",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80",
    category: "Tiendas",
    type: 'store',
    products: [
      { id: 1001, name: "iPhone 15 Pro", price: "$999.00", description: "Titanio, chip A17 Pro.", image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=400&q=80" },
      { id: 1002, name: "AirPods Pro 2", price: "$249.00", description: "Cancelación de ruido activa.", image: "https://images.unsplash.com/photo-1588423770574-91993ca0a85a?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    id: 11,
    name: "Nike Factory",
    rating: 4.8,
    time: "30-45 min",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    category: "Tiendas",
    type: 'store',
    products: [
      { id: 1101, name: "Air Max 270", price: "$150.00", description: "Comodidad y estilo icónico.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" },
      { id: 1102, name: "Nike Tech Fleece", price: "$110.00", description: "Calidez sin peso.", image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=400&q=80" }
    ]
  }
];

interface Driver {
  name: string;
  photo: string;
  rating: number;
  vehicle: string;
}

interface Order {
  id: string;
  storeName: string;
  date: string;
  total: string;
  status: 'Entregado' | 'En camino' | 'Preparando';
  items: string[];
  driver?: Driver;
}

const ORDERS_DATA: Order[] = [
  {
    id: "ORD-9921",
    storeName: "Burger King - Centro",
    date: "Hoy, 12:45 PM",
    total: "$12.50",
    status: "En camino",
    items: ["Whopper Clásico", "Papas Fritas"],
    driver: {
      name: "Carlos Rodríguez",
      photo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=200&q=80",
      rating: 4.8,
      vehicle: "Moto Honda Blanca"
    }
  },
  {
    id: "ORD-8812",
    storeName: "Farmacia San Pablo",
    date: "Ayer, 03:20 PM",
    total: "$8.00",
    status: "Entregado",
    items: ["Vitamina C Efervescente"],
    driver: {
      name: "Ana Martínez",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      rating: 4.9,
      vehicle: "Bicicleta Eléctrica"
    }
  },
  {
    id: "ORD-7754",
    storeName: "Apple Store",
    date: "07 Abr, 10:15 AM",
    total: "$249.00",
    status: "Entregado",
    items: ["AirPods Pro 2"],
    driver: {
      name: "Luis García",
      photo: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200&q=80",
      rating: 4.7,
      vehicle: "Auto Toyota Gris"
    }
  }
];

interface PaymentMethod {
  id: string;
  type: 'Visa' | 'Mastercard' | 'PayPal';
  last4?: string;
  email?: string;
}

const Splash = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Logo showTagline className="scale-100" />
      </motion.div>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: 100 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="h-1 bg-deli-teal rounded-full mt-12"
      />
    </motion.div>
  );
};

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [role, setRole] = useState<UserRole>(null);
  const [view, setView] = useState<AppView>('role-selection');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [mode, setMode] = useState<ThemeMode>('light');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<Item | null>(null);
  const [selectedChat, setSelectedChat] = useState<Order | null>(null);
  const [selectedTracking, setSelectedTracking] = useState<Order | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'payment' | 'processing' | 'success' | null>(null);
  const [cart, setCart] = useState<{product: Product, store: Item, quantity: number}[]>([]);
  const [notifications, setNotifications] = useState<{id: string, title: string, message: string, time: string, read: boolean}[]>([
    { id: '1', title: '¡Bienvenido a DeliEatGo!', message: 'Disfruta de envíos gratis en tu primera compra.', time: 'Hace 2 min', read: false }
  ]);
  const [orders, setOrders] = useState<Order[]>(ORDERS_DATA);
  const [chatMessage, setChatMessage] = useState("");
  
  // Search History State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showSearchHistory, setShowSearchHistory] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('deliEatGo_searchHistory');
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing search history", e);
      }
    }
  }, []);

  const addToSearchHistory = (term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...searchHistory.filter(h => h !== term)].slice(0, 8);
    setSearchHistory(updated);
    localStorage.setItem('deliEatGo_searchHistory', JSON.stringify(updated));
  };
  
  // Partner specific state
  const [partnerActiveTab, setPartnerActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'profile'>('dashboard');
  const [businessType, setBusinessType] = useState<BusinessType | null>(null);
  const [partnerProducts, setPartnerProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showTopProductsDetail, setShowTopProductsDetail] = useState(false);
  const [viewingDriverProfile, setViewingDriverProfile] = useState<any>(null);
  const [showAdminChat, setShowAdminChat] = useState(false);
  const [showFAQs, setShowFAQs] = useState(false);
  const [partnerOrders, setPartnerOrders] = useState<PartnerOrder[]>([
    {
      id: "ORD-1001",
      storeName: "Mi Negocio",
      customerName: "Laura Méndez",
      customerPhone: "809-555-0123",
      date: "Hoy, 10:30 AM",
      total: "$45.00",
      status: "Pendiente",
      items: ["Combo Deluxe", "Refresco 500ml"]
    },
    {
      id: "ORD-1002",
      storeName: "Mi Negocio",
      customerName: "Ricardo Díaz",
      customerPhone: "829-111-2233",
      date: "Hace 5 min",
      total: "$28.50",
      status: "En camino",
      driverFound: true,
      items: ["Burrito Supremo", "Nachos de la casa"],
      driver: {
        name: "Carlos Rodríguez",
        photo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
        rating: 4.8,
        vehicle: "Honda Civic Gris (A-55234)"
      }
    }
  ]);
  const [partnerEarnings, setPartnerEarnings] = useState(1250.75);
  const [partnerProfile, setPartnerProfile] = useState({
    businessName: "DeliEat Palace",
    cedula: "001-1234567-8",
    bank: "Banco Popular",
    accountType: "Ahorros" as "Ahorros" | "Corriente",
    accountNumber: "960456123",
    phone: "809-555-9988",
    email: "palace@delieatgo.com",
    address: "Av. Abraham Lincoln #1002, SD",
    operatingDays: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
  });

  // Profile Section States
  const [activeProfileSection, setActiveProfileSection] = useState<string | null>(null);
  const [vehicleType, setVehicleType] = useState<'motor' | 'car' | null>(null);
  
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: '1', type: 'Visa', last4: '4242' },
    { id: '2', type: 'PayPal', email: 'jose***@gmail.com' }
  ]);

  // Driver specific state
  const [driverEarnings, setDriverEarnings] = useState(125.50);
  const [driverOrders, setDriverOrders] = useState([
    { id: 'ORD-5521', client: 'María López', address: 'Av. Central 456', total: '$24.50', status: 'Completado', time: '14:20' },
    { id: 'ORD-5522', client: 'Juan Pérez', address: 'Calle Luna 789', total: '$18.00', status: 'Completado', time: '15:45' },
    { id: 'ORD-5523', client: 'Ana García', address: 'Paseo del Sol 12', total: '$32.20', status: 'Completado', time: '16:30' },
  ]);

  const user = {
    name: "José Andrés García",
    email: "joseandresgarciagarcia1402@gmail.com",
    phone: "+1 (555) 123-4567",
    photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
  };

  const current = {
    bg: mode === 'light' ? 'bg-white' : 'bg-black',
    text: mode === 'light' ? 'text-deli-dark' : 'text-white',
    card: mode === 'light' ? 'bg-white border border-gray-100 shadow-sm' : 'bg-zinc-900 border border-zinc-800',
    accent: 'bg-deli-teal text-white',
    secondary: 'bg-deli-orange text-white',
    font: 'font-sans',
    headerFont: 'font-display font-bold tracking-tight',
  };

  const addToCart = (product: Product, store: Item) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, store, quantity: 1 }];
    });
    
    // Simple feedback notification
    const newNotif = {
      id: Date.now().toString(),
      title: 'Producto añadido',
      message: `${product.name} se agregó al carrito.`,
      time: 'Ahora',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const cartTotal = cart.reduce((acc, item) => {
    const price = parseFloat(item.product.price.replace('$', ''));
    return acc + (price * item.quantity);
  }, 0);

  const handleCheckout = () => {
    setCheckoutStep('processing');
    
    // Simulate payment process
    setTimeout(() => {
      setCheckoutStep('success');
      setCart([]);
      
      // Add success notifications
      const paymentNotif = {
        id: (Date.now() + 1).toString(),
        title: 'Pago Realizado con Éxito',
        message: `Tu pago de $${cartTotal.toFixed(2)} ha sido procesado correctamente.`,
        time: 'Ahora',
        read: false
      };
      
      const driverNotif = {
        id: (Date.now() + 2).toString(),
        title: 'Socio Conductor Asignado',
        message: 'Carlos Rodríguez ha sido asignado a tu pedido y está en camino al local.',
        time: 'Ahora',
        read: false
      };
      
      setNotifications(prev => [driverNotif, paymentNotif, ...prev]);

      // Add to orders history
      const newOrder: Order = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        storeName: cart[0]?.store.name || "DeliEatGo Store",
        date: "Hoy, ahora",
        total: `$${cartTotal.toFixed(2)}`,
        status: "Preparando",
        items: cart.map(i => i.product.name),
        driver: {
          name: "Carlos Rodríguez",
          photo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=200&q=80",
          rating: 4.8,
          vehicle: "Moto Honda Blanca"
        }
      };
      setOrders(prev => [newOrder, ...prev]);
    }, 2500);
  };

  const filteredItems = (selectedCategory 
    ? ITEMS.filter(item => item.category === selectedCategory)
    : ITEMS).filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.products.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === 'client') {
      setView('main');
      setIsLoggedIn(true);
    } else {
      setView('login');
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setView('main');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('role-selection');
    setRole(null);
  };

  const acceptPartnerOrder = (orderId: string) => {
    // 1. Update status to Accepted (Show Success Message first)
    setPartnerOrders(prev => prev.map(o => 
      o.id === orderId ? { ...o, status: 'Preparando', isSearchingDriver: false } : o
    ));

    // 2. Notify Client (Simulated)
    const clientNotif = {
      id: Date.now().toString(),
      title: '¡Pedido Aceptado!',
      message: 'El comercio ha aceptado tu pedido y está preparando tus productos.',
      time: 'Ahora',
      read: false
    };
    setNotifications(prev => [clientNotif, ...prev]);

    // 3. Pause for Success Message then Start searching for a driver
    setTimeout(() => {
      setPartnerOrders(prev => prev.map(o => 
        o.id === orderId ? { ...o, isSearchingDriver: true } : o
      ));

      // 4. Simulated searching for a driver
      setTimeout(() => {
        setPartnerOrders(prev => prev.map(o => {
          if (o.id === orderId) {
            return {
              ...o,
              isSearchingDriver: false,
              driverFound: true,
              status: 'En camino',
              driver: {
                name: "Marcos Medina",
                photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
                rating: 4.9,
                vehicle: "Moto Yamaha Azul"
              }
            };
          }
          return o;
        }));

        // Notify Business
        const businessNotif = {
          id: (Date.now()+1).toString(),
          title: 'Conductor Asignado',
          message: 'Marcos Medina ha sido asignado y llegará en 5 minutos.',
          time: 'Ahora',
          read: false
        };
        setNotifications(prev => [businessNotif, ...prev]);
      }, 3000);
    }, 2000);
  };

  if (!isLoaded) {
    return <Splash onComplete={() => setIsLoaded(true)} />;
  }

  if (view === 'role-selection') {
    return (
      <div className={`min-h-screen ${current.bg} ${current.text} flex flex-col items-center justify-center p-6`}>
        <Logo showTagline className="mb-12 scale-100" isDark={mode === 'dark'} />
        <h2 className={`text-2xl ${current.headerFont} mb-8 text-center`}>Bienvenido a DeliEatGo</h2>
        <p className="text-sm opacity-60 mb-12 text-center px-8">Selecciona tu perfil para continuar</p>
        
        <div className="w-full max-w-xs space-y-4">
          {[
            { id: 'client', label: 'Cliente', icon: User, color: 'bg-deli-teal' },
            { id: 'driver', label: 'Socio Conductor', icon: DeliCar, color: 'bg-deli-orange' },
            { id: 'partner', label: 'Socio de Negocio', icon: Store, color: 'bg-deli-dark' }
          ].map((item) => (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRoleSelect(item.id as UserRole)}
              className={`w-full p-6 ${current.card} rounded-3xl flex items-center gap-6 group hover:border-deli-teal transition-all`}
            >
              <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-lg font-bold">{item.label}</span>
              <ChevronRight className="w-5 h-5 ml-auto opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </motion.button>
          ))}
        </div>
        
        <button 
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          className="mt-12 p-3 rounded-full bg-gray-100 dark:bg-zinc-800"
        >
          {mode === 'light' ? <Zap className="w-5 h-5 text-deli-orange" /> : <Sparkles className="w-5 h-5 text-deli-teal" />}
        </button>
      </div>
    );
  }

  if (view === 'login') {
    return (
      <div className={`min-h-screen ${current.bg} ${current.text} flex flex-col p-8`}>
        <button onClick={() => setView('role-selection')} className="mb-8 self-start p-2 rounded-full bg-gray-100 dark:bg-zinc-800">
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        
        <Logo className="mb-12 scale-90" isDark={mode === 'dark'} />
        
        <h2 className={`text-3xl ${current.headerFont} mb-2`}>
          {role === 'driver' ? 'Ingreso Conductor' : 'Ingreso Negocio'}
        </h2>
        <p className="text-sm opacity-60 mb-12">Ingresa tus credenciales para comenzar tu jornada</p>
        
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-bold uppercase opacity-50 ml-1">Correo Electrónico</label>
            <div className={`flex items-center gap-3 p-4 mt-1 ${current.card} rounded-2xl`}>
              <Mail className="w-5 h-5 opacity-30" />
              <input type="email" placeholder="nombre@ejemplo.com" className="bg-transparent border-none outline-none text-sm w-full" />
            </div>
          </div>
          
          <div>
            <label className="text-[10px] font-bold uppercase opacity-50 ml-1">Contraseña</label>
            <div className={`flex items-center gap-3 p-4 mt-1 ${current.card} rounded-2xl`}>
              <Zap className="w-5 h-5 opacity-30" />
              <input type="password" placeholder="••••••••" className="bg-transparent border-none outline-none text-sm w-full" />
            </div>
          </div>
          
          <button className="text-xs font-bold text-deli-teal text-right w-full">¿Olvidaste tu contraseña?</button>
          
          <button 
            onClick={handleLogin}
            className={`w-full py-5 ${current.accent} font-bold rounded-2xl shadow-xl shadow-deli-teal/20 mt-8`}
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  // Main App View for Driver
  if (role === 'driver') {
    return (
      <div className={`min-h-screen transition-colors duration-500 ${current.bg} ${current.text} ${current.font} flex flex-col items-center`}>
        <div className="w-full max-w-md min-h-screen bg-inherit relative pb-24 shadow-2xl overflow-x-hidden text-left">
          
          {/* Driver Header */}
          <header className="p-6 pb-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-deli-teal">
                  <img src={user.photo} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="text-[10px] font-bold opacity-50">Hola, Conductor</p>
                  <h3 className="text-sm font-bold">{user.name}</h3>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowNotifications(true)}
                  className={`p-2 ${current.card} rounded-full relative`}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-3 h-3 bg-deli-red border-2 border-white rounded-full" />
                </button>
                <button 
                  onClick={handleLogout}
                  className={`p-2 ${current.card} rounded-full`}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Earnings Card */}
            <div className={`p-6 ${current.accent} rounded-[32px] shadow-xl shadow-deli-teal/20 mb-8 relative overflow-hidden`}>
              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Saldo de hoy</p>
                <h2 className="text-4xl font-display font-black tracking-tighter mb-4">
                  ${driverEarnings.toFixed(2)}
                </h2>
                <div className="flex gap-4">
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2">
                    <History className="w-3 h-3" />
                    <span className="text-[10px] font-bold">8 Pedidos</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-[10px] font-bold">4.9</span>
                  </div>
                </div>
              </div>
              <Zap className="absolute right-[-20px] bottom-[-20px] w-40 h-40 opacity-10 rotate-12" />
            </div>
          </header>

          {/* Driver Tabs */}
          <div className="px-6 py-2 flex gap-4 mb-4">
            <button 
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'home' ? 'bg-deli-teal text-white shadow-lg shadow-deli-teal/20' : 'bg-deli-teal/10 text-deli-teal'}`}
            >
              Jornada Actual
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'history' ? 'bg-deli-teal text-white shadow-lg shadow-deli-teal/20' : 'bg-deli-teal/10 text-deli-teal'}`}
            >
              Historial
            </button>
          </div>

          {/* Driver Content */}
          <main className="px-6">
            {activeTab === 'home' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`text-lg ${current.headerFont}`}>Pedidos Recientes</h4>
                  <span className="text-[10px] font-bold text-deli-teal">Ver mapa</span>
                </div>
                
                {driverOrders.map((order) => (
                  <div key={order.id} className={`${current.card} p-4 rounded-2xl`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h5 className="text-sm font-bold">{order.client}</h5>
                        <p className="text-[10px] opacity-60">{order.address}</p>
                      </div>
                      <span className="text-xs font-bold text-deli-teal">{order.total}</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-50 dark:border-zinc-800">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 opacity-40" />
                        <span className="text-[10px] opacity-60">{order.time}</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 bg-green-100 text-green-600 rounded-md">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Simulated New Order Notification */}
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="p-6 bg-deli-dark text-white rounded-[32px] border-2 border-deli-teal shadow-2xl relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2 h-2 bg-deli-teal rounded-full animate-pulse" />
                      <p className="text-[10px] font-bold uppercase tracking-widest text-deli-teal">¡Nuevo Pedido Disponible!</p>
                    </div>
                    <h4 className="text-xl font-bold mb-1">Burger King - Centro</h4>
                    <p className="text-xs opacity-60 mb-6">A 1.2 km de tu ubicación actual</p>
                    
                    <div className="flex gap-3">
                      <button className="flex-1 py-3 bg-deli-red/10 text-deli-red font-bold rounded-xl text-xs border border-deli-red/20">Rechazar</button>
                      <button className="flex-1 py-3 bg-deli-teal text-white font-bold rounded-xl text-xs shadow-lg shadow-deli-teal/20">Aceptar</button>
                    </div>
                  </div>
                  <ShoppingCart className="absolute right-[-10px] top-[-10px] w-24 h-24 opacity-5 -rotate-12" />
                </motion.div>
              </div>
            ) : activeTab === 'history' ? (
              <div className="space-y-4">
                <h4 className={`text-lg ${current.headerFont}`}>Historial de Ganancias</h4>
                <div className={`${current.card} p-6 rounded-3xl`}>
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-sm font-bold">Esta semana</p>
                    <span className="text-lg font-black text-deli-teal">$842.00</span>
                  </div>
                  <div className="h-24 flex items-end gap-2">
                    {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                      <div key={i} className="flex-1 bg-deli-teal/20 rounded-t-md relative group">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          className="w-full bg-deli-teal rounded-t-md"
                        />
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[8px] font-bold">${h * 2}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-[8px] font-bold opacity-40">
                    <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col items-center py-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl mb-4">
                    <img src={user.photo} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="text-xl font-bold">{user.name}</h3>
                  <p className="text-xs opacity-60">Socio Conductor desde 2023</p>
                </div>
                
                <div className="space-y-2">
                  {[
                    { id: 'personal', icon: User, label: 'Información Personal', color: 'text-deli-teal', bg: 'bg-deli-teal/10' },
                    { id: 'payment', icon: CreditCard, label: 'Métodos de Cobro', color: 'text-deli-orange', bg: 'bg-deli-orange/10' },
                    { id: 'vehicle', icon: Settings, label: 'Configuración de Vehículo', color: 'text-deli-dark', bg: 'bg-deli-dark/10' },
                    { id: 'logout', icon: LogOut, label: 'Cerrar Sesión', action: handleLogout, color: 'text-deli-red', bg: 'bg-deli-red/10' }
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <button 
                        onClick={() => item.action ? item.action() : setActiveProfileSection(activeProfileSection === item.id ? null : item.id)}
                        className={`w-full p-4 ${current.card} rounded-2xl flex items-center gap-4 group border border-transparent hover:border-deli-teal/20 transition-all`}
                      >
                        <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span className={`text-sm font-bold ${item.color}`}>{item.label}</span>
                        <ChevronRight className={`w-4 h-4 ml-auto transition-all ${item.color} ${activeProfileSection === item.id ? 'rotate-90' : 'opacity-20 group-hover:opacity-100'}`} />
                      </button>

                      <AnimatePresence>
                        {activeProfileSection === item.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className={`${current.card} p-4 rounded-2xl space-y-4 mb-4`}>
                              {item.id === 'personal' && (
                                <div className="grid grid-cols-1 gap-4">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-deli-teal uppercase ml-1">Nombre</label>
                                    <input type="text" defaultValue={user.name.split(' ')[0]} className="w-full p-4 bg-deli-teal/5 rounded-2xl text-xs font-bold border border-deli-teal/10 outline-none focus:border-deli-teal/30 transition-all" />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-deli-teal uppercase ml-1">Apellido</label>
                                    <input type="text" defaultValue={user.name.split(' ').slice(1).join(' ')} className="w-full p-4 bg-deli-teal/5 rounded-2xl text-xs font-bold border border-deli-teal/10 outline-none focus:border-deli-teal/30 transition-all" />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-deli-teal uppercase ml-1">Correo Electrónico</label>
                                    <input type="email" defaultValue={user.email} className="w-full p-4 bg-deli-teal/5 rounded-2xl text-xs font-bold border border-deli-teal/10 outline-none focus:border-deli-teal/30 transition-all" />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-deli-teal uppercase ml-1">Teléfono</label>
                                    <input type="tel" defaultValue={user.phone} className="w-full p-4 bg-deli-teal/5 rounded-2xl text-xs font-bold border border-deli-teal/10 outline-none focus:border-deli-teal/30 transition-all" />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-deli-teal uppercase ml-1">Cédula</label>
                                    <input type="text" placeholder="000-0000000-0" className="w-full p-4 bg-deli-teal/5 rounded-2xl text-xs font-bold border border-deli-teal/10 outline-none focus:border-deli-teal/30 transition-all" />
                                  </div>
                                  <button className={`w-full py-4 ${current.accent} rounded-2xl text-xs font-bold shadow-lg shadow-deli-teal/20 mt-2 active:scale-[0.98] transition-all`}>Guardar Cambios</button>
                                </div>
                              )}

                              {item.id === 'payment' && (
                                <div className="grid grid-cols-1 gap-4">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-deli-orange uppercase ml-1">Nombre del Titular</label>
                                    <input type="text" placeholder="Nombre" className="w-full p-4 bg-deli-orange/5 rounded-2xl text-xs font-bold border border-deli-orange/10 outline-none focus:border-deli-orange/30 transition-all" />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-deli-orange uppercase ml-1">Apellido del Titular</label>
                                    <input type="text" placeholder="Apellido" className="w-full p-4 bg-deli-orange/5 rounded-2xl text-xs font-bold border border-deli-orange/10 outline-none focus:border-deli-orange/30 transition-all" />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-deli-orange uppercase ml-1">Banco</label>
                                    <div className="relative">
                                      <select className="w-full p-4 bg-deli-orange/5 rounded-2xl text-xs font-bold border border-deli-orange/10 outline-none appearance-none focus:border-deli-orange/30 transition-all">
                                        <option>Banco Popular</option>
                                        <option>Banreservas</option>
                                        <option>BHD León</option>
                                        <option>Scotiabank</option>
                                      </select>
                                      <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 rotate-90 opacity-40 pointer-events-none" />
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-deli-orange uppercase ml-1">Tipo de Cuenta</label>
                                    <div className="relative">
                                      <select className="w-full p-4 bg-deli-orange/5 rounded-2xl text-xs font-bold border border-deli-orange/10 outline-none appearance-none focus:border-deli-orange/30 transition-all">
                                        <option>Ahorros</option>
                                        <option>Corriente</option>
                                      </select>
                                      <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 rotate-90 opacity-40 pointer-events-none" />
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-deli-orange uppercase ml-1">Número de Cuenta</label>
                                    <input type="text" placeholder="0000000000" className="w-full p-4 bg-deli-orange/5 rounded-2xl text-xs font-bold border border-deli-orange/10 outline-none focus:border-deli-orange/30 transition-all" />
                                  </div>
                                  <button className={`w-full py-4 bg-deli-orange text-white rounded-2xl text-xs font-bold shadow-lg shadow-deli-orange/20 mt-2 active:scale-[0.98] transition-all`}>Actualizar Cuenta</button>
                                </div>
                              )}

                              {item.id === 'vehicle' && (
                                <div className="space-y-6">
                                  <div className="flex gap-3 p-1 bg-deli-dark/5 rounded-2xl">
                                    <button 
                                      onClick={() => setVehicleType('motor')}
                                      className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${vehicleType === 'motor' ? 'bg-deli-teal text-white shadow-md' : 'text-deli-dark opacity-40'}`}
                                    >
                                      Motor
                                    </button>
                                    <button 
                                      onClick={() => setVehicleType('car')}
                                      className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${vehicleType === 'car' ? 'bg-deli-teal text-white shadow-md' : 'text-deli-dark opacity-40'}`}
                                    >
                                      Auto
                                    </button>
                                  </div>

                                  {vehicleType === 'motor' && (
                                    <div className="grid grid-cols-1 gap-4">
                                      <div className="grid grid-cols-2 gap-3">
                                        <input type="text" placeholder="Marca" className="w-full p-4 bg-deli-dark/5 rounded-2xl text-xs font-bold border border-deli-dark/10 outline-none focus:border-deli-teal/30 transition-all" />
                                        <input type="text" placeholder="Modelo" className="w-full p-4 bg-deli-dark/5 rounded-2xl text-xs font-bold border border-deli-dark/10 outline-none focus:border-deli-teal/30 transition-all" />
                                      </div>
                                      <div className="grid grid-cols-2 gap-3">
                                        <input type="text" placeholder="Color" className="w-full p-4 bg-deli-dark/5 rounded-2xl text-xs font-bold border border-deli-dark/10 outline-none focus:border-deli-teal/30 transition-all" />
                                        <input type="text" placeholder="Chasis" className="w-full p-4 bg-deli-dark/5 rounded-2xl text-xs font-bold border border-deli-dark/10 outline-none focus:border-deli-teal/30 transition-all" />
                                      </div>
                                      <input type="text" placeholder="Matrícula" className="w-full p-4 bg-deli-dark/5 rounded-2xl text-xs font-bold border border-deli-dark/10 outline-none focus:border-deli-teal/30 transition-all" />
                                      <div className="p-6 border-2 border-dashed border-deli-teal/20 bg-deli-teal/5 rounded-2xl flex flex-col items-center gap-3 group cursor-pointer hover:bg-deli-teal/10 transition-all">
                                        <div className="w-10 h-10 rounded-full bg-deli-teal/10 flex items-center justify-center text-deli-teal">
                                          <Plus className="w-5 h-5" />
                                        </div>
                                        <span className="text-[10px] font-bold text-deli-teal uppercase tracking-wider">Foto del Seguro</span>
                                      </div>
                                      <button className={`w-full py-4 ${current.accent} rounded-2xl text-xs font-bold mt-2 shadow-lg shadow-deli-teal/20`}>Guardar Vehículo</button>
                                    </div>
                                  )}

                                  {vehicleType === 'car' && (
                                    <div className="grid grid-cols-1 gap-4">
                                      <div className="grid grid-cols-2 gap-3">
                                        <input type="text" placeholder="Marca" className="w-full p-4 bg-deli-dark/5 rounded-2xl text-xs font-bold border border-deli-dark/10 outline-none focus:border-deli-teal/30 transition-all" />
                                        <input type="text" placeholder="Año" className="w-full p-4 bg-deli-dark/5 rounded-2xl text-xs font-bold border border-deli-dark/10 outline-none focus:border-deli-teal/30 transition-all" />
                                      </div>
                                      <input type="text" placeholder="Placa" className="w-full p-4 bg-deli-dark/5 rounded-2xl text-xs font-bold border border-deli-dark/10 outline-none focus:border-deli-teal/30 transition-all" />
                                      <div className="grid grid-cols-2 gap-3">
                                        <div className="p-6 border-2 border-dashed border-deli-teal/20 bg-deli-teal/5 rounded-2xl flex flex-col items-center gap-2 cursor-pointer hover:bg-deli-teal/10 transition-all">
                                          <span className="text-[9px] font-bold text-deli-teal uppercase text-center">Foto Matrícula</span>
                                        </div>
                                        <div className="p-6 border-2 border-dashed border-deli-teal/20 bg-deli-teal/5 rounded-2xl flex flex-col items-center gap-2 cursor-pointer hover:bg-deli-teal/10 transition-all">
                                          <span className="text-[9px] font-bold text-deli-teal uppercase text-center">Foto Licencia</span>
                                        </div>
                                      </div>
                                      <div className="p-6 border-2 border-dashed border-deli-teal/20 bg-deli-teal/5 rounded-2xl flex flex-col items-center gap-2 cursor-pointer hover:bg-deli-teal/10 transition-all">
                                        <span className="text-[9px] font-bold text-deli-teal uppercase text-center">Foto Seguro</span>
                                      </div>
                                      <button className={`w-full py-4 ${current.accent} rounded-2xl text-xs font-bold mt-2 shadow-lg shadow-deli-teal/20`}>Guardar Vehículo</button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* Driver Bottom Nav */}
          <nav className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md ${mode === 'light' ? 'bg-white/95 border-t border-deli-teal/10' : 'bg-zinc-900/95 border-t border-deli-teal/10'} backdrop-blur-xl px-8 py-4 flex justify-between items-center z-50`}>
            {[
              { id: 'home', icon: Home, label: 'Inicio' },
              { id: 'history', icon: History, label: 'Ganancias' },
              { id: 'profile', icon: User, label: 'Perfil' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 transition-all ${activeTab === tab.id ? 'scale-110' : 'opacity-30 hover:opacity-100'}`}
              >
                <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? 'text-deli-teal fill-deli-teal/10' : 'text-deli-dark'}`} />
                <span className={`text-[10px] font-bold ${activeTab === tab.id ? 'text-deli-teal' : 'text-deli-dark'}`}>{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Notifications Overlay for Driver */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-20"
                onClick={() => setShowNotifications(false)}
              >
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className={`w-full max-w-md mx-4 ${current.bg} rounded-3xl p-6 shadow-2xl overflow-hidden`}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-xl ${current.headerFont}`}>Notificaciones</h3>
                    <button className="text-[10px] font-bold text-deli-teal">Marcar todo como leído</button>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-deli-teal/5 border border-deli-teal/10">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-xs font-bold">Incentivo de Fin de Semana</h4>
                        <span className="text-[8px] opacity-40">Ahora</span>
                      </div>
                      <p className="text-[10px] opacity-70 leading-relaxed">Completa 10 pedidos este sábado y gana un bono de $50 extra.</p>
                    </div>
                    <div className="p-4 rounded-2xl opacity-60">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-xs font-bold">Calificación Actualizada</h4>
                        <span className="text-[8px] opacity-40">Hace 2h</span>
                      </div>
                      <p className="text-[10px] opacity-70 leading-relaxed">Tu calificación ha subido a 4.9. ¡Excelente trabajo!</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Main App View for Partner (Business)
  if (role === 'partner') {
    if (!businessType) {
      return (
        <div className={`min-h-screen ${current.bg} ${current.text} flex flex-col p-6`}>
          <div className="flex flex-col items-center mb-12 mt-8">
            <Logo className="scale-90 mb-4" isDark={mode === 'dark'} />
            <h2 className={`text-2xl ${current.headerFont} text-center`}>Configura tu Negocio</h2>
            <p className="text-sm opacity-60 text-center">Para comenzar, selecciona el tipo de negocio que operas.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 max-w-xs mx-auto w-full">
            {[
              { id: 'Restaurante', icon: Utensils, bg: 'bg-orange-100 text-orange-600' },
              { id: 'Licor Store', icon: Wine, bg: 'bg-purple-100 text-purple-600' },
              { id: 'Supermercado', icon: ShoppingCart, bg: 'bg-green-100 text-green-600' },
              { id: 'Tienda', icon: Store, bg: 'bg-blue-100 text-blue-600' },
              { id: 'Farmacia', icon: Pill, bg: 'bg-red-100 text-red-600' }
            ].map((type) => (
              <motion.button
                key={type.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setBusinessType(type.id as BusinessType);
                  // Populate example products based on type
                  const examples: Record<BusinessType, Product[]> = {
                    'Restaurante': [
                      { id: 1, name: "Burger Suprema", price: "$12.00", description: "Carne angus, queso cheddar", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" },
                      { id: 2, name: "Pizza Pepperoni", price: "$15.00", description: "Masa artesanal", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400" }
                    ],
                    'Licor Store': [
                      { id: 3, name: "Vino Tinto Reserva", price: "$25.00", description: "750ml, Cosecha 2021", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400" },
                      { id: 4, name: "Cerveza Artesanal x6", price: "$18.00", description: "Pack variado", image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400" }
                    ],
                    'Supermercado': [
                      { id: 5, name: "Pack de Leche", price: "$6.00", description: "6 unidades de 1L", image: "https://images.unsplash.com/photo-1563636619-e9107daaf721?w=400" },
                      { id: 6, name: "Caja de Huevos x30", price: "$5.50", description: "Grado A", image: "https://images.unsplash.com/photo-1587486914663-75e23927cf39?w=400" }
                    ],
                    'Tienda': [
                      { id: 7, name: "Camiseta Básica", price: "$15.00", description: "100% Algodón", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400" },
                      { id: 8, name: "Gorra Deportiva", price: "$10.00", description: "Ajustable", image: "https://images.unsplash.com/photo-1588850567041-38290ba1f22e?w=400" }
                    ],
                    'Farmacia': [
                      { id: 9, name: "Multivitaminas", price: "$20.00", description: "60 gomitas", image: "https://images.unsplash.com/photo-1626282874430-c11ae32d2898?w=400" },
                      { id: 10, name: "Alcohol Isopropílico", price: "$3.50", description: "500ml", image: "https://images.unsplash.com/photo-1584017945516-90769a7b949c?w=400" }
                    ]
                  };
                  setPartnerProducts(examples[type.id as BusinessType]);
                }}
                className={`flex items-center gap-4 p-5 ${current.card} rounded-[32px] group hover:border-deli-teal transition-all`}
              >
                <div className={`w-12 h-12 ${type.bg} rounded-2xl flex items-center justify-center`}>
                  <type.icon className="w-6 h-6" />
                </div>
                <span className="text-lg font-bold">{type.id}</span>
                <ChevronRight className="ml-auto w-5 h-5 opacity-20" />
              </motion.button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className={`min-h-screen transition-colors duration-500 ${current.bg} ${current.text} ${current.font} flex flex-col items-center`}>
        <div className="w-full max-w-md min-h-screen bg-inherit relative pb-24 shadow-2xl overflow-x-hidden text-left">
          
          <header className="p-6 pb-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-deli-dark flex items-center justify-center text-white font-bold">
                  {partnerProfile.businessName[0]}
                </div>
                <div>
                  <p className="text-[10px] font-bold opacity-50">{businessType}</p>
                  <h3 className="text-sm font-bold truncate max-w-[150px]">{partnerProfile.businessName}</h3>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowNotifications(true)}
                  className={`p-2 ${current.card} rounded-full relative`}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-3 h-3 bg-deli-red border-2 border-white rounded-full" />
                </button>
                <button 
                  onClick={handleLogout}
                  className={`p-2 ${current.card} rounded-full`}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>

            {partnerActiveTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Earnings Card */}
                <div className="p-6 bg-deli-dark text-white rounded-[32px] shadow-xl relative overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Ventas Totales (Tarjeta)</p>
                    <h2 className="text-4xl font-display font-black tracking-tighter mb-4">
                      ${partnerEarnings.toFixed(2)}
                    </h2>
                    <div className="bg-white/10 backdrop-blur-md inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold">
                      <Zap className="w-3 h-3 text-deli-teal fill-current" />
                      <span>+12.5% vs semana pasada</span>
                    </div>
                  </div>
                  <ShoppingBag className="absolute right-[-20px] bottom-[-20px] w-40 h-40 opacity-10 rotate-12" />
                </div>

                {/* Analysis/Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowTopProductsDetail(true)}
                    className={`${current.card} p-5 rounded-[28px] cursor-pointer hover:border-deli-teal transition-all`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-3">Más Vendidos</p>
                    <h4 className="text-sm font-bold mb-1">Burger Deluxe</h4>
                    <p className="text-[10px] text-deli-teal font-bold line-clamp-1">Ver detalles de productos...</p>
                  </motion.div>
                  <div className={`${current.card} p-5 rounded-[28px]`}>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-3">Preferencia</p>
                    <h4 className="text-sm font-bold mb-1">Delivery</h4>
                    <p className="text-[10px] text-deli-orange font-bold line-clamp-1">85% de los clientes</p>
                  </div>
                </div>

                <AnimatePresence>
                  {showTopProductsDetail && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`${current.card} p-6 rounded-[32px]`}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-bold">Resumen de Productos Top</h4>
                        <button onClick={() => setShowTopProductsDetail(false)} className="text-[10px] font-bold text-deli-red px-2 py-1 bg-deli-red/5 rounded-lg uppercase">Cerrar</button>
                      </div>
                      <div className="space-y-3">
                        {partnerProducts.slice(0, 3).map((p, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-deli-dark/5 rounded-2xl">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-black opacity-20">#{i+1}</span>
                              <p className="text-xs font-bold">{p.name}</p>
                            </div>
                            <span className="text-[10px] font-bold text-deli-teal">{Math.floor(100 - i*20)} vtas</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className={`${current.card} p-6 rounded-[32px]`}>
                  <h4 className="text-sm font-bold mb-4">Rendimiento Semanal</h4>
                  <div className="h-40 flex items-end justify-between gap-2 px-2 pb-6 relative">
                    {[65, 85, 45, 95, 75, 40, 60].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full bg-deli-orange/5 rounded-lg h-32 relative flex items-end">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            className="w-full bg-deli-orange rounded-lg shadow-lg shadow-deli-orange/20"
                          />
                        </div>
                        <span className="text-[9px] font-bold opacity-30">{['L','M','M','J','V','S','D'][i]}</span>
                      </div>
                    ))}
                    {/* Graph line decoration */}
                    <svg className="absolute inset-x-0 bottom-10 h-32 w-full pointer-events-none stroke-current text-deli-teal/10 fill-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M 0 50 Q 25 20 50 50 T 100 50" strokeWidth="2" strokeDasharray="5,5" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </header>

          <main className="px-6 pb-4">
            {partnerActiveTab === 'orders' && (
              <div className="space-y-4">
                <h3 className={`text-xl ${current.headerFont} mb-4`}>Pedidos en Curso</h3>
                {partnerOrders.map((order) => (
                  <div key={order.id} className={`${current.card} p-5 rounded-[28px] space-y-4`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-bold">{order.customerName}</h4>
                          <span className="text-[8px] px-1.5 py-0.5 bg-deli-teal/10 text-deli-teal rounded-full font-bold">Premium</span>
                        </div>
                        <p className="text-[10px] opacity-40">{order.customerPhone}</p>
                      </div>
                      <span className="text-xs font-black text-deli-teal">{order.total}</span>
                    </div>

                    <div className="bg-deli-dark/5 p-3 rounded-2xl">
                      <p className="text-[9px] font-bold opacity-40 uppercase mb-2">Productos:</p>
                      <ul className="text-[10px] font-bold space-y-1">
                        {order.items.map((it, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span>{it}</span>
                            <span>x1</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          const newOrders = partnerOrders.map(o => o.id === order.id ? { ...o, chatOpen: true } : o);
                          setPartnerOrders(newOrders);
                        }}
                        className="flex-1 py-3 bg-deli-teal/10 text-deli-teal rounded-xl text-[10px] font-bold flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-3 h-3" />
                        Chat Clientes
                      </button>
                      <button 
                        onClick={() => order.status === 'Preparando' ? null : acceptPartnerOrder(order.id)}
                        disabled={order.status === 'Preparando' || order.status === 'En camino'}
                        className={`flex-1 py-3 ${order.status !== 'Preparando' && order.status !== 'En camino' ? 'bg-deli-teal shadow-lg shadow-deli-teal/20' : 'bg-deli-teal/10 text-deli-teal'} rounded-xl text-[10px] font-bold transition-all`}
                      >
                        {order.status === 'Preparando' ? 'Aceptado ✅' : order.status === 'En camino' ? 'En camino' : 'Aceptar Pedido'}
                      </button>
                    </div>

                    {/* Order Accepted Success Message */}
                    <AnimatePresence>
                      {order.status === 'Preparando' && !order.driverFound && !order.isSearchingDriver && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center gap-3"
                        >
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                            <Zap className="w-4 h-4 fill-current" />
                          </div>
                          <p className="text-xs font-bold text-green-600">¡Pedido Aceptado con éxito!</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Driver Status Area */}
                    <AnimatePresence>
                      {order.isSearchingDriver && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-deli-orange/10 border border-deli-orange/20 rounded-2xl flex items-center gap-3"
                        >
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-deli-orange border-t-transparent rounded-full"
                          />
                          <div className="flex-1">
                            <p className="text-[10px] font-bold text-deli-orange">Buscando el Socio Conductor...</p>
                            <p className="text-[8px] opacity-60">Asignando el más cercano a tu ubicación</p>
                          </div>
                        </motion.div>
                      )}

                      {order.driverFound && order.driver && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-5 bg-deli-teal/10 border-2 border-deli-teal/20 rounded-[32px] flex flex-col gap-4 shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-deli-teal uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full">Socio Conductor Asignado</span>
                            <div className="flex items-center gap-1 p-1 bg-white rounded-lg px-2">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-[10px] font-black">{order.driver.rating}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-white shadow-md flex-shrink-0">
                              <img 
                                src={order.driver.photo} 
                                alt={order.driver.name} 
                                className="w-full h-full object-cover" 
                                referrerPolicy="no-referrer" 
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="text-sm font-black text-deli-dark leading-tight">{order.driver.name}</h5>
                              <p className="text-[11px] font-bold text-deli-teal">{order.driver.vehicle}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[9px] font-bold text-green-600 uppercase">En camino al local</span>
                              </div>
                            </div>
                            <button className="p-3 bg-white rounded-2xl shadow-sm text-deli-teal active:scale-95 transition-all">
                              <Phone className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="pt-3 border-t border-deli-teal/10 flex justify-between items-center text-[9px] font-bold opacity-60">
                            <span>Llegada estimada: 5-8 min</span>
                            <button 
                              onClick={() => setViewingDriverProfile(order.driver)}
                              className="text-deli-teal underline decoration-dotted"
                            >
                              Ver Perfil Completo
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {order.chatOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="pt-4 border-t border-deli-teal/20"
                        >
                          <div className="bg-deli-teal/5 p-4 rounded-[24px] space-y-4">
                            <div className="flex justify-between items-center mb-2">
                              <h5 className="text-[10px] font-bold uppercase text-deli-teal">Conversación con el cliente</h5>
                              <button 
                                onClick={() => {
                                  const newOrders = partnerOrders.map(o => o.id === order.id ? { ...o, chatOpen: false } : o);
                                  setPartnerOrders(newOrders);
                                }}
                                className="p-1 px-2 bg-deli-red/10 text-deli-red rounded-lg text-[8px] font-bold flex items-center gap-1"
                              >
                                <LogOut className="w-2 h-2" />
                                Finalizar
                              </button>
                            </div>
                            <div className="space-y-2">
                              <div className="bg-white p-3 rounded-2xl rounded-tl-none mr-8 shadow-sm">
                                <p className="text-[10px] text-deli-dark">Hola, me gustaría sugerirle un producto parecido al que pidió ya que no nos queda en stock.</p>
                              </div>
                              <div className="bg-deli-orange/10 p-3 rounded-2xl rounded-tr-none ml-8 text-right shadow-sm">
                                <p className="text-[10px] text-deli-dark">¿Qué otra opción me sugiere? Me interesa que sea similar.</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <input 
                                type="text" 
                                placeholder="Escribe al cliente..." 
                                className="flex-1 bg-white p-4 rounded-xl text-[10px] outline-none border border-deli-teal/10 focus:border-deli-teal"
                              />
                              <button className="p-4 bg-deli-teal text-white rounded-xl shadow-lg shadow-deli-teal/20">
                                <Send className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}

            {partnerActiveTab === 'products' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className={`text-xl ${current.headerFont}`}>Mis Productos</h3>
                  <button 
                    onClick={() => setIsAddingProduct(true)}
                    className="px-4 py-2 bg-deli-teal text-white rounded-xl text-[10px] font-bold shadow-lg shadow-deli-teal/20 flex items-center gap-2 active:scale-95 transition-all"
                  >
                    <Plus className="w-3 h-3" />
                    Nuevo
                  </button>
                </div>

                <AnimatePresence>
                  {(isAddingProduct || editingProduct) && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className={`${current.card} p-6 rounded-[32px] border-2 border-deli-teal/20 shadow-xl`}
                    >
                      <h4 className="text-sm font-bold mb-4">{editingProduct ? 'Editar Producto' : 'Añadir Nuevo Producto'}</h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-1">
                             <label className="text-[9px] font-bold text-deli-teal uppercase ml-1">Nombre</label>
                             <input type="text" defaultValue={editingProduct?.name} className="w-full p-4 bg-deli-teal/5 rounded-2xl text-[10px] font-bold outline-none border border-deli-teal/10" placeholder="Ej: Pizza Hut" />
                           </div>
                           <div className="space-y-1">
                             <label className="text-[9px] font-bold text-deli-teal uppercase ml-1">Precio</label>
                             <input type="text" defaultValue={editingProduct?.price} className="w-full p-4 bg-deli-teal/5 rounded-2xl text-[10px] font-bold outline-none border border-deli-teal/10" placeholder="$0.00" />
                           </div>
                        </div>
                        <div className="space-y-1">
                           <label className="text-[9px] font-bold text-deli-teal uppercase ml-1">Descripción</label>
                           <textarea defaultValue={editingProduct?.description} className="w-full p-4 bg-deli-teal/5 rounded-2xl text-[10px] font-bold outline-none border border-deli-teal/10 h-20" placeholder="Detalles del producto..."></textarea>
                        </div>
                        <div className="p-8 border-2 border-dashed border-deli-teal/10 bg-deli-teal/5 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-deli-teal/10 transition-all">
                           <Plus className="w-6 h-6 text-deli-teal opacity-40" />
                           <span className="text-[10px] font-bold text-deli-teal opacity-60">CARGAR FOTO</span>
                        </div>
                        <div className="flex gap-3 pt-2">
                           <button 
                             onClick={() => { setIsAddingProduct(false); setEditingProduct(null); }}
                             className="flex-1 py-4 bg-deli-red/10 text-deli-red rounded-2xl text-[10px] font-bold"
                           >
                             Cancelar
                           </button>
                           <button 
                             onClick={() => { 
                               // Logic to save/add product here
                               setIsAddingProduct(false); 
                               setEditingProduct(null); 
                             }}
                             className="flex-1 py-4 bg-deli-teal text-white rounded-2xl text-[10px] font-bold shadow-lg shadow-deli-teal/20"
                           >
                             {editingProduct ? 'Guardar Cambios' : 'Añadir al Catálogo'}
                           </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-1 gap-4">
                  {(partnerProducts.length > 0 ? partnerProducts : ITEMS[0].products).map((product) => (
                    <div key={product.id} className={`${current.card} p-4 rounded-[24px] flex gap-4`}>
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-bold truncate">{product.name}</h4>
                          <span className="text-sm font-black text-deli-teal">{product.price}</span>
                        </div>
                        <p className="text-[9px] opacity-40 line-clamp-1">{product.description}</p>
                      </div>
                      <div className="flex flex-col justify-center">
                        <button 
                          onClick={() => setEditingProduct(product)}
                          className="p-3 bg-deli-orange/10 text-deli-orange rounded-xl hover:bg-deli-orange/20 transition-all"
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simulated Quick Add Section */}
                <div className={`${current.card} p-6 rounded-[32px] border-2 border-dashed border-deli-teal/20`}>
                  <p className="text-center text-xs font-bold uppercase tracking-widest opacity-40 mb-5">Venta Rápida / Nuevo Ítem</p>
                  <div className="space-y-4">
                    <input type="text" placeholder="Nombre del producto" className="w-full p-4 bg-deli-teal/5 rounded-2xl text-[10px] font-bold outline-none border border-transparent focus:border-deli-teal/30" />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="Precio ($)" className="w-full p-4 bg-deli-teal/5 rounded-2xl text-[10px] font-bold outline-none border border-transparent focus:border-deli-teal/30" />
                      <div className="w-full p-4 bg-deli-teal/5 rounded-2xl text-[10px] font-bold border-2 border-dashed border-deli-teal/10 flex items-center justify-center gap-2 cursor-pointer hover:bg-deli-teal/10">
                         <Plus className="w-3 h-3 text-deli-teal" /> <span className="opacity-40">Foto</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        // Logic to add quick product
                        const newP = { id: Date.now(), name: "Nuevo Ítem", price: "$0.00", description: "Desc", image: "https://picsum.photos/200" };
                        setPartnerProducts([...partnerProducts, newP]);
                      }}
                      className="w-full py-4 bg-deli-teal text-white rounded-2xl text-xs font-bold shadow-lg shadow-deli-teal/20 active:scale-95 transition-all"
                    >
                      Añadir al Catálogo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {partnerActiveTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex flex-col items-center py-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-deli-dark flex items-center justify-center text-white text-3xl font-black mb-4 shadow-xl overflow-hidden">
                      {partnerProfile.businessName[0]}
                    </div>
                    <button className="absolute bottom-4 right-0 p-2 bg-deli-teal text-white rounded-full border-2 border-white shadow-md">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <h3 className={`text-xl ${current.headerFont}`}>{partnerProfile.businessName}</h3>
                  <p className="text-xs opacity-40">Socio de Negocios DeliEatGo</p>
                </div>

                <div className="flex justify-between items-center px-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40">Detalles del Negocio</h4>
                  <button 
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${isEditingProfile ? 'bg-deli-teal text-white' : 'bg-deli-teal/10 text-deli-teal'}`}
                  >
                    {isEditingProfile ? 'Guardar' : 'Editar Datos'}
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    { key: 'businessName', label: 'Nombre del Negocio', value: partnerProfile.businessName, icon: Store, type: 'text' },
                    { key: 'cedula', label: 'Cédula / RNC', value: partnerProfile.cedula, icon: User, type: 'text' },
                    { key: 'bank', label: 'Banco', value: partnerProfile.bank, icon: CreditCard, type: 'select', 
                      options: ['Banco Popular Dominicano', 'Banreservas', 'Banco BHD León', 'Scotiabank RD', 'Banco Santa Cruz', 'Banco Caribe', 'Banco Promerica'] 
                    },
                    { key: 'accountType', label: 'Tipo de Cuenta', value: partnerProfile.accountType, icon: CreditCard, type: 'select',
                      options: ['Ahorros', 'Corriente']
                    },
                    { key: 'accountNumber', label: 'Número de Cuenta', value: partnerProfile.accountNumber, icon: CreditCard, type: 'text' },
                    { key: 'email', label: 'Correo', value: partnerProfile.email, icon: Mail, type: 'email' },
                    { key: 'phone', label: 'Teléfono', value: partnerProfile.phone, icon: Phone, type: 'tel' },
                    { key: 'address', label: 'Dirección', value: partnerProfile.address, icon: MapPin, type: 'text' },
                  ].map((field, idx) => (
                    <div key={idx} className={`${current.card} p-4 rounded-2xl flex items-center justify-between group transition-all`}>
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-2 bg-deli-teal/5 rounded-xl text-deli-teal">
                          <field.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[8px] font-bold uppercase opacity-30 tracking-widest">{field.label}</p>
                          {isEditingProfile ? (
                            field.type === 'select' ? (
                              <select 
                                defaultValue={field.value}
                                className="w-full bg-deli-teal/5 dark:bg-zinc-800/50 p-2 rounded-xl text-xs font-bold outline-none border border-deli-teal/20 mt-1 focus:bg-white focus:border-deli-teal transition-all"
                                onChange={(e) => {
                                  setPartnerProfile({ ...partnerProfile, [field.key]: e.target.value });
                                }}
                              >
                                {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                              </select>
                            ) : (
                              <input 
                                type={field.type}
                                defaultValue={field.value} 
                                className="w-full bg-deli-teal/5 dark:bg-zinc-800/50 p-2 rounded-xl text-xs font-bold outline-none border border-deli-teal/20 mt-1 focus:bg-white focus:border-deli-teal transition-all"
                                onBlur={(e) => {
                                  setPartnerProfile({ ...partnerProfile, [field.key]: e.target.value });
                                }}
                              />
                            )
                          ) : (
                            <p className="text-xs font-bold leading-tight line-clamp-1">{field.value}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Days Operating Custom Display */}
                  <div className={`${current.card} p-4 rounded-2xl flex items-center justify-between`}>
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-2 bg-deli-teal/5 rounded-xl text-deli-teal">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                           <p className="text-[8px] font-bold uppercase opacity-30 tracking-widest">Días Operando</p>
                           {isEditingProfile ? (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'].map(day => {
                                  const fullDay = day === 'Lun' ? 'Lunes' : 
                                                 day === 'Mar' ? 'Martes' : 
                                                 day === 'Mie' ? 'Miércoles' : 
                                                 day === 'Jue' ? 'Jueves' : 
                                                 day === 'Vie' ? 'Viernes' : 
                                                 day === 'Sab' ? 'Sábado' : 'Domingo';
                                  const isSelected = partnerProfile.operatingDays.includes(fullDay);
                                  return (
                                    <button 
                                      key={day}
                                      onClick={() => {
                                        const newDays = isSelected 
                                          ? partnerProfile.operatingDays.filter(d => d !== fullDay)
                                          : [...partnerProfile.operatingDays, fullDay];
                                        setPartnerProfile({...partnerProfile, operatingDays: newDays});
                                      }}
                                      className={`px-2 py-1 rounded-lg text-[8px] font-bold transition-all ${isSelected ? 'bg-deli-teal text-white shadow-sm' : 'bg-gray-100 dark:bg-zinc-800 opacity-40'}`}
                                    >
                                      {day}
                                    </button>
                                  );
                                })}
                              </div>
                           ) : (
                             <p className="text-xs font-bold leading-tight">{partnerProfile.operatingDays.join(", ")}</p>
                           )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowFAQs(true)}
                    className={`${current.card} p-5 rounded-[32px] flex flex-col items-center gap-3 hover:border-deli-teal transition-all cursor-pointer`}
                  >
                    <div className="w-10 h-10 rounded-full bg-deli-teal/5 flex items-center justify-center text-deli-teal">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase text-deli-teal">Preguntas Frecuentes</span>
                  </motion.div>
                  <motion.div 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAdminChat(true)}
                    className={`${current.card} p-5 rounded-[32px] flex flex-col items-center gap-3 hover:border-deli-orange transition-all cursor-pointer`}
                  >
                    <div className="w-10 h-10 rounded-full bg-deli-orange/5 flex items-center justify-center text-deli-orange">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase text-deli-orange">Chat Admin</span>
                  </motion.div>
                </div>

                <div 
                  onClick={() => setShowAdminChat(true)}
                  className={`${current.card} p-8 rounded-[40px] bg-deli-teal text-white shadow-xl shadow-deli-teal/20 relative overflow-hidden group cursor-pointer`}
                >
                  <div className="relative z-10">
                    <h4 className="text-lg font-bold mb-1">Centro de Ayuda</h4>
                    <p className="text-xs opacity-80 mb-6">Habla con la administración de DeliEatGo</p>
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <span>Iniciar Chat de Soporte</span>
                    </div>
                  </div>
                  <Sparkles className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-40 h-40 opacity-10 rotate-12 group-hover:rotate-45 transition-transform" />
                </div>

                <button 
                  onClick={handleLogout}
                  className="w-full py-5 rounded-[28px] border-2 border-deli-red/10 text-deli-red text-sm font-bold flex items-center justify-center gap-3 active:scale-95 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  Finalizar Sesión
                </button>
              </div>
            )}
          </main>

          {/* Partner Bottom Nav */}
          <nav className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md ${mode === 'light' ? 'bg-white/95 border-t border-deli-teal/10' : 'bg-zinc-900/95 border-t border-deli-teal/10'} backdrop-blur-xl px-8 py-4 flex justify-between items-center z-50`}>
            {[
              { id: 'dashboard', icon: Home, label: 'Inicio' },
              { id: 'orders', icon: ShoppingCart, label: 'Pedidos' },
              { id: 'products', icon: Store, label: 'Productos' },
              { id: 'profile', icon: User, label: 'Mi Negocio' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setPartnerActiveTab(tab.id as any)}
                className={`flex flex-col items-center gap-1 transition-all ${partnerActiveTab === tab.id ? 'scale-110' : 'opacity-30 hover:opacity-100'}`}
              >
                <tab.icon className={`w-6 h-6 ${partnerActiveTab === tab.id ? 'text-deli-teal fill-deli-teal/10' : 'text-deli-dark'}`} />
                <span className={`text-[10px] font-bold ${partnerActiveTab === tab.id ? 'text-deli-teal' : 'text-deli-dark'}`}>{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Admin Chat Modal */}
          <AnimatePresence>
            {showAdminChat && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[400] bg-black/60 backdrop-blur-md flex items-end justify-center"
              >
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  className={`w-full max-w-md h-[90vh] ${current.bg} rounded-t-[40px] overflow-hidden flex flex-col shadow-2xl`}
                >
                  <div className="p-6 bg-deli-teal text-white flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black uppercase tracking-widest">Soporte DeliEatGo</h3>
                        <p className="text-[10px] opacity-80">Administración Central (En línea)</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowAdminChat(false)}
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all"
                    >
                      <Plus className="w-6 h-6 rotate-45 text-white" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-deli-dark/5">
                    <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl rounded-tl-none mr-12 shadow-sm">
                      <p className="text-xs font-bold leading-relaxed">Hola {partnerProfile.businessName[0].toUpperCase() + partnerProfile.businessName.slice(1)}, ¿en qué podemos ayudarte el día de hoy?</p>
                      <span className="text-[9px] opacity-40 mt-2 block">Administrador • 10:45 AM</span>
                    </div>

                    <div className="bg-deli-teal text-white p-4 rounded-2xl rounded-tr-none ml-12 shadow-lg shadow-deli-teal/10">
                      <p className="text-xs font-bold leading-relaxed">Hola, tengo una duda sobre los pagos con tarjeta de esta semana.</p>
                      <span className="text-[9px] opacity-60 mt-2 block text-right">Tú • 10:46 AM</span>
                    </div>

                    <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl rounded-tl-none mr-12 shadow-sm">
                      <p className="text-xs font-bold leading-relaxed">Claro, los pagos se procesan los días Martes y Jueves. ¿Te gustaría que verifiquemos tu última liquidación?</p>
                      <span className="text-[9px] opacity-40 mt-2 block">Administrador • 10:47 AM</span>
                    </div>
                  </div>

                  <div className="p-6 bg-white dark:bg-zinc-900 border-t border-deli-teal/10 flex gap-3">
                    <input 
                      type="text" 
                      placeholder="Escribe tu mensaje aquí..." 
                      className="flex-1 bg-deli-teal/5 dark:bg-zinc-800 p-4 rounded-2xl text-xs font-bold outline-none border border-transparent focus:border-deli-teal/30"
                    />
                    <button className="p-4 bg-deli-teal text-white rounded-2xl shadow-lg shadow-deli-teal/20">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FAQs Modal */}
          <AnimatePresence>
            {showFAQs && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[400] bg-black/60 backdrop-blur-md flex items-end justify-center"
              >
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  className={`w-full max-w-md h-[80vh] ${current.bg} rounded-t-[40px] overflow-hidden flex flex-col shadow-2xl`}
                >
                  <div className="p-8 border-b border-deli-teal/10 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black text-deli-dark tracking-tight">Preguntas Frecuentes</h3>
                      <p className="text-[10px] font-bold text-deli-teal uppercase tracking-widest mt-1">Cómo funciona DeliEatGo</p>
                    </div>
                    <button 
                      onClick={() => setShowFAQs(false)}
                      className="p-3 bg-deli-teal/5 text-deli-teal rounded-2xl"
                    >
                      <Plus className="w-6 h-6 rotate-45" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-3">
                    {[
                      { q: "¿Cuándo recibo mis ganancias?", a: "Los retiros se procesan automáticamente cada martes y jueves directamente a la cuenta bancaria configurada en tu perfil." },
                      { q: "¿Cómo cambio mi menú?", a: "Puedes hacerlo desde la pestaña 'Productos'. Permite editar precios, fotos y descripciones en tiempo real." },
                      { q: "¿Qué pasa si no tengo un producto?", a: "Debes comunicarte con el cliente vía chat de pedido y ofrecerle una alternativa. Si el cliente no acepta, puedes cancelar el pedido desde el panel." },
                      { q: "¿Cómo solicito un nuevo repartidor?", a: "El sistema lo hace automáticamente tras aceptar el pedido. Si hay demoras críticas, contacta a Soporte desde el chat admin." },
                      { q: "¿DeliEatGo cobra comisión?", a: "Sí, dependiendo de tu categoría de socio. El detalle lo puedes encontrar en tu contrato digital dentro de la configuración." }
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        className={`${current.card} p-5 rounded-[28px] space-y-2`}
                      >
                        <h4 className="text-xs font-black text-deli-dark leading-tight">{item.q}</h4>
                        <p className="text-[10px] leading-relaxed opacity-60 font-medium">{item.a}</p>
                      </motion.div>
                    ))}
                    
                    <div className="p-6 bg-deli-orange text-white rounded-[32px] mt-6 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-black">¿Aún tienes dudas?</p>
                        <p className="text-[10px] font-bold opacity-80 mt-1">Llámanos al (809)-123-4567</p>
                      </div>
                      <Phone className="w-6 h-6 opacity-30" />
                    </div>
                    <div className="h-10" />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notifications Overlay for Partner */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-20"
                onClick={() => setShowNotifications(false)}
              >
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className={`w-full max-w-md mx-4 ${current.bg} rounded-3xl p-6 shadow-2xl overflow-hidden text-left`}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-xl ${current.headerFont}`}>Notificaciones</h3>
                    <button className="text-[10px] font-bold text-deli-teal">Marcar todo como leído</button>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-deli-teal/5 border border-deli-teal/10">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-xs font-bold">¡Nuevo Pedido!</h4>
                        <span className="text-[8px] opacity-40">Ahora</span>
                      </div>
                      <p className="text-[10px] opacity-70 leading-relaxed"> Laura Méndez ha realizado un pedido. Revisa los detalles en la pestaña de pedidos.</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Main App View for Client (existing logic)
  return (
    <div className={`min-h-screen transition-colors duration-500 ${current.bg} ${current.text} ${current.font} flex flex-col items-center`}>
      <AnimatePresence>
      </AnimatePresence>

      {/* Mobile Frame Container */}
      <div className="w-full max-w-md min-h-screen bg-inherit relative pb-24 shadow-2xl overflow-x-hidden">
        
        {/* Top Header */}
        <header className="p-6 pb-2">
          <div className="flex items-center justify-between mb-6">
            <Logo isDark={mode === 'dark'} className="scale-75 -ml-4" />
            <div className="flex gap-3">
              <button 
                onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                className={`p-2 ${current.card} rounded-full`}
              >
                {mode === 'light' ? <Zap className="w-5 h-5 text-deli-orange" /> : <Sparkles className="w-5 h-5 text-deli-teal" />}
              </button>
              <button 
                onClick={() => setShowNotifications(true)}
                className={`p-2 ${current.card} rounded-full relative`}
              >
                <Bell className="w-5 h-5" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-deli-red border-2 border-white rounded-full" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {(selectedCategory || selectedStore) ? (
                <button 
                  onClick={() => {
                    if (selectedStore) setSelectedStore(null);
                    else setSelectedCategory(null);
                  }}
                  className={`p-2 ${current.card} rounded-full mr-2`}
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
              ) : (
                <MapPin className="w-4 h-4 text-deli-red" />
              )}
              <span className="text-sm font-bold truncate max-w-[150px]">
                {selectedStore ? selectedStore.name : (selectedCategory ? selectedCategory : "Calle Principal 123...")}
              </span>
            </div>
            <button 
              onClick={() => setShowCart(true)}
              className={`p-2 ${current.card} rounded-full relative`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-deli-orange text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
          
          {/* Search Bar */}
          {!selectedStore && (
            <div className="relative">
              <div className={`flex items-center gap-3 p-3 ${current.card} rounded-2xl`}>
                <Search className="w-5 h-5 opacity-40" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearchHistory(true)}
                  onBlur={() => setTimeout(() => setShowSearchHistory(false), 200)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addToSearchHistory(searchQuery);
                      setShowSearchHistory(false);
                      // Blur the input to hide keyboard on mobile
                      (e.target as HTMLInputElement).blur();
                    }
                  }}
                  placeholder={selectedCategory ? `Buscar en ${selectedCategory}...` : "¿Qué necesitas hoy?"}
                  className="bg-transparent border-none outline-none text-sm w-full"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="p-1">
                    <Plus className="w-4 h-4 rotate-45 opacity-40 hover:opacity-100" />
                  </button>
                )}
              </div>
              
              {/* Search History Suggestions */}
              <AnimatePresence>
                {showSearchHistory && searchHistory.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute top-full left-0 right-0 mt-2 ${current.card} rounded-2xl shadow-xl z-50 overflow-hidden overflow-y-auto max-h-48 backdrop-blur-xl`}
                  >
                    <div className="p-2">
                       <div className="flex items-center justify-between px-3 py-1 mb-1">
                         <span className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Búsquedas Recientes</span>
                         <button 
                           onClick={(e) => {
                             e.stopPropagation();
                             setSearchHistory([]);
                             localStorage.removeItem('deliEatGo_searchHistory');
                           }}
                           className="text-[9px] font-bold text-deli-red hover:underline"
                         >
                           Limpiar
                         </button>
                       </div>
                       {searchHistory
                         .filter(h => h.toLowerCase().includes(searchQuery.toLowerCase()))
                         .map((term, i) => (
                           <button
                             key={i}
                             onClick={() => {
                               setSearchQuery(term);
                               addToSearchHistory(term);
                               setShowSearchHistory(false);
                             }}
                             className="w-full flex items-center gap-3 px-4 py-3 hover:bg-deli-teal/5 text-left transition-all group"
                           >
                             <History className="w-3 h-3 opacity-30 group-hover:opacity-100 group-hover:text-deli-teal" />
                             <span className="text-xs font-medium">{term}</span>
                           </button>
                         ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </header>

        {/* Categories */}
        {!selectedCategory && !selectedStore && activeTab === 'home' && (
          <div className="px-6 py-4">
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {CATEGORIES.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className="flex flex-col items-center gap-2 flex-shrink-0"
                >
                  <div className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                    <cat.icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {showCart && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-end justify-center"
              onClick={() => {
                if (checkoutStep !== 'processing') {
                  setShowCart(false);
                  setCheckoutStep(null);
                }
              }}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={`w-full max-w-md ${current.bg} rounded-t-[32px] p-8 pb-12 shadow-2xl`}
                onClick={e => e.stopPropagation()}
              >
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" />
                
                {!checkoutStep || checkoutStep === 'cart' ? (
                  <>
                    <div className="flex items-center justify-between mb-8">
                      <h3 className={`text-2xl ${current.headerFont}`}>Tu Carrito</h3>
                      <span className="text-xs font-bold opacity-40">{cart.length} productos</span>
                    </div>

                    <div className="max-h-[40vh] overflow-y-auto no-scrollbar space-y-4 mb-8">
                      {cart.length === 0 ? (
                        <div className="py-12 text-center">
                          <ShoppingBag className="w-12 h-12 mx-auto opacity-10 mb-4" />
                          <p className="text-sm opacity-40">Tu carrito está vacío</p>
                        </div>
                      ) : (
                        cart.map((item) => (
                          <div key={item.product.id} className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                              <img src={item.product.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold truncate">{item.product.name}</h4>
                              <p className="text-[10px] opacity-60">{item.store.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-bold text-deli-teal">{item.product.price}</span>
                                <span className="text-[10px] opacity-40">x{item.quantity}</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-2 text-deli-red opacity-40 hover:opacity-100"
                            >
                              <Plus className="w-4 h-4 rotate-45" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    {cart.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-4 border-t border-gray-100">
                          <span className="text-sm font-bold opacity-60">Total</span>
                          <span className="text-xl font-display font-black text-deli-dark">
                            ${cartTotal.toFixed(2)}
                          </span>
                        </div>
                        <button 
                          onClick={() => setCheckoutStep('payment')}
                          className={`w-full py-4 ${current.accent} font-bold rounded-2xl shadow-lg shadow-deli-teal/20`}
                        >
                          Continuar al Pago
                        </button>
                      </div>
                    )}
                  </>
                ) : checkoutStep === 'payment' ? (
                  <>
                    <div className="flex items-center gap-4 mb-8">
                      <button onClick={() => setCheckoutStep('cart')} className={`p-2 ${current.card} rounded-full`}>
                        <ChevronRight className="w-4 h-4 rotate-180" />
                      </button>
                      <h3 className={`text-2xl ${current.headerFont}`}>Método de Pago</h3>
                    </div>

                    <div className="space-y-3 mb-8">
                      {paymentMethods.map((method) => (
                        <button 
                          key={method.id}
                          onClick={handleCheckout}
                          className={`w-full p-4 ${current.card} flex items-center justify-between group active:scale-98 transition-all`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <CreditCard className="w-5 h-5 opacity-60" />
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-bold">{method.type}</p>
                              <p className="text-[10px] opacity-40">
                                {method.last4 ? `**** ${method.last4}` : method.email}
                              </p>
                            </div>
                          </div>
                          <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-deli-teal flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-deli-teal scale-0 group-hover:scale-100 transition-transform" />
                          </div>
                        </button>
                      ))}
                    </div>

                    <button 
                      onClick={() => setShowAddPayment(true)}
                      className="w-full py-3 text-xs font-bold text-deli-teal opacity-60"
                    >
                      + Agregar nuevo método
                    </button>
                  </>
                ) : checkoutStep === 'processing' ? (
                  <div className="py-12 flex flex-col items-center text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 border-4 border-deli-teal border-t-transparent rounded-full mb-6"
                    />
                    <h3 className={`text-xl ${current.headerFont} mb-2`}>Procesando Pago</h3>
                    <p className="text-xs opacity-60">Estamos validando tu transacción...</p>
                  </div>
                ) : (
                  <div className="py-8 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-green-600"
                      >
                        <Zap className="w-10 h-10 fill-current" />
                      </motion.div>
                    </div>
                    <h3 className={`text-2xl ${current.headerFont} mb-2`}>¡Pedido Confirmado!</h3>
                    <p className="text-xs opacity-60 mb-8 px-8">
                      Tu pedido ha sido recibido. Carlos Rodríguez ha sido asignado y llegará en aprox. 25 min.
                    </p>
                    <button 
                      onClick={() => {
                        setShowCart(false);
                        setCheckoutStep(null);
                        setActiveTab('history');
                      }}
                      className={`w-full py-4 ${current.accent} font-bold rounded-2xl`}
                    >
                      Ver mis pedidos
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}

          {showNotifications && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-20"
              onClick={() => setShowNotifications(false)}
            >
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className={`w-full max-w-md mx-4 ${current.bg} rounded-3xl p-6 shadow-2xl overflow-hidden`}
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-xl ${current.headerFont}`}>Notificaciones</h3>
                  <button 
                    onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                    className="text-[10px] font-bold text-deli-teal"
                  >
                    Marcar todo como leído
                  </button>
                </div>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar">
                  {notifications.length === 0 ? (
                    <div className="py-12 text-center opacity-40 text-sm">No tienes notificaciones</div>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className={`p-4 rounded-2xl ${n.read ? 'opacity-60' : 'bg-deli-teal/5 border border-deli-teal/10'}`}>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-xs font-bold">{n.title}</h4>
                          <span className="text-[8px] opacity-40">{n.time}</span>
                        </div>
                        <p className="text-[10px] opacity-70 leading-relaxed">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showAddPayment ? (
            <motion.div
              key="add-payment"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="px-6 py-4"
            >
              <div className="flex items-center gap-4 mb-8">
                <button onClick={() => setShowAddPayment(false)} className={`p-2 ${current.card} rounded-full`}>
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <h3 className={`text-2xl ${current.headerFont}`}>Nuevo Pago</h3>
              </div>

              <div className="space-y-4">
                <div className={`p-6 ${current.card} border-2 border-dashed border-gray-300 flex flex-col items-center gap-4`}>
                  <CreditCard className="w-12 h-12 opacity-20" />
                  <p className="text-xs font-bold opacity-40">Escanea tu tarjeta</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase opacity-50 ml-1">Número de Tarjeta</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className={`w-full p-4 mt-1 ${current.card} text-sm outline-none`} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase opacity-50 ml-1">Vencimiento</label>
                      <input type="text" placeholder="MM/AA" className={`w-full p-4 mt-1 ${current.card} text-sm outline-none`} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase opacity-50 ml-1">CVV</label>
                      <input type="text" placeholder="123" className={`w-full p-4 mt-1 ${current.card} text-sm outline-none`} />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setPaymentMethods([...paymentMethods, { id: Date.now().toString(), type: 'Visa', last4: '9999' }]);
                    setShowAddPayment(false);
                  }}
                  className={`w-full py-4 ${current.accent} font-bold text-sm mt-8 rounded-2xl`}
                >
                  Guardar Tarjeta
                </button>
              </div>
            </motion.div>
          ) : activeTab === 'profile' ? (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-6 py-4"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className={`text-2xl ${current.headerFont}`}>Mi Perfil</h3>
                <button className={`p-2 ${current.card} rounded-full`}>
                  <Settings className="w-5 h-5" />
                </button>
              </div>

              {/* User Info Card */}
              <div className={`${current.card} p-6 mb-8 flex flex-col items-center text-center`}>
                <div className="relative mb-4">
                  <img src={user.photo} alt={user.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" referrerPolicy="no-referrer" />
                  <button className={`absolute bottom-0 right-0 p-2 ${current.accent} rounded-full border-2 border-white shadow-md`}>
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <h4 className="text-lg font-bold mb-1">{user.name}</h4>
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-2 text-xs opacity-60">
                    <Mail className="w-3 h-3" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs opacity-60">
                    <Phone className="w-3 h-3" />
                    <span>{user.phone}</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest opacity-50">Métodos de Pago</h4>
                  <button 
                    onClick={() => setShowAddPayment(true)}
                    className="text-[10px] font-bold text-blue-500"
                  >
                    + Agregar
                  </button>
                </div>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className={`${current.card} p-4 flex items-center justify-between`}>
                      <div className="flex items-center gap-4">
                        <div className={`p-2 bg-gray-100 rounded-lg`}>
                          <CreditCard className="w-5 h-5 opacity-60" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">{method.type}</p>
                          <p className="text-[10px] opacity-60">
                            {method.last4 ? `**** **** **** ${method.last4}` : method.email}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-20" />
                    </div>
                  ))}
                </div>
              </section>

              {/* Other Options */}
              <div className="space-y-2">
                <button className={`w-full p-4 ${current.card} flex items-center justify-between`}>
                  <div className="flex items-center gap-4">
                    <MapPin className="w-5 h-5 opacity-40" />
                    <span className="text-sm font-medium">Mis Direcciones</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-20" />
                </button>
                <button 
                  onClick={handleLogout}
                  className={`w-full p-4 ${current.card} flex items-center justify-between text-red-500`}
                >
                  <div className="flex items-center gap-4">
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Cerrar Sesión</span>
                  </div>
                </button>
              </div>
            </motion.div>
          ) : showHelp ? (
            <motion.div
              key="help"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-6 py-4"
            >
              <div className="flex items-center gap-4 mb-8">
                <button onClick={() => setShowHelp(false)} className={`p-2 ${current.card} rounded-full`}>
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <h3 className={`text-2xl ${current.headerFont}`}>Centro de Ayuda</h3>
              </div>

              <div className="space-y-6">
                <section>
                  <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-3">Temas Frecuentes</h4>
                  <div className="space-y-2">
                    {[
                      "¿Cómo rastrear mi pedido?",
                      "Problemas con mi pago",
                      "Mi pedido llegó incompleto",
                      "Cambiar dirección de entrega",
                      "Cancelar un pedido activo"
                    ].map((topic, i) => (
                      <button key={i} className={`w-full p-4 ${current.card} flex justify-between items-center text-left`}>
                        <span className="text-sm font-medium">{topic}</span>
                        <ChevronRight className="w-4 h-4 opacity-30" />
                      </button>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-3">Contacto Directo</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <button className={`p-4 ${current.card} flex flex-col items-center gap-2`}>
                      <div className={`p-3 ${current.accent} rounded-full`}>
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold">Chat Soporte</span>
                    </button>
                    <button className={`p-4 ${current.card} flex flex-col items-center gap-2`}>
                      <div className={`p-3 bg-blue-500 text-white rounded-full`}>
                        <Bell className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold">Llamar</span>
                    </button>
                  </div>
                </section>

                <section className={`p-6 ${mode === 'light' ? 'bg-zinc-900 text-white' : 'bg-zinc-800 text-white'} rounded-3xl`}>
                  <h4 className="text-sm font-bold mb-2">¿Necesitas algo más?</h4>
                  <p className="text-[10px] opacity-70 mb-4">Nuestro equipo está disponible 24/7 para ayudarte con cualquier inconveniente.</p>
                  <button className={`w-full py-3 ${current.accent} text-white text-xs font-bold rounded-xl`}>
                    Enviar un Ticket
                  </button>
                </section>
              </div>
            </motion.div>
          ) : selectedTracking ? (
            <motion.div
              key="tracking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-[#e0e0d5] flex flex-col"
            >
              {/* Header */}
              <div className="absolute top-6 left-6 right-6 z-10 flex items-center gap-4">
                <button onClick={() => setSelectedTracking(null)} className={`p-3 ${current.card} rounded-full shadow-lg`}>
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <div className={`flex-1 p-3 ${current.card} rounded-2xl shadow-lg flex items-center justify-between`}>
                  <div>
                    <h4 className="text-xs font-bold">Rastreando Pedido</h4>
                    <p className="text-[10px] text-blue-500 font-bold">
                      {selectedTracking.status === 'En camino' ? 'El repartidor va hacia tu casa' : 'El repartidor va hacia el local'}
                    </p>
                  </div>
                  <Clock className="w-4 h-4 opacity-40" />
                </div>
              </div>

              {/* Map Simulation */}
              <div className="flex-1 relative overflow-hidden">
                {/* Stylized Map Elements */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                
                {/* Route Path */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 800">
                  <motion.path
                    d="M 100 600 Q 300 500 100 400 T 300 200"
                    fill="none"
                    stroke="#000"
                    strokeWidth="3"
                    strokeDasharray="10 10"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                </svg>

                {/* Store Location */}
                <div className="absolute top-[180px] right-[60px] flex flex-col items-center">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`p-3 bg-white border-2 border-black rounded-xl shadow-lg mb-2`}
                  >
                    <Store className="w-6 h-6 text-orange-500" />
                  </motion.div>
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-bold bg-black text-white px-2 py-0.5 rounded uppercase tracking-tighter">{selectedTracking.storeName}</span>
                    <span className="text-[7px] font-bold opacity-40 mt-1">RECOGER AQUÍ</span>
                  </div>
                </div>

                {/* User Location */}
                <div className="absolute bottom-[180px] left-[60px] flex flex-col items-center">
                  <div className={`p-3 bg-white border-2 border-black rounded-xl shadow-lg mb-2`}>
                    <Home className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-bold bg-black text-white px-2 py-0.5 rounded">TU CASA</span>
                    <span className="text-[7px] font-bold opacity-40 mt-1">ENTREGA FINAL</span>
                  </div>
                </div>

                {/* Driver Animation */}
                <motion.div
                  className="absolute z-20"
                  animate={{
                    offsetDistance: ["0%", "100%"]
                  }}
                  style={{
                    offsetPath: "path('M 100 600 Q 300 500 100 400 T 300 200')",
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="relative">
                    {/* Driver Photo Pulse */}
                    <motion.div 
                      animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-deli-teal rounded-full"
                    />
                    <div className="w-10 h-10 rounded-full border-2 border-black shadow-xl overflow-hidden relative z-10">
                      <img src={selectedTracking.driver?.photo} className="w-full h-full object-cover" />
                    </div>
                    {/* Vehicle Icon Badge */}
                    <div className="absolute -bottom-1 -right-1 p-1 bg-white border border-black rounded-md shadow-md z-20">
                      {selectedTracking.driver?.vehicle.toLowerCase().includes('moto') ? (
                        <Zap className="w-2.5 h-2.5 text-deli-teal fill-deli-teal" />
                      ) : (
                        <Car className="w-2.5 h-2.5 text-deli-teal" />
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Driver Card Overlay */}
              <div className="p-6 pb-10 bg-gradient-to-t from-[#e0e0d5] via-[#e0e0d5] to-transparent">
                <motion.div 
                  initial={{ y: 50 }}
                  animate={{ y: 0 }}
                  className={`${current.card} p-5 shadow-2xl relative z-50`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img src={selectedTracking.driver?.photo} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" referrerPolicy="no-referrer" />
                    <div className="flex-1">
                      <h4 className="text-base font-bold">{selectedTracking.driver?.name}</h4>
                      <p className="text-xs opacity-60">{selectedTracking.driver?.vehicle}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => window.location.href = `tel:${user.phone}`}
                        className={`p-3 bg-white border-2 border-black rounded-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 active:translate-y-0.5 active:shadow-none transition-all`}
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedChat(selectedTracking);
                          setSelectedTracking(null);
                        }}
                        className={`p-3 ${current.accent} rounded-2xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:opacity-90 active:translate-y-0.5 active:shadow-none transition-all`}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="p-3 bg-white border border-black/10 rounded-2xl">
                      <p className="text-[8px] font-bold text-deli-teal uppercase mb-1">Llegada estimada</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 opacity-40" />
                        <p className="text-xs font-black">10:55 AM (8 min)</p>
                      </div>
                    </div>
                    <div className="p-3 bg-white border border-black/10 rounded-2xl">
                      <p className="text-[8px] font-bold text-deli-orange uppercase mb-1">Distancia</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 opacity-40" />
                        <p className="text-xs font-black">1.8 km</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-60">
                      <span>Progreso del envío</span>
                      <span>8 min restantes</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden border border-black/5">
                      <motion.div 
                        className={`h-full ${current.accent}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "65%" }}
                        transition={{ duration: 2, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  
                  <p className="text-[10px] font-bold mt-4 text-center text-blue-600 bg-blue-50 py-2 rounded-lg">
                    ¡El repartidor está a 2 km de tu ubicación!
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ) : selectedChat ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col h-[calc(100vh-180px)]"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4">
                <button onClick={() => setSelectedChat(null)} className={`p-2 ${current.card} rounded-full`}>
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <div className="flex items-center gap-3">
                  <img src={selectedChat.driver?.photo} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="text-sm font-bold">{selectedChat.driver?.name}</h4>
                    <p className="text-[10px] text-green-500 font-bold">En línea</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                  <div className="flex justify-start">
                    <div className={`max-w-[80%] p-4 text-xs ${mode === 'light' ? 'bg-white border border-gray-100 shadow-sm' : 'bg-zinc-800'} rounded-2xl rounded-tl-none`}>
                      ¡Hola! Ya tengo tu pedido de {selectedChat.storeName}. Voy en camino.
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className={`max-w-[80%] p-4 text-xs ${current.accent} rounded-2xl rounded-tr-none shadow-sm`}>
                      ¡Excelente! Por favor, deja el pedido en la puerta principal.
                    </div>
                  </div>
              </div>

              <div className="p-6">
                <div className={`flex items-center gap-3 p-2 ${current.card} rounded-2xl`}>
                  <input 
                    type="text" 
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 bg-transparent border-none outline-none text-xs px-2"
                  />
                  <button className={`p-2 ${current.accent} rounded-full`}>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : activeTab === 'history' ? (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-6 py-4"
            >
              <h3 className={`text-2xl ${current.headerFont} mb-6`}>Mis Pedidos</h3>
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className={`${current.card} overflow-hidden`}>
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-sm">{order.storeName}</h4>
                        <p className="text-[10px] opacity-60">{order.date}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-[9px] font-bold ${
                        order.status === 'Entregado' ? 'bg-green-100 text-green-600' : 
                        order.status === 'En camino' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-[10px] font-bold opacity-70">
                          {order.items.join(", ")}
                        </p>
                        <span className="font-bold text-sm">{order.total}</span>
                      </div>

                      {order.driver && (
                        <div className={`p-3 bg-gray-50/50 rounded-xl flex items-center gap-3`}>
                          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                            <img src={order.driver.photo} alt={order.driver.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <p className="text-[10px] font-bold">{order.driver.name}</p>
                              <div className="flex items-center gap-1">
                                <Star className="w-2 h-2 fill-yellow-400 text-yellow-400" />
                                <span className="text-[9px] font-bold">{order.driver.rating}</span>
                              </div>
                            </div>
                            <p className="text-[9px] opacity-60">{order.driver.vehicle}</p>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setSelectedChat(order)}
                              className={`p-2 ${current.accent} rounded-full`}
                            >
                              <MessageCircle className="w-3 h-3" />
                            </button>
                            <button className={`p-2 ${current.card} rounded-full`}>
                              <Bell className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-3 bg-gray-50/50 flex gap-2">
                      <button 
                        onClick={() => setShowHelp(true)}
                        className={`flex-1 py-2 text-[10px] font-bold ${current.card} bg-white`}
                      >
                        Ayuda
                      </button>
                      <button 
                        onClick={() => {
                          if (order.status === 'Entregado') {
                            const store = ITEMS.find(s => s.name === order.storeName);
                            if (store) {
                              setSelectedStore(store);
                              setActiveTab('home');
                            }
                          } else {
                            setSelectedTracking(order);
                          }
                        }}
                        className={`flex-1 py-2 text-[10px] font-bold ${current.accent} rounded-lg`}
                      >
                        {order.status === 'Entregado' ? 'Pedir de nuevo' : 'Rastrear'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : selectedStore ? (
            <motion.div
              key="store-detail"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="px-6 py-4"
            >
              <div className="relative h-48 mb-6 overflow-hidden rounded-2xl">
                <img src={selectedStore.image} alt={selectedStore.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-bold">{selectedStore.name}</h3>
                  <div className="flex items-center gap-3 text-white/80 text-xs font-bold">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{selectedStore.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{selectedStore.time}</span>
                  </div>
                </div>
              </div>

              <h4 className={`text-lg ${current.headerFont} mb-4`}>Catálogo de Productos</h4>
              <div className="grid grid-cols-1 gap-4">
                {selectedStore.products.map((product) => (
                  <motion.div 
                    key={product.id}
                    whileTap={{ scale: 0.98 }}
                    className={`${current.card} p-4 flex gap-4`}
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="text-sm font-bold truncate">{product.name}</h5>
                        <span className="text-sm font-bold">{product.price}</span>
                      </div>
                      <p className="text-[10px] opacity-60 line-clamp-2 mb-2">{product.description}</p>
                      <button 
                        onClick={() => addToCart(product, selectedStore)}
                        className={`px-3 py-1 ${current.accent} text-[9px] font-bold rounded-full active:scale-95 transition-transform`}
                      >
                        Agregar +
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : !selectedCategory ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Banner */}
              <div className="px-6 py-4">
                <motion.div 
                  whileTap={{ scale: 0.98 }}
                  className={`relative h-40 overflow-hidden rounded-2xl ${current.accent} p-6 flex flex-col justify-center`}
                >
                  <div className="relative z-10">
                    <h2 className={`text-2xl ${current.headerFont} leading-tight mb-2`}>
                      Envío gratis en tu primera compra
                    </h2>
                    <p className="text-xs opacity-80 font-bold">Usa el código: OMNI2026</p>
                  </div>
                  <div className="absolute right-[-20px] bottom-[-20px] opacity-20 rotate-12">
                    <ShoppingBag className="w-40 h-40" />
                  </div>
                </motion.div>
              </div>

              {/* Main Categories Grid */}
              <section className="px-6 py-4">
                <div className="grid grid-cols-4 gap-4">
                  {CATEGORIES.map((cat) => (
                    <button 
                      key={cat.id} 
                      onClick={() => setSelectedCategory(cat.name)}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-white shadow-sm transition-transform group-active:scale-90`}>
                        <cat.icon className={`w-6 h-6 ${cat.color.split(' ')[1]}`} />
                      </div>
                      <span className="text-[10px] font-bold text-center leading-tight">{cat.name}</span>
                    </button>
                  ))}
                  <button className="flex flex-col items-center gap-2 group">
                    <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-white shadow-sm transition-transform group-active:scale-90`}>
                      <Menu className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-center leading-tight">Más</span>
                  </button>
                </div>
              </section>

              {/* Featured Stores */}
              <section className="px-6 py-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg ${current.headerFont}`}>Destacados</h3>
                  <button className="text-xs font-bold opacity-60">Ver todo</button>
                </div>
                
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                  {ITEMS.slice(0, 4).map((item) => (
                    <motion.div 
                      key={`${mode}-${item.id}`}
                      onClick={() => setSelectedStore(item)}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-shrink-0 w-64 ${current.card} overflow-hidden cursor-pointer`}
                    >
                      <div className="relative h-32">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className={`absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold rounded-md`}>
                          {item.time}
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-sm font-bold truncate pr-2">{item.name}</h4>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-bold">{item.rating}</span>
                          </div>
                        </div>
                        <p className="text-[10px] opacity-60">{item.category}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="category"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="px-6 py-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl ${current.headerFont}`}>{selectedCategory}</h3>
                <span className="text-xs opacity-60 font-bold">{filteredItems.length} resultados</span>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {filteredItems.map((item) => (
                  <motion.div 
                    key={`${mode}-${item.id}`}
                    onClick={() => setSelectedStore(item)}
                    whileTap={{ scale: 0.98 }}
                    className={`${current.card} overflow-hidden flex cursor-pointer`}
                  >
                    <div className="w-24 h-24 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-4 flex flex-col justify-center flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate mb-1">{item.name}</h4>
                      <div className="flex items-center gap-3 text-[10px] opacity-70">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold">{item.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.time}</span>
                        </div>
                      </div>
                      <button className={`mt-2 self-start px-3 py-1 ${current.accent} text-[9px] font-bold rounded-full`}>
                        Ver Tienda
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions / Promotions */}
        {!selectedStore && (
          <section className="px-6 py-2">
            <div className={`p-4 bg-zinc-900 text-white rounded-2xl flex items-center justify-between`}>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Membresía Prime</p>
                <h4 className="text-sm font-bold">Envíos ilimitados por $9.99</h4>
              </div>
              <ChevronRight className="w-5 h-5" />
            </div>
          </section>
        )}

        {/* Bottom Navigation */}
        {!selectedTracking && (
          <nav className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md ${mode === 'light' ? 'bg-white/90 border-t border-gray-100' : 'bg-zinc-900/90 border-t border-zinc-800'} backdrop-blur-xl px-8 py-4 flex justify-between items-center z-50`}>
            {[
              { id: 'home', icon: Home, label: 'Inicio' },
              { id: 'history', icon: History, label: 'Pedidos' },
              { id: 'profile', icon: User, label: 'Perfil' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === 'home') {
                    setSelectedCategory(null);
                    setSelectedStore(null);
                  }
                }}
                className={`flex flex-col items-center gap-1 transition-all ${activeTab === tab.id ? 'scale-110' : 'opacity-40'}`}
              >
                <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? 'text-deli-teal fill-deli-teal/10' : ''}`} />
                <span className={`text-[10px] font-bold ${activeTab === tab.id ? 'text-deli-teal' : ''}`}>{tab.label}</span>
              </button>
            ))}
          </nav>
        )}

      </div>
    </div>
  );
}
