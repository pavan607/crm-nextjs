'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Edit, X } from 'lucide-react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

// Define interfaces
interface Enquiry {
  crm_enquiry_id: number;
  crm_enquiry_number: string;
  crm_opportunity_name: string;
  crm_organization_name?: string;
  crm_contact_name?: string;
  created_on?: string;
}

interface Product {
  fsn_product_id: number;
  crmtf_product_id: number;
  product_name: string;
  product_type: string;
  product_model_num: string;
  product_uom: string;
  fsn_product_qty: number;
  fsn_product_feasibility: 'feasible' | 'feasible_with_deviations' | 'regretted' | '';
  fsn_product_bom_cost: number;
  fsn_product_comments: string;
  attachments: FileAttachment[];
  // Removed department_id and employee_id fields
  // Add fields for tracking changes
  hasChanges?: boolean;
}

interface FileAttachment {
  name: string;
  size: number;
  type: string;
  url: string;
}

interface FSNData {
  fsn_id: number;
  enquiry_number: string;
  fsn_enquiry_date: string;
  fsn_num: string;
  fsn_date: string;
  fsn_organization_name: string;
  fsn_contact_name: string;
  fsn_target_date: string;
  fsn_required_delivery_schedules: string;
  fsn_test_procedures: string;
  fsn_status: string;
  fsn_flag_status: number;
}

