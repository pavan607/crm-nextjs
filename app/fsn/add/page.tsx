//app/fsn/add/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
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

interface ProductRaw {
  enquiry_product_id: number;
  crmtf_product_id: number;
  product_name: string;
  product_type: string;
  product_model_num: string;
  product_uom: string;
  crm_quantity: number;
}

interface Product {
  id: number;
  crmtf_product_id: number;
  product_name: string;
  product_type: string;
  product_model_num: string;
  product_uom: string;
  fsn_product_qty: number;
  fsn_feasibility: 'feasible' | 'feasible_with_deviations' | 'regretted' | '';
  fsn_bom_cost: number;
  fsn_comments: string;
  attachments: FileAttachment[];
  department_id?: number;
  employee_id?: number;
}

interface AvailableProduct {
  crmtf_product_id: number;
  product_name: string;
  product_type: string;
  product_model_num: string;
  product_uom: string;
}

interface FileAttachment {
  name: string;
  size: number;
  type: string;
  url: string;
}

interface FSNData {
  enquiry_number: string;
  fsn_enquiry_date: string;
  fsn_num: string;
  fsn_date: string;
  fsn_organization_name: string;
  fsn_contact_name: string;
  fsn_target_date: string;
  fsn_required_delivery_schedules: string;
  fsn_test_procedures: string;
}

