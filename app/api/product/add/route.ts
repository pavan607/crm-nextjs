// /app/api/product/add/route.ts

import { NextRequest, NextResponse } from 'next/server'; 
import pool from '../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      product_name,
      product_code,
      product_short_name,
      product_type,
      product_model_number,
      product_uom,
    } = body;

    if (!product_name || !product_code || !product_type) {
      return NextResponse.json(
        { message: 'Product name, code, and type are required.' },
        { status: 400 }
      );
    }

    await pool.execute(
      `INSERT INTO crm_product 
      (product_name, product_code, product_short_name, product_type, product_model_number, product_uom)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        product_name,
        product_code,
        product_short_name,
        product_type,
        product_model_number,
        product_uom,
      ]
    );

    return NextResponse.json({ message: 'Product added successfully' }, { status: 200 });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
