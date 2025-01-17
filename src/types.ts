export interface StockHolding {
  id: string;
  symbol: string;
  shares: number;
  purchasePrice: number;
  currentPrice: number;
}

export interface PortfolioStats {
  totalValue: number;
  topPerformer: {
    symbol: string;
    gain: number;
  };
}