import pako from "pako";
import {
  DEFAULT_FILING_STATUS,
  HKD_PER_USD,
  MONTHS_PER_YEAR,
} from "shared/config/passive-income";
import { Holding } from "shared/types/passive-income-types";

// 2025 IRS tax brackets for Single
const TAX_BRACKETS: Array<{ rate: number; cap: number }> = [
  { rate: 0.1, cap: 11600 },
  { rate: 0.12, cap: 47150 },
  { rate: 0.22, cap: 100525 },
  { rate: 0.24, cap: 191950 },
  { rate: 0.32, cap: 243725 },
  { rate: 0.35, cap: 609350 },
  { rate: 0.37, cap: Infinity },
];

const STANDARD_DEDUCTION: Record<string, number> = {
  single: 14600,
  married_joint: 29200,
  married_separate: 14600,
  head: 21900,
};

function calculateFederalTaxOnOrdinaryIncome(
  grossIncome: number,
  filingStatus = DEFAULT_FILING_STATUS
) {
  const taxableIncome = Math.max(
    0,
    grossIncome - (STANDARD_DEDUCTION[filingStatus] || 0)
  );

  let tax = 0;
  let lastCap = 0;

  for (const bracket of TAX_BRACKETS) {
    if (taxableIncome > bracket.cap) {
      tax += (bracket.cap - lastCap) * bracket.rate;
      lastCap = bracket.cap;
    } else {
      tax += (taxableIncome - lastCap) * bracket.rate;
      break;
    }
  }

  return tax;
}

export function calculateDividendMetrics(
  dividendHistory: Array<{ amount: number; exDividendDate: string }>
) {
  const todayDate = new Date();
  const todayOneYearAgo = new Date();
  todayOneYearAgo.setFullYear(todayDate.getFullYear() - 1);

  const filteredDividends = dividendHistory.filter((dividend) => {
    const exDividendDate = new Date(dividend.exDividendDate);
    return exDividendDate >= todayOneYearAgo;
  });

  const dividendPerShareTTM = filteredDividends.reduce(
    (acc, d) => acc + d.amount,
    0
  );
  const dividendPaymentCount = filteredDividends.length;
  let dividendFrequency = "N/A";
  if (dividendPaymentCount >= 12) {
    dividendFrequency = "Monthly";
  } else if (dividendPaymentCount >= 4) {
    dividendFrequency = "Quarterly";
  } else if (dividendPaymentCount >= 2) {
    dividendFrequency = "Semi-Annually";
  }

  return {
    dividendFrequency,
    dividendPerShareTTM,
  };
}

export function calculatePortfolioMetrics(holdings: Array<Holding>) {
  const totalCostBasis = holdings.reduce((acc, h) => acc + h.costBasis, 0);
  const totalDividendIncome = holdings.reduce(
    (acc, h) => acc + h.shares * h.dividendPerShareTTM,
    0
  );

  return { totalCostBasis, totalDividendIncome };
}

export function calculateGainLoss(holding: Holding) {
  const currentValue = holding.price * holding.shares;
  const gainLoss = currentValue - holding.costBasis;
  const pctGainLoss =
    holding.costBasis > 0 ? (gainLoss / holding.costBasis) * 100 : 0;
  return { currentValue, gainLoss, pctGainLoss };
}

export function calculatePortfolioSummary(holdings: Array<Holding>) {
  const totalCostBasis = holdings.reduce((sum, h) => sum + h.costBasis, 0);
  const totalDividendIncome = holdings.reduce(
    (sum, h) => sum + h.shares * h.dividendPerShareTTM,
    0
  );
  // Gains
  const totalCurrentValue = holdings.reduce(
    (sum, h) => sum + h.price * h.shares,
    0
  );
  const totalGainLoss = totalCurrentValue - totalCostBasis;
  const totalPctGainLoss =
    totalCostBasis > 0 ? (totalGainLoss / totalCostBasis) * 100 : 0;

  const overallYield =
    totalCostBasis > 0 ? (totalDividendIncome / totalCostBasis) * 100 : 0;

  const estimatedTax = calculateFederalTaxOnOrdinaryIncome(totalDividendIncome);
  const afterTaxIncome = totalDividendIncome - estimatedTax;
  const afterTaxMonthly = afterTaxIncome / MONTHS_PER_YEAR;
  const afterTaxMonthlyHKD = afterTaxMonthly * HKD_PER_USD;

  return {
    totalCostBasis,
    totalDividendIncome,
    totalCurrentValue,
    totalGainLoss,
    totalPctGainLoss,
    afterTaxIncome,
    afterTaxMonthly,
    afterTaxMonthlyHKD,
    overallYield,
    estimatedTax,
  };
}

export function compressHoldings(holdings: Array<Holding>) {
  const dataStr = JSON.stringify(holdings);
  const compressed = pako.deflate(dataStr);
  return Buffer.from(compressed).toString("base64");
}

export function decompressHoldings(
  encoded: string | null
): Array<Holding> | null {
  if (encoded == null) {
    return null;
  }

  try {
    const decoded = Buffer.from(encoded, "base64");
    const binaryData = new Uint8Array(decoded);
    const decompressed = pako.inflate(binaryData, { to: "string" });
    return JSON.parse(decompressed);
  } catch {
    return null;
  }
}
