import axios from "axios";
import { calculateDividendMetrics } from "shared/util/passive-income-utils";

class AlphaVantageApi {
  apiKey: string;
  symbol: string;

  constructor(apiKey: string, symbol: string) {
    this.apiKey = apiKey;
    this.symbol = symbol;
  }

  async callAsync<T>(functionName: string): Promise<T> {
    const { data } = await axios.get<T>("https://www.alphavantage.co/query", {
      params: {
        function: functionName,
        symbol: this.symbol,
        apikey: this.apiKey,
      },
    });
    return data;
  }
}

export async function fetchSecurityDataAsync(symbol: string, apiKey: string) {
  const api = new AlphaVantageApi(apiKey, symbol);
  const [stockPrice, etfProfile, dividendHistory] = await Promise.all([
    api.callAsync<{
      "Global Quote": {
        "05. price": string;
      };
    }>("GLOBAL_QUOTE"),
    api.callAsync<{
      net_expense_ratio: string;
    }>("ETF_PROFILE"),
    api.callAsync<{
      data: Array<{
        amount: string;
        ex_dividend_date: string;
      }>;
    }>("DIVIDENDS"),
  ]);

  const { dividendFrequency, dividendPerShareTTM } = calculateDividendMetrics(
    dividendHistory.data ?? []
  );

  return {
    expenseRatio: parseFloat(etfProfile.net_expense_ratio ?? "0"),
    dividendFrequency,
    dividendPerShareTTM,
    price: parseFloat(stockPrice["Global Quote"]["05. price"]),
  };
}
