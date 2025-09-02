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
    
    console.log('API: Fetching FSN with ID:', fsnId); // Debug log

    if (!fsnId || isNaN(Number(fsnId))) {
      return NextResponse.json(
        { error: 'Invalid FSN ID provided' },
        { status: 400 }
      );
    }

    const connection = await db.getConnection();

    try {
      // First, check if FSN exists regardless of flag status
      const [checkRows] = await connection.execute<RowDataPacket[]>(
        `SELECT fsn_id, fsn_flag_status FROM crm_fsn WHERE fsn_id = ?`,
        [fsnId]
      );

      if (checkRows.length === 0) {
        return NextResponse.json(
          { error: 'FSN not found' },
          { status: 404 }
        );
      }

      console.log('API: FSN found, flag status:', checkRows[0].fsn_flag_status); // Debug log

      // Fetch FSN main details - Remove flag status restriction for now
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
          fsn_flag_status,
          fsn_created_on,
          fsn_modified_on
        FROM crm_fsn 
        WHERE fsn_id = ?`,
        [fsnId]
      );

      if (fsnRows.length === 0) {
        return NextResponse.json(
          { error: 'FSN not found' },
          { status: 404 }
        );
      }

      const fsnData = fsnRows[0];
      
      // Also fetch the enquiry date from the enquiry table if needed
      const [enquiryRows] = await connection.execute<RowDataPacket[]>(
        `SELECT created_on as enquiry_date FROM crm_enquiry WHERE crm_enquiry_id = ?`,
        [fsnData.enquiry_id]
      );

      const response = {
        ...fsnData,
        enquiry_date: enquiryRows.length > 0 ? enquiryRows[0].enquiry_date : null
      };

      console.log('API: Returning FSN data:', response); // Debug log

      return NextResponse.json(response);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching FSN data:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch FSN data', 
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}

// PUT - Update FSN data
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fsnId = params.id;
    const body = await req.json();
    
    console.log('API: Updating FSN ID:', fsnId, 'with data:', body); // Debug log

    const {
      fsn_enquiry_date,
      fsn_date,
      fsn_organization_name,
      fsn_contact_name,
      fsn_target_date,
      fsn_required_delivery_schedules,
      fsn_test_procedures,
      send_to_technical,
      status // Direct status update
    } = body;

    const connection = await db.getConnection();

    try {
      let query = '';
      let params: any[] = [];

      if (status) {
        // Direct status update
        query = `UPDATE crm_fsn 
                 SET fsn_status = ?, fsn_modified_on = NOW() 
                 WHERE fsn_id = ?`;
        params = [status, fsnId];
      } else {
        // Full FSN update
        const newStatus = send_to_technical ? 'submitted' : 'draft';
        const newFlagStatus = send_to_technical ? 1 : 0;

        query = `UPDATE crm_fsn 
                 SET fsn_date = ?,
                     fsn_organization_name = ?,
                     fsn_contact_name = ?,
                     fsn_target_date = ?,
                     fsn_required_delivery_schedules = ?,
                     fsn_test_procedures = ?,
                     fsn_status = ?,
                     fsn_flag_status = ?,
                     fsn_modified_on = NOW()
                 WHERE fsn_id = ?`;
        
        params = [
          fsn_date,
          fsn_organization_name,
          fsn_contact_name,
          fsn_target_date,
          fsn_required_delivery_schedules,
          fsn_test_procedures,
          newStatus,
          newFlagStatus,
          fsnId
        ];
      }

      const [result] = await connection.execute<ResultSetHeader>(query, params);

      if (result.affectedRows === 0) {
        return NextResponse.json(
          { error: 'FSN not found or no changes made' },
          { status: 404 }
        );
      }

      console.log('API: FSN updated successfully'); // Debug log

      return NextResponse.json({ 
        message: 'FSN updated successfully',
        affectedRows: result.affectedRows 
      });
      
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error updating FSN:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update FSN', 
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}