import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ShoppingCart, X, Star, Video, Image as ImageIcon, ChevronRight, ChevronLeft, ChevronDown, HelpCircle, AlertCircle, Trash2, ShieldCheck, ShieldAlert, Check, Plus, Minus, Info, Filter, Flame, TrendingUp, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA MOCKUP GENERATOR ---
const generateProducts = () => {
  const types = ['Video', 'Foto'];
  const titles = [
    "Midnight Collection Vol.1", "Secret Voice Pack ASMR", "Private Session Art", 
    "Uncensored Fantasy Pack", "Late Night Vibes", "Forbidden Grimoire",
    "Adult Model Reference", "Bedroom Backgrounds", "Sensual Poses Pack",
    "Hidden Folder Material", "Exclusive Fanbox Content", "After Dark Stream",
    "VIP Member Only Set", "Romantic Scene Assets", "Mature Aura Effect",
    "Dungeon of Desire Map", "Seductive Eyes Texture", "Body Physics Preset",
    "Crimson Night Shader", "Hotel Room Assets", "Fantasy Armor (Broken)",
    "Wet Skin Material", "Pixel Art NSFW Sprites", "Secret Garden Tileset",
    "Couple Pose Reference", "Love Letter Font", "Retro VHS Filter 18+",
    "Glitch Effect (Red)", "Heartbeat Overlay", "Visual Novel R-18 UI"
  ];

  // Generate 25 items
  return Array.from({ length: 25 }, (_, i) => {
    const price = (Math.floor(Math.random() * 6) + 45) * 1000; 
    const buyers = Math.floor(Math.random() * 50) + 1;
    const reviews = Math.floor(Math.random() * buyers) + 1;
    const isNSFW = Math.random() < 0.8; 

    return {
      id: i + 1,
      title: titles[i % titles.length] + (i > 15 ? ` V${Math.floor(i/5)}` : ''),
      price: price,
      type: types[Math.floor(Math.random() * types.length)],
      image: `https://placehold.co/600x400/1a1a2e/e94560?text=${isNSFW ? 'R-18+Content' : 'Anime+Content'}+${i+1}`,
      buyers: buyers,
      reviews: reviews,
      rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1),
      isNSFW: isNSFW,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit."
    };
  });
};

const PRODUCTS = generateProducts();

const PAYMENT_METHODS = [
  "QRIS", "DANA", "OVO", "BNI", "MANDIRI", "SEABANK", "BSI", "VISA", "PAYPAL"
];

// UPDATED: FAQ Content Replaced
const FAQS = [
  {
    q: "Apa sih NEETCHANIME itu?",
    a: "NEETCHANIME adalah tempat seru buat kamu yang suka banget sama anime dan game dewasa! Kami jual berbagai konten anime dan game dengan kualitas resolusi tinggi dari 2K hingga 4K. Gak cuma itu, semua file yang kamu beli di sini sudah dioptimalkan untuk berbagai perangkat, jadi gak perlu khawatir nonton atau mainnya nge-lag!"
  },
  {
    q: "Kenapa sih resolusi konten di NEETCHANIME tinggi banget?",
    a: "Mimin tahu banget kalau kamu suka yang tajam dan detail, makanya kami pastikan semua konten yang tersedia di NEETCHANIME punya kualitas 2K hingga 4K. Jadi, siap-siap aja nonton anime atau main game dengan gambar super jelas, yang bikin pengalaman makin asik!"
  },
  {
    q: "Apakah ada batasan kecepatan unduhan?",
    a: "Tenang aja, gak ada limit kecepatan unduhan di NEETCHANIME! Kamu bisa download sepuasnya tanpa takut internet lemot atau terhenti di tengah jalan. Cukup klik tautan unduhan yang tersedia, dan biarkan Mimin urus sisanya!"
  },
  {
    q: "Apa saya bisa akses NEETCHANIME di semua perangkat?",
    a: "Bener banget! Semua konten di NEETCHANIME sudah dioptimalkan untuk berbagai perangkat. Entah itu di PC, laptop, atau handphone, kamu tetap bisa menikmati konten anime dan game kesukaanmu dengan nyaman, tanpa masalah resolusi atau loading yang lama!"
  },
  {
    q: "Bagaimana cara membeli dan mengunduh konten di NEETCHANIME?",
    a: "Gampang banget! Kamu tinggal pilih konten yang kamu suka di situs NEETCHANIME, klik beli, dan ikuti petunjuk untuk pembayaran. Setelah itu, Mimin bakal kirimkan tautan unduhan tanpa limit kecepatan. Kamu tinggal klik dan langsung nikmatin konten seru tanpa ribet!"
  }
];

