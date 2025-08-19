'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import DataTable, { TableColumn } from 'react-data-table-component';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

import Link from 'next/link';

type Lead = {
  enquiryNumber: string;
  enquiryId: number;
  opportunityName: string;
  contactName?: string;
  type?: string;
  leadSource?: string;
  assignedToName?: string;
  campaignSource?: string;
  weightedRevenue?: number;
  organizationName?: string;
  amount?: number;
  expectedCloseDate?: string;
  nextStep?: string;
  salesStage?: string;
  probability?: number;
  description?: string;
  comments?: string;
  products?: string;
  // attachments?: string;
};

export default function LeadListPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPath, setCurrentPath] = useState('');
  const [deleteModal, setDeleteModal] = useState<{
  isOpen: boolean;
  enquiryId: number | null;
  enquiryNumber: string;
}>({
  isOpen: false,
  enquiryId: null,
  enquiryNumber: ''
});
  const router = useRouter();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const renderBreadcrumb = () => {
    const isLeadList = currentPath.includes('/enquiry/list');
    const isLeadForm = currentPath === '/enquiry/add/' || (currentPath.includes('/enquiry/add/') && !currentPath.includes('/enquiry/list/'));

    if (isLeadList) {
      return (
        <div className="mb-2">
          <Link href="/enquiry/list" className="text-blue-600 hover:underline text-sm">
            All
          </Link>
        </div>
      );
    } else if (isLeadForm) {
      return (
        <div className="mb-2 text-sm">
          <Link href="/enquiry/list" className="text-blue-600 hover:underline">
            All
          </Link>
          <span className="mx-2">→</span>
          <Link href="/enquiry/add" className="text-blue-600 hover:underline">
            Form
          </Link>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch('/api/enquiry/list');
        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.leads || [];
        
        setLeads(list);
        setFilteredLeads(list);
      } catch (error) {
        console.error('Failed to fetch leads:', error);
      }
    };
    fetchLeads();
  }, []);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    const filtered = leads.filter(lead =>
      Object.values(lead).some(value => value?.toString().toLowerCase().includes(lower))
    );
    setFilteredLeads(filtered);
  }, [searchTerm, leads]);

  const handleEdit = useCallback(
    (enquiryId: number) => {
      router.push(`/enquiry/edit/${enquiryId}`);
    },
    [router]
  );

  const handleDelete = useCallback(
  async (enquiryId: number) => {
    try {
      const response = await fetch(`/api/enquiry/add/${enquiryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedLeads = leads.filter(lead => lead.enquiryId !== enquiryId);
        setLeads(updatedLeads);
        setFilteredLeads(updatedLeads);
        setDeleteModal({ isOpen: false, enquiryId: null, enquiryNumber: '' });
        // Optional: Show success message
        console.log('Enquiry deleted successfully');
      } else {
        console.error('Failed to delete lead');
        // Optional: Show error message to user
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
      // Optional: Show error message to user
    }
  },
  [leads]
);

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredLeads);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'leads.xlsx');
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const columns = [
      'Enquiry Number',
      'Opportunity',
      'Contact',
      'Type',
      'Lead Source',
      'Assigned To',
      'Campaign',
      'Revenue',
      'Organization',
      'Amount',
      'Expected Close Date',
      'Next Step',
      'Sales Stage',
      'Probability',
      'Description',
      'Comments',
      'Products',
      // 'Attachments',
    ];
    const rows = filteredLeads.map(lead => [
      lead.enquiryNumber ?? '—',
      lead.opportunityName ?? '—',
      lead.contactName ?? '—',
      lead.type ?? '—',
      lead.leadSource ?? '—',
      lead.assignedToName ?? '—',
      lead.campaignSource ?? '—',
      lead.weightedRevenue ?? '—',
      lead.organizationName ?? '—',
      lead.amount ?? '—',
      lead.expectedCloseDate ?? '—',
      lead.nextStep ?? '—',
      lead.salesStage ?? '—',
      lead.probability ?? '—',
      lead.description ?? '—',
      lead.comments ?? '—',
      lead.products ?? '—',
      // lead.attachments ?? '—',
    ]);
    autoTable(doc, {
      head: [columns],
      body: rows,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [200, 200, 200] },
    });
    doc.save('leads.pdf');
  };

  const handlePrint = () => {
    const printContent = document.getElementById('print-table')?.innerHTML;
    const printWindow = window.open('', '_blank');
    if (printWindow && printContent) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Leads</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                font-size: 12px;
              }
              th, td {
                border: 1px solid #ccc;
                padding: 6px 8px;
                text-align: left;
                vertical-align: top;
              }
              th {
                background-color: #f5f5f5;
              }
              div {
                margin-bottom: 2px;
              }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  const DeleteConfirmationModal = () => {
  if (!deleteModal.isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">
              Delete Enquiry
            </h3>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete enquiry <span className="font-semibold text-gray-900">#{deleteModal.enquiryNumber}</span>? 
            This action cannot be undone.
          </p>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setDeleteModal({ isOpen: false, enquiryId: null, enquiryNumber: '' })}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            No, Cancel
          </button>
          <button
            onClick={() => {
              if (deleteModal.enquiryId) {
                handleDelete(deleteModal.enquiryId);
              }
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

  const columns: TableColumn<Lead>[] = useMemo(
  () => [
    {
      name: 'Enquiry Number',
      selector: row => row.enquiryNumber,
      sortable: true,
      width: '150px',
    },
    {
      name: 'Enquiry',
      selector: row => row.opportunityName,
      sortable: true,
    },
    {
      name: 'Contact',
      selector: row => row.contactName || '—',
      sortable: true,
    },
    {
      name: 'Type',
      selector: row => row.type || '—',
      sortable: true,
    },
    {
      name: 'Lead Source',
      selector: row => row.leadSource || '—',
      sortable: true,
    },
    {
      name: 'Assigned To',
      cell: row => (
        <span
          onClick={e => {
            e.stopPropagation();
            if (row.assignedToName) {
              router.push(`/employee/${row.assignedToName}`);
            }
          }}
          className="text-blue-600 hover:underline cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              if (row.assignedToName) {
                router.push(`/employee/${row.assignedToName}`);
              }
            }
          }}
        >
          {row.assignedToName || '—'}
        </span>
      ),
      ignoreRowClick: true,
      sortable: true,
      selector: row => row.assignedToName || '—',
    },
    {
      name: 'Campaign Source',
      selector: row => row.campaignSource || '—',
      sortable: true,
    },
    {
      name: 'Weighted Revenue',
      selector: row => row.weightedRevenue ?? '—',
      sortable: true,
    },
    {
      name: 'Organization',
      selector: row => row.organizationName || '—',
      sortable: true,
    },
    {
      name: 'Amount',
      selector: row => row.amount ?? '—',
      sortable: true,
    },
    {
      name: 'Expected Close Date',
      selector: row => row.expectedCloseDate || '—',
      sortable: true,
    },
    {
      name: 'Next Step',
      selector: row => row.nextStep || '—',
      sortable: true,
    },
    {
      name: 'Sales Stage',
      selector: row => row.salesStage || '—',
      sortable: true,
    },
    {
      name: 'Probability',
      selector: row => row.probability ?? '—',
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.description || '—',
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex gap-2">
          <button
            onClick={e => {
              e.stopPropagation();
              handleEdit(row.enquiryId);
            }}
            className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium px-2 py-1 rounded hover:bg-blue-50"
            title="Edit Enquiry"
          >
            <PencilIcon className="h-4 w-4 mr-1" />
          </button>

          <button
            onClick={e => {
              e.stopPropagation();
              setDeleteModal({
                isOpen: true,
                enquiryId: row.enquiryId,
                enquiryNumber: row.enquiryNumber
              });
            }}
            className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium px-2 py-1 rounded hover:bg-red-50"
            title="Delete Enquiry"
          >
            <TrashIcon className="h-4 w-4 mr-1" />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      width: '120px',
    },
  ],
  [router, handleEdit] // Remove deleteConfirm from dependencies
);

  return (
    <div className="p-2">
      {renderBreadcrumb()}

      <div className="flex justify-between items-center mb-3">
        <h1 className="text-xl font-semibold">Enquiry</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-sm"
          onClick={() => router.push('/enquiry/add')}
        >
          + Add Enquiry
        </button>
      </div>

      <div className="flex justify-between items-center mb-3 gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Search leads..."
          className="border rounded px-2 py-1 w-full sm:w-auto"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <div className="flex gap-2 flex-wrap">
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
            onClick={handleExportExcel}
          >
            <span aria-hidden="true">📊</span> Excel
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
            onClick={handleExportPDF}
          >
            <span aria-hidden="true">📄</span> PDF
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
            onClick={handlePrint}
          >
            <span aria-hidden="true">🖨</span> Print
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredLeads}
        pagination
        highlightOnHover
        striped
        responsive
        pointerOnHover
        onRowClicked={row => router.push(`/leads/${row.enquiryId}`)}
        // Note: defaultSortFieldId expects a numeric id of the column, not a string field
        // So either assign an id prop to your column or use defaultSortField="enquiryNumber"
        // defaultSortField="enquiryNumber"
        persistTableHead
      />

      <div id="print-table" style={{ display: 'none' }}>
        <table>
          <thead>
            <tr>
              <th>Enquiry Number</th>
              <th>Opportunity</th>
              <th>Contact</th>
              <th>Type</th>
              <th>Lead Source</th>
              <th>Assigned To</th>
              <th>Campaign Source</th>
              <th>Weighted Revenue</th>
              <th>Organization</th>
              <th>Amount</th>
              <th>Expected Close Date</th>
              <th>Next Step</th>
              <th>Sales Stage</th>
              <th>Probability</th>
              <th>Description</th>
              {/* <th>Comments</th> */}
              {/* <th>Products</th> */}
              {/* <th>Attachments</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead, index) => (
              <tr key={index}>
                <td>{lead.enquiryNumber}</td>
                <td>{lead.opportunityName}</td>
                <td>{lead.contactName || '—'}</td>
                <td>{lead.type || '—'}</td>
                <td>{lead.leadSource || '—'}</td>
                <td>{lead.assignedToName || '—'}</td>
                <td>{lead.campaignSource || '—'}</td>
                <td>{lead.weightedRevenue ?? '—'}</td>
                <td>{lead.organizationName || '—'}</td>
                <td>{lead.amount ?? '—'}</td>
                <td>{lead.expectedCloseDate || '—'}</td>
                <td>{lead.nextStep || '—'}</td>
                <td>{lead.salesStage || '—'}</td>
                <td>{lead.probability ?? '—'}</td>
                <td>{lead.description || '—'}</td>
                {/* <td>{lead.comments || '—'}</td>
                <td>{lead.products ? lead.products.split(',').map((p, i) => <div key={i}>{p.trim()}</div>) : '—'}</td> */}
                {/* <td>{lead.attachments ? lead.attachments.split(',').map((a, i) => <div key={i}>{a.trim()}</div>) : '—'}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteConfirmationModal />
    </div>
  );
}
