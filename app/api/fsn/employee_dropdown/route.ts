// app/api/fsn/employee_dropdown/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const departmentId = searchParams.get('departmentId');

    if (!departmentId) {
      return NextResponse.json(
        { error: 'Department ID is required' }, 
        { status: 400 }
      );
    }

    const [rows] = await db.execute(`
      SELECT 
        employee_id,
        employee_first_name,
        employee_last_name,
        employee_designation
      FROM crm_employee 
      WHERE department_id = ?
      ORDER BY employee_first_name ASC, employee_last_name ASC
    `, [departmentId]);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch employees' }, 
      { status: 500 }
    );
  }
}