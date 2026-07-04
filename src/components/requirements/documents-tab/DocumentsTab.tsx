import { LABELS } from "@/constants/labels";
import { REQUIREMENT_DOCUMENTS } from "@/constants/requirements/mock";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DocumentRow } from "./DocumentRow";
import { UploadDropzone } from "./UploadDropzone";

const L = LABELS.REQUIREMENTS.DOCUMENTS;

/** Documents tab — upload dropzone plus the processed-documents table. */
function DocumentsTab() {
  return (
    <div className="space-y-4">
      <UploadDropzone />
      <Card className="py-0">
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{L.COLUMN_FILE}</TableHead>
                <TableHead>{L.COLUMN_TYPE}</TableHead>
                <TableHead>{L.COLUMN_UPLOADED}</TableHead>
                <TableHead>{L.COLUMN_STATUS}</TableHead>
                <TableHead>{L.COLUMN_ACTION}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {REQUIREMENT_DOCUMENTS.map((document) => (
                <DocumentRow key={document.id} document={document} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export { DocumentsTab };
