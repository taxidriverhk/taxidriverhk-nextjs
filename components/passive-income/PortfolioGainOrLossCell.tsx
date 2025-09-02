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
      {prefix}
      {Math.abs(gainOrLoss).toFixed(2)}
      {suffix}
    </span>
  );
}
