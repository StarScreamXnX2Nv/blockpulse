import React, { useState, useEffect } from "react";
import axios from "axios";

const Blocks = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const limit = 15; // Number of blocks per page

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await axios.get(
          `https://explorer.mtw-testnet.com/blocks/?page=${page}&limit=${limit}`
        );
        setBlocks(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blocks");
        setLoading(false);
      }
    };

    fetchBlocks();
  }, [page]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#121212]">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#008054] dark:text-[#00df9a]">
        Latest Blocks
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading blocks...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="w-[90%] max-w-[1200px]">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 text-black dark:text-white">
            <thead>
              <tr className="bg-[#00df9a] dark:bg-[#008054] text-black dark:text-white">
                <th className="border p-4">Block Number</th>
                <th className="border p-4">Gas Used</th>
                <th className="border p-4">Base Fee</th>
                <th className="border p-4">Hash</th>
              </tr>
            </thead>
            <tbody>
              {blocks.map((block, index) => (
                <tr
                  key={block.Id}
                  className={`${
                    index % 2 === 0
                      ? "bg-gray-100 dark:bg-[#003C29]"
                      : "bg-gray-300 dark:bg-[#005a3d]"
                  } hover:bg-[#008054] hover:text-white dark:hover:bg-[#00df9a] dark:hover:text-black text-center transition`}
                >
                  <td className="border p-4">{block.Id}</td>
                  <td className="border p-4">{block.gasUsed}</td>
                  <td className="border p-4">{block.baseFeePerGas}</td>
                  <td className="border p-4 text-xs break-all">{block.hash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls (No Scroll Reset) */}
      <div className="mt-6 p-4 flex justify-between items-center w-[90%] max-w-[1200px]">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-[#008054] dark:bg-[#00df9a] text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-[#005a3d] dark:hover:bg-[#00c482] transition disabled:bg-gray-500"
        >
          Previous
        </button>

        <span className="text-lg font-semibold text-black dark:text-white">Page {page}</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-[#008054] dark:bg-[#00df9a] text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-[#005a3d] dark:hover:bg-[#00c482] transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Blocks;
