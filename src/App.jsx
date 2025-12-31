import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingCart, X, Star, Video, Image as ImageIcon, ChevronRight, ChevronDown, HelpCircle, AlertCircle, Trash2, ShieldCheck, ShieldAlert, Check } from 'lucide-react';
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
      isNSFW: isNSFW
    };
  });
};

const PRODUCTS = generateProducts();

const PAYMENT_METHODS = [
  "QRIS", "DANA", "OVO", "BNI", "MANDIRI", "SEABANK", "BSI", "VISA", "PAYPAL"
];

const FAQS = [
  {
    q: "Apakah konten di NEETCHANIME aman & legal?",
    a: "Kami menjamin keamanan privasi setiap pembeli. Semua konten yang tersedia merupakan karya seni orisinal dan berlisensi yang dikurasi dengan ketat."
  },
  {
    q: "Apa itu NEETCHANIME?",
    a: "NEETCHANIME adalah galeri digital premium yang menyediakan aset visual dan animasi tanpa batas, fokus pada estetika visual dewasa (18+) dan artistik."
  },
  {
    q: "Bagaimana sistem pengiriman file?",
    a: "Akses ke Private Vault (GDrive/Mega) dikirimkan personal ke WhatsApp/Email Anda setelah verifikasi pembayaran."
  },
  {
    q: "Apakah identitas pembeli dirahasiakan?",
    a: "100% Rahasia. Kami tidak membagikan data pelanggan ke pihak ketiga. Anda bahkan bisa menggunakan nama samaran saat checkout."
  },
  {
    q: "Berapa lama link download aktif?",
    a: "Link download yang kami berikan berlaku selamanya (Lifetime Access). Jika link mati, Anda bisa request ulang ke admin."
  },
  {
    q: "Apakah ada garansi jika file rusak?",
    a: "Ya, kami bergaransi penuh. Jika file korup atau tidak bisa dibuka, kami akan mengirimkan link pengganti atau refund dana Anda."
  },
  {
    q: "Apakah menerima pembayaran pulsa?",
    a: "Saat ini kami hanya menerima pembayaran via E-Wallet (DANA, OVO, QRIS) dan Transfer Bank untuk memudahkan verifikasi otomatis."
  },
  {
    q: "Apakah konten bisa digunakan untuk komersial?",
    a: "Tergantung lisensi per produk. Sebagian besar adalah Personal Use Only. Untuk lisensi komersial (Vtuber/Game Dev), silakan hubungi admin untuk harga khusus."
  },
  {
    q: "Bagaimana jika saya di bawah 18 tahun?",
    a: "Kami sangat ketat. Jika Anda di bawah 18 tahun, Anda hanya diperbolehkan membeli konten berlabel 'Safe'. Verifikasi umur mungkin dilakukan random."
  },
  {
    q: "Apakah bisa request konten/commission?",
    a: "Bisa! Kami bekerja sama dengan banyak artist. Silakan chat admin via WhatsApp untuk mendiskusikan detail commission custom Anda."
  },
  {
    q: "Format file apa yang akan saya terima?",
    a: "Umumnya .ZIP atau .RAR yang berisi PNG/JPG (High Res) untuk Foto, dan MP4/MOV (1080p/4K) untuk Video."
  }
];

// --- COMPONENTS ---

