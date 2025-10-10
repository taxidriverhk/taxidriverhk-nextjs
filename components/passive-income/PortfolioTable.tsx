import { Button, Form, InputGroup, Table } from "react-bootstrap";
import { DatatableWrapper, TableBody, TableHeader } from "react-bs-datatable";

import { useState } from "react";
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
  onHoldingEdit: (symbol: string, shares: number, costBasis: number) => void;
  onRemove: (symbol: string) => void;
};

type HoldingRow = {
  symbol: string;
  category: string;
  shares: number | JSX.Element;
  costBasis: string | JSX.Element;
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
  onHoldingEdit,
  onRemove,
}: PropTypes) {
  const [editingSymbol, setEditingSymbol] = useState<string | null>(null);
  const [editingShares, setEditingShares] = useState<number>(0);
  const [editingCostBasis, setEditingCostBasis] = useState<number>(0);

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

    const isEditing = editingSymbol === h.symbol;
    const isOtherEditingInProgress = editingSymbol !== null && !isEditing;

    return {
      symbol: h.symbol,
      category: h.category || "-",
      shares: isEditing ? (
        <Form.Control
          size="sm"
          type="number"
          value={editingShares}
          onChange={(e) => setEditingShares(Number(e.target.value))}
        />
      ) : (
        h.shares
      ),
      costBasis: isEditing ? (
        <InputGroup size="sm">
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control
            type="number"
            value={editingCostBasis}
            onChange={(e) => setEditingCostBasis(Number(e.target.value))}
          />
        </InputGroup>
      ) : (
        formatDollarAmount(h.costBasis)
      ),
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
      actions: isEditing ? (
        <>
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => setEditingSymbol(null)}
          >
            Discard
          </Button>
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => {
              onHoldingEdit(h.symbol, editingShares, editingCostBasis);
              setEditingCostBasis(0);
              setEditingShares(0);
              setEditingSymbol(null);
            }}
          >
            Finish
          </Button>
        </>
      ) : (
        <>
          <Button
            disabled={isOtherEditingInProgress}
            size="sm"
            variant="primary"
            onClick={() => {
              setEditingShares(h.shares);
              setEditingCostBasis(h.costBasis);
              setEditingSymbol(h.symbol);
            }}
          >
            Edit
          </Button>
          <Button
            disabled={isOtherEditingInProgress}
            size="sm"
            variant="danger"
            onClick={() => onRemove(h.symbol)}
          >
            Remove
          </Button>
        </>
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
          <Table striped bordered hover responsive size="sm">
            <TableHeader />
            <TableBody />
          </Table>
        </DatatableWrapper>
      )}
    </>
  );
}
