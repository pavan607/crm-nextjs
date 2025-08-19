import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Employee {
  employee_id: number;
  employee_first_name?: string;
  employee_last_name?: string;
  employee_email?: string;
  employee_number?: string;
  employee_designation?: string;
  department_name?: string;
  employee_contact_number?: string;
  employee_dob?: string;
  employee_reporting_to?: string;
  employee_date_of_reliving?: string;
  employee_digital_signature?: string;
  employee_photo?: string;
  created_on?: string;
  modified_on?: string;
}

interface EmployeePageProps {
  params: Promise<{
    employeeId: string;
  }>;
}

export default async function EmployeePage({ params }: EmployeePageProps) {
  // Await the params object before accessing its properties
  const { employeeId } = await params;

  if (!employeeId) {
    notFound();
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/employee/${employeeId}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    notFound();
  }

  const employee: Employee = await res.json();

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <main style={{ padding: '1rem', maxWidth: '700px', margin: '0 auto' }}>
      <h1>
        {employee.employee_first_name} {employee.employee_last_name}
      </h1>

      <p><strong>Email:</strong> {employee.employee_email || '—'}</p>
      <p><strong>Employee Number:</strong> {employee.employee_number || '—'}</p>
      <p><strong>Designation:</strong> {employee.employee_designation || '—'}</p>
      <p><strong>Department:</strong> {employee.department_name || '—'}</p>
      <p><strong>Contact:</strong> {employee.employee_contact_number || '—'}</p>
      <p><strong>Date of Birth:</strong> {formatDate(employee.employee_dob)}</p>
      <p><strong>Reporting To:</strong> {employee.employee_reporting_to || '—'}</p>
      <p><strong>Date of Relieving:</strong> {formatDate(employee.employee_date_of_reliving)}</p>

      <p><strong>Photo:</strong></p>
      {employee.employee_photo && (
      <Image src={employee.employee_photo} 
          alt={`${employee.employee_first_name} ${employee.employee_last_name}`}
          width={200} height={200} style={{ borderRadius: '8px', marginTop: '1rem' }}
          priority={true}
          />
        )}
      <p><strong>Digital Signature:</strong></p>
      {employee.employee_digital_signature && (
      <Image src={employee.employee_digital_signature} 
          alt={`${employee.employee_first_name} ${employee.employee_last_name}`}
          width={200} height={200} style={{ borderRadius: '8px', marginTop: '1rem' }}
          priority={true}
          />
        )}
      
    </main>
  );
}