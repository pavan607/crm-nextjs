// app/api/product/list/route.ts
import { NextResponse } from 'next/server';
import pool from '../../../lib/db'; // <-- Clean import from shared db module

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM crm_product');
    return NextResponse.json({ products: rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
