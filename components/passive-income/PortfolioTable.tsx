import { Button, Table } from "react-bootstrap";
import { DatatableWrapper, TableBody, TableHeader } from "react-bs-datatable";

import type { Holding } from "shared/types/passive-income-types";
import {
  calculateGainLoss,
  calculatePortfolioMetrics,
} from "shared/util/passive-income-utils";
import PortfolioGainOrLossCell from "./PortfolioGainOrLossCell";

type PropTypes = {
  holdings: Array<Holding>;
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

export default function PortfolioTable({ holdings, onRemove }: PropTypes) {
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
      costBasis: `$${h.costBasis.toFixed(2)}`,
      expenseRatio: (h.expenseRatio * 100).toFixed(2) + "%",
      portfolioPct: portfolioPct.toFixed(2) + "%",
      dividendFrequency: h.dividendFrequency,
      dividendIncome: `$${dividendIncome.toFixed(2)}`,
      dividendYield: dividendYield.toFixed(2) + "%",
      dividendIncomePct: dividendIncomePct.toFixed(2) + "%",
      price: `$${h.price.toFixed(2)}`,
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

  return (
    <>
      <h4>Portfolio</h4>
      <DatatableWrapper
        body={rows}
        headers={HEADERS}
        sortProps={{
          sortValueObj: {
            //@ts-ignore
            gainLoss: (elem: JSX.Element) => elem.props.gainOrLoss,
            //@ts-ignore
            pctGainLoss: (elem: JSX.Element) => elem.props.pctGainLoss,
          },
        }}
      >
        <Table striped bordered hover responsive>
          <TableHeader />
          <TableBody />
        </Table>
      </DatatableWrapper>
    </>
  );
}
