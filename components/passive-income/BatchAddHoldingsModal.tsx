import { Button, Modal, Table } from "react-bootstrap";
import { AddHoldingInput } from "shared/types/passive-income-types";

type PropType = {
  holdings: Array<AddHoldingInput>;
  show: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export default function BatchAddHoldingsModal({
  holdings,
  show,
  onConfirm,
  onClose,
}: PropType) {
  return (
    <Modal centered show={show} onHide={onClose} size="lg">
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
              {holdings.find((h) => !h.isDataFetchingNeeded) != null && (
                <>
                  <th>Is Data Fetching Needed</th>
                  <th>Dividend Yield</th>
                  <th>Dividend Frequency</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {holdings.map(
              ({
                symbol,
                category,
                shares,
                costBasis,
                isDataFetchingNeeded,
                dividendFrequency,
                dividendYield,
              }) => (
                <tr key={symbol}>
                  <td>{symbol}</td>
                  <td>{category}</td>
                  <td>{shares}</td>
                  <td>${costBasis.toFixed(2)}</td>
                  {holdings.find((h) => !h.isDataFetchingNeeded) != null && (
                    <>
                      <td>{isDataFetchingNeeded ? "Yes" : "No"}</td>
                      <td>
                        {!isDataFetchingNeeded
                          ? `${(dividendYield * 100).toFixed(2)}%`
                          : ""}
                      </td>
                      <td>{!isDataFetchingNeeded ? dividendFrequency : ""}</td>
                    </>
                  )}
                </tr>
              )
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
