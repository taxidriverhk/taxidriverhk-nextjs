export enum SecurityDataProvider {
  ALPHA_VANTAGE = "Alpha Vantage",
  YAHOO_FINANCE = "Yahoo Finance",
}

export type Holding = {
  category: string;
  costBasis: number;
  expenseRatio: number;
  dividendFrequency: string;
  dividendPerShareTTM: number;
  price: number;
  shares: number;
  symbol: string;
};

export type AddHoldingInput = {
  category: string;
  costBasis: number;
  shares: number;
  symbol: string;
};