// --- COMPONENTS ---

const Header = ({ cartCount, openCart }) => (
  <nav className="fixed top-0 left-0 right-0 z-[60] bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-2xl transform-gpu transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-pink-600 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/20 ring-1 ring-white/10">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 font-mono tracking-tighter">
            NEETCHANIME
          </span>
        </div>
        
        <button 
          onClick={openCart}
          className="relative p-2 text-slate-300 hover:text-white transition-colors group touch-manipulation"
        >
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-md animate-pulse">
            {cartCount}
          </div>
          <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  </nav>
);

const Hero = () => {
  const smoothScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="absolute top-20 right-0 w-72 h-72 bg-red-600/20 rounded-full blur-3xl -z-10 transform-gpu"></div>
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl -z-10 transform-gpu"></div>
      
      <div className="max-w-4xl mx-auto px-4 text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-1.5 rounded-full border border-red-500/30 text-red-400 text-xs font-semibold tracking-wider uppercase bg-red-500/10 mb-6 inline-block backdrop-blur-sm">
            Strictly for Adults (18+)
          </span>
          <h1 className="font-extrabold mb-6 tracking-tighter leading-tight md:leading-none">
            <span className="block text-5xl sm:text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.25)] pb-2 break-words tracking-tighter">
              NEETCHANIME
            </span>
            <span className="block text-2xl sm:text-4xl md:text-5xl mt-1 md:mt-2 font-extrabold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-900 mr-2">Platform</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mr-2">R34</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Terbaik</span>
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Platform eksklusif penyedia aset digital dan animasi premium. 
            Jelajahi koleksi terkurasi untuk kolektor yang menghargai keindahan estetika sepenuhnya.
          </p>
          
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => smoothScroll('shop')}
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full font-bold hover:shadow-lg hover:shadow-red-500/25 transition-all transform hover:-translate-y-1 touch-manipulation"
            >
              Lihat Koleksi
            </button>
            <button 
              onClick={() => smoothScroll('faq')}
              className="px-8 py-3 border border-slate-700 text-white rounded-full font-bold hover:border-red-500 hover:text-red-400 transition-all touch-manipulation"
            >
              Info Legal
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProductCard = ({ product, onAdd, onOpenPreview, variants }) => (
  <motion.div 
    variants={variants}
    whileHover={{ y: -8 }}
    onClick={() => onOpenPreview(product)}
    className="bg-slate-900/95 border border-slate-800 rounded-2xl overflow-hidden group shadow-xl hover:shadow-red-900/20 transition-all duration-300 flex flex-col h-full relative transform-gpu cursor-pointer"
  >
    <div className="relative h-32 md:h-48 overflow-hidden">
      <img 
        src={product.image} 
        alt={product.title} 
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ${product.isNSFW ? 'brightness-90 group-hover:brightness-100' : ''}`}
      />
      
      <div className="absolute top-2 md:top-3 left-2 md:left-3 z-10">
        <span className={`flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-[10px] md:text-xs font-bold shadow-lg backdrop-blur-md border border-white/10 ${
          product.type === 'Foto' 
            ? 'bg-gradient-to-br from-green-800 to-emerald-900 text-white' 
            : 'bg-gradient-to-br from-slate-900 to-purple-900 text-white' 
        }`}>
          {product.type === 'Video' ? <Video size={10} className="md:w-[14px] md:h-[14px]" /> : <ImageIcon size={10} className="md:w-[14px] md:h-[14px]" />}
          {product.type}
        </span>
      </div>

      <div className="absolute top-2 md:top-3 right-2 md:right-3 z-10">
        {product.isNSFW ? (
          <span className="flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-[10px] md:text-xs font-extrabold text-white shadow-lg backdrop-blur-md bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500 border border-yellow-500/30 animate-pulse-slow">
            <ShieldAlert size={10} className="md:w-[14px] md:h-[14px]" />
            18+
          </span>
        ) : (
          <span className="flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-[10px] md:text-xs font-bold text-white shadow-lg backdrop-blur-md bg-gradient-to-r from-blue-400 to-cyan-400 border border-blue-400/30">
            <ShieldCheck size={10} className="md:w-[14px] md:h-[14px]" />
            Safe
          </span>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
    </div>

    {/* Content */}
    <div className="p-3 md:p-5 flex-1 flex flex-col">
      <div className="flex items-center gap-2 mb-1.5 md:mb-2 text-slate-500 text-[10px] md:text-xs font-medium">
        <div className="flex items-center text-amber-400">
          <Star size={10} className="md:w-[12px] md:h-[12px]" fill="currentColor" />
          <span className="ml-1 text-slate-300">{product.rating}</span>
        </div>
        <span>•</span>
        <span>{product.buyers} buyers</span>
      </div>

      <h3 className="text-slate-100 font-bold text-sm md:text-lg leading-snug mb-1 md:mb-3 line-clamp-2 group-hover:text-red-400 transition-colors">
        {product.title}
      </h3>

      <p className="text-slate-500 text-[10px] md:text-xs mb-3 font-mono mt-auto">
        Artist: <span className="text-slate-400">Anonymous</span>
      </p>

      <div className="pt-3 md:pt-4 border-t border-slate-800 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-slate-500 text-[8px] md:text-[10px] uppercase tracking-wider">Harga</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400 font-bold text-sm md:text-lg">
            Rp{product.price.toLocaleString('id-ID')}
          </span>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation(); 
            onAdd(product);
          }}
          className="bg-gradient-to-br from-pink-600 to-violet-700 text-white p-2 md:p-3 rounded-xl transition-all shadow-lg shadow-pink-900/20 hover:shadow-pink-600/40 hover:scale-105 active:scale-95 flex items-center justify-center border border-white/5 touch-manipulation"
          title="Tambahkan ke Keranjang"
        >
          <ShoppingCart size={16} className="md:w-[18px] md:h-[18px]" />
        </button>
      </div>
    </div>
  </motion.div>
);

const ProductPreviewModal = ({ product, isOpen, onClose, onAdd }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-24 md:p-6 md:pt-28"
        >
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" 
            onClick={onClose} 
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative bg-slate-900 w-full max-w-6xl rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col md:flex-row z-50 h-[80vh] md:h-auto md:max-h-[calc(100vh-140px)]"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 p-2 bg-black/40 hover:bg-red-500/80 rounded-full text-white transition-colors backdrop-blur-sm border border-white/10"
            >
              <X size={20} />
            </button>

            <div className="w-full md:w-[60%] bg-slate-950 flex items-center justify-center p-0 relative overflow-hidden group h-56 md:h-auto aspect-video md:aspect-auto">
               <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover md:absolute md:inset-0"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 md:opacity-30"></div>
               
               {product.isNSFW && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-red-600 text-white text-xs font-extrabold rounded-lg shadow-lg border border-red-400 animate-pulse-slow">
                    18+ CONTENT
                  </div>
               )}
            </div>

            <div className="w-full md:w-[40%] flex flex-col bg-slate-900 overflow-hidden flex-1">
                <div className="p-5 md:p-6 overflow-y-auto custom-scrollbar flex-1">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">{product.title}</h2>

                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800 flex-wrap">
                        <div className="flex items-center text-amber-400">
                            <Star size={14} fill="currentColor" />
                            <span className="ml-1 font-bold text-white">{product.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{product.buyers} bought</span>
                        <span>•</span>
                        <span className="font-mono text-slate-300">Anon</span>
                    </div>

                    <div className="prose prose-invert prose-xs text-slate-300 leading-relaxed mb-6 text-sm">
                        <p>{product.description}</p>
                    </div>
                </div>

                <div className="px-5 py-3 bg-slate-900/90 border-t border-slate-800 backdrop-blur-sm mt-auto">
                    <div className="flex items-end justify-between mb-3">
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Total</p>
                            <p className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
                                Rp{product.price.toLocaleString('id-ID')}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        {/* Category Button (Left) */}
                        <div className={`px-5 flex items-center justify-center rounded-xl font-bold text-sm border border-white/10 ${
                            product.type === 'Video' 
                            ? 'bg-gradient-to-br from-slate-800 to-purple-900/50 text-purple-200' 
                            : 'bg-gradient-to-br from-slate-800 to-emerald-900/50 text-emerald-200'
                        }`}>
                            {product.type === 'Video' ? <Video size={20} className="mr-2"/> : <ImageIcon size={20} className="mr-2"/>}
                            {product.type} Only
                        </div>

                        {/* Add to Cart Button (Right) */}
                        <button
                            onClick={() => {
                                onAdd(product);
                            }}
                            className="flex-1 py-3.5 bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white rounded-xl font-bold shadow-lg shadow-pink-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm"
                        >
                            <ShoppingCart size={18} />
                            <span>Add to Cart</span>
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
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null); 

  // Filter States
  const [activeFilters, setActiveFilters] = useState([]); // Array of strings: 'best_selling', 'top_rated', 'newest'
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setItemsPerPage(6); 
      } else {
        setItemsPerPage(10); 
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter Logic
  const toggleFilter = (filterType) => {
    if (filterType === 'default') {
      setActiveFilters([]);
      return;
    }

    setActiveFilters(prev => {
      // If currently selecting a normal filter, remove 'default' implicit behavior (empty array)
      
      const exists = prev.includes(filterType);
      if (exists) {
        return prev.filter(f => f !== filterType);
      } else {
        // Max 2 filters. If 2 already selected, remove the first one (FIFO)
        if (prev.length >= 2) {
          return [...prev.slice(1), filterType];
        }
        return [...prev, filterType];
      }
    });
  };

  // Processing Products (Filter -> Sort -> Pagination)
  const processedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Sorting Logic based on activeFilters
    // If activeFilters is empty, it means "Default" (ID ascending / insertion order)
    if (activeFilters.length > 0) {
      result.sort((a, b) => {
        for (const filter of activeFilters) {
          let comparison = 0;
          switch (filter) {
            case 'best_selling': // Terlaris (Most Buyers)
              comparison = b.buyers - a.buyers;
              break;
            case 'top_rated': // Terbaik (Highest Rating)
              comparison = parseFloat(b.rating) - parseFloat(a.rating);
              break;
            case 'newest': // Terupdate (Highest ID assumed newest)
              comparison = b.id - a.id;
              break;
            default:
              break;
          }
          if (comparison !== 0) return comparison;
        }
        return 0;
      });
    } else {
       // Default Sort: ID Ascending (restore original order if mixed)
       result.sort((a, b) => a.id - b.id); 
    }

    return result;
  }, [activeFilters]);
  
  const totalPages = Math.ceil(processedProducts.length / itemsPerPage); 
  
  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [activeFilters]);

  const currentProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return processedProducts.slice(start, start + itemsPerPage);
  }, [page, itemsPerPage, processedProducts]);

  const changePage = (newPage) => {
    if (newPage > page) {
      setDirection(1); 
    } else if (newPage < page) {
      setDirection(-1); 
    }
    setPage(newPage);
  };

  const getPaginationGroup = () => {
    const maxVisibleButtons = isMobile ? 3 : 5;
    let startPage = Math.max(1, page - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
        startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    return new Array(endPage - startPage + 1).fill().map((_, idx) => startPage + idx);
  };

  const paginationGroup = getPaginationGroup();
  const showArrows = isMobile || totalPages > 5;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24
      }
    }
  };

  const paginationVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 20 : -20, 
      opacity: 0,
      scale: 0.5,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 } 
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction > 0 ? -20 : 20, 
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.2 }
    })
  };

  return (
    <section id="shop" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
              Koleksi Premium <span className="text-red-500 text-sm border border-red-500/50 px-2 py-0.5 rounded uppercase">Mature</span>
            </h2>
            <p className="text-slate-400">Terlaris bulan ini</p>
          </div>
          
          {/* UPDATED: Added 'w-full md:w-auto' and 'justify-between' to push filter to right edge on mobile */}
          <div className="flex items-center justify-between w-full md:w-auto gap-2">
            <div className="flex flex-wrap items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl overflow-hidden">
              {showArrows && (
                <button
                  onClick={() => changePage(Math.max(page - 1, 1))}
                  disabled={page === 1}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all touch-manipulation ${
                    page === 1 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>
              )}

              <div className="flex items-center gap-1 h-9">
                <AnimatePresence mode='popLayout' custom={direction} initial={false}>
                    {paginationGroup.map((num) => (
                      <motion.button
                        key={num}
                        layout
                        custom={direction}
                        variants={paginationVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        onClick={() => changePage(num)}
                        className="relative w-9 h-9 flex items-center justify-center rounded-lg font-bold text-sm touch-manipulation overflow-visible"
                      >
                        {page === num && (
                          <motion.div
                            layoutId="activePage"
                            className="absolute inset-0 bg-gradient-to-br from-red-600 to-pink-600 rounded-lg shadow-lg"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1.15 }}
                            transition={{ type: "spring", stiffness: 500, damping: 15, mass: 0.5 }}
                            whileTap={{ scale: 0.9 }}
                          />
                        )}
                        <span className={`relative z-10 ${page === num ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
                          {num}
                        </span>
                      </motion.button>
                    ))}
                </AnimatePresence>
              </div>

              {showArrows && (
                <button
                  onClick={() => changePage(Math.min(page + 1, totalPages))}
                  disabled={page === totalPages}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all touch-manipulation ${
                    page === totalPages ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <ChevronRight size={18} />
                </button>
              )}
            </div>

            {/* MODERN FILTER BUTTON & DROPDOWN */}
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`h-[52px] w-[52px] flex items-center justify-center rounded-xl border transition-all ${
                  isFilterOpen || activeFilters.length > 0
                    ? 'bg-slate-800 border-pink-500/50 text-pink-400 shadow-lg shadow-pink-500/10' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Filter size={20} />
                {activeFilters.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                    {activeFilters.length}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-2 space-y-1">
                       <button
                          onClick={() => toggleFilter('best_selling')}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            activeFilters.includes('best_selling') 
                              ? 'bg-orange-500/10 text-orange-400' 
                              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Flame size={16} className={activeFilters.includes('best_selling') ? 'fill-orange-400 text-orange-400' : ''} />
                            <span>Terlaris</span>
                          </div>
                          {activeFilters.includes('best_selling') && <Check size={14} />}
                        </button>

                        <button
                          onClick={() => toggleFilter('top_rated')}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            activeFilters.includes('top_rated') 
                              ? 'bg-yellow-500/10 text-yellow-400' 
                              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Star size={16} className={activeFilters.includes('top_rated') ? 'fill-yellow-400 text-yellow-400' : ''} />
                            <span>Terbaik</span>
                          </div>
                          {activeFilters.includes('top_rated') && <Check size={14} />}
                        </button>

                        <button
                          onClick={() => toggleFilter('newest')}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            activeFilters.includes('newest') 
                              ? 'bg-emerald-500/10 text-emerald-400' 
                              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <TrendingUp size={16} className={activeFilters.includes('newest') ? 'text-emerald-400' : ''} />
                            <span>Terupdate</span>
                          </div>
                          {activeFilters.includes('newest') && <Check size={14} />}
                        </button>

                        <div className="h-px bg-slate-800 my-1" />

                        <button
                          onClick={() => toggleFilter('default')}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            activeFilters.length === 0
                              ? 'bg-amber-500/10 text-amber-400' 
                              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <BookOpen size={16} className={activeFilters.length === 0 ? 'text-amber-400' : ''} />
                            <span>Default</span>
                          </div>
                          {activeFilters.length === 0 && <Check size={14} />}
                        </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <AnimatePresence mode='wait'>
          <motion.div 
            key={page} 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 transform-gpu"
          >
            {currentProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={addToCart} 
                onOpenPreview={setSelectedProduct} 
                variants={itemVariants}
              />
            ))}
          </motion.div>
        </AnimatePresence>
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

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-colors duration-300 hover:border-slate-700">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-slate-800/40 transition-colors focus:outline-none touch-manipulation"
      >
        <h3 className="text-white font-bold text-lg flex items-start gap-3">
          <span className="text-red-500 font-serif italic">Q.</span>
          {faq.q}
        </h3>
        <ChevronDown 
          className={`text-slate-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-red-400' : ''}`} 
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pl-12">
              <p className="text-slate-400 leading-relaxed text-sm md:text-base border-l-2 border-red-500/30 pl-4">
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => (
  <section id="faq" className="py-20 bg-slate-950 relative">
    <div className="max-w-3xl mx-auto px-4 relative z-10">
      <div className="text-center mb-12">
        <HelpCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Informasi Penting</h2>
        <p className="text-slate-400">Harap dibaca sebelum melakukan transaksi</p>
      </div>
      
      <div className="space-y-4">
        {FAQS.map((faq, idx) => (
          <FAQItem key={idx} faq={faq} />
        ))}
      </div>
    </div>
  </section>
);

const CartModal = ({ isOpen, onClose, cart, updateQuantity, removeItem, setCartQuantity }) => {
  const [formData, setFormData] = useState({ name: '', email: '', payment: '' });

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.payment) {
      alert("Mohon lengkapi semua data!");
      return;
    }

    const itemsList = cart.map((item, idx) => 
      `${idx + 1}. ${item.title} ${item.isNSFW ? '[18+]' : '[Safe]'} (x${item.quantity})`
    ).join('\n');
    
    const formattedTotal = `Rp${total.toLocaleString('id-ID')}`;
    
    // Perubahan: Hapus 'dst', Bold Total & Payment, format lebih rapi
    const message = `Hai Mimin NEETCHANIME!
Saya ${formData.name} dengan email ${formData.email}.
Saya telah membeli produk berupa:
${itemsList}

Senilai *${formattedTotal}*
Saya memilih metode pembayaran *${formData.payment}*.
Terima Kasih, ditunggu min.`;

    const whatsappUrl = `https://wa.me/6285169992275?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20, transition: { duration: 0.2 } }}
        className="bg-slate-900 w-full max-w-2xl max-h-[90vh] rounded-2xl border border-slate-700 shadow-2xl overflow-hidden relative flex flex-col md:flex-row z-10"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white z-10"
        >
          <X size={24} />
        </button>

        <div className="flex-1 p-6 overflow-y-auto bg-slate-900 md:border-r border-slate-800">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <ShoppingCart className="text-red-500" />
            Keranjang
          </h2>

          {cart.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <p>Keranjang kosong...</p>
              <button onClick={onClose} className="mt-4 text-red-400 hover:underline text-sm">Lihat Koleksi</button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col gap-3 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                       <img src={item.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
                       {item.isNSFW && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-slate-900"></span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-medium truncate">{item.title}</h4>
                      <p className="text-red-400 font-bold text-sm">Rp{item.price.toLocaleString('id-ID')}</p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors touch-manipulation"
                      title="Hapus Produk"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-slate-700/50 pt-2">
                    <span className="text-xs text-slate-400">Jumlah:</span>
                    <div className="flex items-center gap-2 bg-slate-900 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors touch-manipulation"
                      >
                        <Minus size={14} />
                      </button>
                      
                      <input 
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => setCartQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-12 bg-transparent text-center text-sm font-bold text-white focus:outline-none appearance-none"
                      />

                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors touch-manipulation"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Total</span>
                <span className="text-2xl font-bold text-white">Rp{total.toLocaleString('id-ID')}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 p-6 bg-slate-950 overflow-y-auto">
          <h2 className="text-xl font-bold text-white mb-6">Konfirmasi Pembeli</h2>
          
          <form onSubmit={handleCheckout} className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex gap-3 mb-4">
              <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
              <p className="text-[10px] text-red-200/80 leading-relaxed">
                Dengan melanjutkan, Anda menyatakan bahwa Anda berusia 18 tahun ke atas dan setuju dengan kebijakan privasi kami.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Nama Lengkap</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 transition-colors"
                placeholder="Nama samaran diperbolehkan"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Email</label>
              <input 
                type="email" 
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 transition-colors"
                placeholder="Untuk pengiriman file"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Metode Pembayaran</label>
              <div className="grid grid-cols-3 gap-2">
                {PAYMENT_METHODS.map(method => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setFormData({...formData, payment: method})}
                    className={`px-2 py-2 text-xs font-bold rounded-lg border transition-all touch-manipulation ${
                      formData.payment === method 
                        ? 'bg-red-600 border-red-600 text-white' 
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                disabled={cart.length === 0}
                className="w-full py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-green-900/20 hover:shadow-green-500/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 touch-manipulation"
              >
                <span>Proses di WhatsApp</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Footer = () => (
  <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Side: Brand & Copyright */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="text-3xl md:text-4xl font-extrabold tracking-tighter text-white">
              NEETCHANIME
            </span>
            <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>
          </div>
          <p className="text-slate-500 text-sm font-medium">
            Copyright &copy; 2025 All Rights Reserved.
          </p>
        </div>

        {/* Right Side: Social Media Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {/* YouTube */}
          <a 
            href="https://youtube.com/@neetchanime" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c4302b]/20 hover:bg-[#c4302b] text-white transition-all duration-300 hover:scale-105 group border border-[#c4302b]/30 touch-manipulation"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:animate-pulse">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.498-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="font-bold text-sm">YouTube</span>
          </a>

          {/* Instagram */}
          <a 
            href="https://instagram.com/neetchanime" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#d6249f]/20 hover:bg-gradient-to-tr hover:from-[#fd5949] hover:to-[#d6249f] text-white transition-all duration-300 hover:scale-105 group border border-[#d6249f]/30 touch-manipulation"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span className="font-bold text-sm">Instagram</span>
          </a>

          {/* Twitter / X */}
          <a 
            href="https://x.com/neetchanime" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-black text-white transition-all duration-300 hover:scale-105 group border border-slate-700 touch-manipulation"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="font-bold text-sm">Twitter</span>
          </a>

          {/* Discord */}
          <a 
            href="https://discord.com/channels/@me" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5865F2]/20 hover:bg-[#5865F2] text-white transition-all duration-300 hover:scale-105 group border border-[#5865F2]/30 touch-manipulation"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z"/>
            </svg>
            <span className="font-bold text-sm">Discord</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  
  // Ref untuk menyimpan ID timeout agar bisa di-reset
  const notificationTimeoutRef = useRef(null);

  const addToCart = (product) => {
    // Check if item already exists
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      
      let newCount = 1;
      let newCart;

      if (existingItemIndex > -1) {
        // Item exists, increment quantity
        newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        newCount = newCart[existingItemIndex].quantity;
      } else {
        // New item, add with quantity 1
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }

      // Handle notification
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }

      setNotification({
        id: Date.now(),
        title: product.title,
        count: newCount,
        image: product.image
      });

      // Set timeout baru selama 4 detik
      notificationTimeoutRef.current = setTimeout(() => {
        setNotification(null);
      }, 4000);

      return newCart;
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean); 
    });
  };

  // NEW: Directly set quantity (for input field)
  const setCartQuantity = (id, quantity) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          return quantity > 0 ? { ...item, quantity: quantity } : item;
        }
        return item;
      });
    });
  };

  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-red-500/30">
      {/* Modern Scrollbar Styles */}
      <style>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0f172a; 
        }
        ::-webkit-scrollbar-thumb {
          background: #334155; 
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #475569; 
        }
        /* Hide arrows in input number */
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
      `}</style>

      <Header cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} openCart={() => setIsCartOpen(true)} />
      
      <main>
        <Hero />
        <ShopSection addToCart={addToCart} />
        <FAQSection />
      </main>
      <Footer />
      
      {/* Golden Gradient Notification - Swipeable */}
      <div className="fixed bottom-6 left-0 right-0 z-[70] flex flex-col items-center justify-end pointer-events-none space-y-2">
        <AnimatePresence mode="popLayout">
          {notification && (
            <motion.div
              key={notification.id}
              // Remove layout prop to prevent horizontal shift
              initial={{ y: 150, opacity: 0, scale: 0.9 }} 
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 150, opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              
              drag="y"
              dragConstraints={{ top: 0, bottom: 100 }}
              dragElastic={0.7}
              onDragEnd={(e, { offset }) => {
                if (offset.y > 50) {
                  setNotification(null);
                }
              }}
              
              className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-900 px-5 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-4 w-[90%] max-w-sm pointer-events-auto cursor-grab active:cursor-grabbing touch-none"
            >
              <div className="flex-shrink-0 bg-white/30 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center border border-white/40 shadow-inner">
                 <span className="font-extrabold text-lg text-amber-900 drop-shadow-sm">{notification.count}x</span>
              </div>
              
              <div className="flex-1 min-w-0">
                 <p className="text-[10px] font-bold text-amber-900/70 uppercase tracking-widest mb-0.5">Berhasil Ditambahkan</p>
                 <p className="font-bold text-slate-900 truncate leading-tight">{notification.title}</p>
              </div>

              <div className="flex-shrink-0 bg-white/20 p-1 rounded-full">
                <Check size={18} className="text-amber-900" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isCartOpen && (
          <CartModal 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            cart={cart}
            updateQuantity={updateQuantity}
            setCartQuantity={setCartQuantity}
            removeItem={removeItem}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
