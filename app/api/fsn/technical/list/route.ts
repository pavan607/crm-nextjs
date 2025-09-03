import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../lib/db'; // MySQL connection

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
    const flagStatus = searchParams.get('flagStatus') || '';

    const offset = (page - 1) * limit;

    // Build where conditions (MySQL syntax)
    let whereConditions = [];
    let queryParams: any[] = [];

    // Show only records with fsn_flag_status 1 or 2
    whereConditions.push(`cf.fsn_flag_status IN (1, 2)`);

    if (search) {
      whereConditions.push(`(
        cf.fsn_num LIKE ? OR 
        ce.enquiry_number LIKE ? OR 
        cf.fsn_organization_name LIKE ? OR 
        cf.fsn_contact_name LIKE ?
      )`);
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (status) {
      whereConditions.push(`cf.fsn_status = ?`);
      queryParams.push(status);
    }

    if (flagStatus) {
      whereConditions.push(`cf.fsn_flag_status = ?`);
      queryParams.push(parseInt(flagStatus));
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
      LEFT JOIN crm_enquiry ce ON cf.enquiry_id = ce.enquiry_id
      ${whereClause}
    `;

    const [countResult] = await db.query(countQuery, queryParams) as any;
    const total = countResult[0].total;

    // Get records with product names + pagination
    const recordsQuery = `
  SELECT 
    cf.fsn_id,
    cf.enquiry_id as fsn_enquiry_id,
    ce.enquiry_number as crm_enquiry_number,
    cf.enquiry_date as fsn_enquiry_date,
    cf.fsn_num,
    cf.fsn_date,
    cf.fsn_organization_name,
    cf.fsn_contact_name,
    cf.fsn_target_date,
    cf.fsn_required_delivery_schedules,
    cf.fsn_test_procedures,
    cf.fsn_created_on as created_on,
    cf.fsn_modified_on as modified_on,
    cf.fsn_status as status,
    cf.fsn_flag_status,
    (
      SELECT COUNT(*) 
      FROM crm_fsn_product cfp 
      WHERE cfp.fsn_id = cf.fsn_id
    ) as products_count,
    (
      SELECT GROUP_CONCAT(p.product_name SEPARATOR ', ')
      FROM crm_fsn_product cfp
      LEFT JOIN crm_product p ON p.product_id = cfp.product_id
      WHERE cfp.fsn_id = cf.fsn_id
    ) as product_names
  FROM crm_fsn cf
  LEFT JOIN crm_enquiry ce ON cf.enquiry_id = ce.enquiry_id
  ${whereClause}
  ORDER BY cf.fsn_created_on DESC
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
