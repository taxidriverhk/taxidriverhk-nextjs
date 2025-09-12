import axios from "axios";
import {
  SecurityData,
  SecurityDataProvider,
} from "shared/types/passive-income-types";
import { calculateDividendMetrics } from "shared/util/passive-income-utils";

abstract class SecurityDataFetcher {
  abstract fetchSecurityDataAsync(symbol: string): Promise<SecurityData>;
}

class AlphaVantageSecurityDataFetcher extends SecurityDataFetcher {
  apiKey: string;

  constructor(apiKey: string) {
    super();
    this.apiKey = apiKey;
  }

  async fetchSecurityDataAsync(symbol: string): Promise<SecurityData> {
    const [stockPrice, etfProfile, dividendHistoryData] = await Promise.all([
      this.callAsync<{
        "Global Quote": {
          "05. price": string;
        };
      }>("GLOBAL_QUOTE", symbol),
      this.callAsync<{
        net_expense_ratio: string;
      }>("ETF_PROFILE", symbol),
      this.callAsync<{
        data: Array<{
          amount: string;
          ex_dividend_date: string;
        }>;
      }>("DIVIDENDS", symbol),
    ]);

    const { dividendFrequency, dividendPerShareTTM } = calculateDividendMetrics(
      dividendHistoryData.data ?? []
    );
    const dividendHistory = dividendHistoryData.data?.map((history) => ({
      exDividendDate: history.ex_dividend_date,
      amount: parseFloat(history.amount ?? "0"),
    }));

    return {
      expenseRatio: parseFloat(etfProfile.net_expense_ratio ?? "0"),
      dividendHistory,
      dividendFrequency,
      dividendPerShareTTM,
      price: parseFloat(stockPrice["Global Quote"]["05. price"]),
    };
  }

  private async callAsync<T>(functionName: string, symbol: string): Promise<T> {
    const { data } = await axios.get<T>("https://www.alphavantage.co/query", {
      params: {
        function: functionName,
        symbol: symbol,
        apikey: this.apiKey,
      },
    });
    return data;
  }
}

class YahooFinanceSecurityDataFetcher extends SecurityDataFetcher {
  async fetchSecurityDataAsync(symbol: string): Promise<SecurityData> {
    throw new Error("Not implemented");
  }
}

export async function fetchSecurityDataAsync(
  symbol: string,
  provider: SecurityDataProvider,
  apiKey: string | null
) {
  let dataFetcher: SecurityDataFetcher;
  if (provider === SecurityDataProvider.ALPHA_VANTAGE) {
    dataFetcher = new AlphaVantageSecurityDataFetcher(apiKey!);
  } else {
    dataFetcher = new YahooFinanceSecurityDataFetcher();
  }
  return await dataFetcher.fetchSecurityDataAsync(symbol);
}
