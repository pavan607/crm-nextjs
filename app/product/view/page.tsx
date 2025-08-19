'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

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

export default function ProductViewPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/product/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data.product);
      } catch (err) {
        setError((err as Error).message);
      }
    }

    fetchProduct();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Product Details</h1>
      <Link href="/product" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to list
      </Link>
      <div className="space-y-4">
        <div><strong>ID:</strong> {product.product_id}</div>
        <div><strong>Name:</strong> {product.product_name}</div>
        <div><strong>Code:</strong> {product.product_code}</div>
        <div><strong>Short Name:</strong> {product.product_short_name}</div>
        <div><strong>Type:</strong> {product.product_type.replace('_', ' ')}</div>
        <div><strong>Model No.:</strong> {product.product_model_number}</div>
        <div><strong>UOM:</strong> {product.product_uom}</div>
        <div><strong>Active:</strong> {product.product_active ? 'Yes' : 'No'}</div>
      </div>
    </div>
  );
}
