import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { VELOCITY_DATA } from "@/constants/dashboard/mock";
import { LABELS } from "@/constants/labels";

const VELOCITY = LABELS.DASHBOARD.VELOCITY;

function VelocityChart() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900">
          {VELOCITY.TITLE}
        </h3>
        <p className="text-xs text-slate-400">{VELOCITY.SUBTITLE}</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={VELOCITY_DATA}
          margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
        >
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
          <Tooltip cursor={{ fill: "#f1f5f9" }} />
          <Bar dataKey="points" radius={[6, 6, 0, 0]} maxBarSize={56}>
            {VELOCITY_DATA.map((entry) => (
              <Cell key={entry.label} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export { VelocityChart };
