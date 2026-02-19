import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';

// --- Components ---
import Header from './Header';
import Hero from './Hero';
import TrustedBy from './TrustedBy';
import Features from './Features';
import RestaurantTypes from './RestaurantTypes';
import PosPresentation from './PosPresentation';
import Pricing from './Pricing';
import Newsletter from './Newsletter'; // <--- 1. Import Newsletter
import Footer from './Footer';
import ContactModal from './ContactModal';
import ProductPage from './ProductPage';
import About from './About';
import Contact from './Contact';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <Header onContactClick={() => setIsModalOpen(true)} />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <main>
        <Hero onOpenModal={() => setIsModalOpen(true)} />
        <TrustedBy />
        <Features />
        <RestaurantTypes /> 
        <PosPresentation />
        <Pricing onOpenModal={() => setIsModalOpen(true)} />
        
        {/* <--- 2. Add Newsletter right before the footer ---> */}
        <Newsletter /> 
      </main>
      <Footer />
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}