import React, { useState, useEffect } from 'react';
import { AddStockForm } from './components/AddStockForm';
import { StockList } from './components/StockList';
import { PortfolioStats } from './components/PortfolioStats';
import { PortfolioChart } from './components/PortfolioChart';
import { StockHolding } from './types';
import { LayoutGrid } from 'lucide-react';

// Simulate price updates with more realistic behavior
const getRandomPriceChange = (basePrice: number) => {
  // More conservative price changes (0.5% max change)
  const change = (Math.random() - 0.5) * 2;
  return basePrice * (1 + change * 0.005);
};

function App() {
  const [holdings, setHoldings] = useState<StockHolding[]>([]);
  const [editingStock, setEditingStock] = useState<StockHolding | null>(null);

  // Simulate real-time price updates with smoother transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setHoldings(currentHoldings =>
        currentHoldings.map(stock => ({
          ...stock,
          currentPrice: getRandomPriceChange(stock.currentPrice),
        }))
      );
    }, 2000); // More frequent updates for smoother transitions

    return () => clearInterval(interval);
  }, []);

  const handleAddStock = ({ symbol, shares, purchasePrice }: { symbol: string; shares: number; purchasePrice: number }) => {
    // Check for duplicate symbols
    if (holdings.some(stock => stock.symbol === symbol)) {
      alert(`You already have ${symbol} in your portfolio. Please edit the existing entry instead.`);
      return;
    }

    const newStock: StockHolding = {
      id: Math.random().toString(36).substr(2, 9),
      symbol,
      shares,
      purchasePrice,
      currentPrice: purchasePrice, // In reality, this would come from an API
    };
    setHoldings(prev => [...prev, newStock]);
  };

  const handleDeleteStock = (id: string) => {
    setHoldings(prev => prev.filter(stock => stock.id !== id));
  };

  const handleEditStock = (stock: StockHolding) => {
    setEditingStock(stock);
    // In a real app, you would show an edit form modal here
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <LayoutGrid className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Tracker</h1>
        </div>

        <PortfolioStats holdings={holdings} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <AddStockForm onAdd={handleAddStock} />
          </div>
          <div className="h-full">
            <PortfolioChart holdings={holdings} />
          </div>
        </div>

        <StockList
          holdings={holdings}
          onDelete={handleDeleteStock}
          onEdit={handleEditStock}
        />
      </div>
    </div>
  );
}

export default App;