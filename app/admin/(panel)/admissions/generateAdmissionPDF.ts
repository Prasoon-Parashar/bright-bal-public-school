import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

export async function generateAdmissionPDF(registrationNumber?: string) {
  const element = document.getElementById("admission-pdf");

  if (!element) {
    alert("PDF content not found.");
    return;
  }

  // Wait for images to load
  const images = Array.from(element.querySelectorAll("img"));
  await Promise.all(
    images.map((img) => {
      if (img.complete) return Promise.resolve();

      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    scrollY: -window.scrollY,
    windowWidth: 794,
    windowHeight: element.scrollHeight,

    onclone: (doc) => {
      const pdfRoot = doc.getElementById("admission-pdf");
      if (!pdfRoot) return;

      // html2canvas lab()/oklch() fix
      const root = doc.documentElement;

      root.style.setProperty("--color-red-50", "#FEF2F2");
      root.style.setProperty("--color-red-100", "#FEE2E2");
      root.style.setProperty("--color-red-200", "#FECACA");
      root.style.setProperty("--color-red-600", "#DC2626");
      root.style.setProperty("--color-red-700", "#B91C1C");

      root.style.setProperty("--color-slate-50", "#F8FAFC");
      root.style.setProperty("--color-slate-100", "#F1F5F9");
      root.style.setProperty("--color-slate-200", "#E2E8F0");
      root.style.setProperty("--color-slate-500", "#64748B");
      root.style.setProperty("--color-slate-700", "#334155");
      root.style.setProperty("--color-slate-900", "#0F172A");

      root.style.setProperty("--color-green-50", "#F0FDF4");
      root.style.setProperty("--color-green-600", "#16A34A");

      root.style.setProperty("--color-yellow-50", "#FEFCE8");
      root.style.setProperty("--color-yellow-500", "#EAB308");

      pdfRoot.style.background = "#FFFFFF";

      // Prevent section breaks
      const style = doc.createElement("style");
      style.innerHTML = `
        .pdf-section{
          break-inside: avoid;
          page-break-inside: avoid;
          margin-bottom:20px;
        }

        img{
          break-inside: avoid;
          page-break-inside: avoid;
        }

        *{
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      `;
      doc.head.appendChild(style);
    },
  });

  const imgData = canvas.toDataURL("image/png", 1);

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  // First page
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  // Remaining pages
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;

    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

    heightLeft -= pageHeight;
  }

  pdf.save(
    `${registrationNumber || "BBPS"}_Admission_Receipt.pdf`
  );
}