const Header = ({ cartCount, openCart }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-2xl">
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
          className="relative p-2 text-slate-300 hover:text-white transition-colors group"
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

const Hero = () => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
    <div className="absolute top-20 right-0 w-72 h-72 bg-red-600/20 rounded-full blur-3xl -z-10"></div>
    <div className="absolute bottom-10 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl -z-10"></div>
    
    <div className="max-w-4xl mx-auto px-4 text-center z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="px-4 py-1.5 rounded-full border border-red-500/30 text-red-400 text-xs font-semibold tracking-wider uppercase bg-red-500/10 mb-6 inline-block backdrop-blur-sm">
          Strictly for Adults (18+)
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
          Seni Visual <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-orange-500">
            Tanpa Batas
          </span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
          Platform eksklusif penyedia aset digital dan animasi premium. 
          Jelajahi koleksi terkurasi untuk kolektor yang menghargai keindahan estetika sepenuhnya.
        </p>
        
        <div className="flex justify-center gap-4">
          <a href="#shop" className="px-8 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full font-bold hover:shadow-lg hover:shadow-red-500/25 transition-all transform hover:-translate-y-1">
            Lihat Koleksi
          </a>
          <a href="#faq" className="px-8 py-3 border border-slate-700 text-white rounded-full font-bold hover:border-red-500 hover:text-red-400 transition-all">
            Info Legal
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const ProductCard = ({ product, onAdd, variants }) => (
  <motion.div 
    variants={variants}
    whileHover={{ y: -8 }}
    className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden group shadow-xl hover:shadow-red-900/20 transition-all duration-300 flex flex-col h-full relative"
  >
    {/* Image Container */}
    <div className="relative h-48 overflow-hidden">
      <img 
        src={product.image} 
        alt={product.title} 
        className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ${product.isNSFW ? 'brightness-90 group-hover:brightness-100' : ''}`}
      />
      
      {/* LEFT TOP: Type Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg backdrop-blur-md border border-white/10 ${
          product.type === 'Foto' 
            ? 'bg-gradient-to-br from-green-800 to-emerald-900 text-white' // Foto: Dark Green Gradient, Text White
            : 'bg-gradient-to-br from-slate-900 to-purple-900 text-white' // Video: Dark Purple Gradient
        }`}>
          {product.type === 'Video' ? <Video size={14} /> : <ImageIcon size={14} />}
          {product.type}
        </span>
      </div>

      {/* RIGHT TOP: Category Badge (Safe / 18+) */}
      <div className="absolute top-3 right-3 z-10">
        {product.isNSFW ? (
          <span className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-extrabold text-white shadow-lg backdrop-blur-md bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500 border border-yellow-500/30 animate-pulse-slow">
            <ShieldAlert size={14} />
            18+
          </span>
        ) : (
          <span className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-lg backdrop-blur-md bg-gradient-to-r from-blue-400 to-cyan-400 border border-blue-400/30">
            <ShieldCheck size={14} />
            Safe
          </span>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
    </div>

    {/* Content */}
    <div className="p-5 flex-1 flex flex-col">
      <div className="flex items-center gap-2 mb-2 text-slate-500 text-xs font-medium">
        <div className="flex items-center text-amber-400">
          <Star size={12} fill="currentColor" />
          <span className="ml-1 text-slate-300">{product.rating}</span>
        </div>
        <span>•</span>
        <span>{product.buyers} buyers</span>
      </div>

      <h3 className="text-slate-100 font-bold text-lg leading-snug mb-3 line-clamp-2 group-hover:text-red-400 transition-colors">
        {product.title}
      </h3>

      <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-slate-500 text-[10px] uppercase tracking-wider">Harga</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400 font-bold text-lg">
            Rp{product.price.toLocaleString('id-ID')}
          </span>
        </div>
        
        <button 
          onClick={() => onAdd(product)}
          className="bg-gradient-to-br from-pink-600 to-violet-700 text-white p-3 rounded-xl transition-all shadow-lg shadow-pink-900/20 hover:shadow-pink-600/40 hover:scale-105 active:scale-95 flex items-center justify-center border border-white/5"
          title="Tambahkan ke Keranjang"
        >
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  </motion.div>
);

const ShopSection = ({ addToCart }) => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default desktop

  // Responsive items per page logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(2); // Mobile: 2 items (2 cols x 1 row)
      } else {
        setItemsPerPage(10); // Desktop: 10 items (5 cols x 2 rows)
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const totalPages = Math.ceil(PRODUCTS.length / itemsPerPage); 
  
  const currentProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return PRODUCTS.slice(start, start + itemsPerPage);
  }, [page, itemsPerPage]);

  // ANIMATION VARIANTS
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
          
          {/* Pagination Controls */}
          <div className="flex flex-wrap gap-2 bg-slate-900 border border-slate-800 p-1 rounded-xl">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                  page === num 
                  ? 'bg-gradient-to-br from-red-600 to-pink-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid with Staggered Animation */}
        <AnimatePresence mode='wait'>
          <motion.div 
            key={page} // Forces re-animation on page change
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {currentProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={addToCart} 
                variants={itemVariants}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-colors duration-300 hover:border-slate-700">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-slate-800/40 transition-colors focus:outline-none"
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

const CartModal = ({ isOpen, onClose, cart, removeFromCart, clearCart }) => {
  const [formData, setFormData] = useState({ name: '', email: '', payment: '' });

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.payment) {
      alert("Mohon lengkapi semua data!");
      return;
    }

    const itemsList = cart.map((item, idx) => `${idx + 1}. ${item.title} ${item.isNSFW ? '[18+]' : '[Safe]'}`).join('\n');
    const formattedTotal = `Rp${total.toLocaleString('id-ID')}`;
    
    const message = `Hai Mimin NEETCHANIME!
Saya ${formData.name} dengan email ${formData.email}.
Saya telah membeli produk berupa:
${itemsList}
dst
Senilai ${formattedTotal}
Saya memilih metode pembayaran ${formData.payment}.
Terima Kasih, ditunggu min.`;

    const whatsappUrl = `https://wa.me/6285169992275?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
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
        className="bg-slate-900 w-full max-w-2xl max-h-[90vh] rounded-2xl border border-slate-700 shadow-2xl overflow-hidden relative flex flex-col md:flex-row"
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
              {cart.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                  <div className="relative">
                     <img src={item.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
                     {item.isNSFW && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-slate-900"></span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-medium truncate">{item.title}</h4>
                    <p className="text-red-400 font-bold text-sm">Rp{item.price.toLocaleString('id-ID')}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(idx)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
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
                    className={`px-2 py-2 text-xs font-bold rounded-lg border transition-all ${
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
                className="w-full py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-green-900/20 hover:shadow-green-500/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>Proses di WhatsApp</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
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
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c4302b]/20 hover:bg-[#c4302b] text-white transition-all duration-300 hover:scale-105 group border border-[#c4302b]/30"
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
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#d6249f]/20 hover:bg-gradient-to-tr hover:from-[#fd5949] hover:to-[#d6249f] text-white transition-all duration-300 hover:scale-105 group border border-[#d6249f]/30"
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
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-black text-white transition-all duration-300 hover:scale-105 group border border-slate-700"
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
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5865F2]/20 hover:bg-[#5865F2] text-white transition-all duration-300 hover:scale-105 group border border-[#5865F2]/30"
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

  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);

    // Hitung berapa kali item ini sudah ada di keranjang BARU (termasuk yang barusan ditambah)
    const count = newCart.filter(item => item.id === product.id).length;

    setNotification({
      id: Date.now(), // Memaksa re-render animasi jika diklik cepat
      title: product.title,
      count: count,
      image: product.image
    });

    // Hilangkan notifikasi setelah 3 detik
    setTimeout(() => setNotification(null), 3000);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-red-500/30">
      <Header cartCount={cart.length} openCart={() => setIsCartOpen(true)} />
      <main>
        <Hero />
        <ShopSection addToCart={addToCart} />
        <FAQSection />
      </main>
      <Footer />
      
      {/* Golden Gradient Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 left-0 right-0 z-[70] flex justify-center pointer-events-none"
          >
            <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-900 px-5 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-4 w-[90%] max-w-sm pointer-events-auto">
              {/* Count Circle */}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <CartModal 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            cart={cart}
            removeFromCart={removeFromCart}
            clearCart={() => setCart([])}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
