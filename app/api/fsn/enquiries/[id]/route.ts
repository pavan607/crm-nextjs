// app/api/fsn/enquiries/[id]/route.ts
import { NextResponse } from 'next/server';
import db from '../../../../lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: enquiryId } = await params;
    
    const [rows] = await db.execute(`
      SELECT 
        enquiry_id as crm_enquiry_id,
        enquiry_number as crm_enquiry_number,
        enquiry_name as crm_opportunity_name,
        enquiry_organization_name as crm_organization_name,
        enquiry_contact_name as crm_contact_name,
        enquiry_created_on as created_on
      FROM crm_enquiry
      WHERE enquiry_id = ?
    `, [enquiryId]);
    
    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json(rows[0]);
    } else {
      return new NextResponse('Enquiry not found', { status: 404 });
    }
  } catch (error) {
    console.error('Database error:', error);
    return new NextResponse('Failed to fetch enquiry', { status: 500 });
  }
}