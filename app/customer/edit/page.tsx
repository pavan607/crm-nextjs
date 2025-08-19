'use client';

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

export default function EditCustomer({
  params,
}: {
  params: Promise<{ customer_id: string }>;
}) {
  const resolvedParams = use(params);
  const customer_id = resolvedParams.customer_id;

  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState<Omit<Customer, "customer_short_name" | "customer_id">>({
    customer_name: "",
    customer_contact_person: "",
    customer_address: "",
    customer_mail_id: "",
    customer_contact_number: "",
    customer_gst_num: "",
    customer_country: "",
    customer_active: 0,
  });

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const res = await fetch(`/api/customer/${customer_id}`);
        if (!res.ok) throw new Error("Failed to fetch customer");

        const data = await res.json();
        setCustomer(data.customer);
        setForm({
          customer_name: data.customer.customer_name,
          customer_contact_person: data.customer.customer_contact_person,
          customer_address: data.customer.customer_address,
          customer_mail_id: data.customer.customer_mail_id,
          customer_contact_number: data.customer.customer_contact_number,
          customer_gst_num: data.customer.customer_gst_num,
          customer_country: data.customer.customer_country,
          customer_active: data.customer.customer_active,
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchCustomer();
  }, [customer_id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "customer_active" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`/api/customer/${customer_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update customer");

      router.push("/customer-list");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!customer) return <p>Customer not found</p>;

  const fields: {
    label: string;
    name: keyof Omit<Customer, "customer_short_name" | "customer_id">;
    type: string;
    required?: boolean;
  }[] = [
    { label: "Name", name: "customer_name", type: "text", required: true },
    { label: "Contact Person", name: "customer_contact_person", type: "text" },
    { label: "Address", name: "customer_address", type: "text" },
    { label: "Email", name: "customer_mail_id", type: "email" },
    { label: "Phone", name: "customer_contact_number", type: "tel" },
    { label: "GST Number", name: "customer_gst_num", type: "text" },
    { label: "Country", name: "customer_country", type: "text" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-black">
        Edit Customer: {customer.customer_name}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map(({ label, name, type, required }) => (
            <div key={name}>
              <label className="block font-semibold mb-1 text-gray-900 dark:text-black">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required={required}
                className="w-full border rounded px-3 py-2 bg-white text-black dark:bg-gray-800 dark:text-white"
              />
            </div>
          ))}

          <div className="md:col-span-2">
  <label className="block font-semibold mb-1 text-gray-900 dark:text-black">
    Customer Active
  </label>
  <div className="flex items-center gap-6 mt-1">
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={form.customer_active === 1}
        onChange={() =>
          setForm((prev) => ({
            ...prev,
            customer_active: 1,
          }))
        }
        className="h-4 w-4"
      />
      True
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={form.customer_active === 0}
        onChange={() =>
          setForm((prev) => ({
            ...prev,
            customer_active: 0,
          }))
        }
        className="h-4 w-4"
      />
      False
    </label>
  </div>
</div>

        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
