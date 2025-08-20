'use client';

import React, { use, useState, useEffect } from "react";

type Customer = {
  customer_id: number;
  customer_name: string;
  customer_short_name: string;
  customer_contact_person: string;
  customer_address: string;
  customer_mail_id: string;
  customer_contact_number: string;
  customer_gst_num: string;
  customer_country: string;
  customer_active: number;
};

export default function ViewCustomer({ params }: { params: Promise<{ customerId: string }> }) {
  const resolvedParams = use(params);
  const customerId = resolvedParams.customerId;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const res = await fetch(`/api/customer/view/${customerId}`);
        if (!res.ok) throw new Error("Failed to fetch customer");

        const data = await res.json();
        setCustomer(data.customer);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomer();
  }, [customerId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!customer) return <p>Customer not found</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        {customer.customer_name}
      </h1>
      <p><strong>Contact Person:</strong> {customer.customer_contact_person}</p>
      <p><strong>Address:</strong> {customer.customer_address}</p>
      <p><strong>Email:</strong> {customer.customer_mail_id}</p>
      <p><strong>Phone:</strong> {customer.customer_contact_number}</p>
      <p><strong>GST Number:</strong> {customer.customer_gst_num}</p>
      <p><strong>Country:</strong> {customer.customer_country}</p>
      <p><strong>Active:</strong> {customer.customer_active === 1 ? "Yes" : "No"}</p>
    </div>
  );
}
