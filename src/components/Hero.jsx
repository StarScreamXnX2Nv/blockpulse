import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Hero = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Blocks', 'Transactions'],
      typeSpeed: 120,
      backSpeed: 100,
      loop: true,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  // Invert the class for dark and light mode here
  return (
    <div className='text-black bg-white dark:bg-black dark:text-white'>
      <div className='max-w-[800px] mt-[96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>
          GROWING WITH BLOCKCHAIN INNOVATION
        </p>

        <h1 className='md:text-6xl sm:text-5xl text-4xl font-bold md:py-6'>
          Power the future with MTW Blockchain.
        </h1>

        <p className='md:text-5xl sm:text-4xl text-xl font-bold'>
          Fast, secure <span ref={el} className="text-[#00df9a]"></span>
        </p>
      </div>
    </div>
  );
};

export default Hero;
