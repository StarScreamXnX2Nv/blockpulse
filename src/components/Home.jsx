import React from 'react';
import Hero from './Hero'; // Import the Hero component

const Home = () => {
  return (
    <div className="h-screen bg-white text-black dark:bg-black dark:text-white">
      {/* Hero Section */}
      <Hero />

      {/* Additional Home Content */}
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-5xl font-bold text-center">Welcome to MTW Blockchain</h1>
        <p className="text-xl mt-4 text-center">
          Explore the future of decentralized technology.
        </p>
      </div>
    </div>
  );
};

export default Home;
