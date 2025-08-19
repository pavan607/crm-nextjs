import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../lib/db';  // Adjust relative path to your db.ts

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const departmentId = searchParams.get('departmentId');

  try {
    let query = `
      SELECT 
        employee_id, 
        employee_first_name, 
        employee_last_name,
        employee_designation,
        employee_email,
        department_id
      FROM crm_employee 
    `;
    
    let params: any[] = [];

    // If departmentId is provided, filter by it
    if (departmentId) {
      const deptId = parseInt(departmentId, 10);
      if (isNaN(deptId)) {
        return NextResponse.json({ error: 'Invalid department ID' }, { status: 400 });
      }
      query += ' WHERE department_id = ?';
      params.push(deptId);
    }

    query += ' ORDER BY employee_first_name, employee_last_name';

    const [rows] = await pool.query(query, params);

    // Ensure we return an array
    return NextResponse.json(Array.isArray(rows) ? rows : []);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
  }
}