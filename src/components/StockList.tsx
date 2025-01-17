import React, { useState } from 'react';
import { Pencil, Trash2, AlertCircle } from 'lucide-react';
import { StockHolding } from '../types';

interface StockListProps {
  holdings: StockHolding[];
  onDelete: (id: string) => void;
  onEdit: (stock: StockHolding) => void;
}

export function StockList({ holdings, onDelete, onEdit }: StockListProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  if (holdings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No stocks in your portfolio</h3>
        <p className="text-gray-500">Add your first stock using the form above to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gain/Loss</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {holdings.map((stock) => {
              const totalValue = stock.shares * stock.currentPrice;
              const gainLoss = (stock.currentPrice - stock.purchasePrice) * stock.shares;
              const gainLossPercent = ((stock.currentPrice - stock.purchasePrice) / stock.purchasePrice) * 100;
              const isDeleting = deleteConfirm === stock.id;

              return (
                <tr key={stock.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">{stock.symbol}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {stock.shares.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${stock.purchasePrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${stock.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap font-medium ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <span className="inline-flex items-center gap-1">
                      {gainLoss >= 0 ? '+' : '-'}${Math.abs(gainLoss).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      <span className="text-sm">
                        ({gainLossPercent >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%)
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isDeleting ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onDelete(stock.id)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="text-gray-500 hover:text-gray-700 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <button
                          onClick={() => onEdit(stock)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Edit stock"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(stock.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Delete stock"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}