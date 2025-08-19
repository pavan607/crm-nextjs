import { NextResponse } from 'next/server';
import pool from '../../../lib/db'; // Adjust path as needed
import { RowDataPacket } from 'mysql2';

type LeadRow = {
  enquiry_number: string;           // was crm_enquiry_number
  enquiry_id: number;               // was crm_enquiry_id
  enquiry_name: string;             // was crm_opportunity_name
  enquiry_contact_name?: string;    // was crm_contact_name
  enquiry_type?: string;            // was crm_type
  enquiry_source?: string;          // was crm_lead_source
  enquiry_assigned_to?: number;     // was crm_assigned_to
  assigned_to_name?: string;
  enquiry_campaign_source?: string; // was crm_campaign_source
  enquiry_weighted_revenue?: number; // was crm_weighted_revenue
  enquiry_organization_name?: string; // was crm_organization_name
  enquiry_amount?: number;          // was crm_amount
  enquiry_expected_close_date?: string; // was crm_expected_close_date
  enquiry_next_step?: string;       // was crm_next_step
  enquiry_sales_stage?: string;     // was crm_sales_stage
  enquiry_probability?: number;     // was crm_probability
  enquiry_description?: string;     // was crm_description
  products?: string;
  attachments?: string;
  comments?: string;
};

const mapLeadRow = (row: LeadRow) => ({
  enquiryNumber: row.enquiry_number,        // was crm_enquiry_number
  enquiryId: row.enquiry_id,               // was crm_enquiry_id  
  opportunityName: row.enquiry_name,        // was crm_opportunity_name
  contactName: row.enquiry_contact_name,    // was crm_contact_name
  type: row.enquiry_type,                  // was crm_type
  leadSource: row.enquiry_source,          // was crm_lead_source
  assignedToId: row.enquiry_assigned_to,   // was crm_assigned_to
  assignedToName: row.assigned_to_name,
  campaignSource: row.enquiry_campaign_source, // was crm_campaign_source
  weightedRevenue: row.enquiry_weighted_revenue, // was crm_weighted_revenue
  organizationName: row.enquiry_organization_name, // was crm_organization_name
  amount: row.enquiry_amount,              // was crm_amount
  expectedCloseDate: row.enquiry_expected_close_date, // was crm_expected_close_date
  nextStep: row.enquiry_next_step,         // was crm_next_step
  salesStage: row.enquiry_sales_stage,     // was crm_sales_stage
  probability: row.enquiry_probability,    // was crm_probability
  description: row.enquiry_description,    // was crm_description
  products: row.products,
  attachments: row.attachments,
  comments: row.comments,
});

export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(`
      SELECT
        e.enquiry_number,
        e.enquiry_id,
        e.enquiry_name,
        e.enquiry_contact_name,
        e.enquiry_type,
        e.enquiry_source,
        e.enquiry_assigned_to,
        CONCAT(emp.employee_first_name, ' ', emp.employee_last_name) AS assigned_to_name,
        e.enquiry_campaign_source,
        e.enquiry_weighted_revenue,
        e.enquiry_organization_name,
        e.enquiry_amount,
        DATE_FORMAT(e.enquiry_expected_close_date, '%Y-%m-%d') AS enquiry_expected_close_date,
        e.enquiry_next_step,
        e.enquiry_sales_stage,
        e.enquiry_probability,
        e.enquiry_description,
        GROUP_CONCAT(DISTINCT p.product_name SEPARATOR ', ') AS products,
        GROUP_CONCAT(DISTINCT a.enquiry_attachment_file_name SEPARATOR ', ') AS attachments,
        GROUP_CONCAT(DISTINCT c.enquiry_comment_text SEPARATOR '; ') AS comments
      FROM crm_enquiry e
      LEFT JOIN crm_employee emp ON e.enquiry_assigned_to = emp.employee_id
      LEFT JOIN crm_enquiry_product ep ON e.enquiry_id = ep.enquiry_id
      LEFT JOIN crm_product p ON ep.product_id = p.product_id
      LEFT JOIN crm_enquiry_attachment a ON e.enquiry_id = a.enquiry_id
      LEFT JOIN crm_enquiry_comment c ON e.enquiry_id = c.enquiry_id
      GROUP BY e.enquiry_id
      ORDER BY e.enquiry_id DESC
    `);

    const leads = (rows as LeadRow[]).map(mapLeadRow);
    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Error fetching leads' }, { status: 500 });
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const leadId = parseInt(params.id);
  
  if (isNaN(leadId)) {
    return NextResponse.json({ error: 'Invalid lead ID' }, { status: 400 });
  }

  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    // Check if the enquiry exists
    const [existingLead] = await connection.query<RowDataPacket[]>(
      'SELECT crm_enquiry_id FROM crm_enquiry WHERE enquiry_id = ?',
      [leadId]
    );

    if (existingLead.length === 0) {
      await connection.rollback();
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    // Delete related records first (to maintain referential integrity)
    
    // Delete enquiry comments
    await connection.query(
      'DELETE FROM crm_enquiry_comment WHERE enquiry_id = ?',
      [leadId]
    );

    // Delete enquiry attachments
    await connection.query(
      'DELETE FROM crm_enquiry_attachment WHERE crm_enquiry_id = ?',
      [leadId]
    );

    // Delete enquiry products
    await connection.query(
      'DELETE FROM crm_enquiry_product WHERE enquiry_id = ?',
      [leadId]
    );

    // Finally, delete the main enquiry record
    const [result] = await connection.query(
      'DELETE FROM crm_enquiry WHERE enquiry_id = ?',
      [leadId]
    );

    await connection.commit();

    return NextResponse.json({ 
      message: 'Enquiry deleted successfully',
      deletedId: leadId 
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error deleting enquiry:', error);
    return NextResponse.json(
      { error: 'Failed to delete enquiry' },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}