import React, { useState, useEffect } from "react";
import axios from "axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const limit = 15; // Number of transactions per page

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `https://explorer.mtw-testnet.com/transactions/?page=${page}&limit=${limit}`
        );
        setTransactions(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch transactions");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [page]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#121212]">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#008054] dark:text-[#00df9a]">
        Latest Transactions
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading transactions...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="w-[90%] max-w-[1200px]">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 text-black dark:text-white">
            <thead>
              <tr className="bg-[#00df9a] dark:bg-[#008054] text-black dark:text-white">
                <th className="border p-4">Hash</th>
                <th className="border p-4">Block Number</th>
                <th className="border p-4">Gas Used</th>
                <th className="border p-4">From</th>
                <th className="border p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr
                  key={tx.hash}
                  className={`${
                    index % 2 === 0
                      ? "bg-gray-100 dark:bg-[#003C29]"
                      : "bg-gray-300 dark:bg-[#005a3d]"
                  } hover:bg-[#008054] hover:text-white dark:hover:bg-[#00df9a] dark:hover:text-black text-center transition`}
                >
                  <td className="border p-4 text-xs break-all">{tx.hash}</td>
                  <td className="border p-4">{tx.blockNumber || "N/A"}</td>
                  <td className="border p-4">{tx.gasUsed || "N/A"}</td>
                  <td className="border p-4 text-xs break-all">{tx.from || "N/A"}</td>
                  <td className="border p-4">{new Date(tx.timestamp * 1000).toLocaleString()}</td>
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

export default Transactions;
