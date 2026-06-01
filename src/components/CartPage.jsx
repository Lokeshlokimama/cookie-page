import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';
import { ArrowLeft, Trash2, Plus, Minus, ShieldCheck, Truck, Lock, CheckCircle, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const {
    cartItems,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    setView
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0); // decimal percentage e.g. 0.1 for 10%
  const [promoError, setPromoError] = useState('');

  // Shipping & Billing Calculations
  const FREE_SHIPPING_THRESHOLD = 50;
  const subtotal = cartTotal;
  const discount = subtotal * promoDiscount;
  const discountedSubtotal = subtotal - discount;
  const shipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 5.00;
  const tax = discountedSubtotal * 0.08; // 8% tax
  const total = discountedSubtotal + shipping + tax;

  // Checkout Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [generatedOrderNumber, setGeneratedOrderNumber] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SWEET10') {
      setPromoApplied(true);
      setPromoDiscount(0.1);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "SWEET10".');
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email required';
    if (!formData.address.trim()) errors.address = 'Required';
    if (!formData.city.trim()) errors.city = 'Required';
    if (!formData.zip.trim()) errors.zip = 'Required';
    if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) errors.cardNumber = 'Must be 16 digits';
    if (!formData.expiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) errors.expiry = 'MM/YY required';
    if (!formData.cvc.match(/^\d{3,4}$/)) errors.cvc = '3-4 digits required';
    return errors;
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsProcessing(true);
    // Simulate steps in fresh baking/sealing transaction
    setTimeout(() => setProcessingStep(1), 800);
    setTimeout(() => setProcessingStep(2), 1600);
    setTimeout(() => {
      const orderNum = 'LB-' + Math.floor(100000 + Math.random() * 900000);
      setGeneratedOrderNumber(orderNum);
      setIsProcessing(false);
      setOrderConfirmed(true);
    }, 2500);
  };

  const handleReturnHome = () => {
    clearCart();
    setView('landing');
  };

  const progressPercent = Math.min((discountedSubtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - discountedSubtotal;

  return (
    <div className="min-h-screen pt-36 pb-20 bg-[#FAF6F0] selection:bg-[#2C1A11] selection:text-[#FAF6F0]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Back navigation */}
        <button
          onClick={() => setView('landing')}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2C1A11]/60 hover:text-[#2C1A11] transition mb-8 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Bakery
        </button>

        <AnimatePresence mode="wait">
          {!orderConfirmed ? (
            <motion.div
              key="cart-layout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >
              {/* LEFT COLUMN: Shopping Cart List */}
              <div className="lg:col-span-7 space-y-8">
                <div className="border-b border-[#EADEC9] pb-5">
                  <h1 className="font-serif text-3xl md:text-4xl font-black text-[#2C1A11] uppercase tracking-wide">
                    Shopping Bag
                  </h1>
                  <p className="text-xs text-[#4A2E1B]/60 mt-1">
                    You have {cartItems.length} unique bake {cartItems.length === 1 ? 'item' : 'items'} in your box.
                  </p>
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-20 bg-white/40 border border-[#EADEC9]/30 rounded-3xl p-6 backdrop-blur-xs">
                    <ShoppingBag className="h-12 w-12 text-[#C5A880] mx-auto mb-4" />
                    <h3 className="font-serif text-lg font-bold text-[#2C1A11]">Your box is empty</h3>
                    <p className="text-xs text-[#4A2E1B]/60 mt-1 max-w-xs mx-auto">
                      Fill it with our freshly baked, hand-churned gourmet cookies and brownies.
                    </p>
                    <button
                      onClick={() => setView('landing')}
                      className="mt-6 inline-flex items-center justify-center rounded-full bg-[#2C1A11] text-[#FAF6F0] px-8 py-3.5 text-[10px] font-bold uppercase tracking-widest hover:bg-[#C5A880] hover:text-[#2C1A11] transition duration-300"
                    >
                      Explore The Menu
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Free Shipping Progress Indicator */}
                    <div className="bg-white/50 border border-[#EADEC9]/30 rounded-2xl p-5 backdrop-blur-xs">
                      <div className="flex items-center justify-between text-xs font-bold text-[#2C1A11] mb-2 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <Truck className="h-4 w-4 text-[#C5A880]" />
                          {shipping === 0 ? 'Free Shipping Earned' : 'Premium Express Shipping'}
                        </span>
                        <span>
                          {shipping === 0 ? 'Qualified' : `$${remainingForFreeShipping.toFixed(2)} left`}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-[#EADEC9]/40 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: 0.6 }}
                          className="h-full bg-[#C5A880] rounded-full"
                        />
                      </div>
                      {shipping > 0 && (
                        <p className="text-[10px] text-[#4A2E1B]/60 mt-2">
                          Add just ${remainingForFreeShipping.toFixed(2)} more of delicious bakes to earn free express shipping!
                        </p>
                      )}
                    </div>

                    {/* Cart Items Loop */}
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white border border-[#EADEC9]/20 rounded-3xl p-5 premium-shadow"
                        >
                          <div className="flex gap-4 items-center w-full sm:w-auto">
                            <div className="h-20 w-20 bg-[#FBF9F6] border border-[#EADEC9]/15 rounded-2xl flex items-center justify-center p-2 shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-contain blend-multiply"
                              />
                            </div>
                            <div>
                              <span className="text-[9px] font-black tracking-widest text-[#C5A880] uppercase">
                                {item.category === 'cookie' ? 'Artisanal Cookie' : 'Fudge Brownie'}
                              </span>
                              <h3 className="font-serif text-base font-bold text-[#2C1A11] mt-0.5">
                                {item.name}
                              </h3>
                              <p className="text-xs text-[#4A2E1B]/60 mt-0.5">${item.price.toFixed(2)} each</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between w-full sm:w-auto sm:gap-8 border-t sm:border-t-0 border-[#EADEC9]/20 pt-4 sm:pt-0">
                            <div className="flex items-center gap-3 bg-[#FAF6F0] rounded-full px-3 py-1.5 border border-[#EADEC9]/30">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-[#2C1A11]/60 hover:text-[#2C1A11] cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-xs font-bold w-5 text-center text-[#2C1A11]">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-[#2C1A11]/60 hover:text-[#2C1A11] cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <span className="font-serif text-base font-black text-[#2C1A11] min-w-[70px] text-right">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 rounded-full hover:bg-red-50 text-black/30 hover:text-red-500 transition cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: Summary & Secure Checkout Card */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Billing Summary Card */}
                <div className="rounded-3xl bg-[#2C1A11] text-[#FAF6F0] p-6 border border-white/5 shadow-xl">
                  <h2 className="font-serif text-xl font-bold uppercase tracking-wide border-b border-white/10 pb-4">
                    Summary
                  </h2>

                  {/* Promo Input */}
                  <form onSubmit={handleApplyPromo} className="mt-5 border-b border-white/10 pb-5">
                    <label htmlFor="promo" className="text-[10px] font-black uppercase tracking-widest text-[#C5A880] block mb-2">
                      Enter Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="promo"
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="SWEET10"
                        className="flex-1 rounded-full bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-white/30 uppercase focus:outline-none focus:border-[#C5A880]"
                      />
                      <button
                        type="submit"
                        className="rounded-full bg-[#C5A880] text-[#2C1A11] px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {promoApplied && (
                      <p className="text-[10px] text-green-400 mt-2">
                        Promo SWEET10 applied! 10% discount subtracted.
                      </p>
                    )}
                    {promoError && (
                      <p className="text-[10px] text-red-400 mt-2">
                        {promoError}
                      </p>
                    )}
                  </form>

                  {/* Billing Grid */}
                  <div className="mt-5 space-y-3.5 text-xs border-b border-white/10 pb-5">
                    <div className="flex justify-between text-white/70">
                      <span>Order Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between text-green-400">
                        <span>SWEET10 (10% Off)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-white/70">
                      <span>Premium Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>VAT / Estimated Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center mt-5 text-[#FAF6F0]">
                    <span className="font-serif text-sm font-semibold uppercase tracking-wider">Total</span>
                    <span className="font-serif text-2xl font-black text-[#C5A880]">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Secure Checkout Form Panel */}
                {cartItems.length > 0 && (
                  <form
                    onSubmit={handleSubmitOrder}
                    className="rounded-3xl bg-white border border-[#EADEC9]/40 p-6 premium-shadow space-y-4"
                  >
                    <div className="flex items-center gap-2 border-b border-[#EADEC9]/20 pb-4">
                      <Lock className="h-4 w-4 text-[#C5A880]" />
                      <h3 className="font-serif text-base font-bold text-[#2C1A11] uppercase tracking-wide">
                        Secure Checkout
                      </h3>
                    </div>

                    {/* Shipping Address Inputs */}
                    <div className="space-y-3">
                      <span className="text-[9px] font-black tracking-widest text-[#C5A880] uppercase block">
                        Delivery Information
                      </span>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                          <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full rounded-lg bg-[#FAF6F0] border ${formErrors.name ? 'border-red-400' : 'border-[#EADEC9]/40'} px-4 py-2.5 text-xs text-[#2C1A11] focus:outline-none`}
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full rounded-lg bg-[#FAF6F0] border ${formErrors.email ? 'border-red-400' : 'border-[#EADEC9]/40'} px-4 py-2.5 text-xs text-[#2C1A11] focus:outline-none`}
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="text"
                            name="address"
                            placeholder="Shipping Address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className={`w-full rounded-lg bg-[#FAF6F0] border ${formErrors.address ? 'border-red-400' : 'border-[#EADEC9]/40'} px-4 py-2.5 text-xs text-[#2C1A11] focus:outline-none`}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`w-full rounded-lg bg-[#FAF6F0] border ${formErrors.city ? 'border-red-400' : 'border-[#EADEC9]/40'} px-4 py-2.5 text-xs text-[#2C1A11] focus:outline-none`}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name="zip"
                            placeholder="Zip / Postal Code"
                            value={formData.zip}
                            onChange={handleInputChange}
                            className={`w-full rounded-lg bg-[#FAF6F0] border ${formErrors.zip ? 'border-red-400' : 'border-[#EADEC9]/40'} px-4 py-2.5 text-xs text-[#2C1A11] focus:outline-none`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Payment Inputs */}
                    <div className="space-y-3 pt-2">
                      <span className="text-[9px] font-black tracking-widest text-[#C5A880] uppercase block">
                        Credit Card details (Simulated)
                      </span>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-3">
                          <input
                            type="text"
                            name="cardNumber"
                            placeholder="16-Digit Card Number"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            maxLength="19"
                            className={`w-full rounded-lg bg-[#FAF6F0] border ${formErrors.cardNumber ? 'border-red-400' : 'border-[#EADEC9]/40'} px-4 py-2.5 text-xs text-[#2C1A11] focus:outline-none`}
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="text"
                            name="expiry"
                            placeholder="MM/YY"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            maxLength="5"
                            className={`w-full rounded-lg bg-[#FAF6F0] border ${formErrors.expiry ? 'border-red-400' : 'border-[#EADEC9]/40'} px-4 py-2.5 text-xs text-[#2C1A11] focus:outline-none`}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name="cvc"
                            placeholder="CVC"
                            value={formData.cvc}
                            onChange={handleInputChange}
                            maxLength="4"
                            className={`w-full rounded-lg bg-[#FAF6F0] border ${formErrors.cvc ? 'border-red-400' : 'border-[#EADEC9]/40'} px-4 py-2.5 text-xs text-[#2C1A11] focus:outline-none`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full rounded-full bg-[#2C1A11] text-[#FAF6F0] py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#C5A880] hover:text-[#2C1A11] transition duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="h-4 w-4" />
                      Place Secure Order
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          ) : (
            /* ORDER CONFIRMATION VIEW */
            <motion.div
              key="confirmation-layout"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto bg-white border border-[#EADEC9]/30 rounded-3xl p-8 text-center premium-shadow relative z-10"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-500 mb-6">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h2 className="font-serif text-3xl font-black text-[#2C1A11] uppercase tracking-wide">
                Freshly Baker Confirmed!
              </h2>
              <p className="text-xs text-[#C5A880] uppercase tracking-widest font-black mt-2">
                Order Reference: {generatedOrderNumber}
              </p>
              
              <div className="my-6 border-t border-b border-[#EADEC9]/25 py-6 text-left space-y-4">
                <div className="text-xs text-[#4A2E1B]/80 leading-relaxed space-y-1">
                  <p className="font-bold text-[#2C1A11]">Delivery Address:</p>
                  <p>{formData.name}</p>
                  <p>{formData.address}</p>
                  <p>{formData.city}, {formData.zip}</p>
                  <p className="mt-2 text-[#4A2E1B]/60 italic">Receipt confirmation sent to {formData.email}</p>
                </div>
                
                <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#EADEC9]/15">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#C5A880] mb-2">Order Summary</p>
                  <div className="space-y-1">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-xs text-[#2C1A11]">
                        <span>{item.name} (x{item.quantity})</span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t border-[#EADEC9]/30 mt-2 pt-2 flex justify-between text-xs font-bold text-[#2C1A11]">
                      <span>Charged Amount</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#4A2E1B]/70 leading-relaxed mb-6">
                Our pastry chefs have scheduled your order. Each box is baked fresh at 4:00 AM tomorrow and shipped in gold-sealed preservation tins.
              </p>

              <button
                onClick={handleReturnHome}
                className="rounded-full bg-[#2C1A11] text-[#FAF6F0] px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-[#C5A880] hover:text-[#2C1A11] transition duration-300 active:scale-95 cursor-pointer"
              >
                Return to Bakery Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Checkout Processing Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-4 bg-[#2C1A11]/95 text-[#FAF6F0] text-center"
          >
            <div className="relative h-20 w-20 flex items-center justify-center mb-6">
              {/* Spinner border */}
              <div className="absolute inset-0 rounded-full border-4 border-white/5 border-t-[#C5A880] animate-spin" />
              <ShoppingBag className="h-8 w-8 text-[#C5A880] animate-pulse" />
            </div>

            <h3 className="font-serif text-xl font-bold uppercase tracking-wide">
              {processingStep === 0 && 'Securing Connection...'}
              {processingStep === 1 && 'Processing Secure Transaction...'}
              {processingStep === 2 && 'Sealing Fresh Tin Box...'}
            </h3>
            <p className="text-xs text-white/50 mt-2 max-w-xs leading-relaxed">
              {processingStep === 0 && 'Establishing SSL connection to baking gateways.'}
              {processingStep === 1 && 'Authorizing card credentials and clearing batch tickets.'}
              {processingStep === 2 && 'Scheduling oven slots and preparing gold foil seals.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
