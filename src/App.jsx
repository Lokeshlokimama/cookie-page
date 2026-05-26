import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight, X, RotateCcw, Sparkles, Star, Plus, Minus, Check, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger Plugin
gsap.registerPlugin(ScrollTrigger);

// Import local assets
import cookieHero from './assets/cookie_hero.png';
import cookieClassic from './assets/cookie_classic.png';
import cookieDoubleChoc from './assets/cookie_double_choc.png';
import cookieRedVelvet from './assets/cookie_red_velvet.png';
import cookieSaltedCaramel from './assets/cookie_salted_caramel.png';
import cookieMatcha from './assets/cookie_matcha.png';
import cookieBox from './assets/cookie_box.png';

const FLAVORS = [
  { id: 'classic', name: 'Classic Chocolate Chip', price: 4.50, icon: '🍪', image: cookieClassic, desc: 'Crisp browned-butter edges, soft center, flaky Maldon sea salt.', tags: ['Brown Butter', 'Maldon Salt', '72% Dark Choc'] },
  { id: 'lava', name: 'Double Chocolate Lava', price: 5.50, icon: '🌋', image: cookieDoubleChoc, desc: 'Fudge cocoa dough filled with a molten organic dark chocolate core.', tags: ['Dutch Cocoa', 'Molten Core', 'Organic'] },
  { id: 'salted', name: 'Salted Caramel Pecan', price: 5.50, icon: '🍯', image: cookieSaltedCaramel, desc: 'Buttery cookie with toasted pecans and house-made salted caramel pools.', tags: ['Toasted Pecan', 'House Caramel', 'Sea Salt'] },
  { id: 'red', name: 'Red Velvet White Choc', price: 5.00, icon: '❤️', image: cookieRedVelvet, desc: 'Rich cocoa red dough studded with premium Belgian white chocolate chunks.', tags: ['Cocoa', 'Belgian White', 'Rich Cream'] },
  { id: 'matcha', name: 'Matcha White Chocolate', price: 5.50, icon: '🍵', image: cookieMatcha, desc: 'Ceremonial Uji matcha dough balanced with sweet white chocolate pockets.', tags: ['Uji Matcha', 'Sweet Contrast', 'Slow-Baked'] }
];

