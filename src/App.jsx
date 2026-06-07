import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Wrench, Sparkles, Youtube, Instagram, Twitter, MessageSquare } from 'lucide-react';

// --- STYLES INJECTION ---
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #020617; /* slate-950 */
    color: #e2e8f0; /* slate-200 */
    margin: 0;
    overflow-x: hidden;
  }

  .bg-grid-pattern {
    background-size: 40px 40px;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
    -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  }

  /* Custom Scrollbar for a polished look */
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #020617; }
  ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #64748b; }
`;

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
};

const glowVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 1.5, ease: "easeOut" }
  },
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.7, 0.5],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  }
};

// --- COMPONENTS ---

const Background = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Base dark bg */}
    <div className="absolute inset-0 bg-slate-950" />
    
    {/* Grid Pattern */}
    <div className="absolute inset-0 bg-grid-pattern opacity-60" />

    {/* Glowing Orbs */}
    <motion.div 
      variants={glowVariants}
      initial="hidden"
      animate={["visible", "animate"]}
      className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-600/20 blur-[120px]"
    />
    <motion.div 
      variants={glowVariants}
      initial="hidden"
      animate={["visible", "animate"]}
      transition={{ delay: 0.5 }}
      className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-red-600/15 blur-[150px]"
    />
  </div>
);

const Navbar = () => (
  <motion.nav 
    variants={itemVariants}
    className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-center md:justify-start"
  >
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-red-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.4)] ring-1 ring-white/10">
        <span className="text-white font-extrabold text-2xl">N</span>
      </div>
      <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-rose-400 to-red-500 tracking-tighter">
        NEETCHANIME
      </span>
    </div>
  </motion.nav>
);

const SocialLinks = () => {
  const socials = [
    { name: "YouTube", icon: <Youtube size={20} />, href: "https://youtube.com/@neetchanime", color: "hover:bg-red-600", border: "hover:border-red-500" },
    { name: "Instagram", icon: <Instagram size={20} />, href: "https://instagram.com/neetchanime", color: "hover:bg-pink-600", border: "hover:border-pink-500" },
    { name: "Twitter / X", icon: <Twitter size={20} />, href: "https://x.com/neetchanime", color: "hover:bg-blue-500", border: "hover:border-blue-400" },
    { name: "Discord", icon: <MessageSquare size={20} />, href: "https://discord.com/channels/@me", color: "hover:bg-indigo-600", border: "hover:border-indigo-500" },
  ];

  return (
    <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mt-12">
      {socials.map((social, idx) => (
        <a
          key={idx}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/50 backdrop-blur-md border border-slate-800 text-slate-300 transition-all duration-300 ${social.color} ${social.border} hover:text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] group`}
        >
          <span className="transition-transform group-hover:scale-110 group-hover:rotate-6">
            {social.icon}
          </span>
          <span className="font-semibold text-sm tracking-wide">{social.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

// --- MAIN APP COMPONENT ---

const App = () => {
  return (
    <>
      <style>{globalStyles}</style>
      
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden selection:bg-purple-500/30 selection:text-purple-200">
        <Background />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto text-center"
        >
          <Navbar />

          {/* Main Content Area */}
          <div className="mt-20 md:mt-0 flex flex-col items-center">
            
            {/* Animated Icon Group */}
            <motion.div variants={itemVariants} className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-red-600 blur-2xl opacity-40 rounded-full animate-pulse" />
              <div className="relative w-32 h-32 bg-slate-900/80 backdrop-blur-xl rounded-full border border-slate-700/50 flex items-center justify-center shadow-2xl">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute"
                >
                  <Settings size={64} className="text-slate-700" />
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute"
                >
                  <Settings size={40} className="text-purple-500/50 mt-12 ml-12" />
                </motion.div>
                <Wrench size={48} className="text-red-500 z-10 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
              </div>
            </motion.div>

            {/* Badges */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
              <span className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold tracking-widest uppercase backdrop-blur-md flex items-center gap-2 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                <Sparkles size={14} className="text-purple-400" />
                Sistem Sedang Ditingkatkan
              </span>
            </motion.div>

            {/* Typography */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight text-white">
                WEBSITE SEDANG <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-purple-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                  MAINTENANCE
                </span>
              </h1>
              
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium mt-6">
                Mimin sedang melakukan sihir di balik layar untuk memberikan pengalaman yang lebih ngebut, koleksi yang lebih lengkap, dan fitur-fitur baru yang keren.
              </p>
            </motion.div>

            {/* Status Box */}
            <motion.div variants={itemVariants} className="mt-10 bg-slate-900/60 backdrop-blur-lg border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Status Pembaruan</span>
                <span className="text-sm font-bold text-red-400 animate-pulse">Berjalan...</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 mb-2 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-purple-500 to-red-500 h-2.5 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-slate-500 text-left mt-2 italic">Estimasi selesai: Segera kembali!</p>
            </motion.div>

            <SocialLinks />

          </div>
        </motion.div>
      </div>
    </>
  );
};

export default App;
