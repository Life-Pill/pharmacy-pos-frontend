import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { BranchSalesDetails } from '../interfaces/BranchSaleDetails';

export const exportToExcel = (
  data: BranchSalesDetails[],
  fileName: string = 'SalesData.xlsx'
) => {
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'SalesData');
  writeFile(wb, fileName);
};

export const exportToPDF = (
  data: BranchSalesDetails[],
  fileName: string = 'SalesData.pdf'
) => {
  const doc = new jsPDF();
  doc.text('Sales Data', 20, 10);
  const columns = [
    { header: 'Date', dataKey: 'date' },
    { header: 'Sales', dataKey: 'sales' },
    { header: 'Orders', dataKey: 'orders' },
  ];

  // @ts-ignore
  doc.autoTable({
    columns: columns,
    body: data,
    startY: 20,
  });
  doc.save(fileName);
};
