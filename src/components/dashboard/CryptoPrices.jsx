import React, { useState, useEffect } from "react";
import axios from "axios";

const CryptoPrices = ({ theme }) => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              ids: "bitcoin,ethereum,dogecoin,algorand,polkadot,uniswap,compound",
              order: "market_cap_desc",
              per_page: 7,
              page: 1,
              sparkline: false, 
            },
          }
        );
        setPrices(response.data);
      } catch (err) {
        setError("Failed to fetch crypto prices.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`max-w-4xl mx-auto p-6 rounded-lg shadow-lg transition-all duration-300
      ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      <h2 className="text-2xl font-bold text-center text-[#00df9a] mb-4">
        Crypto Prices
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading prices...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-[#00df9a] text-black">
              <th className="border p-4">Asset</th>
              <th className="border p-4">Last Trade</th>
              <th className="border p-4">24H %</th>
              <th className="border p-4">24H Change</th>
              <th className="border p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((coin) => (
              <tr key={coin.id} className="text-center hover:bg-gray-800">
                <td className="border p-4 flex items-center justify-center space-x-2">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                  <span>{coin.symbol.toUpperCase()} / USD</span>
                </td>
                <td className="border p-4">${coin.current_price.toLocaleString()}</td>
                <td
                  className={`border p-4 ${
                    coin.price_change_percentage_24h < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td
                  className={`border p-4 ${
                    coin.price_change_24h < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  ${coin.price_change_24h.toFixed(2)}
                </td>
                <td className="border p-4">
                  <button className="px-4 py-2 bg-[#00df9a] text-black rounded-md hover:bg-green-400">
                    Trade
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CryptoPrices;
