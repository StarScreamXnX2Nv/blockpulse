import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`https://explorer.mtw-testnet.com/search/?key=${query}`);
        const data = await response.json();

        // ✅ Filter out empty results to prevent the first empty table from showing
        const filteredData = data.filter((result) =>
          Object.values(result).some((value) => value !== null && value !== "")
        );

        setSearchResults(filteredData);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (searchResults.length === 0) return <p className="text-center text-gray-500">No results found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-[#00df9a] mb-6">Search Results</h1>

      {/* ✅ Hide empty table completely when there are no valid results */}
      {searchResults.length > 0 &&
        searchResults.map((result, index) => (
          <div key={index} className="bg-gray-800 text-white p-6 mb-4 rounded-lg shadow-md">
            {result.Id && <p><strong>ID:</strong> {result.Id}</p>}
            {result.blockNumber && <p><strong>Block Number:</strong> {result.blockNumber}</p>}
            {result.blockHash && <p><strong>Block Hash:</strong> {result.blockHash}</p>}
            {result.hash && <p><strong>Transaction Hash:</strong> {result.hash}</p>}
            {result.from && <p><strong>From:</strong> {result.from}</p>}
            {result.to && <p><strong>To:</strong> {result.to}</p>}
            {result.gasLimit && <p><strong>Gas Limit:</strong> {result.gasLimit}</p>}
            {result.gasPrice && <p><strong>Gas Price:</strong> {result.gasPrice}</p>}
          </div>
        ))}
    </div>
  );
};

export default SearchResults;
