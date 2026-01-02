import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ShoppingCart, X, Star, Video, Image as ImageIcon, ChevronRight, ChevronLeft, ChevronDown, HelpCircle, AlertCircle, Trash2, ShieldCheck, ShieldAlert, Check, Plus, Minus, Filter, Flame, TrendingUp, BookOpen, Rocket, Puzzle, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// CONFIGURATION
// ==========================================
// URL Script Versi 5 (Terbaru 2 Jan 2026)
const GOOGLE_SHEET_API_URL = "https://script.google.com/macros/s/AKfycbwGL3Qi0LYj82PqW4QBeGzKOdFI6ZIFW095JJNsMfWeI16WrACYSDEt0sar7LVk03AiJg/exec";

// --- UTILS & PARSERS ---

const parseCustomDescription = (text) => {
  if (!text || typeof text !== 'string') return <p className="text-slate-400">Tidak ada deskripsi.</p>;
  const paragraphs = text.split(';');
  return (
    <>
      {paragraphs.map((paragraph, idx) => {
        let cleanText = paragraph.replace(/<\/?p[0-9]+>/g, '');
        cleanText = cleanText.replace(/<b>(.*?)<\/b>/g, '<strong class="text-white">$1</strong>');
        cleanText = cleanText.replace(/<i>(.*?)<\/i>/g, '<em class="italic">$1</em>');
        cleanText = cleanText.replace(/<#([a-fA-F0-9]{6})>(.*?)<\/#\1>/g, '<span style="color:#$1">$2</span>');
        return <p key={idx} className="mb-3 leading-relaxed text-slate-300" dangerouslySetInnerHTML={{ __html: cleanText }} />;
      })}
    </>
  );
};

const isProductNew = (dateString) => {
  if (!dateString) return false;
  const createdDate = new Date(dateString);
  const today = new Date();
  createdDate.setHours(0,0,0,0);
  today.setHours(0,0,0,0);
  const diffTime = today - createdDate; 
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays >= 0 && diffDays <= 3;
};

// --- DATA MOCKUP (Cadangan) ---
const MOCK_PRODUCTS = Array.from({ length: 12 }, (_, i) => ({
  id: `MOCK_${i + 1}`,
  title: "Konten Eksklusif (Loading/Mock)",
  price: 50000,
  type: "Foto",
  image: `https://placehold.co/600x400/1a1a2e/e94560?text=Loading...`,
  buyers: 1,
  reviews: 5,
  rating: "4.5",
  isNSFW: false,
  artist: "System",
  description: "Data sedang dimuat atau gagal diambil.",
  source: 'mock' 
}));

const PAYMENT_METHODS = ["QRIS", "DANA", "OVO", "BNI", "MANDIRI", "SEABANK", "BSI", "VISA", "PAYPAL"];
const FAQS = [
  { q: "Apa itu NEETCHANIME?", a: "Platform konten digital anime dewasa." },
  { q: "Apakah aman?", a: "Aman dan terpercaya." },
  { q: "Bagaimana cara akses?", a: "Setelah pembayaran sukses, link download akan dikirim." }
];

// --- COMPONENTS ---

const ToastNotification = ({ data, onClose }) => {
  const [exitVariant, setExitVariant] = useState({ y: -100, opacity: 0, scale: 0.9 });
  useEffect(() => {
    const timer = setTimeout(() => { setExitVariant({ y: -100, opacity: 0, scale: 0.9 }); onClose(); }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      layout
      initial={{ y: 100, opacity: 0, scale: 0.8 }} 
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={exitVariant}
      className="fixed bottom-8 left-0 right-0 mx-auto w-fit z-[100] cursor-grab active:cursor-grabbing touch-none flex justify-center pointer-events-auto px-4"
    >
      <div className="inline-flex bg-gradient-to-r from-yellow-800 via-amber-700 to-yellow-900 border border-yellow-500/40 text-white rounded-xl shadow-lg w-auto max-w-[95vw] backdrop-blur-xl relative overflow-hidden">
        <div className="p-5 flex flex-row items-center gap-5 relative z-10">
          <div className="flex items-center justify-center bg-white/20 border border-white/30 rounded-lg px-4 py-2 min-w-[50px]">
            <span className="text-lg font-bold text-white tabular-nums">{data.quantity}x</span>
          </div>
          <div className="flex flex-col gap-2 min-w-0">
             <span className="text-base font-bold text-white leading-snug line-clamp-2">{data.productName}</span>
             <div className="h-[1px] w-full bg-white/55" />
             <div className="flex items-center gap-2">
                <Check size={14} className="text-green-400 stroke-[4]" />
                <span className="font-medium text-sm text-yellow-50/90">Sukses Masuk di Keranjang!</span>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Header = ({ cartCount, openCart }) => (
  <nav className="fixed top-0 left-0 right-0 z-[60] bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-2xl w-full">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <div className="flex items-center gap-2"><span className="text-2xl font-bold text-white">NEETCHANIME</span></div>
      <button onClick={openCart} className="relative p-2 text-slate-300">
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">{cartCount}</div>
        <ShoppingCart className="w-6 h-6" />
      </button>
    </div>
  </nav>
);

const Hero = () => {
    const smoothScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };
    return (
        <section className="relative pt-32 pb-12 overflow-hidden w-full text-center">
            <h1 className="text-5xl font-bold text-white mb-4">NEETCHANIME</h1>
            <p className="text-slate-400 mb-8">Platform Konten Digital Terbaik</p>
             <div className="flex justify-center gap-4 mb-16">
            <button onClick={() => smoothScroll('shop')} className="px-8 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full font-bold hover:shadow-lg hover:shadow-red-500/25 transition-all transform hover:-translate-y-1 touch-manipulation">Lihat Koleksi</button>
            <button onClick={() => smoothScroll('faq')} className="px-8 py-3 border border-slate-700 text-white rounded-full font-bold hover:border-red-500 hover:text-red-400 transition-all touch-manipulation">Info Legal</button>
          </div>
          {/* Feature Boxes */}
          <div className="max-w-5xl mx-auto mt-24">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }} className="flex items-center justify-center gap-4 mb-10">
              <div className="h-[2px] bg-gradient-to-r from-transparent to-slate-700 flex-1 max-w-[100px]"></div>
              <h2 className="text-2xl md:text-4xl font-bold text-white text-center tracking-wide">Mengapa Harus NEETCHANIME?</h2>
              <div className="h-[2px] bg-gradient-to-l from-transparent to-slate-700 flex-1 max-w-[100px]"></div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-4 w-full">
               <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.1, duration: 0.5 }} className="bg-slate-900/40 border border-pink-500 p-6 rounded-2xl shadow-[0_0_25px_rgba(236,72,153,0.3)] hover:shadow-[0_0_50px_rgba(236,72,153,0.6)] hover:scale-105 transition-all duration-300 group relative overflow-visible backdrop-blur-sm">
                  <div className="flex flex-row items-center text-left gap-4 h-full">
                    <div className="bg-pink-500/10 w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 border border-pink-500/30 shadow-[inset_0_0_10px_rgba(236,72,153,0.2)] group-hover:bg-pink-500/20 transition-colors"><Rocket className="text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]" size={32} /></div>
                    <div><h3 className="font-bold text-white text-lg leading-tight">Tanpa Limit Kecepatan Internet</h3></div>
                  </div>
              </motion.div>
               <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.2, duration: 0.5 }} className="bg-slate-900/40 border border-violet-500 p-6 rounded-2xl shadow-[0_0_25px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.6)] hover:scale-105 transition-all duration-300 group relative overflow-visible backdrop-blur-sm">
                  <div className="flex flex-row items-center text-left gap-4 h-full">
                    <div className="bg-violet-500/10 w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 border border-violet-500/30 shadow-[inset_0_0_10px_rgba(139,92,246,0.2)] group-hover:bg-violet-500/20 transition-colors"><Puzzle className="text-violet-500 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" size={32} /></div>
                    <div><h3 className="font-bold text-white text-lg leading-tight">Kompatible di Berbagai Perangkat</h3></div>
                  </div>
              </motion.div>
               <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.3, duration: 0.5 }} className="bg-slate-900/40 border border-cyan-500 p-6 rounded-2xl shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] hover:scale-105 transition-all duration-300 group relative overflow-visible backdrop-blur-sm">
                  <div className="flex flex-row items-center text-left gap-4 h-full">
                    <div className="bg-cyan-500/10 w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 border border-cyan-500/30 shadow-[inset_0_0_10px_rgba(6,182,212,0.2)] group-hover:bg-cyan-500/20 transition-colors"><Monitor className="text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" size={32} /></div>
                    <div><h3 className="font-bold text-white text-lg leading-tight">Kualitas Lebih Jernih (2K hingga 4K)</h3></div>
                  </div>
              </motion.div>
            </div>
          </div>
        </section>
    )
};

