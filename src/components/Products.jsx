import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';
import { ShoppingBag } from 'lucide-react';
import Tilt from './Tilt';

export default function Products() {
  const { addToCart, triggerFlyEffect } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const videoRef = useRef(null);

  // Force browser autoplay on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => console.log('Autoplay blocked:', err));
    }
  }, []);

  const productsList = [
    // 10 Cookies
    {
      id: 'bakes-choco-chip',
      category: 'cookie',
      name: 'Choco Chip Cookie',
      price: 250,
      description: 'The gold standard. Crafted with 70% single-origin dark chocolate chunks, pure French butter, and premium Madagascar vanilla bean.',
      image: 'hero_cookie.png',
      badge: 'Bestseller',
    },
    {
      id: 'bakes-white-choco',
      category: 'cookie',
      name: 'White Choco Chip Cookie',
      price: 270,
      description: 'Tender brown-butter cookie dough studded with sweet Belgian white chocolate chips and Madagascar vanilla.',
      image: 'caramel_cookie.png',
      badge: 'Delicate',
    },
    {
      id: 'bakes-peanut-butter',
      category: 'cookie',
      name: 'Peanut Butter Cookie',
      price: 270,
      description: 'Rich, creamy organic peanut butter folded into our signature dough, finished with a roasted peanut crunch.',
      image: 'caramel_cookie.png',
      badge: 'Creamy',
    },
    {
      id: 'bakes-oatmeal-raisin',
      category: 'cookie',
      name: 'Oatmeal Raisin Cookie',
      price: 250,
      description: 'Old-fashioned rolled oats, sweet plump organic raisins, and a warm hint of Ceylon cinnamon.',
      image: 'caramel_cookie.png',
      badge: 'Classic',
    },
    {
      id: 'bakes-caramel-cookie',
      category: 'cookie',
      name: 'Caramel Cookie',
      price: 270,
      description: 'Rich artisanal cookie loaded with caramel pockets, dark chocolate, and crowned with hand-harvested flaky French sea salt.',
      image: 'caramel_cookie.png',
      badge: 'Award Winner',
    },
    {
      id: 'bakes-pistachio-cookie',
      category: 'cookie',
      name: 'Pistachio Cookie',
      price: 290,
      description: 'Ceremonial Uji matcha infused cookie dough loaded with roasted green pistachios and white chocolate chunks.',
      image: 'pistachio_bake.png',
      badge: 'Artisanal',
    },
    {
      id: 'bakes-red-velvet-cookie',
      category: 'cookie',
      name: 'Red Velvet Cookies',
      price: 290,
      description: 'Vibrant cocoa red velvet dough with a molten cream cheese core and sweet white chocolate chips.',
      image: 'red_velvet.png',
      badge: 'Decadent',
    },
    {
      id: 'bakes-dry-fruit-cookie',
      category: 'cookie',
      name: 'Dry Fruit Cookie',
      price: 270,
      description: 'Crisp buttery biscuit filled with toasted almonds, walnuts, dates, and candied orange peel.',
      image: 'caramel_cookie.png',
      badge: 'Traditional',
    },
    {
      id: 'bakes-rich-choco-nuts',
      category: 'cookie',
      name: 'Rich Chocolate and Nuts',
      price: 290,
      description: 'A decadent dark cocoa dough baked with white chocolate chunks, molten fudge pieces, and a touch of espresso.',
      image: 'double_chocolate_cookie.png',
      badge: 'Luxurious',
    },
    {
      id: 'bakes-choco-walnut',
      category: 'cookie',
      name: 'Choco Walnut Cookies',
      price: 270,
      description: 'Fudgy dark cocoa cookie dough loaded with crunchy toasted English walnuts and milk chocolate.',
      image: 'double_chocolate_cookie.png',
      badge: 'Crunchy',
    },

    // 7 Brownies
    {
      id: 'bakes-classic-brownie',
      category: 'brownie',
      name: 'Chocolate Brownie Classic Plain',
      price: 290,
      description: 'Dense, fudgy brownie crafted with 70% dark Belgian cocoa and a signature glossy crinkle crust.',
      image: 'classic_brownie.png',
      badge: 'Bestseller',
    },
    {
      id: 'bakes-choco-chip-brownie',
      category: 'brownie',
      name: 'Choco Chip Brownie',
      price: 300,
      description: 'Double the chocolate. Our classic brownie loaded with dark and semi-sweet chocolate chunks.',
      image: 'classic_brownie.png',
      badge: 'Fudgy',
    },
    {
      id: 'bakes-peanut-brownie',
      category: 'brownie',
      name: 'Peanut Brownie',
      price: 320,
      description: 'Rich chocolate fudge brownie swirled with smooth, salty organic peanut butter fudge.',
      image: 'classic_brownie.png',
      badge: 'Rich',
    },
    {
      id: 'bakes-walnut-brownie',
      category: 'brownie',
      name: 'Walnut Brownie',
      price: 300,
      description: 'Decadent fudge brownie baked with a generous helping of toasted, chopped English walnuts.',
      image: 'classic_brownie.png',
      badge: 'Crunchy',
    },
    {
      id: 'bakes-dry-fruits-brownie',
      category: 'brownie',
      name: 'Dry Fruits Brownie',
      price: 320,
      description: 'Rich chocolate brownie packed with toasted almonds, raisins, dried cherries, and chopped walnuts.',
      image: 'classic_brownie.png',
      badge: 'Gourmet',
    },
    {
      id: 'bakes-red-gel-brownie',
      category: 'brownie',
      name: 'Red Gel Brownie',
      price: 300,
      description: 'Decadent dark fudge brownie layered with a vibrant, tart raspberry red gel swirl.',
      image: 'red_velvet.png',
      badge: 'Specialty',
    },
    {
      id: 'bakes-pistachio-brownie',
      category: 'brownie',
      name: 'Pistachio Brownie',
      price: 350,
      description: 'Dense chocolate brownie topped and swirled with creamy green pistachio butter and toasted nuts.',
      image: 'pistachio_bake.png',
      badge: 'Chef\'s Choice',
    },
  ];

  const filteredProducts = productsList.filter(
    (product) => activeCategory === 'all' || product.category === activeCategory
  );

  return (
    <section
      id="products"
      className="relative py-16 px-6 md:px-12 bg-[#FAF6F0]"
    >
      {/* Ambient Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
        <video
          ref={videoRef}
          src="Chocolate_chip_cookie_being_made_202606011942.mp4"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          className="opacity-[0.70]"
          loop
          playsInline
          preload="auto"
        />
      </div>

      {/* Background graphic elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#EADEC9] to-transparent" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 select-none">
          <span className="text-xs font-bold tracking-[0.25em] text-[#C5A880] uppercase mb-4 block">
            The Selection
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-black text-[#2C1A11] tracking-wide uppercase">
            Artisanal Offerings
          </h2>
          <p className="text-xs md:text-sm text-[#4A2E1B]/75 mt-3 leading-relaxed">
            Every cookie and brownie is weighed by hand, baked fresh to order in micro-batches, and wrapped in premium gold-sealed tissue to preserve peak texture.
          </p>
        </div>

        {/* Category Filtering Tabs */}
        <div className="flex justify-center gap-2 md:gap-4 mb-16 relative z-10 flex-wrap">
          {[
            { id: 'all', label: 'All Bakes' },
            { id: 'cookie', label: 'Cookies' },
            { id: 'brownie', label: 'Brownies' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`relative px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 focus:outline-none cursor-pointer rounded-full ${
                activeCategory === tab.id ? 'text-[#FAF6F0]' : 'text-[#2C1A11]'
              }`}
            >
              {activeCategory === tab.id && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-[#2C1A11] rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                key={product.id}
                className="flex"
              >
                <Tilt maxTilt={12} className="flex w-full">
                  <div
                    className="group flex flex-col justify-between rounded-3xl bg-white/70 border border-[#EADEC9]/30 p-5 premium-shadow transition-all duration-300 hover:shadow-2xl hover:border-[#C5A880]/50 w-full backdrop-blur-xs"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Product Top */}
                    <div style={{ transformStyle: 'preserve-3d' }}>
                      {/* Image and Badge */}
                      <div
                        className="relative aspect-square w-full rounded-2xl bg-[#FBF9F6]/80 border border-[#EADEC9]/15 flex items-center justify-center p-4 overflow-hidden"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {product.badge && (
                          <span
                            className="absolute top-3 left-3 z-10 rounded-full bg-[#2C1A11] text-[8px] font-black uppercase tracking-widest text-[#FAF6F0] px-3 py-1"
                            style={{ transform: 'translateZ(20px)' }}
                          >
                            {product.badge}
                          </span>
                        )}
                        {/* Cookie Image with 3D translation offset */}
                        <div style={{ transform: 'translateZ(35px)', transformStyle: 'preserve-3d' }} className="flex items-center justify-center">
                          <motion.img
                            src={product.image}
                            alt={product.name}
                            className="h-44 w-44 md:h-52 md:w-52 object-contain blend-multiply transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 select-none"
                          />
                        </div>
                      </div>

                      {/* Details */}
                      <div className="mt-5">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-serif text-base font-bold text-[#2C1A11] group-hover:text-[#C5A880] transition duration-300">
                            {product.name}
                          </h3>
                        </div>
                        <p className="text-[11px] text-[#4A2E1B]/75 leading-relaxed mt-2 line-clamp-3">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    {/* Product Bottom Controls */}
                    <div className="mt-6 pt-4 border-t border-[#EADEC9]/25 flex items-center justify-between">
                      <span className="font-serif text-lg font-black text-[#2C1A11]">
                        ₹{product.price.toFixed(2)}
                      </span>
                      
                      <button
                        onClick={(e) => {
                          triggerFlyEffect(e.clientX, e.clientY);
                          addToCart(product);
                        }}
                        className="inline-flex items-center gap-2 rounded-full bg-[#2C1A11] text-[#FAF6F0] px-5 py-2.5 text-[9px] font-bold uppercase tracking-widest hover:bg-[#C5A880] hover:text-[#2C1A11] transition duration-300 active:scale-95 shadow-sm cursor-pointer"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        Add to Box
                      </button>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
