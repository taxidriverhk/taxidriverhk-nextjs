import {
  Holding,
  SecurityDataProvider,
} from "shared/types/passive-income-types";
import SharePortfolioButton from "./SharePortfolioButton";

type PropType = {
  apiKey: string;
  provider: SecurityDataProvider;
  holdings: Array<Holding>;
};

export default function PortfolioFooter({
  apiKey,
  provider,
  holdings,
}: PropType) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "end",
      }}
    >
      <SharePortfolioButton
        apiKey={apiKey}
        provider={provider}
        holdings={holdings}
      />
    </div>
  );
}
