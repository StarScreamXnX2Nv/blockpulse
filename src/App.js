import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Explore from './components/Explore'; 
import Services from './components/Services';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import Blocks from './components/Blocks';
import Transactions from './components/Transactions';
import BlockDetails from "./components/BlockDetails";
import TransactionDetails from "./components/TransactionDetails";
import SearchResults from "./components/SearchResults";
function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen transition duration-300">
      <Navbar />
      <ThemeToggle />  {/* Theme Toggle Button */}
      
      {isHomePage && <Hero />}
      
      <div className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blocks" element={<Blocks />} />
          <Route path="/transactions" element={<Transactions />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/" element={<Blocks />} />
          <Route path="/block/:hash" element={<BlockDetails />} />
          <Route path="/" element={<Transactions />} />
          <Route path="/transaction/:hash" element={<TransactionDetails />} />
          <Route path="/" element={<Transactions />} />
         
         <Route path="/search/:query" element={<SearchResults />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
