import { useMemo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { HKD_PER_USD } from "shared/config/passive-income";
import { formatDollarAmount } from "shared/util/passive-income-utils";

type MonthData = {
  label: string;
  key: string;
  entries: {
    symbol: string;
    amount: number;
    exDividendDate: string;
  }[];
  total: number;
};

type PropType = {
  next12Months: MonthData[];
};

// Helper function to convert "January 2026" to "Jan 2026"
const toShortMonthLabel = (label: string): string => {
  const parts = label.split(" ");
  if (parts.length >= 2) {
    return `${parts[0].substring(0, 3)} ${parts[1]}`;
  }
  return label;
};

export default function DividendTimeSeriesChart({ next12Months }: PropType) {
  // Transform data for Recharts (convert to HKD and short month labels)
  const chartData = useMemo(() => {
    return next12Months.map((month) => ({
      month: toShortMonthLabel(month.label),
      total: month.total * HKD_PER_USD,
      average: (next12Months.reduce((acc, m) => acc + m.total, 0) / next12Months.length) * HKD_PER_USD,
    }));
  }, [next12Months]);

  // Calculate average monthly dividend (in HKD)
  const averageDividend = useMemo(() => {
    const sum = next12Months.reduce((acc, month) => acc + month.total, 0);
    return (sum / next12Months.length) * HKD_PER_USD;
  }, [next12Months]);

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload }: any): JSX.Element | null => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold" }}>{payload[0].payload.month}</p>
          <p style={{ margin: "5px 0 0 0", color: "#8884d8" }}>
            Total: HK{formatDollarAmount(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: "100%", height: 400 }}>
      {/* @ts-ignore - Recharts has React 18 type compatibility issues */}
      <ResponsiveContainer width="100%" height="100%">
        {/* @ts-ignore */}
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          {/* @ts-ignore */}
          <CartesianGrid strokeDasharray="3 3" />
          {/* @ts-ignore */}
          <XAxis
            dataKey="month"
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
            style={{ fontSize: "12px" }}
          />
          {/* @ts-ignore */}
          <YAxis
            tickFormatter={(value) => `HK$${value.toFixed(0)}`}
            style={{ fontSize: "12px" }}
          />
          {/* @ts-ignore */}
          <Tooltip content={<CustomTooltip />} />
          {/* @ts-ignore */}
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => {
              if (value === "total") return "Monthly Dividend";
              if (value === "average") return "Average";
              return value;
            }}
          />
          {/* @ts-ignore */}
          <Line
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ fill: "#8884d8", r: 4 }}
            activeDot={{ r: 6 }}
            name="total"
          />
          {/* @ts-ignore */}
          <Line
            type="monotone"
            dataKey="average"
            stroke="#ff7300"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="average"
          />
          {/* @ts-ignore */}
          <ReferenceLine
            y={averageDividend}
            stroke="#ff7300"
            strokeDasharray="5 5"
            strokeWidth={2}
            label={{
              value: `HK${formatDollarAmount(averageDividend)}`,
              position: "left",
              fill: "#ff7300",
              fontSize: 12,
              fontWeight: "bold",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
