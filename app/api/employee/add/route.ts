// app/api/employee/add/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const department_id = formData.get('department_id') as string;
    const employee_number = formData.get('employee_number') as string;
    const employee_first_name = formData.get('employee_first_name') as string;
    const employee_last_name = formData.get('employee_last_name') as string;
    const employee_short_name = formData.get('employee_short_name') as string;
    const employee_email = formData.get('employee_email') as string;
    const employee_dob = formData.get('employee_dob') as string;
    const employee_contact_number = formData.get('employee_contact_number') as string;
    const employee_designation = formData.get('employee_designation') as string;
    const employee_reporting_to = formData.get('employee_reporting_to') as string;
    const employee_date_of_reliving = formData.get('employee_date_of_reliving') as string;

    // Handle file uploads
    const digitalSignatureFile = formData.get('employee_digital_signature') as File | null;
    const photoFile = formData.get('employee_photo') as File | null;

    let digitalSignaturePath: string | null = null;
    let photoPath: string | null = null;

    // Prepare uploads directory
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'employees');
    await mkdir(uploadsDir, { recursive: true });

    // Save digital signature if exists
    if (digitalSignatureFile && digitalSignatureFile.size > 0) {
      const timestamp = Date.now();
      const ext = path.extname(digitalSignatureFile.name);
      const fileName = `signature_${employee_number}_${timestamp}${ext}`;
      const fullPath = path.join(uploadsDir, fileName);

      const bytes = await digitalSignatureFile.arrayBuffer();
      await writeFile(fullPath, Buffer.from(bytes));

      digitalSignaturePath = `/uploads/employees/${fileName}`;
    }

    // Save photo if exists
    if (photoFile && photoFile.size > 0) {
      const timestamp = Date.now();
      const ext = path.extname(photoFile.name);
      const fileName = `photo_${employee_number}_${timestamp}${ext}`;
      const fullPath = path.join(uploadsDir, fileName);

      const bytes = await photoFile.arrayBuffer();
      await writeFile(fullPath, Buffer.from(bytes));

      photoPath = `/uploads/employees/${fileName}`;
    }

    // Get a connection from the pool
    const conn = await pool.getConnection();

    // Call stored procedure
    await conn.execute(
      `CALL AddEmployee(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        parseInt(department_id),
        employee_number,
        employee_first_name,
        employee_last_name,
        employee_short_name,
        employee_email,
        employee_dob || null,
        employee_contact_number,
        employee_designation,
        employee_reporting_to,
        digitalSignaturePath,
        employee_date_of_reliving || null,
        photoPath,
      ]
    );

    conn.release();

    return NextResponse.json({
      message: 'Employee registered successfully',
      success: true,
    });
  } catch (error: unknown) {
    console.error('Error registering employee:', error);
    let message = 'Internal Server Error';
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json(
      { message, success: false },
      { status: 500 }
    );
  }
}
