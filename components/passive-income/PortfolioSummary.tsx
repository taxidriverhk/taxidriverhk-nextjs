import { ListGroup, Table } from "react-bootstrap";

import PortfolioGainOrLossCell from "components/passive-income/PortfolioGainOrLossCell";
import PortfolioSpinner from "components/passive-income/PortfolioSpinner";
import { Holding } from "shared/types/passive-income-types";
import {
  calculatePortfolioSummary,
  formatDollarAmount,
  formatPercentage,
} from "shared/util/passive-income-utils";

type PropType = {
  holdings: Array<Holding>;
  loading: boolean;
};

export default function PortfolioSummary({ holdings, loading }: PropType) {
  const {
    totalCostBasis,
    totalCostBasisHKD,
    totalDividendIncome,
    totalDividendIncomeHKD,
    overallYield,
    estimatedTax,
    marginalTaxRate,
    beforeTaxMonthly,
    beforeTaxMonthlyHKD,
    afterTaxIncome,
    afterTaxIncomeHKD,
    afterTaxMonthly,
    afterTaxMonthlyHKD,
    totalGainLoss,
    totalPctGainLoss,
  } = calculatePortfolioSummary(holdings);

  return (
    <div className="mt-3">
      <style>{`
        .summary-list tbody > tr > td:first-child {
          width: 70%;
        }

        .summary-list tbody > tr > td:nth-child(2) {
          font-weight: bold;
        }
      `}</style>
      <h4>Summary</h4>
      {loading ? (
        <PortfolioSpinner />
      ) : (
        <ListGroup className="summary-list">
          <ListGroup.Item>
            <div className="fw-bold">Principal</div>
            <Table bordered hover striped>
              <tbody>
                <tr>
                  <td>Total Principal (USD)</td>
                  <td>{formatDollarAmount(totalCostBasis)}</td>
                </tr>
                <tr>
                  <td>Total Principal (HKD)</td>
                  <td>{formatDollarAmount(totalCostBasisHKD)}</td>
                </tr>
              </tbody>
            </Table>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="fw-bold">Dividend (Before Tax)</div>
            <Table bordered hover striped>
              <tbody>
                <tr>
                  <td>Estimated Annual Dividend Income (USD)</td>
                  <td>{formatDollarAmount(totalDividendIncome)}</td>
                </tr>
                <tr>
                  <td>Estimated Annual Dividend Income (HKD)</td>
                  <td>{formatDollarAmount(totalDividendIncomeHKD)}</td>
                </tr>
                <tr>
                  <td>Estimated Monthly Dividend Income (USD)</td>
                  <td>{formatDollarAmount(beforeTaxMonthly)}</td>
                </tr>
                <tr>
                  <td>Estimated Monthly Dividend Income (HKD)</td>
                  <td>{formatDollarAmount(beforeTaxMonthlyHKD)}</td>
                </tr>
                <tr>
                  <td>Overall Dividend Yield</td>
                  <td>{formatPercentage(overallYield)}</td>
                </tr>
              </tbody>
            </Table>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="fw-bold">Taxes</div>
            <Table bordered hover striped>
              <tbody>
                <tr>
                  <td>Estimated Federal Tax</td>
                  <td>{formatDollarAmount(estimatedTax)}</td>
                </tr>
                <tr>
                  <td>Marginal Tax Rate</td>
                  <td>{formatPercentage(marginalTaxRate)}</td>
                </tr>
              </tbody>
            </Table>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="fw-bold">Dividend (After Tax)</div>
            <Table bordered hover striped>
              <tbody>
                <tr>
                  <td>After-Tax Annual Dividend Income (USD)</td>
                  <td>{formatDollarAmount(afterTaxIncome)}</td>
                </tr>
                <tr>
                  <td>After-Tax Annual Dividend Income (HKD)</td>
                  <td>{formatDollarAmount(afterTaxIncomeHKD)}</td>
                </tr>
                <tr>
                  <td>After-Tax Monthly Dividend Income (USD)</td>
                  <td>{formatDollarAmount(afterTaxMonthly)}</td>
                </tr>
                <tr>
                  <td>After-Tax Monthly Dividend Income (HKD)</td>
                  <td>HK{formatDollarAmount(afterTaxMonthlyHKD)}</td>
                </tr>
              </tbody>
            </Table>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="fw-bold">Unrealized Capital Gain/Loss</div>
            <Table bordered hover striped>
              <tbody>
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
          </ListGroup.Item>
        </ListGroup>
      )}
    </div>
  );
}
