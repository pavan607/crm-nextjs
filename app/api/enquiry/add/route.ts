// app/api/enquiry/add/route.ts - Fixed POST method
import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../lib/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT employee_id, employee_number, employee_first_name, employee_last_name FROM crm_employee'
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const data = {
      opportunityName: formData.get('opportunityName') as string,
      contactName: formData.get('contactName') as string | null,
      type: formData.get('type') as string | null,
      leadSource: formData.get('leadSource') as string | null,
      assignedTo: formData.get('assignedTo') ? Number(formData.get('assignedTo')) : null,
      campaignSource: formData.get('campaignSource') as string | null,
      weightedRevenue: formData.get('weightedRevenue') ? Number(formData.get('weightedRevenue')) : null,
      organizationName: formData.get('organizationName') as string | null,
      amount: formData.get('amount') ? Number(formData.get('amount')) : null,
      expectedCloseDate: formData.get('expectedCloseDate') as string | null,
      nextStep: formData.get('nextStep') as string | null,
      salesStage: formData.get('salesStage') as string | null,
      probability: formData.get('probability') ? Number(formData.get('probability')) : null,
      description: formData.get('description') as string | null,
      comment: formData.get('comment') as string | null,
      createdBy: formData.get('createdBy') ? Number(formData.get('createdBy')) : null,
    };

    // Parse products data from the form
    const productsJson = formData.get('products') as string;
    const products = productsJson ? JSON.parse(productsJson) : [];

    if (!data.opportunityName) {
      return NextResponse.json({ error: 'Opportunity Name is required' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Insert main enquiry record
      const insertLeadSQL = `
        INSERT INTO crm_enquiry
          (enquiry_name, enquiry_contact_name, enquiry_type, enquiry_source, enquiry_assigned_to, enquiry_campaign_source,
           enquiry_weighted_revenue, enquiry_organization_name, enquiry_amount, enquiry_expected_close_date, enquiry_next_step,
           enquiry_sales_stage, enquiry_probability, enquiry_description, enquiry_created_on, enquiry_created_by, enquiry_modified_on, enquiry_modified_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, NULL, NULL)
      `;

      const leadValues = [
        data.opportunityName,
        data.contactName,
        data.type,
        data.leadSource,
        data.assignedTo,
        data.campaignSource,
        data.weightedRevenue,
        data.organizationName,
        data.amount,
        // Convert empty string to null for date field
        data.expectedCloseDate && data.expectedCloseDate.trim() !== '' ? data.expectedCloseDate : null,
        data.nextStep,
        data.salesStage,
        data.probability,
        data.description,
        data.createdBy,
      ];

      const [leadResult] = await connection.execute<ResultSetHeader>(insertLeadSQL, leadValues);
      const enquiryId = leadResult.insertId;

      // Save comment if present
      if (data.comment) {
        await connection.execute(
          `INSERT INTO crm_enquiry_comment (enquiry_id, enquiry_comment_text, enquiry_comment_commented_on, enquiry_comment_commented_by)
           VALUES (?, ?, NOW(), ?)`,
          [enquiryId, data.comment, data.createdBy]
        );
      }

      // Save attachments
      const files = formData.getAll('attachments') as File[];
      if (files.length > 0) {
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadDir, { recursive: true });

        for (const file of files) {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          const fileName = `${Date.now()}-${file.name}`;
          const filePath = path.join(uploadDir, fileName);

          await writeFile(filePath, buffer);

          await connection.execute(
            `INSERT INTO crm_enquiry_attachment (enquiry_id, enquiry_attachment_file_name, enquiry_attachment_file_path, enquiry_attachment_uploaded_on, enquiry_attachment_uploaded_by)
             VALUES (?, ?, ?, NOW(), ?)`,
            [enquiryId, file.name, `/uploads/${fileName}`, data.createdBy]
          );
        }
      }

      // ✅ FIXED: Save multiple products with correct property names and null checks
      if (products && products.length > 0) {
        for (const product of products) {
          // Validate that required fields are present and not undefined
          const productId = product.product_id;
          const quantity = product.enquiry_product_quantity;
          const price = product.enquiry_product_price;

          if (productId === undefined || quantity === undefined || price === undefined) {
            console.error('Product data contains undefined values:', { productId, quantity, price });
            throw new Error('Product data is incomplete - contains undefined values');
          }

          await connection.execute(
            `INSERT INTO crm_enquiry_product (enquiry_id, product_id, enquiry_product_quantity, enquiry_product_price, enquiry_product_created_on, enquiry_product_modified_on)
             VALUES (?, ?, ?, ?, NOW(), NULL)`,
            [enquiryId, productId, quantity, price]
          );
        }
      }

      await connection.commit();
      connection.release();

      return NextResponse.json({
        message: 'Enquiry created successfully',
        leadId: enquiryId,
      });
    } catch (err) {
      await connection.rollback();
      connection.release();
      console.error('Transaction failed:', err);
      return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}