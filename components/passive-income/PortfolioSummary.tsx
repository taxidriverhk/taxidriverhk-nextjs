import { Table } from "react-bootstrap";

import { Holding } from "shared/types/passive-income-types";
import {
  calculatePortfolioSummary,
  formatDollarAmount,
  formatPercentage,
} from "shared/util/passive-income-utils";
import PortfolioGainOrLossCell from "./PortfolioGainOrLossCell";
import PortfolioSpinner from "./PortfolioSpinner";

type PropType = {
  holdings: Array<Holding>;
  loading: boolean;
};

export default function PortfolioSummary({ holdings, loading }: PropType) {
  const {
    totalDividendIncome,
    overallYield,
    estimatedTax,
    afterTaxIncome,
    afterTaxMonthly,
    afterTaxMonthlyHKD,
    totalGainLoss,
    totalPctGainLoss,
  } = calculatePortfolioSummary(holdings);

  return (
    <div className="mt-3">
      <h4>Summary</h4>
      {loading ? (
        <PortfolioSpinner />
      ) : (
        <Table bordered striped>
          <tbody>
            <tr>
              <td>Estimated Annual Dividend Income</td>
              <td>{formatDollarAmount(totalDividendIncome)}</td>
            </tr>
            <tr>
              <td>Overall Dividend Yield</td>
              <td>{formatPercentage(overallYield)}</td>
            </tr>
            <tr>
              <td>Estimated Federal Tax</td>
              <td>{formatDollarAmount(estimatedTax)}</td>
            </tr>
            <tr>
              <td>After-Tax Annual Dividend Income</td>
              <td>{formatDollarAmount(afterTaxIncome)}</td>
            </tr>
            <tr>
              <td>After-Tax Monthly Dividend Income</td>
              <td>{formatDollarAmount(afterTaxMonthly)}</td>
            </tr>
            <tr>
              <td>After-Tax Monthly Dividend Income (HKD)</td>
              <td>HK{formatDollarAmount(afterTaxMonthlyHKD)}</td>
            </tr>
            <tr>
              <td>Unrealized Capital Gain/Loss</td>
              <td>
                <PortfolioGainOrLossCell
                  gainOrLoss={totalGainLoss}
                  prefix="$"
                />
              </td>
            </tr>
            <tr>
              <td>Unrealized % Capital Gain/Loss</td>
              <td>
                <PortfolioGainOrLossCell
                  gainOrLoss={totalPctGainLoss}
                  suffix="%"
                />
              </td>
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  );
}
