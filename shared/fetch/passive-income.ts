import axios from "axios";
import {
  AddHoldingInput,
  GetStockDataResponse,
  SecurityData,
  SecurityDataProvider,
} from "shared/types/passive-income-types";
import {
  calculateDividendMetrics,
  formatDate,
} from "shared/util/passive-income-utils";

abstract class SecurityDataFetcher {
  abstract fetchSecurityDataAsync(
    input: AddHoldingInput
  ): Promise<SecurityData>;
}

class AlphaVantageSecurityDataFetcher extends SecurityDataFetcher {
  apiKey: string;

  constructor(apiKey: string) {
    super();
    this.apiKey = apiKey;
  }

  async fetchSecurityDataAsync({
    symbol,
  }: AddHoldingInput): Promise<SecurityData> {
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

    const dividendHistory = dividendHistoryData.data?.map((history) => ({
      exDividendDate: history.ex_dividend_date,
      amount: parseFloat(history.amount ?? "0"),
    }));
    const { dividendFrequency, dividendPerShareTTM } = calculateDividendMetrics(
      dividendHistory ?? []
    );

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
  apiKey: string;

  constructor(apiKey: string) {
    super();
    this.apiKey = apiKey;
  }

  async fetchSecurityDataAsync({
    symbol,
  }: AddHoldingInput): Promise<SecurityData> {
    const { data } = await axios.get<GetStockDataResponse>(
      `/api/stocks/${symbol}`,
      {
        params: {
          apiKey: this.apiKey,
        },
      }
    );

    const {
      price,
      profile: { net_expense_ratio },
      dividends,
    } = data;
    const dividendHistory = dividends.map((history) => ({
      exDividendDate: history.ex_dividend_date,
      amount: parseFloat(history.amount),
    }));
    const { dividendFrequency, dividendPerShareTTM } = calculateDividendMetrics(
      dividendHistory ?? []
    );

    return {
      expenseRatio: parseFloat(net_expense_ratio),
      dividendHistory,
      dividendFrequency,
      dividendPerShareTTM,
      price: parseFloat(price),
    };
  }
}

class SelfInputSecurityDataFetcher extends SecurityDataFetcher {
  async fetchSecurityDataAsync({
    shares,
    dividendFrequency,
    dividendYield,
  }: AddHoldingInput): Promise<SecurityData> {
    const price = 1.0;
    const annualDividendYield = dividendYield ?? 0.0000001; // Very small value to avoid divide by zero

    const endDate = new Date();
    endDate.setDate(1);

    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    startDate.setDate(1);

    const dividendHistory: Array<{
      exDividendDate: string;
      amount: number;
    }> = [];
    while (endDate >= startDate) {
      const exDividendDate = formatDate(endDate);
      if (dividendFrequency === "Monthly") {
        dividendHistory.push({
          amount: (price * annualDividendYield) / 12.0,
          exDividendDate,
        });
      } else if (
        dividendFrequency === "Quarterly" &&
        [2, 5, 8, 11].includes(endDate.getMonth())
      ) {
        dividendHistory.push({
          amount: (price * annualDividendYield) / 4.0,
          exDividendDate,
        });
      } else if (
        dividendFrequency === "Semi-Annually" &&
        [5, 11].includes(endDate.getMonth())
      ) {
        dividendHistory.push({
          amount: (price * annualDividendYield) / 2.0,
          exDividendDate,
        });
      } else if (
        dividendFrequency === "Annually" &&
        endDate.getMonth() === 11
      ) {
        dividendHistory.push({
          amount: price * annualDividendYield,
          exDividendDate,
        });
      }
      endDate.setMonth(endDate.getMonth() - 1);
    }
    const { dividendPerShareTTM } = calculateDividendMetrics(dividendHistory);

    return {
      expenseRatio: 0.0,
      dividendHistory,
      dividendFrequency: dividendFrequency ?? "Monthly",
      dividendPerShareTTM,
      price: 1.0,
    };
  }
}

export async function fetchSecurityDataAsync(
  input: AddHoldingInput,
  provider: SecurityDataProvider,
  apiKey: string
) {
  const { isDataFetchingNeeded } = input;

  let dataFetcher: SecurityDataFetcher;
  if (isDataFetchingNeeded && provider === SecurityDataProvider.ALPHA_VANTAGE) {
    dataFetcher = new AlphaVantageSecurityDataFetcher(apiKey);
  } else if (isDataFetchingNeeded) {
    dataFetcher = new YahooFinanceSecurityDataFetcher(apiKey);
  } else {
    dataFetcher = new SelfInputSecurityDataFetcher();
  }
  return await dataFetcher.fetchSecurityDataAsync(input);
}
