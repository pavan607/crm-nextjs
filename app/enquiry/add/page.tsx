//app/enquiry/add/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Trash2 } from "lucide-react";
import { useEmployeeSession } from '../../hooks/useEmployeeSession'; 

type Employee = {
  employee_id: number;
  employee_first_name: string;
  employee_last_name: string;
};

type Product = {
  product_id: number;          
  product_name: string;        
  product_code: string;        
  product_type: string;        
  product_model_number: string; 
  product_uom: string;         
};

type EnquiryProduct = {
  id: string;
  product_id: number;          
  product_name: string;
  product_code: string;
  product_type: string;
  product_model_number: string;
  product_uom: string;
  enquiry_product_quantity: number;  
  enquiry_product_price: number;     
};

type FormDataType = {
  opportunityName: string;
  contactName: string;
  type: string;
  leadSource: string;
  assignedTo: string;
  campaignSource: string;
  weightedRevenue: string;
  organizationName: string;
  amount: string;
  expectedCloseDate: string;
  nextStep: string;
  salesStage: string;
  probability: string;
  description: string;
  attachments: File[];
  comment: string;
};

const InlineField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-2 flex-1 min-w-0">
    <label className="whitespace-nowrap w-40 font-medium">{label}:</label>
    <div className="flex-grow min-w-0">{children}</div>
  </div>
);

