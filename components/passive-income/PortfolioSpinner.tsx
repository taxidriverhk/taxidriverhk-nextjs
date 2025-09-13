import { Spinner } from "react-bootstrap";

export default function PortfolioSpinner() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Spinner animation="border" />
      In progress, please wait
    </div>
  );
}
