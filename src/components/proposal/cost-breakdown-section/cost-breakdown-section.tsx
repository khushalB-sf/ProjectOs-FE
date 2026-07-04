import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LABELS } from "@/constants/labels";

import type { CostBreakdownItem } from "@/types/proposal";

const { COST_BREAKDOWN } = LABELS.PROPOSAL;

const USD_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

interface CostBreakdownSectionProps {
  entries: CostBreakdownItem[];
  totalCostLabel: string;
  totalDaysLabel: string;
}

/** Effort & cost estimate table with a highlighted engagement total row. */
function CostBreakdownSection({
  entries,
  totalCostLabel,
  totalDaysLabel,
}: CostBreakdownSectionProps) {
  if (entries.length === 0) {
    return <p className="text-sm text-slate-500">{COST_BREAKDOWN.EMPTY}</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{COST_BREAKDOWN.COLUMN_ROLE}</TableHead>
          <TableHead>{COST_BREAKDOWN.COLUMN_MODULE}</TableHead>
          <TableHead>{COST_BREAKDOWN.COLUMN_DAYS}</TableHead>
          <TableHead>{COST_BREAKDOWN.COLUMN_RATE}</TableHead>
          <TableHead>{COST_BREAKDOWN.COLUMN_TOTAL}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry, index) => (
          <TableRow key={`${entry.role}-${entry.module}-${index}`}>
            <TableCell className="font-medium text-slate-900">
              {entry.role}
            </TableCell>
            <TableCell className="text-slate-600">{entry.module}</TableCell>
            <TableCell className="text-slate-600">{entry.days}</TableCell>
            <TableCell className="text-slate-600">
              {USD_FORMATTER.format(entry.rateUsd)}
            </TableCell>
            <TableCell className="text-slate-600">
              {USD_FORMATTER.format(entry.costUsd)}
            </TableCell>
          </TableRow>
        ))}
        <TableRow className="bg-indigo-50 font-bold">
          <TableCell className="text-slate-900" colSpan={4}>
            {COST_BREAKDOWN.TOTAL_ROW_LABEL}
            <span className="ml-2 font-normal text-slate-500">
              ({totalDaysLabel})
            </span>
          </TableCell>
          <TableCell className="text-lg text-indigo-600">
            {totalCostLabel}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export { CostBreakdownSection };
