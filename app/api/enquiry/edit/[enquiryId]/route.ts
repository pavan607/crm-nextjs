// /api/enquiry/[enquiryId]/edit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../lib/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { unlink } from 'fs/promises';

interface EnquiryProduct {
  id?: string | number;
  crmtf_product_id: number; // Fixed: Use consistent naming
  crm_quantity: number;      // Fixed: Use consistent naming
  crm_price: number;         // Fixed: Use consistent naming
  session_flag?: 'A' | 'E' | 'D' | null;
}

interface ProductOperations {
  add: EnquiryProduct[];
  edit: EnquiryProduct[];
  delete: EnquiryProduct[];
  unchanged: EnquiryProduct[];
}

// GET handler for fetching lead data for editing
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ enquiryId: string }> }
) {
  console.log('📖 === GET LEAD FOR EDIT STARTED ===');
  
  try {
    // Await params before using
    const resolvedParams = await params;
    const enquiryId = Number(resolvedParams.enquiryId);
    console.log('🔢 Parsed enquiryId:', enquiryId);
    
    if (isNaN(enquiryId) || enquiryId <= 0) {
      console.log('❌ Invalid Lead ID');
      return NextResponse.json({ message: 'Invalid Lead ID' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    
    try {
      // Fetch lead data with employee info - Fixed field names
      const [leadRows] = await connection.execute<RowDataPacket[]>(
        `SELECT
          e.enquiry_id as crm_enquiry_id,
          e.enquiry_number as crm_enquiry_number,
          e.enquiry_name as crm_opportunity_name,
          e.enquiry_contact_name as crm_contact_name,
          e.enquiry_type as crm_type,
          e.enquiry_source as crm_lead_source,
          e.enquiry_assigned_to as crm_assigned_to,
          e.enquiry_campaign_source as crm_campaign_source,
          e.enquiry_weighted_revenue as crm_weighted_revenue,
          e.enquiry_organization_name as crm_organization_name,
          e.enquiry_amount as crm_amount,
          e.enquiry_expected_close_date as crm_expected_close_date,
          e.enquiry_close_date as crm_close_date,
          e.enquiry_next_step as crm_next_step,
          e.enquiry_sales_stage as crm_sales_stage,
          e.enquiry_probability as crm_probability,
          e.enquiry_description as crm_description,
          emp.employee_first_name,
          emp.employee_last_name,
          CONCAT(emp.employee_first_name, ' ', emp.employee_last_name) as assignedToName
         FROM crm_enquiry e
         LEFT JOIN crm_employee emp ON e.enquiry_assigned_to = emp.employee_id
         WHERE e.enquiry_id = ?`,
        [enquiryId]
      );

      console.log('✅ Lead data fetched:', leadRows.length, 'rows found');
      if (leadRows.length === 0) {
        return NextResponse.json({ message: 'Lead not found' }, { status: 404 });
      }

      const lead = leadRows[0];

      // Fetch attachments - Fixed field names
      const [attachmentRows] = await connection.execute<RowDataPacket[]>(
        `SELECT 
          enquiry_attachment_id as crm_attachment_id,
          enquiry_attachment_file_name as file_name,
          enquiry_attachment_file_path as file_path,
          enquiry_attachment_uploaded_on
         FROM crm_enquiry_attachment 
         WHERE enquiry_id = ?
         ORDER BY enquiry_attachment_uploaded_on DESC`,
        [enquiryId]
      );
      console.log('✅ Attachments fetched:', attachmentRows.length, 'attachments found');

      // Fetch comments - Fixed field names
      const [commentRows] = await connection.execute<RowDataPacket[]>(
        `SELECT
          c.enquiry_comment_text as comment_text,
          c.enquiry_comment_commented_on as commented_on,
          CONCAT(emp.employee_first_name, ' ', emp.employee_last_name) as commented_by_name
         FROM crm_enquiry_comment c
         LEFT JOIN crm_employee emp ON c.enquiry_comment_commented_by = emp.employee_id
         WHERE c.enquiry_id = ?
         ORDER BY c.enquiry_comment_commented_on DESC`,
        [enquiryId]
      );

      // Fetch products - Fixed field names to match frontend expectations
      const [productRows] = await connection.execute<RowDataPacket[]>(
        `SELECT 
          ep.enquiry_product_id,
          ep.product_id as crmtf_product_id,
          ep.enquiry_product_quantity as crm_quantity,
          ep.enquiry_product_price as crm_price,
          p.product_name as crmtf_product_name,
          p.product_code as crmtf_product_code,
          p.product_type as crmtf_product_type,
          p.product_model_number as crmtf_product_model_number,
          p.product_uom as crmtf_product_uom
         FROM crm_enquiry_product ep
         LEFT JOIN crm_product p ON ep.product_id = p.product_id
         WHERE ep.enquiry_id = ?`,
        [enquiryId]
      );
      console.log('✅ Product data fetched:', productRows.length, 'products found');
      
      // Structure the response with consistent naming
      const response = {
        ...lead,
        attachments: attachmentRows,
        comments: commentRows,
        products: productRows
      };

      console.log('✅ Lead data fetched successfully');
      return NextResponse.json(response);

    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('❌ Error fetching lead:', error);
    return NextResponse.json(
      { 
        message: 'Failed to fetch lead data',
        error: (error as Error).message 
      },
      { status: 500 }
    );
  }
}

// PUT handler for updating lead data
// PUT handler for updating lead data - FIXED VERSION
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ enquiryId: string }> }
) {
  console.log('🚀 === EDIT API HANDLER STARTED ===');
  
  try {
    // Await params before using
    const resolvedParams = await params;
    const enquiryId = Number(resolvedParams.enquiryId);
    console.log('🔢 Parsed enquiryId:', enquiryId);
    
    if (isNaN(enquiryId) || enquiryId <= 0) {
      console.log('❌ Invalid Lead ID');
      return NextResponse.json({ error: 'Invalid Lead ID' }, { status: 400 });
    }

    console.log('🔌 Getting database connection...');
    const connection = await pool.getConnection();
    console.log('✅ Database connection acquired');

    try {
      console.log('🔄 Starting transaction...');
      await connection.beginTransaction();
      console.log('✅ Transaction started');

      // Parse form data
      console.log('📋 Parsing form data...');
      const formData = await req.formData();
      console.log('✅ Form data parsed');

      // Extract and process modified_by field
      const modifiedBy = formData.get('modified_by') as string;
      const modifiedByEmployeeId = modifiedBy ? Number(modifiedBy) : null;
      console.log('🔢 Parsed modifiedByEmployeeId:', modifiedByEmployeeId);

      // Handle main form fields
      const updateFields = [];
      const updateValues = [];

      // Add modified_on and modified_by fields FIRST
      updateFields.push('enquiry_modified_on = NOW()');

      if (modifiedByEmployeeId && !isNaN(modifiedByEmployeeId) && modifiedByEmployeeId > 0) {
        updateFields.push('enquiry_modified_by = ?');
        updateValues.push(modifiedByEmployeeId);
        console.log('✅ Modified by field added:', modifiedByEmployeeId);
      }

      // FIXED field mappings - using correct database column names
      const fieldMappings = {
        'crm_enquiry_number': 'enquiry_number',      // FIXED: Added missing field
        'opportunityName': 'enquiry_name',
        'contactName': 'enquiry_contact_name',
        'type': 'enquiry_type',
        'leadSource': 'enquiry_source',
        'assignedTo': 'enquiry_assigned_to',
        'campaignSource': 'enquiry_campaign_source',
        'weightedRevenue': 'enquiry_weighted_revenue',
        'organizationName': 'enquiry_organization_name',
        'amount': 'enquiry_amount',
        'expectedCloseDate': 'enquiry_expected_close_date',
        'nextStep': 'enquiry_next_step',
        'salesStage': 'enquiry_sales_stage',
        'probability': 'enquiry_probability',
        'description': 'enquiry_description'
      };

      for (const [formField, dbField] of Object.entries(fieldMappings)) {
        const value = formData.get(formField) as string | null;
        
        if (value !== null && value !== '') {
          updateFields.push(`${dbField} = ?`);
          
          // Handle numeric fields properly
          if (['enquiry_assigned_to', 'enquiry_weighted_revenue', 'enquiry_amount', 'enquiry_probability'].includes(dbField)) {
            const numValue = Number(value);
            updateValues.push(isNaN(numValue) ? null : numValue);
          } else {
            updateValues.push(value.trim());
          }
          
          console.log(`📝 Field mapping: ${formField} -> ${dbField} = ${value}`);
        }
      }

      // Handle actualCloseDate separately with better validation
      const actualCloseDate = formData.get('actualCloseDate') as string | null;
      updateFields.push('enquiry_close_date = ?');
      
      if (!actualCloseDate || actualCloseDate.trim() === '') {
        updateValues.push(null);
        console.log('📝 Close date set to NULL');
      } else {
        // Validate date format
        const dateValue = actualCloseDate.trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
          updateValues.push(dateValue);
          console.log(`📝 Close date set to: ${dateValue}`);
        } else {
          updateValues.push(null);
          console.log('⚠️ Invalid date format, setting to NULL');
        }
      }

      // Update the main enquiry record
      if (updateFields.length > 0) {
        console.log('💾 Updating main enquiry record...');
        updateValues.push(enquiryId);
        
        const updateQuery = `
          UPDATE crm_enquiry 
          SET ${updateFields.join(', ')} 
          WHERE enquiry_id = ?
        `;
        
        console.log('🔍 Update query:', updateQuery);
        console.log('🔍 Update values:', updateValues);
        
        const [updateResult] = await connection.execute<ResultSetHeader>(updateQuery, updateValues);
        console.log('✅ Main record updated:', {
          affectedRows: updateResult.affectedRows,
          changedRows: updateResult.changedRows
        });

        if (updateResult.affectedRows === 0) {
          throw new Error('Lead not found or no changes made');
        }
      }

      // Handle product operations - IMPROVED LOGIC
      console.log('📦 Processing product operations...');
      const productOperationsStr = formData.get('productOperations') as string;
      
      if (productOperationsStr) {
        try {
          const productOperations: ProductOperations = JSON.parse(productOperationsStr);
          console.log('📦 Parsed product operations:', {
            add: productOperations.add?.length || 0,
            edit: productOperations.edit?.length || 0,
            delete: productOperations.delete?.length || 0,
            unchanged: productOperations.unchanged?.length || 0
          });

          // Process DELETE operations first - SIMPLIFIED LOGIC
          if (productOperations.delete && productOperations.delete.length > 0) {
            console.log('🗑️ Processing DELETE operations...');
            for (const product of productOperations.delete) {
              console.log('🗑️ Deleting product:', product);
              
              // IMPROVED: Use product_id for deletion to avoid ID confusion
              const [result] = await connection.execute<ResultSetHeader>(
                `DELETE FROM crm_enquiry_product 
                 WHERE enquiry_id = ? AND product_id = ?`,
                [enquiryId, product.crmtf_product_id]
              );
              console.log('✅ Product deleted:', { 
                productId: product.crmtf_product_id, 
                affectedRows: result.affectedRows 
              });
            }
          }

          // Process EDIT operations - IMPROVED LOGIC
          if (productOperations.edit && productOperations.edit.length > 0) {
            console.log('✏️ Processing EDIT operations...');
            for (const product of productOperations.edit) {
              console.log('✏️ Editing product:', product);
              
              // IMPROVED: Use enquiry_id + product_id for reliable updates
              const [updateResult] = await connection.execute<ResultSetHeader>(
                `UPDATE crm_enquiry_product 
                 SET enquiry_product_quantity = ?, 
                     enquiry_product_price = ?, 
                     enquiry_product_modified_on = NOW()
                 WHERE enquiry_id = ? AND product_id = ?`,
                [
                  product.crm_quantity || 1,
                  product.crm_price || 0,
                  enquiryId,
                  product.crmtf_product_id
                ]
              );
              
              console.log('✅ Product updated:', {
                productId: product.crmtf_product_id,
                affectedRows: updateResult.affectedRows
              });
            }
          }

          // Process ADD operations - IMPROVED DUPLICATE CHECK
          if (productOperations.add && productOperations.add.length > 0) {
            console.log('➕ Processing ADD operations...');
            for (const product of productOperations.add) {
              console.log('➕ Adding product:', product);
              
              // Check if product already exists to avoid duplicates
              const [existingRows] = await connection.execute<RowDataPacket[]>(
                `SELECT enquiry_product_id FROM crm_enquiry_product 
                 WHERE enquiry_id = ? AND product_id = ?`,
                [enquiryId, product.crmtf_product_id]
              );

              if (existingRows.length > 0) {
                console.log('⚠️ Product already exists, updating instead of adding');
                // Update existing instead of skipping
                await connection.execute<ResultSetHeader>(
                  `UPDATE crm_enquiry_product 
                   SET enquiry_product_quantity = ?, 
                       enquiry_product_price = ?, 
                       enquiry_product_modified_on = NOW()
                   WHERE enquiry_id = ? AND product_id = ?`,
                  [
                    product.crm_quantity || 1,
                    product.crm_price || 0,
                    enquiryId,
                    product.crmtf_product_id
                  ]
                );
                console.log('✅ Existing product updated instead');
                continue;
              }

              // Insert new product
              const [result] = await connection.execute<ResultSetHeader>(
                `INSERT INTO crm_enquiry_product 
                 (enquiry_id, product_id, enquiry_product_quantity, enquiry_product_price, enquiry_product_created_on, enquiry_product_modified_on)
                 VALUES (?, ?, ?, ?, NOW(), NOW())`,
                [
                  enquiryId,
                  product.crmtf_product_id,
                  product.crm_quantity || 1,
                  product.crm_price || 0,
                ]
              );
              
              console.log('✅ Product added:', {
                insertId: result.insertId,
                affectedRows: result.affectedRows
              });
            }
          }

        } catch (productParseError) {
          console.error('❌ Error parsing product operations:', productParseError);
          throw new Error('Invalid product operations data');
        }
      }

      // Handle comment if provided - IMPROVED VALIDATION
      const comment = formData.get('comment') as string;
      if (comment && comment.trim()) {
        console.log('💬 Adding comment:', comment.trim());

        const [commentResult] = await connection.execute<ResultSetHeader>(
          `INSERT INTO crm_enquiry_comment 
           (enquiry_id, enquiry_comment_text, enquiry_comment_commented_by, enquiry_comment_commented_on) 
           VALUES (?, ?, ?, NOW())`,
          [enquiryId, comment.trim(), modifiedByEmployeeId || null]
        );

        console.log('✅ Comment added successfully:', {
          insertId: commentResult.insertId,
          affectedRows: commentResult.affectedRows
        });

        // Update the enquiry_comments field with the latest comment
        await connection.execute(
          `UPDATE crm_enquiry 
           SET enquiry_comments = ? 
           WHERE enquiry_id = ?`,
          [comment.trim(), enquiryId]
        );

        console.log('✅ enquiry_comments field updated');
      }

      // Handle file attachments - IMPROVED ERROR HANDLING
      const attachments = formData.getAll('attachments') as File[];
      if (attachments.length > 0 && attachments[0].size > 0) {
        console.log('📎 Processing attachments:', attachments.length);
        
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'enquiry', enquiryId.toString());
        
        try {
          await mkdir(uploadsDir, { recursive: true });
          console.log('📁 Upload directory created/verified');
        } catch (dirError) {
          console.error('❌ Error creating upload directory:', dirError);
          throw new Error('Failed to create upload directory');
        }

        for (const file of attachments) {
          if (file.size > 0) {
            try {
              // IMPROVED: Better filename sanitization
              const fileExtension = path.extname(file.name);
              const baseFileName = path.basename(file.name, fileExtension)
                .replace(/[^a-zA-Z0-9._-]/g, '_') // Sanitize filename
                .substring(0, 100); // Limit length
              const timestamp = Date.now();
              const uniqueFileName = `${baseFileName}_${timestamp}${fileExtension}`;
              const filePath = path.join(uploadsDir, uniqueFileName);
              
              // Validate file size (e.g., max 10MB)
              if (file.size > 10 * 1024 * 1024) {
                throw new Error(`File ${file.name} is too large (max 10MB)`);
              }
              
              // Save file
              const bytes = await file.arrayBuffer();
              const buffer = Buffer.from(bytes);
              await writeFile(filePath, buffer);
              console.log('✅ File saved:', uniqueFileName);

              // Save to database with better error handling
              const relativePath = `/uploads/enquiry/${enquiryId}/${uniqueFileName}`;
              
              const [attachmentResult] = await connection.execute<ResultSetHeader>(
                `INSERT INTO crm_enquiry_attachment 
                 (enquiry_id, enquiry_attachment_file_name, enquiry_attachment_file_path, enquiry_attachment_uploaded_on, enquiry_attachment_uploaded_by) 
                 VALUES (?, ?, ?, NOW(), ?)`,
                [enquiryId, file.name, relativePath, modifiedByEmployeeId || null]
              );

              console.log('✅ File record inserted:', {
                insertId: attachmentResult.insertId,
                affectedRows: attachmentResult.affectedRows
              });
            } catch (fileError) {
              console.error('❌ Error processing file:', file.name, fileError);
              throw new Error(`Failed to process file: ${file.name} - ${(fileError as Error).message}`);
            }
          }
        }
      }

      // Handle deleted attachments - IMPROVED ERROR HANDLING
      const deletedAttachmentIdsStr = formData.get('deletedAttachmentIds') as string;
      if (deletedAttachmentIdsStr) {
        console.log('🗑️ Processing attachment deletions...');
        
        try {
          const deletedIds: number[] = JSON.parse(deletedAttachmentIdsStr);
          console.log('🗑️ Attachment IDs to delete:', deletedIds);
          
          for (const attachmentId of deletedIds) {
            // IMPROVED: Better validation of attachment ownership
            const [attachmentRows] = await connection.execute<RowDataPacket[]>(
              `SELECT enquiry_attachment_file_path 
               FROM crm_enquiry_attachment 
               WHERE enquiry_attachment_id = ? AND enquiry_id = ?`,
              [attachmentId, enquiryId]
            );
            
            if (attachmentRows.length > 0) {
              const filePath = attachmentRows[0].enquiry_attachment_file_path;
              
              // Delete from database
              const [deleteResult] = await connection.execute<ResultSetHeader>(
                `DELETE FROM crm_enquiry_attachment 
                 WHERE enquiry_attachment_id = ? AND enquiry_id = ?`,
                [attachmentId, enquiryId]
              );
              
              console.log('✅ Attachment deleted from database:', {
                attachmentId,
                affectedRows: deleteResult.affectedRows
              });
              
              // Delete physical file - IMPROVED ERROR HANDLING
              if (deleteResult.affectedRows > 0 && filePath) {
                try {
                  const fullFilePath = path.join(process.cwd(), 'public', filePath);
                  await unlink(fullFilePath);
                  console.log('✅ Physical file deleted');
                } catch (fileDeleteError) {
                  console.warn('⚠️ Could not delete physical file (may not exist):', fileDeleteError);
                  // Don't throw error for file deletion failures
                }
              }
            } else {
              console.warn('⚠️ Attachment not found or not owned by this enquiry:', attachmentId);
            }
          }
        } catch (parseError) {
          console.error('❌ Error parsing deleted attachment IDs:', parseError);
          throw new Error('Invalid deleted attachment IDs data');
        }
      }

      console.log('🔄 Committing transaction...');
      await connection.commit();
      console.log('✅ Transaction committed successfully');
      
      // IMPROVED: Return more detailed success response
      return NextResponse.json({ 
        success: true, 
        message: 'Lead updated successfully',
        enquiryId: enquiryId,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.log('🔄 Rolling back transaction...');
      await connection.rollback();
      console.log('❌ Transaction rolled back');
      throw error;
    } finally {
      connection.release();
      console.log('🔌 Database connection released');
    }

  } catch (error) {
    console.error('❌ Error in edit API handler:', error);
    
    // IMPROVED: More specific error messages
    let errorMessage = 'Failed to update lead';
    let statusCode = 500;
    
    if (error instanceof Error) {
      if (error.message.includes('Lead not found')) {
        errorMessage = 'Lead not found';
        statusCode = 404;
      } else if (error.message.includes('Invalid')) {
        errorMessage = error.message;
        statusCode = 400;
      } else if (error.message.includes('too large')) {
        errorMessage = error.message;
        statusCode = 413;
      }
    }
    
    return NextResponse.json({ 
      error: errorMessage, 
      details: (error as Error).message,
      timestamp: new Date().toISOString()
    }, { status: statusCode });
  }
}