export default function App() {
  const containerRef = useRef(null);
  const cookieRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [toasts, setToasts] = useState([]);

  // Customizer State
  const [boxSize, setBoxSize] = useState(6);
  const [boxPrice, setBoxPrice] = useState(24.99);
  const [boxFlavors, setBoxFlavors] = useState([]);

  // Check viewport sizing
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP ScrollTrigger Integration
  useEffect(() => {
    const isMob = window.innerWidth < 768;

    // Reset and kill previous triggers on re-render / resize
    ScrollTrigger.getAll().forEach(t => t.kill());

    // Create the master timeline tied to page scroll progress
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2, // inertia physics
      }
    });

    // Define positions (y: viewport offset, x: translation offset, scale, rotation)
    tl.to(cookieRef.current, {
      x: isMob ? '0vw' : '26vw',
      y: isMob ? '11vh' : '26vh',
      scale: isMob ? 0.62 : 1.45,
      rotation: 360,
      ease: 'none',
    })
    .to(cookieRef.current, {
      x: isMob ? '0vw' : '-26vw',
      y: isMob ? '11vh' : '20vh',
      scale: isMob ? 0.55 : 1.25,
      rotation: 720,
      ease: 'none',
    })
    .to(cookieRef.current, {
      x: isMob ? '0vw' : '26vw',
      y: isMob ? '11vh' : '28vh',
      scale: isMob ? 0.62 : 1.35,
      rotation: 1080,
      ease: 'none',
    })
    .to(cookieRef.current, {
      x: '0vw',
      y: isMob ? '6vh' : '16vh',
      scale: isMob ? 0.5 : 0.8,
      rotation: 1440,
      ease: 'none',
    });

    // Bind section ScrollTriggers to set active navigation index
    const sections = ['#hero', '#ingredients', '#flavours', '#story', '#order'];
    sections.forEach((id, idx) => {
      ScrollTrigger.create({
        trigger: id,
        start: 'top 40%',
        end: 'bottom 40%',
        onToggle: self => {
          if (self.isActive) setActiveSection(idx);
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMobile]);

  // Toast Helper
  const triggerToast = (msg) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2800);
  };

  // Cart Helper Functions
  const addToCart = (flavor) => {
    setCart(prev => {
      const exist = prev.find(item => item.id === flavor.id && !item.isCustomBox);
      if (exist) {
        return prev.map(item => item.id === flavor.id && !item.isCustomBox ? { ...item, qty: item.qty + 1 } : item);
      } else {
        return [...prev, { ...flavor, qty: 1, isCustomBox: false }];
      }
    });
    triggerToast(`Added ${flavor.name.split(' ')[0]} to cart`);
  };

  const changeQty = (idx, delta) => {
    setCart(prev => prev.map((item, i) => {
      if (i === idx) {
        const newQty = item.qty + delta;
        return newQty <= 0 ? null : { ...item, qty: newQty };
      }
      return item;
    }).filter(Boolean));
  };

  // Customizer Helpers
  const addFlavorToBox = (flavor) => {
    if (boxFlavors.length >= boxSize) {
      triggerToast('Your selection box is full!');
      return;
    }
    setBoxFlavors(prev => [...prev, flavor]);
    triggerToast(`Added ${flavor.name.split(' ')[0]} to box`);
  };

  const removeFlavorFromBox = (idx) => {
    setBoxFlavors(prev => prev.filter((_, i) => i !== idx));
  };

  const addCustomBoxToCart = () => {
    if (boxFlavors.length !== boxSize) return;
    const name = `Custom ${boxSize}-Pack Box`;
    
    // Group flavors for storage identifier
    const key = boxFlavors.map(f => f.id).sort().join('-');
    const exist = cart.find(item => item.isCustomBox && item.boxSize === boxSize && item.key === key);
    
    if (exist) {
      setCart(prev => prev.map(item => item.isCustomBox && item.boxSize === boxSize && item.key === key ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart(prev => [...prev, {
        id: `custom-${Date.now()}`,
        name,
        price: boxPrice,
        qty: 1,
        isCustomBox: true,
        boxSize,
        flavors: [...boxFlavors],
        key,
        icon: '🎁'
      }]);
    }
    
    setBoxFlavors([]);
    triggerToast('Custom box added to cart!');
    setIsCartOpen(true);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div ref={containerRef} className="relative bg-[#fcf9f2] text-[#3d2314] overflow-x-hidden select-none">
      
      {/* ── STICKY NAVIGATION BAR ── */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#fcf9f2]/80 backdrop-blur-md border-b border-[#3d2314]/5 px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="flex items-center space-x-2 text-[#3d2314]">
          <span className="font-serif font-bold text-2xl tracking-tight">Crumble &amp; Co.</span>
          <span className="bg-[#c87a30] text-[#fcf9f2] text-[10px] font-sans px-1.5 py-0.5 rounded font-semibold tracking-wider uppercase">Artisan</span>
        </a>
        <ul className="hidden md:flex items-center space-x-8 font-sans font-medium text-sm text-[#3d2314]/80">
          <li><a href="#ingredients" className={`hover:text-[#c87a30] transition-colors ${activeSection === 1 ? 'text-[#c87a30]' : ''}`}>Ingredients</a></li>
          <li><a href="#flavours" className={`hover:text-[#c87a30] transition-colors ${activeSection === 2 ? 'text-[#c87a30]' : ''}`}>Flavours</a></li>
          <li><a href="#story" className={`hover:text-[#c87a30] transition-colors ${activeSection === 3 ? 'text-[#c87a30]' : ''}`}>Our Story</a></li>
          <li><a href="#order" className={`hover:text-[#c87a30] transition-colors ${activeSection === 4 ? 'text-[#c87a30]' : ''}`}>Build a Box</a></li>
        </ul>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative bg-[#3d2314] hover:bg-[#c87a30] text-[#fcf9f2] p-2.5 rounded-full transition flex items-center space-x-1 shadow-md shadow-[#3d2314]/10 cursor-pointer"
        >
          <ShoppingBag size={18} />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#c87a30] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#fcf9f2]">
              {cart.reduce((sum, item) => sum + item.qty, 0)}
            </span>
          )}
        </button>
      </nav>

      {/* ── SCROLL-LINKED FLOATING ROLLING COOKIE (GSAP TARGET) ── */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        <div
          ref={cookieRef}
          className="absolute left-[calc(50%-120px)] top-0 w-[240px] h-[240px] flex items-center justify-center translate-y-[-100vh] scale-[2]"
        >
          <img 
            src={cookieHero} 
            alt="Artisan Chocolate Chip Cookie" 
            className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(61,35,20,0.3)] select-none pointer-events-none" 
          />
        </div>
      </div>

      {/* ── SECTION 1: HERO (0% to 20%) ── */}
      <section id="hero" className="relative min-h-screen w-full flex items-center px-6 md:px-20 pt-20 overflow-hidden bg-gradient-to-b from-[#fcf9f2] to-[#f6f0e2]">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="z-20 text-left max-w-xl">
            <div className="inline-flex items-center space-x-2 bg-[#c87a30]/10 border border-[#c87a30]/20 rounded-full px-3 py-1 mb-6">
              <Sparkles size={14} className="text-[#c87a30]" />
              <span className="text-xs font-semibold text-[#c87a30] tracking-wide uppercase font-sans">Slow-Baked Artisan Gold</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight tracking-tight text-[#3d2314] mb-6">
              Bake it slow, <br />
              <span className="text-[#c87a30] italic">enjoy it slower.</span>
            </h1>
            <p className="text-base md:text-lg text-[#3d2314]/80 leading-relaxed font-sans mb-8">
              A sensory masterpiece crafted with caramelized browned butter, premium dark chocolate lava cores, and flakes of hand-harvested sea salt. Created in small batches for the true connoisseur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#order"
                className="bg-[#3d2314] hover:bg-[#c87a30] text-[#fcf9f2] font-semibold px-8 py-3.5 rounded-full transition shadow-lg shadow-[#3d2314]/10 text-center font-sans tracking-wide text-sm flex items-center justify-center space-x-2 animate-pulse"
              >
                <span>Curate Custom Box</span>
                <ChevronRight size={16} />
              </a>
              <a 
                href="#flavours"
                className="border border-[#3d2314]/20 hover:border-[#3d2314] text-[#3d2314] font-semibold px-8 py-3.5 rounded-full transition text-center font-sans tracking-wide text-sm"
              >
                Explore Flavours
              </a>
            </div>
          </div>
          <div className="hidden md:flex justify-end pr-12">
            <div className="w-[300px] h-[300px] border border-[#3d2314]/5 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-4 border border-dashed border-[#c87a30]/10 rounded-full animate-[spin_40s_linear_infinite]" />
              <div className="w-12 h-12 bg-[#c87a30]/5 rounded-full flex items-center justify-center text-[#c87a30]">
                <Star size={20} className="animate-pulse" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-1.5 opacity-60">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#3d2314]">Scroll to Roll</span>
          <div className="w-1.5 h-6 bg-[#3d2314]/20 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[#c87a30] rounded-full animate-[bounce_1.6s_infinite]" />
          </div>
        </div>
      </section>

      {/* ── SECTION 2: INGREDIENTS (20% to 40%) ── */}
      <section id="ingredients" className="relative min-h-screen w-full flex items-center px-6 md:px-20 py-20 bg-[#f6f0e2]">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="hidden md:block">
            <div className="w-[280px] h-[280px] border border-[#3d2314]/5 rounded-full relative mx-auto flex items-center justify-center">
              <div className="absolute inset-0 border border-dashed border-[#3d2314]/10 rounded-full animate-[spin_60s_linear_infinite]" />
              <span className="text-xs uppercase font-bold tracking-widest text-[#3d2314]/30">The Golden Standard</span>
            </div>
          </div>
          
          <div className="z-20 text-left">
            <span className="text-xs font-bold text-[#c87a30] tracking-widest uppercase font-sans block mb-3">Alchemy of Flavours</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#3d2314] mb-8 leading-tight">
              Only premium elements, <br />
              <span className="italic text-[#c87a30]">no compromise.</span>
            </h2>
            
            <div className="space-y-6">
              {[
                { title: 'Slow-Browned Butter', desc: 'Meticulously simmered for over an hour until the milk solids caramelize, giving our dough its deep nutty, butterscotch-like richness.' },
                { title: 'Single-Origin Belgian Chocolate', desc: 'We fold in huge 72% dark chocolate chunks that liquefy into rich lava pockets, balanced with thin shards of sweet white chocolate.' },
                { title: 'Hand-Harvested Fleur de Sel', desc: 'Crisp flakes of sea salt harvested from French salt marshes, delicately sprinkled to brighten cocoa undertones.' }
              ].map((ing, idx) => (
                <div key={idx} className="bg-[#fcf9f2]/70 backdrop-blur-sm border border-[#3d2314]/5 p-5 rounded-2xl transition hover:border-[#c87a30]/30 group">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#c87a30]/10 text-[#c87a30] flex items-center justify-center text-xs font-bold font-sans">0{idx+1}</span>
                    <h3 className="font-serif text-lg font-bold text-[#3d2314] group-hover:text-[#c87a30] transition">{ing.title}</h3>
                  </div>
                  <p className="text-sm text-[#3d2314]/70 leading-relaxed font-sans">{ing.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: FLAVOURS (40% to 60%) ── */}
      <section id="flavours" className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-20 py-20 bg-[#fcf9f2]">
        <div className="w-full max-w-6xl mx-auto text-center mb-16">
          <span className="text-xs font-bold text-[#c87a30] tracking-widest uppercase font-sans block mb-3">Our Core Collection</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#3d2314]">
            Choose your <span className="italic text-[#c87a30]">signature indulgence</span>
          </h2>
        </div>

        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {FLAVORS.slice(0, 3).map((f) => (
            <div key={f.id} className="bg-[#f6f0e2]/50 border border-[#3d2314]/5 hover:border-[#c87a30]/20 rounded-3xl p-6 flex flex-col justify-between transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#3d2314]/5 group">
              <div>
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 flex items-center justify-center bg-[#fcf9f2] p-4 relative border border-[#3d2314]/5">
                  <img src={f.image} alt={f.name} className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition duration-300 select-none pointer-events-none" />
                  <span className="absolute top-3 right-3 text-2xl">{f.icon}</span>
                </div>
                <div className="flex gap-1.5 flex-wrap mb-3">
                  {f.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] bg-[#3d2314]/5 text-[#3d2314]/70 font-sans font-semibold px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#3d2314] mb-2">{f.name}</h3>
                <p className="text-xs text-[#3d2314]/70 leading-relaxed font-sans mb-6">{f.desc}</p>
              </div>
              <div className="flex items-center justify-between border-t border-[#3d2314]/5 pt-4">
                <span className="font-sans font-bold text-lg text-[#c87a30]">${f.price.toFixed(2)}</span>
                <button 
                  onClick={() => addToCart(f)}
                  className="bg-[#3d2314] hover:bg-[#c87a30] text-[#fcf9f2] font-semibold text-xs px-5 py-2.5 rounded-full transition font-sans tracking-wide cursor-pointer flex items-center space-x-1.5"
                >
                  <Plus size={14} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Secondary flavors display */}
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {FLAVORS.slice(3).map((f) => (
            <div key={f.id} className="bg-[#f6f0e2]/50 border border-[#3d2314]/5 hover:border-[#c87a30]/20 rounded-3xl p-6 flex flex-col sm:flex-row gap-6 transition hover:shadow-lg group">
              <div className="w-full sm:w-1/3 aspect-square rounded-2xl overflow-hidden flex items-center justify-center bg-[#fcf9f2] p-4 relative border border-[#3d2314]/5">
                <img src={f.image} alt={f.name} className="w-5/6 h-5/6 object-contain group-hover:scale-105 transition duration-300 select-none pointer-events-none" />
                <span className="absolute top-2 right-2 text-xl">{f.icon}</span>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 flex-wrap mb-2">
                    {f.tags.map((tag, i) => (
                      <span key={i} className="text-[9px] bg-[#3d2314]/5 text-[#3d2314]/70 font-sans font-semibold px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#3d2314] mb-1.5">{f.name}</h3>
                  <p className="text-xs text-[#3d2314]/70 leading-relaxed font-sans mb-4">{f.desc}</p>
                </div>
                <div className="flex items-center justify-between border-t border-[#3d2314]/5 pt-3">
                  <span className="font-sans font-bold text-base text-[#c87a30]">${f.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart(f)}
                    className="bg-[#3d2314] hover:bg-[#c87a30] text-[#fcf9f2] font-semibold text-xs px-4 py-2 rounded-full transition font-sans tracking-wide cursor-pointer flex items-center space-x-1"
                  >
                    <Plus size={12} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: STORY (60% to 80%) ── */}
      <section id="story" className="relative min-h-screen w-full flex items-center px-6 md:px-20 py-20 bg-[#f6f0e2]">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="z-20 text-left order-2 md:order-1">
            <span className="text-xs font-bold text-[#c87a30] tracking-widest uppercase font-sans block mb-3">Our Sacred Oath</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#3d2314] mb-6 leading-tight">
              A 48-hour cure. <br />
              <span className="italic text-[#c87a30]">Worth every second.</span>
            </h2>
            <p className="text-sm md:text-base text-[#3d2314]/80 leading-relaxed font-sans mb-8">
              We do not believe in rush. Our dough is aged in specialized chilling vaults for precisely 48 hours. This cold curing process fully hydrates the flour particles, blending the browned fats and sugars to construct rich, butterscotch-infused dough notes that crisp and caramelize like gold upon baking.
            </p>
            
            {/* Timeline nodes */}
            <div className="relative border-l border-[#3d2314]/15 pl-6 space-y-8">
              <div className="relative">
                <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-[#c87a30] border-4 border-[#f6f0e2]" />
                <h4 className="font-serif text-lg font-bold text-[#3d2314]">The 48-Hour Cold Cure</h4>
                <p className="text-xs text-[#3d2314]/70 mt-1 font-sans">Aged in temperature vaults to lock in butterscotch compounds.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-[#3d2314] border-4 border-[#f6f0e2]" />
                <h4 className="font-serif text-lg font-bold text-[#3d2314]">Precise Velvet Bake</h4>
                <p className="text-xs text-[#3d2314]/70 mt-1 font-sans">Stone-hearth convection at 345°F, preserving the molten cookie center.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-[#3d2314] border-4 border-[#f6f0e2]" />
                <h4 className="font-serif text-lg font-bold text-[#3d2314]">Maldon Dusting</h4>
                <p className="text-xs text-[#3d2314]/70 mt-1 font-sans">Sprinkled with pyramid sea salt crystals immediately out of the oven.</p>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="w-[280px] h-[280px] border border-[#3d2314]/5 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-6 border border-dashed border-[#c87a30]/15 rounded-full animate-[spin_50s_linear_infinite]" />
              <div className="w-14 h-14 bg-[#c87a30]/5 rounded-full flex items-center justify-center text-[#c87a30] relative z-10">
                <Sparkles size={24} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: ORDER CTA (80% to 100%) ── */}
      <section id="order" className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-20 py-24 bg-[#fcf9f2] border-t border-[#3d2314]/5">
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Customizer Box Visual panel */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="w-full max-w-md bg-[#f6f0e2]/40 border border-[#3d2314]/5 rounded-[36px] p-6 relative">
              <span className="absolute top-4 left-6 text-[10px] font-sans font-bold uppercase tracking-widest text-[#3d2314]/40">Bakery Selection Box</span>
              <div className="relative w-full aspect-square flex items-center justify-center my-6">
                <img 
                  src={cookieBox} 
                  alt="Bakery Box" 
                  className="w-full h-full object-contain filter drop-shadow-[0_25px_45px_rgba(61,35,20,0.2)] select-none pointer-events-none z-10" 
                />
                
                {/* Visual Customizer Slots Grid overlay over the box image */}
                <div className="absolute inset-0 z-20 p-[24%] flex items-center justify-center">
                  <div className={`grid gap-2 w-full h-full ${boxSize === 6 ? 'grid-cols-3 grid-rows-2' : 'grid-cols-4 grid-rows-3'}`}>
                    {Array.from({ length: boxSize }).map((_, i) => {
                      const item = boxFlavors[i];
                      return (
                        <div 
                          key={i} 
                          className={`aspect-square rounded-full border flex items-center justify-center relative overflow-hidden transition-all duration-300 ${
                            item ? 'bg-[#fcf9f2] border-[#c87a30] shadow-sm' : 'bg-[#3d2314]/5 border-dashed border-[#3d2314]/15'
                          }`}
                        >
                          {item ? (
                            <>
                              <img src={item.image} alt={item.name} className="w-[85%] h-[85%] object-contain select-none pointer-events-none" />
                              <button 
                                onClick={() => removeFlavorFromBox(i)}
                                className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[7px] font-bold cursor-pointer hover:bg-red-600 transition"
                              >
                                ✕
                              </button>
                            </>
                          ) : (
                            <span className="text-[10px] text-[#3d2314]/30 font-bold">{i + 1}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Progress and capacity status */}
              <div className="border-t border-[#3d2314]/5 pt-4">
                <div className="flex justify-between items-center text-xs font-semibold font-sans mb-1.5">
                  <span className="text-[#3d2314]/60">Box Capacity</span>
                  <span className="text-[#c87a30]">{boxFlavors.length} / {boxSize} Filled</span>
                </div>
                <div className="w-full h-2 bg-[#3d2314]/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#c87a30] transition-all duration-300"
                    style={{ width: `${(boxFlavors.length / boxSize) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Customizer Box Options & Trigger Board */}
          <div className="md:col-span-5 z-20">
            <span className="text-xs font-bold text-[#c87a30] tracking-widest uppercase font-sans block mb-3">Custom Curation</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3d2314] mb-4">Curate your own gold</h2>
            <p className="text-xs text-[#3d2314]/70 leading-relaxed font-sans mb-8">
              Select your box capacity and choose from our freshly baked signature inventory. Add to cart once your box is fully assembled.
            </p>

            {/* Toggle Box Pack Sizes */}
            <div className="flex space-x-3 mb-8">
              <button 
                onClick={() => { setBoxSize(6); setBoxPrice(24.99); setBoxFlavors([]); }}
                className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold font-sans tracking-wide uppercase transition cursor-pointer ${
                  boxSize === 6 
                    ? 'bg-[#3d2314] border-[#3d2314] text-[#fcf9f2] shadow-md shadow-[#3d2314]/15' 
                    : 'bg-[#fcf9f2] border-[#3d2314]/10 text-[#3d2314] hover:border-[#3d2314]/30'
                }`}
              >
                6-Pack · $24.99
              </button>
              <button 
                onClick={() => { setBoxSize(12); setBoxPrice(44.99); setBoxFlavors([]); }}
                className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold font-sans tracking-wide uppercase transition cursor-pointer ${
                  boxSize === 12 
                    ? 'bg-[#3d2314] border-[#3d2314] text-[#fcf9f2] shadow-md shadow-[#3d2314]/15' 
                    : 'bg-[#fcf9f2] border-[#3d2314]/10 text-[#3d2314] hover:border-[#3d2314]/30'
                }`}
              >
                12-Pack · $44.99
              </button>
            </div>

            {/* Cookie Selection Triggers Grid */}
            <div className="space-y-2 mb-8">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#3d2314]/50 block mb-3">Click to insert flavors:</span>
              <div className="grid grid-cols-2 gap-2">
                {FLAVORS.map(flavor => (
                  <button 
                    key={flavor.id}
                    onClick={() => addFlavorToBox(flavor)}
                    className="border border-[#3d2314]/10 hover:border-[#c87a30] bg-[#f6f0e2]/40 hover:bg-[#fcf9f2] p-2.5 rounded-xl text-left text-xs font-sans font-medium flex items-center space-x-2 transition cursor-pointer group"
                  >
                    <span className="text-base group-hover:scale-125 transition">{flavor.icon}</span>
                    <span className="truncate">{flavor.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Add Customizer Box to Cart Button */}
            <button 
              onClick={addCustomBoxToCart}
              disabled={boxFlavors.length !== boxSize}
              className={`w-full font-sans font-bold uppercase text-xs tracking-wider py-4 rounded-full flex items-center justify-center space-x-2 shadow-lg transition cursor-pointer ${
                boxFlavors.length === boxSize
                  ? 'bg-[#c87a30] hover:bg-[#3d2314] text-[#fcf9f2] shadow-[#c87a30]/10 hover:shadow-[#3d2314]/10'
                  : 'bg-[#3d2314]/10 text-[#3d2314]/40 cursor-not-allowed border border-[#3d2314]/5'
              }`}
            >
              <ShoppingBag size={14} />
              <span>Add Selection to Cart — ${boxPrice}</span>
            </button>

            {boxFlavors.length > 0 && (
              <button 
                onClick={() => setBoxFlavors([])}
                className="w-full text-center text-xs font-bold font-sans text-[#3d2314]/50 hover:text-[#3d2314] mt-4 flex items-center justify-center space-x-1 cursor-pointer transition-colors"
              >
                <RotateCcw size={12} />
                <span>Reset Box Slots</span>
              </button>
            )}
          </div>

        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#3d2314] text-[#fcf9f2] px-6 py-16 font-sans border-t border-[#fcf9f2]/10 z-40 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h3 className="font-serif text-3xl font-bold tracking-tight mb-4">Crumble &amp; Co.</h3>
            <p className="text-sm text-[#fcf9f2]/60 leading-relaxed max-w-sm">
              Artisan luxury baked goods, slow-baked in small batches, crafted for premium culinary indulgence.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#c87a30] mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-[#fcf9f2]/80">
              <li><a href="#ingredients" className="hover:text-[#c87a30] transition-colors">Our Alchemy</a></li>
              <li><a href="#flavours" className="hover:text-[#c87a30] transition-colors">Core Flavours</a></li>
              <li><a href="#story" className="hover:text-[#c87a30] transition-colors">Sacred Process</a></li>
              <li><a href="#order" className="hover:text-[#c87a30] transition-colors">Box Customizer</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#c87a30] mb-4">Bakehouse Location</h4>
            <p className="text-sm text-[#fcf9f2]/80 leading-relaxed">
              344 Golden Crumbs Ave,<br />
              Artisan District, CA 90210
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-[#fcf9f2]/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#fcf9f2]/40">
          <p>© 2026 Crumble &amp; Co. Baked to Perfection.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* ── SLIDE-OUT CART DRAWER ── */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-[#3d2314]/30 backdrop-blur-sm z-50 cursor-pointer"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              className="fixed right-0 top-0 h-full w-full sm:w-[440px] bg-[#fcf9f2] shadow-2xl z-50 flex flex-col justify-between"
            >
              <div className="p-6 overflow-y-auto flex-1">
                <div className="flex items-center justify-between border-b border-[#3d2314]/5 pb-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag size={20} className="text-[#c87a30]" />
                    <span className="font-serif text-2xl font-bold text-[#3d2314]">Indulgence Bag</span>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 hover:bg-[#3d2314]/5 rounded-full transition cursor-pointer text-[#3d2314]/70 hover:text-[#3d2314]"
                  >
                    <X size={20} />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-[#3d2314]/40 font-sans">
                    <ShoppingBag size={48} className="mb-4 stroke-[1.2]" />
                    <span className="text-sm font-semibold">Your bag is empty</span>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-xs text-[#c87a30] hover:underline mt-2 font-bold cursor-pointer"
                    >
                      Start Curating
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, idx) => (
                      <div key={item.id} className="flex gap-4 p-4 bg-[#f6f0e2]/40 rounded-2xl border border-[#3d2314]/5 relative">
                        <div className="w-16 h-16 rounded-xl bg-white border border-[#3d2314]/5 flex items-center justify-center p-2">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain select-none pointer-events-none" />
                          ) : (
                            <span className="text-3xl">{item.icon}</span>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-serif font-bold text-sm text-[#3d2314] leading-snug">{item.name}</h4>
                            {item.isCustomBox && item.flavors && (
                              <p className="text-[10px] text-[#3d2314]/60 font-sans mt-0.5 truncate">
                                Flavours: {item.flavors.map(f => f.name.split(' ')[0]).join(', ')}
                              </p>
                            )}
                            <span className="text-xs font-bold text-[#c87a30] font-sans mt-1 block">${(item.price * item.qty).toFixed(2)}</span>
                          </div>
                          
                          {/* Quantity selector */}
                          <div className="flex items-center space-x-3 mt-2">
                            <button 
                              onClick={() => changeQty(idx, -1)}
                              className="w-6 h-6 border border-[#3d2314]/15 rounded-full flex items-center justify-center text-xs hover:bg-[#3d2314]/5 transition cursor-pointer"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-xs font-bold font-sans w-4 text-center">{item.qty}</span>
                            <button 
                              onClick={() => changeQty(idx, 1)}
                              className="w-6 h-6 border border-[#3d2314]/15 rounded-full flex items-center justify-center text-xs hover:bg-[#3d2314]/5 transition cursor-pointer"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 bg-[#f6f0e2]/50 border-t border-[#3d2314]/5">
                  <div className="flex justify-between items-center text-sm font-bold font-sans mb-6">
                    <span className="text-[#3d2314]/60 uppercase tracking-wide text-xs">Total Indulgence</span>
                    <span className="text-xl text-[#c87a30]">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); setCheckoutStep(1); }}
                    className="w-full bg-[#3d2314] hover:bg-[#c87a30] text-[#fcf9f2] font-semibold text-xs tracking-wider uppercase py-4 rounded-full transition shadow-lg shadow-[#3d2314]/10 cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── MULTI-STEP CHECKOUT WIZARD MODAL ── */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutOpen(false)}
              className="fixed inset-0 bg-[#3d2314]/40 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#fcf9f2] w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl relative z-10 flex flex-col justify-between"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute top-4 right-4 p-2 bg-[#3d2314]/5 hover:bg-[#3d2314]/10 text-[#3d2314]/70 rounded-full transition cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Progress bar indicator */}
              <div className="px-8 pt-8 pb-4 border-b border-[#3d2314]/5 flex items-center justify-between">
                <span className="font-serif text-xl font-bold text-[#3d2314]">Artisan Checkout</span>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3].map((step) => (
                    <div 
                      key={step} 
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition font-sans ${
                        checkoutStep >= step ? 'bg-[#c87a30] text-[#fcf9f2]' : 'bg-[#3d2314]/5 text-[#3d2314]/40'
                      }`}
                    >
                      {checkoutStep > step ? <Check size={8} /> : step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps Area */}
              <div className="p-8 flex-1 overflow-y-auto max-h-[60vh]">
                {checkoutStep === 1 && (
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#3d2314] mb-4">01. Shipping Details</h3>
                    <form className="space-y-4 font-sans text-xs">
                      <div>
                        <label className="block font-bold text-[#3d2314]/60 mb-1">Full Name</label>
                        <input type="text" placeholder="John Doe" className="w-full p-3 bg-[#f6f0e2]/50 border border-[#3d2314]/10 rounded-xl focus:border-[#c87a30] focus:ring-1 focus:ring-[#c87a30] outline-none" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-[#3d2314]/60 mb-1">Email Address</label>
                          <input type="email" placeholder="john@example.com" className="w-full p-3 bg-[#f6f0e2]/50 border border-[#3d2314]/10 rounded-xl focus:border-[#c87a30] focus:ring-1 focus:ring-[#c87a30] outline-none" required />
                        </div>
                        <div>
                          <label className="block font-bold text-[#3d2314]/60 mb-1">Phone Number</label>
                          <input type="tel" placeholder="+1 (555) 123-4567" className="w-full p-3 bg-[#f6f0e2]/50 border border-[#3d2314]/10 rounded-xl focus:border-[#c87a30] focus:ring-1 focus:ring-[#c87a30] outline-none" required />
                        </div>
                      </div>
                      <div>
                        <label className="block font-bold text-[#3d2314]/60 mb-1">Delivery Address</label>
                        <input type="text" placeholder="Street Address, Suite / Apartment" className="w-full p-3 bg-[#f6f0e2]/50 border border-[#3d2314]/10 rounded-xl focus:border-[#c87a30] focus:ring-1 focus:ring-[#c87a30] outline-none" required />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <label className="block font-bold text-[#3d2314]/60 mb-1">City</label>
                          <input type="text" placeholder="Los Angeles" className="w-full p-3 bg-[#f6f0e2]/50 border border-[#3d2314]/10 rounded-xl focus:border-[#c87a30] focus:ring-1 focus:ring-[#c87a30] outline-none" required />
                        </div>
                        <div>
                          <label className="block font-bold text-[#3d2314]/60 mb-1">Postal Code</label>
                          <input type="text" placeholder="90210" className="w-full p-3 bg-[#f6f0e2]/50 border border-[#3d2314]/10 rounded-xl focus:border-[#c87a30] focus:ring-1 focus:ring-[#c87a30] outline-none" required />
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {checkoutStep === 2 && (
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#3d2314] mb-4">02. Secure Payment</h3>
                    <form className="space-y-4 font-sans text-xs">
                      <div>
                        <label className="block font-bold text-[#3d2314]/60 mb-1">Cardholder Name</label>
                        <input type="text" placeholder="John Doe" className="w-full p-3 bg-[#f6f0e2]/50 border border-[#3d2314]/10 rounded-xl focus:border-[#c87a30] focus:ring-1 focus:ring-[#c87a30] outline-none" required />
                      </div>
                      <div>
                        <label className="block font-bold text-[#3d2314]/60 mb-1">Card Number</label>
                        <input type="text" placeholder="••••  ••••  ••••  ••••" className="w-full p-3 bg-[#f6f0e2]/50 border border-[#3d2314]/10 rounded-xl focus:border-[#c87a30] focus:ring-1 focus:ring-[#c87a30] outline-none" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-[#3d2314]/60 mb-1">Expiration Date</label>
                          <input type="text" placeholder="MM / YY" className="w-full p-3 bg-[#f6f0e2]/50 border border-[#3d2314]/10 rounded-xl focus:border-[#c87a30] focus:ring-1 focus:ring-[#c87a30] outline-none" required />
                        </div>
                        <div>
                          <label className="block font-bold text-[#3d2314]/60 mb-1">Security Code (CVC)</label>
                          <input type="text" placeholder="•••" className="w-full p-3 bg-[#f6f0e2]/50 border border-[#3d2314]/10 rounded-xl focus:border-[#c87a30] focus:ring-1 focus:ring-[#c87a30] outline-none" required />
                        </div>
                      </div>
                      <div className="bg-[#3d2314]/5 p-4 rounded-2xl flex items-center justify-between text-[#3d2314]/80 mt-6">
                        <span className="font-semibold">Bakehouse Order Total</span>
                        <span className="font-bold text-sm text-[#c87a30]">${cartTotal.toFixed(2)}</span>
                      </div>
                    </form>
                  </div>
                )}

                {checkoutStep === 3 && (
                  <div className="text-center py-10 flex flex-col items-center">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                      <Check size={32} className="stroke-[2.5]" />
                    </div>
                    <h3 className="font-serif text-3xl font-bold text-[#3d2314] mb-3">Order Confirmed</h3>
                    <p className="text-xs text-[#3d2314]/70 leading-relaxed font-sans max-w-sm mb-6">
                      Your selection has been submitted to the kitchen. Our alchemists are prepping your slow-baked batch. We will email tracking info shortly.
                    </p>
                    <div className="bg-[#3d2314]/5 p-4 rounded-xl text-left w-full text-xs font-sans border border-[#3d2314]/5">
                      <div className="flex justify-between mb-1.5"><span className="text-[#3d2314]/50">Order Reference</span><span className="font-bold text-[#3d2314]">#CC-89422</span></div>
                      <div className="flex justify-between"><span className="text-[#3d2314]/50">Estimated Delivery</span><span className="font-bold text-[#c87a30]">2-3 Business Days</span></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="p-8 bg-[#f6f0e2]/50 border-t border-[#3d2314]/5 flex gap-4">
                {checkoutStep === 3 ? (
                  <button 
                    onClick={() => { setIsCheckoutOpen(false); setCart([]); }}
                    className="w-full bg-[#3d2314] hover:bg-[#c87a30] text-[#fcf9f2] font-semibold text-xs tracking-wider uppercase py-4 rounded-full transition text-center cursor-pointer"
                  >
                    Return to Storefront
                  </button>
                ) : (
                  <>
                    {checkoutStep > 1 && (
                      <button 
                        onClick={() => setCheckoutStep(prev => prev - 1)}
                        className="border border-[#3d2314]/20 hover:border-[#3d2314] text-[#3d2314] font-semibold text-xs px-6 py-4 rounded-full transition cursor-pointer"
                      >
                        Back
                      </button>
                    )}
                    <button 
                      onClick={() => setCheckoutStep(prev => prev + 1)}
                      className="flex-1 bg-[#3d2314] hover:bg-[#c87a30] text-[#fcf9f2] font-semibold text-xs tracking-wider uppercase py-4 rounded-full transition flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-[#3d2314]/5"
                    >
                      <span>{checkoutStep === 2 ? `Pay $${cartTotal.toFixed(2)}` : 'Continue'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── TOAST NOTIFICATIONS ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#3d2314] text-[#fcf9f2] border border-[#fcf9f2]/10 py-3 px-5 rounded-2xl shadow-xl flex items-center space-x-2 font-sans font-semibold text-xs"
            >
              <Sparkles size={14} className="text-[#c87a30]" />
              <span>{t.msg}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
