
// app/api/fsn/department_dropdown/route.ts
import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function GET() {
  try {
    const [rows] = await db.execute(`
      SELECT 
        department_id,
        department_name
      FROM crm_department 
      ORDER BY department_name ASC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch departments' }, 
      { status: 500 }
    );
  }
}