// --- PRODUCT CARD (PERBAIKAN: REFERRER POLICY & FALLBACK VISIBILITY) ---
const ProductCard = ({ product, onAdd, onOpenPreview, variants }) => {
  const isNew = useMemo(() => {
    if (product.source === 'google_sheet') {
      return isProductNew(product.dateCreated);
    }
    return false;
  }, [product]);

  const displayImage = product.imageCrop ? product.imageCrop : (product.imageFull ? product.imageFull : product.image);
  const productType = product.category1 || product.type || 'Item';
  const isNSFW = (product.category2 === 'NSFW') || (product.isNSFW === true);

  return (
    <motion.div 
      variants={variants}
      whileHover={{ y: -8 }}
      onClick={() => onOpenPreview(product)}
      className="bg-slate-900/95 border border-slate-800 rounded-2xl overflow-hidden group shadow-xl hover:shadow-red-900/20 transition-all duration-300 flex flex-col h-full relative cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-950">
        {/* FIX: Tambahkan referrerPolicy="no-referrer" untuk menghindari blokir CORS dari host gambar */}
        <img 
          src={displayImage} 
          alt={product.title} 
          loading="lazy"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700 ${isNSFW ? 'brightness-75 group-hover:brightness-100' : ''}`}
          onError={(e) => { 
            // FIX: Jangan sembunyikan (display: none), tapi ganti source ke placeholder agar box tetap ada
            e.target.onerror = null; 
            e.target.src = 'https://placehold.co/400x400/1a1a2e/e94560?text=No+Image'; 
          }}
        />
        
        {/* Type Badge */}
        <div className="absolute top-2 left-2 z-10">
          <span className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold shadow-lg backdrop-blur-md border border-white/10 ${
             (productType.toLowerCase().includes('video')) 
              ? 'bg-gradient-to-br from-slate-900 to-purple-900 text-white' 
              : 'bg-gradient-to-br from-green-800 to-emerald-900 text-white' 
          }`}>
             {productType.toLowerCase().includes('video') ? <Video size={10} /> : <ImageIcon size={10} />}
             {productType}
          </span>
        </div>

        {/* Safety Badge */}
        <div className="absolute top-2 right-2 z-10">
          <span className={`text-[10px] px-2 py-1 rounded font-bold border ${isNSFW ? 'bg-red-600/90 border-red-400 text-white' : 'bg-blue-600/90 border-blue-400 text-white'}`}>
            {isNSFW ? '18+' : 'SAFE'}
          </span>
        </div>

        {/* Badge Terbaru */}
        {isNew && (
          <div className="absolute bottom-2 left-2 z-10">
             <span className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold text-white shadow-lg backdrop-blur-md bg-gradient-to-r from-blue-900 to-blue-800 border border-blue-400/50">
               <Flame size={10} className="text-blue-300 animate-pulse" fill="currentColor" />
               Terbaru
             </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
      </div>
      
      <div className="p-3 md:p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2 text-slate-500 text-[10px] font-medium">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <span className="text-slate-300">4.9</span>
          <span>•</span>
          <span>{product.buyers} terjual</span>
        </div>
        
        <h3 className="text-white font-bold text-sm leading-snug mb-1 line-clamp-2 group-hover:text-red-400 transition-colors">
          {product.title}
        </h3>
        
        <p className="text-slate-500 text-xs mb-3 font-mono">
          Artist: <span className="text-slate-400">{product.artist || 'Anonymous'}</span>
        </p>
        
        <div className="mt-auto pt-3 border-t border-slate-800 flex justify-between items-center">
          <span className="text-red-400 font-bold text-sm">Rp{Number(product.price).toLocaleString('id-ID')}</span>
          <button 
            onClick={(e) => { e.stopPropagation(); onAdd(product); }}
            className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-500 transition-colors"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- PREVIEW MODAL (FULL IMAGE CENTERED 16:9) ---
const ProductPreviewModal = ({ product, isOpen, onClose, onAdd }) => {
  if (!product) return null;

  const previewImage = product.imageFull ? product.imageFull : (product.imageCrop ? product.imageCrop : product.image);
  const productType = product.category1 || product.type;
  const isNSFW = (product.category2 === 'NSFW') || (product.isNSFW === true);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-24 bg-slate-950/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-slate-900 w-full max-w-5xl rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-red-600 transition-colors"><X size={20}/></button>

            <div className="w-full md:w-[60%] bg-slate-950 flex items-center justify-center p-0 relative overflow-hidden group h-56 md:h-auto aspect-video md:aspect-auto">
               <img
                  src={previewImage}
                  alt={product.title}
                  referrerPolicy="no-referrer" // FIX: Tambahkan ini juga di modal
                  onError={(e) => { e.target.src = 'https://placehold.co/800x450/1a1a2e/e94560?text=No+Preview'; }}
                  className="w-full h-full object-contain object-center aspect-video"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 md:opacity-30"></div>
               
               {isNSFW && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-red-600 text-white text-xs font-extrabold rounded-lg shadow-lg border border-red-400 animate-pulse-slow">
                    18+ CONTENT
                  </div>
               )}
            </div>

            <div className="w-full md:w-[40%] flex flex-col bg-slate-900 overflow-hidden flex-1">
                <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">{product.title}</h2>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-slate-800">
                        <div className="flex items-center text-amber-400"><Star size={14} fill="currentColor"/> <span className="ml-1 font-bold">4.9</span></div>
                        <span>•</span>
                        <span>{product.buyers} Pembeli</span>
                        <span>•</span>
                        <span className="font-mono text-white bg-slate-800 px-2 py-0.5 rounded">{product.artist || 'Unknown'}</span>
                    </div>
                    
                    <div className="prose prose-invert prose-sm text-slate-300 leading-relaxed">
                        {product.source === 'google_sheet' ? parseCustomDescription(product.description) : <p>{product.description}</p>}
                    </div>
                </div>

                <div className="p-4 bg-slate-900 border-t border-slate-800">
                    <div className="flex justify-between items-end mb-4">
                         <span className="text-xs text-slate-500 uppercase font-bold">Harga Paket</span>
                         <span className="text-2xl font-bold text-red-400">Rp{Number(product.price).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex gap-3">
                        <div className="px-4 py-3 rounded-xl border border-slate-700 text-slate-300 text-sm font-bold flex items-center justify-center">
                           {productType}
                        </div>
                        <button onClick={() => onAdd(product)} className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl py-3 flex items-center justify-center gap-2 transition-colors">
                           <ShoppingCart size={18}/> Beli Sekarang
                        </button>
                    </div>
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ShopSection = ({ addToCart }) => {
  const [sheetProducts, setSheetProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const [direction, setDirection] = useState(0);

  // Filter States
  const [activeFilters, setActiveFilters] = useState([]); 
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            // Timestamp to prevent cache
            const response = await fetch(`${GOOGLE_SHEET_API_URL}?t=${new Date().getTime()}`, {
              redirect: 'follow', // Penting untuk GAS
            });
            
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            if (Array.isArray(data)) {
                setSheetProducts(data);
            }
        } catch (error) {
            console.error("Gagal memuat data sheet:", error);
            // Fallback: Bisa set MOCK_PRODUCTS jika fetch gagal total
        } finally {
            setLoading(false);
        }
    };
    fetchData();
    
    const handleResize = () => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        setItemsPerPage(mobile ? 6 : 10);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleFilter = (filterType) => {
    if (filterType === 'default') {
      setActiveFilters([]);
      return;
    }
    setActiveFilters(prev => {
      const exists = prev.includes(filterType);
      if (exists) {
        return prev.filter(f => f !== filterType);
      } else {
        if (prev.length >= 2) {
          return [...prev.slice(1), filterType];
        }
        return [...prev, filterType];
      }
    });
  };

  const processedProducts = useMemo(() => {
    // 1. Merge: Sheet first, then Mock
    let result = [...sheetProducts, ...MOCK_PRODUCTS];

    // 2. Sort Logic
    // Default: Sheet products first (source === 'google_sheet')
    // If specific sort filters are applied, prioritize sheet logic first, then sort criteria
    
    // Base Sort: Sheets on Top
    result.sort((a, b) => {
        if (a.source === 'google_sheet' && b.source === 'mock') return -1;
        if (a.source === 'mock' && b.source === 'google_sheet') return 1;
        return 0; 
    });

    if (activeFilters.length > 0) {
      result.sort((a, b) => {
        if (a.source !== b.source) {
             return a.source === 'google_sheet' ? -1 : 1;
        }
        for (const filter of activeFilters) {
          let comparison = 0;
          switch (filter) {
            case 'best_selling': 
              comparison = b.buyers - a.buyers;
              break;
            case 'top_rated': 
              comparison = parseFloat(b.rating) - parseFloat(a.rating);
              break;
            case 'newest': 
              // Already handled by sheet order (date), but for mocks use ID
              comparison = b.id.toString().localeCompare(a.id.toString());
              break;
            default:
              break;
          }
          if (comparison !== 0) return comparison;
        }
        return 0;
      });
    }

    return result;
  }, [activeFilters, sheetProducts]);

  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);
  const currentProducts = processedProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const changePage = (newPage) => {
    setDirection(newPage > page ? 1 : -1);
    setPage(newPage);
  };

  return (
    <section id="shop" className="pt-8 pb-20 bg-slate-950 w-full px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
             <div className="text-white">
                <h2 className="text-3xl font-bold mb-1">Koleksi Terbaru</h2>
                <p className="text-slate-400 text-sm">Update harian dari konten kreator</p>
             </div>
             
             {/* Pagination Controls */}
             <div className="flex items-center gap-2">
                {/* Simplified for brevity, reuse full implementation from previous step if needed */}
                <button 
                  onClick={() => changePage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="p-2 bg-slate-800 rounded disabled:opacity-50 text-white"
                >
                  <ChevronLeft />
                </button>
                <span className="p-2 text-white font-mono">{page} / {totalPages}</span>
                <button 
                  onClick={() => changePage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="p-2 bg-slate-800 rounded disabled:opacity-50 text-white"
                >
                  <ChevronRight />
                </button>
             </div>
        </div>

        {loading ? (
            <div className="text-center text-white py-20">Sedang memuat data terbaru...</div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <AnimatePresence mode='wait' custom={direction}>
                    {currentProducts.map((product) => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        onAdd={addToCart} 
                        onOpenPreview={setSelectedProduct} 
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }} 
                    />
                    ))}
                </AnimatePresence>
            </div>
        )}
      </div>

      <ProductPreviewModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAdd={addToCart}
      />
    </section>
  );
};

const FAQSection = () => {
    // Simple implementation
    return (
        <section className="py-12 bg-slate-950 text-center">
            <h2 className="text-2xl text-white font-bold mb-6">FAQ</h2>
            <div className="max-w-3xl mx-auto space-y-4 px-4">
                {FAQS.map((f, i) => (
                    <div key={i} className="bg-slate-900 p-4 rounded text-left border border-slate-800">
                        <h3 className="text-red-400 font-bold">{f.q}</h3>
                        <p className="text-slate-400 mt-1">{f.a}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
const Footer = () => (
    <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center text-slate-500">
        <p>Copyright © 2026 NEETCHANIME. All rights reserved.</p>
    </footer>
);

// --- MAIN APP ---
const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const addToCart = (product) => {
    let newQty = 1;
    const existingItem = cart.find(p => p.id === product.id);
    if (existingItem) { newQty = existingItem.quantity + 1; }
    
    setNotification({ id: Date.now(), productName: product.title, quantity: newQty });
    
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) { return prev.map(p => p.id === product.id ? {...p, quantity: p.quantity + 1} : p); }
      return [...prev, {...product, quantity: 1}];
    });
  };
  
  const updateQuantity = (id, delta) => { setCart(prev => prev.map(item => { if (item.id === id) { const newQuantity = item.quantity + delta; return newQuantity > 0 ? {...item, quantity: newQuantity} : item; } return item; })); };
  const setCartQuantity = (id, quantity) => { if (quantity < 1) return; setCart(prev => prev.map(item => item.id === id ? {...item, quantity} : item)); };
  const removeItem = (id) => { setCart(prev => prev.filter(item => item.id !== id)); };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 overflow-x-hidden w-full font-sans">
      <style>{`
        ::-webkit-scrollbar { width: 13px !important; background: transparent !important; }
        ::-webkit-scrollbar-track { background: #020617 !important; border: none !important; margin: 0 !important; }
        ::-webkit-scrollbar-thumb { background-color: #334155 !important; border-radius: 13px !important; border: 0px solid transparent !important; background-clip: content-box !important; }
        ::-webkit-scrollbar-thumb:hover { background-color: #475569 !important; }
        ::-webkit-scrollbar-button { display: none !important; width: 0 !important; height: 0 !important; }
        ::-webkit-scrollbar-corner { background: transparent !important; }
        * { scrollbar-width: thin; scrollbar-color: #334155 #020617; }
      `}</style>
      
      <Header cartCount={cart.length} openCart={() => setIsCartOpen(true)} />
      <Hero />
      <ShopSection addToCart={addToCart} />
      <FAQSection />
      
      <AnimatePresence>
        {notification && <ToastNotification key={notification.id} data={notification} onClose={() => setNotification(null)} />}
      </AnimatePresence>
      <AnimatePresence>
          {isCartOpen && <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} updateQuantity={updateQuantity} removeItem={removeItem} setCartQuantity={setCartQuantity}/>}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
};

export default App;
