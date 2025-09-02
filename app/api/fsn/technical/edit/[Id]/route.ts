// app/api/fsn/technical/edit/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../../lib/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// GET - Fetch FSN details for technical review
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fsnId = params.id;

    const connection = await db.getConnection();

    try {
      // Fetch FSN main details
      const [fsnRows] = await connection.execute<RowDataPacket[]>(
        `SELECT 
          fsn_id,
          enquiry_id,
          fsn_num,
          fsn_date,
          fsn_organization_name,
          fsn_contact_name,
          fsn_target_date,
          fsn_required_delivery_schedules,
          fsn_test_procedures,
          fsn_status,
          fsn_created_on,
          fsn_modified_on
        FROM crm_fsn 
        WHERE fsn_id = ? AND fsn_flag_status = 1`,
        [fsnId]
      );

      if (fsnRows.length === 0) {
        return NextResponse.json(
          { error: 'FSN not found or not submitted to technical' },
          { status: 404 }
        );
      }

      const fsnData = fsnRows[0];

      return NextResponse.json(fsnData);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching FSN data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FSN data' },
      { status: 500 }
    );
  }
}

// PUT - Update FSN status
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fsnId = params.id;
    const { status } = await req.json();

    const connection = await db.getConnection();

    try {
      await connection.execute(
        `UPDATE crm_fsn 
         SET fsn_status = ?, fsn_modified_on = NOW() 
         WHERE fsn_id = ?`,
        [status, fsnId]
      );

      return NextResponse.json({ message: 'Status updated successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error updating FSN status:', error);
    return NextResponse.json(
      { error: 'Failed to update status' },
      { status: 500 }
    );
  }
}