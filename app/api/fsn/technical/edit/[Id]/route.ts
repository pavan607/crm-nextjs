// app/api/fsn/technical/edit/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../lib/db";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ Mark params as Promise
) {
  try {
    const { id } = await context.params; // ✅ Await params
    const fsnId = Number(id);

    if (!fsnId) {
      return NextResponse.json({ error: "Invalid FSN ID" }, { status: 400 });
    }

    const connection = await db.getConnection();
    try {
      const [fsnRows] = await connection.execute(
        `SELECT 
          f.*,
          e.enquiry_name,
          e.enquiry_contact_name,
          e.enquiry_organization_name
         FROM crm_fsn f
         LEFT JOIN crm_enquiry e ON f.enquiry_id = e.enquiry_id
         WHERE f.fsn_id = ?`,
        [fsnId]
      );

      const fsnData = Array.isArray(fsnRows) ? fsnRows[0] : null;

      if (!fsnData) {
        return NextResponse.json({ error: "FSN not found" }, { status: 404 });
      }

      return NextResponse.json(fsnData);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("❌ Error fetching FSN:", error);
    return NextResponse.json({ error: "Failed to fetch FSN" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ Mark params as Promise
) {
  try {
    const { id } = await context.params; // ✅ Await params
    const fsnId = Number(id);
    const body = await req.json();

    if (!fsnId) {
      return NextResponse.json({ error: "Invalid FSN ID" }, { status: 400 });
    }

    const {
      fsn_enquiry_date,
      fsn_date,
      fsn_organization_name,
      fsn_contact_name,
      fsn_target_date,
      fsn_required_delivery_schedules,
      fsn_test_procedures,
      send_to_technical,
    } = body;

    const connection = await db.getConnection();
    try {
      const updateQuery = `
        UPDATE crm_fsn 
        SET 
          enquiry_date = ?,
          fsn_date = ?,
          fsn_organization_name = ?,
          fsn_contact_name = ?,
          fsn_target_date = ?,
          fsn_required_delivery_schedules = ?,
          fsn_test_procedures = ?,
          fsn_status = ?,
          fsn_flag_status = ?,
          fsn_modified_on = NOW()
        WHERE fsn_id = ?
      `;

      const status = send_to_technical ? "submitted" : "draft";
      const flagStatus = send_to_technical ? 1 : 0;

      await connection.execute(updateQuery, [
        fsn_enquiry_date,
        fsn_date,
        fsn_organization_name,
        fsn_contact_name,
        fsn_target_date,
        fsn_required_delivery_schedules,
        fsn_test_procedures,
        status,
        flagStatus,
        fsnId,
      ]);

      return NextResponse.json({ message: "FSN updated successfully" });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("❌ Error updating FSN:", error);
    return NextResponse.json({ error: "Failed to update FSN" }, { status: 500 });
  }
}
