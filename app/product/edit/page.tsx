'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Product = {
  product_id: number;
  product_name: string;
  product_code: string;
  product_short_name: string;
  product_type: string;
  product_model_number: string;
  product_uom: string;
  product_active: boolean;
};

export default function ProductEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  // Fetch product by ID
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/product/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();

        const fetchedProduct = data.product;
        fetchedProduct.product_active = Boolean(fetchedProduct.product_active);

        setProduct(fetchedProduct);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!product) return;
    const { name, type, value } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/product/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error('Failed to update product');

    //   alert('Product updated successfully!');
      router.push('/product');
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Product Name & Product Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Product Name</label>
            <input
              type="text"
              name="product_name"
              value={product.product_name}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Product Code</label>
            <input
              type="text"
              name="product_code"
              value={product.product_code}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Row 2: Short Name & Product Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Short Name</label>
            <input
              type="text"
              name="product_short_name"
              value={product.product_short_name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Product Type</label>
            <select
              name="product_type"
              value={product.product_type}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Select Type</option>
              <option value="trading">Trading</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="service">Service</option>
            </select>
          </div>
        </div>

        {/* Row 3: Model Number & UOM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Model Number</label>
            <input
              type="text"
              name="product_model_number"
              value={product.product_model_number}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">UOM</label>
            <input
              type="text"
              name="product_uom"
              value={product.product_uom}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Row 4: Product Active */}
        <div>
          <label className="block font-medium mb-2">Product Active</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={product.product_active === true}
                onChange={() =>
                  setProduct((prev) => prev && { ...prev, product_active: true })
                }
                className="h-4 w-4"
              />
              True
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={product.product_active === false}
                onChange={() =>
                  setProduct((prev) => prev && { ...prev, product_active: false })
                }
                className="h-4 w-4"
              />
              False
            </label>
          </div>
        </div>

        {/* Submit / Cancel buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => router.push('/product')}
            className="flex-1 bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400 disabled:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>

    </div>
  );
}
