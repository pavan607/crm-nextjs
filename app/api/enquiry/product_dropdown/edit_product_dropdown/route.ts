// app/api/enquiry/product_dropdown/route.ts

import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET() {
  console.log('📦 === PRODUCT DROPDOWN API STARTED ===');
  
  try {
    console.log('🔌 Getting database connection...');
    const connection = await pool.getConnection();
    
    try {
      console.log('📋 Executing query...');
      const [rows] = await connection.execute<RowDataPacket[]>(`
        SELECT 
          product_id as crmtf_product_id,
          product_name as crmtf_product_name,
          product_code as crmtf_product_code,
          product_type as crmtf_product_type,
          product_model_number as crmtf_product_model_number,
          product_uom as crmtf_product_uom
        FROM crm_product 
        ORDER BY product_name ASC
      `);
      
      console.log('✅ Products fetched:', rows.length, 'products found');
      console.log('📊 Sample product:', rows[0]); // Debug log to see the data structure
      return NextResponse.json(rows);
      
    } finally {
      connection.release();
      console.log('🔌 Database connection released');
    }
    
  } catch (error) {
    console.error('❌ Database error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch products',
        details: (error as Error).message 
      },
      { status: 500 }
    );
  } finally {
    console.log('📦 === PRODUCT DROPDOWN API FINISHED ===');
  }
}
