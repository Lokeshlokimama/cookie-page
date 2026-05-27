import { useState } from 'react';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Products from './components/Products';
import Industries from './components/Industries';
import Gallery from './components/Gallery';
import Clients from './components/Clients';
import WhyChooseUs from './components/WhyChooseUs';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelectService = (serviceId) => {
    setSelectedService(serviceId);
    setSelectedProduct(null); // Clear product if service selected
  };

  const handleSelectProduct = (productName) => {
    setSelectedProduct(productName);
    setSelectedService(null); // Clear service if product selected
  };

  const handleResetPresets = () => {
    setSelectedService(null);
    setSelectedProduct(null);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 ind-surface" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.08] ind-bg-grid" />
      {/* Utility top information bar */}
      <TopBar />
      
      {/* Header Sticky Navigation */}
      <Navbar />
      
      {/* Page Sections */}
      <main>
        <Hero />
        <About />
        <Services onSelectService={handleSelectService} />
        <Products onSelectProduct={handleSelectProduct} />
        <Industries />
        <Gallery />
        <Clients />
        <WhyChooseUs />
        <CTA />
      </main>
      
      {/* Contact RFQ Form Panel */}
      <Contact 
        selectedService={selectedService} 
        selectedProduct={selectedProduct} 
        onResetPresets={handleResetPresets}
      />
      
      {/* Footer Credentials */}
      <Footer />
    </div>
  );
}

export default App;
