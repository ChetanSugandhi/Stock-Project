import React from 'react';
import { TrendingUp, DollarSign, Award, TrendingDown } from 'lucide-react';
import { StockHolding } from '../types';

interface PortfolioStatsProps {
  holdings: StockHolding[];
}

export function PortfolioStats({ holdings }: PortfolioStatsProps) {
  const totalValue = holdings.reduce((sum, stock) => sum + stock.shares * stock.currentPrice, 0);
  const totalCost = holdings.reduce((sum, stock) => sum + stock.shares * stock.purchasePrice, 0);
  const totalGainLoss = totalValue - totalCost;
  const totalGainLossPercent = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;
  
  const topPerformer = holdings.reduce((best, stock) => {
    const gainPercent = ((stock.currentPrice - stock.purchasePrice) / stock.purchasePrice) * 100;
    if (!best || gainPercent > best.gainPercent) {
      return { symbol: stock.symbol, gainPercent };
    }
    return best;
  }, null as { symbol: string; gainPercent: number } | null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Value</h3>
            <p className="text-2xl font-semibold">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${totalGainLoss >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
            {totalGainLoss >= 0 ? (
              <TrendingUp className="w-6 h-6 text-green-600" />
            ) : (
              <TrendingDown className="w-6 h-6 text-red-600" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Gain/Loss</h3>
            <p className={`text-2xl font-semibold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalGainLoss >= 0 ? '+' : '-'}${Math.abs(totalGainLoss).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              <span className="text-lg ml-1">
                ({totalGainLossPercent >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(2)}%)
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-full">
            <Award className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Top Performer</h3>
            <p className="text-2xl font-semibold">
              {topPerformer ? (
                <>
                  {topPerformer.symbol}{' '}
                  <span className="text-green-600 text-lg">
                    (+{topPerformer.gainPercent.toFixed(1)}%)
                  </span>
                </>
              ) : (
                'N/A'
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Holdings</h3>
            <p className="text-2xl font-semibold">{holdings.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}