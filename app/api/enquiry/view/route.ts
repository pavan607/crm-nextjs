import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db"; // Adjust the path if needed

export async function GET(
  req: NextRequest,
  { params }: { params: { leadId: string } }
) {
  try {
    const leadId = params.leadId;

    if (!leadId || isNaN(Number(leadId))) {
      return NextResponse.json(
        { message: "Invalid lead ID" },
        { status: 400 }
      );
    }

    // 1️⃣ Fetch main lead details
    const [leadRows]: any = await db.query(
      `
      SELECT 
        e.crm_enquiry_id,
        e.crm_opportunity_name,
        e.crm_contact_name,
        e.crm_type,
        e.crm_lead_source,
        e.crm_campaign_source,
        e.crm_weighted_revenue,
        e.crm_organization_name,
        e.crm_amount,
        e.crm_expected_close_date,
        e.crm_next_step,
        e.crm_sales_stage,
        e.crm_probability,
        e.crm_description,
        emp.employee_name AS assignedToName
      FROM crmtf_enquiry e
      LEFT JOIN crmtf_employee emp 
        ON e.crm_assigned_to = emp.employee_id
      WHERE e.crm_enquiry_id = ?
      `,
      [leadId]
    );

    if (leadRows.length === 0) {
      return NextResponse.json(
        { message: "Lead not found" },
        { status: 404 }
      );
    }

    const lead = leadRows[0];

    // 2️⃣ Fetch attachments
    const [attachments]: any = await db.query(
      `
      SELECT 
        file_name,
        file_path
      FROM crmtf_enquiry_attachment
      WHERE enquiry_id = ?
      `,
      [leadId]
    );

    // 3️⃣ Fetch comments
    const [comments]: any = await db.query(
      `
      SELECT 
        c.comment_text,
        c.commented_on,
        emp.employee_name AS commented_by_name
      FROM crmtf_enquiry_comment c
      LEFT JOIN crmtf_employee emp 
        ON c.commented_by = emp.employee_id
      WHERE c.enquiry_id = ?
      ORDER BY c.commented_on DESC
      `,
      [leadId]
    );

    // 4️⃣ Fetch products
    const [products]: any = await db.query(
      `
      SELECT 
        p.product_name
      FROM crmtf_enquiry_product ep
      LEFT JOIN crmtf_product p
        ON ep.product_id = p.product_id
      WHERE ep.enquiry_id = ?
      `,
      [leadId]
    );

    // 5️⃣ Combine response
    const response = {
      ...lead,
      attachments,
      comments,
      products,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching lead details:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
