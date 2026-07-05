import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { LABELS } from "@/constants/labels";

import type { BurndownPoint } from "@/types/dashboard";

const BURNDOWN = LABELS.DASHBOARD.BURNDOWN;

interface BurndownChartProps {
  readonly data: BurndownPoint[];
  readonly title: string;
  readonly subtitle: string;
}

function BurndownChart({ data, title, subtitle }: BurndownChartProps) {
  // Don't render if no data
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-400">{subtitle}</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart
          data={data}
          margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            height={28}
            iconType="plainline"
            wrapperStyle={{ fontSize: 12 }}
          />
          <Line
            type="monotone"
            dataKey="ideal"
            name={BURNDOWN.IDEAL}
            stroke="#cbd5e1"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="actual"
            name={BURNDOWN.ACTUAL}
            stroke="#6366f1"
            strokeWidth={2}
            fill="#6366f1"
            fillOpacity={0.12}
            connectNulls={false}
            dot={{ r: 3, fill: "#6366f1" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export { BurndownChart };
