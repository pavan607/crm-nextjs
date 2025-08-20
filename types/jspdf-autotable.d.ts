import jsPDF from 'jspdf';
import 'jspdf-autotable'; // ✅ Automatically registers autoTable

type Product = {
  product_id: number;
  product_name: string;
  product_code: string;
  product_short_name: string;
  product_type: string;
  product_model_number: string;
  product_uom: string;
  product_active: boolean;
};

export const exportToPDF = (products: Product[]) => {
  const doc: jsPDF = new jsPDF();

  const tableData = products.map((prod) => [
    prod.product_id,
    prod.product_name,
    prod.product_code,
    prod.product_short_name,
    prod.product_type.replace('_', ' '),
    prod.product_model_number,
    prod.product_uom,
    prod.product_active ? 'Yes' : 'No',
  ]);

  doc.autoTable({
    head: [['ID', 'Name', 'Code', 'Short Name', 'Type', 'Model No.', 'UOM', 'Active']],
    body: tableData,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save('products.pdf');
};
