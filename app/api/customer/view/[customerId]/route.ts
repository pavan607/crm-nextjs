// app/api/customer/view/[customerId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "../../../../lib/db";

export async function GET(req: NextRequest, context: { params: Promise<{ customerId: string }> }) {
  const { customerId } = await context.params; // <-- await here

  try {
    const [rows] = await db.execute(
      "SELECT * FROM crm_customer WHERE customer_id = ?",
      [customerId]
    );

    const customer = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    return NextResponse.json({ customer });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch customer" }, { status: 500 });
  }
}
