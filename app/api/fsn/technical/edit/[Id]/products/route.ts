//app/api/fsn/technical/edit/[id]/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../../lib/db";

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
      // Fetch products for this FSN with product details
      const [productRows] = await connection.execute(
        `SELECT 
          fp.*,
          p.product_name,
          p.product_type,
          p.product_model_number,
          p.product_uom
         FROM crm_fsn_product fp
         INNER JOIN crm_product p ON fp.product_id = p.product_id
         WHERE fp.fsn_id = ?
         ORDER BY fp.fsn_product_id`,
        [fsnId]
      );
      console.log('Fetched products:', productRows);
      
      const products = Array.isArray(productRows) ? productRows.map((product: any) => ({
        ...product,
        attachments: [] // You can fetch attachments separately if needed
      })) : [];

      return NextResponse.json(products);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("❌ Error fetching FSN products:", error);
    return NextResponse.json(
      { error: "Failed to fetch FSN products" },
      { status: 500 }
    );
  }
}