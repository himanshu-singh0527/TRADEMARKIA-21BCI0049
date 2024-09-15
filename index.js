import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    owner: '',
    lawFirm: '',
    attorney: '',
    status: ''
  });
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('Idle');

  const handleSearch = async () => {
    setStatus('Searching...');
    try {
      // Replace with your API call
      const response = await fetch('/api/trademark-search', {
        method: 'POST',
        body: JSON.stringify({ query, filters }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();

      if (data.results.length > 0) {
        setResults(data.results);
        setStatus('Results Found');
      } else {
        setStatus('No Results Found');
      }
    } catch (error) {
      setStatus('Error Occurred');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Trademark Search</h1>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search trademarks..."
        className="border p-2 w-full mb-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Filters */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Owner"
          className="border p-2"
          value={filters.owner}
          onChange={(e) => setFilters({ ...filters, owner: e.target.value })}
        />
        <input
          type="text"
          placeholder="Law Firm"
          className="border p-2"
          value={filters.lawFirm}
          onChange={(e) => setFilters({ ...filters, lawFirm: e.target.value })}
        />
        <input
          type="text"
          placeholder="Attorney"
          className="border p-2"
          value={filters.attorney}
          onChange={(e) => setFilters({ ...filters, attorney: e.target.value })}
        />
        <input
          type="text"
          placeholder="Status"
          className="border p-2"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
      >
        Search
      </button>

      {/* Status Indicator */}
      <p className="mt-4">{status}</p>

      {/* Search Results */}
      <div className="mt-4">
        {results.map((result, index) => (
          <div key={index} className="border p-2 mb-2">
            {result.name}
          </div>
        ))}
      </div>
    </div>
  );
}
