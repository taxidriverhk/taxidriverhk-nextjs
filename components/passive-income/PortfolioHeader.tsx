import ImportCSVButton from "components/passive-income/ImportCsvButton";
import { useMemo } from "react";
import { Accordion, Alert, Button, Form, ListGroup } from "react-bootstrap";
import { SecurityDataProvider } from "shared/types/passive-income-types";

type PropType = {
  apiKey: string;
  provider: SecurityDataProvider;
  disabled: boolean;
  onAddHolding: () => void;
  onApiKeyChange: (key: string) => void;
  onImportError: (error: string) => void;
  onImportHoldings: (holdings: Array<any>) => void;
  onProviderChange: (provider: SecurityDataProvider) => void;
};

export default function PortfolioHeader({
  apiKey,
  provider,
  disabled,
  onAddHolding,
  onApiKeyChange,
  onImportError,
  onImportHoldings,
  onProviderChange,
}: PropType) {
  const isAddHoldingButtonDisabled = useMemo(
    () => disabled || !apiKey,
    [apiKey, disabled]
  );

  return (
    <ListGroup>
      <ListGroup.Item>
        <Accordion as={Alert} defaultActiveKey="0" variant="info">
          <Accordion.Item eventKey="0">
            <Accordion.Header>About this tool</Accordion.Header>
            <Accordion.Body>
              <ul>
                <li>
                  Estimates your dividend portfolio&apos;s annual income and
                  yield using data from <code>Alpha Vantage</code> or{" "}
                  <code>Yahoo! Finance</code>.
                </li>
                <li>
                  <strong>Alpha Vantage:</strong> Enter your API key before
                  adding holdings.{" "}
                  <a
                    href="https://www.alphavantage.co/support/#api-key"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get a free key here
                  </a>{" "}
                  (limited to <strong>25 requests/day</strong> on the free
                  tier).
                </li>
                <li>
                  <strong>Yahoo! Finance:</strong> Requires an authorized key
                  — requests are proxied server-side to comply with
                  cross-origin policy.
                </li>
                <li>
                  <strong>CSV import:</strong> Required columns are{" "}
                  <code>Symbol, Number of Shares, Cost Basis, Category</code>.
                  Optional:{" "}
                  <code>
                    Custom Input, Dividend Yield, Dividend Frequency, Next
                    Coupon Date
                  </code>
                  .{" "}
                  <a href="/passive-income/test-import-file.csv">
                    Download sample file.
                  </a>
                </li>
                <li>
                  No data is stored on this server — all computations are
                  client-side. Use the <strong>Share</strong> button at the
                  bottom to save your portfolio as a URL before leaving.
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </ListGroup.Item>
      <ListGroup.Item variant="light">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            gap: "8px",
          }}
        >
          <Form.Group className="mb-3">
            <Form.Select
              value={provider}
              onChange={(e) =>
                onProviderChange(e.target.value as SecurityDataProvider)
              }
              style={{
                width: "200px",
              }}
            >
              {Object.values(SecurityDataProvider).map((label) => (
                <option value={label} key={label}>
                  {label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              style={{ width: "300px" }}
              type="type"
              placeholder="API key"
              value={apiKey}
              onChange={(e) => onApiKeyChange(e.target.value)}
            />
          </Form.Group>
          <Button
            disabled={isAddHoldingButtonDisabled}
            onClick={onAddHolding}
            className="mb-3"
          >
            + Add Holding
          </Button>
          <ImportCSVButton
            isDisabled={isAddHoldingButtonDisabled}
            onConfirm={onImportHoldings}
            onError={onImportError}
          />
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
}
