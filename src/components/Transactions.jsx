import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const limit = 10; // Set limit per page

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://explorer.mtw-testnet.com/transactions/?page=${page}&limit=${limit}`
        );

        setTransactions(response.data.data);
        setTotalTransactions(response.data.amount || 0); // Store total transactions
      } catch (err) {
        setError("Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [page]);

  const handleNext = () => {
    if (page < Math.ceil(totalTransactions / limit)) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#00df9a]">
        Transactions
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading transactions...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <p className="text-right text-lg font-bold">
            Total Transactions: {totalTransactions}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-[#00df9a] text-white">
                  <th className="border p-4">ID</th>
                  <th className="border p-4">Block Number</th>
                  <th className="border p-4">Block Hash</th>
                  <th className="border p-4">Transaction Hash</th>
                  <th className="border p-4">From</th>
                  <th className="border p-4">To</th>
                  <th className="border p-4">Gas Limit</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.hash} className=" text-center">
                    <td className="border p-4">{tx.Id}</td>
                    <td className="border p-4">{tx.blockNumber}</td>
                    <td className="border p-4 text-xs break-all">{tx.blockHash}</td>
                    <td className="border p-4 text-xs break-all">
                      <Link
                        to={`/transaction/${tx.hash}`}
                        className="text-blue-500 hover:underline"
                      >
                        {tx.hash}
                      </Link>
                    </td>
                    <td className="border p-4 text-xs break-all">{tx.from}</td>
                    <td className="border p-4 text-xs break-all">{tx.to}</td>
                    <td className="border p-4">{tx.gasLimit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevious}
              disabled={page === 1}
              className={`px-6 py-2 rounded-md text-white ${
                page === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-[#00df9a] hover:bg-green-700"
              }`}
            >
              Previous
            </button>
            <p className="text-lg">
              Page {page} / {Math.ceil(totalTransactions / limit)}
            </p>
            <button
              onClick={handleNext}
              disabled={page >= Math.ceil(totalTransactions / limit)}
              className={`px-6 py-2 rounded-md text-white ${
                page >= Math.ceil(totalTransactions / limit) ? "bg-gray-400 cursor-not-allowed" : "bg-[#00df9a] hover:bg-green-700"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Transactions;
