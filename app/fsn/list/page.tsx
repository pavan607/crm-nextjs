'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Eye, Edit, Trash2, Plus, Download, Calendar, Building, User, Package } from 'lucide-react';

interface FSNRecord {
  fsn_id: number;
  fsn_enquiry_id: number;
  crm_enquiry_number: string;
  fsn_enquiry_date: string;
  fsn_num: string;
  fsn_date: string;
  fsn_organization_name: string;
  fsn_contact_name: string;
  fsn_target_date: string;
  fsn_required_delivery_schedules: string;
  fsn_test_procedures: string;
  created_on: string;  // Changed from created_at
  modified_on: string; // Changed from updated_at
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  products_count: number;
}

interface FilterOptions {
  status: string;
  dateFrom: string;
  dateTo: string;
  organization: string;
}

const FSNListPage = () => {
  const [fsnRecords, setFsnRecords] = useState<FSNRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedRecords, setSelectedRecords] = useState<number[]>([]);
  const recordsPerPage = 10;
  
  const [filters, setFilters] = useState<FilterOptions>({
    status: '',
    dateFrom: '',
    dateTo: '',
    organization: ''
  });

  const fetchFSNRecords = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: recordsPerPage.toString(),
        ...(searchTerm && { search: searchTerm }),
        ...(filters.status && { status: filters.status }),
        ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
        ...(filters.dateTo && { dateTo: filters.dateTo }),
        ...(filters.organization && { organization: filters.organization })
      });

      const response = await fetch(`/api/fsn/list?${params}`);
      const result = await response.json();

      if (result.success) {
        setFsnRecords(result.data);
        setTotalRecords(result.pagination.total);
        setTotalPages(result.pagination.totalPages);
      } else {
        console.error('Error:', result.error);
      }
    } catch (error) {
      console.error('Error fetching FSN records:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, filters]);

  useEffect(() => {
    fetchFSNRecords();
  }, [fetchFSNRecords]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      dateFrom: '',
      dateTo: '',
      organization: ''
    });
    setSearchTerm('');
  };

  const handleSelectRecord = (recordId: number) => {
    setSelectedRecords(prev => 
      prev.includes(recordId) 
        ? prev.filter(id => id !== recordId)
        : [...prev, recordId]
    );
  };

  const handleSelectAll = () => {
    const currentRecordIds = fsnRecords.map(record => record.fsn_id);
    setSelectedRecords(prev => 
      currentRecordIds.every(id => prev.includes(id))
        ? prev.filter(id => !currentRecordIds.includes(id))
        : [...prev, ...currentRecordIds.filter(id => !prev.includes(id))]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedRecords.length === 0) return;
    
    if (!confirm(`Delete ${selectedRecords.length} record(s)?`)) return;

    try {
      const response = await fetch('/api/fsn/list', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedRecords })
      });

      const result = await response.json();
      if (result.success) {
        setSelectedRecords([]);
        fetchFSNRecords();
        alert('Records deleted successfully');
      } else {
        alert('Error deleting records');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting records');
    }
  };

  // Fixed individual record deletion
  const handleDeleteRecord = async (recordId: number) => {
    if (!confirm('Delete this record?')) return;

    try {
      const response = await fetch('/api/fsn/list', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: [recordId] })
      });

      const result = await response.json();
      if (result.success) {
        fetchFSNRecords();
        alert('Record deleted successfully');
      } else {
        alert('Error deleting record');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting record');
    }
  };

  const getStatusBadge = (status: string) => {
    const config = {
      draft: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Draft' },
      submitted: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Submitted' },
      approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Approved' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' }
    }[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Draft' };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">FSN Records</h1>
        <div className="flex gap-2">
          <button
            onClick={() => window.location.href = '/fsn/add'}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New FSN
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search FSN records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              placeholder="From Date"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              placeholder="To Date"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="text"
              value={filters.organization}
              onChange={(e) => handleFilterChange('organization', e.target.value)}
              placeholder="Organization"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={clearFilters}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedRecords.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-blue-800 font-medium">
              {selectedRecords.length} selected
            </span>
            <button
              onClick={handleDeleteSelected}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-600">
          Showing {fsnRecords.length} of {totalRecords} records
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={fsnRecords.length > 0 && fsnRecords.every(record => selectedRecords.includes(record.fsn_id))}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">FSN Details</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Organization</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fsnRecords.map((record) => (
                <tr key={record.fsn_id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRecords.includes(record.fsn_id)}
                      onChange={() => handleSelectRecord(record.fsn_id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{record.fsn_num}</div>
                      <div className="text-gray-500">Enquiry: {record.crm_enquiry_number || 'N/A'}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900 flex items-center gap-1">
                        <Building className="w-4 h-4 text-gray-400" />
                        {record.fsn_organization_name || 'N/A'}
                      </div>
                      <div className="text-gray-500 flex items-center gap-1">
                        <User className="w-4 h-4 text-gray-400" />
                        {record.fsn_contact_name || 'N/A'}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm">
                      <div className="text-gray-900 flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        FSN: {formatDate(record.fsn_date)}
                      </div>
                      <div className="text-gray-500">Target: {formatDate(record.fsn_target_date)}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">{getStatusBadge(record.status)}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-900">
                      <Package className="w-4 h-4 text-gray-400" />
                      {record.products_count} items
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => window.location.href = `/fsn/view/${record.fsn_id}`}
                        className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded"
                        title="View FSN"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => window.location.href = `/fsn/edit/${record.fsn_id}`}
                        className="text-green-600 hover:text-green-800 p-1 hover:bg-green-50 rounded"
                        title="Edit FSN"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteRecord(record.fsn_id)}
                        className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded"
                        title="Delete FSN"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {fsnRecords.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No FSN records found</div>
            <p className="text-gray-400 mt-2">Try adjusting your search criteria or create a new FSN.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-600">Page {currentPage} of {totalPages}</div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            
            {/* Show page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const startPage = Math.max(1, currentPage - 2);
              const pageNum = startPage + i;
              
              if (pageNum > totalPages) return null;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 border rounded-md ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FSNListPage;