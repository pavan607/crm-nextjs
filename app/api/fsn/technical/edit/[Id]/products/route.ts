// app/api/fsn/technical/edit/[id]/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../../../lib/db';
import { RowDataPacket } from 'mysql2';

// GET - Fetch products for an FSN
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fsnId = params.id;
    
    console.log('API: Fetching products for FSN ID:', fsnId); // Debug log

    if (!fsnId || isNaN(Number(fsnId))) {
      return NextResponse.json(
        { error: 'Invalid FSN ID provided' },
        { status: 400 }
      );
    }

    const connection = await db.getConnection();

    try {
      // Fetch products associated with this FSN
      const [productRows] = await connection.execute<RowDataPacket[]>(
        `SELECT 
          fp.fsn_product_id,
          fp.crmtf_product_id,
          fp.fsn_product_qty,
          fp.fsn_product_feasibility,
          fp.fsn_product_bom_cost,
          fp.fsn_product_comments,
          fp.department_id,
          fp.employee_id,
          p.product_name,
          p.product_type,
          p.product_model_num,
          p.product_uom
        FROM crm_fsn_products fp
        LEFT JOIN crmtf_products p ON fp.crmtf_product_id = p.crmtf_product_id
        WHERE fp.fsn_id = ?
        ORDER BY fp.fsn_product_id`,
        [fsnId]
      );

      console.log('API: Found products:', productRows.length); // Debug log

      // Add empty attachments array to each product (you may want to fetch actual attachments from another table)
      const productsWithAttachments = productRows.map(product => ({
        ...product,
        attachments: [] // Add actual attachment fetching logic here if needed
      }));

      return NextResponse.json(productsWithAttachments);
      
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    const errorMessage = (error instanceof Error) ? error.message : String(error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: errorMessage },
      { status: 500 }
    );
  }
}