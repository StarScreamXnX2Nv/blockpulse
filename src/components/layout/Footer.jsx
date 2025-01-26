import React, { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY + windowHeight;

      // Show footer only when the user reaches the bottom
      setIsVisible(scrollPosition >= documentHeight - 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer
      className={`w-full ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } transition-opacity duration-500 
      bg-gray-200 dark:bg-[#121212] text-black dark:text-gray-300 p-8 text-center mt-10 border-t-4 border-[#00df9a]`}
    >
      <h2 className="text-xl font-bold text-[#00df9a]">BlockPulse</h2>
      <p>Explore blockchain transactions, blocks, and more with BlockPulse.</p>
      <div className="flex justify-center space-x-4 mt-4">
        <FaFacebook size={24} />
        <FaInstagram size={24} />
      </div>
    </footer>
  );
};

export default Footer;
