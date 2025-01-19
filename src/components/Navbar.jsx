import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.add(theme);
  }, [theme]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <div className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 
    ${theme === 'light' ? 'bg-[#e0e0e0] text-black' : 'bg-[#121212] text-white'}`}>
      <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4'>
        <h1 className={`w-full text-3xl font-bold ${theme === 'light' ? 'text-[#00df9a]' : 'text-[#00df9a]'}`}>
          BlockPulse
        </h1>

        {/* Search Bar (Desktop) */}
        <form onSubmit={handleSearch} className="relative hidden md:flex items-center">
          <input
            type="text"
            placeholder="Search by hash, block, or address"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-64 rounded-lg text-black border border-gray-400 dark:border-gray-600"
          />
          <button type="submit" className="absolute right-2 text-gray-500 dark:text-gray-400">
            <AiOutlineSearch size={20} />
          </button>
        </form>

        {/* Desktop Menu */}
        <ul className='hidden md:flex'>
          <li className='p-4 hover:text-[#00796b]'><Link to="/">Home</Link></li>
          <li className='p-4 hover:text-[#00796b]'><Link to="/services">Services</Link></li>
          <li className='p-4 hover:text-[#00796b]'><Link to="/about">About</Link></li>
          <li className='p-4 hover:text-[#00796b]'><Link to="/contact">Contact</Link></li>
          <li className='p-4 hover:text-[#00796b]'><Link to="/explore">Explore</Link></li>
        </ul>

        {/* Theme Toggle Button (Desktop) */}
        <div className='hidden md:block ml-4 cursor-pointer' onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon size={20} className="text-[#333]" /> : <FaSun size={20} className="text-yellow-400" />}
        </div>

        {/* Mobile Menu Icon and Theme Toggle */}
        <div className='flex items-center md:hidden'>
          {/* Theme Toggle Button (Mobile) */}
          <div className='mr-6 cursor-pointer' onClick={toggleTheme}>
            {theme === 'light' ? <FaMoon size={20} className="text-[#333]" /> : <FaSun size={20} className="text-yellow-400" />}
          </div>

          {/* Mobile Menu Icon */}
          <div onClick={handleNav}>
            {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
          </div>
        </div>

        {/* Mobile Sidebar Menu */}
        <div className={nav 
        ? `fixed left-0 top-0 w-[60%] h-full border-r ${theme === 'light' ? 'border-r-gray-400 bg-[#f0f4f8]' : 'border-r-gray-900 bg-[#000300]'} ease-in-out duration-500`
        : 'fixed left-[-100%]'}>
          <h1 className={`w-full text-3xl font-bold m-4 ${theme === 'light' ? 'text-[#00796b]' : 'text-[#00df9a]'}`}>
            MTW
          </h1>

          {/* Search Bar (Mobile) */}
          <form onSubmit={handleSearch} className="flex items-center p-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 w-full rounded-lg text-black border border-gray-400 dark:border-gray-600"
            />
            <button type="submit" className="ml-2 text-gray-500 dark:text-gray-400">
              <AiOutlineSearch size={20} />
            </button>
          </form>

          <ul className='uppercase p-4'>
            <li className='p-4 border-b border-gray-600'><Link to="/" onClick={handleNav}>Home</Link></li>
            <li className='p-4 border-b border-gray-600'><Link to="/services" onClick={handleNav}>Services</Link></li>
            <li className='p-4 border-b border-gray-600'><Link to="/about" onClick={handleNav}>About</Link></li>
            <li className='p-4 border-b border-gray-600'><Link to="/explore" onClick={handleNav}>Explore</Link></li>
            <li className='p-4'><Link to="/contact" onClick={handleNav}>Contact</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
