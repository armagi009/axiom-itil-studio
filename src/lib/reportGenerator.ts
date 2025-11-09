import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export const generatePdfReport = async (elementId: string, fileName: string = 'report.pdf') => {
  const input = document.getElementById(elementId);
  if (!input) {
    console.error(`Element with id "${elementId}" not found.`);
    return;
  }
  try {
    const canvas = await html2canvas(input, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      backgroundColor: document.documentElement.classList.contains('dark') ? '#09090b' : '#f8fafc',
    });
    const imgData = canvas.toDataURL('image/png');
    // PDF dimensions: A4 is 210mm x 297mm
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const canvasAspectRatio = canvasWidth / canvasHeight;
    let imgWidth = pdfWidth - 20; // with 10mm margin on each side
    let imgHeight = imgWidth / canvasAspectRatio;
    // If image height is still too large, resize based on height
    if (imgHeight > pdfHeight - 20) {
      imgHeight = pdfHeight - 20;
      imgWidth = imgHeight * canvasAspectRatio;
    }
    const x = (pdfWidth - imgWidth) / 2;
    const y = 10; // 10mm margin from top
    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};