'use client';

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Customer = {
  customer_id: number;
  customer_name: string;
  customer_contact_person: string;
  customer_address: string;
  customer_mail_id: string;
  customer_contact_number: string;
  customer_gst_num: string;
  customer_country: string;
  customer_active: number;
};

export default function EditCustomer({ params }: { params: Promise<{ customerId: string }> }) {
  const customerId = use(params).customerId;
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/customer/edit/${customerId}`)
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch'))
      .then(data => {
        setCustomer(data.customer);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [customerId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    
    const payload = {
      ...data,
      customer_active: Number(data.customer_active)
    };

    try {
      const res = await fetch(`/api/customer/edit/${customerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) router.push("/customer/list");
      else setError("Failed to update customer");
    } catch {
      setError("Update failed");
    }
  };

  if (loading) return <p className="text-sm">Loading...</p>;
  if (error) return <p className="text-sm text-red-600">Error: {error}</p>;
  if (!customer) return <p className="text-sm">Customer not found</p>;

  const fields = [
    { label: "Name", name: "customer_name", type: "text", required: true },
    { label: "Contact Person", name: "customer_contact_person", type: "text" },
    { label: "Address", name: "customer_address", type: "text" },
    { label: "Email", name: "customer_mail_id", type: "email" },
    { label: "Phone", name: "customer_contact_number", type: "tel" },
    { label: "GST Number", name: "customer_gst_num", type: "text" },
    { label: "Country", name: "customer_country", type: "text" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-lg font-bold mb-4 text-sm">Edit Customer: {customer.customer_name}</h1>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {fields.map(({ label, name, type, required }) => (
            <div key={name}>
              <label className="block text-xs font-medium mb-1">{label}</label>
              <input
                type={type}
                name={name}
                defaultValue={customer[name as keyof Customer]}
                required={required}
                className="w-full border rounded px-2 py-1 text-sm"
              />
            </div>
          ))}
          
          <div className="md:col-span-2">
            <label className="block text-xs font-medium mb-1">Active</label>
            <div className="flex gap-3">
              <label className="flex items-center gap-1 text-sm">
                <input type="radio" name="customer_active" value="1" 
                       defaultChecked={customer.customer_active === 1} className="text-xs" />
                Yes
              </label>
              <label className="flex items-center gap-1 text-sm">
                <input type="radio" name="customer_active" value="0" 
                       defaultChecked={customer.customer_active === 0} className="text-xs" />
                No
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm">
            Save
          </button>
          <button type="button" onClick={() => router.back()} 
                  className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600 text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}