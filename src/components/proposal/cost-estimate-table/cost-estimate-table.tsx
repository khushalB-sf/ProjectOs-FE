import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LABELS } from "@/constants/labels";
import { COST_ROWS } from "@/constants/proposal/mock";

const { COST_ESTIMATE } = LABELS.PROPOSAL;

/** Effort & cost estimate table with a highlighted engagement total row. */
function CostEstimateTable() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{COST_ESTIMATE.COLUMN_ROLE}</TableHead>
            <TableHead>{COST_ESTIMATE.COLUMN_PEOPLE}</TableHead>
            <TableHead>{COST_ESTIMATE.COLUMN_DAYS}</TableHead>
            <TableHead>{COST_ESTIMATE.COLUMN_RATE}</TableHead>
            <TableHead>{COST_ESTIMATE.COLUMN_TOTAL}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {COST_ROWS.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium text-slate-900">
                {row.role}
              </TableCell>
              <TableCell className="text-slate-600">{row.people}</TableCell>
              <TableCell className="text-slate-600">{row.days}</TableCell>
              <TableCell className="text-slate-600">{row.ratePerDay}</TableCell>
              <TableCell className="text-slate-600">{row.total}</TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-indigo-50 font-bold">
            <TableCell className="text-slate-900" colSpan={4}>
              {COST_ESTIMATE.TOTAL_ROW_LABEL}
            </TableCell>
            <TableCell className="text-lg text-indigo-600">
              {COST_ESTIMATE.TOTAL_ROW_VALUE}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p className="mt-3 text-xs text-slate-500">{COST_ESTIMATE.FOOTNOTE}</p>
    </div>
  );
}

export { CostEstimateTable };
