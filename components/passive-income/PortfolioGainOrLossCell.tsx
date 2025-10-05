import {
  formatDollarAmount,
  formatPercentage,
} from "shared/util/passive-income-utils";

export default function PortfolioGainOrLossCell({
  gainOrLoss,
  prefix = "",
  suffix = "",
}: {
  gainOrLoss: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <span className={gainOrLoss >= 0 ? "text-success" : "text-danger"}>
      {gainOrLoss >= 0 ? "+" : "-"}
      {prefix === "$" && formatDollarAmount(Math.abs(gainOrLoss))}
      {suffix === "%" && formatPercentage(Math.abs(gainOrLoss))}
    </span>
  );
}