const FSNPage = () => {
  const [fsnData, setFsnData] = useState<FSNData>({
    enquiry_number: '',
    fsn_enquiry_date: '',
    fsn_num: '',
    fsn_date: '',
    fsn_organization_name: '',
    fsn_contact_name: '',
    fsn_target_date: '',
    fsn_required_delivery_schedules: '',
    fsn_test_procedures: '',
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [availableProducts, setAvailableProducts] = useState<AvailableProduct[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<{ department_id: number; department_name: string }[]>([]);
  const [employees, setEmployees] = useState<{ employee_id: number; employee_first_name: string; employee_last_name: string }[]>([]);

  const feasibilityOptions = [
    { value: 'feasible' as const, label: 'Feasible', color: 'bg-green-500' },
    { value: 'feasible_with_deviations' as const, label: 'Feasible with Deviations', color: 'bg-yellow-500' },
    { value: 'regretted' as const, label: 'Regretted', color: 'bg-red-500' }
  ];

  // Date validation helper functions
  const getMinFsnDate = () => {
    return fsnData.fsn_enquiry_date || '';
  };

  const getMinTargetDate = () => {
    if (fsnData.fsn_date && fsnData.fsn_enquiry_date) {
      return fsnData.fsn_date >= fsnData.fsn_enquiry_date ? fsnData.fsn_date : fsnData.fsn_enquiry_date;
    } else if (fsnData.fsn_date) {
      return fsnData.fsn_date;
    } else if (fsnData.fsn_enquiry_date) {
      return fsnData.fsn_enquiry_date;
    }
    return '';
  };

  const validateDateOrder = (field: keyof FSNData, value: string) => {
    const updatedData = { ...fsnData, [field]: value };
    
    if (field === 'fsn_date' || field === 'fsn_enquiry_date') {
      if (updatedData.fsn_date && updatedData.fsn_enquiry_date) {
        if (updatedData.fsn_date < updatedData.fsn_enquiry_date) {
          return false;
        }
      }
    }
    
    if (field === 'fsn_target_date' || field === 'fsn_date' || field === 'fsn_enquiry_date') {
      if (updatedData.fsn_target_date) {
        if (updatedData.fsn_enquiry_date && updatedData.fsn_target_date < updatedData.fsn_enquiry_date) {
          return false;
        }
        if (updatedData.fsn_date && updatedData.fsn_target_date < updatedData.fsn_date) {
          return false;
        }
      }
    }
    
    return true;
  };

  // Fetch enquiries on component mount
  useEffect(() => {
    fetchEnquiries();
    fetchAvailableProducts();
    generateFSNNumber();
  }, []);

  // Fetch departments on component mount
  useEffect(() => {
    async function fetchDepartments() {
      try {
        const res = await fetch('/api/fsn/department_dropdown');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        // Ensure data is an array
        setDepartments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch departments', error);
        setDepartments([]);
      }
    }
    fetchDepartments();
  }, []);

  // When department changes, fetch employees
  useEffect(() => {
    const deptId = editingProduct?.department_id;
    if (!deptId) {
      setEmployees([]);
      return;
    }
    
    async function fetchEmployees() {
      try {
        const res = await fetch(`/api/fsn/employee_dropdown/?departmentId=${deptId}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        // Ensure data is an array and handle API errors
        if (data.error) {
          throw new Error(data.error);
        }
        setEmployees(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch employees', error);
        setEmployees([]);
      }
    }
    
    fetchEmployees();
  }, [editingProduct?.department_id]);

  // Handler when department dropdown changes
  const handleDepartmentChange = (deptId: number) => {
    setEditingProduct(prev => prev ? { ...prev, department_id: deptId, employee_id: undefined } : null);
  };

  // Handler when employee dropdown changes
  const handleEmployeeChange = (empId: number) => {
    setEditingProduct(prev => prev ? { ...prev, employee_id: empId } : null);
  };

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('/api/fsn/enquiry_dropdown');
      console.log('Enquiries response:', response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: Enquiry[] = await response.json();
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      setEnquiries([]);
    }
  };

  const fetchAvailableProducts = async () => {
    try {
      const response = await fetch('/api/fsn/products');
      console.log('Available products response:', response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setAvailableProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setAvailableProducts([]);
    }
  };

  const generateFSNNumber = async () => {
    try {
      const response = await fetch('/api/fsn/generate-fsn-num');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFsnData(prev => ({ ...prev, fsn_num: data.fsn_num }));
    } catch (error) {
      console.error('Error generating FSN number:', error);
    }
  };

  const handleEnquiryChange = async (enquiryId: string) => {
    if (!enquiryId) {
      setFsnData(prev => ({
        ...prev,
        enquiry_number: '',
        fsn_enquiry_date: '',
        fsn_organization_name: '',
        fsn_customer_name: '',
        fsn_date: '',
        fsn_target_date: '',
      }));
      setProducts([]);
      return;
    }
    
    setLoading(true);
    try {
      // Fetch enquiry details
      const response = await fetch(`/api/fsn/enquiries/${enquiryId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch enquiry: ${response.status}`);
      }
      
      const enquiryData = await response.json();
      console.log('Enquiry data received:', enquiryData);
      
      // Update FSN data with enquiry information
      setFsnData(prev => ({
        ...prev,
        enquiry_number: enquiryId,
        fsn_enquiry_date: enquiryData.created_on ? new Date(enquiryData.created_on).toISOString().split('T')[0] : '',
        fsn_organization_name: enquiryData.crm_organization_name || '',
        fsn_contact_name: enquiryData.crm_contact_name || '',
        fsn_date: '',
        fsn_target_date: '',
      }));

      // Fetch products for this enquiry
      const productsResponse = await fetch(`/api/fsn/enquiries/${enquiryId}/products`);
      
      if (!productsResponse.ok) {
        throw new Error(`Failed to fetch products: ${productsResponse.status}`);
      }
      
      const productsData = await productsResponse.json();
      console.log('Products data received:', productsData);
      
      // Format products data
      const formattedProducts: Product[] = (Array.isArray(productsData) ? productsData : []).map((product: ProductRaw) => ({
        id: product.enquiry_product_id,
        crmtf_product_id: product.crmtf_product_id,
        product_name: product.product_name,
        product_type: product.product_type,
        product_model_num: product.product_model_num,
        product_uom: product.product_uom,
        fsn_product_qty: product.crm_quantity,
        fsn_feasibility: '',
        fsn_bom_cost: 0,
        fsn_comments: '',
        attachments: []
      }));

      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching enquiry data:', error);
      alert('Failed to load enquiry data. Please try again.');
      
      setFsnData(prev => ({
        ...prev,
        enquiry_number: '',
        fsn_enquiry_date: '',
        customer_name: '',
        crm_contact_name: '',
        fsn_date: '',
        fsn_target_date: '',
      }));
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof FSNData, value: string) => {
    if (field === 'fsn_date' || field === 'fsn_target_date') {
      if (!validateDateOrder(field, value)) {
        let errorMessage = '';
        if (field === 'fsn_date') {
          errorMessage = 'FSN date must be greater than or equal to enquiry date';
        } else if (field === 'fsn_target_date') {
          errorMessage = 'FSN target date must be greater than or equal to both enquiry date and FSN date';
        }
        alert(errorMessage);
        return;
      }
    }

    setFsnData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
    setIsEditModalOpen(true);
  };

  const handleSaveProductEdit = () => {
    if (!editingProduct) return;
    
    setProducts(prev => prev.map(p => 
      p.id === editingProduct.id ? editingProduct : p
    ));
    setIsEditModalOpen(false);
    setEditingProduct(null);
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
      attachments: [...prev.attachments, ...fileList]
    }) : null);
  };

  const removeAttachment = (index: number) => {
    if (!editingProduct) return;
    
    setEditingProduct(prev => prev ? ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }) : null);
  };

  // Updated handleSubmitFSN function for the React component
const handleSubmitFSN = async () => {
  try {
    setLoading(true);
    
    // Validate required fields
    if (!fsnData.enquiry_number) {
      alert('Please select an enquiry number');
      return;
    }

    if (!fsnData.fsn_num) {
      alert('FSN number is missing');
      return;
    }

    if (products.length === 0) {
      alert('Please add at least one product');
      return;
    }

    // Check if all products have required fields
    // const incompleteProducts = products.filter(p => 
    //   !p.fsn_feasibility || p.fsn_bom_cost === undefined || p.fsn_bom_cost === null
    // );
    
    // if (incompleteProducts.length > 0) {
    //   alert('Please complete all product details (feasibility and BOM cost are required)');
    //   return;
    // }

    const payload = {
      // Use the correct field names that match the API
      enquiry_number: fsnData.enquiry_number, 
      fsn_enquiry_date: fsnData.fsn_enquiry_date,
      fsn_num: fsnData.fsn_num,
      fsn_date: fsnData.fsn_date,
      fsn_organization_name: fsnData.fsn_organization_name,
      fsn_contact_name: fsnData.fsn_contact_name,
      fsn_target_date: fsnData.fsn_target_date,
      fsn_required_delivery_schedules: fsnData.fsn_required_delivery_schedules,
      fsn_test_procedures: fsnData.fsn_test_procedures,
      products: products.map(p => ({
        crmtf_product_id: p.crmtf_product_id,
        fsn_product_qty: p.fsn_product_qty,
        feasibility: p.fsn_feasibility, 
        bom_cost: p.fsn_bom_cost, 
        fsn_comments: p.fsn_comments,
        attachments: p.attachments || []
      }))
    };

    console.log('Submitting FSN payload:', payload); // For debugging

    const response = await fetch('/api/fsn/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const result = await response.json();
      alert('FSN saved successfully!');
      console.log('FSN created with ID:', result.fsnId);
      
      // Optionally redirect or reset the form
      window.location.href = '/fsn/list'; // Redirect to FSN list page
    } else {
      const error = await response.json();
      throw new Error(error.error || 'Failed to save FSN');
    }
  } catch {
  // No console.error — just alert
  alert('Failed to create FSN');
} finally {
  setLoading(false);
}
};

  const getFeasibilityColor = (feasibility: string) => {
    const option = feasibilityOptions.find(opt => opt.value === feasibility);
    return option ? option.color : 'bg-gray-500';
  };

  return (
    <div className="container text-sm">
  <h1 className="text-xl font-semibold text-gray-900 mb-2">Feasibility Study Note (FSN)</h1>

  <div className="space-y-2">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Enquiry Number *
        </label>
        <select
          value={fsnData.enquiry_number}
          onChange={(e) => handleEnquiryChange(e.target.value)}
          disabled={loading}
          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
        >
          <option value="" disabled>Select Enquiry</option>
          {enquiries.map((enquiry) => (
            <option
              key={enquiry.crm_enquiry_id}
              value={enquiry.crm_enquiry_id.toString()}
            >
              {enquiry.crm_enquiry_number}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Enquiry Date</label>
        <input
          type="date"
          value={fsnData.fsn_enquiry_date}
          onChange={(e) => handleInputChange('fsn_enquiry_date', e.target.value)}
          disabled
          className="w-full px-2 py-1 border border-gray-300 rounded-md bg-gray-100 text-gray-500 text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">FSN Date</label>
        <input
          type="date"
          value={fsnData.fsn_date || ''}
          min={getMinFsnDate()}
          onChange={(e) => handleInputChange('fsn_date', e.target.value)}
          disabled={!fsnData.fsn_enquiry_date}
          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Organization Name</label>
        <input
          value={fsnData.fsn_organization_name}
          onChange={(e) => handleInputChange('fsn_organization_name', e.target.value)}
          readOnly
          className="w-full px-2 py-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Contact Name</label>
        <input
          value={fsnData.fsn_contact_name}
          onChange={(e) => handleInputChange('fsn_contact_name', e.target.value)}
          readOnly
          className="w-full px-2 py-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">FSN Target Date</label>
        <input
          type="date"
          value={fsnData.fsn_target_date}
          min={getMinTargetDate()}
          onChange={(e) => handleInputChange('fsn_target_date', e.target.value)}
          disabled={!fsnData.fsn_enquiry_date}
          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
        />
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
          <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {products.map((product) => (
          <tr key={product.id}>
            <td className="px-2 py-1 whitespace-nowrap font-medium text-gray-900">{product.product_name}</td>
            <td className="px-2 py-1 whitespace-nowrap text-gray-500">{product.product_type}</td>
            <td className="px-2 py-1 whitespace-nowrap text-gray-500">{product.fsn_product_qty}</td>
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
            <td colSpan={4} className="px-2 py-2 text-center text-gray-500">
              {fsnData.enquiry_number
                ? 'No products found for this enquiry'
                : 'Please select an enquiry to view products'}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

    </div>

    <div className="flex justify-center gap-2 pt-6">
      <button
        type="button"
        onClick={handleSubmitFSN}
        disabled={loading || !fsnData.enquiry_number}
        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Saving...' : 'Save FSN'}
      </button>
      <button
        type="button"
        onClick={() => (window.location.href = '/fsn/list/')}
        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition text-sm font-medium"
      >
        Cancel
      </button>

      
    </div>
  </div>

  {isEditModalOpen && editingProduct && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-3 w-full max-w-md m-4 max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-base font-semibold">Add FSN Details</h2>
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-2">
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
              <label className="block font-medium mb-1">Product Quantity</label>
              <input
                type="number"
                value={editingProduct.fsn_product_qty}
                readOnly
                className="w-full px-2 py-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Department</label>
            <select
              value={editingProduct?.department_id ?? ''}
              onChange={e => handleDepartmentChange(Number(e.target.value))}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="" disabled={true}
              >Select Department</option>
              {departments.map(dept => (
                <option key={dept.department_id} value={dept.department_id}>
                  {dept.department_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Employee</label>
            <select
              value={editingProduct?.employee_id ?? ''}
              onChange={e => handleEmployeeChange(Number(e.target.value))}
              disabled={!editingProduct?.department_id}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="" disabled={true}
                >Select Employee</option>
              {employees.map(emp => (
                <option key={emp.employee_id} value={emp.employee_id}>
                  {emp.employee_first_name} {emp.employee_last_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Marketing Comments</label>
            <textarea
              value={editingProduct.fsn_comments}
              onChange={(e) =>
                setEditingProduct((prev) =>
                  prev ? { ...prev, fsn_comments: e.target.value } : null
                )
              }
              rows={3}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Attachments</label>
            <div className="space-y-1">
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
                      className="flex items-center justify-between bg-gray-50 p-1 rounded"
                    >
                      <span className="text-xs">{file.name}</span>
                      <button
                        onClick={() => removeAttachment(index)}
                        className="text-red-500 hover:text-red-700
"
                                                  >
                          <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-2 pt-2">
            
            <button
              type="button"
              onClick={handleSaveProductEdit}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition text-sm font-medium"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition text-sm font-medium"
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

export default FSNPage;