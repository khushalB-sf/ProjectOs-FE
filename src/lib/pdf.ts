import { jsPDF } from "jspdf";
// Tailwind v4's default palette uses oklch()/color-mix(), which the original
// html2canvas can't parse. This fork adds support for modern CSS color functions.
import html2canvas from "html2canvas-pro";

const PDF_FORMAT = "a4";
const PDF_ORIENTATION = "p";
const PDF_UNIT = "pt";

/** Strips characters that are unsafe in a downloaded file name. */
function toSafeFilename(value: string): string {
  return value.trim().replace(/[\\/:*?"<>|]+/g, "-");
}

/**
 * Renders a DOM element to a canvas and paginates it into a downloadable A4 PDF.
 * Client-side only (no backend PDF endpoint exists) — the output is an image
 * per page, not selectable text.
 */
export async function exportElementToPdf(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: "#ffffff",
    useCORS: true,
  });
  const imageData = canvas.toDataURL("image/png");

  const pdf = new jsPDF(PDF_ORIENTATION, PDF_UNIT, PDF_FORMAT);
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imageWidth = pageWidth;
  const imageHeight = (canvas.height * imageWidth) / canvas.width;

  let heightRemaining = imageHeight;
  let offset = 0;

  pdf.addImage(imageData, "PNG", 0, offset, imageWidth, imageHeight);
  heightRemaining -= pageHeight;

  while (heightRemaining > 0) {
    offset = heightRemaining - imageHeight;
    pdf.addPage();
    pdf.addImage(imageData, "PNG", 0, offset, imageWidth, imageHeight);
    heightRemaining -= pageHeight;
  }

  pdf.save(`${toSafeFilename(filename)}.pdf`);
}
