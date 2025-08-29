// app/api/fsn/dropdown/route.ts
import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function GET() {
  try {
    const [rows] = await db.execute(`
      SELECT 
        enquiry_id as crm_enquiry_id,
        enquiry_number as crm_enquiry_number,
        enquiry_name as crm_opportunity_name,
        enquiry_organization_name as crm_organization_name,
        enquiry_contact_name as crm_contact_name,
        enquiry_created_on as created_on
      FROM crm_enquiry 
      ORDER BY enquiry_created_on ASC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return new NextResponse('Failed to fetch enquiries', { status: 500 });
  }
}
