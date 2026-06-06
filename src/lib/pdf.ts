import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { format } from 'date-fns'

/**
 * Exports a DOM element to a PDF file.
 */
export async function exportToPDF(element: HTMLElement, fileName: string) {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false
  })
  
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('l', 'mm', 'a4')
  const imgProps = pdf.getImageProperties(imgData)
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
  
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  pdf.save(fileName)
}
