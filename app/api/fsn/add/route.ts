// app/api/fsn/add/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '../../../lib/db';
import { ResultSetHeader } from 'mysql2';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      enquiry_number,
      fsn_enquiry_date,
      fsn_num,
      fsn_date,
      fsn_organization_name,
      fsn_contact_name,
      fsn_target_date,
      fsn_required_delivery_schedules,
      fsn_test_procedures,
      products
    } = body;

    // Validate required fields
    if (!enquiry_number) {
      return NextResponse.json(
        { error: 'Enquiry number is required' },
        { status: 400 }
      );
    }

    if (!fsn_num) {
      return NextResponse.json(
        { error: 'FSN number is required' },
        { status: 400 }
      );
    }

    if (!products || products.length === 0) {
      return NextResponse.json(
        { error: 'At least one product is required' },
        { status: 400 }
      );
    }

    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      // 1. Insert into FSN main table using correct field names from schema
      const [fsnResult] = await connection.execute<ResultSetHeader>(
        `INSERT INTO crm_fsn (
          enquiry_id,
          enquiry_date,
          fsn_num,
          fsn_date,
          fsn_organization_name,
          fsn_contact_name,
          fsn_target_date,
          fsn_required_delivery_schedules,
          fsn_test_procedures,
          fsn_created_on,
          fsn_modified_on,
          fsn_created_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NULL, ?)`,
        [
          enquiry_number,
          fsn_enquiry_date || null,
          fsn_num || null,
          fsn_date || null,
          fsn_organization_name || null,
          fsn_contact_name || null,
          fsn_target_date || null,
          fsn_required_delivery_schedules || null,
          fsn_test_procedures || null,
          1 // TODO: Replace with actual logged-in user ID
        ]
      );

      const fsnId = fsnResult.insertId;

      // 2. Insert products using correct field names from schema
      for (const product of products) {
        const [productResult] = await connection.execute<ResultSetHeader>(
          `INSERT INTO crm_fsn_product (
            fsn_id,
            product_id,
            fsn_product_qty,
            fsn_product_feasibility,
            fsn_product_bom_cost,
            fsn_product_comments
          ) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            fsnId,
            product.crmtf_product_id || null,
            product.fsn_product_qty || 0,
            product.feasibility || null,
            product.bom_cost || null,
            product.fsn_comments || null,
          ]
        );

        const fsnProductId = productResult.insertId;

        // Handle attachments if any
        if (product.attachments && Array.isArray(product.attachments) && product.attachments.length > 0) {
          for (const attachment of product.attachments) {
            await connection.execute(
              `INSERT INTO crm_fsn_attachment (
                fsn_id,
                fsn_product_id,
                fsn_attachment_file_name,
                fsn_attachment_file_size,
                fsn_attachment_file_type,
                fsn_attachment_file_url
              ) VALUES (?, ?, ?, ?, ?, ?)`,
              [
                fsnId,
                fsnProductId,
                attachment.name || null,
                attachment.size || null,
                attachment.type || null,
                attachment.url || null,
              ]
            );
          }
        }
      }

      await connection.commit();
      
      return NextResponse.json({ 
        message: 'FSN created successfully', 
        fsnId: fsnId 
      });
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('FSN creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create FSN', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}