import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "https://explorer.mtw-testnet.com/transactions/?page=1&limit=10"
        );
        setTransactions(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch transactions");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#00df9a]">
        Latest Transactions
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading transactions...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#00df9a] text-white">
              <th className="border p-4">Block Number</th>
              <th className="border p-4">From</th>
              <th className="border p-4">To</th>
              <th className="border p-4">Hash</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.hash} className="hover: text-center">
                <td className="border p-4">{tx.blockNumber}</td>
                <td className="border p-4">{tx.from}</td>
                <td className="border p-4">{tx.to}</td>
                {/* Make the hash clickable */}
                <td className="border p-4 text-xs break-all">
                  <Link
                    to={`/transaction/${tx.hash}`}
                    className="text-blue-500 hover:underline"
                  >
                    {tx.hash}
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

export default Transactions;
