import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AddHoldingInput } from "shared/types/passive-income-types";

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
              value={symbol}
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
            <Form.Control
              type="number"
              value={costBasis}
              onChange={(e) => setCostBasis(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {[
                "Bond",
                "CEF",
                "Commodities",
                "Core Growth",
                "Covered Call",
                "Cryptocurrency",
                "Real Estate",
              ].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
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
