import { Button } from "react-bootstrap";

type PropType = {
  isExportButtonDisabled: boolean;
  onExportPortfolio: () => void;
};

export default function PortfolioFooter({
  isExportButtonDisabled,
  onExportPortfolio,
}: PropType) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "end",
      }}
    >
      <Button
        variant="success"
        className="mb-3 ms-2"
        onClick={onExportPortfolio}
        disabled={isExportButtonDisabled}
      >
        Export to Excel (under development)
      </Button>
    </div>
  );
}
