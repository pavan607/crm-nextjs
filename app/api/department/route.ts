// app/api/departments/route.ts
import { NextResponse } from 'next/server';
import pool from '../../lib/db';

import { RowDataPacket } from 'mysql2';

export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT department_id, department_name FROM crm_department'
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
