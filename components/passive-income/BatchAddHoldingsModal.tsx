import { Button, Modal, Table } from "react-bootstrap";
import { AddHoldingInput } from "shared/types/passive-income-types";
import {
  formatDollarAmount,
  formatPercentage,
} from "shared/util/passive-income-utils";

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
                  <th>Next Coupon Date</th>
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
                nextCouponDate,
              }) => (
                <tr key={symbol}>
                  <td>{symbol}</td>
                  <td>{category}</td>
                  <td>{shares}</td>
                  <td>{formatDollarAmount(costBasis)}</td>
                  {holdings.find((h) => !h.isDataFetchingNeeded) != null && (
                    <>
                      <td>{isDataFetchingNeeded ? "Yes" : "No"}</td>
                      <td>
                        {!isDataFetchingNeeded
                          ? formatPercentage(dividendYield * 100)
                          : ""}
                      </td>
                      <td>{!isDataFetchingNeeded ? dividendFrequency : ""}</td>
                      <td>
                        {(() => {
                          if (!isDataFetchingNeeded) {
                            return (
                              nextCouponDate ??
                              new Date().toISOString().split("T")[0]
                            );
                          }
                          return "";
                        })()}
                      </td>
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
