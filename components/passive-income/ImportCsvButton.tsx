import Papa from "papaparse";
import React, { useRef, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { AddHoldingInput } from "shared/types/passive-income-types";

type PropType = {
  isDisabled: boolean;
  onConfirm: (holdings: Array<AddHoldingInput>) => void;
  onError: (error: string) => void;
};

type ImportRow = {
  Symbol: string;
  "Number of Shares": string;
  "Cost Basis": string;
  Category: string;
};

export default function ImportCSVButton({
  isDisabled,
  onConfirm,
  onError,
}: PropType) {
  const [previewHoldings, setPreviewHoldings] = useState<
    Array<AddHoldingInput>
  >([]);
  const [showModal, setShowModal] = useState(false);
  const [fileInputName, setFileInputName] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = e.target.files?.[0];
    if (!inputFile) {
      return;
    }

    setFileInputName(inputFile.name);
    Papa.parse(inputFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        if (results.errors.length > 0) {
          onError(results.errors[0].message);
          setFileInputName("");
          return;
        }

        const rows = results.data as Array<ImportRow>;
        const tempHoldings: Array<AddHoldingInput> = rows
          .map((row) => {
            const {
              Symbol: symbol,
              "Number of Shares": sharesStr,
              "Cost Basis": costBasisStr,
              Category: category,
            } = row;

            const shares = parseFloat(sharesStr);
            const costBasis = parseFloat(costBasisStr);

            if (!Symbol || isNaN(shares) || isNaN(costBasis)) {
              return null;
            }

            return {
              symbol,
              shares,
              costBasis,
              category,
            };
          })
          .filter((holding): holding is AddHoldingInput => holding !== null);

        if (tempHoldings.length > 0) {
          setPreviewHoldings(tempHoldings);
          setFileInputName("");
          setShowModal(true);
        }
      },
    });
  };

  const handleConfirmImport = () => {
    setShowModal(false);
    setPreviewHoldings([]);
    onConfirm(previewHoldings);
  };

  return (
    <>
      <Button
        disabled={isDisabled}
        onClick={() => fileInputRef.current?.click()}
        variant="outline-primary"
        className="mb-3"
      >
        Import CSV
      </Button>
      <input
        ref={fileInputRef}
        key={fileInputName}
        type="file"
        accept=".csv"
        hidden
        onChange={handleFileUpload}
      />

      <Modal
        centered
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Preview Imported Holdings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Category</th>
                <th>Shares</th>
                <th>Cost Basis</th>
              </tr>
            </thead>
            <tbody>
              {previewHoldings.map(
                ({ symbol, category, shares, costBasis }) => (
                  <tr key={symbol}>
                    <td>{symbol}</td>
                    <td>{category}</td>
                    <td>{shares}</td>
                    <td>${costBasis.toFixed(2)}</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmImport}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
