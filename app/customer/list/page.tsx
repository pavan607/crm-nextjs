'use client';

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Customer = {
  customer_id: number;
  customer_name: string;
  customer_short_name: string;
  customer_contact_person: string;
  customer_address: string;
  customer_mail_id: string;
  customer_contact_number: string;
  customer_gst_num: string;
  customer_country: string;
  customer_active: number;
};

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filtered, setFiltered] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await fetch("/api/customer/list");
        if (!res.ok) throw new Error("Failed to fetch customers");
        const data = await res.json();
        setCustomers(data.customers);
        setFiltered(data.customers);
      } catch (err) {
        setError((err as Error).message);
      }
    }

    fetchCustomers();
  }, []);

  useEffect(() => {
    const filteredData = customers.filter((c) =>
      `${c.customer_name} ${c.customer_contact_person} ${c.customer_mail_id}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFiltered(filteredData);
  }, [search, customers]);

  const handleDelete = async (customer: Customer) => {
    const confirmDelete = confirm(`Are you sure you want to delete ${customer.customer_name}?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/customer/edit/${customer.customer_id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (res.ok) {
        alert("Customer deleted successfully");
        setCustomers(prev => prev.filter(c => c.customer_id !== customer.customer_id));
      } else {
        alert(result.message || "Failed to delete customer");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting customer");
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filtered);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "customers.xlsx");
  };

  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(filtered);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "customers.csv");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Name", "Short Name", "Contact Person", "Address", "Email",
      "Phone", "GSTIN", "Country", "Active"
    ];
    const tableRows = filtered.map(c => [
      c.customer_name,
      c.customer_short_name,
      c.customer_contact_person,
      c.customer_address,
      c.customer_mail_id,
      c.customer_contact_number,
      c.customer_gst_num,
      c.customer_country,
      c.customer_active ? "Yes" : "No"
    ]);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
      startY: 20
    });
    doc.save("customers.pdf");
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const tableRows = filtered.map(c => `
      <tr>
        <td>${c.customer_name}</td>
        <td>${c.customer_short_name}</td>
        <td>${c.customer_contact_person}</td>
        <td>${c.customer_address}</td>
        <td>${c.customer_mail_id}</td>
        <td>${c.customer_contact_number}</td>
        <td>${c.customer_gst_num}</td>
        <td>${c.customer_country}</td>
        <td>${c.customer_active ? "Yes" : "No"}</td>
      </tr>
    `).join("");

    const html = `
      <html>
        <head>
          <title>Customer List</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 12px; }
          </style>
        </head>
        <body>
          <h2>Customer List</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Short Name</th>
                <th>Contact Person</th>
                <th>Address</th>
                <th>Email</th>
                <th>Phone</th>
                <th>GSTIN</th>
                <th>Country</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  const columns = [
    { name: "Name", selector: (row: Customer) => row.customer_name, sortable: true },
    { name: "Short Name", selector: (row: Customer) => row.customer_short_name },
    { name: "Contact Person", selector: (row: Customer) => row.customer_contact_person },
    { name: "Address", selector: (row: Customer) => row.customer_address },
    { name: "Email", selector: (row: Customer) => row.customer_mail_id },
    { name: "Phone", selector: (row: Customer) => row.customer_contact_number },
    { name: "GSTIN", selector: (row: Customer) => row.customer_gst_num },
    { name: "Country", selector: (row: Customer) => row.customer_country },
    { name: "Active", selector: (row: Customer) => row.customer_active ? "Yes" : "No" },
    {
      name: "Actions",
      cell: (row: Customer) => (
        <div className="flex space-x-3">
          <Link href={`/customer/view/${row.customer_id}`}>
            <FaEye className="text-blue-600 hover:text-blue-800 cursor-pointer" title="View" />
          </Link>
          <Link href={`/customer/edit/${row.customer_id}`}>
            <FaEdit className="text-green-600 hover:text-green-800 cursor-pointer" title="Edit" />
          </Link>
          <button onClick={() => handleDelete(row)}>
            <FaTrash className="text-red-600 hover:text-red-800 cursor-pointer" title="Delete" />
          </button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="text-black dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Customer List</h1>
        <a
          href="/customer/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add
        </a>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <input
        type="text"
        placeholder="Search..."
        className="mb-4 px-3 py-2 border rounded w-full max-w-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Export Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={exportToExcel} className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
          Export Excel
        </button>
        <button onClick={exportToCSV} className="bg-yellow-600 text-white px-4 py-1 rounded hover:bg-yellow-700">
          Export CSV
        </button>
        <button onClick={exportToPDF} className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700">
          Export PDF
        </button>
        <button onClick={handlePrint} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
          Print
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        pagination
        highlightOnHover
        responsive
        striped
        dense
        customStyles={{
          rows: {
            style: {
              fontSize: '0.875rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
            },
          },
          headCells: {
            style: {
              fontSize: '0.875rem',
              fontWeight: '600',
            },
          },
          cells: {
            style: {
              fontSize: '0.875rem',
            },
          },
        }}
      />
    </div>
  );
}