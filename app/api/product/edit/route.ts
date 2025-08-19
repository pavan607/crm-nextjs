import { NextRequest, NextResponse } from 'next/server';
import db from '../../../lib/db'; // adjust if path differs

// Fetch product by ID
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const [rows] = await db.query(
      'SELECT * FROM crmtf_product WHERE product_id = ?',
      [id]
    );

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product: rows[0] });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Update product by ID
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const body = await req.json();

    const {
      product_name,
      product_code,
      product_short_name,
      product_type,
      product_model_number,
      product_uom,
      product_active,
    } = body;

    await db.query(
      `UPDATE crmtf_product SET
        product_name = ?,
        product_code = ?,
        product_short_name = ?,
        product_type = ?,
        product_model_number = ?,
        product_uom = ?,
        product_active = ?
      WHERE product_id = ?`,
      [
        product_name,
        product_code,
        product_short_name,
        product_type,
        product_model_number,
        product_uom,
        product_active,
        id,
      ]
    );

    return NextResponse.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
// Delete product by ID
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await db.query('DELETE FROM crmtf_product WHERE product_id = ?', [id]);

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
