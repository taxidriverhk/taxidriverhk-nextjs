import { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import {
  AddHoldingInput,
  DividendFrequency,
} from "shared/types/passive-income-types";

type PropTypes = {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: AddHoldingInput) => void;
};

export default function AddHoldingModal({ show, onHide, onSubmit }: PropTypes) {
  const [symbol, setSymbol] = useState("");
  const [shares, setShares] = useState("");
  const [costBasis, setCostBasis] = useState("");
  const [category, setCategory] = useState("");

  const [isDataFetchingNeeded, setIsDataFetchingNeeded] = useState(true);
  const [dividendYield, setDividendYield] = useState(0.0);
  const [dividendFrequency, setDividendFrequency] =
    useState<DividendFrequency>("");

  const resetInputs = () => {
    setSymbol("");
    setShares("");
    setCostBasis("");
    setCategory("");
  };
  const handleSubmit = () => {
    onSubmit({
      symbol,
      shares: parseFloat(shares),
      costBasis: parseFloat(costBasis),
      category,
      isDataFetchingNeeded,
      dividendYield,
      dividendFrequency,
    });
    onHide();
    resetInputs();
  };

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Holding</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Stock Symbol</Form.Label>
            <Form.Control
              type="text"
              value={symbol.toUpperCase()}
              onChange={(e) => setSymbol(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Number of Shares</Form.Label>
            <Form.Control
              type="number"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cost Basis</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="number"
                value={costBasis}
                onChange={(e) => setCostBasis(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {[
                "Bond",
                "CD",
                "CEF",
                "Commodities",
                "Core Growth",
                "Covered Call",
                "Cryptocurrency",
                "Real Estate",
                "Treasury/Agency",
              ].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
        <Form>
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              label="Provide your own fund data (e.g. CD, Treasury, etc.)?"
              checked={!isDataFetchingNeeded}
              onChange={() => setIsDataFetchingNeeded(!isDataFetchingNeeded)}
            />
          </Form.Group>
          {!isDataFetchingNeeded && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Dividend Yield</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="number"
                    value={dividendYield * 100.0}
                    onChange={(e) =>
                      setDividendYield(parseFloat(e.target.value) / 100.0)
                    }
                  />
                  <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Payment Frequency</Form.Label>
                <Form.Select
                  value={dividendFrequency}
                  onChange={(e) =>
                    setDividendFrequency(e.target.value as DividendFrequency)
                  }
                >
                  {["Monthly", "Quarterly", "Semi-Annually", "Annually"].map(
                    (freq) => (
                      <option key={freq} value={freq}>
                        {freq}
                      </option>
                    )
                  )}
                </Form.Select>
              </Form.Group>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
