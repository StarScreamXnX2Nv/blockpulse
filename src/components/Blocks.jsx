import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Blocks = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await axios.get(
          "https://explorer.mtw-testnet.com/blocks/?page=1&limit=10"
        );
        setBlocks(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blocks");
        setLoading(false);
      }
    };

    fetchBlocks();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#00df9a]">
        Latest Blocks
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading blocks...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#00df9a] text-white">
              <th className="border p-4">Block ID</th>
              <th className="border p-4">Gas Used</th>
              <th className="border p-4">Base Fee</th>
              <th className="border p-4">Hash</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((block) => (
              <tr key={block.Id} className="hover: text-center">
                <td className="border p-4">{block.Id}</td>
                <td className="border p-4">{block.gasUsed}</td>
                <td className="border p-4">{block.baseFeePerGas}</td>
                {/* Make hash clickable to navigate to block details */}
                <td className="border p-4 text-xs break-all">
                  <Link
                    to={`/block/${block.hash}`}
                    className="text-blue-500 hover:underline"
                  >
                    {block.hash}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Blocks;
