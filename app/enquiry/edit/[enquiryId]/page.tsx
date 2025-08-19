// app/enquiry/edit/[enquiryId]/page.tsx
'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { PencilIcon } from '@heroicons/react/24/solid';
import { useEmployeeSession } from '../../../hooks/useEmployeeSession';
// --- Type Definitions ---
type Attachment = {
  crm_attachment_id?: number;
  file_name: string;
  file_path: string;
};

type Comment = {
  comment_text: string;
  commented_on: string;
  commented_by_name: string;
};

type Product = {
  crmtf_product_name: string;
  crmtf_product_id: number;
  crmtf_product_type?: string;
  crmtf_product_code?: string;
  crmtf_product_model_number?: string;
  crmtf_product_uom?: string;
  crm_quantity?: number;
  crm_price?: number;
};

type Employee = {
  employee_id: number;
  employee_first_name: string;
  employee_last_name: string;
  employee_email?: string;
};

type AvailableProduct = {
  crmtf_product_id: number;
  crmtf_product_name: string;
  crmtf_product_type?: string;
  crmtf_product_code?: string;
  crmtf_product_model_number?: string;
  crmtf_product_uom?: string;
};

type EnquiryProduct = {
  id: string;
  crmtf_product_id: number;
  product_name: string;
  product_code: string;
  product_type: string;
  product_model_number: string;
  product_uom: string;
  crm_quantity: number;
  crm_price: number;
  session_flag?: 'A' | 'E' | 'D' | null;
};

type Lead = {
  enquiryId: number;
  crm_enquiry_number?: string;
  opportunityName: string;
  contactName?: string;
  type?: string;
  leadSource?: string;
  assignedToName?: string;
  assignedTo?: number;
  campaignSource?: string;
  weightedRevenue?: number;
  organizationName?: string;
  amount?: number;
  expectedCloseDate?: string;
  actualCloseDate?: string;
  nextStep?: string;
  salesStage?: string;
  probability?: number;
  description?: string;
  attachments?: Attachment[];
  comments?: Comment[];
  products?: Product[];
  employee?: Employee;
  comment: string;
};

type ApiLead = {
  crm_enquiry_id: number;
  crm_enquiry_number?: string;
  crm_opportunity_name: string;
  crm_contact_name?: string;
  crm_type?: string;
  crm_lead_source?: string;
  assignedToName?: string;
  crm_assigned_to?: number;
  crm_campaign_source?: string;
  crm_weighted_revenue?: number;
  crm_organization_name?: string;
  crm_amount?: number;
  crm_expected_close_date?: string;
  crm_close_date?: string;
  crm_next_step?: string;
  crm_sales_stage?: string;
  crm_probability?: number;
  crm_description?: string;
  attachments?: Attachment[];
  comments?: Comment[];
  products?: Product[];
  employee?: Employee;
};

type FormDataType = {
  crm_enquiry_number: string;
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
  actualCloseDate: string;
  hasActualCloseDate: boolean;
  nextStep: string;
  salesStage: string;
  probability: string;
  description: string;
  attachments: File[];
  comment: string;
};