const FSNEditPage = () => {
  const params = useParams();
  const fsnId = params.Id as string;
  console.log('FSNEditPage rendered with fsnId:', fsnId);
  const [mounted, setMounted] = useState(false);
  const [fsnData, setFsnData] = useState<FSNData>({
    fsn_id: 0,
    enquiry_number: '',
    fsn_enquiry_date: '',
    fsn_num: '',
    fsn_date: '',
    fsn_organization_name: '',
    fsn_contact_name: '',
    fsn_target_date: '',
    fsn_required_delivery_schedules: '',
    fsn_test_procedures: '',
    fsn_status: 'draft',
    fsn_flag_status: 0,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]); // Store original data
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const feasibilityOptions = [
    { value: 'feasible' as const, label: 'Feasible', color: 'bg-green-500' },
    { value: 'feasible_with_deviations' as const, label: 'Feasible with Deviations', color: 'bg-yellow-500' },
    { value: 'regretted' as const, label: 'Regretted', color: 'bg-red-500' }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch FSN data and products
  useEffect(() => {
    if (!mounted || !fsnId) return;
    fetchFSNData();
  }, [mounted, fsnId]);

  const fetchFSNData = async () => {
  if (!fsnId) return;
  
  setLoading(true);
  try {
    // Fetch FSN main data
    const fsnResponse = await fetch(`/api/fsn/technical/edit/${fsnId}`);
    console.log('Fetching FSN data for ID:', fsnId);
    if (!fsnResponse.ok) {
      throw new Error(`Failed to fetch FSN: ${fsnResponse.status}`);
    }
    
    const fsnResult = await fsnResponse.json();
    
    // Format dates for input fields
    const formatDateForInput = (dateString: string) => {
      if (!dateString) return '';
      try {
        return new Date(dateString).toISOString().split('T')[0];
      } catch {
        return '';
      }
    };
    
    setFsnData({
      fsn_id: fsnResult.fsn_id,
      enquiry_number: fsnResult.enquiry_id?.toString() || '',
      fsn_enquiry_date: formatDateForInput(fsnResult.enquiry_date),
      fsn_num: fsnResult.fsn_num || '',
      fsn_date: formatDateForInput(fsnResult.fsn_date),
      fsn_organization_name: fsnResult.fsn_organization_name || '',
      fsn_contact_name: fsnResult.fsn_contact_name || '',
      fsn_target_date: formatDateForInput(fsnResult.fsn_target_date),
      fsn_required_delivery_schedules: fsnResult.fsn_required_delivery_schedules || '',
      fsn_test_procedures: fsnResult.fsn_test_procedures || '',
      fsn_status: fsnResult.fsn_status || 'draft',
      fsn_flag_status: fsnResult.fsn_flag_status || 0,
    });
    console.log('Fetched FSN data:', fsnResult);
    
    // Fetch FSN products
    const productsResponse = await fetch(`/api/fsn/technical/edit/${fsnResult.fsn_id}/products`);
    console.log('Fetching products for FSN ID:', fsnResult.fsn_id);
    if (!productsResponse.ok) {
      throw new Error(`Failed to fetch products: ${productsResponse.status}`);
    }
    
    const productsData = await productsResponse.json();
    console.log('Fetched products data:', productsData);
    
    // Transform products for display - preserve actual database values
    const displayProducts = Array.isArray(productsData) ? productsData.map((product: any) => ({
      ...product,
      // Preserve actual database values, convert null/undefined to appropriate defaults
      fsn_product_bom_cost: product.fsn_product_bom_cost || 0,
      fsn_product_feasibility: product.fsn_product_feasibility || '', // Empty string will show "Not Set"
      fsn_product_comments: product.fsn_product_comments || '', // Preserve actual comments from database
      hasChanges: false
    })) : [];
    
    setProducts(displayProducts);
    setOriginalProducts(productsData); // Store original data
    
  } catch (error) {
    console.error('Error fetching FSN data:', error);
    alert('Failed to load FSN data. Please try again.');
  } finally {
    setLoading(false);
  }
};

  const handleInputChange = (field: keyof FSNData, value: string) => {
    setFsnData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
    setIsEditModalOpen(true);
  };

  // Modified to only update local state, not database
  const handleSaveProductEdit = async () => {
    if (!editingProduct) return;
    
    try {
      // Update local state only - mark as having changes
      setProducts(prev => prev.map(p => 
        p.fsn_product_id === editingProduct.fsn_product_id ? 
        { ...editingProduct, hasChanges: true } : p
      ));
      
      setIsEditModalOpen(false);
      setEditingProduct(null);
      alert('Product changes saved locally. Click "Update FSN" to save to database.');
      
    } catch (error) {
      console.error('Error saving product changes:', error);
      alert('Failed to save product changes.');
    }
  };

  const handleAttachmentUpload = (files: FileList | null) => {
    if (!files || !editingProduct) return;
    
    const fileList = Array.from(files).map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    }));
    
    setEditingProduct(prev => prev ? ({
      ...prev,
      attachments: [...(prev.attachments || []), ...fileList]
    }) : null);
  };

  const removeAttachment = (index: number) => {
    if (!editingProduct) return;
    
    setEditingProduct(prev => prev ? ({
      ...prev,
      attachments: (prev.attachments || []).filter((_, i) => i !== index)
    }) : null);
  };

  const handleSaveFSNClick = () => {
    if (!fsnData.fsn_num) {
      alert('FSN number is missing');
      return;
    }

    if (products.length === 0) {
      alert('Please add at least one product');
      return;
    }

    // Check if any products have required fields filled
    const hasValidProducts = products.some(p => 
      p.fsn_product_feasibility && 
      p.fsn_product_comments?.trim()
    );

    if (!hasValidProducts) {
      alert('Please complete at least one product with feasibility and comments');
      return;
    }

    setShowConfirmDialog(true);
  };

  const handleSubmitFSN = async (sendToTechnical: boolean) => {
    try {
      setLoading(true);
      setShowConfirmDialog(false);

      // First update FSN data
      const fsnPayload = {
        fsn_enquiry_date: fsnData.fsn_enquiry_date,
        fsn_date: fsnData.fsn_date,
        fsn_organization_name: fsnData.fsn_organization_name,
        fsn_contact_name: fsnData.fsn_contact_name,
        fsn_target_date: fsnData.fsn_target_date,
        fsn_required_delivery_schedules: fsnData.fsn_required_delivery_schedules,
        fsn_test_procedures: fsnData.fsn_test_procedures,
        send_to_technical: sendToTechnical,
      };

      const fsnResponse = await fetch(`/api/fsn/technical/edit/${fsnData.fsn_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fsnPayload),
      });

      if (!fsnResponse.ok) {
        const error = await fsnResponse.json();
        throw new Error(error.error || 'Failed to update FSN');
      }

      // Update all products that have changes
      const productUpdatePromises = products
        .filter(product => product.hasChanges)
        .map(async (product) => {
          const response = await fetch(`/api/fsn/technical/edit/${fsnData.fsn_id}/products/${product.fsn_product_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fsn_product_qty: product.fsn_product_qty,
              fsn_product_feasibility: product.fsn_product_feasibility,
              fsn_product_bom_cost: product.fsn_product_bom_cost,
              fsn_product_comments: product.fsn_product_comments,
              attachments: product.attachments || []
            }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(`Failed to update product ${product.product_name}: ${error.error}`);
          }

          return response.json();
        });

      // Wait for all product updates to complete
      await Promise.all(productUpdatePromises);

      const message = sendToTechnical 
        ? 'FSN and products submitted to technical department successfully!'
        : 'FSN and products updated successfully!';
      
      alert(message);
      
      if (typeof window !== 'undefined') {
        window.location.href = '/fsn/list';
      }

    } catch (error) {
      console.error('FSN update failed:', error);
      alert(`Failed to update FSN: ${typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const getFeasibilityColor = (feasibility: string) => {
    const option = feasibilityOptions.find(opt => opt.value === feasibility);
    return option ? option.color : 'bg-gray-500';
  };

  const getFeasibilityLabel = (feasibility: string) => {
    const option = feasibilityOptions.find(opt => opt.value === feasibility);
    return option ? option.label : 'Not Set';
  };

  if (!mounted) {
    return (
      <div className="container text-sm">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Edit Feasibility Study Note (FSN)</h1>
        <div className="flex justify-center py-8">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container text-sm">
      <h1 className="text-xl font-semibold text-gray-900 mb-2">Edit Feasibility Study Note (FSN)</h1>

      <div className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">FSN Number</label>
            <input
              value={fsnData.fsn_num}
              readOnly
              className="w-full px-2 py-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Enquiry Date</label>
            <input
              type="date"
              value={fsnData.fsn_enquiry_date}
              onChange={(e) => handleInputChange('fsn_enquiry_date', e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">FSN Date</label>
            <input
              type="date"
              value={fsnData.fsn_date}
              onChange={(e) => handleInputChange('fsn_date', e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Organization Name</label>
            <input
              value={fsnData.fsn_organization_name}
              onChange={(e) => handleInputChange('fsn_organization_name', e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Contact Name</label>
            <input
              value={fsnData.fsn_contact_name}
              onChange={(e) => handleInputChange('fsn_contact_name', e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">FSN Target Date</label>
            <input
              type="date"
              value={fsnData.fsn_target_date}
              onChange={(e) => handleInputChange('fsn_target_date', e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs text-white ${
                fsnData.fsn_status === 'draft' ? 'bg-gray-500' :
                fsnData.fsn_status === 'submitted' ? 'bg-blue-500' :
                fsnData.fsn_status === 'approved' ? 'bg-green-500' :
                fsnData.fsn_status === 'rejected' ? 'bg-red-500' : 'bg-gray-500'
              }`}>
                {fsnData.fsn_status?.toUpperCase() || 'DRAFT'}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs text-white ${
                fsnData.fsn_flag_status === 0 ? 'bg-purple-500' : 'bg-orange-500'
              }`}>
                {fsnData.fsn_flag_status === 0 ? 'MARKETING' : 'R&D'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Required Delivery Schedules</label>
            <textarea
              value={fsnData.fsn_required_delivery_schedules}
              onChange={(e) => handleInputChange('fsn_required_delivery_schedules', e.target.value)}
              rows={2}
              placeholder="Enter delivery schedule requirements..."
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Test Procedures</label>
            <textarea
              value={fsnData.fsn_test_procedures}
              onChange={(e) => handleInputChange('fsn_test_procedures', e.target.value)}
              rows={2}
              placeholder="Enter test procedures..."
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-semibold text-gray-900">Product List</h3>
          </div>

          <div className="border rounded overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                    <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider">Feasibility</th>
                    <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider">BOM Cost</th>
                    <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.fsn_product_id} className={product.hasChanges ? 'bg-yellow-50' : ''}>
                      <td className="px-2 py-1 whitespace-nowrap font-medium text-gray-900">
                        {product.product_name}
                        {product.hasChanges && <span className="ml-1 text-xs text-orange-600">●</span>}
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap text-gray-500">{product.product_type}</td>
                      <td className="px-2 py-1 whitespace-nowrap text-gray-500">{product.fsn_product_qty}</td>
                      <td className="px-2 py-1 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs text-white ${getFeasibilityColor(product.fsn_product_feasibility)}`}>
                          {getFeasibilityLabel(product.fsn_product_feasibility)}
                        </span>
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap text-gray-500">
                        {product.fsn_product_bom_cost > 0 ? `₹${product.fsn_product_bom_cost.toLocaleString()}` : '-'}
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap font-medium">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="flex items-center text-blue-600 hover:text-blue-800 px-1 py-0.5 rounded hover:bg-blue-50"
                          title="Edit Product"
                        >
                          <PencilIcon className="h-3 w-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && !loading && (
                    <tr>
                      <td colSpan={6} className="px-2 py-2 text-center text-gray-500">
                        No products found for this FSN
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {products.some(p => p.hasChanges) && (
            <div className="mt-2 text-xs text-orange-600 flex items-center">
              <span className="mr-1">●</span>
              Products with changes (will be saved when FSN is updated)
            </div>
          )}
        </div>

        <div className="flex justify-center gap-2 pt-6">
          <button
            type="button"
            onClick={handleSaveFSNClick}
            disabled={loading || !fsnData.fsn_num}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update FSN'}
          </button>
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.href = '/fsn/list/';
              }
            }}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md m-4">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Update FSN Status
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Choose "Submit to Technical" to send to R&D department or "Save Draft" to keep in Marketing.
                {products.some(p => p.hasChanges) && (
                  <span className="block mt-2 text-orange-600">
                    Product changes will also be saved to database.
                  </span>
                )}
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleSubmitFSN(true)}
                  disabled={loading}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Submit to Technical'}
                </button>
                <button
                  onClick={() => handleSubmitFSN(false)}
                  disabled={loading}
                  className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : 'Save Draft'}
                </button>
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  disabled={loading}
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditModalOpen && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-lg m-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Edit Product Details</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1">Product Name</label>
                  <input
                    type="text"
                    value={editingProduct?.product_name || ''}
                    readOnly
                    className="w-full px-2 py-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Product Type</label>
                  <input
                    type="text"
                    value={editingProduct?.product_type || ''}
                    readOnly
                    className="w-full px-2 py-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1">Product Quantity</label>
                  <input
                    type="number"
                    value={editingProduct.fsn_product_qty}
                    onChange={(e) =>
                      setEditingProduct(prev => prev ? { ...prev, fsn_product_qty: Number(e.target.value) } : null)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">BOM Cost (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.fsn_product_bom_cost}
                    onChange={(e) =>
                      setEditingProduct(prev => prev ? { ...prev, fsn_product_bom_cost: Number(e.target.value) } : null)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Feasibility <span className="text-red-500">*</span>
                </label>
                <select
                  value={editingProduct.fsn_product_feasibility}
                  onChange={(e) =>
                    setEditingProduct(prev => prev ? { ...prev, fsn_product_feasibility: e.target.value as any } : null)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Feasibility</option>
                  {feasibilityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Comments <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={editingProduct.fsn_product_comments}
                  onChange={(e) =>
                    setEditingProduct((prev) =>
                      prev ? { ...prev, fsn_product_comments: e.target.value } : null
                    )
                  }
                  rows={3}
                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Attachments</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleAttachmentUpload(e.target.files)}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md cursor-pointer"
                  />
                  {editingProduct.attachments?.length > 0 && (
                    <div className="space-y-1">
                      {editingProduct.attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-2 rounded"
                        >
                          <span className="text-xs">{file.name}</span>
                          <button
                            onClick={() => removeAttachment(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleSaveProductEdit}
                  disabled={
                    !editingProduct?.fsn_product_comments?.trim() ||
                    !editingProduct?.fsn_product_feasibility
                  }
                  className={`px-6 py-2 rounded transition text-sm font-medium ${
                    !editingProduct?.fsn_product_comments?.trim() ||
                    !editingProduct?.fsn_product_feasibility
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {loading ? 'Updating...' : 'Update Product'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FSNEditPage;