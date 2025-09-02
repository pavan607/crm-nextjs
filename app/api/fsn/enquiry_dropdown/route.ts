import { NextResponse } from "next/server";
import db from "../../../lib/db";

export async function GET() {
  try {
    const [rows] = await db.execute(`
      SELECT 
        e.enquiry_id AS crm_enquiry_id,
        e.enquiry_number AS crm_enquiry_number,
        e.enquiry_name AS crm_opportunity_name,
        e.enquiry_organization_name AS crm_organization_name,
        e.enquiry_contact_name AS crm_contact_name,
        e.enquiry_created_on AS created_on
      FROM crm_enquiry e
      LEFT JOIN crm_fsn f
        ON f.enquiry_id = e.enquiry_id
      WHERE f.fsn_id IS NULL   -- ✅ Only fetch enquiries without FSN
      ORDER BY e.enquiry_created_on ASC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    return new NextResponse("Failed to fetch enquiries", { status: 500 });
  }
}
