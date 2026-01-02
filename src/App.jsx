import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ShoppingCart, X, Star, Video, Image as ImageIcon, ChevronRight, ChevronLeft, ChevronDown, HelpCircle, AlertCircle, Trash2, ShieldCheck, ShieldAlert, Check, Plus, Minus, Filter, Flame, TrendingUp, BookOpen, Rocket, Puzzle, Monitor } from 'lucide-react';
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

// --- TOAST NOTIFICATION COMPONENT ---
const ToastNotification = ({ data, onClose }) => {
  // State untuk arah animasi keluar (default: ke atas/fade out)
  const [exitVariant, setExitVariant] = useState({ y: -100, opacity: 0, scale: 0.9 });

  useEffect(() => {
    const timer = setTimeout(() => {
      // Default exit animation (jika timeout)
      setExitVariant({ y: -100, opacity: 0, scale: 0.9 }); 
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleDragEnd = (event, info) => {
    const { offset } = info;
    const threshold = 50; // Jarak swipe minimal untuk dismiss

    if (Math.abs(offset.x) > threshold || Math.abs(offset.y) > threshold) {
      let newExit = { opacity: 0, scale: 0.9, transition: { duration: 0.3 } };

      // Tentukan arah swipe dominan
      if (Math.abs(offset.x) > Math.abs(offset.y)) {
        // Horizontal (Kanan/Kiri)
        newExit.x = offset.x > 0 ? 300 : -300;
        newExit.y = 0; // Reset Y agar lurus
      } else {
        // Vertikal (Bawah/Atas)
        newExit.y = offset.y > 0 ? 300 : -300;
        newExit.x = 0; // Reset X agar lurus
      }

      setExitVariant(newExit);
      onClose();
    }
  };

  return (
    <motion.div
      layout
      initial={{ y: 100, opacity: 0, scale: 0.8 }} // Masuk dari bawah
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={exitVariant} // Keluar sesuai arah swipe atau default (ke atas)
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      drag // Enable drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Snap back jika tidak dilempar
      dragElastic={0.7} // Rasa karet saat ditarik
      onDragEnd={handleDragEnd}
      // Fixed: Box shape logic and centering
      className="fixed bottom-8 left-0 right-0 mx-auto w-fit z-[100] cursor-grab active:cursor-grabbing touch-none flex justify-center pointer-events-auto px-4"
    >
      {/* UPDATED: 
          - Removed min-w/max-w fixed values to allow auto-fitting
          - Increased padding (p-5) for larger feel
          - Increased font sizes
          - w-auto inline-flex ensures it wraps content tightly 
      */}
      <div className="inline-flex bg-gradient-to-r from-yellow-800 via-amber-700 to-yellow-900 border border-yellow-500/40 text-white rounded-xl shadow-[0_10px_40px_-10px_rgba(180,83,9,0.5)] w-auto max-w-[95vw] backdrop-blur-xl relative overflow-hidden">
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
        
        <div className="p-5 flex flex-row items-center gap-5 relative z-10">
          
          {/* Left Column: Kotak Putih Transparan + Jumlah Produk (Larger) */}
          <div className="flex items-center justify-center bg-white/20 border border-white/30 rounded-lg px-4 py-2 min-w-[50px] backdrop-blur-sm shadow-sm flex-shrink-0 self-center">
            <span className="text-lg font-bold text-white tabular-nums">
              {data.quantity}x
            </span>
          </div>

          {/* Right Column: Nama Produk & Keterangan Sukses */}
          <div className="flex flex-col gap-2 min-w-0">
             {/* Nama Produk (Larger Text) */}
             <span className="text-base font-bold text-white leading-snug line-clamp-2 max-w-[60vw] md:max-w-[400px]">
                {data.productName}
             </span>

             {/* Separator Line: 55% Transparency */}
             <div className="h-[1px] w-full bg-white/55" />

             {/* Keterangan Sukses (Readable) */}
             <div className="flex items-center gap-2">
                <div className="bg-green-500 rounded-full p-0.5 shadow-lg shadow-green-500/30">
                   <Check size={14} className="text-white stroke-[4]" />
                </div>
                <span className="font-medium text-sm tracking-wide text-yellow-50/90 whitespace-nowrap">
                  Sukses Masuk di Keranjang!
                </span>
             </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

const Header = ({ cartCount, openCart }) => (
  <nav className="fixed top-0 left-0 right-0 z-[60] bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-2xl transform-gpu transition-colors duration-300 w-full">
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
    <section className="relative pt-32 pb-12 overflow-hidden w-full">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      <div className="absolute top-20 right-0 w-72 h-72 bg-red-600/20 rounded-full blur-3xl -z-10 transform-gpu pointer-events-none"></div>
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl -z-10 transform-gpu pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-4 text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-1.5 rounded-full border border-red-500/30 text-red-400 text-xs font-semibold tracking-wider uppercase bg-red-500/10 mb-3 inline-block backdrop-blur-sm">
            Strictly for Adults (18+)
          </span>
          <h1 className="font-extrabold mb-4 tracking-tighter leading-tight md:leading-none">
            <span className="block text-5xl sm:text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.25)] pb-0 break-words tracking-tighter">
              NEETCHANIME
            </span>
            <span className="block text-2xl sm:text-4xl md:text-5xl mt-0 md:mt-1 font-extrabold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-900 mr-2">Platform</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mr-2">R34</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Terbaik</span>
            </span>
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-6 font-medium">
            Beli konten premium kreator/artis kesukaanmu dengan biaya lebih terjangkau! Buruan order yawh~! ❤️
          </p>
          
          <div className="flex justify-center gap-4 mb-16">
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

          {/* --- NEW SECTION: KEUNGGULAN (FEATURE BOXES) --- */}
          <div className="max-w-5xl mx-auto mt-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
              className="flex items-center justify-center gap-4 mb-10"
            >
              <div className="h-[2px] bg-gradient-to-r from-transparent to-slate-700 flex-1 max-w-[100px]"></div>
              <h2 className="text-2xl md:text-4xl font-bold text-white text-center tracking-wide">
                Mengapa Harus NEETCHANIME?
              </h2>
              <div className="h-[2px] bg-gradient-to-l from-transparent to-slate-700 flex-1 max-w-[100px]"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-4 w-full">
              {/* Box 1: Booster */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-slate-900/40 border border-pink-500 p-6 rounded-2xl shadow-[0_0_25px_rgba(236,72,153,0.3)] hover:shadow-[0_0_50px_rgba(236,72,153,0.6)] hover:scale-105 transition-all duration-300 group relative overflow-visible backdrop-blur-sm"
              >
                  <div className="flex flex-row items-center text-left gap-4 h-full">
                    <div className="bg-pink-500/10 w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 border border-pink-500/30 shadow-[inset_0_0_10px_rgba(236,72,153,0.2)] group-hover:bg-pink-500/20 transition-colors">
                        <Rocket className="text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]" size={32} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg leading-tight">Tanpa Limit Kecepatan Internet</h3>
                    </div>
                  </div>
              </motion.div>

              {/* Box 2: Puzzle */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-slate-900/40 border border-violet-500 p-6 rounded-2xl shadow-[0_0_25px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.6)] hover:scale-105 transition-all duration-300 group relative overflow-visible backdrop-blur-sm"
              >
                  <div className="flex flex-row items-center text-left gap-4 h-full">
                    <div className="bg-violet-500/10 w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 border border-violet-500/30 shadow-[inset_0_0_10px_rgba(139,92,246,0.2)] group-hover:bg-violet-500/20 transition-colors">
                        <Puzzle className="text-violet-500 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" size={32} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg leading-tight">Kompatible di Berbagai Perangkat</h3>
                    </div>
                  </div>
              </motion.div>

              {/* Box 3: Monitor/4K */}
              <motion.div 
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, amount: 0.3 }}
                 transition={{ delay: 0.3, duration: 0.5 }}
                 className="bg-slate-900/40 border border-cyan-500 p-6 rounded-2xl shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] hover:scale-105 transition-all duration-300 group relative overflow-visible backdrop-blur-sm"
              >
                  <div className="flex flex-row items-center text-left gap-4 h-full">
                    <div className="bg-cyan-500/10 w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 border border-cyan-500/30 shadow-[inset_0_0_10px_rgba(6,182,212,0.2)] group-hover:bg-cyan-500/20 transition-colors">
                        <Monitor className="text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" size={32} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg leading-tight">Kualitas Lebih Jernih (2K hingga 4K)</h3>
                    </div>
                  </div>
              </motion.div>
            </div>
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
    {/* Image Container */}
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
    let result = [...PRODUCTS];

    if (activeFilters.length > 0) {
      result.sort((a, b) => {
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
       result.sort((a, b) => a.id - b.id); 
    }

    return result;
  }, [activeFilters]);
  
  const totalPages = Math.ceil(processedProducts.length / itemsPerPage); 
  
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
        staggerChildren: 0.08, 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
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
    // UPDATED: Reduced padding-bottom (pb-8) to decrease space to FAQ
    <section id="shop" className="pt-12 pb-8 bg-slate-950 relative w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          {/* UPDATED: Improved entry animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
              Koleksi Konten <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-900 text-xs font-extrabold px-2.5 py-1 rounded-lg shadow-lg shadow-amber-500/20 tracking-wider">PREMIUM</span>
            </h2>
            <p className="text-slate-400">Terlaris bulan ini</p>
          </motion.div>
          
          {/* UPDATED: Separate animations for controls */}
          <div className="flex items-center justify-between w-full md:w-auto gap-2">
            {/* Pagination */}
            <motion.div 
              // UPDATED: Desktop: From Right (50), Mobile: From Left (-50)
              initial={{ opacity: 0, x: isMobile ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              // UPDATED: Desktop: Delay 0.4 (after filter), Mobile: Delay 0.2 (before/same filter)
              transition={{ duration: 0.7, ease: "easeOut", delay: isMobile ? 0.2 : 0.4 }}
              className="flex flex-wrap items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl overflow-hidden"
            >
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
                <AnimatePresence mode='wait' custom={direction} initial={false}>
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
            </motion.div>

            {/* Filter */}
            <motion.div 
              // UPDATED: Always from Right (50)
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              // UPDATED: Desktop & Mobile: Delay 0.2 (starts first on Desktop before pagination)
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
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
            </motion.div>
          </div>
        </div>

        <AnimatePresence mode='wait'>
          {/* UPDATED: Changed animate to whileInView to trigger on scroll */}
          <motion.div 
            key={page} 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
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

// --- MAIN APP ---
const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState(null); // State notifikasi

  const addToCart = (product) => {
    // UPDATED: Calculate quantity immediately for notification
    let newQty = 1;
    const existingItem = cart.find(p => p.id === product.id);
    if (existingItem) {
        newQty = existingItem.quantity + 1;
    }

    // Tampilkan notifikasi
    // Reset dulu agar animasi ter-trigger ulang jika user menekan tombol dengan cepat
    setNotification(null);
    setTimeout(() => {
        setNotification({
            id: Date.now(),
            productName: product.title,
            quantity: newQty // Pass the quantity
        });
    }, 10);

    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? {...p, quantity: p.quantity + 1} : p);
      }
      return [...prev, {...product, quantity: 1}];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? {...item, quantity: newQuantity} : item;
      }
      return item;
    }));
  };

  const setCartQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => item.id === id ? {...item, quantity} : item));
  }

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    // FIXED: Added overflow-x-hidden and w-full to prevent horizontal scrolling whitespace
    <div className="bg-slate-950 min-h-screen font-sans selection:bg-red-500/30 text-slate-200 overflow-x-hidden w-full">
      {/* GLOBAL SCROLLBAR STYLE - Modern Minimalist Line */}
      <style>{`
        /* Webkit browsers (Chrome, Safari, Edge) */
        ::-webkit-scrollbar {
          width: 8px; /* Sedikit lebih tebal dari sebelumnya (4px -> 8px) */
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent; 
        }
        
        ::-webkit-scrollbar-thumb {
          background-color: #475569; /* Slate-600 for better visibility */
          border-radius: 4px; /* Rounded corners */
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background-color: #64748b; /* Slate-500 hover */
        }

        /* Hapus tombol panah/segitiga */
        ::-webkit-scrollbar-button {
          display: none;
        }
        
        /* Firefox support */
        * {
          scrollbar-width: thin;
          scrollbar-color: #475569 transparent;
        }
      `}</style>
      
      <Header cartCount={cartCount} openCart={() => setIsCartOpen(true)} />
      <Hero />
      <ShopSection addToCart={addToCart} />
      <FAQSection />
      
      {/* Toast Notification Container */}
      <AnimatePresence>
        {notification && (
          <ToastNotification 
            key={notification.id}
            data={notification} // Pass object data
            onClose={() => setNotification(null)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <CartModal 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            cart={cart}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            setCartQuantity={setCartQuantity}
          />
        )}
      </AnimatePresence>
      
      <footer className="bg-slate-950 py-8 border-t border-slate-900 text-center text-slate-500 text-sm">
        <p>&copy; 2024 NEETCHANIME. All rights reserved.</p>
        <p className="mt-2 text-xs">Platform konten digital dewasa terpercaya.</p>
      </footer>
    </div>
  );
};

export default App;
