import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';

interface AddStockFormProps {
  onAdd: (stock: { symbol: string; shares: number; purchasePrice: number }) => void;
}

export function AddStockForm({ onAdd }: AddStockFormProps) {
  const [symbol, setSymbol] = useState('');
  const [shares, setShares] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    if (!symbol) return 'Stock symbol is required';
    if (!shares || Number(shares) <= 0) return 'Number of shares must be greater than 0';
    if (!purchasePrice || Number(purchasePrice) <= 0) return 'Purchase price must be greater than 0';
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    onAdd({
      symbol: symbol.toUpperCase(),
      shares: Number(shares),
      purchasePrice: Number(purchasePrice),
    });

    setSymbol('');
    setShares('');
    setPurchasePrice('');
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Stock</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center justify-between">
          <span className="text-red-600 text-sm">{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-600"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock Symbol
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => {
              setSymbol(e.target.value.toUpperCase());
              setError(null);
            }}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            placeholder="e.g., AAPL"
            maxLength={5}
          />
          <p className="mt-1 text-xs text-gray-500">Enter the stock ticker symbol (max 5 characters)</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Shares
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="number"
            value={shares}
            onChange={(e) => {
              setShares(e.target.value);
              setError(null);
            }}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            placeholder="e.g., 10"
            min="0.01"
            step="0.01"
          />
          <p className="mt-1 text-xs text-gray-500">Enter the number of shares you own</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Purchase Price
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => {
                setPurchasePrice(e.target.value);
                setError(null);
              }}
              className="w-full p-2 pl-7 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              placeholder="e.g., 150.00"
              min="0.01"
              step="0.01"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">Enter your cost basis per share</p>
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <PlusCircle size={20} />
        Add to Portfolio
      </button>
    </form>
  );
}