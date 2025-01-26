import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Explore from "./components/Explore";
import Services from "./components/Services";
import Footer from "./components/Footer";
import Blocks from "./components/Blocks";
import Transactions from "./components/Transactions";
import BlockDetails from "./components/BlockDetails";
import TransactionDetails from "./components/TransactionDetails";
import SearchResults from "./components/SearchResults";
import Dashboard from "./components/Dashboard";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // 🌙 Global Theme State
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`min-h-screen transition duration-300 ${theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-black"}`}>
      {/* 🌙 Pass theme & toggle function to Navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {isHomePage && <Home />}

      <div className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blocks" element={<Blocks />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/explore" element={<Explore theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/dashboard" element={<Dashboard theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/block/:hash" element={<BlockDetails />} />
          <Route path="/transaction/:hash" element={<TransactionDetails />} />
          <Route path="/search/:query" element={<SearchResults />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
