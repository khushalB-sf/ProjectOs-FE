import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const { COST_BREAKDOWN, EDIT } = LABELS.PROPOSAL;

const USD_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const EMPTY_ROW: CostBreakdownItem = {
  role: "",
  module: "",
  days: 0,
  rateUsd: 0,
  costUsd: 0,
};

interface CostBreakdownSectionProps {
  readonly entries: CostBreakdownItem[];
  readonly totalCostLabel: string;
  readonly totalDaysLabel: string;
  readonly isEditing?: boolean;
  readonly onChange?: (entries: CostBreakdownItem[]) => void;
}

/** Effort & cost estimate table with a highlighted engagement total row. */
function CostBreakdownSection({
  entries,
  totalCostLabel,
  totalDaysLabel,
  isEditing = false,
  onChange,
}: CostBreakdownSectionProps) {
  if (isEditing) {
    const updateRow = (index: number, patch: Partial<CostBreakdownItem>) =>
      onChange?.(
        entries.map((entry, entryIndex) => {
          if (entryIndex !== index) return entry;
          const next = { ...entry, ...patch };
          next.costUsd = next.days * next.rateUsd;
          return next;
        }),
      );

    const removeRow = (index: number) =>
      onChange?.(entries.filter((_, entryIndex) => entryIndex !== index));

    const addRow = () => onChange?.([...entries, { ...EMPTY_ROW }]);

    return (
      <div className="space-y-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{COST_BREAKDOWN.COLUMN_ROLE}</TableHead>
              <TableHead>{COST_BREAKDOWN.COLUMN_MODULE}</TableHead>
              <TableHead>{COST_BREAKDOWN.COLUMN_DAYS}</TableHead>
              <TableHead>{COST_BREAKDOWN.COLUMN_RATE}</TableHead>
              <TableHead>{COST_BREAKDOWN.COLUMN_TOTAL}</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    value={entry.role}
                    onChange={(event) =>
                      updateRow(index, { role: event.target.value })
                    }
                    placeholder={EDIT.COST_ROLE_PLACEHOLDER}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={entry.module}
                    onChange={(event) =>
                      updateRow(index, { module: event.target.value })
                    }
                    placeholder={EDIT.COST_MODULE_PLACEHOLDER}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min={0}
                    value={entry.days}
                    onChange={(event) =>
                      updateRow(index, { days: Number(event.target.value) })
                    }
                    className="w-20"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min={0}
                    value={entry.rateUsd}
                    onChange={(event) =>
                      updateRow(index, { rateUsd: Number(event.target.value) })
                    }
                    className="w-24"
                  />
                </TableCell>
                <TableCell className="text-slate-600">
                  {USD_FORMATTER.format(entry.costUsd)}
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeRow(index)}
                    aria-label={EDIT.REMOVE_ROW_ARIA}
                    className="text-slate-400 hover:text-red-600"
                  >
                    <Trash2 aria-hidden="true" />
                  </Button>
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
              <TableCell className="text-lg text-indigo-600" colSpan={2}>
                {totalCostLabel}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button type="button" variant="outline" size="sm" onClick={addRow}>
          <Plus aria-hidden="true" />
          {EDIT.ADD_COST_ROW}
        </Button>
      </div>
    );
  }

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
