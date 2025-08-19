//app/api/enquiry/employee_dropdown/route.ts
import { NextResponse } from 'next/server';
import pool from '../../../lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(`
      SELECT employee_id, employee_first_name, employee_last_name
      FROM crm_employee
    `);

    console.log("rows:",rows);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json({ message: 'Error fetching employees' }, { status: 500 });
  }
}
