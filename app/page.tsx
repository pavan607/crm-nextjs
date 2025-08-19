'use client';

import { Button } from 'react-bootstrap';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white py-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
          👋 Welcome to CRM Dashboard
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Manage your customers, employees, products, and view real-time reports — all in one place.
        </p>

        <div className="flex justify-center flex-wrap gap-4 mt-6">
          <Link href="/customer-list">
            <Button variant="primary" className="px-4 py-2 rounded-full shadow-sm">
              View Customers
            </Button>
          </Link>

          <Link href="/employee-list">
            <Button variant="success" className="px-4 py-2 rounded-full shadow-sm">
              View Employees
            </Button>
          </Link>

          <Link href="/sales-reports">
            <Button variant="warning" className="px-4 py-2 rounded-full shadow-sm">
              Sales Reports
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
