'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { FaChevronRight } from 'react-icons/fa';

// Breadcrumb Component
const Breadcrumb = () => {
  const pathname = usePathname();

  const breadcrumbItems = [
    { label: 'All', href: '/product/' },
  ];

  if (pathname === '/product/add' || pathname === '/product/add/') {
    breadcrumbItems.push({ label: 'Form', href: '/product/add/' });
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <FaChevronRight className="mx-2 text-gray-400" size={12} />
          )}
          <Link
            href={item.href}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default function ProductFormPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    product_name: '',
    product_code: '',
    product_short_name: '',
    product_type: '',
    product_model_number: '',
    product_uom: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/product/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to add product');
      }

      setSuccessMsg('Product added successfully!');
      setForm({
        product_name: '',
        product_code: '',
        product_short_name: '',
        product_type: '',
        product_model_number: '',
        product_uom: '',
      });

      setTimeout(() => router.push('/product/add'), 1500);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg(String(error));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-sm max-w-2xl mx-auto">
  <Breadcrumb />

  <h1 className="text-xl font-bold mb-4 mt-4">Add Product</h1>

  {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}
  {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

  <form onSubmit={handleSubmit} className="space-y-3">
    {/* Row 1: Product Name & Product Code */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="flex items-center gap-2">
        <label className="w-32 font-medium">Product Name</label>
        <input
          type="text"
          name="product_name"
          value={form.product_name}
          onChange={handleChange}
          required
          className="flex-1 border p-1 rounded"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="w-32 font-medium">Product Code</label>
        <input
          type="text"
          name="product_code"
          value={form.product_code}
          onChange={handleChange}
          required
          className="flex-1 border p-1 rounded"
        />
      </div>
    </div>

    {/* Row 2: Short Name & Product Type */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="flex items-center gap-2">
        <label className="w-32 font-medium">Short Name</label>
        <input
          type="text"
          name="product_short_name"
          value={form.product_short_name}
          onChange={handleChange}
          className="flex-1 border p-1 rounded"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="w-32 font-medium">Product Type</label>
        <select
          name="product_type"
          value={form.product_type}
          onChange={handleChange}
          required
          className="flex-1 border p-1 rounded"
        >
          <option value="">Select Type</option>
          <option value="trading">Trading</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="service">Service</option>
        </select>
      </div>
    </div>

    {/* Row 3: Model Number & UOM */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="flex items-center gap-2">
        <label className="w-32 font-medium">Model Number</label>
        <input
          type="text"
          name="product_model_number"
          value={form.product_model_number}
          onChange={handleChange}
          className="flex-1 border p-1 rounded"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="w-32 font-medium">UOM</label>
        <select
          name="product_uom"
          value={form.product_uom}
          onChange={handleChange}
          className="flex-1 border p-1 rounded"
        >
          <option value="">Select UOM</option>
          <option value="kg">Kilogram (kg)</option>
          <option value="g">Gram (g)</option>
          <option value="ltr">Liter (ltr)</option>
          <option value="pcs">Pieces (pcs)</option>
          <option value="m">Meter (m)</option>
          <option value="s">Sets (s)</option>
        </select>
      </div>
    </div>

    {/* Buttons */}
    <div className="flex gap-2 mt-2">
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700 disabled:bg-blue-400"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      <button
        type="button"
        disabled={loading}
        onClick={() => router.push('/product')}
        className="bg-gray-300 text-gray-800 px-3 py-1 text-sm rounded hover:bg-gray-400 disabled:bg-gray-200"
      >
        Cancel
      </button>
    </div>
  </form>
</div>

  );
}
