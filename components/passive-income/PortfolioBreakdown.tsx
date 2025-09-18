import PortfolioSpinner from "components/passive-income/PortfolioSpinner";
import { Card, Table } from "react-bootstrap";
import { DatatableWrapper, TableBody, TableHeader } from "react-bs-datatable";
import { Holding } from "shared/types/passive-income-types";
import {
  calculatePortfolioMetrics,
  deformatNumber,
  formatDollarAmount,
  formatPercentage,
} from "shared/util/passive-income-utils";

type PropTypes = {
  holdings: Array<Holding>;
  loading: boolean;
};

type CategoryIncome = Record<
  string,
  {
    principal: number;
    principalPct: number;
    income: number;
    incomePct: number;
  }
>;

type CategoryRow = {
  category: string;
  principal: string;
  principalPct: string;
  income: string;
  incomePct: string;
};

const HEADERS: Array<{
  prop: keyof CategoryRow;
  title: string;
  isSortable?: boolean;
}> = [
  { prop: "category", title: "Category", isSortable: true },
  { prop: "principal", title: "Principal", isSortable: true },
  { prop: "principalPct", title: "% of Principal", isSortable: true },
  { prop: "income", title: "Income", isSortable: true },
  { prop: "incomePct", title: "% of Income", isSortable: true },
];

export default function PortfolioBreakdown({ holdings, loading }: PropTypes) {
  const { totalCostBasis, totalDividendIncome } =
    calculatePortfolioMetrics(holdings);
  const holdingsByCategory: CategoryIncome = holdings.reduce(
    (result, { category, costBasis, dividendPerShareTTM, shares }) => {
      const currentIncome = result[category]?.income ?? 0;
      const updatedIncome = currentIncome + shares * dividendPerShareTTM;
      const updatedIncomePct = (updatedIncome / totalDividendIncome) * 100;

      const currentPrincipal = result[category]?.principal ?? 0;
      const updatedPrincipal = currentPrincipal + costBasis;
      const updatedPrincipalPct = (updatedPrincipal / totalCostBasis) * 100;

      return {
        ...result,
        [category]: {
          principal: updatedPrincipal,
          principalPct: updatedPrincipalPct,
          income: updatedIncome,
          incomePct: updatedIncomePct,
        },
      };
    },
    {} as CategoryIncome
  );
  const rows: Array<CategoryRow> = Object.entries(holdingsByCategory).map(
    ([category, { principal, principalPct, income, incomePct }]) => ({
      category,
      principal: formatDollarAmount(principal),
      principalPct: formatPercentage(principalPct),
      income: formatDollarAmount(income),
      incomePct: formatPercentage(incomePct),
    })
  );

  const formattedNumberComparator = (value: string) => deformatNumber(value);
  return (
    <div className="mt=3">
      <h4>Income Breakdown</h4>
      {(() => {
        if (loading) {
          return <PortfolioSpinner />;
        }
        if (rows.length === 0) {
          return (
            <Card>
              <Card.Body>
                No data to be shown, please add at least one holding to start
                seeing the breakdown
              </Card.Body>
            </Card>
          );
        }
        return (
          <DatatableWrapper
            body={rows}
            headers={HEADERS}
            sortProps={{
              sortValueObj: {
                //@ts-ignore the param is already destructured from the row object
                principal: formattedNumberComparator,
                //@ts-ignore
                principalPct: formattedNumberComparator,
                //@ts-ignore
                income: formattedNumberComparator,
                //@ts-ignore
                incomePct: formattedNumberComparator,
              },
            }}
          >
            <Table striped bordered hover responsive>
              <TableHeader />
              <TableBody />
            </Table>
          </DatatableWrapper>
        );
      })()}
    </div>
  );
}
