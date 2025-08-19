"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';

type Department = {
  department_id: number;
  department_name: string;
};

const departmentDesignations: Record<number, string[]> = {
  1: ["Software Engineer", "Tester", "Developer"],
  2: ["Research Analyst", "Lab Technician", "Project Manager"],
  3: ["Accountant", "Financial Analyst", "Auditor"],
  9: ["Layout Engineer","Senior RF Engineer","Senior Software Engineer"]
};

export default function EmployeeRegister() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [form, setForm] = useState({
    department_id: "",
    employee_number: "",
    employee_first_name: "",
    employee_last_name: "",
    employee_short_name: "",
    employee_email: "",
    employee_dob: "",
    employee_contact_number: "",
    employee_designation: "",
    employee_reporting_to: "",
    employee_date_of_reliving: "",
  });

  const [digitalSignatureFile, setDigitalSignatureFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch departments from database
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoadingDepartments(true);
        const response = await fetch('/api/employee/department_dropdown');
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setErrorMsg('Failed to load departments. Please refresh the page.');
      } finally {
        setLoadingDepartments(false);
      }
    };

    fetchDepartments();
  }, []);

  const designations = form.department_id
    ? departmentDesignations[Number(form.department_id)] || []
    : [];

  const resetForm = () => {
    setForm({
      department_id: "",
      employee_number: "",
      employee_first_name: "",
      employee_last_name: "",
      employee_short_name: "",
      employee_email: "",
      employee_dob: "",
      employee_contact_number: "",
      employee_designation: "",
      employee_reporting_to: "",
      employee_date_of_reliving: "",
    });
    setDigitalSignatureFile(null);
    setPhotoFile(null);
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? All unsaved changes will be lost.")) {
      resetForm();
    }
  };

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    if (name === "department_id") {
      setForm((prev) => ({
        ...prev,
        department_id: value,
        employee_designation: "",
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const formDataToSend = new FormData();

      // Append all text fields
      Object.entries(form).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append files if selected
      if (digitalSignatureFile) {
        formDataToSend.append("employee_digital_signature", digitalSignatureFile);
      }
      if (photoFile) {
        formDataToSend.append("employee_photo", photoFile);
      }

      const res = await fetch("/api/employee/add", {
        method: "POST",
        body: formDataToSend,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to register employee");
      }

      setSuccessMsg("Employee registered successfully!");
      resetForm();
    } catch (error: unknown) {
      if (error instanceof Error) setErrorMsg(error.message);
      else setErrorMsg("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto mt-2 p-3 bg-white shadow-md rounded-lg text-sm">
      {/* Breadcrumb */}
      <nav className="mb-4" aria-label="Breadcrumb">
        <div className="flex items-center space-x-2 text-sm">
          <Link 
            href="/employee-list"
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
          >
            All
          </Link>
          <span className="mx-2 text-gray-400">→</span>
          <Link 
            href="/employee"
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
          >
            Form
          </Link>
        </div>
      </nav>
      
      <h1 className="text-3xl font-bold mb-6">Employee Registration</h1>

      {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}
      {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}

      <div className="space-y-6">
        {/* Department and Designation Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            Department:
            <select
              name="department_id"
              value={form.department_id}
              onChange={handleChange}
              required
              disabled={loadingDepartments}
              className="w-full mt-1 p-2 rounded border disabled:bg-gray-100"
            >
              <option value="">
                {loadingDepartments ? "Loading departments..." : "Select Department"}
              </option>
              {departments.map((d) => (
                <option key={d.department_id} value={d.department_id}>
                  {d.department_name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            Designation:
            <select
              name="employee_designation"
              value={form.employee_designation || ""}
              onChange={handleChange}
              required={designations.length > 0}
              disabled={designations.length === 0}
              className="w-full mt-1 p-2 rounded border disabled:bg-gray-100"
            >
              <option value="">Select Designation</option>
              {designations.map((desig) => (
                <option key={desig} value={desig}>
                  {desig}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Employee Number and Short Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            Employee Number:
            <input
              type="text"
              name="employee_number"
              value={form.employee_number}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 rounded border"
            />
          </label>

          <label className="block">
            Short Name:
            <input
              type="text"
              name="employee_short_name"
              value={form.employee_short_name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 rounded border"
            />
          </label>
        </div>

        {/* First Name and Last Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            First Name:
            <input
              type="text"
              name="employee_first_name"
              value={form.employee_first_name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 rounded border"
            />
          </label>

          <label className="block">
            Last Name:
            <input
              type="text"
              name="employee_last_name"
              value={form.employee_last_name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 rounded border"
            />
          </label>
        </div>

        {/* Email and Contact Number Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            Email:
            <input
              type="email"
              name="employee_email"
              value={form.employee_email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 rounded border"
            />
          </label>

          <label className="block">
            Contact Number:
            <input
              type="tel"
              name="employee_contact_number"
              value={form.employee_contact_number}
              onChange={handleChange}
              pattern="[0-9]{10}"
              placeholder="10 digits"
              className="w-full mt-1 p-2 rounded border"
            />
          </label>
        </div>

        {/* Date of Birth and Reporting To Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            Date of Birth:
            <input
              type="date"
              name="employee_dob"
              value={form.employee_dob}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded border"
            />
          </label>

          <label className="block">
            Reporting To:
            <input
              type="text"
              name="employee_reporting_to"
              value={form.employee_reporting_to}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded border"
            />
          </label>
        </div>

        {/* Date of Relieving */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            Date of Relieving <span className="text-gray-500 text-sm">(Optional)</span>:
            <input
              type="date"
              name="employee_date_of_reliving"
              value={form.employee_date_of_reliving}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded border"
            />
          </label>
        </div>

        {/* File Upload Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">File Uploads</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              Digital Signature:
              <input
                type="file"
                name="employee_digital_signature"
                accept="image/*,application/pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setDigitalSignatureFile(file);
                }}
                className="w-full mt-1 p-2 rounded border"
              />
              {digitalSignatureFile && (
                <p className="text-sm text-gray-600 mt-1">
                  Selected: {digitalSignatureFile.name}
                </p>
              )}
            </label>

            <label className="block">
              Employee Photo:
              <input
                type="file"
                name="employee_photo"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setPhotoFile(file);
                }}
                className="w-full mt-1 p-2 rounded border"
              />
              {photoFile && (
                <p className="text-sm text-gray-600 mt-1">
                  Selected: {photoFile.name}
                </p>
              )}
            </label>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={handleSubmit}
            disabled={submitting || loadingDepartments}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 font-medium text-lg"
          >
            {submitting ? "Submitting..." : "Register"}
          </button>
          
          <button
            onClick={resetForm}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-medium text-lg"
          >
            Reset
          </button>
          
          <button
            onClick={handleCancel}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium text-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}