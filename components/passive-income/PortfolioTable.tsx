import { Button, Table } from "react-bootstrap";
import { DatatableWrapper, TableBody, TableHeader } from "react-bs-datatable";

import type { Holding } from "shared/types/passive-income-types";
import {
  calculateGainLoss,
  calculatePortfolioMetrics,
  deformatNumber,
  formatDollarAmount,
  formatPercentage,
} from "shared/util/passive-income-utils";
import PortfolioGainOrLossCell from "./PortfolioGainOrLossCell";
import PortfolioSpinner from "./PortfolioSpinner";

type PropTypes = {
  holdings: Array<Holding>;
  loading: boolean;
  onRemove: (symbol: string) => void;
};

type HoldingRow = {
  symbol: string;
  category: string;
  shares: number;
  costBasis: string;
  expenseRatio: string;
  portfolioPct: string;
  price: string;
  dividendFrequency: string;
  dividendIncome: string;
  dividendYield: string;
  dividendIncomePct: string;
  gainLoss: JSX.Element;
  pctGainLoss: JSX.Element;
  actions: JSX.Element;
};

const HEADERS: Array<{
  prop: keyof HoldingRow;
  title: string;
  isSortable?: boolean;
}> = [
  { prop: "symbol", title: "Symbol", isSortable: true },
  { prop: "category", title: "Category", isSortable: true },
  {
    prop: "expenseRatio",
    title: "Expense Ratio",
    isSortable: true,
  },
  { prop: "shares", title: "Shares", isSortable: true },
  { prop: "costBasis", title: "Cost Basis", isSortable: true },
  {
    prop: "portfolioPct",
    title: "% of Portfolio",
    isSortable: true,
  },
  {
    prop: "dividendFrequency",
    title: "Dividend Frequency",
    isSortable: true,
  },
  {
    prop: "dividendIncome",
    title: "Est. Annual Income",
    isSortable: true,
  },
  {
    prop: "dividendYield",
    title: "% Yield",
    isSortable: true,
  },
  { prop: "price", title: "Price", isSortable: true },
  { prop: "gainLoss", title: "Unrealized Capital Gain/Loss", isSortable: true },
  {
    prop: "pctGainLoss",
    title: "Unrealized % Capital Gain/Loss",
    isSortable: true,
  },
  {
    prop: "dividendIncomePct",
    title: "% of Income",
    isSortable: true,
  },
  { prop: "actions", title: "Actions" },
];

export default function PortfolioTable({
  holdings,
  loading,
  onRemove,
}: PropTypes) {
  const { totalCostBasis, totalDividendIncome } =
    calculatePortfolioMetrics(holdings);

  const rows: Array<HoldingRow> = holdings.map((h) => {
    const dividendIncome = h.shares * h.dividendPerShareTTM;
    const dividendYield =
      ((h.dividendPerShareTTM * h.shares) / h.costBasis) * 100;
    const portfolioPct = totalCostBasis
      ? (h.costBasis / totalCostBasis) * 100
      : 0;
    const dividendIncomePct = totalDividendIncome
      ? (dividendIncome / totalDividendIncome) * 100
      : 0;
    const { gainLoss, pctGainLoss } = calculateGainLoss(h);

    return {
      symbol: h.symbol,
      category: h.category || "-",
      shares: h.shares,
      costBasis: formatDollarAmount(h.costBasis),
      expenseRatio: formatPercentage(h.expenseRatio * 100),
      portfolioPct: formatPercentage(portfolioPct),
      dividendFrequency: h.dividendFrequency,
      dividendIncome: formatDollarAmount(dividendIncome),
      dividendYield: formatPercentage(dividendYield),
      dividendIncomePct: formatPercentage(dividendIncomePct),
      price: formatDollarAmount(h.price),
      gainLoss: <PortfolioGainOrLossCell gainOrLoss={gainLoss} prefix="$" />,
      pctGainLoss: (
        <PortfolioGainOrLossCell gainOrLoss={pctGainLoss} suffix="%" />
      ),
      actions: (
        <Button size="sm" variant="danger" onClick={() => onRemove(h.symbol)}>
          Remove
        </Button>
      ),
    };
  });

  const formattedNumberComparator = (value: string) => deformatNumber(value);
  const gainOrLossComparator = (elem: JSX.Element) => elem.props.gainOrLoss;
  return (
    <>
      <h4>Portfolio</h4>
      {loading ? (
        <PortfolioSpinner />
      ) : (
        <DatatableWrapper
          body={rows}
          headers={HEADERS}
          sortProps={{
            sortValueObj: {
              //@ts-ignore the param is already destructured from the row object
              costBasis: formattedNumberComparator,
              //@ts-ignore
              dividendIncome: formattedNumberComparator,
              //@ts-ignore
              expenseRatio: formattedNumberComparator,
              //@ts-ignore
              portfolioPct: formattedNumberComparator,
              //@ts-ignore
              dividendYield: formattedNumberComparator,
              //@ts-ignore
              dividendIncomePct: formattedNumberComparator,
              //@ts-ignore
              price: formattedNumberComparator,
              //@ts-ignore
              gainLoss: gainOrLossComparator,
              //@ts-ignore
              pctGainLoss: gainOrLossComparator,
            },
          }}
        >
          <Table striped bordered hover responsive>
            <TableHeader />
            <TableBody />
          </Table>
        </DatatableWrapper>
      )}
    </>
  );
}
