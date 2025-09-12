// API data types
export type GetStockDataResponse = {
  price: string;
  profile: ETFProfile;
  dividends: Array<DividendPayment>;
};

export type ETFProfile = {
  net_expense_ratio: string;
};

export type DividendPayment = {
  amount: string;
  ex_dividend_date: string;
};

// For use by frontend
export enum SecurityDataProvider {
  ALPHA_VANTAGE = "Alpha Vantage",
  YAHOO_FINANCE = "Yahoo Finance",
}

export type SecurityData = {
  expenseRatio: number;
  dividendHistory: Array<{
    exDividendDate: string;
    amount: number;
  }>;
  dividendFrequency: string;
  dividendPerShareTTM: number;
  price: number;
};

export type Holding = {
  category: string;
  costBasis: number;
  expenseRatio: number;
  dividendHistory: Array<{
    exDividendDate: string;
    amount: number;
  }>;
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
