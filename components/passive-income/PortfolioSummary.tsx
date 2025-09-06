import { Table } from "react-bootstrap";

import { Holding } from "shared/types/passive-income-types";
import { calculatePortfolioSummary } from "shared/util/passive-income-utils";
import PortfolioGainOrLossCell from "./PortfolioGainOrLossCell";

type PropType = {
  holdings: Array<Holding>;
};

export default function PortfolioSummary({ holdings }: PropType) {
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
      <Table bordered striped>
        <tbody>
          <tr>
            <td>Estimated Annual Dividend Income</td>
            <td>${totalDividendIncome.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Overall Dividend Yield</td>
            <td>{overallYield.toFixed(2)}%</td>
          </tr>
          <tr>
            <td>Estimated Federal Tax</td>
            <td>${estimatedTax.toFixed(2)}</td>
          </tr>
          <tr>
            <td>After-Tax Annual Dividend Income</td>
            <td>${afterTaxIncome.toFixed(2)}</td>
          </tr>
          <tr>
            <td>After-Tax Monthly Dividend Income</td>
            <td>${afterTaxMonthly.toFixed(2)}</td>
          </tr>
          <tr>
            <td>After-Tax Monthly Dividend Income (HKD)</td>
            <td>HK$ {afterTaxMonthlyHKD.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Unrealized Capital Gain/Loss</td>
            <td>
              <PortfolioGainOrLossCell gainOrLoss={totalGainLoss} prefix="$" />
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
    </div>
  );
}
