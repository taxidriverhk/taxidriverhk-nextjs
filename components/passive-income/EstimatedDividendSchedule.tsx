import { useMemo, useState } from "react";
import { Accordion, Button, Card, ListGroup, Table } from "react-bootstrap";
import type { AccordionEventKey } from "react-bootstrap/AccordionContext";
import { HKD_PER_USD } from "shared/config/passive-income";
import { Holding } from "shared/types/passive-income-types";

type PropType = {
  holdings: Array<Holding>;
};

export default function EstimatedDividendSchedule({ holdings }: PropType) {
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
    const future = addMonths(now, idx);
    const keyLastYear = formatKey(addMonths(future, -12));
    const entries = monthlyData[keyLastYear] || [];
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
      {holdings.length > 0 ? (
        <EstimatedDividendAccordion
          activeKey={activeKey}
          setActiveKey={setActiveKey}
          next12Months={next12Months}
        />
      ) : (
        <Card>
          <Card.Body>
            No data to be shown, please add at least one holding to start seeing
            the breakdown
          </Card.Body>
        </Card>
      )}
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
                      <strong>${month.total.toFixed(2)}</strong>
                      <strong>
                        HK$ {(month.total * HKD_PER_USD).toFixed(2)}
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
                                  {formatISO(parseDate(e.exDividendDate))}
                                </td>
                                <td>{e.symbol}</td>
                                <td>${e.amount.toFixed(2)}</td>
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

// --- Date utilities using native JS ---
function parseDate(dateStr: string): Date {
  // Format: "YYYY-MM-dd"
  const [year, month, day] = dateStr.split("-").map((x) => parseInt(x, 10));
  return new Date(year, month - 1, day);
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function formatMonthYear(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function formatKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}`;
}

function formatISO(date: Date): string {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}
