//app/api/fsn/technical/edit/[id]/products/[productId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../../../lib/db";
import { ResultSetHeader } from "mysql2";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string; productId: string }> } // ✅ Mark params as Promise
) {
  try {
    const { id, productId } = await context.params; // ✅ Await params
    const fsnId = Number(id);
    const productIdNum = Number(productId);
    const body = await req.json();

    if (!fsnId || !productIdNum) {
      return NextResponse.json({ error: "Invalid FSN or Product ID" }, { status: 400 });
    }

    const {
      fsn_product_qty,
      fsn_product_feasibility,
      fsn_product_bom_cost,
      fsn_product_comments,
      department_id,
      employee_id,
    } = body;

    const connection = await db.getConnection();
    try {
      const [result] = await connection.execute<ResultSetHeader>(
        `UPDATE crm_fsn_product
         SET fsn_product_qty = ?,
             fsn_product_feasibility = ?,
             fsn_product_bom_cost = ?,
             fsn_product_comments = ?
         WHERE fsn_product_id = ? AND fsn_id = ?`,
        [
          fsn_product_qty,
          fsn_product_feasibility,
          fsn_product_bom_cost,
          fsn_product_comments,
          productIdNum,
          fsnId,
        ]
      );

      if (result.affectedRows === 0) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }

      return NextResponse.json({ message: "Product updated successfully" });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("❌ Error updating FSN product:", error);
    return NextResponse.json(
      { error: "Failed to update FSN product" },
      { status: 500 }
    );
  }
}