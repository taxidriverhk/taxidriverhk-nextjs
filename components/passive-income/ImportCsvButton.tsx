import Papa from "papaparse";
import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import {
  AddHoldingInput,
  DividendFrequency,
} from "shared/types/passive-income-types";
import BatchAddHoldingsModal from "./BatchAddHoldingsModal";

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
  "Custom Input"?: string;
  "Dividend Yield"?: string;
  "Dividend Frequency"?: string;
  "Next Coupon Date"?: string;
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
              "Custom Input": customInput,
              "Dividend Yield": dividendYieldStr,
              "Dividend Frequency": dividendFrequencyStr,
              "Next Coupon Date": nextCouponDateStr,
            } = row;

            const shares = parseFloat(sharesStr);
            const costBasis = parseFloat(costBasisStr);

            if (!symbol || isNaN(shares) || isNaN(costBasis)) {
              return null;
            }

            const nextCouponDate =
              nextCouponDateStr != null && nextCouponDateStr.trim() !== ""
                ? new Date(nextCouponDateStr).toISOString().split("T")[0]
                : null;

            const isCustomInputProvided = customInput?.toLowerCase() === "yes";
            const dividendYield = parseFloat(dividendYieldStr ?? "0");
            const dividendFrequency = (dividendFrequencyStr ??
              "") as DividendFrequency;

            return {
              symbol,
              shares,
              costBasis,
              category,
              isDataFetchingNeeded: !isCustomInputProvided,
              dividendFrequency,
              dividendYield,
              nextCouponDate,
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

      <BatchAddHoldingsModal
        show={showModal}
        holdings={previewHoldings}
        onConfirm={() => handleConfirmImport()}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
