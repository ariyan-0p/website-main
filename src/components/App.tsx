import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';

// --- Components ---
import Header from './Header';
import Hero from './Hero';
import TrustedBy from './TrustedBy';
import Features from './Features';
import PosPresentation from './PosPresentation';
import Pricing from './Pricing';
import Footer from './Footer';
import ContactModal from './ContactModal';
import ProductPage from './ProductPage';
import About from './About';   // <--- Import About
import Contact from './Contact'; // <--- Import Contact

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
        <PosPresentation />
        <Pricing onOpenModal={() => setIsModalOpen(true)} />
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
          
          {/* New Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}