const ProductModal = ({
  isOpen,
  onClose,
  onSave,
  products,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: EnquiryProduct) => void;
  products: Product[];
}) => {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
    // FIX: Convert productId to number before comparison
    const product = products.find(p => p.product_id === parseInt(productId, 10));
    setSelectedProduct(product || null);
  };

  const handleSave = () => {
    if (!selectedProduct || quantity <= 0 || price <= 0) {
      alert('Please fill in all required fields with valid values');
      return;
    }

    const enquiryProduct: EnquiryProduct = {
      id: Date.now().toString(),
      product_id: selectedProduct.product_id,              
      product_name: selectedProduct.product_name,          
      product_code: selectedProduct.product_code,          
      product_type: selectedProduct.product_type,          
      product_model_number: selectedProduct.product_model_number, 
      product_uom: selectedProduct.product_uom,            
      enquiry_product_quantity: quantity,                  
      enquiry_product_price: price,                        
    };

    onSave(enquiryProduct);
    handleClose();
  };

  const handleClose = () => {
    setSelectedProductId('');
    setQuantity(1);
    setPrice(0);
    setSelectedProduct(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Product</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {/* Product Name Dropdown */}
          <div>
            <label className="block font-medium mb-1 text-sm">Product Name*</label>
            <select
              value={selectedProductId}
              onChange={(e) => handleProductSelect(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">-- Select Product --</option>
              {products
                .filter(product => product && product.product_id != null) // Filter out invalid products
                .map((product) => (
                  <option key={product.product_id} value={product.product_id.toString()}> 
                    {product.product_name || 'Unnamed Product'}  
                  </option>
                ))}
            </select>
          </div>

          {/* Product Details Inputs all inline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium mb-1 text-sm">Code</label>
              <input
                type="text"
                value={selectedProduct?.product_code || ''}
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-sm"
                disabled
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm">Type</label>
              <input
                type="text"
                value={selectedProduct?.product_type || ''}
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-sm"
                disabled
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm">Model</label>
              <input
                type="text"
                value={selectedProduct?.product_model_number || ''}
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-sm"
                disabled
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm">UOM</label>
              <input
                type="text"
                value={selectedProduct?.product_uom || ''}
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-sm"
                disabled
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm">Quantity*</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                min="1"
                required
                placeholder="Quantity"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm">Price*</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                min="0"
                step="0.01"
                required
                placeholder="Unit Price"
              />
            </div>
          </div>

          {/* Total only if valid */}
          {quantity > 0 && price > 0 && (
            <div className="mt-2 text-sm text-blue-700 bg-blue-50 rounded p-2">
              Total: Rs {(quantity * price).toFixed(2)}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-1 justify-end mt-4 pt-3">
          <button
            type="button"
            onClick={handleClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1.5 rounded text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!selectedProduct || quantity <= 0 || price <= 0}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-1.5 rounded text-sm"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

const LeadForm = () => {
  const { employee, loading: sessionLoading, requireAuth } = useEmployeeSession();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [enquiryProducts, setEnquiryProducts] = useState<EnquiryProduct[]>([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  const [formData, setFormData] = useState<FormDataType>({
    opportunityName: '',
    contactName: '',
    type: '',
    leadSource: '',
    assignedTo: '',
    campaignSource: '',
    weightedRevenue: '',
    organizationName: '',
    amount: '',
    expectedCloseDate: '',
    nextStep: '',
    salesStage: '',
    probability: '',
    description: '',
    attachments: [],
    comment: '',
  });

  useEffect(() => {
    setMounted(true);
    
    // Check if user is authenticated
    if (!sessionLoading && !requireAuth()) {
      return;
    }
    
    fetch('/api/enquiry/employee_dropdown')
      .then(res => res.json())
      .then((data: Employee[]) => setEmployees(data))
      .catch(err => console.error('Failed to load employees:', err));

    fetch('/api/enquiry/product_dropdown')
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch(err => console.error('Failed to load products:', err));
  }, [sessionLoading, requireAuth]);

  const renderBreadcrumb = () => {
    if (!mounted) return null;
    
    return (
      <div className="text-sm">
        <Link 
          href="/enquiry/list" 
          className="text-blue-600 hover:underline"
        >
          All
        </Link>
        <span className="mx-2 text-gray-500">→</span>
        <Link 
          href="/enquiry/add" 
          className="text-blue-600 hover:underline"
        >
          Add
        </Link>
      </div>
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, attachments: Array.from(e.target.files) });
    }
  };

  const handleAddProduct = (product: EnquiryProduct) => {
    setEnquiryProducts([...enquiryProducts, product]);
  };

  const handleProductChange = (
    index: number,
    field: 'enquiry_product_quantity' | 'enquiry_product_price',
    value: number
  ) => {
    const updatedProducts = [...enquiryProducts];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value,
    };
    setEnquiryProducts(updatedProducts);
  };

  const handleRemoveProduct = (id: string) => {
    setEnquiryProducts(enquiryProducts.filter(p => p.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!employee) {
      alert('Session expired. Please login again.');
      router.push('/login');
      return;
    }

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'attachments') {
          payload.append(key, value as string);
        }
      });

      formData.attachments.forEach(file => {
        payload.append('attachments', file);
      });

      // Add products data
      payload.append('products', JSON.stringify(enquiryProducts));

      // Add the logged-in employee's ID as created_by
      payload.append('createdBy', employee.employee_id.toString());

      const response = await fetch('/api/enquiry/add', {
        method: 'POST',
        body: payload,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to create lead: ${errorData.error}`);
        return;
      }

      const result = await response.json();
      alert(`Lead created successfully with ID: ${result.leadId}`);

      setFormData({
        opportunityName: '',
        contactName: '',
        type: '',
        leadSource: '',
        assignedTo: '',
        campaignSource: '',
        weightedRevenue: '',
        organizationName: '',
        amount: '',
        expectedCloseDate: '',
        nextStep: '',
        salesStage: '',
        probability: '',
        description: '',
        attachments: [],
        comment: '',
      });
      setEnquiryProducts([]);
    } catch (error) {
      console.error('Submit error:', error);
      alert('An error occurred while creating the lead.');
    }
  };

  const handleCancel = () => {
    setFormData({
      opportunityName: '',
      contactName: '',
      type: '',
      leadSource: '',
      assignedTo: '',
      campaignSource: '',
      weightedRevenue: '',
      organizationName: '',
      amount: '',
      expectedCloseDate: '',
      nextStep: '',
      salesStage: '',
      probability: '',
      description: '',
      attachments: [],
      comment: '',
    });
    setEnquiryProducts([]);
    router.push('/enquiry/list');
  };

  // Show loading while checking authentication
  if (sessionLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="mt-2">
      {/* Breadcrumb in top left corner */}
      <div className="mb-2 ml-4">
        {renderBreadcrumb()}
      </div>
      
      <div className="max-w-4xl mx-auto text-sm">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-bold">Enquiry</h1>
          <button
            type="button"
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
            onClick={() => router.push('/enquiry/list')}
          >
            Back to List
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          {/* Row 1 */}
          <div className="flex gap-4">
            <InlineField label="Enquiry Name">
              <input
                type="text"
                name="opportunityName"
                value={formData.opportunityName}
                onChange={handleChange}
                className="w-full border rounded p-1 min-w-0 text-sm"
                required
              />
            </InlineField>

            <InlineField label="Contact Name">
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                className="w-full border rounded p-1 min-w-0 text-sm"
                required
              />
            </InlineField>
          </div>

          {/* Row 2 */}
          <div className="flex gap-4">
            <InlineField label="Type">
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border rounded p-1 min-w-0 text-sm" required
              >
                <option value="">-- Select Type --</option>
                <option value="New Business">New Business</option>
                <option value="Existing Business">Existing Business</option>
              </select>
            </InlineField>

            <InlineField label="Lead Source">
              <select
                name="leadSource"
                value={formData.leadSource}
                onChange={handleChange}
                className="w-full border rounded p-1 min-w-0 text-sm" required
              >
                <option value="">-- Select Source --</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Existing Customer">Existing Customer</option>
                <option value="Self Generated">Self Generated</option>
                <option value="Employee">Employee</option>
                <option value="Partner">Partner</option>
                <option value="Public Relations">Public Relations</option>
                <option value="Direct Mail">Direct Mail</option>
                <option value="Conference">Conference</option>
                <option value="Trade Show">Trade Show</option>
                <option value="Web Site">Web Site</option>
                <option value="Word Of Mouth">Word Of Mouth</option>
                <option value="Other">Other</option>
              </select>
            </InlineField>
          </div>

          {/* Row 3 */}
          <div className="flex gap-4">
            <InlineField label="Assigned To">
              <select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                className="w-full border rounded p-1 min-w-0 text-sm" required
              >
                <option value="">-- Select Employee --</option>
                {employees.map((emp: Employee) => (
                  <option key={emp.employee_id} value={emp.employee_id}>
                    {emp.employee_first_name} {emp.employee_last_name}
                  </option>
                ))}
              </select>
            </InlineField>

            <InlineField label="Campaign Source">
              <input
                type="text"
                name="campaignSource"
                value={formData.campaignSource}
                onChange={handleChange}
                className="w-full border rounded p-1 min-w-0 text-sm" required
              />
            </InlineField>
          </div>

          {/* Row 4 */}
          <div className="flex gap-4">
            <InlineField label="Weighted Revenue">
              <input
                type="number"
                name="weightedRevenue"
                value={formData.weightedRevenue}
                onChange={handleChange}
                className="w-full border rounded p-1 min-w-0 text-sm" required
              />
            </InlineField>

            <InlineField label="Organization Name">
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                className="w-full border rounded p-1 min-w-0 text-sm" required
              />
            </InlineField>
          </div>

          {/* Row 5 */}
          <div className="flex gap-4">
            <InlineField label="Amount">
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full border rounded p-1 min-w-0 text-sm" required
              />
            </InlineField>

            <InlineField label="Expected Close Date">
              <input
                type="date"
                name="expectedCloseDate"
                value={formData.expectedCloseDate}
                onChange={handleChange}
                className="w-full border rounded p-1 min-w-0 text-sm" required
              />
            </InlineField>
          </div>

          {/* Row 6 */}
          <div className="flex gap-4">
            <InlineField label="Next Step">
              <input
                type="text"
                name="nextStep"
                value={formData.nextStep}
                onChange={handleChange}
                className="w-full border rounded p-1 min-w-0 text-sm" required
              />
            </InlineField>

            <InlineField label="Sales Stage">
              <select
                name="salesStage"
                value={formData.salesStage}
                onChange={handleChange}
                className="w-full border rounded p-1 min-w-0 text-sm" required
              >
                <option value="">-- Select Stage --</option>
                <option value="Prospecting">Prospecting</option>
                <option value="Qualification">Qualification</option>
                <option value="Needs Analysis">Needs Analysis</option>
                <option value="Proposal">Proposal or Price Quote</option>
                <option value="Revised Quote">Revised Quote</option>
                <option value="Sales Order">Sales Order(Client Purchase)</option>
                <option value="Invoice">Invoice</option>
                <option value="Payment Due">Payment Due</option>
                <option value="Closed Won">Closed Won</option>
                <option value="Closed Lost">Closed Lost</option>
              </select>
            </InlineField>
          </div>

          {/* Row 7 */}
          <div className="flex gap-4">
            <InlineField label="Probability (%)">
              <input
                type="number"
                name="probability"
                value={formData.probability}
                onChange={handleChange}
                className="w-full border rounded p-1 min-w-0 text-sm" required
                min="0"
                max="100"
              />
            </InlineField>
            <div className="flex-1"></div>
          </div>

          {/* Full width: Description */}
          <div className="flex gap-4">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded p-1 h-20 resize-none"
              placeholder="Enter additional details about the lead..." required
            />
          

          {/* Full width: Comments */}
          
            <label className="block font-medium">Comments</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              className="w-full border rounded p-1 h-20 resize-none" required
              placeholder="Enter your comment..."
            />
          </div>

          {/* Full width: Attachments */}
          <div className="flex gap-4">
            <label className="block font-medium">Attachments</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-49 border rounded p-1 text-sm" required
            />
            {formData.attachments.length > 0 && (
              <ul className="mt-2 text-sm text-gray-600">
                {formData.attachments.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Add Product Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsProductModalOpen(true)}
              className="bg-green-600 text-white px-2 py-2 rounded hover:bg-green-700 text-sm"
            >
              + Add Product
            </button>
          </div>

          {/* Products Table */}
          <div className="mt-4">
            <h3 className="font-medium mb-2">Added Products</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Product Name</th>
                    <th className="border border-gray-300 p-2 text-left">Code</th>
                    <th className="border border-gray-300 p-2 text-left">Type</th>
                    <th className="border border-gray-300 p-2 text-left">Model</th>
                    <th className="border border-gray-300 p-2 text-left">UOM</th>
                    <th className="border border-gray-300 p-2 text-left">Quantity</th>
                    <th className="border border-gray-300 p-2 text-left">Price</th>
                    <th className="border border-gray-300 p-2 text-left">Total</th>
                    <th className="border border-gray-300 p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiryProducts.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="border border-gray-300 p-2 text-center text-gray-500">
                        No products added yet.
                      </td>
                    </tr>
                  ) : (
                    enquiryProducts.map((product, index) => (
                      <tr key={product.id}>
                        <td className="border border-gray-300 p-2">{product.product_name}</td>
                        <td className="border border-gray-300 p-2">{product.product_code}</td>
                        <td className="border border-gray-300 p-2">{product.product_type}</td>
                        <td className="border border-gray-300 p-2">{product.product_model_number}</td>
                        <td className="border border-gray-300 p-2">{product.product_uom}</td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="number"
                            value={product.enquiry_product_quantity ?? ""}
                            min="0"
                            onChange={(e) =>
                              handleProductChange(
                                index,
                                "enquiry_product_quantity",
                                parseInt(e.target.value, 10) || 0
                              )
                            }
                            className="w-20 border rounded p-1 text-sm"
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="number"
                            step="0.01"
                            value={product.enquiry_product_price ?? ""}
                            onChange={(e) =>
                              handleProductChange(
                                index,
                                "enquiry_product_price",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-24 border rounded p-1 text-sm"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-right font-medium">
                          Rs {(product.enquiry_product_quantity * product.enquiry_product_price).toFixed(2)}
                        </td>
                        <td className="border border-gray-300 p-2 flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleRemoveProduct(product.id)}
                            className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                            title="Remove"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fixed Footer with Save and Cancel Buttons */}
          <div className="fixed bottom-6 left-[240px] right-0 z-5">
            <div className="px-4 py-3">
              <div className="flex gap-2 justify-center max-w-5xl mx-auto">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition text-sm font-medium"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition text-sm font-medium"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleAddProduct}
        products={products}
      />
    </div>
  );
};

export default LeadForm;