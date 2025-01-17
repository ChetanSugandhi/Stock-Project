import React from 'react';
import { StockHolding } from '../types';
import { PieChart } from 'lucide-react';

interface PortfolioChartProps {
  holdings: StockHolding[];
}

export function PortfolioChart({ holdings }: PortfolioChartProps) {
  const total = holdings.reduce((sum, stock) => sum + stock.shares * stock.currentPrice, 0);
  
  if (holdings.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col items-center justify-center text-gray-400">
        <PieChart size={48} className="mb-4" />
        <p className="text-center">Add stocks to see your portfolio distribution</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h2 className="text-xl font-semibold mb-6">Portfolio Distribution</h2>
      <div className="space-y-4">
        {holdings.map((stock, index) => {
          const value = stock.shares * stock.currentPrice;
          const percentage = (value / total) * 100;
          const hue = (index * 137.5) % 360; // Golden angle for color distribution
          
          return (
            <div key={stock.id}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: `hsl(${hue}, 70%, 60%)` }}
                  />
                  <span className="font-medium">{stock.symbol}</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-600">{percentage.toFixed(1)}%</span>
                  <span className="text-gray-400 text-sm ml-2">${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: `hsl(${hue}, 70%, 60%)`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}