interface Props {
  params: Promise<{ enquiryId: string }>;
}
declare global {
  interface Window {
    logSessionData?: () => void;
  }
}
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
  editingProduct,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: EnquiryProduct) => void;
  products: AvailableProduct[];
  editingProduct?: EnquiryProduct | null;
}) => {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<AvailableProduct | null>(null);
  

  useEffect(() => {
    if (isOpen) {
      if (editingProduct) {
        setSelectedProductId(editingProduct.crmtf_product_id.toString());
        setQuantity(editingProduct.crm_quantity);
        setPrice(editingProduct.crm_price);
        const product = products.find(p => p.crmtf_product_id === editingProduct.crmtf_product_id);
        setSelectedProduct(product || null);
      } else {
        setSelectedProductId('');
        setQuantity(1);
        setPrice(0);
        setSelectedProduct(null);
      }
    }
  }, [isOpen, editingProduct, products]);

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
    const product = products.find(p => p.crmtf_product_id.toString() === productId);
    setSelectedProduct(product || null);
  };

  const handleSave = () => {
    if (!selectedProduct || quantity <= 0 || price <= 0) {
      alert('Please fill in all required fields with valid values');
      return;
    }
    const enquiryProduct: EnquiryProduct = {
      id: editingProduct?.id || Date.now().toString(),
      crmtf_product_id: selectedProduct.crmtf_product_id,
      product_name: selectedProduct.crmtf_product_name,
      product_code: selectedProduct.crmtf_product_code || '',
      product_type: selectedProduct.crmtf_product_type || '',
      product_model_number: selectedProduct.crmtf_product_model_number || '',
      product_uom: selectedProduct.crmtf_product_uom || '',
      crm_quantity: quantity,
      crm_price: price,
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{editingProduct ? 'Edit Product' : 'Product List'}</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1 text-sm">Product Name*</label>
            <select
              value={selectedProductId}
              onChange={(e) => handleProductSelect(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">-- Select Product --</option>
              {products.map((product) => (
                <option key={product.crmtf_product_id} value={product.crmtf_product_id}>
                  {product.crmtf_product_name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium mb-1 text-sm">Code</label>
              <input
                type="text"
                value={selectedProduct?.crmtf_product_code || ''}
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-sm"
                disabled
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm">Type</label>
              <input
                type="text"
                value={selectedProduct?.crmtf_product_type || ''}
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-sm"
                disabled
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm">Model</label>
              <input
                type="text"
                value={selectedProduct?.crmtf_product_model_number || ''}
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-sm"
                disabled
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm">UOM</label>
              <input
                type="text"
                value={selectedProduct?.crmtf_product_uom || ''}
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-sm"
                disabled
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm">Quantity*</label>
              <input
                type="number"
                value={quantity}
                onChange={e => setQuantity(parseInt(e.target.value) || 1)}
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
                onChange={e => setPrice(parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                min="0"
                step="0.01"
                required
                placeholder="Unit Price"
              />
            </div>
          </div>
          {quantity > 0 && price > 0 && (
            <div className="mt-2 text-sm text-blue-700 bg-blue-50 rounded p-2">
              Total: Rs {(quantity * price).toFixed(2)}
            </div>
          )}
        </div>
        <div className="flex gap-1 justify-end mt-4 pt-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={!selectedProduct || quantity <= 0 || price <= 0}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-1.5 rounded text-sm"
          >
            {editingProduct ? 'Update Product' : 'Add Product'}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm"
          >
            Cancel
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default function LeadEditPage({ params }: Props) {
  // Use React.use() to unwrap the params Promise
  const { enquiryId } = use(params);
  const router = useRouter();
const { employee, requireAuth } = useEmployeeSession();
  // Add client-side flag to prevent hydration mismatch
  const [isClient, setIsClient] = useState(false);
  const [lead, setLead] = useState<Lead | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [availableProducts, setAvailableProducts] = useState<AvailableProduct[]>([]);
  const [enquiryProducts, setEnquiryProducts] = useState<EnquiryProduct[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<EnquiryProduct[]>([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductIndex, setEditingProductIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
const [deletedAttachmentIds, setDeletedAttachmentIds] = useState<number[]>([]);

  const [formData, setFormData] = useState<FormDataType>({
    crm_enquiry_number: '',
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
    actualCloseDate: '',
    hasActualCloseDate: false,
    nextStep: '',
    salesStage: '',
    probability: '',
    description: '',
    attachments: [],
    comment: '',
  });

  // Set client flag after mount to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Helper function to map API response to frontend Lead type
  function mapLead(data: ApiLead): Lead {
  const latestComment = data.comments
    ?.sort((a, b) => new Date(b.commented_on).getTime() - new Date(a.commented_on).getTime())[0];

  return {
    enquiryId: data.crm_enquiry_id,
    crm_enquiry_number: data.crm_enquiry_number,
    opportunityName: data.crm_opportunity_name,
    contactName: data.crm_contact_name,
    type: data.crm_type,
    leadSource: data.crm_lead_source,
    assignedToName: data.assignedToName,
    assignedTo: data.crm_assigned_to,
    campaignSource: data.crm_campaign_source,
    weightedRevenue: data.crm_weighted_revenue,
    organizationName: data.crm_organization_name,
    amount: data.crm_amount,
    expectedCloseDate: data.crm_expected_close_date,
    actualCloseDate: data.crm_close_date,
    nextStep: data.crm_next_step,
    salesStage: data.crm_sales_stage,
    probability: data.crm_probability,
    description: data.crm_description,
    attachments: data.attachments,
    comments: data.comments,
    products: data.products,
    employee: data.employee,

    // 👇 Add this line to pre-fill the textarea
   comment: latestComment?.comment_text || '', 
  };
}


  // Convert API products to EnquiryProduct format, enriching from availableProducts
  function convertToEnquiryProducts(
    products: Product[],
    availableProducts: AvailableProduct[]
  ): EnquiryProduct[] {
    return products.map((product, index) => {
      const match = availableProducts.find(
        (p) => p.crmtf_product_id === product.crmtf_product_id
      );
      return {
        id: `existing-${index}`,
        crmtf_product_id: product.crmtf_product_id,
        product_name: match?.crmtf_product_name || product.crmtf_product_name,
        product_code: match?.crmtf_product_code || product.crmtf_product_code || '',
        product_type: match?.crmtf_product_type || product.crmtf_product_type || '',
        product_model_number:
          match?.crmtf_product_model_number || product.crmtf_product_model_number || '',
        product_uom: match?.crmtf_product_uom || product.crmtf_product_uom || '',
        crm_quantity: product.crm_quantity || 0,
        crm_price: product.crm_price || 0,
        session_flag: null, // Initialize with null flag
      };
    });
  }

  // Get displayed products helper - filter out deleted products
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getDisplayedProducts = (products: EnquiryProduct[]): EnquiryProduct[] => {
  return products.filter(product => product.session_flag !== 'D');
};


  // Debug function to log session data (you can call this from browser console)
  const logSessionData = () => {
  const sessionProducts = sessionStorage.getItem(`enquiryProducts_${enquiryId}`);
  if (sessionProducts) {
    const products: EnquiryProduct[] = JSON.parse(sessionProducts);
    console.log('=== SESSION PRODUCT DATA ===');
    console.log(`Total products in session: ${products.length}`);

    const categorized = products.reduce((acc: Record<string, EnquiryProduct[]>, product: EnquiryProduct) => {
      const flag = product.session_flag || 'null';
      if (!acc[flag]) acc[flag] = [];
      acc[flag].push(product);
      return acc;
    }, {});

    Object.keys(categorized).forEach(flag => {
      console.log(`${flag} products (${categorized[flag].length}):`, categorized[flag]);
    });
  }
};

useEffect(() => {
  if (lead) {
    // Sort comments by date descending
    const latestComment = lead.comments
      ?.slice()
      .sort((a, b) => new Date(b.commented_on).getTime() - new Date(a.commented_on).getTime())[0];

    setFormData(prev => ({
      ...prev,
      // Initialize comment field with latest comment text
      comment: latestComment?.comment_text || '',  // or comment_text depending on your data
      // Initialize other form fields from lead if needed
    }));
  }
}, [lead]);
  // Make logSessionData available globally for debugging
useEffect(() => {
  if (typeof window !== 'undefined') {
    window.logSessionData = logSessionData;
  }
});

  // Fetch lead and support data - only run on client
  useEffect(() => {
    if (!isClient) return;

   const fetchData = async () => {
  setLoading(true);
  setError(null);
  
  try {
    // Always fetch fresh data with better error handling
    const [productsRes, employeesRes] = await Promise.all([
      fetch('/api/enquiry/product_dropdown').catch(err => {
        console.error('Product API error:', err);
        throw new Error('Failed to fetch products');
      }),
      fetch('/api/enquiry/employee_dropdown').catch(err => {
        console.error('Employee API error:', err);
        throw new Error('Failed to fetch employees');
      }),
    ]);

    // Check if responses are OK and content-type is JSON
    if (!productsRes.ok) {
      const errorText = await productsRes.text();
      console.error('Products API returned:', errorText);
      throw new Error(`Products API error: ${productsRes.status}`);
    }

    if (!employeesRes.ok) {
      const errorText = await employeesRes.text();
      console.error('Employees API returned:', errorText);
      throw new Error(`Employees API error: ${employeesRes.status}`);
    }

    // Check content-type to ensure we're getting JSON
    const productsContentType = productsRes.headers.get('content-type');
    const employeesContentType = employeesRes.headers.get('content-type');

    if (!productsContentType?.includes('application/json')) {
      const errorText = await productsRes.text();
      console.error('Products API returned non-JSON:', errorText);
      throw new Error('Products API returned HTML instead of JSON');
    }

    if (!employeesContentType?.includes('application/json')) {
      const errorText = await employeesRes.text();
      console.error('Employees API returned non-JSON:', errorText);
      throw new Error('Employees API returned HTML instead of JSON');
    }

    const loadedAvailableProducts = await productsRes.json();
    const loadedEmployees = await employeesRes.json();
    
    setAvailableProducts(loadedAvailableProducts);
    setEmployees(loadedEmployees);

    // Handle lead data
    console.log("Frontend calling API with enquiryId:", enquiryId);
    const leadRes = await fetch(`/api/enquiry/edit/${enquiryId}`);
    
    if (!leadRes.ok) {
      const errorText = await leadRes.text();
      console.error('Lead API returned:', errorText);
      throw new Error(`Lead API error: ${leadRes.status}`);
    }

    const leadContentType = leadRes.headers.get('content-type');
    if (!leadContentType?.includes('application/json')) {
      const errorText = await leadRes.text();
      console.error('Lead API returned non-JSON:', errorText);
      throw new Error('Lead API returned HTML instead of JSON - check API route');
    }

    const leadData = await leadRes.json();
    const mappedLead = mapLead(leadData);
    setLead(mappedLead);

        // Create new formData object
        const newFormData = {
          crm_enquiry_number: mappedLead.crm_enquiry_number || '',
          opportunityName: mappedLead.opportunityName || '',
          contactName: mappedLead.contactName || '',
          type: mappedLead.type || '',
          leadSource: mappedLead.leadSource || '',
          assignedTo: mappedLead.assignedTo?.toString() || '',
          campaignSource: mappedLead.campaignSource || '',
          weightedRevenue: mappedLead.weightedRevenue?.toString() || '',
          organizationName: mappedLead.organizationName || '',
          amount: mappedLead.amount?.toString() || '',
          expectedCloseDate: mappedLead.expectedCloseDate
            ? mappedLead.expectedCloseDate.split('T')[0]
            : '',
          actualCloseDate: mappedLead.actualCloseDate 
            ? mappedLead.actualCloseDate.split('T')[0] 
            : '',
          hasActualCloseDate: !!mappedLead.actualCloseDate,
          nextStep: mappedLead.nextStep || '',
          salesStage: mappedLead.salesStage || '',
          probability: mappedLead.probability?.toString() || '',
          description: mappedLead.description || '',
          attachments: [],
          comment: '',
        };
        
        setFormData(newFormData);

        // Handle enquiry products - prioritize session data over API data
        let finalEnquiryProducts: EnquiryProduct[] = [];
        
        if (mappedLead.products) {
          finalEnquiryProducts = convertToEnquiryProducts(mappedLead.products, loadedAvailableProducts);
          sessionStorage.setItem(`enquiryProducts_${enquiryId}`, JSON.stringify(finalEnquiryProducts));
        }

        
        setEnquiryProducts(finalEnquiryProducts);
        // Filter out deleted products for display (session_flag !== 'D')
        const filteredProducts = finalEnquiryProducts.filter(product => product.session_flag !== 'D');
        setDisplayedProducts(filteredProducts);
        console.log(`Displaying ${filteredProducts.length} products (filtered out deleted)`);

        } catch (err) {
    console.error('❌ Fetch error:', err);
    setError((err as Error).message || 'An unexpected error occurred while loading data.');
  } finally {
    setLoading(false);
  }
};
    
    fetchData();
  }, [enquiryId, isClient]); // Depend on both leadId and isClient

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFormData({ ...formData, attachments: Array.from(e.target.files) });
  //   }
  // };
// Move these handler functions OUTSIDE of the ProductModal component
// and place them in the main LeadEditPage component, after the state declarations

// Handler for deleting existing attachments
// Updated handler for deleting existing attachments
// Add this enhanced debugging to your handleDeleteExistingAttachment function

// Enhanced handleDeleteExistingAttachment with better debugging
const handleDeleteExistingAttachment = (indexToRemove: number) => {
  console.log('🗑️ === STARTING ATTACHMENT DELETION ===');
  console.log('Index to remove:', indexToRemove);
  console.log('Current attachments:', lead?.attachments);
  console.log('Current deletedAttachmentIds before:', deletedAttachmentIds);

  if (lead?.attachments) {
    const attachmentToDelete = lead.attachments[indexToRemove];
    console.log('Attachment to delete:', attachmentToDelete);
    
    // Only add to deleted list if it has an ID (exists in database)
    if (attachmentToDelete.crm_attachment_id) {
      console.log('✅ Adding to deletion list:', attachmentToDelete.crm_attachment_id);
      
      // Update the deletedAttachmentIds state
      setDeletedAttachmentIds(prev => {
        const newList = [...prev, attachmentToDelete.crm_attachment_id!];
        console.log('📝 Updated deletion list:', newList);
        return newList;
      });
      
      console.log('✅ Marked attachment for deletion:', {
        id: attachmentToDelete.crm_attachment_id,
        name: attachmentToDelete.file_name
      });
    } else {
      console.warn('⚠️ Attachment has no crm_attachment_id, cannot mark for deletion:', attachmentToDelete);
    }
    
    // Remove from display immediately
    const updatedAttachments = lead.attachments.filter((_, index) => index !== indexToRemove);
    console.log('📋 Updated attachments list (for display):', updatedAttachments);
    
    setLead(prev => {
      if (!prev) return null;
      const newLead = {
        ...prev,
        attachments: updatedAttachments
      };
      console.log('💾 Updated lead state with new attachments');
      return newLead;
    });
    
    console.log('✅ Attachment removal from UI completed');
  } else {
    console.warn('⚠️ No attachments found in lead object');
  }
  
  console.log('🗑️ === ATTACHMENT DELETION FINISHED ===');
  
  // Add a small delay to check the state update
  setTimeout(() => {
    console.log('🔍 Checking state after 100ms:');
    console.log('deletedAttachmentIds after state update:', deletedAttachmentIds);
  }, 100);
};
// Handler for deleting new attachments (before upload)
const handleDeleteNewAttachment = (indexToRemove: number) => {
  setFormData(prev => ({
    ...prev,
    attachments: prev.attachments.filter((_, index) => index !== indexToRemove)
  }));
};

// Update the existing handleFileChange function
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
    const fileArray = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...fileArray]
    }));
  }
};

  const handleAddProduct = () => {
    setEditingProductIndex(null);
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (displayIndex: number) => {
    const productToEdit = displayedProducts[displayIndex];
    const actualIndex = enquiryProducts.findIndex(p => p.id === productToEdit.id);
    setEditingProductIndex(actualIndex);
    setIsProductModalOpen(true);
  };

const handleSaveProduct = (product: EnquiryProduct) => {
  // const leadId = router.query.leadId; // ✅ Add this line to fix the error

  let updatedProducts;
  if (editingProductIndex !== null) {
    // Editing existing product
    updatedProducts = [...enquiryProducts];
    updatedProducts[editingProductIndex] = {
      ...product,
      session_flag: updatedProducts[editingProductIndex].session_flag === null ? 'E' : updatedProducts[editingProductIndex].session_flag
    };
  } else {
    // Adding new product
    const newProduct = {
      ...product,
      session_flag: 'A' as const
    };
    updatedProducts = [...enquiryProducts, newProduct];
  }

  setEnquiryProducts(updatedProducts);

  // Filter and set displayed products (exclude deleted ones)
  const filteredProducts = updatedProducts.filter(p => p.session_flag !== 'D');
  setDisplayedProducts(filteredProducts);
  console.log('💾 Saving product:', product);
  console.log('🛠️ Editing index:', editingProductIndex);
  console.log('📋 Updated product list:', updatedProducts);
  console.log('🧮 Displayed products count:', filteredProducts.length);

  // Update session storage
  sessionStorage.setItem(`enquiryProducts_${enquiryId}`, JSON.stringify(updatedProducts));
  sessionStorage.setItem(`enquiryProducts_lastUpdated_${enquiryId}`, new Date().toISOString());
  console.log(`Updated session: ${updatedProducts.length} total products, ${filteredProducts.length} displayed`);
};

  const handleProductChange = (
    index: number,
    field: 'crm_quantity' | 'crm_price',
    value: number
  ) => {
    const actualIndex = enquiryProducts.findIndex(p => p.id === displayedProducts[index].id);
    const updatedProducts = [...enquiryProducts];
    updatedProducts[actualIndex] = {
      ...updatedProducts[actualIndex],
      [field]: value,
      session_flag: updatedProducts[actualIndex].session_flag === null ? 'E' : updatedProducts[actualIndex].session_flag
    };
    setEnquiryProducts(updatedProducts);
    console.log(`✏️ Changing product [${index}] field "${field}" to`, value);
console.log('📦 Updated product object:', updatedProducts[actualIndex]);

    // Filter and set displayed products (exclude deleted ones)
    const filteredProducts = updatedProducts.filter(p => p.session_flag !== 'D');
    setDisplayedProducts(filteredProducts);
    
    // Update session storage
    sessionStorage.setItem(`enquiryProducts_${enquiryId}`, JSON.stringify(updatedProducts));
    sessionStorage.setItem(`enquiryProducts_lastUpdated_${enquiryId}`, new Date().toISOString());
  };

  const handleRemoveProduct = (id: string) => {
    const updatedProducts = enquiryProducts.map(product => 
      product.id === id 
        ? { ...product, session_flag: 'D' as const }
        : product
    );
    setEnquiryProducts(updatedProducts);
    
    // Filter and set displayed products (exclude deleted ones)
    const filteredProducts = updatedProducts.filter(p => p.session_flag !== 'D');
    setDisplayedProducts(filteredProducts);
    
    // Update session storage
    sessionStorage.setItem(`enquiryProducts_${enquiryId}`, JSON.stringify(updatedProducts));
    sessionStorage.setItem(`enquiryProducts_lastUpdated_${enquiryId}`, new Date().toISOString());
    console.log(`Marked product ${id} as deleted. ${filteredProducts.length} products remaining`);
  };
    useEffect(() => {
    if (!requireAuth()) return;
    setIsClient(true);
  }, [requireAuth]);

  // Fixed handleSubmit function in your LeadEditPage component
// Complete fixed handleSubmit function - remove the old payload declaration completely
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSaving(true);
  setError(null);

  // Debug: Log session data BEFORE starting submission
  console.log('=== BEFORE SUBMISSION ===');
  console.log('Current enquiryProducts state:', enquiryProducts);
  console.log('Deleted attachment IDs:', deletedAttachmentIds);

  // Declare variables outside try block to fix scope issues
  let productsToAdd: EnquiryProduct[] = [];
  let productsToEdit: EnquiryProduct[] = [];
  let productsToDelete: EnquiryProduct[] = [];
  let unchangedProducts: EnquiryProduct[] = [];

  try {
    // Create FormData payload
    const payload = new FormData();

    // Add form fields to payload
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'attachments') {
        // Handle actualCloseDate based on checkbox state
        if (key === 'actualCloseDate') {
          if (formData.hasActualCloseDate && 
              typeof value === 'string' && 
              value.trim() !== '') {
            payload.append(key, value);
          } else {
            // FIXED: Always append the field, but with empty string when disabled
            payload.append(key, '');  // Backend will convert empty string to null
          }
        } else if (key !== 'hasActualCloseDate') {
          payload.append(key, value as string);
        }
      }
    });
 if (employee?.employee_id) {
        payload.append('modified_by', employee.employee_id.toString());
      }
    // Add new file attachments
    formData.attachments.forEach((file) => {
      payload.append('attachments', file);
    });

    // Add deleted attachment IDs to payload
    if (deletedAttachmentIds.length > 0) {
      payload.append('deletedAttachmentIds', JSON.stringify(deletedAttachmentIds));
      console.log('Sending deleted attachment IDs:', deletedAttachmentIds);
    }

    // Process products based on session_flag
    const sessionProducts: EnquiryProduct[] = enquiryProducts;

    // Separate products by their session_flag
    productsToAdd = sessionProducts.filter((p: EnquiryProduct) => p.session_flag === 'A');
    productsToEdit = sessionProducts.filter((p: EnquiryProduct) => p.session_flag === 'E');
    productsToDelete = sessionProducts.filter((p: EnquiryProduct) => p.session_flag === 'D');
    unchangedProducts = sessionProducts.filter((p: EnquiryProduct) => p.session_flag === null);

    // Create the payload for different operations
    const productOperations = {
      add: productsToAdd,
      edit: productsToEdit,
      delete: productsToDelete,
      unchanged: unchangedProducts
    };

    console.log('Product operations to send:', {
      toAdd: productsToAdd.length,
      toEdit: productsToEdit.length,
      toDelete: productsToDelete.length,
      unchanged: unchangedProducts.length
    });

    payload.append('productOperations', JSON.stringify(productOperations));

    // Debug payload contents
    console.log('=== FINAL PAYLOAD CHECK ===');
    for (const [key, value] of payload.entries()) {
      if (key === 'deletedAttachmentIds') {
        console.log(`${key}:`, value);
      }
    }

    console.log('Making API call to:', `/api/enquiry/edit/${enquiryId}`);
    const response = await fetch(`/api/enquiry/edit/${enquiryId}`, {
      method: 'PUT',
      body: payload,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log('API Error:', errorData);
      alert(`Failed to update lead: ${errorData.error}`);
      return;
    }

    console.log('Processing response data...');
    const responseData = await response.json();
    console.log('Update response:', responseData);

    // Show success message
    alert('Lead updated successfully!');

    // Clear session storage only after confirmed success
    try {
      sessionStorage.removeItem(`enquiryProducts_${enquiryId}`);
      sessionStorage.removeItem(`enquiryProducts_lastUpdated_${enquiryId}`);
      sessionStorage.removeItem(`leadData_${enquiryId}`);
      console.log('✅ Session storage cleared successfully');
    } catch (storageError) {
      console.warn('❌ Error clearing session storage:', storageError);
    }

    // Navigate back to lead details
    setTimeout(() => {
      router.push(`/enquiry/list`);
    }, 100);

  } catch (error) {
    console.error('❌ SUBMIT ERROR:', error);
    setError('An error occurred while updating the lead. Your changes have been preserved.');
    alert('An error occurred while updating the lead. Please try again.');
  } finally {
    setSaving(false);
  }
};

  const handleCancel = () => {
    router.push(`/enquiry/list`);
  };

  // Show loading state while client is initializing or data is loading
  if (!isClient || loading) {
    return <div className="p-8 text-center text-lg">Loading lead details...</div>;
  }

  if (error) return <div className="p-8 text-center text-red-600 text-lg">Error: {error}</div>;
  if (!lead) return <div className="p-8 text-center text-gray-600 text-lg">Lead not found.</div>;

  return (
    <div className="mt-2">
      {/* Breadcrumb */}
      <div className="mb-2 ml-4">
        <div className="text-sm">
          <Link href="/enquiry/list" className="text-blue-600 hover:underline">
            All
          </Link>
          
          <span className="mx-2 text-gray-500">→</span>
          <span className="text-gray-700">Edit</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-sm">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-bold">Edit Enquiry: {lead.opportunityName}</h1>
          <button
            type="button"
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
            onClick={() => router.push(`/enquiry/list`)}
          >
            Back to List
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
         <div className="flex gap-4">
          <InlineField label="Enquiry Number">
            <input
              type="text"
              name="crm_enquiry_number"
              value={formData.crm_enquiry_number}
              readOnly
              className="w-full border rounded p-1 min-w-0 text-sm bg-gray-100 cursor-not-allowed"
            />
          </InlineField>
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
                {employees.map(emp => (
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

            <InlineField label="Actual Close Date">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="hasActualCloseDate"
                  checked={formData.hasActualCloseDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      hasActualCloseDate: e.target.checked,
                      actualCloseDate: e.target.checked ? prev.actualCloseDate : '',
                    }))
                  }
                  className="rounded"
                />
                <input
                  type="date"
                  name="actualCloseDate"
                  value={formData.actualCloseDate}
                  onChange={handleChange}
                  disabled={!formData.hasActualCloseDate}
                  className={`flex-1 border rounded p-1 min-w-0 text-sm ${
                    !formData.hasActualCloseDate 
                      ? 'bg-gray-100 cursor-not-allowed text-gray-400' 
                      : ''
                  }`}
                />
              </div>
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

            <label className="block font-medium">Comments</label>
            <textarea
  name="comment"
  value={formData.comment}
  onChange={handleChange}
  className="w-full border rounded p-1 h-20 resize-none"
  required
  placeholder="Enter your comment..."
/>

          </div>

          
          <div className="mb-4">
            <label className="block font-medium mb-1">Add Attachments</label>

            {/* File Input */}
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="border rounded p-1 text-sm w-full"
            />

            {/* Existing Attachments */}
            {lead.attachments && lead.attachments.length > 0 && (
              <ul className="text-sm text-gray-700 space-y-1 mt-2">
                {lead.attachments.map((attachment, idx) => (
                  <li key={`existing-${idx}`} className="flex items-center justify-between border p-2 rounded">
                    <a
                      href={attachment.file_path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {attachment.file_name}
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to remove this attachment?")) {
                          handleDeleteExistingAttachment(idx);
                        }
                      }}
                      className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* New Attachments */}
            {formData.attachments.length > 0 && (
              <ul className="text-sm text-gray-700 space-y-1 mt-2">
                {formData.attachments.map((file, idx) => (
                  <li key={`new-${idx}`} className="flex items-center justify-between border p-2 rounded">
                    {file.name}
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to remove this new file?")) {
                          handleDeleteNewAttachment(idx);
                        }
                      }}
                      className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

         
          
          {/* Add Product Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddProduct}
              className="bg-green-600 text-white px-2 py-2 rounded hover:bg-green-700 text-sm"
            >
              + Add Product
            </button>
          </div>
          
          {/* Products Table */}
          <div className="mt-4">
            <h3 className="font-medium mb-2">Product List</h3>
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
                  {displayedProducts.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="border border-gray-300 p-2 text-center text-gray-500">
                        No products added yet.
                      </td>
                    </tr>
                  ) : (
                    displayedProducts.map((product, index) => {
                      // fallback enrichment per row
                      const baseProduct = availableProducts.find(
                        p => p.crmtf_product_id === product.crmtf_product_id
                      );
                      return (
                        <tr key={product.id}>
                          <td className="border border-gray-300 p-2">
                            {product.product_name || baseProduct?.crmtf_product_name || ''}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {product.product_code || baseProduct?.crmtf_product_code || ''}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {product.product_type || baseProduct?.crmtf_product_type || ''}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {product.product_model_number || baseProduct?.crmtf_product_model_number || ''}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {product.product_uom || baseProduct?.crmtf_product_uom || ''}
                          </td>
                          <td className="border border-gray-300 p-2">
                            <input
                              type="number"
                              value={product.crm_quantity ?? ''}
                              min="0"
                              onChange={e =>
                                handleProductChange(
                                  index,
                                  'crm_quantity',
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
                              value={product.crm_price ?? ''}
                              onChange={e =>
                                handleProductChange(
                                  index,
                                  'crm_price',
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-24 border rounded p-1 text-sm"
                            />
                          </td>
                          <td className="border border-gray-300 p-2 text-right font-medium">
                            Rs {(product.crm_quantity * product.crm_price).toFixed(2)}
                          </td>
                          <td className="border border-gray-300 p-2 flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleEditProduct(index)}
                              className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium px-2 py-1 rounded hover:bg-blue-50"
                              title="Edit"
                            >
                              <PencilIcon className="h-4 w-4 mr-1" />
                            </button>
                            <button
                            type="button"
                            onClick={() => {
                              if (window.confirm("Are you sure you want to remove this product?")) {
                                handleRemoveProduct(product.id);
                              }
                            }}
                            className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                            title="Remove"
                          >
                            <Trash2 size={16} />
                          </button>

                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
           {/* Current Comments */}
          {lead.comments && lead.comments.length > 0 && (
            <div className="flex gap-4">
              <label className="block font-medium">Previous Comments</label>
              <div className="w-full space-y-2">
                {lead.comments.map((comment, idx) => (
                  <div key={idx} className="border-l-4 border-blue-500 pl-3 py-1 bg-blue-50 rounded-r text-sm">
                    <p className="text-gray-800">{comment.comment_text}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      — {comment.commented_by_name} on {new Date(comment.commented_on).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Fixed Footer with Save and Cancel Buttons */}
          <div className="fixed bottom-6 left-[240px] right-0 z-5">
            <div className="px-4 py-3">
              <div className="flex gap-2 justify-center max-w-5xl mx-auto">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition text-sm font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {saving ? 'Updating...' : 'Update'}
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
        onSave={handleSaveProduct}
        products={availableProducts}
        editingProduct={editingProductIndex !== null ? enquiryProducts[editingProductIndex] : null}
      />
    </div>
  );
}