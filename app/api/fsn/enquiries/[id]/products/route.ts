// app/api/fsn/enquiries/[id]/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../../lib/db';
import { RowDataPacket } from 'mysql2';

interface EnquiryProduct extends RowDataPacket {
  enquiry_product_id: number;
  product_id: number;
  product_name: string;
  product_type: string;
  product_model_number: string;
  product_uom: string;
  enquiry_product_quantity: number;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: enquiryId } = await params;

    const [rows] = await db.execute<EnquiryProduct[]>(
      `
      SELECT 
        ep.enquiry_product_id,
        ep.product_id as crmtf_product_id,
        p.product_name,
        p.product_type,
        p.product_model_number as product_model_num,
        p.product_uom,
        ep.enquiry_product_quantity as crm_quantity
      FROM crm_enquiry_product ep
      JOIN crm_product p ON ep.product_id = p.product_id
      WHERE ep.enquiry_id = ?
      `,
      [enquiryId]
    );

    return NextResponse.json(rows ?? []);
  } catch (error) {
    console.error('Database error:', error);
    return new NextResponse('Failed to fetch products', { status: 500 });
  }
}