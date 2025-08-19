'use client';

import { useState, ChangeEvent, FormEvent } from "react";

type CustomerForm = {
  customer_name: string;
  customer_short_name: string;
  customer_contact_person: string;
  customer_address: string;
  customer_mail_id: string;
  customer_contact_number: string;
  customer_gst_num: string;
  customer_country: string;
  customer_active: string; // "1" or "0"
};

const initialForm: CustomerForm = {
  customer_name: "",
  customer_short_name: "",
  customer_contact_person: "",
  customer_address: "",
  customer_mail_id: "",
  customer_contact_number: "",
  customer_gst_num: "",
  customer_country: "",
  customer_active: "1",
};

export default function CustomerFormPage() {
  const [form, setForm] = useState<CustomerForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/customer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to register customer");
      }

      setSuccess("Customer registered successfully!");
      setForm(initialForm);
      setTimeout(() => {
        window.location.href = "/customer-list";
      }, 1200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-black rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-6">Register New Customer</h1>

      {success && <p className="text-green-600 mb-4">{success}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            Name:
            <input
              type="text"
              name="customer_name"
              value={form.customer_name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </label>

          <label className="block">
            Short Name:
            <input
              type="text"
              name="customer_short_name"
              value={form.customer_short_name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </label>

          <label className="block">
            Contact Person:
            <input
              type="text"
              name="customer_contact_person"
              value={form.customer_contact_person}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </label>

          <label className="block">
            Address:
            <textarea
              name="customer_address"
              value={form.customer_address}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </label>

          <label className="block">
            Email:
            <input
              type="email"
              name="customer_mail_id"
              value={form.customer_mail_id}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </label>

          <label className="block">
            Phone Number:
            <input
              type="tel"
              name="customer_contact_number"
              value={form.customer_contact_number}
              onChange={handleChange}
              pattern="[0-9]{10,15}"
              placeholder="10-15 digits"
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </label>

          <label className="block">
            GST Number:
            <input
              type="text"
              name="customer_gst_num"
              value={form.customer_gst_num}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </label>

          <label className="block">
            Country:
            <input
              type="text"
              name="customer_country"
              value={form.customer_country}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </label>
        </div>

        {/* ✅ Active Checkbox */}
 <div>
  <label className="block font-medium mb-2">Customer Active</label>
  <div className="flex items-center gap-6">
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={form.customer_active === "1"}
        onChange={() =>
          setForm((prev) => ({
            ...prev,
            customer_active: "1",
          }))
        }
        className="h-4 w-4"
      />
      True
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={form.customer_active === "0"}
        onChange={() =>
          setForm((prev) => ({
            ...prev,
            customer_active: "0",
          }))
        }
        className="h-4 w-4"
      />
      False
    </label>
  </div>
</div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
          >
            {submitting ? "Submitting..." : "Register"}
          </button>
          <button
            type="button"
            disabled={submitting}
            onClick={() => setForm(initialForm)}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-300"
          >
            Reset
          </button>
          <button
            type="button"
            disabled={submitting}
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
