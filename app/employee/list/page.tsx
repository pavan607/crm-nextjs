'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';
import DataTable from "react-data-table-component";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFileExcel, FaFilePdf, FaPrint } from "react-icons/fa";

type Employee = {
  employee_number: string;
  employee_first_name: string;
  employee_last_name: string;
  employee_email: string;
  employee_designation: string;
  department_name: string;
};

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await fetch("/api/employee/list");
        if (!res.ok) throw new Error("Failed to fetch employees");
        const data = await res.json();
        setEmployees(data.employees);
        setFilteredEmployees(data.employees);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter((emp) =>
      `${emp.employee_first_name} ${emp.employee_last_name} ${emp.employee_email} ${emp.department_name}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [search, employees]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredEmployees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "employee_list.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [ "Number", "First Name", "Last Name", "Email", "Designation", "Department"];
    const tableRows = filteredEmployees.map(emp => [
      emp.employee_number,
      emp.employee_first_name,
      emp.employee_last_name,
      emp.employee_email,
      emp.employee_designation,
      emp.department_name,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 },
    });

    doc.save("employee_list.pdf");
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const html = `
      <html>
        <head>
          <title>Employee List</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 6px; text-align: left; }
          </style>
        </head>
        <body>
          <h2>Employee List</h2>
          <table>
            <thead>
              <tr>
                <th>Number</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Designation</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEmployees
                .map(
                  (emp) => `
                  <tr>
                    <td>${emp.employee_number}</td>
                    <td>${emp.employee_first_name}</td>
                    <td>${emp.employee_last_name}</td>
                    <td>${emp.employee_email}</td>
                    <td>${emp.employee_designation}</td>
                    <td>${emp.department_name}</td>
                  </tr>
                `
                )
                .join('')}
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
    { name: "Number", selector: (row: Employee) => row.employee_number, sortable: true },
    { name: "First Name", selector: (row: Employee) => row.employee_first_name, sortable: true },
    { name: "Last Name", selector: (row: Employee) => row.employee_last_name, sortable: true },
    { name: "Email", selector: (row: Employee) => row.employee_email, sortable: true },
    { name: "Designation", selector: (row: Employee) => row.employee_designation, sortable: true },
    { name: "Department", selector: (row: Employee) => row.department_name, sortable: true },
  ];

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="mb-4" aria-label="Breadcrumb">
        <div className="flex items-center space-x-2 text-sm">
          <Link 
            href="/employee-list"
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
          >
            All
          </Link>
        </div>
      </nav>
      
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-3xl font-bold">Employee List</h1>
        <div className="space-x-2 flex flex-wrap items-center">
          <a
            href="/employee/add"
            className="bg-blue-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          >
            + Add
          </a>
          <button
            onClick={exportToExcel}
            className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition whitespace-nowrap flex items-center gap-2"
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
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          >
            <FaPrint size={18} />
            Print
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search..."
        className="mb-4 px-3 py-2 border rounded w-full max-w-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <DataTable
        columns={columns}
        data={filteredEmployees}
        pagination
        highlightOnHover
        responsive
        striped
        dense
        customStyles={{
          rows: {
            style: {
              fontSize: '0.85rem',
              minHeight: '36px',
              paddingTop: '4px',
              paddingBottom: '4px',
            },
          },
          headCells: {
            style: {
              fontSize: '0.85rem',
              fontWeight: '600',
              paddingTop: '6px',
              paddingBottom: '6px',
            },
          },
          cells: {
            style: {
              fontSize: '0.85rem',
              paddingTop: '6px',
              paddingBottom: '6px',
            },
          },
        }}
      />
    </div>
  );
}