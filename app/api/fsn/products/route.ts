// app/api/fsn/products/route.ts
import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function GET() {
  try {
    const [rows] = await db.execute(`
      SELECT 
        product_id as crmtf_product_id,
        product_name,
        product_type,
        product_model_number as product_model_num,
        product_uom
      FROM crm_product
      ORDER BY product_name
    `);
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return new NextResponse('Failed to fetch products', { status: 500 });
  }
}