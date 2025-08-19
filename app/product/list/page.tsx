'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import DataTable from 'react-data-table-component';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FaEye, FaEdit, FaTrash, FaChevronRight } from 'react-icons/fa';
import { FaFileExcel, FaFilePdf, FaFileCsv } from 'react-icons/fa';

type Product = {
  product_id: number;
  product_name: string;
  product_code: string;
  product_short_name: string | null;
  product_type: string;
  product_model_number: string | null;
  product_uom: string | null;
};

interface RawProduct {
  product_id: number;
  product_name: string;
  product_code: string;
  product_short_name: string | null;
  product_type: string;
  product_model_number: string | null;
  product_uom: string | null;
}

const Breadcrumb = () => {
  const pathname = usePathname();

  const breadcrumbItems = [{ label: 'All', href: '/product/' }];
  if (pathname === '/product/add' || pathname === '/product/add/') {
    breadcrumbItems.push({ label: 'Form', href: '/product/add/' });
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <FaChevronRight className="mx-2 text-gray-400" size={12} />}
          <Link href={item.href} className="text-blue-600 hover:text-blue-800 transition-colors">
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default function ProductListPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const success = searchParams.get('success');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/product/list');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();

        const mappedProducts: Product[] = data.products.map((p: RawProduct) => ({
          product_id: p.product_id,
          product_name: p.product_name,
          product_code: p.product_code,
          product_short_name: p.product_short_name,
          product_type: p.product_type,
          product_model_number: p.product_model_number,
          product_uom: p.product_uom,
        }));

        setAllProducts(mappedProducts);
        setProducts(mappedProducts);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleDelete = async (row: Product) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this product?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/product/${row.product_id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete product');
      }

      const updatedList = products.filter((p) => p.product_id !== row.product_id);
      setProducts(updatedList);
      setAllProducts(updatedList);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const columns = [
    { name: 'ID', selector: (row: Product) => row.product_id, sortable: true, width: '70px' },
    { name: 'Product Name', selector: (row: Product) => row.product_name, sortable: true, wrap: true },
    { name: 'Code', selector: (row: Product) => row.product_code, wrap: true },
    { name: 'Short Name', selector: (row: Product) => row.product_short_name || '', wrap: true },
    {
      name: 'Type',
      selector: (row: Product) => row.product_type.replace('_', ' '),
      wrap: true,
    },
    { name: 'Model No.', selector: (row: Product) => row.product_model_number || '', wrap: true },
    { name: 'UOM', selector: (row: Product) => row.product_uom || '', wrap: true },

    {
      name: 'Actions',
      cell: (row: Product) => (
        <div className="flex space-x-3">
          <Link href={`/product/view/${row.product_id}`}>
            <FaEye className="text-blue-600 hover:text-blue-800 cursor-pointer" title="View" />
          </Link>
          <Link href={`/product/edit/${row.product_id}`}>
            <FaEdit className="text-green-600 hover:text-green-800 cursor-pointer" title="Edit" />
          </Link>
          <button onClick={() => handleDelete(row)}>
            <FaTrash className="text-red-600 hover:text-red-800 cursor-pointer" title="Delete" />
          </button>
        </div>
      ),
      width: '120px',
    },
  ];

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(products);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'products.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableData = products.map((prod) => [
      prod.product_id,
      prod.product_name,
      prod.product_code,
      prod.product_short_name || '',
      prod.product_type.replace('_', ' '),
      prod.product_model_number || '',
      prod.product_uom || '',
    ]);

    autoTable(doc, {
      head: [['ID', 'Name', 'Code', 'Short Name', 'Type', 'Model No.', 'UOM']],
      body: tableData,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('products.pdf');
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Code', 'Short Name', 'Type', 'Model No.', 'UOM'];
    const rows = products.map((p) =>
      [
        p.product_id,
        `"${p.product_name}"`,
        `"${p.product_code}"`,
        `"${p.product_short_name || ''}"`,
        `"${p.product_type}"`,
        `"${p.product_model_number || ''}"`,
        `"${p.product_uom || ''}"`,
      ].join(',')
    );
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'products.csv');
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    if (!value) return setProducts(allProducts);

    const filtered = allProducts.filter((product) =>
      Object.values(product).some((field) =>
        String(field).toLowerCase().includes(value)
      )
    );
    setProducts(filtered);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex justify-between items-start mb-6">
        <Breadcrumb />
      </div>

      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-3xl font-bold">Product List</h1>
        <div className="space-x-2 flex flex-wrap items-center">
          <Link
            href="/product/add"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition whitespace-nowrap"
          >
            + Add
          </Link>
          <button
            onClick={exportToExcel}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition whitespace-nowrap flex items-center gap-2"
          >
            <FaFileExcel size={18} />
            Excel
          </button>

          <button
            onClick={exportToPDF}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition whitespace-nowrap flex items-center gap-2"
          >
            <FaFilePdf size={18} />
            PDF
          </button>

          <button
            onClick={exportToCSV}
            className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition whitespace-nowrap flex items-center gap-2"
          >
            <FaFileCsv size={18} />
            CSV
          </button>
        </div>
      </div>

      {success === 'added' && <p className="text-green-600 mb-4">Product added successfully!</p>}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <input
            type="text"
            placeholder="Search products..."
            onChange={handleSearch}
            className="border p-2 rounded mb-4 w-full max-w-sm"
          />

          <DataTable
            columns={columns}
            data={products}
            pagination
            highlightOnHover
            dense
            fixedHeader
            noHeader
            persistTableHead
          />
        </>
      )}
    </div>
  );
}
