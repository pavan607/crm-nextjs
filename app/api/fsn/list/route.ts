import { NextRequest, NextResponse } from 'next/server';
import db from '../../../lib/db'; // MySQL connection

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const dateFrom = searchParams.get('dateFrom') || '';
    const dateTo = searchParams.get('dateTo') || '';
    const organization = searchParams.get('organization') || '';
    
    const offset = (page - 1) * limit;
    
    // Build where conditions (MySQL syntax)
    let whereConditions = [];
    let queryParams: any[] = [];
    
    if (search) {
      whereConditions.push(`(
        cf.fsn_num LIKE ? OR 
        ce.crm_enquiry_number LIKE ? OR 
        cf.fsn_organization_name LIKE ? OR 
        cf.fsn_contact_name LIKE ?
      )`);
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }
    
    if (status) {
      whereConditions.push(`cf.fsn_status = ?`);
      queryParams.push(status);
    }
    
    if (dateFrom) {
      whereConditions.push(`cf.fsn_date >= ?`);
      queryParams.push(dateFrom);
    }
    
    if (dateTo) {
      whereConditions.push(`cf.fsn_date <= ?`);
      queryParams.push(dateTo);
    }
    
    if (organization) {
      whereConditions.push(`cf.fsn_organization_name LIKE ?`);
      queryParams.push(`%${organization}%`);
    }
    
    const whereClause = whereConditions.length > 0 
      ? `WHERE ${whereConditions.join(' AND ')}`
      : '';
    
    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM crm_fsn cf
      LEFT JOIN crmtf_enquiry ce ON cf.fsn_enquiry_id = ce.crm_enquiry_id
      ${whereClause}
    `;
    
    const [countResult] = await db.query(countQuery, queryParams) as any;
    const total = countResult[0].total;
    
    // Get records with pagination
    const recordsQuery = `
      SELECT 
        cf.fsn_id,
        cf.fsn_enquiry_id,
        ce.crm_enquiry_number,
        cf.fsn_enquiry_date,
        cf.fsn_num,
        cf.fsn_date,
        cf.fsn_organization_name,
        cf.fsn_contact_name,
        cf.fsn_target_date,
        cf.fsn_required_delivery_schedules,
        cf.fsn_test_procedures,
        cf.created_on,
        cf.modified_on,
        cf.fsn_status as status,
        (
          SELECT COUNT(*) 
          FROM crm_fsn_product cfp 
          WHERE cfp.fsn_id = cf.fsn_id
        ) as products_count
      FROM crm_fsn cf
      LEFT JOIN crmtf_enquiry ce ON cf.fsn_enquiry_id = ce.crm_enquiry_id
      ${whereClause}
      ORDER BY cf.created_on DESC
      LIMIT ? OFFSET ?
    `;
    
    const finalParams = [...queryParams, limit, offset];
    const [rows] = await db.query(recordsQuery, finalParams) as any;
    
    return NextResponse.json({
      success: true,
      data: rows,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Error fetching FSN records:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch FSN records' 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { ids } = await request.json();
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No IDs provided' },
        { status: 400 }
      );
    }
    
    // Create placeholders for IN clause
    const placeholders = ids.map(() => '?').join(',');
    
    // Delete related attachments and products first (CASCADE should handle this but being explicit)
    await db.query(
      `DELETE FROM crm_fsn_attachments WHERE fsn_id IN (${placeholders})`,
      ids
    );
    
    await db.query(
      `DELETE FROM crm_fsn_product WHERE fsn_id IN (${placeholders})`,
      ids
    );
    
    // Delete FSN records
    const [result] = await db.query(
      `DELETE FROM crm_fsn WHERE fsn_id IN (${placeholders})`,
      ids
    ) as any;
    
    return NextResponse.json({
      success: true,
      message: `${result.affectedRows} records deleted successfully`
    });
    
  } catch (error) {
    console.error('Error deleting FSN records:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete FSN records' 
      },
      { status: 500 }
    );
  }
}