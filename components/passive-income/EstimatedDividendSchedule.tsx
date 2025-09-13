import PortfolioSpinner from "components/passive-income/PortfolioSpinner";
import { useMemo, useState } from "react";
import { Accordion, Button, Card, ListGroup, Table } from "react-bootstrap";
import type { AccordionEventKey } from "react-bootstrap/AccordionContext";
import { HKD_PER_USD } from "shared/config/passive-income";
import { Holding } from "shared/types/passive-income-types";
import {
  addMonthsToDate,
  formatDate,
  formatDollarAmount,
  formatMonthYear,
  parseDate,
} from "shared/util/passive-income-utils";

type PropType = {
  holdings: Array<Holding>;
  loading: boolean;
};

export default function EstimatedDividendSchedule({
  holdings,
  loading,
}: PropType) {
  // Group dividends by last year's month (YYYY-MM)
  const monthlyData = useMemo(() => {
    const grouped: Record<
      string,
      { symbol: string; amount: number; exDividendDate: string }[]
    > = {};

    holdings.forEach((stock) => {
      stock.dividendHistory.forEach((div) => {
        const d = parseDate(div.exDividendDate);
        const key = formatKey(d); // e.g. 2025-05
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push({
          symbol: stock.symbol,
          amount: div.amount * stock.shares,
          exDividendDate: div.exDividendDate,
        });
      });
    });

    return grouped;
  }, [holdings]);
  const [activeKey, setActiveKey] = useState<AccordionEventKey>(null);

  // Build projection for next 12 months
  const now = new Date();
  const next12Months = Array.from({ length: 12 }).map((_, idx) => {
    const future = addMonthsToDate(now, idx);
    const keyLastYear = formatKey(addMonthsToDate(future, -12));
    const entries = (monthlyData[keyLastYear] || []).map((e) => {
      const exDividendDatePlusOneYear = formatDate(
        addMonthsToDate(new Date(e.exDividendDate), 12)
      );
      return {
        ...e,
        exDividendDate: exDividendDatePlusOneYear,
      };
    });
    const total = entries.reduce((sum, e) => sum + e.amount, 0);

    return {
      label: formatMonthYear(future), // e.g. September 2026
      key: formatKey(future),
      entries,
      total,
    };
  });

  return (
    <div className="mt-3">
      <h4>Estimated Monthly Payment Schedule</h4>
      {(() => {
        if (loading) {
          return <PortfolioSpinner />;
        }
        if (holdings.length === 0) {
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
          <EstimatedDividendAccordion
            activeKey={activeKey}
            setActiveKey={setActiveKey}
            next12Months={next12Months}
          />
        );
      })()}
    </div>
  );
}

function EstimatedDividendAccordion({
  activeKey,
  setActiveKey,
  next12Months,
}: {
  activeKey: AccordionEventKey;
  setActiveKey: (selectedKey: AccordionEventKey) => void;
  next12Months: {
    label: string;
    key: string;
    entries: {
      symbol: string;
      amount: number;
      exDividendDate: string;
    }[];
    total: number;
  }[];
}) {
  return (
    <ListGroup>
      <ListGroup.Item
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          justifyContent: "end",
        }}
      >
        <Button onClick={() => setActiveKey(null)} variant="outline-dark">
          Collapse All
        </Button>
        <Button
          onClick={() => setActiveKey(next12Months.map((m) => m.key))}
          variant="outline-dark"
        >
          Expand All
        </Button>
      </ListGroup.Item>
      <ListGroup.Item>
        <Card
          bg="light"
          style={{
            padding: "8px",
          }}
        >
          <Accordion alwaysOpen activeKey={activeKey} onSelect={setActiveKey}>
            {next12Months.map((month) => (
              <Card key={month.key} className="mb-2">
                <Accordion.Item eventKey={month.key}>
                  <Accordion.Header>
                    <div className="d-flex flex-column">
                      <span>{month.label}</span>
                      <strong>{formatDollarAmount(month.total)}</strong>
                      <strong>
                        HK{formatDollarAmount(month.total * HKD_PER_USD)}
                      </strong>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    {month.entries.length === 0 ? (
                      <p>No dividends projected</p>
                    ) : (
                      <Table striped bordered hover size="sm">
                        <thead>
                          <tr>
                            <th>Ex-Dividend Date</th>
                            <th>Symbol</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {month.entries
                            .sort((e1, e2) =>
                              e1.exDividendDate.localeCompare(e2.exDividendDate)
                            )
                            .map((e, i) => (
                              <tr key={i}>
                                <td>
                                  {formatDate(parseDate(e.exDividendDate))}
                                </td>
                                <td>{e.symbol}</td>
                                <td>{formatDollarAmount(e.amount)}</td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Card>
            ))}
          </Accordion>
        </Card>
      </ListGroup.Item>
    </ListGroup>
  );
}

function formatKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}`;
}
